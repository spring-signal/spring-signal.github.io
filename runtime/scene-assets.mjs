import {spriteLayout,highQualityWidth,responsiveScene} from './presentation.mjs?v=200';
// Spring Signal VN art runtime 0.6.0 — no framework dependency.
export function chooseVariant(variants, cssWidth, dpr = 1, saveData = false) {
  if (!variants?.length) throw new Error('No image variants');
  const sorted = [...variants].sort((a, b) => a.width - b.width);
  const target = Math.max(1, cssWidth) * (saveData ? 1 : Math.min(Math.max(dpr, 1), 2));
  return sorted.find(v => v.width >= target) ?? sorted.at(-1);
}

export function networkPolicy(connection = {}, deviceMemory = 4) {
  const constrained = connection.saveData || /(^|-)2g$/.test(connection.effectiveType ?? '');
  return {
    lookAhead: constrained ? 0 : connection.effectiveType === '3g' ? 1 : 2,
    concurrency: constrained ? 1 : deviceMemory <= 4 ? 2 : 4,
    decodedLimit: (deviceMemory <= 4 ? 32 : 64) * 1024 * 1024,
  };
}

export function sceneRequests(scene, manifest, viewport, saveData = false) {
  scene=responsiveScene(scene,manifest,viewport);
  const cast = scene.cast ?? [];
  const layout = spriteLayout(scene,manifest,viewport);
  const count = Math.max(cast.length, 1);
  const bg = manifest.assets[scene.background];
  if (!bg) throw new Error(`Unknown background: ${scene.background}`);
  const requests = [{role:'background', asset:bg, variant:chooseVariant(bg.variants, viewport.width, viewport.dpr, saveData)}];
  for (const person of cast) {
    const asset = manifest.assets[person.asset];
    if (!asset || asset.kind !== 'character') throw new Error(`Unknown character asset: ${person.asset}`);
    if (manifest.identityVersion && asset.identityVersion !== manifest.identityVersion)
      throw new Error('이전 얼굴과 새 얼굴 자산을 같은 캐스팅에 섞을 수 없습니다.');
    if (asset.bustOnly && count > 1 && !(scene.frame==='medium-group'&&asset.armFrame)) throw new Error('상반신 표정 자산은 단체 전신 장면에 사용할 수 없습니다.');
    const frame = scene.frame==='medium-group'||count === 1 && (scene.frame === 'bust' || asset.bustOnly) ? 'bust' : 'full';
    const rendered=layout.find(x=>x.person===person);
    const cssWidth=highQualityWidth(rendered.width,viewport.dpr,asset[frame].at(-1).width,viewport.quality,saveData,frame==='bust');
    requests.push({role:'character', person, asset, frame, geometry:rendered, variant:chooseVariant(asset[frame], cssWidth, viewport.dpr, saveData)});
  }
  return requests;
}

export class SceneAssetLoader {
  constructor({createImage = () => new Image(), policy = networkPolicy(), timeoutMs = 20000} = {}) {
    this.createImage = createImage; this.policy = policy; this.timeoutMs = timeoutMs;
    this.cache = new Map(); this.queue = []; this.running = 0; this.bytes = 0;
    this.clock = 0; this.pinned = new Set(); this.epoch = 0;
  }
  load(variant, priority = 'low') {
    const url = variant.url;
    const existing = this.cache.get(url);
    if (existing) {
      existing.used = ++this.clock;
      if (priority === 'high') { existing.priority = 'high'; existing.image.fetchPriority = 'high'; }
      return existing.promise;
    }
    const image = this.createImage(); image.decoding = 'async'; image.fetchPriority = priority;
    const entry = {image, variant, priority, used:++this.clock, ready:false, size:0};
    entry.promise = new Promise((resolve, reject) => {entry.resolve = resolve; entry.reject = reject;});
    this.cache.set(url, entry); this.queue.push(entry); this.pump();
    return entry.promise;
  }
  pump() {
    this.queue.sort((a,b) => Number(b.priority === 'high') - Number(a.priority === 'high'));
    while (this.running < this.policy.concurrency && this.queue.length) {
      const entry = this.queue.shift(); this.running++;
      this.start(entry).finally(() => {this.running--; this.trim(); this.pump();});
    }
  }
  async start(entry) {
    const {image, variant} = entry;
    try {
      await new Promise((resolve, reject) => {
        let settled = false, loaded = false;
        const done = (error) => {
          if (settled) return; settled = true; clearTimeout(timer);
          image.onload = image.onerror = null;
          error ? reject(error) : resolve();
        };
        const timer = setTimeout(() => done(new Error(`Image timeout: ${variant.url}`)), this.timeoutMs);
        image.onerror = () => done(new Error(`Image failed: ${variant.url}`));
        const decoded = async () => {
          if(loaded||settled)return;loaded=true;
          try {if(image.decode)await image.decode();done();} catch(error){done(error);}
        };
        image.onload = decoded;
        image.src = variant.url;
        if (image.complete && image.naturalWidth) decoded();
      });
      entry.ready = true;
      entry.size = (image.naturalWidth || variant.width) * (image.naturalHeight || variant.height) * 4;
      this.bytes += entry.size; entry.resolve(entry);
    } catch (error) {
      if (this.cache.get(variant.url) === entry) this.cache.delete(variant.url);
      entry.reject(error);
    }
  }
  trim() {
    const candidates = [...this.cache.entries()].filter(([url,e]) => e.ready && !this.pinned.has(url)).sort((a,b) => a[1].used - b[1].used);
    for (const [url, entry] of candidates) {
      if (this.bytes <= this.policy.decodedLimit) break;
      this.cache.delete(url); this.bytes -= entry.size;
    }
  }
  async prepare(requests, {critical = true} = {}) {
    return Promise.all(requests.map(async request => ({...request, ready:await this.load(request.variant, critical ? 'high' : 'low')})));
  }
  pin(requests) { this.pinned = new Set(requests.map(x => x.variant.url)); this.trim(); }
  prefetch(scenes, manifest, viewport, saveData = false) {
    const epoch = ++this.epoch;
    if (!this.policy.lookAhead || saveData) return Promise.resolve([]);
    const requests = new Map();
    for (const scene of scenes.slice(0, this.policy.lookAhead)) {
      for (const request of sceneRequests(scene, manifest, viewport, saveData)) requests.set(request.variant.url, request);
    }
    const tasks = [...requests.values()].map(async request => {
      if (epoch !== this.epoch) return;
      try { return await this.load(request.variant, 'low'); } catch { return undefined; }
    });
    return Promise.all(tasks);
  }
  cancelSpeculation() {
    this.epoch++;
    // In-flight requests are allowed to finish and populate the HTTP cache.
    // Drop queued speculative requests; leave critical loads intact.
    const keep = [];
    for (const entry of this.queue) {
      if (entry.priority === 'high') keep.push(entry);
      else {this.cache.delete(entry.variant.url); entry.resolve(undefined);}
    }
    this.queue = keep;
  }
  stats() {return {entries:this.cache.size, decodedBytes:this.bytes, running:this.running, queued:this.queue.length};}
}

export class WardrobeLedger {
  constructor(snapshot = {}) { this.byDay = new Map(Object.entries(snapshot)); }
  check(scene, manifest) {
    const background=manifest.assets[scene.background];
    if(scene.background&&(!background||background.kind!=='background'))throw new Error('장면 배경이 없습니다.');
    if(background?.locations?.length&&!background.locations.includes(scene.location))
      throw new Error('대화 장소와 배경이 다릅니다.');
    const authoredDusk=scene.lighting280==='dusk'&&scene.timeOfDay==='evening'&&background?.timeOfDay==='day'&&/^(R280_|R300_)/.test(scene.id??'');
    if(scene.timeOfDay&&background?.timeOfDay&&scene.timeOfDay!==background.timeOfDay&&!authoredDusk)
      throw new Error('대화 시간과 배경의 시간대가 다릅니다.');
    if (['spring-mt','summer-mt'].includes(scene.event) && (scene.cast ?? []).some(x => manifest.assets[x.asset]?.character === 'doa'))
      throw new Error('도아는 원고상 동아리 MT 참가자가 아닙니다.');
    const proposed = []; const seen = new Set();
    for (const person of scene.cast ?? []) {
      const asset = manifest.assets[person.asset];
      if (!asset) throw new Error(`Missing asset ${person.asset}`);
      if (manifest.identityVersion && asset.identityVersion !== manifest.identityVersion)
        throw new Error('장면의 얼굴 기준과 인물 자산이 다릅니다.');
      if (Number.isFinite(scene.week) && Number.isFinite(asset.minWeek) && scene.week < asset.minWeek)
        throw new Error('이 인물·의상의 등장 주차보다 앞선 장면입니다.');
      if (scene.season && asset.seasons?.length && !asset.seasons.includes(scene.season))
        throw new Error('계절에 맞지 않는 의상을 사용할 수 없습니다.');
      if (seen.has(asset.character)) throw new Error('같은 장면에 한 인물을 두 번 표시할 수 없습니다.');
      seen.add(asset.character);
      const key = `${scene.day}/${asset.character}`;
      const previous = this.byDay.get(key);
      const change = scene.clothingChanges?.[asset.character];
      if (previous && previous !== asset.outfit && !change)
        throw new Error(`같은 날 의상 변경에 전환 장면이 필요합니다: ${asset.character}`);
      const isSwimwear = ['swimwear','beachwear'].includes(asset.outfitCategory) || ['beach','pool','water_active','pool_active'].includes(asset.outfit);
      if (isSwimwear && !['beach','pool','valley'].includes(scene.location))
        throw new Error('수영복은 해변·계곡·수영장 장면에서만 사용합니다.');
      proposed.push([key, asset.outfit]);
    }
    return () => {for (const [key,value] of proposed) this.byDay.set(key,value);};
  }
  snapshot() {return Object.fromEntries(this.byDay);}
}

export class SceneRenderer {
  constructor(stage, loader, manifest, {documentRef = globalThis.document, ledger = new WardrobeLedger(), motion = true} = {}) {
    this.stage = stage; this.loader = loader; this.manifest = manifest;
    this.document = documentRef; this.motion=motion; this.ledger = ledger; this.token = 0; this.currentLayer=null; this.committedPins = new Set();this.displayedAssets=[];
  }
  cancel(){this.token++;this.loader.cancelSpeculation();}
  clear(){
    this.cancel();this.stage.replaceChildren();this.currentLayer=null;this.displayedAssets=[];
    this.committedPins=new Set();this.loader.pin([]);
  }
  async show(scene, viewport, {saveData = false, validateContinuity = true} = {}) {
    const token = ++this.token;
    const commitWardrobe = validateContinuity ? this.ledger.check(scene, this.manifest) : () => {};
    this.loader.cancelSpeculation();
    const requests = sceneRequests(scene, this.manifest, viewport, saveData);
    const previousPins = new Set(this.committedPins);
    this.loader.pinned = new Set([...previousPins,...requests.map(x => x.variant.url)]);
    let prepared;
    try { prepared = await this.loader.prepare(requests); }
    catch (error) {if (token === this.token) {this.loader.pinned = previousPins; this.loader.trim();} throw error;}
    if (token !== this.token) return false;
    const layer = this.document.createElement('div'); layer.className = 'scene-layer';
    layer.dataset.timeOfDay=scene.timeOfDay??this.manifest.assets[scene.background]?.timeOfDay??'day';
    layer.dataset.lighting=scene.lighting280??'';
    const cast = this.document.createElement('div');
    cast.className = `cast ${requests.some(x => x.frame === 'bust') ? 'bust' : 'full'}`;
    if ((scene.cast?.length ?? 0) >= 4) cast.className += ' many';
    cast.style.setProperty('--cast-count', Math.max(scene.cast?.length ?? 0,1));
    cast.style.setProperty('--mobile-cols', (scene.cast?.length ?? 0) === 4 ? 2 : 3);
    await Promise.all(prepared.map(async (request, order) => {
      // Clone to avoid pulling a currently visible image out of the old scene.
      const img = request.ready.image.cloneNode(false);
      img.draggable = false;
      if (img.decode) await img.decode();
      if (request.role === 'background') {
        img.className = 'scene-background'; img.alt = request.asset.label;
        img.style.objectPosition = request.asset.focal ?? '50% 50%'; layer.append(img);
      } else {
        const cell = this.document.createElement('div'); cell.className = 'actor';
        if (scene.speaker === request.asset.character) cell.classList.add('speaking');
        img.alt = request.asset.label; cell.append(img);
        for(const key of ['height','width','bottom','left'])cell.style.setProperty('--sprite-'+key,request.geometry[key]+'px');
        cell.dataset.gesture=this.motion&&scene.speaker===request.asset.character?(scene.gesture??''):'none';
        // Asynchronous decode must not reorder the cast.
        cell.dataset.order = String(order); cast.append(cell);
      }
    }));
    if (token !== this.token) return false;
    [...cast.children].sort((a,b) => Number(a.dataset.order)-Number(b.dataset.order)).forEach(x => cast.append(x));
    layer.append(cast);
    this.currentLayer=layer;
    // Swap the decoded cast atomically. Cross-fading the entire scene made
    // opaque faces translucent and overlapped two different expressions.
    this.stage.replaceChildren(layer);
    commitWardrobe();
    this.displayedAssets=requests.filter(x=>x.role==='character').map(x=>x.asset.id);
    this.committedPins = new Set(requests.map(x => x.variant.url)); this.loader.pin(requests);
    return true;
  }
}
