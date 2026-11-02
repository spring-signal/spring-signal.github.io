import {node,L,C,planNames,planPeople,planId,weekdays} from './weekly-plans.mjs?v=200';
import {activityCatalog} from './activity-catalog.mjs?v=200';
import {extraPlanId,extraSlots} from './richer-weeks.mjs?v=200';
import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
import {connectionPeople,incidentalPlaces} from './connection-content.mjs?v=200';
const has=(key,value=true)=>({flag:key,value}),flag=(key,value=true)=>({type:'flag',key,value});
const all=(...rules)=>({all:rules}),not=rule=>({not:rule}),contact=c=>({contact:c});
const msg=(id,character,text,direction='in')=>({type:'message',id,character,text,direction});
const statuses=['pending','alternative','confirmed','completed','cancelled','declined','deferred'];
export const freeExtra=week=>not({any:statuses.map(status=>({appointment:extraPlanId(week),status}))});
const samePlan=(w,c,a)=>all(has('planPerson'+w,c),has('planActivity'+w,a));
export function followupOptions(w,c,a,day){
 const result=[];
 if(w===8){if(['mon','tue','wed','thu','fri'].includes(day))result.push(...extraSlots(w,c,a));}
 else {
  if(['mon','tue','wed'].includes(day))result.push(extraSlots(w,c,a)[0]);
  if(['mon','tue','wed','thu'].includes(day))result.push(extraSlots(w,c,a)[1]);
  if(w<8)result.push(...extraSlots(w+1,c,a));
 }
 return result;
}
const retarget=(value,from,to)=>typeof value==='string'?(value===from?to:value):value?.map(b=>({...b,node:b.node===from?to:b.node}));

export function connectRelationships(base){
 const map=new Map(structuredClone(base.nodes).map(n=>[n.id,n]));
 const get=id=>{const n=map.get(id);if(!n)throw Error('Missing relationship scene '+id);return n;};
 const make=(id,label,w,day,bg,cast,lines,next,extra={})=>{
  const n=node(id,label,w,day,bg,cast,lines,next,extra);n.wardrobeRevision='0.9.0';n.outfits=wardrobeFor(n);map.set(id,n);return n;
 };
 const spliceBefore=(target,id,predicate=()=>true)=>{for(const n of [...map.values()])if(!n.id.startsWith(id)&&predicate(n)){n.next=retarget(n.next,target,id);for(const choice of n.choices??[])choice.next=retarget(choice.next,target,id);}};
 const declined=(w,day,c)=>has(`contactDeferred_${w}_${day}_${c}`);
 // A decline means "today, no". Never ask the same person again on that day.
 for(const n of map.values())if(n.choices?.some(ch=>(ch.effects??[]).some(e=>e.type==='contact'))){
  const c=n.choices.flatMap(ch=>ch.effects??[]).find(e=>e.type==='contact').character;
  for(const ch of n.choices)if(!(ch.effects??[]).some(e=>e.type==='contact'))ch.effects=[...ch.effects??[],flag(`contactDeferred_${n.week}_${n.weekday}_${c}`)];
 }
 // Two distinct chances around the cafe, with work contact kept separate.
 contactScene('LINK3_YUNA','yuna',3,'thu','bg.cafe_day',[
  L('근무 이야기를 마치자 유나가 다음 손님 주문을 받았다. 나는 안내를 접어 넣고 기다렸다가, 주문대가 비었을 때 오늘 먹었던 메뉴 이야기를 조금 더 했다.'),
  L('메뉴 사진 고치고 있는데, 오늘 네가 어떤 걸 먼저 봤는지 궁금하네. 일할지 말지랑은 따로.','yuna')
 ],'WEEK3_thu_PLAN','player','메뉴 사진을 나중에도 보고 싶다며 개인 번호를 물어본다.');
 for(const id of ['W03_JOB_YES','W03_JOB_NO'])get(id).next='LINK3_YUNA';
 const jobNext=get('W04_JOB').next;
 get('W04_JOB').next='LINK4_YUNA_FIRST';
 contactScene('LINK4_YUNA_FIRST','yuna',4,'tue','bg.cafe_day',[
  L('포장 일을 마치고 나서 유나가 내게 빈 물컵을 내밀었다. 다음 주문 전 잠깐 쉬는 시간이었다.'),
  L('오늘 모르는 거 바로 물어봐 줘서 편했어. 가게 연락은 여기로 하면 되는데, 나도 개인적으로 네 안부 물어봐도 될까?','yuna')
 ],jobNext,'npc');
 // A club meeting supplies the actual attendees; no one materializes there.
 clubHub(3,['jiwoo'], 'LIFE3_SAT',[
  L('모임을 마치고 문 쪽으로 가니, 지우가 오늘 쓰던 장비를 가방에 넣고 있었다. 영상 안내가 아직 헷갈리는지 묻고는 잠깐 보여 줄 수 있다고 했다.')
 ]);
 for(const n of [...map.values()])if(n.week===3&&n.weekday==='fri'&&!n.id.startsWith('LINK3_CLUB')){n.next=retarget(n.next,'LIFE3_SAT','LINK3_CLUB');for(const c of n.choices??[])c.next=retarget(c.next,'LIFE3_SAT','LINK3_CLUB');}
 clubHub(6,['seoyeon','jiwoo','haerin'],'LIFE6_SAT',[
  L('전시 신청 이야기를 마치고 각자 쓰던 물건을 챙겼다. 서연은 원고를, 지우는 노트북을, 해린은 벽 길이를 적은 종이를 넣고 있었다. 먼저 나가는 사람을 붙잡지 않고 아직 정리 중인 사람에게 짧게 인사할 수 있었다.')
 ]);
 for(const id of ['PROJECT_SMALL','PROJECT_SPLIT'])get(id).next='LINK6_CLUB';
 // Materials come from a class shared on screen, not an invented private chat.
 const classNext=get('W05_TUE').next;get('W05_TUE').next='LINK5_SEOYEON_FILE';
 contactScene('LINK5_SEOYEON_FILE','seoyeon',5,'tue','bg.lecture_day',[
  L('보고서를 가방에 넣다가 서연이 표시한 색의 뜻을 다시 물었다. 서연은 실제로 본 것과 추측한 부분을 나눠 적은 자기 표를 보여 줬다.'),
  L('양식만 보내 드릴 수 있어요. 글 내용은 빼고요. 다음 시간에 직접 보여 드려도 되고.','seoyeon')
 ],classNext,'player','표를 받아 보고 싶다며 번호를 교환하자고 한다.');
 const sevenNext=get('W07_TUE').next;get('W07_TUE').next='LINK7_SEOYEON_FIRST';
 contactScene('LINK7_SEOYEON_FIRST','seoyeon',7,'tue','bg.lecture_day',[
  L('책을 덮고도 잘 나오지 않는 문장을 하나씩 말해 봤다. 다음 수업에 가려던 서연이 휴대폰을 들었다가 내게 먼저 물었다.'),
  L('학교에서만 이야기하니까 생각난 질문을 다음 주까지 들고 있게 되네요. 개인적으로도 연락해도 괜찮으세요?','seoyeon')
 ],sevenNext,'npc');
 // Place first, person second. Existing appointments with her that day hide the
 // chance encounter, so it cannot contradict an on-duty/off-duty meeting.
 const chance='LINK4_CHANCE';
 make(chance,'4주 수요일 · 잠깐 들를 곳',4,'wed','bg.campus_day',[],[
  L('수업 뒤에 작은 볼일을 하나 마치고 가기로 했다. 약속 장소에 갈 시간이 있다면 그 시간을 먼저 남겨 두고, 가까운 곳만 들를 생각이었다.')
 ],null,{migrationDefault:'skip',choicePrompt:'잠깐 어디에 들를까?',choices:[C('skip','오늘은 들르지 않고 남은 일정으로 간다.','EXTRA4_wed_GATE'),...incidentalPlaces.map(p=>C(p.id,p.label,`LINK4_CHANCE_${p.c}`,[],not({any:[all(has('planPerson4',p.c),has('planDay4','wed')),all(has('extraPerson4',p.c),has('extraDay4','wed'))]})))]});
 for(const p of incidentalPlaces){
  contactScene(`LINK4_CHANCE_${p.c}`,p.c,4,'wed',p.bg,p.lines.map(([t,s])=>L(t,s)),'EXTRA4_wed_GATE','player',p.ask,true);
 }
 spliceBefore('EXTRA4_wed_GATE',chance,n=>n.week===4&&n.weekday==='wed');

 // Every actual completed meeting can end with an in-person next invitation.
 // Move its after-message to the departure, after the invitation dialogue.
 const endings=[...map.values()].filter(n=>(n.exitEffects??[]).some(e=>e.type==='appointment'&&e.status==='completed'&&[planId(n.week),extraPlanId(n.week)].includes(e.id)));
 for(const ending of endings){
  const d=ending.exitEffects.find(e=>e.type==='appointment'&&e.status==='completed'),c=d.character;
  if(!connectionPeople[c])continue;
  const sourceActivity=activityCatalog[c].find(a=>a.id===d.activity);if(!sourceActivity)continue;
  const data=connectionPeople[c],a=activityCatalog[c].find(a=>a.id===(d.activity===data.target?data.other:data.target));
  const root=ending.id+'_NEXT',back=ending.next,afterMessages=ending.exitEffects.filter(e=>e.type==='message');
  ending.exitEffects=ending.exitEffects.filter(e=>e.type!=='message');
  ending.next=root;
  const candidates=followupOptions(d.week,c,a,ending.weekday);
  const conditions=candidates.map(next=>all(freeExtra(next.week),not(samePlan(next.week,c,a.id))));
  make(root,`${d.week}주 ${weekdays[ending.weekday]} · 헤어지기 전에`,d.week,ending.weekday,ending.background,[c],[
   L('자리를 정리하며 다음에 같이 해 보고 싶은 일이 떠올랐다. 지금 시간을 정해도 되는지 먼저 물어볼 수 있었다.')
  ],root+'_LEAVE',{onDuty:ending.onDuty,appointmentId:d.id,when:all(contact(c),{any:conditions}),migrationDefault:'leave',choicePrompt:'다음 만남도 지금 이야기해 볼까?',choices:[C('leave','오늘은 여기까지 이야기하고 인사한다.',root+'_LEAVE'),C('ask','다음에 함께 할 일을 먼저 제안한다.',root+'_ASK')]});
  invitation(root+'_ASK',c,a,d.week,ending.weekday,ending.background,[c],root+'_LEAVE',candidates,false,ending.onDuty);
  make(root+'_LEAVE',`${d.week}주 ${weekdays[ending.weekday]} · 각자의 다음 일정`,d.week,ending.weekday,ending.background,[],[
   L('마지막으로 인사하고 각자의 다음 일정으로 향했다. 다음에 만나기로 했다면 서로 확인한 시간과 장소가 달력에 남아 있었다.')
  ],back,{exitEffects:afterMessages});
 }
 // The Thursday evening invitation follows an actual completed conversation
 // or the new on-screen contact exchange. Only one eligible person writes.
 for(let w=2;w<=7;w++){
  const root=`INBOUND${w}`,back=`EXTRA${w}_fri_GATE`;
  const eligible=c=>all(contact(c),{any:[has(`arc${c}1`),has(`linkedTopic_${c}`),...activityCatalog[c].map(a=>has(`activitySeen_${c}_${a.id}`))]});
  const order=[...planPeople.slice((w-2)%5),...planPeople.slice(0,(w-2)%5)];
  const branches=[...order.map(c=>({when:all(has('planPerson'+w,c),{appointment:planId(w),status:'completed'},eligible(c)),node:root+'_'+c})),...order.map(c=>({when:eligible(c),node:root+'_'+c})),{node:back}];
  make(root,'금요일을 앞둔 목요일 밤',w,'thu','bg.home_night',[],[
   L('오늘 할 일을 마치고 휴대폰을 손에 들었다. 남은 연락을 확인하고 쉴지, 오늘은 먼저 내려놓을지 잠깐 생각했다.')
  ],back,{when:{any:order.map(eligible)},migrationDefault:'quiet',choicePrompt:'잠들기 전에 연락을 확인할까?',choices:[C('quiet','오늘은 먼저 쉬고 다음 일정으로 간다.',back),C('check','연락을 확인한다.',branches)]});
  for(const c of planPeople){
   const p=root+'_'+c,data=connectionPeople[c],a=activityCatalog[c].find(a=>a.id===data.target);
   const rules=[{when:has(`arc${c}1`),text:data.incoming},{when:has(`linkedTopic_${c}`),text:data.casual},...activityCatalog[c].map(x=>({when:has(`activitySeen_${c}_${x.id}`),text:activityMemory(c,x.id)+' '+invitationText(c,a.id)}))];
   const cases=rules.map((r,i)=>({...r,when:all(r.when,not({any:rules.slice(0,i).map(r=>r.when)}))}));
   make(p,`${w}주 목요일 밤 · 먼저 온 연락`,w,'thu','bg.home_night',[],[
    L(planNames[c]+'에게 먼저 메시지가 와 있었다.'),...cases.map(r=>L('“'+r.text+'”','narrator',{when:r.when}))
   ],null,{effects:cases.map(r=>({...msg(p+'-first',c,r.text),when:r.when})),choicePrompt:'먼저 온 연락에 어떻게 답할까?',migrationDefault:'later',choices:[C('later','고맙다고 답하고 약속은 다음에 다시 이야기한다.',p+'_LATER'),C('schedule','가능한 시간을 함께 확인한다.',p+'_ASK')]});
   make(p+'_LATER',`${w}주 목요일 밤 · 짧게 남긴 답`,w,'thu','bg.home_night',[],[L('먼저 생각나서 연락해 준 게 반갑다고 답했다. 오늘 약속까지 정하지 않아도 대화를 이어갈 수 있었다.')],back,{effects:[msg(p+'-later',c,(data.formal||c==='yuna')?'먼저 연락해 줘서 반가워요. 다음에 시간 맞춰서 다시 이야기해요.':'먼저 연락해 줘서 반가워. 다음에 시간 맞춰서 다시 이야기하자.','out')]});
   invitation(p+'_ASK',c,a,w,'thu','bg.home_night',[],back,followupOptions(w,c,a,'thu'),true);
   const possible={any:followupOptions(w,c,a,'thu').map(d=>all(freeExtra(d.week),not(samePlan(d.week,c,a.id))))};
   get(p).choices.find(ch=>ch.id==='schedule').when=possible;
   get(p).lines.push(L('이미 정한 만남이 있어 이번에 제안할 빈 시간은 없었다. 먼저 보내 준 이야기에는 짧게 답하기로 했다.','narrator',{when:not(possible)}));
  }
  spliceBefore(back,root,n=>n.week===w&&n.weekday==='thu'&&!n.id.startsWith(root));
 }
 // A reservation made in a conversation has priority over Sunday's empty slot.
 for(let w=2;w<=8;w++){
  get(`EXTRA${w}_PICK`).when=freeExtra(w);
  for(const c of planPeople){
   const act=get(`PLAN${w}_${c}_ACT`);
   for(const choice of act.choices)choice.when=all(choice.when??{met:c},not(all({appointment:extraPlanId(w),status:'confirmed'},has('extraPerson'+w,c),has('extraActivity'+w,choice.id))));
   for(const a of activityCatalog[c])for(const d of extraSlots(w,c,a)){
    get(`SUN0${w-1}`).lines.push(L(`${planNames[c]}와 앞서 정한 약속은 ${weekdays[d.day]} ${d.time}, ${a.place}다. 일요일에 새로 잡는 만남과 섞지 않고 그대로 비워 두었다.`,'narrator',{when:all({appointment:extraPlanId(w),status:'confirmed'},has('extraPerson'+w,c),has('extraActivity'+w,a.id),has('extraSlot'+w,d.slot))}));
   }
  }
 }
 const seen=new Set(),visit=id=>{if(!id||seen.has(id))return;const n=get(id);seen.add(id);const follow=value=>typeof value==='string'?visit(value):value?.forEach(b=>visit(b.node));follow(n.next);for(const ch of n.choices??[])follow(ch.next);};visit(base.start);
 return {...base,narrativeRevision:'0.11.0',sourceRevision:'16',scope:'나중의 연락처 교환 · 먼저 온 연락 · 만남 중 다음 약속 · 1~8주',nodes:[...map.values()].filter(n=>seen.has(n.id))};

 function contactScene(id,c,w,day,bg,lines,back,mode,askLabel,always=false){
  const data=connectionPeople[c],known=all({met:c},not(contact(c)),not(declined(w,day,c)));
  const outfit=c==='yuna'?{onDuty:{yuna:bg==='bg.cafe_day'}}:{};
  let intro=lines;
  if(c==='yuna'&&bg==='bg.campus_day')intro=[L('유나는 가게 앞치마를 매장에 두고 개인 옷차림으로 와 있었다.','narrator',{clothingChanges:{yuna:true}}),...intro];
  const n=make(id,`${w}주 ${weekdays[day]} · 이어서 나눌 이야기`,w,day,bg,[c],intro,back,{...outfit,...(!always?{when:known}:{}),migrationDefault:'leave',choicePrompt:mode==='npc'?'앞으로 개인적으로도 연락할까?':'헤어지기 전에 더 하고 싶은 말이 있을까?',choices:[C('leave',mode==='npc'?'오늘은 번호를 나누지 않고 다음에 직접 이야기한다.':'오늘은 인사하고 각자의 일정으로 간다.',back,[flag(`contactDeferred_${w}_${day}_${c}`)]),C('ask',mode==='npc'?'개인적으로 연락해도 좋다고 하고 번호를 나눈다.':askLabel,id+'_AGREE',[],known)]});
  if(always){n.choices[0].effects=[];n.choices[0].label='짧게 인사하고 원래 일정으로 간다.';}
  make(id+'_AGREE',`${w}주 ${weekdays[day]} · 서로 괜찮은 걸 확인하고`,w,day,bg,[c],[L(mode==='npc'?((data.formal||c==='yuna')?'네. 개인적으로도 연락하고 싶어요.':'응. 나도 개인적으로 연락하고 싶어.'):((data.formal||c==='yuna')?'다음에도 이런 이야기 하고 싶어요. 괜찮으면 개인 번호 나눌까요?':'다음에도 이런 이야기 하고 싶어. 괜찮으면 개인 번호 바꿀래?'),'player'),L(data.formal?'좋아요. 제가 먼저 저장할게요. 답장은 서로 편할 때 해요.':'좋아. 내가 먼저 저장할게. 답장은 서로 편할 때 하고.',c),L('서로 번호를 입력하고 이름을 확인했다. 전에 미뤘던 마음을 해명하라고 묻는 사람은 없었다.')],id+'_SAVED',{...outfit,exitEffects:[{type:'contact',character:c},flag(`linkedTopic_${c}`),{type:'experience',id:id+'-contact'}]});
  const text=id.includes('FILE')?'아까 보여 드린 표의 빈 양식이에요. 글 내용 없이 정리하는 방식만 남겼어요.':id.includes('CHANCE')?chanceAfter(c):data.sent;
  make(id+'_SAVED',`${w}주 ${weekdays[day]} · 새 대화창의 첫 인사`,w,day,bg,[c],[L('휴대폰이 짧게 울렸다. 방금 나눈 이야기의 첫 메시지였다.'),L('“'+text+'”')],back,{...outfit,effects:[msg(id+'-first',c,text)]});
 }
 function clubHub(w,people,back,lines){
  const id=`LINK${w}_CLUB`;
  make(id,`${w}주 금요일 · 모임 뒤 짧은 인사`,w,'fri','bg.club_day',[],lines,back,{when:{any:people.map(c=>all(not(contact(c)),not(declined(w,'fri',c))))},migrationDefault:'leave',choicePrompt:'아직 정리 중인 누구에게 말을 걸까?',choices:[C('leave','오늘은 인사하고 먼저 나간다.',back),...people.map(c=>C(c,planNames[c]+'에게 잠깐 말을 건다.',id+'_'+c,[],all(not(contact(c)),not(declined(w,'fri',c)))))]});
  for(const c of people)contactScene(id+'_'+c,c,w,'fri','bg.club_day',clubLines(c,w),back,w===6?'npc':'player','안내 영상도 받고 다음에 이야기하고 싶다며 번호를 물어본다.');
 }
 function invitation(id,c,a,w,day,bg,cast,back,candidates,incoming,onDuty){
  const data=connectionPeople[c],possible=d=>all(freeExtra(d.week),not(samePlan(d.week,c,a.id)));
  const available={any:candidates.map(possible)};
  make(id,`${w}주 ${weekdays[day]} · 다음 시간을 함께 고르기`,w,day,bg,cast,[
   L(incoming?'먼저 온 제안에 반갑다고 답하고 내 달력을 확인했다.':invitationText(c,a.id),incoming?'narrator':'player'),
   L(incoming?'이미 정한 약속을 옮기지 않고 서로 가능한 빈 시간만 골랐다.':data.reply,incoming?'narrator':c)
  ],back,{onDuty,when:available,migrationDefault:'leave',choicePrompt:'어느 시간으로 다음 약속을 제안할까?',choices:[C('leave','지금은 시간을 정하지 않고 다음에 다시 이야기한다.',back),...candidates.map((d,i)=>C('time'+i,`${d.week===w?'이번 주':'다음 주'} ${weekdays[d.day]} ${d.time} · ${a.label}`,id+'_TIME'+i,[],possible(d)))]});
  candidates.forEach((d,i)=>{
   const p=id+'_TIME'+i,label=`${d.week}주 ${weekdays[d.day]} ${d.time} · ${a.place}`,request=`${label}에서 ${(data.formal||c==='yuna')?'만날 수 있어요?':'만날 수 있어?'}`,reply=data.accept+` ${label}${data.formal?'에서 만나요.':'에서 보자.'}`;
   make(p,`${w}주 ${weekdays[day]} · 서로 가능한지 확인`,w,day,bg,cast,[L(incoming?'“'+request+'”':request,incoming?'narrator':'player'),L(incoming?'“'+reply+'”':reply,incoming?'narrator':c)],null,{onDuty,effects:incoming?[msg(p+'-out',c,request,'out'),msg(p+'-reply',c,reply)]:[],choicePrompt:'이 시간과 장소로 다음 만남을 확정할까?',migrationDefault:'defer',choices:[C('defer','이번에는 확정하지 않고 다음에 다시 정한다.',p+'_DEFER'),C('confirm',label+' · 약속을 확정한다.',p+'_SET',[{type:'appointment',...d,status:'confirmed',origin:incoming?'incoming':'conversation'},flag('extraPerson'+d.week,c),flag('extraActivity'+d.week,a.id),flag('extraDay'+d.week,d.day),flag('extraSlot'+d.week,d.slot),flag('extraOrigin'+d.week,incoming?'incoming':'conversation'),msg(p+'-confirm',c,`${label}에서 만나${(data.formal||c==='yuna')?'요.':'.'}`,'out')])]});
   make(p+'_SET',`${w}주 ${weekdays[day]} · 함께 정한 다음 약속`,w,day,bg,cast,[L(`${label}. ${a.label}. 서로 같은 날짜를 보고 있는지 확인하고 달력에 적었다.`),L('헷갈리지 않게 대화창에도 같은 시간을 한 줄 남겼다. 이미 있던 다른 약속은 그대로 두고 새로 정한 시간만 비워 두었다.')],back,{onDuty,scheduledAppointmentId:d.id});
   make(p+'_DEFER',`${w}주 ${weekdays[day]} · 다음에 다시 정하기`,w,day,bg,cast,[L(incoming?'“'+data.decline+'”':data.decline,incoming?'narrator':c),L('확정하지 않은 시간을 만날 약속처럼 달력에 적지는 않았다.')],back,{onDuty,effects:incoming?[msg(p+'-defer',c,(data.formal||c==='yuna')?'이번에는 확정하지 않고 다음에 다시 시간을 물어볼게요.':'이번에는 확정하지 않고 다음에 다시 시간을 물어볼게.','out'),msg(p+'-ack',c,data.decline)]:[]});
  });
 }
}

function invitationText(c,activity){const d=connectionPeople[c];return activity===d.other?d.otherRequest:d.request;}
function chanceAfter(c){return {seoyeon:'오늘 반납함 앞에서 이야기해서 반가웠어요. 다음에 읽은 책 이야기도 해요.',jiwoo:'아까 고친 안내 사진이야. 어느 입구에서 찍은 건지도 같이 남겼어.',haerin:'아까 못 정한 물건은 작업실에 두고 왔어. 오늘은 집에서 좀 쉬려고. 너도 잘 들어가.',yuna:'아까 정원에서 얘기하니까 가게에서 볼 때랑 좀 다르더라. 오늘 반가웠어.',minseo:'아까 안내판의 전시 이름이에요. 날짜는 제가 한번 더 확인해 볼게요. 오늘 이야기해서 좋았어요.'}[c];}
function clubLines(c,w){return {seoyeon:[L('서연이 원고철을 닫고도 한동안 클립을 찾았다. 내가 탁자 밑을 가리키자 웃으며 주웠다.'),L('맨날 글 얘기할 때만 말 걸었네요. 다음에는 그냥 안부도 묻고 싶어요. 괜찮으면 번호 나눌까요?','seoyeon')],jiwoo:[L(w===3?'지우가 방금 정리한 장비 옆에 휴대폰을 놓고 모임방 안내 영상을 보여 줬다. 나는 입구를 설명하는 부분에서 잠깐 멈춰 달라고 했다.':'지우는 노트북 전원을 끄고 내게 오늘 모임이 어땠는지 물었다. 영상 길이보다 서로 비워 둔 시간을 더 오래 이야기했다.'),L(w===3?'이 부분만 따로 보내 주면 처음 오는 애들도 덜 헤매겠지. 너도 나중에 한번 봐 줘.':'공지는 단체방에서 받겠지만, 너한테 따로 안부도 묻고 싶어. 괜찮으면 번호 바꿀래?','jiwoo')],haerin:[L('해린은 벽 길이를 적은 종이를 접어 넣었다. 나는 작업실에 다시 가는지 물었고 해린은 오늘은 집에 간다고 했다.'),L('오늘 뭐 했냐고 물으면 작업 얘기만 하게 되네. 너한테는 별일 없는 날에도 연락해 보고 싶어. 번호 바꿀래?','haerin')]}[c];}
function activityMemory(c,a){return {seoyeon:{read:'지난번 함께 읽은 쪽 다시 펼쳐 봤어요.',walk:'지난번 같이 걸었던 길을 오늘 또 지났어요.',shelf:'지난번 골라 준 책 반납하기 전에 한 쪽 더 읽었어요.',letter:'지난번 쓴 편지 아직 접어 뒀어요.'},jiwoo:{edit:'지난번 함께 본 수정본 다시 틀어 봤어.',walk:'지난번 같이 고른 음료 생각났어.',music:'지난번 같이 들은 곡 오늘도 재생목록에 남아 있어.',frame:'지난번 같이 확인한 사진 다시 봤어.'},haerin:{meal:'지난번 같이 먹었던 메뉴 생각났어.',colors:'지난번 함께 본 색 견본 다시 꺼냈어.',fold:'지난번 만든 작은 모형 아직 탁자에 있어.',snack:'지난번 잠깐 쉬던 벤치 오늘 또 봤어.'},yuna:{break:'지난번 네가 말한 메뉴 의견 다시 읽었어.',walk:'지난번 함께 걸었던 길 오늘은 혼자 걸었어.',offmeal:'지난번 나눠 먹었던 간식 생각났어.',list:'지난번 같이 쓴 목록 다시 폈어.'},minseo:{space:'지난번 함께 앉아 본 자리 오늘도 확인했어요.',walk:'지난번 같이 걸었던 길 생각났어요.',sketch:'지난번 그린 공책 아직 지우지 않았어요.',puzzle:'지난번 함께 본 퍼즐 다음 장을 펼쳐 봤어요.'}}[c][a];}
