import {DAILY_TOPICS320,GOAL_AFTERMATH320} from './everyday-content-320.mjs?v=320';
const people=Object.keys(DAILY_TOPICS320),F=(key,value,when)=>({type:'flag',key,value,when}),E=(id,when)=>({type:'experience',id,when}),H=(flag,value=true)=>({flag,value}),A=(...all)=>({all:all.filter(Boolean)}),N=not=>({not}),topic=c=>({topic320:{character:c}});
const L=(row,c,when)=>({...row,when,cast:people.includes(row.speaker)||row.speaker==='player'?[c]:[],stageCast:people.includes(row.speaker)||row.speaker==='player'?[c]:[],...(people.includes(row.speaker)?{shot:'medium',pose:'front',to:'player'}:{})});
export function campaign320(base){
 const map=new Map(base.nodes.map(n=>[n.id,n])),changed=new Set();
 const edit=id=>{if(!changed.has(id)){const n=map.get(id);if(!n)throw Error('Missing expansion anchor '+id);map.set(id,{...n,legacy320:{lines:n.lines,choices:n.choices,next:n.next,effects:n.effects,exitEffects:n.exitEffects,label:n.label,topicRoot320:undefined,topicGroup320:undefined,topicTitles320:undefined}});changed.add(id);}return map.get(id);};
 const mark=(n,c,group)=>{n.topicGroup320=group;n.topicCharacter320=c;n.topicTitles320=DAILY_TOPICS320[c].map(d=>d.title);};
 const capture=c=>Array.from({length:4},(_,i)=>F('daily320Active_'+c,i,{topic320:{character:c,index:i}}));
 const completed=(c,group)=>Array.from({length:4},(_,i)=>E('daily320-'+c+'-'+group+'-t'+i,H('daily320Active_'+c,i)));
 const followups=(c)=>DAILY_TOPICS320[c].flatMap((d,i)=>d.choices.map(ch=>({type:'message',id:'daily320-after-'+c+'-'+i,character:c,text:ch.followup,authored280:true,when:A(H('daily320Active_'+c,i),H('daily320Reply_'+c,ch.id),{contact:c})}))).filter(m=>m.text);
 const roots=[...map.values()].filter(n=>/^R280_NPC\d+_[AB]_GATE_[a-z]+$|^R280_LUNCH\d+_[a-z]+$/.test(n.id));
 for(const root of roots){const c=root.cast[0],n=edit(root.id);mark(n,c,root.id);n.topicRoot320=true;n.effects=[...(root.effects??[]),...capture(c)];n.lines=[root.lines[0],...DAILY_TOPICS320[c].flatMap((d,i)=>d.opening.map(l=>L(l,c,H('daily320Active_'+c,i))))];n.choices=root.choices.map(ch=>({...ch,labels320:DAILY_TOPICS320[c].map(d=>d.choices.find(x=>x.id===ch.id).label),effects:[...(ch.effects??[]),F('daily320Reply_'+c,ch.id)]}));
  const done=edit(root.id+'_DONE');mark(done,c,root.id);done.exitEffects=[...(done.exitEffects??[]),...completed(c,root.id),...followups(c)];
  if(root.id.startsWith('R280_LUNCH')){done.lines=[...DAILY_TOPICS320[c].flatMap((d,i)=>d.choices.flatMap(ch=>ch.response.map(l=>L(l,c,A(H('daily320Active_'+c,i),H('daily320Reply_'+c,ch.id)))))),done.lines.at(-1)].filter(Boolean);}
  else for(const mode of ['listen','share']){const r=edit(root.id+'_'+mode.toUpperCase());mark(r,c,root.id);r.lines=DAILY_TOPICS320[c].flatMap((d,i)=>d.choices.find(ch=>ch.id===mode).response.map(l=>L(l,c,H('daily320Active_'+c,i))));}
 }
 for(const old of [...map.values()].filter(n=>/^R300_(?:SHORT\d+_[AB]|ALTERNATE\d+_[AB])_[a-z]+$|^R310_ALTERNATE4_B_[a-z]+_[a-z]+$/.test(n.id))){const c=old.cast[0],n=edit(old.id);if(!DAILY_TOPICS320[c])continue;mark(n,c,old.id);n.effects=[...(n.effects??[]),...capture(c)];n.lines=[old.lines[0],...DAILY_TOPICS320[c].flatMap((d,i)=>d.opening.map(l=>L(l,c,H('daily320Active_'+c,i))))];n.exitEffects=[...(n.exitEffects??[]),...completed(c,old.id)];}
 const make=(id,source,c,lines,next,extra={})=>{const n={...source,id,label:`${source.week}주 · ${GOAL_AFTERMATH320[c].title}`,cast:[c],lines,next,choices:undefined,effects:undefined,exitEffects:undefined,when:undefined,legacy320:undefined,topicRoot320:undefined,topicGroup320:undefined,giftTarget280:undefined,migrationNext320:source.next,...extra};map.set(id,n);return n;};
 for(const source of [...map.values()].filter(n=>n.giftTarget280&&people.includes(n.giftTarget280)&&n.cast?.includes(n.giftTarget280))){const c=source.giftTarget280,d=GOAL_AFTERMATH320[c],p='R320_AFTER_'+source.id,back=source.next;edit(source.id).next=p;
  const lines=[...d.opening.map(l=>L(l,c)),...Object.entries(d.outcomes??{}).flatMap(([choice,rows])=>rows.map(l=>L(l,c,H('goal200Choice_'+c+'_2',choice)))),...Object.entries(d.previousOutcomes??{}).flatMap(([choice,rows])=>rows.map(l=>L(l,c,H('goal200Choice_'+c+'_1',choice))))];
  make(p,source,c,lines,back,{when:A(H('goal200_'+c,3),N(H('aftermath320_'+c)),{dayAfterFlag300:{day:source.day,flag:'goal200Day_'+c}}),choices:d.choices.map(ch=>({id:ch.id,label:ch.label,next:p+'_'+ch.id})),aftermath320:c});
  for(const ch of d.choices)make(p+'_'+ch.id,source,c,ch.response.map(l=>L(l,c)),back,{aftermath320:c,exitEffects:[F('aftermath320_'+c,true),F('aftermath320Choice_'+c,ch.id),F('aftermath320Day_'+c,source.day),E('aftermath320-'+c),...(ch.followup?[{type:'message',id:'aftermath320-'+c,character:c,text:ch.followup,authored280:true,when:{contact:c}}]:[])]});
 }
 const first=edit('W01_MON');first.lines=first.lines.map((l,i)=>i===0?{...l,text:'학생회관 앞에서 민준을 찾는 데 삼 분이 걸렸다. 둥근 안경을 쓴 민준이 먹던 삼각김밥을 잠깐 내려놓았다.'}:l);
 // Portraits only for physically shared conversations. The prologue remains a remote call.
 for(const original of [...map.values()]){const shared=original.cast?.includes('minjun')||original.id==='W01_MON'||/^R280_MINJUN|^R300_(?:FOCUS|BUDDY)/.test(original.id)||original.lines.some(l=>l.speaker==='minjun')&&(['spring-mt','summer-mt'].includes(original.event)||/^(MT|W05_MT)/.test(original.id));
  if(!shared)continue;const n={...original,cast:[...new Set([...(original.cast??[]),'minjun'])],outfits:{...original.outfits,minjun:'friend'},lines:original.lines.map(l=>l.speaker==='minjun'?{...l,cast:['minjun'],stageCast:['minjun'],shot:'medium',pose:'front',to:'player',...(/발가락|슬리퍼|그 고백 말고/.test(l.text)?{emotion:'happy'}:{})}:l.speaker==='player'&&(original.cast??[]).length===0?{...l,cast:['minjun'],stageCast:['minjun'],shot:'medium',pose:'front'}:l.cast===undefined?{...l,cast:[...(original.cast??[])]}:l)};map.set(n.id,n);
 }
 for(const n of map.values()){const g=n.id.match(/^R280_GIFT_.*_(bookmark|notebook|tea)$/);if(g)n.giftDetail320=g[1];}
 return {...base,narrativeRevision:'0.32.0',presentation320:true,sourceRevision:'32',nodes:[...map.values()]};
}
