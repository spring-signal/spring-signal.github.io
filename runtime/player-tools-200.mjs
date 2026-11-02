import {minjunKnown320,timeline320} from './player-experience-320.mjs?v=330';
import {historyChoice320} from './topic-320.mjs?v=320';
import {notebook300} from './continuity-300.mjs?v=310';
import {GIFT_TASTES300} from '../story/continuity-content-300.mjs?v=310';
import {restoredReader} from './game-session.mjs?v=340';
import {relationshipStatus} from './relationship-state.mjs?v=200';
export const SLOT_KEY='spring-signal-manual-slots-200';
export const READ_KEY='spring-signal-read-lines-200';
const clone=v=>JSON.parse(JSON.stringify(v));
export class ManualSlots {
 constructor(manifest,storage){this.manifest=manifest;this.storage=storage;this.entries=Array(5).fill(null);this.error='';this.raw=null;
  try{const raw=storage?.getItem(SLOT_KEY);if(!raw)return;this.raw=raw;const data=JSON.parse(raw);if(data.schema!=='spring-signal-slots-1'||!Array.isArray(data.entries)||data.entries.length!==5)throw Error('저장 칸 형식을 확인해 줘.');this.entries=data.entries.map(e=>e?this.verify(e):null);}catch{this.error='저장 칸을 읽지 못했어. 현재 자동 저장은 그대로야.';}
 }
 verify(entry){const r=restoredReader(entry.snapshot,this.manifest);if(!r.isStory)throw Error('본편 진행만 저장 칸에 보관할 수 있어.');return {snapshot:r.export(),name:r.state.playerName||'나',chapter:r.current().event.label,at:String(entry.at??'')};}
 save(index,snapshot){if(!Number.isInteger(index)||index<0||index>4)throw Error('저장 칸을 확인해 줘.');if(this.error)throw Error(this.error);const entry=this.verify({snapshot,at:new Date().toISOString()}),next=this.entries.map(clone);next[index]=entry;if(!this.storage)throw Error('이 브라우저에서는 저장이 막혀 있어. 진행 파일 저장을 이용해 줘.');try{this.storage.setItem(SLOT_KEY,JSON.stringify({schema:'spring-signal-slots-1',entries:next}));}catch{throw Error('저장 공간이 부족해서 이 칸을 바꾸지 않았어. 진행 파일 저장을 이용해 줘.');}this.entries=next;return clone(entry);}
 load(index){const e=this.entries[index];if(!e)throw Error('아직 비어 있는 저장 칸이야.');return this.verify(e).snapshot;}
}
function hash(text){let h=2166136261;for(const ch of text){h^=ch.codePointAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
export function readLineKey(reader){const t=reader.current();return t.kind==='dialogue'?`${reader.isStory?'story':'preview'}:${t.event.id}:${hash(t.line.speaker+'\0'+t.line.text)}`:null;}
export class ReadLines{
 constructor(storage){this.storage=storage;this.keys=new Set();try{const a=JSON.parse(storage?.getItem(READ_KEY)??'[]');if(Array.isArray(a))for(const k of a.slice(-12000))if(typeof k==='string'&&k.length<160)this.keys.add(k);}catch{}}
 has(key){return Boolean(key&&this.keys.has(key));}
 mark(key){if(!key)return;this.keys.delete(key);this.keys.add(key);while(this.keys.size>12000)this.keys.delete(this.keys.values().next().value);try{this.storage?.setItem(READ_KEY,JSON.stringify([...this.keys]));}catch{}}
}
const waiting=['waiting','heard','practiced'];
export function relationNotebook(reader,names,{character='',query=''}={}){
 if(!reader.isStory)return {people:[],character:'',status:'본편에서 관계 노트를 볼 수 있어.',questions:[],appointments:[],choices:[],lines:[]};
 const w=reader.world,f=w.flags,people=Object.keys(w.people).filter(c=>w.people[c].met).concat(minjunKnown320(reader)?['minjun']:[]),c=people.includes(character)?character:people[0]??'';
 if(!c)return {people,character:c,status:'아직 기록할 만남이 없어.',questions:[],appointments:[],choices:[],lines:[]};
 const questions=[];
 if(waiting.includes(f['separation200State_'+c]))questions.push('관계를 계속할지 나눈 말이 남아 있어. 다음 만남에서도 그 질문을 이어 가기로 했어.');
 if(['strained','observing','testing'].includes(f['couple160State_'+c]))questions.push('연인이 된 뒤 끝내지 못한 대화가 있어. 다른 날의 행동도 함께 지켜보는 중이야.');
 if(['unsettled','observing','testing'].includes(f['friction_'+c])||['hesitant','unsettled','observing','testing'].includes(f['bond140_'+c]))questions.push('서로 다르게 받아들였던 마음을 아직 이야기하는 중이야.');
 if(f['romance150Paused_'+c])questions.push('마음은 나눴지만 관계의 답은 아직 함께 정하지 않았어.');
 if(f['couple160Ended_'+c])questions.push('관계를 마친 뒤 서로 원한 거리를 남겨 두고 있어.');
 if(f['dilemma200State_'+c]==='waiting')questions.push('서로의 일정 때문에 고른 방식이 다음 만남에도 어떻게 남는지 들어볼 이야기가 있어.');
 if(Number(f['goal200_'+c])>0&&Number(f['goal200_'+c])<3)questions.push('직접 들은 개인 계획의 다음 소식을 기다리는 중이야.');
 const appointments=Object.values(w.appointments).filter(a=>a.character===c&&['pending','alternative','confirmed'].includes(a.status)).map(a=>({label:a.label,place:a.place,week:a.week,day:a.day,time:a.time,status:{pending:'답장 대기',alternative:'시간 조정 중',confirmed:'확정'}[a.status]}));
 const decisions=reader.state.decisions;const choices=decisions.filter(d=>d.nodeId.includes('_'+c+'_')||reader.nodes.get(d.nodeId)?.cast?.includes(c)).slice(-15).map(d=>{const ch=historyChoice320(reader,d);return ch?{chapter:ch.chapter,text:ch.label}:null;}).filter(Boolean);
 const needle=String(query).trim().toLocaleLowerCase(),all=reader.log();const lines=all.filter(l=>(l.speaker===c||l.chapter?.includes(names[c]))&&(!needle||(l.text+' '+l.chapter).toLocaleLowerCase().includes(needle))).slice(-60).map(l=>({...l,text:l.text.replaceAll('{name}',reader.state.playerName||'나')}));
 return {people,character:c,status:c==='minjun'?'친구':relationshipStatus(w,c),timeline:timeline320(reader,c).filter(r=>!needle||(r.title+' '+r.week).toLocaleLowerCase().includes(needle)),questions,appointments,memories:(c==='minjun'?['함께 나눈 일상과 기록팀 이야기가 우리의 시간에 남아.']:notebook300(w,c,GIFT_TASTES300)).filter(t=>!needle||t.toLocaleLowerCase().includes(needle)),choices:choices.filter(ch=>!needle||(ch.text+' '+ch.chapter).toLocaleLowerCase().includes(needle)),lines};
}
