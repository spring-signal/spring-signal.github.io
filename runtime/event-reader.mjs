import {eveningBackground310} from './review-310.mjs?v=310';
import {performanceAsset,sceneOutfits} from './scene-direction.mjs?v=290';
import {dialogueTarget} from './dialogue-targets.mjs?v=251';
import {sceneStaging} from './scene-staging.mjs?v=200';
export const PREVIEW_SCHEMA='spring-signal-events-1';

export function eventAsset(event, character, manifest) {
  const outfit=event.outfits[character];
  const asset=manifest.assets[`char.${character}.${outfit}.neutral`];
  if(asset?.identityVersion===manifest.identityVersion)return asset;
  throw new Error('이 장면에 맞는 인물 이미지가 없습니다: '+character);
}

export function eventScene(event,line,manifest) {
  const visible=line.cast??event.cast;
  if(new Set(visible).size!==visible.length||visible.some(c=>!event.cast.includes(c)))
    throw new Error('이 행사에 참석하지 않은 인물을 표시할 수 없습니다.');
  if(event.cast.includes(line.speaker)&&!visible.includes(line.speaker))
    throw new Error('현재 장소에 없는 인물의 대사입니다.');
  const wardrobe={...event,outfits:sceneOutfits(event,line)};
  const assets=visible.map(c=>eventAsset(wardrobe,c,manifest));
  const staging=sceneStaging(event,line,visible);
  const stagedAssets=staging.stageCast===undefined?assets:staging.stageCast.map(c=>assets.find(a=>a.character===c));
  const speaker=visible.includes(line.speaker)?line.speaker:null;
  const target=dialogueTarget(event,line);
  const pair=speaker&&!['player','group'].includes(target);
  if(pair&&(!visible.includes(target)||speaker===target))throw Error('화면 안의 다른 대화 상대를 지정해야 합니다.');
  if(pair&&staging.stageCast!==undefined&&![speaker,target].every(c=>staging.stageCast.includes(c)))throw Error('두 사람 대화의 화자와 상대를 함께 배치해야 합니다.');
  const ensemble=!pair&&staging.authored&&stagedAssets.length>1&&['ensemble','wide'].includes(line.shot);
  const single=!pair&&!ensemble&&stagedAssets.length>0&&(speaker||line.closeUp||line.acting||['medium','close'].includes(line.shot)||stagedAssets.length===1||stagedAssets.some(a=>a.bustOnly));
  const focus=stagedAssets.find(a=>a.character===line.speaker)??stagedAssets.find(a=>a.bustOnly)??stagedAssets[0];
  let shown=single&&focus?[focus]:stagedAssets;
  const gaze={};
  if(pair){
    const order=event.stageOrder??event.cast;
    shown=assets.filter(a=>[speaker,target].includes(a.character)).sort((a,b)=>order.indexOf(a.character)-order.indexOf(b.character));
    shown=shown.map((a,i)=>{gaze[a.character]=i===0?'right':'left';return performanceAsset(a,{...line,gaze:gaze[a.character],acting:a.character===speaker?line.acting:undefined,emotion:a.character===speaker?line.emotion:line.listenerEmotions200?.[a.character]},manifest);});
  }else if(ensemble){shown=stagedAssets.map(a=>{gaze[a.character]='front';return performanceAsset(a,{...line,gaze:'front',acting:a.character===speaker?line.acting:undefined,emotion:a.character===speaker?line.emotion:line.listenerEmotions200?.[a.character]},manifest);});}
  else if(single&&focus){gaze[focus.character]='front';shown=[performanceAsset(focus,{...line,gaze:'front'},manifest)];}
  // A refused/missing serious portrait must not silently display a smiling
  // neutral frame in an authored sensitive conversation. Hold the background
  // shot while her dialogue continues; this is not counted as a new image.
  let emotionFallback180=null;
  if(!pair&&line.emotion==='serious'&&shown.some(a=>a.character===speaker&&!['serious','hurt','sad','heartbroken','worried'].includes(a.emotion))){shown=[];for(const key of Object.keys(gaze))delete gaze[key];emotionFallback180='scenery-missing-same-outfit-serious';}
  if(!pair&&line.posturePolicy180==='strict'&&shown.some(a=>a.posture!==line.posture)){shown=[];for(const key of Object.keys(gaze))delete gaze[key];emotionFallback180='scenery-missing-same-outfit-posture';}
  const oldBackground=line.background??event.background,time=line.timeOfDay??event.timeOfDay,background=eveningBackground310(oldBackground,time,manifest);
  return {id:event.id,label:event.label,week:event.week,day:event.day,season:event.season,
    location:line.location??event.location,timeOfDay:line.timeOfDay??event.timeOfDay,
    event:event.event,background,clothingChanges:line.clothingChanges??event.clothingChanges,soundscape:line.soundscape??event.soundscape,weather:line.weather??event.weather,music:line.music??event.music,audioQuiet:line.audioQuiet??event.audioQuiet,lighting280:background!==oldBackground?undefined:line.lighting280??event.lighting280,
    cast:shown.map(a=>({asset:a.id})),frame:!shown.length?'full':pair||ensemble?'medium-group':single?'bust':'full',speaker:line.speaker,emotionFallback180,
    logicalCast:[...visible],eventCast:[...event.cast],camera:!shown.length?'scenery':pair?'pair':single?'single':'group',shot:!shown.length?'establishing':pair?'two-shot':line.shot??(single?'close':'group'),pose:gaze[speaker]??'front',gaze,addressedTo:speaker?target:null,stagingAuthored:staging.authored??false,gesture:line.gesture??''};
}

export class EventReader {
  constructor(events,manifest,saved) {
    if(!events?.length)throw new Error('No event script');
    this.events=events;this.manifest=manifest;
    this.state={schema:PREVIEW_SCHEMA,version:manifest.version,identityVersion:manifest.identityVersion,
      eventId:events[0].id,lineIndex:0,choices:{}};
    if(saved)this.restore(saved);
  }
  get event(){return this.events.find(e=>e.id===this.state.eventId);}
  timeline(){const e=this.event,c=e.choices.find(x=>x.id===this.state.choices[e.id]);return [...e.body,...(c?.response??[])];}
  imageLineAt(index){
    const e=this.event,lines=this.timeline();
    const context={cast:[...e.cast],outfits:{...e.outfits},background:e.background,
      location:e.location,timeOfDay:e.timeOfDay};
    let line;
    for(let i=0;i<=Math.min(index,lines.length-1);i++){
      line=lines[i];
      for(const key of ['cast','background','location','timeOfDay'])
        if(line[key]!==undefined)context[key]=line[key];
      if(line.outfits)context.outfits={...context.outfits,...line.outfits};
    }
    return line?{...line,...context,cast:[...context.cast],outfits:{...context.outfits}}:undefined;
  }
  current(){const e=this.event,lines=this.timeline(),i=this.state.lineIndex;
    if(i<lines.length)return {kind:'dialogue',event:e,line:lines[i],imageLine:this.imageLineAt(i),index:i};
    return {kind:e.choices.length&&!this.state.choices[e.id]?'choices':'end',event:e,
      line:{speaker:'narrator',text:''},imageLine:this.imageLineAt(lines.length-1),index:i};
  }
  next(){if(this.current().kind==='dialogue')this.state.lineIndex++;return this.current();}
  previous(){if(this.state.lineIndex>0)this.state.lineIndex--;return this.current();}
  selectEvent(id){if(!this.events.some(e=>e.id===id))throw new Error('Unknown event');this.state.eventId=id;this.state.lineIndex=0;return this.current();}
  choose(id){const current=this.current();if(current.kind!=='choices')throw new Error('Not at a choice');
    const choice=this.event.choices.find(c=>c.id===id);if(!choice)throw new Error('Unknown choice');
    this.state.choices[this.event.id]=id;this.state.lineIndex=this.event.body.length;return this.current();}
  chooseAgain(){delete this.state.choices[this.event.id];this.state.lineIndex=this.event.body.length;return this.current();}
  nextEvent(){const i=this.events.indexOf(this.event);if(i+1===this.events.length)return false;this.selectEvent(this.events[i+1].id);return true;}
  export(){return JSON.parse(JSON.stringify(this.state));}
  restore(saved){
    if(!saved||saved.schema!==PREVIEW_SCHEMA||saved.version!==this.manifest.version||saved.identityVersion!==this.manifest.identityVersion)
      throw new Error('현재 이미지·장면 버전과 다른 이어읽기 파일입니다.');
    const event=this.events.find(e=>e.id===saved.eventId);
    if(!event||!Number.isInteger(saved.lineIndex)||saved.lineIndex<0)throw new Error('이어읽기 위치가 올바르지 않습니다.');
    if(!saved.choices||typeof saved.choices!=='object'||Array.isArray(saved.choices))throw new Error('선택 기록이 올바르지 않습니다.');
    const choices={};
    for(const [eventId,id]of Object.entries(saved.choices)){
      const e=this.events.find(e=>e.id===eventId);
      if(!e||!e.choices.some(c=>c.id===id))throw new Error('알 수 없는 선택 기록입니다.');
      choices[eventId]=id;
    }
    const response=event.choices.find(c=>c.id===choices[event.id])?.response??[];
    if(saved.lineIndex>event.body.length+response.length)throw new Error('장면의 마지막 위치를 넘었습니다.');
    this.state={schema:PREVIEW_SCHEMA,version:this.manifest.version,identityVersion:this.manifest.identityVersion,
      eventId:event.id,lineIndex:saved.lineIndex,choices};
    return this.current();
  }
}
