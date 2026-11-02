import {developmentTools340} from './build-channel-340.mjs?v=340';
import {ensureRun330,normalizeHudFields330} from './player-notes-330.mjs?v=330';
import {migrateCampaign320} from './campaign-migration-320.mjs?v=330';
import {migrateCampaign300} from './campaign-migration-300.mjs?v=330';
import {EventReader} from './event-reader.mjs?v=310';
import {StoryReader,STORY_SCHEMA} from './story-reader.mjs?v=330';
import {migrateCampaign280} from './campaign-migration-280.mjs?v=330';
import {audioSettings} from './sound-270.mjs?v=330';
export const EXPANSION320_BACKUP_KEY='spring-signal-story-before-320';
export const SAVE_KEY='spring-signal-story-060',SAMPLE_SAVE_KEY='spring-signal-game-050',LEGACY_SAVE_KEY='spring-signal-scene-preview-042',SETTINGS_KEY='spring-signal-settings-050';
export const BACKUP_KEY='spring-signal-story-before-080';
export const MT_BACKUP_KEY='spring-signal-story-before-090';
export const DEPTH_BACKUP_KEY='spring-signal-story-before-100';
export const EVERYDAY_BACKUP_KEY='spring-signal-story-before-120';
export const SEMESTER_BACKUP_KEY='spring-signal-story-before-130';
export const EXPANSION_BACKUP_KEY='spring-signal-story-before-200';
export const REVIEW_BACKUP_KEY='spring-signal-story-before-190';
export const CONTINUITY_BACKUP_KEY='spring-signal-story-before-180';
export const LIFE_BACKUP_KEY='spring-signal-story-before-160';
export const ROMANCE_BACKUP_KEY='spring-signal-story-before-150';
export const ACTING_BACKUP_KEY='spring-signal-story-before-140';
export const LINKS_BACKUP_KEY='spring-signal-story-before-110';
export const CAMPAIGN_BACKUP_KEY='spring-signal-story-before-280';
export const REVIEW310_BACKUP_KEY='spring-signal-story-before-310';
export const CONTINUITY300_BACKUP_KEY='spring-signal-story-before-300';
export function normalizedSettings(value={},reducedMotion=false){return {fontScale:Math.min(1.4,Math.max(.9,Number(value.fontScale)||1)),textSpeed:[0,22,40].includes(Number(value.textSpeed))?Number(value.textSpeed):0,hudFields330:normalizeHudFields330(value.hudFields330),hudMode:['auto','full','compact','hidden'].includes(value.hudMode)?value.hudMode:'auto',quality:value.quality==='auto'?'auto':'high',motion:typeof value.motion==='boolean'?value.motion:!reducedMotion,...audioSettings(value)};}
export function restoredReader(saved,manifest){
 if(!developmentTools340(manifest)&&saved?.schema!==STORY_SCHEMA)throw Error('공개 플레이에서는 본편 진행 파일을 불러와 줘.');
 if(saved?.schema===STORY_SCHEMA){
  if(!manifest.story)throw Error('본편 정보가 없습니다.');
  if(manifest.story.narrativeRevision==='0.32.0'&&saved.narrativeRevision!=='0.32.0'){if(!manifest.story310)throw Error('이전 검토본 정보가 없습니다.');return migrateCampaign320(restoredReader(saved,{...manifest,story:manifest.story310}),manifest);}
  if(manifest.story.narrativeRevision==='0.30.0'&&saved.narrativeRevision!=='0.30.0'){if(!manifest.story290)throw Error('이전 일상 이야기 정보가 없습니다.');return migrateCampaign300(restoredReader(saved,{...manifest,story:manifest.story290}),manifest);}
  if(manifest.story.narrativeRevision==='0.28.0'&&saved.narrativeRevision!=='0.28.0'){
   if(!manifest.story270)throw Error('개정 전 이야기 검증 정보가 없습니다.');
   return migrateCampaign280(restoredReader(saved,{...manifest,story:manifest.story270}),manifest);
  }
  if(manifest.story.narrativeRevision==='0.20.0'&&saved.narrativeRevision!=='0.20.0'){
   if(!manifest.story190)throw Error('이전 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story190}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.20.0';next.lineIndex=0;
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else if(updated.node===view.node)next.lineIndex=old.lineIndex;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source190===source);next.lineIndex=index>=0?index:Math.max(0,Math.min(old.lineIndex,updated.lines.length-1));}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.19.0'&&saved.narrativeRevision!=='0.19.0'){
   if(!manifest.story180)throw Error('이전 감정 연결 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story180}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.19.0';next.lineIndex=0;
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else if(updated.node===view.node)next.lineIndex=old.lineIndex;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source180===source);next.lineIndex=index>=0?index:Math.max(0,Math.min(old.lineIndex,updated.lines.length-1));}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.18.0'&&saved.narrativeRevision!=='0.18.0'){
   if(!manifest.story170)throw Error('이전 이야기·이미지 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story170}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.18.0';next.lineIndex=0;
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else if(updated.node===view.node)next.lineIndex=old.lineIndex;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source170===source);next.lineIndex=index>=0?index:Math.max(0,Math.min(old.lineIndex,updated.lines.length-1));}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.16.0'&&saved.narrativeRevision!=='0.16.0'){
   if(!manifest.story150)throw Error('이전 관계·결말 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story150}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.16.0';next.lineIndex=0;
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source150===source);next.lineIndex=index>=0?index:Math.min(old.lineIndex,updated.lines.length-1);}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.15.0'&&saved.narrativeRevision!=='0.15.0'){
   if(!manifest.story140)throw Error('이전 감정·표정 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story140}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.15.0';next.lineIndex=0;
   if(old.nodeId==='SUMMER24_END'&&old.lineIndex>=view.lines.length){next.nodeId='END150_REVIEW';return new StoryReader(manifest.story,manifest,next);}
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source140===source);next.lineIndex=index>=0?index:Math.min(old.lineIndex,updated.lines.length-1);}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.14.0'&&saved.narrativeRevision!=='0.14.0'){
   if(!manifest.story130)throw Error('이전 학기·방학 본편 검증 정보가 없습니다.');
   const oldReader=restoredReader(saved,{...manifest,story:manifest.story130}),old=oldReader.export(),view=oldReader.inspect();
   const next=JSON.parse(JSON.stringify(old));next.narrativeRevision='0.14.0';next.lineIndex=0;
   const reader=new StoryReader(manifest.story,manifest,next),updated=reader.inspect();
   if(old.lineIndex>=view.lines.length)next.lineIndex=updated.lines.length;
   else if(updated.node===view.node)next.lineIndex=old.lineIndex;
   else {const source=view.node.lines.indexOf(view.lines[old.lineIndex]),index=updated.lines.findIndex(l=>l.source130===source);next.lineIndex=index>=0?index:Math.min(old.lineIndex,updated.lines.length-1);}
   reader.restore(next);return reader;
  }
  if(manifest.story.narrativeRevision==='0.13.0'&&saved.narrativeRevision!=='0.13.0'){
   if(!manifest.story120)throw Error('이전 본편 검증 정보가 없습니다.');
   const old=restoredReader(saved,{...manifest,story:manifest.story120}).export(),next=JSON.parse(JSON.stringify(old));
   next.narrativeRevision='0.13.0';
   const last=manifest.story120.nodes.find(n=>n.id===old.nodeId);
   if(old.nodeId==='CHAPTER_TWO_END'&&old.lineIndex>=last.lines.length){next.nodeId='LATE9_SUNDAY';next.lineIndex=0;}
   return new StoryReader(manifest.story,manifest,next);
  }
  if(manifest.story.narrativeRevision==='0.12.0'&&saved.narrativeRevision!=='0.12.0'){
   if(!manifest.story110)throw Error('이전 이야기 검증 정보가 없습니다.');
   const old=restoredReader(saved,{...manifest,story:manifest.story110}).export();
   const reader=new StoryReader(manifest.story,manifest);reader.state.playerName=old.playerName;let index=0,found=false;
   for(let guard=0;guard<4000;guard++){
    const view=reader.current();
    if(reader.state.nodeId===old.nodeId&&index===old.decisions.length){reader.state.lineIndex=Math.min(old.lineIndex,reader.inspect().lines.length);found=true;break;}
    if(view.kind==='end')break;
    if(view.kind==='choices'){
     const decision=old.decisions[index];
     if(decision?.nodeId===reader.state.nodeId){reader.choose(decision.choiceId);index++;}
     else if(view.event.migrationDefault)reader.choose(view.event.migrationDefault);
     else throw Error('이전 연락과 약속 기록을 연결할 수 없습니다: '+reader.state.nodeId);
    }else reader.next();
   }
   if(!found)throw Error('이전 이어읽기 위치를 찾을 수 없습니다.');
   const received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));
   for(const key of ['readMessages','notifiedMessages'])reader.state[key]=old[key].filter(id=>received.has(id));reader.state.tutorialSeen=[...old.tutorialSeen];return reader;
  }
  if(manifest.story.narrativeRevision==='0.11.0'&&saved.narrativeRevision!=='0.11.0'){
   if(!manifest.story100)throw Error('이전 이야기 검증 정보가 없습니다.');
   const old=restoredReader(saved,{...manifest,story:manifest.story100}).export();
   const reader=new StoryReader(manifest.story,manifest);reader.state.playerName=old.playerName;let index=0,found=false;
   for(let guard=0;guard<4000;guard++){
    const view=reader.current();
    if(reader.state.nodeId===old.nodeId&&index===old.decisions.length){reader.state.lineIndex=Math.min(old.lineIndex,reader.inspect().lines.length);found=true;break;}
    if(view.kind==='end')break;
    if(view.kind==='choices'){
     const decision=old.decisions[index];
     if(decision?.nodeId===reader.state.nodeId){reader.choose(decision.choiceId);index++;}
     else if(view.event.migrationDefault)reader.choose(view.event.migrationDefault);
     else throw Error('이전 연락과 약속 기록을 연결할 수 없습니다: '+reader.state.nodeId);
    }else reader.next();
   }
   if(!found)throw Error('이전 이어읽기 위치를 찾을 수 없습니다.');
   const received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));
   for(const key of ['readMessages','notifiedMessages'])reader.state[key]=old[key].filter(id=>received.has(id));reader.state.tutorialSeen=[...old.tutorialSeen];return reader;
  }
  if(manifest.story.narrativeRevision==='0.10.0'&&saved.narrativeRevision!=='0.10.0'){
   if(!manifest.story090)throw Error('이전 이야기 검증 정보가 없습니다.');
   const old=restoredReader(saved,{...manifest,story:manifest.story090}).export();
   const reader=new StoryReader(manifest.story,manifest);reader.state.playerName=old.playerName;
   let index=0,found=false;
   for(let guard=0;guard<3000;guard++){
    const view=reader.current();
    if(reader.state.nodeId===old.nodeId&&index===old.decisions.length){reader.state.lineIndex=Math.min(old.lineIndex,reader.inspect().lines.length);found=true;break;}
    if(view.kind==='end')break;
    if(view.kind==='choices'){
     const decision=old.decisions[index];
     if(decision?.nodeId===reader.state.nodeId){reader.choose(decision.choiceId);index++;}
     else if(view.event.migrationDefault)reader.choose(view.event.migrationDefault);
     else throw Error('이전 선택과 새 장면을 연결할 수 없습니다: '+reader.state.nodeId);
    }else reader.next();
   }
   if(!found)throw Error('이전 이어읽기 위치를 찾을 수 없습니다.');
   const received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));
   reader.state.readMessages=old.readMessages.filter(id=>received.has(id));reader.state.notifiedMessages=old.notifiedMessages.filter(id=>received.has(id));reader.state.tutorialSeen=[...old.tutorialSeen];
   return reader;
  }
  if(manifest.story.narrativeRevision==='0.9.0'&&saved.narrativeRevision!=='0.9.0'){
   if(!manifest.story080)throw Error('이전 이야기 검증 정보가 없습니다.');
   const old=restoredReader(saved,{...manifest,story:manifest.story080}),next=old.export();
   const cut=next.decisions.findIndex(d=>d.nodeId==='W05_MT_DINNER'&&d.choiceId!=='rest');
   if(cut>=0){next.decisions=next.decisions.slice(0,cut);next.nodeId='W05_MT_DINNER';next.lineIndex=0;}
   if(next.nodeId==='W05_MT_RETURN')next.lineIndex=0;
   next.narrativeRevision='0.9.0';
   const read=next.readMessages,notified=next.notifiedMessages;next.readMessages=[];next.notifiedMessages=[];
   const reader=new StoryReader(manifest.story,manifest,next),received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));
   reader.state.readMessages=read.filter(id=>received.has(id));reader.state.notifiedMessages=notified.filter(id=>received.has(id));
   return reader;
  }
  if(manifest.story.narrativeRevision==='0.8.0'&&saved.narrativeRevision!=='0.8.0'){
   if(!manifest.legacyStory)throw Error('이전 이야기 검증 정보가 없습니다.');
   const old=new StoryReader(manifest.legacyStory,manifest,saved),next=old.export();
   const cut=next.decisions.findIndex(d=>d.nodeId==='W01_WED');
   if(cut>=0){next.decisions=next.decisions.slice(0,cut+1);next.nodeId='CONTACT_J080';}
   next.lineIndex=0;next.narrativeRevision='0.8.0';
   for(const key of ['readMessages','notifiedMessages'])next[key]=next[key].filter(id=>id==='h-wall-w01');
   return new StoryReader(manifest.story,manifest,next);
  }
  return new StoryReader(manifest.story,manifest,saved);
 }
 const next=JSON.parse(JSON.stringify(saved));
 if(['0.4.2','0.5.0','0.6.0','0.6.1','0.6.2','0.6.3','0.6.4','0.6.5','0.6.6','0.7.0','0.8.0'].includes(next.version)&&next.eventId==='EVENT_CLUB_MT_W05'){next.lineIndex=0;if(next.choices)delete next.choices.EVENT_CLUB_MT_W05;}
 if(['0.6.6','0.7.0','0.8.0','0.9.0','0.10.0','0.11.0','0.12.0','0.13.0','0.14.0','0.15.0','0.16.0','0.17.0','0.18.0','0.19.0'].includes(next.version))next.version=manifest.version;
 if(['0.4.2','0.5.0','0.6.0','0.6.1','0.6.2','0.6.3','0.6.4','0.6.5'].includes(next.version)){
  const changed=['EVENT_CHERRY_W04','EVENT_MIDTERM_W08','EVENT_FINALS_W16','NEWCOMER_SEMINAR_W15'];
  const aliases={EVENT_CHERRY_W04:{photo:'jiwoo',bench:'seoyeon',alley:'haerin'},EVENT_MIDTERM_W08:{twenty:'library',meal:'cafe',own:'club'},EVENT_FINALS_W16:{all:'library',small:'club',sunday:'classroom'}};
  if(next.choices&&typeof next.choices==='object')for(const [id,map]of Object.entries(aliases))if(map[next.choices[id]])next.choices[id]=map[next.choices[id]];
  if(changed.includes(next.eventId)){next.lineIndex=0;if(next.choices)delete next.choices[next.eventId];}
  next.version=manifest.version;
 }
 return new EventReader(manifest.events,manifest,next);
}
export class GameSession{
 constructor(manifest,storage){this.manifest=manifest;this.storage=storage;this.reader=manifest.story?new StoryReader(manifest.story,this.manifest):new EventReader(manifest.events,this.manifest);this.saved=null;this.storySaved=null;this.sampleSaved=null;this.storageOkay=Boolean(storage);this.view='title';this.backup=null;try{this.backup=JSON.parse(storage?.getItem(EXPANSION320_BACKUP_KEY)??storage?.getItem(REVIEW310_BACKUP_KEY)??storage?.getItem(CONTINUITY300_BACKUP_KEY)??storage?.getItem(CAMPAIGN_BACKUP_KEY)??storage?.getItem(EXPANSION_BACKUP_KEY)??storage?.getItem(REVIEW_BACKUP_KEY)??storage?.getItem(CONTINUITY_BACKUP_KEY)??storage?.getItem(LIFE_BACKUP_KEY)??storage?.getItem(ROMANCE_BACKUP_KEY)??storage?.getItem(ACTING_BACKUP_KEY)??storage?.getItem(SEMESTER_BACKUP_KEY)??storage?.getItem(EVERYDAY_BACKUP_KEY)??storage?.getItem(LINKS_BACKUP_KEY)??storage?.getItem(DEPTH_BACKUP_KEY)??storage?.getItem(MT_BACKUP_KEY)??storage?.getItem(BACKUP_KEY)??'null');}catch{}for(const key of [SAVE_KEY,SAMPLE_SAVE_KEY,LEGACY_SAVE_KEY])try{const text=storage?.getItem(key);if(!text)continue;const original=JSON.parse(text),data=restoredReader(original,manifest).export();this.preserveOriginal(original,data);if(data.schema===STORY_SCHEMA)this.storySaved??=data;else this.sampleSaved??=data;}catch{this.storageOkay=false;}this.saved=this.storySaved??this.sampleSaved;}
 preserveOriginal(original,updated){const patch=original.narrativeRevision===updated.narrativeRevision&&updated.reviewRevision===31&&original.reviewRevision!==31;if(patch){this.backup=original;this.migrationNotice=true;this.migrationMessage=updated.repair310==='declined-lunch'?'거절한 점심 초대 뒤에 잘못 열리던 만남을 건너뛰고 다음 일정부터 이어져. 이전 기록도 보관했어.':'대화와 장면 연결을 보완했어. 이전 기록을 보관하고 같은 위치에서 이어져.';try{this.storage?.setItem(REVIEW310_BACKUP_KEY,JSON.stringify(original));}catch{throw Error('이전 기록을 보관할 공간이 없어 이관을 멈췄습니다.');}return;}if(original.schema===STORY_SCHEMA&&original.narrativeRevision!==updated.narrativeRevision){this.backup=original;this.migrationNotice=true;this.migrationMessage=updated.nodeId==='W05_MT_DINNER'?'MT의 저녁과 밤 이야기가 새로 생겼어. 이전 기록을 보관하고 5주 토요일 저녁 선택부터 이어져.':updated.nodeId==='CONTACT_J080'?'연락과 약속 흐름이 개정됐어. 이전 기록을 보관하고 1주 수요일 연락처 교환부터 이어져.':updated.narrativeRevision==='0.32.0'?'새 일상과 목표 뒤 이야기를 더했어. 이전 기록을 보관하고 같은 위치에서 이어져. 새 이야기는 이후 만남부터 남아.':updated.narrativeRevision==='0.30.0'?'지난 대화·민준과 도아의 다음 이야기, 사진과 노래, 선물과 작은 약속이 이어져. 이전 원본을 보관하고 같은 위치에서 계속해. 지나간 새 일상을 만들어 넣지는 않았어.':updated.narrativeRevision==='0.28.0'?'도아의 재회와 서로 먼저 잡는 약속, 민준·근무·선물 이야기가 개정됐어. 이전 원본을 보관하고 현재 장면에서 이어져. 지나간 새 초대·급여·선물은 만들지 않았어.':updated.narrativeRevision==='0.20.0'?'미뤄 둔 관계와 개인 계획의 다음 이야기를 더했어. 이전 기록을 보관하고 같은 위치에서 이어져. 새로 선택하는 이야기는 이후 만남부터 남아.':updated.narrativeRevision==='0.19.0'?'사진을 보여 주지 않는 선택과 만남의 마무리, 갈등 뒤 안부를 보완했어. 이전 원본과 선택을 보관하고 같은 장면에서 이어져. 지나간 관계나 화해를 새로 만들지는 않아.':updated.narrativeRevision==='0.18.0'?'과거 선택의 회상과 갈등 뒤의 대화, 주차별 일상과 복선 회수를 보완했어. 이전 원본과 선택을 보관하고 같은 장면에서 이어져. 새 화해나 연인 관계를 지난 기록에 만들어 넣지는 않아.':updated.narrativeRevision==='0.16.0'?'연인이 된 뒤의 일상과 갈등, 다시 듣는 작업 이야기와 결말 모음을 연결했어. 이전 원본을 보관하고 같은 위치에서 이어져. 지나간 날에 새 갈등이나 회복을 만들어 넣지는 않아.':updated.narrativeRevision==='0.15.0'?'고백과 관계 합의, 여름의 결말을 연결했어. 이전 기록을 보관하고 같은 위치에서 이어져. 지난 만남에 새 친밀감이나 연인 관계를 만들어 넣지는 않아.':updated.narrativeRevision==='0.14.0'?'표정과 동작, 감정의 여파를 보강했어. 이전 기록을 보관하고 같은 장면에서 이어져. 새로 상처받거나 회복한 일을 지난 기록에 만들어 넣지는 않아.':updated.narrativeRevision==='0.13.0'?'9~24주와 여름 MT를 연결했어. 원본을 보관하고 같은 위치에서 이어져. 8주를 마친 기록은 다음 일요일부터 이어져.':updated.narrativeRevision==='0.12.0'?'감정의 회복과 단계별 친밀감, 긴 외출과 생활 선택을 추가했어. 원본을 보관하고 같은 장면에서 이어져. 지나간 새 감정이나 생활 진척은 만들어 넣지 않아.':updated.narrativeRevision==='0.11.0'?'연락처 재교환과 다음 약속 이야기를 추가했어. 이전 기록을 보관하고 같은 장면에서 이어져. 지나간 새 연락과 약속은 만들어 넣지 않아.':updated.narrativeRevision==='0.10.0'?'주 2회 약속과 개인 이야기를 늘렸어. 이전 기록을 보관하고 같은 위치에서 이어져. 지난주의 추가 약속은 비워 두고, 지나간 만남을 새 이야기의 완료로 세지 않아.':'주차별 의상과 MT 이야기를 업데이트했어. 이전 원본을 보관하고 현재 위치에서 이어 읽을 수 있어.';try{this.storage?.setItem(updated.narrativeRevision==='0.32.0'?EXPANSION320_BACKUP_KEY:updated.narrativeRevision==='0.30.0'?CONTINUITY300_BACKUP_KEY:updated.narrativeRevision==='0.28.0'?CAMPAIGN_BACKUP_KEY:updated.narrativeRevision==='0.20.0'?EXPANSION_BACKUP_KEY:updated.narrativeRevision==='0.19.0'?REVIEW_BACKUP_KEY:updated.narrativeRevision==='0.18.0'?CONTINUITY_BACKUP_KEY:updated.narrativeRevision==='0.16.0'?LIFE_BACKUP_KEY:updated.narrativeRevision==='0.15.0'?ROMANCE_BACKUP_KEY:updated.narrativeRevision==='0.14.0'?ACTING_BACKUP_KEY:updated.narrativeRevision==='0.13.0'?SEMESTER_BACKUP_KEY:updated.narrativeRevision==='0.12.0'?EVERYDAY_BACKUP_KEY:updated.narrativeRevision==='0.11.0'?LINKS_BACKUP_KEY:updated.narrativeRevision==='0.10.0'?DEPTH_BACKUP_KEY:updated.narrativeRevision==='0.9.0'?MT_BACKUP_KEY:BACKUP_KEY,JSON.stringify(original));}catch{this.storageOkay=false;throw Error('이전 기록을 보관할 공간이 없어 이관을 멈췄습니다.');}}}
 candidate(action){const next=restoredReader(this.reader.export(),this.manifest);action?.(next);return next;}
 startNew(name=''){this.reader=this.manifest.story?new StoryReader(this.manifest.story,this.manifest):new EventReader(this.manifest.events,this.manifest);if(this.reader.isStory){this.reader.state.playerName=String(name).trim().slice(0,16);ensureRun330(this.reader);}this.view='game';return this.reader;}
 previewEvent(id){if(!developmentTools340(this.manifest))throw Error('행사 미리보기는 개발용 게임에서 사용할 수 있어.');this.reader=new EventReader(this.manifest.events,this.manifest);this.reader.selectEvent(id);this.view='game';return this.reader;}
 continue(){if(!this.saved)return false;this.reader=ensureRun330(restoredReader(this.saved,this.manifest));this.view='game';return true;}
 commit(snapshot){const verified=restoredReader(snapshot,this.manifest);this.reader=verified;const data=verified.export(),isStory=Boolean(verified.isStory);if(isStory)this.storySaved=data;else this.sampleSaved=data;this.saved=this.storySaved??this.sampleSaved;try{if(this.storage){this.storage.setItem(isStory?SAVE_KEY:SAMPLE_SAVE_KEY,JSON.stringify(data));this.storageOkay=true;this.lastSavedAt=Date.now();}}catch{this.storageOkay=false;}return data;}
 import(snapshot){const source={...snapshot};delete source.ui330;const reader=ensureRun330(restoredReader(source,this.manifest));this.migrationNotice=false;this.migrationMessage='';this.preserveOriginal(snapshot,reader.export());return reader;}
 title(){this.view='title';}
}
