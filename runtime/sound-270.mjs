import {MUSIC_FILES280,TITLE_MUSIC330,ALERT_NOTES280,musicFor280,floorFor280,walking280} from './sound-stage-280.mjs?v=330';
import {playbackSession281,loadAudio281} from './audio-compat-281.mjs?v=281';
// Field recordings are local, CC0, and fetched only when their scene is shown.
export const AUDIO_DEFAULTS={muted:false,masterVolume:0.7,ambienceVolume:0.5,effectsVolume:0.65,musicVolume:0.3,titleMusicEnabled:true};
export function audioSettings(value={}){
 const volume=(key)=>typeof value[key]==='number'&&Number.isFinite(value[key])?Math.max(0,Math.min(1,value[key])):AUDIO_DEFAULTS[key];
 return {titleMusicEnabled:typeof value.titleMusicEnabled==='boolean'?value.titleMusicEnabled:true,muted:typeof value.muted==='boolean'?value.muted:false,masterVolume:volume('masterVolume'),ambienceVolume:volume('ambienceVolume'),effectsVolume:volume('effectsVolume'),musicVolume:volume('musicVolume')};
}
const layer=(id,gain)=>({id,gain});
export const SOUNDSCAPES={
 title:{label:'타이틀 · 봄을 기다리는 마음',layers:[]},
 room:{label:'조용한 실내',layers:[layer('room',0.22)]},
 library:{label:'도서관 · 조용한 공기',layers:[layer('room',0.14)]},
 club:{label:'동아리방 · 멀리서 들리는 말소리',layers:[layer('room',0.2),layer('crowd',0.055)]},
 cafe:{label:'카페 · 대화와 커피 잔',layers:[layer('cafe',0.65)]},
 campus:{label:'캠퍼스 · 새와 학생들',layers:[layer('birds',0.4),layer('crowd',0.16)]},
 park:{label:'공원 · 새와 멀리 노는 아이들',layers:[layer('birds',0.45),layer('children',0.17)]},
 festival:{label:'축제 · 북적이는 사람들',layers:[layer('crowd',0.65),layer('birds',0.1)]},
 market:{label:'시장 · 오가는 사람들',layers:[layer('crowd',0.55)]},
 exhibition:{label:'전시실 · 낮은 말소리',layers:[layer('room',0.18),layer('crowd',0.13)]},
 bus:{label:'버스 · 엔진과 승객들',layers:[layer('bus',0.55),layer('crowd',0.065)]},
 busstop:{label:'정류장 · 먼 차량과 사람들',layers:[layer('birds',0.3),layer('crowd',0.12)]},
 river:{label:'강변 · 물과 새',layers:[layer('water',0.38),layer('birds',0.2)]},
 valley:{label:'계곡 · 흐르는 물과 새',layers:[layer('water',0.65),layer('birds',0.28)]},
 sea:{label:'바닷가 · 밀려오는 파도',layers:[layer('sea',0.65)]},
 coastNight:{label:'밤바다 · 파도와 밤벌레',layers:[layer('sea',0.45),layer('night',0.12)]},
 pool:{label:'수영장 · 물장구와 노는 소리',layers:[layer('pool',0.5)]},
 poolDusk:{label:'저녁 테라스 · 먼 수영장과 밤벌레',layers:[layer('pool',0.19),layer('night',0.16)]},
 night:{label:'밤 산책길 · 풀벌레',layers:[layer('night',0.45)]},
 lodge:{label:'MT 숙소 · 낮은 대화',layers:[layer('room',0.22),layer('crowd',0.22)]},
 party:{label:'MT 모임 · 웃음과 대화',layers:[layer('crowd',0.5)]},
 fireworks:{label:'불꽃놀이 · 불꽃과 강변 인파',layers:[layer('fireworks',0.45),layer('crowd',0.2)]},
 rain:{label:'빗소리',layers:[layer('rain',0.55)]}
};
export const BACKGROUND_AUDIO={
 'bg.cafe_evening310':'cafe','bg.campus_evening310':'night','bg.market_evening310':'market','bg.bookshop_evening310':'library','bg.city_gallery_evening310':'exhibition',
 'bg.campus_day':'campus','bg.campus_summer':'campus','bg.campus_talk170':'campus',
 'bg.cafe_day':'cafe','bg.cafe_summer180':'cafe','bg.office_day':'room',
 'bg.park_day':'park','bg.cherry_day':'festival','bg.festival_day':'festival','bg.festival_booth_day':'festival',
 'bg.library_day':'library','bg.library130_evening':'library','bg.library_talk170':'library','bg.bookshop_day':'library',
 'bg.lecture_day':'room','bg.seminar_day':'exhibition','bg.club_day':'club','bg.club_talk170':'club',
 'bg.home_day':'room','bg.home_night':'room','bg.city_gallery_day':'exhibition',
 'bg.exhibition_evening':'exhibition','bg.exhibition_night':'room',
 'bg.market_day':'market','bg.bus_day':'bus','bg.bus_summer180':'bus','bg.busstop_day':'busstop',
 'bg.river_day':'river','bg.fireworks_night':'fireworks',
 'bg.spring_lodge_night':'lodge','bg.summer_lodge_night':'lodge','bg.spring_lodge_party_night':'party',
 'bg.spring_lodge_path_night':'night','bg.lodge_coast_night':'coastNight',
 'bg.beach_lodge130_night':'lodge','bg.valley_lodge130_night':'lodge','bg.hotel_lounge130_night':'exhibition',
 'bg.valley_path130_dusk':'night','bg.pool_terrace130_dusk':'poolDusk',
 'bg.sea130_day':'sea','bg.valley130_day':'valley','bg.pool130_day':'pool'
};
export function soundscapeFor(scene){
 if(!scene)return null;
 if(scene.soundscape&&SOUNDSCAPES[scene.soundscape])return scene.soundscape;
 return BACKGROUND_AUDIO[scene.background]??'room';
}
export function situationCue(step){
 if(step.kind!=='dialogue')return null;
 if(step.line.sfx)return step.line.sfx;
 if(step.line.speaker!=='narrator'||step.line.reading240?.kind==='thought')return null;
 const text=step.line.text??'';
 // Only completed, present-scene actions; quoted fiction and hypothetical calls do not ring.
 if(/[“”"]/.test(text))return null;
 if(/어머니에게 (?:먼저 )?전화를 걸었다/.test(text))return 'phone-dial';
 if(/전화를 끊고|통화를 마친 뒤/.test(text))return 'phone-end';
 if(/문을 (?:조심스럽게 |천천히 )?(?:열었다|닫았다)/.test(text))return 'door';
 if(/(?:책장|공책|원고)의? (?:한 쪽|페이지|쪽)을 넘겼다/.test(text))return 'paper';
 return null;
}

export class SoundDirector{
 constructor({settings={},onStatus=()=>{},contextFactory,fetcher=globalThis.fetch?.bind(globalThis)}={}){
  this.settings=audioSettings(settings);this.onStatus=onStatus;this.contextFactory=contextFactory;this.fetcher=fetcher;
  this.context=null;this.profile=null;this.weather=null;this.music=null;this.quiet=false;this.scene=null;this.playing=new Map();this.retiring=new Set();this.cache=new Map();this.pending=new Map();this.failed=new Map();this.effects=new Set();this.cueKey=null;this.epoch=0;this.hidden=false;this.disposed=false;this.unlockTask=null;this.lastError='';this.ringtone=null;this.songPreview=null;this.songRequest=0;
 }
 get status(){return {supported:!!(this.contextFactory??globalThis.AudioContext??globalThis.webkitAudioContext),unlocked:this.context?.state==='running',muted:this.settings.muted,profile:this.profile,music:this.music,weather:this.weather,quiet:this.quiet,preview:this.songPreview?.id??null,label:SOUNDSCAPES[this.profile]?.label??'장소에 맞는 환경음',playing:[...this.playing.keys()],error:this.lastError};}
 notify(){this.onStatus(this.status);}
 async unlock(){
  if(this.disposed||this.hidden)return false;
  // A pending resume from an earlier, rejected gesture must not swallow a real tap.
  const task=this.activate().finally(()=>{if(this.unlockTask===task)this.unlockTask=null;});
  this.unlockTask=task;return task;
 }
 async activate(){
  try{
   if(!this.settings.muted&&this.settings.masterVolume)playbackSession281();
   if(!this.context){
    const Factory=this.contextFactory??globalThis.AudioContext??globalThis.webkitAudioContext;
    if(!Factory){this.notify();return false;}
    this.context=this.contextFactory?Factory():new Factory();
    this.master=this.context.createGain();this.ambient=this.context.createGain();this.fx=this.context.createGain();this.musicGain=this.context.createGain();
    const compressor=this.context.createDynamicsCompressor();compressor.threshold.value=-15;compressor.knee.value=16;compressor.ratio.value=5;
    this.ambient.connect(this.master);this.fx.connect(this.master);this.musicGain.connect(this.master);this.master.connect(compressor);compressor.connect(this.context.destination);
    this.updateGains(true);this.context.onstatechange=()=>{if(this.context.state==='running'&&!this.hidden&&!this.disposed){this.updateGains();this.syncAmbience();}this.notify();};
   }
   if(this.context.state!=='running'){
    const resumed=this.context.resume();
    const pulse=this.context.createBufferSource();pulse.buffer=this.context.createBuffer(1,1,this.context.sampleRate);pulse.connect(this.master);pulse.onended=()=>pulse.disconnect();pulse.start();
    await resumed;
   }
   if(this.context.state!=='running'){this.notify();return false;}
   if(!this.failed.size)this.lastError='';this.syncAmbience();this.notify();return true;
  }catch{this.lastError='소리를 시작하려면 화면을 한 번 더 눌러 줘.';this.notify();return false;}
 }
 ramp(param,value,duration=0.3){
  const now=this.context.currentTime;
  if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(now);else {param.cancelScheduledValues(now);param.setValueAtTime(param.value,now);}
  param.linearRampToValueAtTime(value,now+duration);
 }
 updateGains(immediate=false){
  if(!this.context)return;const duration=immediate?0:0.025;
  this.ramp(this.master.gain,this.settings.muted||this.hidden?0:this.settings.masterVolume,duration);
  this.ramp(this.ambient.gain,this.quiet?0:this.settings.ambienceVolume*(this.ringtone?0.45:1),this.quiet?.8:duration);
  this.ramp(this.musicGain.gain,this.quiet?0:this.settings.musicVolume*(this.songPreview?0:this.ringtone?0.35:1),this.quiet?.8:duration);
  this.ramp(this.fx.gain,this.settings.effectsVolume,duration);
  if(this.songPreview)this.ramp(this.songPreview.gain.gain,this.settings.musicVolume*.5,duration);
 }
 setSettings(value){
  this.settings=audioSettings(value);if(this.settings.muted||!this.settings.masterVolume||!this.settings.musicVolume)this.stopSong();this.updateGains();
  if(this.settings.muted||!this.settings.masterVolume||!this.settings.effectsVolume)this.stopEffects();
  this.syncAmbience();this.notify();
 }
 setScene(scene){
  const profile=soundscapeFor(scene),weather=scene?.weather??null,music=scene?.music??null;
  this.scene=scene;
  if(profile===this.profile&&weather===this.weather&&music===this.music)return;
  this.profile=profile;this.weather=weather;this.music=music;this.failed.clear();this.lastError='';this.epoch++;this.syncAmbience();this.notify();
 }
 present(scene,step,{repaintOnly=false}={}){
  this.quiet=Boolean(step.kind==='dialogue'&&((step.line.audioQuiet??scene?.audioQuiet)||step.index===0&&/_CONFESS|_TOGETHER|^END150_/.test(scene?.id??'')));
  this.setScene({...scene,music:musicFor280(scene,step)});this.updateGains();
  if(repaintOnly)return;
  const key=step.event.id+':'+step.index+':'+step.kind;
  if(key===this.cueKey)return;
  this.stopSong();this.cueKey=key;this.stopRing();
  const cue=situationCue(step);if(cue)this.play(cue);
  else if(walking280(step))this.play('footsteps',{surface:floorFor280(scene)});
 }
 async buffer(id){
  if(this.cache.has(id)){const b=this.cache.get(id);this.cache.delete(id);this.cache.set(id,b);return b;}
  if(this.pending.has(id))return this.pending.get(id);
  const job=(async()=>{
   if(id==='wind280'){const buffer=this.context.createBuffer(1,this.context.sampleRate*12,this.context.sampleRate),out=buffer.getChannelData(0);let low=0;for(let i=0;i<out.length;i++){low=.97*low+.03*(Math.random()*2-1);const t=i/this.context.sampleRate;out[i]=low*(.65+.3*Math.sin(t*Math.PI/6))*.8*Math.sin(Math.PI*i/out.length)**2;}return buffer;}
   let buffer,error;
   // MP3 works in Android WebViews that cannot decode the former AAC-only loops.
   for(const extension of id===TITLE_MUSIC330?['m4a','wav']:['mp3','m4a']){
    try{buffer=await loadAudio281(this.context,this.fetcher,new URL('../audio/'+id+'.'+extension,import.meta.url));break;}catch(e){error=e;}
   }
   if(!buffer)throw error;
   if(this.disposed)return buffer;
   this.cache.set(id,buffer);
   while(this.cache.size>4)this.cache.delete(this.cache.keys().next().value);
   return buffer;
  })().finally(()=>this.pending.delete(id));
  this.pending.set(id,job);return job;
 }
 retire(id,immediate=false){
  const item=this.playing.get(id);if(!item)return;this.playing.delete(id);this.retiring.add(item);
  this.ramp(item.gain.gain,0,immediate?0:0.65);try{item.source.stop(this.context.currentTime+(immediate?0:0.7));}catch{}
 }
 syncAmbience(){
  if(!this.context)return;
  const audible=!this.disposed&&!this.hidden&&!this.settings.muted&&this.settings.masterVolume>0&&this.context.state==='running';
  let layers=audible&&this.settings.ambienceVolume>0?[...(SOUNDSCAPES[this.profile]?.layers??[])]:[];
  if(this.weather==='rain'&&audible&&this.settings.ambienceVolume>0){layers=layers.filter(l=>!['birds','children'].includes(l.id));layers.push(layer('rain',/cafe|home|office|library|lodge/.test(this.scene?.location??'')?.2:.5));}
  if(this.weather==='wind'&&audible&&this.settings.ambienceVolume>0)layers.push(layer('wind280',.55));
  const desired=new Map(layers.map(l=>[l.id,{level:l.gain,channel:'ambience'}])),epoch=this.epoch;
  if(audible&&this.settings.musicVolume>0&&MUSIC_FILES280[this.music]&&(this.profile!=='title'||this.settings.titleMusicEnabled))desired.set(MUSIC_FILES280[this.music],{level:this.profile==='title'?.72:.5,channel:'music'});
  for(const id of this.playing.keys())if(!desired.has(id))this.retire(id,!audible);
  for(const [id,{level,channel}] of desired){
   if(this.playing.has(id)){this.ramp(this.playing.get(id).gain.gain,level,0.9);continue;}
   this.buffer(id).then(buffer=>{
    if(this.disposed||epoch!==this.epoch||this.hidden||this.settings.muted||!this.settings.masterVolume||!(channel==='music'?this.settings.musicVolume:this.settings.ambienceVolume)||this.context.state!=='running'||this.playing.has(id)||channel==='music'&&this.profile==='title'&&!this.settings.titleMusicEnabled)return;
    const source=this.context.createBufferSource(),gain=this.context.createGain();source.buffer=buffer;source.loop=true;source.connect(gain);gain.connect(channel==='music'?this.musicGain:this.ambient);gain.gain.value=0;
    const item={source,gain};this.playing.set(id,item);source.onended=()=>{source.disconnect();gain.disconnect();this.retiring.delete(item);if(this.playing.get(id)===item)this.playing.delete(id);};source.start();this.ramp(gain.gain,level,1.1);this.failed.delete(id);this.lastError=this.failed.size?'환경음이나 음악을 불러오지 못했어. 소리 다시 연결을 눌러 줘.':'';this.notify();
   }).catch(()=>{if(epoch!==this.epoch||this.disposed)return;this.failed.set(id,true);this.lastError='환경음이나 음악을 불러오지 못했어. 소리 다시 연결을 눌러 줘.';this.notify();});
  }
 }
 effectBuffer(kind,{character='group',surface='pavement'}={}){
  const ctx=this.context,rate=ctx.sampleRate,duration=kind==='phone-ring'?2.8:kind==='phone-dial'?1.15:kind==='message'?0.7:kind==='footsteps'?1.25:kind==='paper'?0.32:0.24;
  const buffer=ctx.createBuffer(1,Math.ceil(rate*duration),rate),out=buffer.getChannelData(0);
  const note=(t,hz,start,length,level)=>{const u=t-start;if(u<0||u>=length)return 0;return Math.sin(2*Math.PI*hz*u)*Math.min(1,u/0.008)*Math.exp(-u*7/length)*level;};
  let low=0;
  for(let i=0;i<out.length;i++){
   const t=i/rate;let v=0;
   if(kind==='message'){const melody=ALERT_NOTES280[character]??ALERT_NOTES280.group;for(let j=0;j<melody.length;j++)v+=note(t,melody[j],j*.12,.34,j===0?.26:.2);}
   else if(kind==='footsteps'){
    for(const start of [0,.4,.8]){const u=t-start;if(u<0||u>.3)continue;const noise=Math.random()*2-1;low=.82*low+.18*noise;
     const hard=['pavement','tile','wood'].includes(surface),freq=surface==='wood'?135:surface==='tile'?550:220;
     v+=(hard?Math.sin(2*Math.PI*freq*u)*.11*Math.exp(-u*60)+noise*.025*Math.exp(-u*110):(surface==='gravel'?noise*.12+low*.08:surface==='wet'?noise*.045+low*.18:surface==='sand'?low*.22:low*.14))*Math.exp(-u*(hard?16:11))*Math.min(1,u/.005);
    }
   }
   else if(kind==='send'){v=note(t,620,0,.13,.2)+note(t,940,.07,.15,.2);}
   else if(kind==='phone-ring'){
    for(const start of [0,.26,.52,.78])v+=note(t,660,start,.21,.18)+note(t,880,start,.21,.12);
   }else if(kind==='phone-dial'){if(t<.85)v=(Math.sin(t*2*Math.PI*440)+Math.sin(t*2*Math.PI*480))*.1*Math.min(1,t/.015,Math.max(0,(.85-t)/.02));}
   else if(kind==='phone-answer'||kind==='phone-end'){v=note(t,kind==='phone-answer'?740:420,0,.18,.22);}
   else if(kind==='paper'){const noise=Math.random()*2-1;low=.85*low+.15*noise;v=(noise-low)*.12*Math.sin(Math.PI*t/duration)**2;}
   else if(kind==='door'){low=.94*low+.06*(Math.random()*2-1);v=low*.8*Math.exp(-t*30)+note(t,95,0,.17,.1);}
   out[i]=v;
  }return buffer;
 }
 play(kind,options={}){
  if(!['message','send','phone-ring','phone-dial','phone-answer','phone-end','paper','door','footsteps'].includes(kind)||!this.context||this.context.state!=='running'||this.hidden||this.settings.muted||!this.settings.masterVolume||!this.settings.effectsVolume)return false;
  if(kind==='phone-ring')this.stopRing();
  const source=this.context.createBufferSource();source.buffer=this.effectBuffer(kind,options);source.connect(this.fx);this.effects.add(source);
  source.onended=()=>{this.effects.delete(source);source.disconnect();if(this.ringtone===source){this.ringtone=null;this.updateGains();}};
  if(kind==='phone-ring'){source.loop=true;this.ringtone=source;this.updateGains();}
  source.start();if(kind==='phone-ring')source.stop(this.context.currentTime+5.6);return true;
 }
 async playSong(track){
  const id=MUSIC_FILES280[track];if(!id)return false;
  const unlocked=this.unlock();this.stopSong();const request=this.songRequest;
  if(!await unlocked||request!==this.songRequest||this.disposed||this.hidden||this.settings.muted||!this.settings.masterVolume||!this.settings.musicVolume)return false;
  const epoch=this.epoch;try{
   const buffer=await this.buffer(id);if(this.disposed||this.hidden||request!==this.songRequest||epoch!==this.epoch||this.settings.muted||!this.settings.musicVolume)return false;
   const source=this.context.createBufferSource(),gain=this.context.createGain();source.buffer=buffer;source.connect(gain);gain.connect(this.master);gain.gain.value=this.settings.musicVolume*.5;
   const item={id:track,source,gain};this.songPreview=item;source.onended=()=>{source.disconnect();gain.disconnect();if(this.songPreview===item){this.songPreview=null;this.updateGains();this.notify();}};
   source.start();source.stop(this.context.currentTime+(buffer.duration||45));this.updateGains();this.notify();return true;
  }catch{this.lastError='추천곡을 불러오지 못했어. 잠시 뒤 다시 눌러 줘.';this.notify();return false;}
 }
 stopSong(){this.songRequest++;const item=this.songPreview;if(!item)return;this.songPreview=null;try{item.source.stop();}catch{}item.source.disconnect();item.gain.disconnect();this.updateGains();this.notify();}
 stopRing(){if(this.ringtone){const source=this.ringtone;this.ringtone=null;try{source.stop();}catch{}this.updateGains();}}
 stopEffects(){this.stopRing();for(const source of this.effects){try{source.stop();}catch{}}this.effects.clear();}
 setHidden(hidden){
  this.hidden=hidden;this.epoch++;this.updateGains();
  if(hidden){this.stopSong();this.stopEffects();for(const id of this.playing.keys())this.retire(id,true);this.context?.suspend().catch(()=>{});}
  else if(this.context)this.unlock();
  this.notify();
 }
 toTitle(){this.quiet=false;this.stopSong();this.stopEffects();this.cueKey=null;this.setScene({id:'TITLE330',soundscape:'title',location:'title',music:'title-warm'});this.updateGains();}
 destroy(){this.stopSong();this.disposed=true;this.epoch++;this.stopEffects();for(const id of this.playing.keys())this.retire(id,true);for(const item of this.retiring){try{item.source.stop();}catch{}}this.cache.clear();this.context?.close().catch(()=>{});}
}
