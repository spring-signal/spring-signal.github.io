import {restoredReader} from './game-session.mjs?v=340';
export const MEMORIES_KEY='spring-signal-ending-memories-160',MEMORIES_SCHEMA='spring-signal-ending-memories-1';
const people=['seoyeon','jiwoo','haerin','yuna','minseo','doa'];
export const ENDING_COUNT=17;
const copy=v=>JSON.parse(JSON.stringify(v));
function summary(reader){
 const view=reader.inspect(),f=view.world.flags,id=view.node.id;
 if(!view.node.terminal||view.kind!=='end'||reader.state.lineIndex<view.lines.length)throw Error('끝까지 읽은 결말만 모을 수 있어.');
 let key,title=view.node.label;
 const c=people.find(c=>id==='END150_'+c);
 if(c){if(f.ending150!=='romance-'+c||!f['romance150Lover_'+c])throw Error('확인하지 않은 관계의 결말이야.');const pending=['waiting','heard','practiced'].includes(f['separation200State_'+c])||['unsettled','observing','testing'].includes(f['friction_'+c])||['hesitant','unsettled','observing','testing'].includes(f['bond140_'+c])||['strained','observing','testing'].includes(f['couple160State_'+c]);key='romance-'+c+(pending?'-unsettled':'');if(pending)title+=' · 남은 대화';}
 else if(['FRIENDS','UNFINISHED','ALONE'].some(s=>id==='END150_'+s)){key=id.slice(7).toLowerCase();if(f.ending150!==key)throw Error('결말 기록이 맞지 않아.');}
 else if(id==='END160_OVERLAP'&&f.ending160==='overlap'&&f.overlap160Ever)key='overlap';
 else if(id==='END160_SEPARATED'&&f.ending160==='separated')key='separated';
 else throw Error('모을 수 있는 결말 기록이 아니야.');
 return {id:key,title,playerName:reader.state.playerName||'나',week:view.node.week};
}
export class EndingMemories{
 constructor(manifest,storage){this.manifest=manifest;this.storage=storage;this.entries=[];this.collectionOkay=true;this.invalidCount=0;this.originalRaw=null;let raw=null;
  try{raw=storage?.getItem(MEMORIES_KEY);if(raw){const data=JSON.parse(raw);if(data.schema!==MEMORIES_SCHEMA||!Array.isArray(data.entries)||data.entries.length>ENDING_COUNT)throw Error('결말 모음 형식이 맞지 않아.');for(const entry of data.entries){try{const valid=this.validate(entry.snapshot);if(valid.id!==entry.id)throw Error('결말 이름이 맞지 않아.');if(!this.entries.some(e=>e.id===valid.id))this.entries.push({...valid,recordedAt:entry.recordedAt??'',snapshot:valid.snapshot});}catch{this.invalidCount++;}}if(this.invalidCount&&storage&&!storage.getItem(MEMORIES_KEY+'-backup'))storage.setItem(MEMORIES_KEY+'-backup',raw);}}
  catch{this.collectionOkay=false;this.invalidCount++;this.originalRaw=raw;if(raw&&storage)try{if(!storage.getItem(MEMORIES_KEY+'-backup'))storage.setItem(MEMORIES_KEY+'-backup',raw);}catch{}}
 }
 validate(snapshot){const reader=restoredReader(snapshot,this.manifest);if(!reader.isStory)throw Error('본편을 끝까지 읽은 기록이 필요해.');return {...summary(reader),snapshot:reader.export()};}
 persist(entries){if(!this.storage){this.collectionOkay=false;return false;}try{if(this.originalRaw&&!this.storage.getItem(MEMORIES_KEY+'-backup'))this.storage.setItem(MEMORIES_KEY+'-backup',this.originalRaw);this.storage.setItem(MEMORIES_KEY,JSON.stringify({schema:MEMORIES_SCHEMA,entries}));this.entries=entries;this.originalRaw=null;this.collectionOkay=true;return true;}catch{this.collectionOkay=false;return false;}}
 record(snapshot){let valid;try{valid=this.validate(snapshot);}catch{return false;}if(this.entries.some(e=>e.id===valid.id))return true;return this.persist([...this.entries,{...valid,recordedAt:new Date().toISOString()}]);}
 export(){return copy({schema:MEMORIES_SCHEMA,entries:this.entries});}
 import(data){if(data?.schema!==MEMORIES_SCHEMA||!Array.isArray(data.entries)||data.entries.length>ENDING_COUNT)throw Error('결말 모음 파일이 아니야.');const verified=data.entries.map(e=>{const v=this.validate(e.snapshot);if(e.id!==v.id)throw Error('결말 기록과 이름이 맞지 않아.');return {...v,recordedAt:e.recordedAt??new Date().toISOString()};});const next=[...this.entries];for(const e of verified)if(!next.some(old=>old.id===e.id))next.push(e);if(next.length>ENDING_COUNT)throw Error('결말 모음의 크기를 확인해 줘.');if(!this.persist(next))throw Error('결말 모음을 저장할 공간이 부족해. 현재 이야기는 그대로야.');return this.entries.length;}
 recall(id,{history=false,page=0,size=100}={}){const entry=this.entries.find(e=>e.id===id);if(!entry)throw Error('아직 기록하지 않은 결말이야.');const reader=restoredReader(entry.snapshot,this.manifest),view=reader.inspect(),all=history?reader.log():view.lines;const safeSize=Math.min(200,Math.max(20,size)),pages=Math.max(1,Math.ceil(all.length/safeSize)),safePage=Math.min(pages-1,Math.max(0,page));return {...summary(reader),history,page:safePage,pages,lines:all.slice(safePage*safeSize,(safePage+1)*safeSize).map(l=>({speaker:l.speaker??'narrator',text:l.text.replaceAll('{name}',entry.playerName),chapter:l.chapter??view.node.label}))};}
}
