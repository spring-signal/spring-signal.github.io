import {L} from './weekly-plans.mjs?v=200';
import {has,flag,all,any,not} from './everyday-tools.mjs?v=200';
import {personalArcs} from './personal-arcs.mjs?v=200';
import {deeperArcs} from './personal-depth.mjs?v=200';
import {relationshipPending} from './romance-150.mjs?v=200';
import {coupleStrained160} from './couple-160.mjs?v=200';
import {coupleTopics180} from './couple-content-180.mjs?v=200';
import {dailyMoments180} from './daily-content-180.mjs?v=200';

export const people180=Object.keys(coupleTopics180);
export const pending180=c=>any(relationshipPending(c),coupleStrained160(c));
export const ended180=c=>has('couple160Ended_'+c);
export const held180=c=>any(pending180(c),ended180(c));
export const meaning180=(c,stage,value)=>any(has(`arcChoice${c}${stage}`,value),has(`arcMeaning180_${c}_${stage}`,value));
const topicWhen=(c,i)=>has('couple160Topic_'+c,'everyday-'+i);
const knownTopic=c=>any(...[0,1,2].map(i=>topicWhen(c,i)));
const own=Object.prototype.hasOwnProperty;
const pendingText={seoyeon:'서연은 공책을 바로 펴지 않았다. 나는 오늘 읽을 분량보다 지난번 멈춘 말을 다시 꺼내도 되는지 먼저 물었다.',jiwoo:'지우는 분위기를 바꾸려는 농담을 받지 않았다. 나는 웃는 답을 기다리기보다 오늘 어떤 말까지 듣고 싶은지 물었다.',haerin:'해린의 다음 말을 아는 척하지 않았다. 익숙한 사이여도 오늘의 답은 다시 들어야 했다.',yuna:'유나가 먼저 쉬고 싶은지 물었다. 어색한 분위기를 풀어 달라는 일까지 유나에게 맡기지는 않았다.',minseo:'민서가 바로 답을 정리하려다 말을 멈췄다. 나는 설명이 끝날 때까지 기다리겠다고만 하고 내 쪽 이유를 먼저 덧붙이지 않았다.',doa:'도아가 말할 시간을 스스로 고를 수 있게 기다렸다. 오래 좋아했다는 내 마음으로 오늘 들은 부탁을 덮지는 않았다.'};
const arrivals={bookshop:'읽던 책을 잠깐 덮고 각자 눈에 남은 것을 이야기했다.',library:'읽던 쪽에 표시를 남겨 두고 작은 목소리로 근황을 나눴다.',club:'함께 보던 자료를 잠깐 옆으로 밀고 각자의 하루를 이야기했다.',cafe:'각자 고른 음료를 앞에 두고 오늘 자기 쪽에 있었던 일을 꺼냈다.','city-gallery':'함께 본 작품에서 떨어져 잠깐 쉬며 각자 눈에 남은 것을 이야기했다.',campus:'약속한 활동을 잠깐 멈추고 각자 오늘 있었던 일을 나눴다.'};
const normalizeMeaning=rule=>{
 if(!rule||typeof rule!=='object')return rule;
 const hit=rule.flag?.match(/^arcChoice(seoyeon|jiwoo|haerin|yuna|minseo|doa)(\d+)$/);
 if(hit&&own.call(rule,'value'))return meaning180(hit[1],Number(hit[2]),rule.value);
 return Object.fromEntries(Object.entries(rule).map(([k,v])=>[k,Array.isArray(v)?v.map(normalizeMeaning):v&&typeof v==='object'?normalizeMeaning(v):v]));
};

// Text and display gates are revised without deleting historical decisions.
// Legacy arcChoice flags remain intact; arcMeaning180 records their true meaning
// from the actual choice, without retroactively creating a new relationship event.
export function repairContinuity180(base,previous170=base){
 const originals=new Map(previous170.nodes.map(n=>[n.id,n]));
 const changed=new Map();
 const edit=n=>{
  if(changed.has(n.id))return changed.get(n.id);
  const old=originals.get(n.id);
  const x={...n,lines:n.lines.map(l=>({...l,source170:own.call(l,'source170')?l.source170:(old?.lines.indexOf(l)??-1)>=0?old.lines.indexOf(l):null})),choices:n.choices?.map(ch=>({...ch})),effects:n.effects?.map(e=>({...e})),exitEffects:n.exitEffects?.map(e=>({...e}))};
  changed.set(n.id,x);return x;
 };
 const line=(text,speaker,when,source=null,emotion='serious')=>L(text,speaker,{when,source170:source,emotion,...(people180.includes(speaker)&&emotion==='serious'?{emotionPolicy180:'strict'}:{})});
 for(const original of base.nodes){
  const arc=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC([1-6])$/);
  if(arc){
   const c=arc[1],stage=Number(arc[2]),content=[...personalArcs[c],...deeperArcs[c]][stage-1],n=edit(original);
   n.lines.unshift(...Object.entries(content.callback??{}).map(([value,text])=>line(text,'narrator',meaning180(c,stage-1,value),null,'neutral')));
   for(const ch of n.choices??[]){const value=content.choices.find(v=>v[0]===ch.id)?.[3];if(value!==undefined)ch.effects=[...(ch.effects??[]),flag(`arcMeaning180_${c}_${stage}`,value)];}
   if(c==='jiwoo'&&stage===1){
    const borrowed=personalArcs.jiwoo[0].lines.slice(-2).map(([text])=>text);
    for(const l of n.lines)if(borrowed.includes(l.text))l.when=all(l.when,{experience:'j-first-acting'});
    // The early chapter already asks this truthfully for non-acting branches.
    for(const l of n.lines)if(/내가 대사를|테이크|다음 거 한 번 더/.test(l.text))l.when=all(l.when,{experience:'j-first-acting'});
    n.lines.push(line('처음 만났을 때도 얼굴이 나오는 장면은 먼저 물어보기로 했던 말을 떠올렸다. 카메라 앞에 섰는지와 별개로, 오늘도 지울 수 있는 답을 먼저 남기고 싶었다.','narrator',not({experience:'j-first-acting'})));
    n.lines.push(line('응. 내가 찍고 싶은 장면만 보고 있으면 그 사람의 답을 놓치겠더라. 그래서 말로 한 번 더 물으려고 해.','jiwoo',not({experience:'j-first-acting'})));
   }
   if(c==='minseo'&&stage===1)n.lines.unshift(line('수업 시간을 숨겼던 날을 내가 먼저 사과했다. 민서는 오늘은 서로 끝낼 시간을 먼저 말하자고 했다.','narrator',has('hidClassTime')));
  }
  const couple=original.id.match(/_COUPLE160_(HEAR|MISSED|PRACTICE[01]|ACTION[01])$/);
  const owner=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)([01])_(?:tue|thu|fri|sat)_/);
  const episode=original.id.match(/_COUPLE160_EP([012])$/);
  if(episode&&owner){
   const c=owner[1],i=Number(episode[1]),d=coupleTopics180[c][i],n=edit(original);
   const revisiting=all(topicWhen(c,i),has('couple160State_'+c,'settled'),has('couple160Evidence2_'+c));
   for(const l of n.lines)l.when=all(l.when,not(revisiting));
   const polite=['seoyeon','minseo','doa'].includes(c);
   const texts=d.revisit??['지난번 '+d.title+' 이야기 뒤에는 듣고, 다른 날에 행동해 보고, 다시 지켜 본 시간이 있었다. 오늘은 처음 질문으로 돌아가는 대신 그 뒤에 무엇이 달라졌는지 물었다.',polite?'그때 정한 방식을 지켜 보니 조금 편해진 게 있어요. 오늘 편한 방식은 다시 같이 고르고 싶어요.':'그때 정한 방식을 지켜 보니 조금 편해진 게 있어. 오늘 편한 방식은 다시 같이 고르고 싶어.','나는 전처럼 바로 답을 재촉하고 싶은 순간도 있었다고 말했다. 그래도 오늘 다시 함께 고를 수 있는 부분은 남아 있었다.'];
   texts.forEach((text,j)=>n.lines.push(line(text,j===0?'narrator':j===1?c:'player',revisiting,j,j===1?'neutral':'serious')));
  }
  if(couple&&owner){
   const c=owner[1],n=edit(original),type=couple[1],topics=coupleTopics180[c],unknown=not(knownTopic(c));
   if(type==='HEAR'){
    for(const l of n.lines)l.when=all(l.when,unknown);
    topics.forEach((d,i)=>n.lines.push(...d.hear.map((text,j)=>line(text,j===1?'player':c,topicWhen(c,i),j===0?0:j===1?2:3))));
   }else if(type==='MISSED'){
    n.lines[0].when=all(n.lines[0].when,unknown);
    topics.forEach((d,i)=>n.lines.unshift(line(d.hurt,c,topicWhen(c,i),0)));
   }else if(type.startsWith('PRACTICE')){
    n.lines[0].when=all(n.lines[0].when,unknown);
    topics.forEach((d,i)=>n.lines.push(line('지난번 '+d.title+' 이야기를 나눴던 날이 떠올랐다. 오늘은 비슷한 순간에 어떻게 행동할지 고를 차례였다.','narrator',topicWhen(c,i),0)));
   }else{
    const step=Number(type.at(-1));
    n.lines[0].when=all(n.lines[0].when,unknown);
    n.lines[2].when=all(n.lines[2].when,unknown);
    topics.forEach((d,i)=>n.lines.push(line(d.actions[step],'narrator',topicWhen(c,i),0),line(step?d.recovered:d.soft,c,topicWhen(c,i),2,step?'happy':'serious')));
   }
  }
  const personalEnd=original.id.match(/^END150_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);
  if(personalEnd){
   const c=personalEnd[1],n=edit(original);
   n.lines=n.lines.map(l=>{
    const match=l.when?.flag?.match(new RegExp('^couple160Choice_'+c+'_(\\d)$'));
    if(!match)return l;
    const d=coupleTopics180[c][Number(match[1])],value=l.when.value;
    return {...l,text:d.endingCallbacks[value]??l.text};
   });
  }
  if(owner&&original.id.endsWith('_DAILY')){
   const c=owner[1],slot=Number(owner[2]),n=edit(original),held=held180(c),lifeSeen='daily180Life_'+c;
   n.lines.forEach((l,i)=>{
    l.when=all(l.when,not(held));
    if(i===0)l.text=arrivals[n.location]??arrivals.campus;
    // The same life-status recap used to occur at every long and short meeting.
    if(i>0&&i<n.lines.length-2)l.when=all(l.when,not(has(lifeSeen)));
    if(i===n.lines.length-2&&l.speaker==='narrator')l.text=dailyMoments180[c]?.['a'+slot]?.[n.week-9]??l.text;
    if(l.speaker===c&&l.emotion==='happy')l.when=all(l.when,not(has('daily180Warm_'+c)));
   });
   n.exitEffects=[...(n.exitEffects??[]),{...flag(lifeSeen),when:not(held)},{...flag('daily180Warm_'+c),when:not(held)}];
   n.lines.push(line(pendingText[c],'narrator',all(pending180(c),not(ended180(c)),not(knownTopic(c)))));
   coupleTopics180[c].forEach((d,i)=>n.lines.push(line(d.pending,c,all(coupleStrained160(c),not(ended180(c)),topicWhen(c,i)))));
   n.lines.push(line('오늘 관계를 멈추기로 한 말을 가벼운 근황으로 바꾸지는 않았다. 남은 활동은 여기서 마치고, 각자 돌아갈 시간을 확인했다.','narrator',ended180(c)));
   for(const ch of n.choices??[])ch.hideWhen=ch.hideWhen?any(ch.hideWhen,ended180(c)):ended180(c);
   n.choices.push({id:'close180',label:'오늘은 여기서 인사하고 각자의 시간을 남긴다.',next:n.id.replace(/_DAILY$/,'_DONE'),effects:[],when:ended180(c)});
  }
  if(owner&&/_(DONE_FEEL|DONE_CLOSENESS)$/.test(original.id)){
   const c=owner[1],n=edit(original);n.lines.forEach(l=>l.when=all(l.when,not(held180(c))));
   n.lines.push(line('오늘은 더 가까워지겠다는 답을 묻지 않았다. 조금 전 나눈 말과 상대가 원한 거리를 그대로 두고 인사할 차례였다.','narrator',held180(c)));
   for(const ch of n.choices??[])if(ch.id!=='leave')ch.hideWhen=ch.hideWhen?any(ch.hideWhen,held180(c)):held180(c);
  }
  const fire=original.id.match(/^FIRE22_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);
  const water=original.id.match(/^MT19_(?:sea|valley|pool)_(?:(?:GAME|WALK)_)?(seoyeon|jiwoo|haerin|yuna|minseo)(?:_END)?$/);
  const doaWater=/^DOA23_(?:sea|valley|pool)(?:_RETURN)?$/.test(original.id);
  const eventPerson=fire?.[1]??water?.[1]??(doaWater?'doa':null);
  if(eventPerson){
   const c=eventPerson,n=edit(original);
   const night=/_GAME_|_WALK_/.test(original.id),waiting=all(night?pending180(c):all(coupleStrained160(c),not(relationshipPending(c))),not(ended180(c)));
   for(const l of n.lines)if(l.speaker===c&&(l.emotion==='happy'||night))l.when=all(l.when,not(held180(c)));
   n.lines.push(line(pendingText[c],'narrator',all(waiting,not(knownTopic(c)))));
   n.lines.push(line('같이 온 시간을 즐기고 싶은 마음은 있어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.')+' 그래도 지난번 멈춘 말은 아직 남아 있어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.'),c,all(waiting,not(knownTopic(c)))));
   coupleTopics180[c].forEach((d,i)=>n.lines.push(line(d.pending,c,all(waiting,topicWhen(c,i)))));
   if(night)n.lines.push(line('오늘은 모임의 이야기만 잠깐 듣고 자리를 옮겼다. 개인적인 관계까지 다시 편해졌다고 읽지는 않았다.','narrator',ended180(c)));
   if(/^DOA23_\w+_RETURN$/.test(original.id)){
    n.lines[0].when=all(n.lines[0].when,not(held180(c)));
    n.lines.unshift(line('각자의 마른 옷으로 갈아입고 돌아갈 차편을 확인했다. 오늘 함께 나온 일과 지난번 마음이 풀린 일은 나누어 두고, 다음 말을 언제 꺼내도 좋을지만 물었다.','narrator',held180(c),0));
   }
  }
  if(original.id==='MT19_DEPART'){
   const n=edit(original);n.lines=n.lines.map(l=>({...l,text:l.text.replace('일요일에 정한 평일 약속은 따로 마쳤다. ','')}));
  }
 }
 const nodes=base.nodes.map(original=>{
  let n=changed.get(original.id)??original;
  if(n.lines.some(l=>JSON.stringify(l.when??'').includes('arcChoice'))){n=edit(n);n.lines=n.lines.map(l=>({...l,when:normalizeMeaning(l.when)}));}
  if(n.week>=9){
   const summer={'bg.club_day':'bg.club_talk170','bg.library_day':'bg.library_talk170','bg.campus_day':'bg.campus_summer','bg.cafe_day':'bg.cafe_summer180','bg.bus_day':'bg.bus_summer180'};
   const background=summer[n.background]??n.background;
   const override=n.lines.some(l=>summer[l.background]);
   if(background!==n.background||override)n={...n,background,lines:override?n.lines.map(l=>summer[l.background]?{...l,background:summer[l.background]}:l):n.lines};
  }
  if(/^MT19_(valley|pool)_(seoyeon|jiwoo|haerin|yuna|minseo)$/.test(n.id))n={...n,lines:n.lines.map((l,i)=>i?{...l,posture:'seated',posturePolicy180:'strict'}:l)};
  return n;
 });
 return {...base,nodes,narrativeRevision:'0.18.0',sourceRevision:'22',scope:'실제 선택의 회상과 복선 회수 · 갈등 주제별 회복 · 주차별 일상과 자세 · 1~24주'};
}
