import {node,L,C,planPeople,planNames,planId,weekdays} from './weekly-plans.mjs?v=200';
import {activityCatalog,activityRevisits,activityAfter} from './activity-catalog.mjs?v=200';
import {deeperArcs} from './personal-depth.mjs?v=200';
import {midweekLife,weekendLife} from './daily-life.mjs?v=200';
import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
const flag=(key,value=true)=>({type:'flag',key,value}),has=(key,value=true)=>({flag:key,value});
const message=(id,character,text,direction='in')=>({type:'message',id,character,text,direction});
const appointment=(d,status)=>({type:'appointment',...d,status});
const relation=c=>({type:'relation',character:c,affection:1,trust:1});
export const extraPlanId=w=>planId(w)+'-extra';
const prefix=(w,c,a,slot)=>`${slot==='original'?'PLAN':'FLEX'}${w}_${c}_${a}`;
export function primarySlots(week,c,a){
 const base={id:planId(week),week,character:c,activity:a.id,label:a.label,purpose:'weekly',place:a.place};
 if(week===8)return [{...base,slot:'original',day:'fri',time:{seoyeon:'14:30',jiwoo:'15:30',haerin:'17:30',yuna:'16:30',minseo:'12:20'}[c]}];
 return [{...base,slot:'original',day:a.day,time:a.time},{...base,slot:'later',day:a.altDay,time:a.time}];
}
export function extraSlots(week,c,a){
 const base={id:extraPlanId(week),week,character:c,activity:a.id,label:a.label,purpose:'weekly',place:a.place};
 return week===8?[{...base,slot:'wed',day:'sat',time:'14:00'},{...base,slot:'fri',day:'sat',time:'16:00'}]:[{...base,slot:'wed',day:'wed',time:'18:10'},{...base,slot:'fri',day:'fri',time:'12:00'}];
}
const answer={seoyeon:'좋아요. 그 시간에는 수업이 없어요.',jiwoo:'좋아. 그 시간은 비워 둘게.',haerin:'응. 작업 시간 확인했어. 그때 괜찮아.',yuna:'근무표 확인했어. 그 시간은 괜찮아.',minseo:'연구실 일정 확인했어요. 그 시간에 만나요.'};
function proposal(c,a,d){return `${weekdays[d.day]} ${d.time}에 ${a.place}에서 ${a.label}, ${['seoyeon','minseo'].includes(c)?'어때요?':'어때?'} 만날 수 있는 시간 먼저 확인하고 싶${['seoyeon','minseo'].includes(c)?'어요.':'어.'}`;}
const replaceTarget=(next,from,to)=>typeof next==='string'?(next===from?to:next):next?.map(b=>({...b,node:b.node===from?to:b.node}));
const arriveClothes=(c,a,lines)=>c==='yuna'?[L(a.id==='break'?'온유에서 만난 유나는 블루 셔츠에 크림 앞치마를 매고 있었다. 동료에게 교대 시각을 확인하고 약속한 자리로 왔다.':'유나는 약속 전에 앞치마를 매장에 두고 개인 옷차림으로 나왔다. 일할 때 쓰는 도구 대신 자기 가방만 챙겼다.','narrator',{clothingChanges:{yuna:true}}),...lines]:lines;
const activityScene=(c,a,lines)=>[...lines.map(l=>({...l,when:l.when?{all:[{not:has(`activitySeen_${c}_${a.id}`)},l.when]}:{not:has(`activitySeen_${c}_${a.id}`)}})),...activityRevisits[c][a.id].map(t=>L(t,'narrator',{when:has(`activitySeen_${c}_${a.id}`)})),...Object.entries(a.activityCallbacks).map(([value,t])=>L(t,'narrator',{when:has(`activityMemory_${c}_${a.id}`,value)}))];

export function enrichWeeks(base){
 const map=new Map(structuredClone(base.nodes).map(n=>[n.id,n]));
 const get=id=>{const n=map.get(id);if(!n)throw Error('Missing chapter '+id);return n;};
 const add=n=>map.set(n.id,n);
 const make=(id,title,week,day,bg,cast,lines,next,extra={})=>{const n=node(id,title,week,day,bg,cast,lines,next,{...(bg==='bg.home_day'?{location:'home'}:{}),...extra});add(n);return n;};
 const tail={};
 for(let w=2;w<=8;w++)for(const day of w===8?['fri']:['tue','wed','thu','fri'])tail[`${w}/${day}`]=get(`WEEK${w}_${day}_PLAN`).next.at(-1).node;
 // Friday's regular meeting comes after the noon and afternoon appointments.
 tail['4/fri']='W04_FRI';get('W04_FRI').next='CHERRY04';
 for(let w=2;w<=7;w++){
  const after=tail[`${w}/wed`];
  make(`LIFE${w}_MID`,`${w}주 수요일 밤 · 나의 생활`,w,'wed','bg.home_night',[],midweekLife[w].map(t=>L(t)),after);
  tail[`${w}/wed`]=`EXTRA${w}_wed_GATE`;
 }
 for(let w=2;w<=8;w++){
  const next=w===2?'W02_MON':w===3?'LIFE3_MON':w===4?'W04_MON':`W0${w}_MON`;
  if(w===3)make('LIFE3_MON','3주 월요일 · 다시 챙긴 아침',3,'mon','bg.home_day',[],[L('월요일 아침, 지난주 질문에 달린 답을 읽었다. 예전부터 알던 것도 다시 배우는 데는 내 시간이 필요했다.'),L('점심을 거르지 않으려고 가방에 작은 도시락을 넣었다. 이번 주에 누구를 만나는지와 별개로 내 생활도 시작되고 있었다.')],'Q03');
  const pick=`EXTRA${w}_PICK`;
  for(const n of map.values())if(n.id===`PLAN${w}_REST`||n.id.startsWith(`PLAN${w}_`)&&/_(CONFIRMED|DEFER)$/.test(n.id))n.next=pick;
  const sunday=get(`SUN0${w-1}`);
  sunday.lines=[L('다음 주 시간표와 연락처를 함께 열었다. 길게 이야기할 약속 하나를 먼저 정하고, 원하면 짧은 만남을 하나 더 제안할 수 있다.'),L(w===8?'시험 전 공부 장소는 월요일에 직접 고른다. 긴 약속은 금요일 시험 뒤에, 추가 만남은 토요일에 잡기로 했다.':'수업과 정기 모임은 그대로 두고 서로 가능한 두 시간 중 골라 묻는다. 같은 사람을 다시 만나도, 다른 사람에게 연락해도 된다.')];
  get(`PLAN${w}_REST`).lines=[L('첫 약속은 비워 두었다. 짧은 만남만 하나 잡을 수도 있고, 이번 주는 둘 다 쉬어도 된다.')];
  make(pick,`${w-1}주 일요일 · 한 번 더 만날 시간`,w-1,'sun','bg.home_night',[],[L('남은 시간도 확인했다. 같은 사람과 다른 활동을 해도 좋고, 다른 사람에게 안부를 물어도 좋다.'),L(w===4||w===5?'주말은 축제와 MT 공지가 있는 주라 비워 두고, 수요일 저녁이나 금요일 점심만 제안하기로 했다.':w===8?'이번 주의 두 번째 약속은 시험이 모두 끝난 토요일에 잡을 수 있다.':'약속을 두 개 다 채울 필요는 없다. 만나고 싶은 마음과 실제로 갈 수 있는 시간을 함께 보고 고른다.')],next,{choicePrompt:'짧은 만남을 하나 더 제안할까?',migrationDefault:'skip',choices:[C('skip','추가 약속은 잡지 않고 이번 주를 시작한다.',next),...planPeople.map(c=>C(c,planNames[c]+'에게 한 번 더 연락한다.',`EXTRA${w}_${c}_ACT`,[],{contact:c}))]});
  for(const c of planPeople){
   const actNode=get(`PLAN${w}_${c}_ACT`);
   actNode.lines=[L(planNames[c]+'의 대화창을 열었다. 만나서 할 일도 내가 제안해 보기로 했다. 같은 이야기를 나누더라도 함께 보내는 시간의 모양은 달라질 수 있었다.')];
   actNode.choices=activityCatalog[c].map(a=>C(a.id,a.label,`TIME${w}_${c}_${a.id}`));
   make(`EXTRA${w}_${c}_ACT`,`${w-1}주 일요일 · 짧은 만남의 제안`,w-1,'sun','bg.home_night',[],[L(planNames[c]+'에게 무엇을 함께 하고 싶은지 적었다. 첫 약속과 같은 활동은 이번에는 빼 두었다.')],null,{choices:activityCatalog[c].map(a=>C(a.id,a.label,`EXTRATIME${w}_${c}_${a.id}`,[],{not:{all:[has('planPerson'+w,c),has('planActivity'+w,a.id)]}}))});
   for(const a of activityCatalog[c]){
    const slots=primarySlots(w,c,a);
    make(`TIME${w}_${c}_${a.id}`,`${w-1}주 일요일 · 가능한 시간 고르기`,w-1,'sun','bg.home_night',[],[L(w===8?'시험을 마친 금요일에 만날 수 있는 시간을 확인했다.':'수업과 근무표 사이에 서로 가능한 시간을 확인했다. 내가 편한 날 하나만 정해서 통보하지는 않기로 했다.')],null,{migrationDefault:'original',choices:slots.map(d=>C(d.slot,`${weekdays[d.day]} ${d.time} · ${a.place}`,prefix(w,c,a.id,d.slot)+'_SEND'))});
    for(const d of slots){
     const p=prefix(w,c,a.id,d.slot),time=`${weekdays[d.day]} ${d.time}`;
     const counter=w===2&&c==='haerin'&&a.id==='meal'&&d.slot==='original';
     if(counter)get(`TIME${w}_${c}_${a.id}`).choices[0].label='수요일 18:00을 먼저 제안하고 답장을 확인한다.';
     const proposed=counter?{...d,day:'wed',time:'18:00'}:d;
     const propose=proposal(c,a,proposed),reply=counter?'수요일은 작업 끝나는 시간이 애매해. 목요일 17:30은 어때? 그날이면 정문 식당에서 여유 있게 먹을 수 있어.':`${answer[c]} ${time}, ${a.place}에서 ${['seoyeon','minseo'].includes(c)?'만나요.':'보자.'}`;
     make(p+'_SEND',`${w-1}주 일요일 · 보낸 연락`,w-1,'sun','bg.home_night',[],[L('보낼 말을 읽고 전송했다.'),L('“'+propose+'”'),L('답장을 기다리는 동안 내 다음 주 제출 날짜도 적었다.')],p+'_REPLY',{effects:[message(p+'-out',c,propose,'out'),appointment(proposed,'pending')]});
     make(p+'_REPLY',`${w-1}주 일요일 · 답장 확인`,w-1,'sun','bg.home_night',[],[L(planNames[c]+'에게 답장이 왔다.'),L('“'+reply+'”')],null,{effects:[message(p+'-reply',c,reply),...(counter?[appointment(d,'alternative')]:[])],choices:[C('confirm',`${time} · ${a.label} 약속을 확정한다.`,p+'_CONFIRMED',[appointment(d,'confirmed'),flag('planDay'+w,d.day),flag('planPerson'+w,c),flag('planActivity'+w,a.id),flag('planSlot'+w,d.slot),message(p+'-confirm',c,`${time}에 ${a.place}에서 ${['seoyeon','minseo'].includes(c)?'만나요.':'보자.'}`,'out')]),C('defer','이번에는 시간이 맞지 않는다고 답한다.',p+'_DEFER',[appointment(d,'deferred'),message(p+'-defer',c,'그 시간은 어려울 것 같아'+(['seoyeon','minseo'].includes(c)?'요. 다음에 다시 물어볼게요.':'. 다음에 다시 물어볼게.'),'out')])]});
     make(p+'_CONFIRMED',`${w-1}주 일요일 · 첫 약속을 남기고`,w-1,'sun','bg.home_night',[],[L(`${w}주 ${time}, ${planNames[c]} · ${a.label}. 서로 확인한 시간과 장소를 달력에 남겼다.`)],pick);
     make(p+'_DEFER',`${w-1}주 일요일 · 맞지 않은 시간`,w-1,'sun','bg.home_night',[],[L('이번 제안은 보류로 남겼다. 만나지 않은 약속을 완료한 것처럼 세지 않았다.')],pick);
     buildPrimary(w,c,a,d,p);
    }
    const eSlots=extraSlots(w,c,a);
    make(`EXTRATIME${w}_${c}_${a.id}`,`${w-1}주 일요일 · 추가로 비울 시간`,w-1,'sun','bg.home_night',[],[L(w===8?'시험 뒤 토요일의 두 시간 중 가능한 쪽을 골라 제안한다.':'수요일은 수업 뒤 저녁, 금요일은 정기 모임 전 점심이다. 첫 약속과 겹치지 않는 시간만 남겼다.')],null,{choices:eSlots.map(d=>C(d.slot,`${weekdays[d.day]} ${d.time} · ${a.place}`,`EXTRA${w}_${c}_${a.id}_${d.slot}_SEND`))});
    for(const d of eSlots)buildExtra(w,c,a,d,next);
   }
  }
  // The ordinary daily spine remains in date order, even when no one is invited.
  for(const day of w===8?['fri']:['tue','wed','thu','fri']){
   const gate=get(`WEEK${w}_${day}_PLAN`),after=tail[`${w}/${day}`];
   gate.next=planPeople.flatMap(c=>activityCatalog[c].flatMap(a=>primarySlots(w,c,a).filter(d=>d.day===day).map(d=>({when:{all:[{appointment:planId(w),status:'confirmed'},has('planPerson'+w,c),has('planActivity'+w,a.id),has('planSlot'+w,d.slot)]},node:prefix(w,c,a.id,d.slot)+'_ARRIVE'})))).concat({node:after});
   gate.when={all:[{appointment:planId(w),status:'confirmed'},has('planDay'+w,day)]};
  }
  for(const day of w===8?['sat']:['wed','fri']){
   const after=day==='wed'?`LIFE${w}_MID`:day==='fri'?`WEEK${w}_fri_PLAN`:'CHAPTER_TWO_END';
   make(`EXTRA${w}_${day}_GATE`,`${w}주 ${weekdays[day]} · 추가로 정한 만남`,w,day,'bg.campus_day',[],[L('추가로 약속한 시간을 확인하고 장소로 향했다.')],planPeople.flatMap(c=>activityCatalog[c].flatMap(a=>extraSlots(w,c,a).filter(d=>d.day===day).map(d=>({when:{all:[{appointment:extraPlanId(w),status:'confirmed'},has('extraPerson'+w,c),has('extraActivity'+w,a.id),has('extraSlot'+w,d.slot)]},node:`EXTRA${w}_${c}_${a.id}_${d.slot}_ARRIVE`})))).concat({node:after}),{when:{all:[{appointment:extraPlanId(w),status:'confirmed'},has('extraDay'+w,day)]}});
  }
 }
 // Insert the Friday noon appointment before the first afternoon meeting.
 for(let w=2;w<=7;w++)for(const n of map.values())if(!n.id.startsWith(`EXTRA${w}_fri_GATE`)){
  n.next=replaceTarget(n.next,`WEEK${w}_fri_PLAN`,`EXTRA${w}_fri_GATE`);
  for(const choice of n.choices??[])choice.next=replaceTarget(choice.next,`WEEK${w}_fri_PLAN`,`EXTRA${w}_fri_GATE`);
 }
 // Week four previously placed Friday's 18:00 club scene before 15:30 plans.
 for(const n of map.values())if(n.week===4&&n.weekday==='thu')n.next=replaceTarget(n.next,'W04_FRI','EXTRA4_fri_GATE');
 // A midweek night runs even if the short appointment gate is skipped.
 for(let w=2;w<=7;w++)get(`EXTRA${w}_wed_GATE`).next.at(-1).node=`LIFE${w}_MID`;
 for(const [key,lines]of Object.entries(weekendLife)){
  const w=Number(key),id=`LIFE${w}_SAT`;
  for(const n of map.values())if(n.week===w){n.next=replaceTarget(n.next,`SUN0${w}`,id);for(const c of n.choices??[])c.next=replaceTarget(c.next,`SUN0${w}`,id);}
  make(id,`${w}주 토요일 · 약속 사이에도 흐르는 하루`,w,'sat','bg.home_day',[],[...lines.map(t=>L(t)),L('이번 주에는 같은 달력에 두 번의 만남이 남았다. 길게 나눈 이야기와 짧게 함께한 일은 서로 다른 기억이 됐다.','narrator',{when:{all:[{appointment:planId(w),status:'completed'},{appointment:extraPlanId(w),status:'completed'}]}})],`SUN0${w}`);
 }
 get('CHERRY_AFTER').lines.push(L('돌아와 신발을 벗고 나서야 종일 걸었다는 걸 알았다. 휴대폰 속 사진보다 중간에 말이 끊겼다가 다시 이어진 순간이 먼저 떠올랐다.'));
 get('W05_HOME').lines.push(L('혼자 보낸 주말을 남의 MT와 비교하다 휴대폰을 내려놓았다. 나가지 않은 날에도 내가 해 먹은 저녁과 끝낸 과제는 남아 있었다.'));
 get('W04_JOB').lines.unshift(L('유나는 근무를 시작하며 매장에 둔 크림 앞치마를 다시 맸다. 나도 포장 보조에 쓸 준비물을 확인했다.','narrator',{clothingChanges:{yuna:true},cast:['yuna']}));
 get('W08_EXAMS').lines=[L('화요일 첫 시험을 마쳤다. 모르는 문제에 오래 머물다 풀 수 있는 문제부터 쓰기로 했던 걸 뒤늦게 떠올렸다.'),L('점수는 아직 몰랐다. 다음 시험 범위를 보고 오늘 다시 펼칠 장과 잠들 시각부터 정했다.')];
 get('W08_EXAMS').next='LIFE8_WED';
 make('LIFE8_WED','8주 수요일 · 시험 사이의 점심',8,'wed','bg.campus_day',[],[L('두 번째 시험 뒤 편의점에서 점심을 샀다. 답을 맞춰 보는 사람들 사이를 지나 빈 벤치에 앉았다.'),L('월요일 공부했던 자리를 떠올렸다. 혼자 다시 풀어도 누군가에게 설명해 본 부분은 말의 순서로 남아 있었다.'),L('내가 틀린 답만 생각하고 있다는 걸 알아차려, 오늘 제대로 적은 답도 하나 떠올려 봤다.')],'LIFE8_THU');
 make('LIFE8_THU','8주 목요일 밤 · 마지막 장을 덮으며',8,'thu','bg.home_night',[],[L('마지막 시험의 요약 노트를 덮었다. 금요일에 만날 약속이 있다면 끝나는 시각 뒤였고, 토요일의 짧은 만남은 또 다른 빈칸에 남아 있었다.'),L('나는 잘 봤다는 말을 준비하지 않았다. 못 본 시험 이야기도 할 수 있는 사람이 생겼다면 그걸 먼저 기억하고 싶었다.'),L('알람을 두 개 맞추고 휴대폰을 멀리 뒀다. 오늘 남은 준비는 잠드는 일이었다.')],'W08_FRI');
 get('WEEK8_fri_PLAN').next.at(-1).node='LIFE8_SAT';
 for(const n of map.values())if(n.week===8&&n.weekday==='fri')n.next=replaceTarget(n.next,'CHAPTER_TWO_END','LIFE8_SAT');
 make('LIFE8_SAT','8주 토요일 · 끝난 뒤의 시간',8,'sat','bg.home_day',[],[L('시험 다음 날, 알람 없이 눈을 떴다. 오늘은 어제의 답을 바꿀 수 없지만, 누군가와 정해 둔 시간에는 갈 수 있었다.'),L('추가 약속이 있으면 그 시각에 나가고, 비워 뒀다면 아침부터 천천히 먹기로 했다.')],'EXTRA8_sat_GATE');
 get('CHAPTER_TWO_END').lines.push(L('누구의 이야기를 얼마나 알게 됐는지는 만난 횟수만으로 같아지지 않았다. 다른 의견을 말했던 날, 기다린다는 말을 해 준 날, 각자 할 일을 남겨 놓고 헤어진 날이 따로 떠올랐다.'));
 // Remove obsolete/unselected template nodes. Every retained edge is checked.
 const seen=new Set(),visit=id=>{if(!id||seen.has(id))return;const n=get(id);seen.add(id);const follow=x=>typeof x==='string'?visit(x):x?.forEach(b=>visit(b.node));follow(n.next);for(const c of n.choices??[])follow(c.next);};
 visit(base.start);
 const nodes=[...map.values()].filter(n=>seen.has(n.id));
 for(const n of nodes){
  n.wardrobeRevision='0.9.0';n.outfits=wardrobeFor(n);
  if(n.id.startsWith('TIME'))n.choicePrompt='어느 날, 어느 시간을 제안할까?';
  if(n.id.startsWith('EXTRATIME'))n.choicePrompt='추가로 만날 날짜와 시간을 골라 보자.';
  if(/^EXTRA\d+_\w+_ACT$/.test(n.id))n.choicePrompt='이번에는 무엇을 함께 하고 싶을까?';
  if(n.id.endsWith('_REPLY')&&/^(PLAN|FLEX|EXTRA)/.test(n.id))n.choicePrompt='서로 확인한 시간으로 약속을 확정할까?';
  if(n.id.endsWith('_DEPTH'))n.choicePrompt='오늘은 어떤 이야기를 나누고 싶을까?';
 }
 return {...base,narrativeRevision:'0.10.0',sourceRevision:'15',scope:'주 2회 약속 · 활동과 시간 선택 · 여섯 장의 개인 이야기 · 1~8주',nodes};

 function buildPrimary(w,c,a,d,p){
  const original=base.nodes.find(n=>n.id===p+'_ARRIVE');
  const cancel=w===7&&c==='minseo'&&a.id==='space'&&d.slot==='original';
  let block;
  if(original&&d.slot==='original')block=[...map.values()].filter(n=>n.id.startsWith(p+'_')&&/^(ARRIVE|ARC\d|LATER|DONE|CHANGE|SKIP)/.test(n.id.slice(p.length+1)));
  else {
   const seed=activityCatalog[c].find(x=>base.nodes.some(n=>n.id===`PLAN${w}_${c}_${x.id}_ARC1`));
   const from=`PLAN${w}_${c}_${seed.id}`;
   block=base.nodes.filter(n=>n.id.startsWith(from+'_')&&/^(ARRIVE|ARC\d|LATER|DONE)/.test(n.id.slice(from.length+1))).map(n=>JSON.parse(JSON.stringify(n).split(from).join(p)));
   block.forEach(add);
  }
  for(const n of block){
   n.weekday=d.day;n.day=`story-w${String(w).padStart(2,'0')}-${d.day}`;
   if(!cancel){n.background=a.bg;n.location={'bg.club_day':'club','bg.library_day':'library','bg.campus_day':'campus','bg.cafe_day':'cafe','bg.busstop_day':'busstop'}[a.bg];}
   n.label=`${w}주 ${weekdays[d.day]} ${d.time} · ${n.id===p+'_ARRIVE'?a.label:n.label.split(' · ').at(-1)}`;
   n.next=typeof n.next==='string'&&n.next.startsWith('WEEK')||typeof n.next==='string'&&['W02_FRI','W02_CAFE','W03_JOB','W03_FRI','W04_FRI','W05_FRI','W06_FRI','W07_FRI','CHAPTER_TWO_END','WEEK7_MAKEUP'].includes(n.next)?tail[`${w}/${d.day}`]:n.next;
   if(c==='yuna'){n.onDuty={yuna:a.id==='break'};if(a.id!=='break')for(const l of n.lines)l.text=l.text.replaceAll('앞치마 주머니에서','가방에서');}
   for(const key of ['effects','exitEffects'])if(n[key])n[key]=n[key].map(e=>e.type==='appointment'&&e.id===planId(w)?{...e,...d}:e);
  }
  if(cancel)return;
  const arrive=get(p+'_ARRIVE');
  if(!original||d.slot!=='original')arrive.lines=a.intro.map(t=>L(t));
  arrive.lines=arriveClothes(c,a,activityScene(c,a,[...arrive.lines,...a.activityLines.map(([t,s])=>L(t,s))]));
  arrive.next=[...arrive.next.filter(b=>b.when),{node:p+'_DEPTH'}];
  make(p+'_DEPTH',`${w}주 ${weekdays[d.day]} ${d.time} · 오늘 나누고 싶은 이야기`,w,d.day,a.bg,[c],[L('처음 꺼냈던 고민의 뒤에도 서로 아직 하지 않은 말이 남아 있었다. 오늘 그 이야기를 더 들어도 좋고, 가벼운 근황부터 나눠도 좋다.')],null,{appointmentId:d.id,onDuty:c==='yuna'?{yuna:a.id==='break'}:undefined,migrationDefault:'daily',choices:[C('continue','지난 이야기 뒤에 어떤 일이 있었는지 묻는다.',[...deeperArcs[c].map((_,i)=>({when:{not:has(`arc${c}${i+4}`)},node:p+'_ARC'+(i+4)})),{node:p+'_LATER'}]),C('daily','오늘은 서로의 일상을 편하게 이야기한다.',p+'_LATER')]});
  for(const [i,arc]of deeperArcs[c].entries()){
   const stage=i+4;
   make(p+'_ARC'+stage,`${w}주 ${weekdays[d.day]} ${d.time} · ${arc.title}`,w,d.day,a.bg,[c],[...Object.entries(arc.callback).map(([value,t])=>L(t,'narrator',{when:has(`arcChoice${c}${stage-1}`,value)})),...arc.lines.map(([t,s])=>L(t,s))],null,{appointmentId:d.id,onDuty:c==='yuna'?{yuna:a.id==='break'}:undefined,choices:arc.choices.map(([choice,label,,value])=>C(choice,label,p+'_ARC'+stage+'_'+choice,[flag(`arcChoice${c}${stage}`,value)]))});
   for(const [choice,,response]of arc.choices)make(p+'_ARC'+stage+'_'+choice,`${w}주 ${weekdays[d.day]} ${d.time} · ${arc.title}`,w,d.day,a.bg,[c],[L(response,c),L(arc.close)],p+'_DONE',{appointmentId:d.id,onDuty:c==='yuna'?{yuna:a.id==='break'}:undefined,exitEffects:[flag(`arc${c}${stage}`),flag('returned'+c),{type:'experience',id:`personal-${c}-${stage}`},relation(c)]});
  }
  const done=get(p+'_DONE');done.next=tail[`${w}/${d.day}`];
  done.lines=[L(`${a.label} 약속을 마쳤다. 끝내지 못한 이야기까지 오늘 모두 해결하려 하지는 않았다. 다음에 물어보고 싶은 말 하나가 남았다.`)];
  done.exitEffects=[appointment(d,'completed'),flag(`activitySeen_${c}_${a.id}`),{type:'experience',id:p+'-completed'},...(a.cost?[{type:'money',amount:-a.cost}]:[]),message(p+'-after',c,activityAfter[c][a.id])];
  const later=get(p+'_LATER');
  later.lines=[L('지난번 대화 뒤에도 각자의 일이 계속됐다. '+planNames[c]+'에게 이번 주에 실제로 해 본 일과 아직 마음에 걸리는 일을 따로 물었다.'),L('나도 오늘은 잘 지낸다는 말만 하지 않기로 했다. 과제에서 막힌 한 줄과 도움을 구한 일을 이야기했다.')];
  get(p+'_LATER_SHARE').lines=[L('나는 일을 크게 약속해 놓고 가능한 시간을 뒤늦게 계산했던 일을 말했다.'),L(c==='jiwoo'?'그럼 지금 가능한 것부터 다시 말하면 되지. 나도 네가 다 해 주는 것보다 그게 편해.':c==='haerin'?'우리 끝낸 날만 연락하지 말기로 했잖아. 정리 안 된 말이어도 오늘 먼저 한 거 좋네.':c==='seoyeon'?'선배가 바로 대답 못 하는 날도 알게 돼서 좋아요. 제가 혼자 이유를 쓰지 않아도 되니까요.':c==='yuna'?'내가 늘 웃으면 괜찮은 줄 알았댔지. 너도 괜찮은 얼굴만 하고 안 와도 돼.':'가능한 시간부터 말해 줘서 고마워요. 네가 맞춰 준 다음에 미안해하는 것보다 같이 고르는 게 좋아요.',c)];
  get(p+'_LATER_LISTEN').lines=[L('나는 지난번의 고민을 대신 정리해 주려 하지 않고, 그 뒤에 새로 해 본 일을 물었다.'),L(c==='jiwoo'?'이번에는 찍기 전에 먼저 물었어. 거절한 사람도 있었는데, 그 뒤에 같이 밥은 먹었어.':c==='haerin'?'잘된 날만 사진 보내려던 거 또 그러고 있더라. 그래서 어제는 접다가 망한 것도 보냈어.':c==='seoyeon'?'의견이 달랐던 부분을 남겨 두고 썼어요. 아직 마음에 안 들어도, 제가 고른 문장인 건 알겠어요.':c==='yuna'?'바쁘면 지금 말 못 한다고 했어. 그 말 한 번 했다고 사람들이 다 떠나지는 않더라.':'오늘은 도울 일이 없어도 그냥 시간 되느냐고 물어봤어요. 그 말이 저한테도 조금 덜 어색해졌어요.',c)];
 }
 function buildExtra(w,c,a,d){
  const p=`EXTRA${w}_${c}_${a.id}_${d.slot}`,sunday=w-1;
  const after=d.day==='wed'?`LIFE${w}_MID`:d.day==='fri'?`WEEK${w}_fri_PLAN`:'CHAPTER_TWO_END';
  const common={appointmentId:d.id,onDuty:c==='yuna'?{yuna:a.id==='break'}:undefined};
  const request=proposal(c,a,d),reply=answer[c]+` ${weekdays[d.day]} ${d.time}에 ${a.place}에서 ${['seoyeon','minseo'].includes(c)?'만나요.':'보자.'}`;
  make(p+'_SEND',`${sunday}주 일요일 · 두 번째 제안`,sunday,'sun','bg.home_night',[],[L('“'+request+'”'),L('시간을 더 잡는다고 가까워지는 속도까지 정할 수는 없었다. 오늘은 같이 하고 싶은 일을 분명히 적었다.')],p+'_REPLY',{effects:[appointment(d,'pending'),message(p+'-out',c,request,'out')]});
  make(p+'_REPLY',`${sunday}주 일요일 · 추가 약속 답장`,sunday,'sun','bg.home_night',[],[L('“'+reply+'”')],null,{effects:[message(p+'-reply',c,reply)],choices:[C('confirm',`${weekdays[d.day]} ${d.time} · 추가 약속을 확정한다.`,p+'_SET',[appointment(d,'confirmed'),flag('extraPerson'+w,c),flag('extraActivity'+w,a.id),flag('extraSlot'+w,d.slot),flag('extraDay'+w,d.day),message(p+'-confirm',c,'그 시간에 '+a.place+'에서 '+(['seoyeon','minseo'].includes(c)?'만나요.':'보자.'),'out')]),C('defer','추가 만남은 다음으로 미룬다.',p+'_SET',[appointment(d,'deferred'),message(p+'-defer',c,'이번 추가 약속은 다음에 다시 '+(['seoyeon','minseo'].includes(c)?'물어볼게요.':'물어볼게.'),'out')])]});
  const start=w===2?'W02_MON':w===3?'LIFE3_MON':w===4?'W04_MON':`W0${w}_MON`;
  make(p+'_SET',`${sunday}주 일요일 · 연락을 마친 밤`,sunday,'sun','bg.home_night',[],[L('대화창을 닫기 전에 서로 확인한 날짜를 다시 읽었다. 확정한 약속과 보류한 제안을 구분해 달력에 남겼다.')],start);
  const introduction=d.day==='wed'&&a.id==='break'?['유나는 늦은 교대 전에 동료에게 잠깐 자리를 맡기고 온유 창가로 왔다. 돌아갈 시각을 먼저 확인했다.']:d.day==='sat'&&a.id==='break'?['유나는 토요일의 교대 시간을 동료와 확인한 뒤 온유 창가로 왔다. 쉬는 시간이 끝나면 주문대로 돌아가기로 했다.']:a.intro;
  make(p+'_ARRIVE',`${w}주 ${weekdays[d.day]} ${d.time} · ${a.label}`,w,d.day,a.bg,[c],arriveClothes(c,a,activityScene(c,a,[...introduction.map(t=>L(t)),...a.activityLines.map(([t,s])=>L(t,s))])),null,{...common,choicePrompt:'함께 정한 이 시간에 무엇을 하고 싶을까?',choices:a.activityChoices.map(([choice,label,,value])=>C(choice,label,p+'_'+choice,[flag(`activityMemory_${c}_${a.id}`,value)]))});
  for(const [choice,,response]of a.activityChoices)make(p+'_'+choice,`${w}주 ${weekdays[d.day]} ${d.time} · 함께 한 작은 일`,w,d.day,a.bg,[c],[L(response,c),L('정한 시간이 되어 함께 자리를 정리했다. 짧은 만남이 긴 고민을 전부 해결한 건 아니었지만, 오늘 같이 한 일은 둘 다 알고 있었다.')],after,{...common,exitEffects:[appointment(d,'completed'),flag(`activitySeen_${c}_${a.id}`),relation(c),{type:'experience',id:p+'-completed'},...(a.cost?[{type:'money',amount:-a.cost}]:[]),message(p+'-after',c,activityAfter[c][a.id])]});
 }
}
