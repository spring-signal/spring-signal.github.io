import {personalArcs,laterTalk,personalReturns,laterScenes} from './personal-arcs.mjs?v=200';

export const planPeople=['seoyeon','jiwoo','haerin','yuna','minseo'];
export const planNames={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서'};
export const weekdays={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
export const activities={
 seoyeon:[
  {id:'read',label:'원고를 함께 읽기',day:'tue',time:'14:30',place:'도서관 로비',bg:'bg.library_day',intro:['수업 뒤 도서관 로비에서 서연을 기다렸다. 서연은 물 한 병과 원고철을 들고 약속한 시각에 왔다.','각자 읽을 부분을 먼저 골랐다. 소리를 내기 어려운 문장은 연필로 표시하고 서로 바꿔 읽었다.']},
  {id:'walk',label:'교정 산책하며 이야기하기',day:'thu',time:'15:00',place:'중앙 잔디밭 옆 길',bg:'bg.campus_day',intro:['서연은 약속한 잔디밭 옆에서 신발 끈을 다시 묶고 있었다. 오늘은 한 바퀴만 걷고 다음 수업에 가기로 했다.','걷다가 마음에 드는 풍경을 하나씩 골랐다. 서연이 가져온 접힌 원고는 벤치에 앉아서야 나왔다.']}
 ],
 jiwoo:[
  {id:'edit',label:'영상 편집 같이 보기',day:'wed',time:'16:30',place:'여운 동아리방',bg:'bg.club_day',intro:['지우가 공지방에 편집 시간을 남겨 둔 덕분에 동아리방은 비어 있었다. 약속한 시간에 노트북 화면을 함께 켰다.','나는 마우스를 잡지 않고 본 순서대로 메모했다. 지우가 표시한 부분을 다시 틀자 같은 장면이 조금 다르게 보였다.']},
  {id:'walk',label:'음료를 들고 교정 걷기',day:'fri',time:'15:30',place:'학생회관 앞',bg:'bg.campus_day',intro:['학생회관 앞에서 지우와 음료를 하나씩 골랐다. 모임 시작 전까지 걷고 오기로 일요일에 정한 약속이었다.','카메라 가방이 어깨에서 자꾸 미끄러져 지우가 끈을 줄였다. 내가 기다리자 오늘 본 이야기를 먼저 꺼냈다.']}
 ],
 haerin:[
  {id:'meal',label:'수업 뒤 저녁 함께 먹기',day:'thu',time:'17:30',place:'정문 식당과 정류장',bg:'bg.busstop_day',intro:['정문 식당에서 해린과 약속한 저녁을 먹었다. 나는 맵지 않은 메뉴를 골랐고 해린은 반찬을 한 번 더 받았다.','각자 계산하고 정류장 옆에 앉았다. 배가 고플 때보다 말이 조금 느리게 나왔다. 해린이 가방에서 작은 봉투를 꺼냈다.'],cost:9000},
  {id:'colors',label:'색 견본 들고 짧게 산책하기',day:'wed',time:'16:00',place:'중앙광장 벤치',bg:'bg.campus_day',intro:['해린은 약속한 광장 벤치에 먼저 와 있었다. 햇빛과 그늘에서 색이 달라진다며 봉투를 열었다.','같은 종이를 나무 그늘 아래와 밝은 길 위에서 번갈아 봤다. 작업실 형광등 아래에서는 못 본 색이 나왔다.']}
 ],
 yuna:[
  {id:'break',label:'카페 쉬는 시간에 신메뉴 이야기',day:'tue',time:'15:30',place:'온유 창가 자리',bg:'bg.cafe_day',intro:['유나는 동료와 교대 시간을 확인한 뒤 창가로 왔다. 일요일에 말한 대로 쉬는 시간 십 분만 함께 쓰기로 했다.','메뉴 사진과 레시피 수첩을 나란히 봤다. 나는 오늘 마실 음료값을 먼저 내고, 부탁받은 의견을 적었다.'],cost:4500},
  {id:'walk',label:'퇴근 뒤 캠퍼스 산책하기',day:'fri',time:'16:30',place:'온유 건너편 교문',bg:'bg.campus_day',intro:['일요일에 확인한 퇴근 시각에 맞춰 교문으로 갔다. 유나는 앞치마를 매장에 두고 자기 가방만 메고 나왔다.','배달 상자를 피해서 걷던 유나가 이번에는 큰길 대신 나무 많은 길을 골랐다. 모임에 갈 시간까지 한 바퀴 걷기로 했다.'],offDuty:true}
 ],
 minseo:[
  {id:'space',label:'동아리방 배치 함께 살펴보기',day:'thu',time:'16:00',place:'여운 동아리방',bg:'bg.club_day',intro:['민서가 일요일 답장에 적어 준 시간에 동아리방을 열었다. 도면을 돌려놓으러 오는 날이라 다른 부원의 작업 시간과 겹치지 않았다.','의자에 실제로 앉아 문까지 걸어 봤다. 민서는 숫자 옆에 우리가 멈춘 곳을 연필로 표시했다.']},
  {id:'walk',label:'점심 뒤 짧게 바깥 걷기',day:'wed',time:'12:20',place:'학생회관 뒤 산책로',bg:'bg.campus_day',intro:['학생회관 뒤에서 민서를 만났다. 점심을 마친 뒤 이십 분, 연구실로 돌아가기 전에 걷기로 한 약속이었다.','민서는 도면을 접어서 가방에 넣었다. 대신 길가 의자의 높이가 눈에 들어온다며 웃었다. 오늘은 앉아 보는 데까지만 하기로 했다.']}
 ]
};
const flag=(key,value=true)=>({type:'flag',key,value});
const contact=c=>({contact:c});
const has=(key,value=true)=>({flag:key,value});
const msg=(id,character,text,direction='in')=>({type:'message',id,character,text,direction});
const rel=c=>({type:'relation',character:c,affection:1,trust:1});
export const L=(text,speaker='narrator',extra={})=>({text,speaker,...(planPeople.includes(speaker)?{shot:'medium',pose:'front',to:'player',stageCast:[speaker]}:{}),...extra});
export const C=(id,label,next,effects=[],when)=>({id,label,next,effects,when});
const locations={'bg.home_night':'home','bg.library_day':'library','bg.club_day':'club','bg.campus_day':'campus','bg.cafe_day':'cafe','bg.busstop_day':'busstop','bg.lecture_day':'lecture'};
export function node(id,label,week,weekday,background,cast,lines,next,extra={}){
 return {id,label,week,weekday,day:`story-w${String(week).padStart(2,'0')}-${weekday}`,season:'spring',background,location:locations[background]??'campus',timeOfDay:background.endsWith('_night')?'night':'day',cast,outfits:Object.fromEntries(cast.map(c=>[c,c==='yuna'&&background==='bg.cafe_day'?'work_alt':'spring'])),lines,next,...extra};
}
export const planId=week=>`plan-w${String(week).padStart(2,'0')}`;
const id=(week,c,a)=>`PLAN${week}_${c}_${a}`;
function details(week,c,a){return {id:planId(week),character:c,week,day:week===8?'fri':a.day,time:week===8?({seoyeon:'14:30',jiwoo:'15:30',haerin:'17:30',yuna:'16:30',minseo:'12:20'}[c]):a.time,label:a.label,purpose:'weekly',activity:a.id,place:a.place};}
const app=(d,status)=>({type:'appointment',...d,status});
const yes={seoyeon:'좋아요. 그 시간 비워 둘게요.',jiwoo:'좋아. 그때 만나자. 늦어지면 먼저 연락할게.',haerin:'응. 작업 끝나는 시간 확인했어. 그때 보자.',yuna:'그 시간은 괜찮아. 근무표에도 적어 둘게.',minseo:'네. 연구실 일정이랑 겹치지 않아요. 그때 만나요.'};
const voices={seoyeon:'혹시 다음 주에 같이 시간 보낼 수 있어요?',jiwoo:'다음 주에 시간 같이 쓸래?',haerin:'다음 주에 우리 잠깐 만날까?',yuna:'다음 주 시간 괜찮으실까요?',minseo:'다음 주에 잠깐 뵐 수 있을까요?'};

export function addWeeklyPlans(nodes,week,next){
 const sunday=week-1,sun=`SUN0${sunday}`;
 nodes.push(node(sun,`${sunday}주 일요일 밤 · 다음 주 약속 잡기`,sunday,'sun','bg.home_night',[],[
  L('다음 주 시간표를 폈다. 먼저 연락해서 무엇을 같이 하고 싶은지 물어보기로 했다. 서로 답한 시간만 달력에 약속으로 남긴다.'),
  L(week===8?'다음 주 월요일 공부할 곳은 그날 정하기로 했다. 개인 약속은 시험이 끝나는 금요일에 짧게 잡을 수 있다.':'개인 번호를 나눈 사람에게 연락할 수 있다. 번호를 아직 나누지 않은 사람과는 학교에서 만나 먼저 이야기하면 된다.')
 ],next,{choicePrompt:'다음 주에는 누구에게 연락할까?',choices:[...planPeople.map(c=>C(c,planNames[c]+'에게 연락한다.',`PLAN${week}_${c}_ACT`,[],contact(c))),C('rest','이번 주는 개인 약속을 잡지 않는다.',`PLAN${week}_REST`)]}));
 nodes.push(node(`PLAN${week}_REST`,`${sunday}주 일요일 · 남겨 둔 시간`,sunday,'sun','bg.home_night',[],[L('연락할 사람을 억지로 고르지 않았다. 수업과 정기 모임은 예정대로 가고, 남은 시간에는 밀린 읽기 자료와 빨래를 하기로 했다.')],next));
 for(const c of planPeople){
  nodes.push(node(`PLAN${week}_${c}_ACT`,`${sunday}주 일요일 · 무엇을 함께 할까`,sunday,'sun','bg.home_night',[],[L(planNames[c]+'의 대화창을 열었다. “시간 돼?” 뒤에, 같이 하고 싶은 일을 덧붙였다.')],null,{choicePrompt:planNames[c]+'에게 무엇을 같이 하자고 제안할까?',choices:activities[c].map(a=>C(a.id,a.label,id(week,c,a.id)+'_SEND'))}));
  for(const a of activities[c]){
   const prefix=id(week,c,a.id),d=details(week,c,a),counter=week===2&&c==='haerin'&&a.id==='meal',proposed=counter?{...d,day:'wed',time:'18:00'}:d;
   const casual=['jiwoo','haerin'].includes(c);
   const proposal=`${voices[c]} ${weekdays[proposed.day]} ${proposed.time}, ${a.place}에서 ${a.label} ${casual?'어때?':'어때요?'}`;
   const reply=counter?'수요일은 작업 끝나는 시간이 애매해. 목요일 17:30은 어때? 그날이면 정문 식당에서 여유 있게 먹을 수 있어.':`${yes[c]} ${weekdays[d.day]} ${d.time}, ${d.place}${['seoyeon','minseo'].includes(c)?'에서 만나요.':'에서 보자.'}`;
   nodes.push(node(prefix+'_SEND',`${sunday}주 일요일 · 보낸 연락`,sunday,'sun','bg.home_night',[],[L('보낼 말을 한 번 읽고 전송했다.'),L('“'+proposal+'”'),L('답장을 기다리는 동안 다음 주 수업 자료를 내려받았다.')],prefix+'_REPLY',{effects:[msg(prefix+'-out',c,proposal,'out'),app(proposed,'pending')]}));
   nodes.push(node(prefix+'_REPLY',`${sunday}주 일요일 · 도착한 답장`,sunday,'sun','bg.home_night',[],[L(planNames[c]+'에게 답장이 왔다.'),L('“'+reply+'”')],null,{effects:[msg(prefix+'-reply',c,reply),...(counter?[app(d,'alternative')]:[])],choicePrompt:'이 시간으로 약속을 확정할까?',choices:[C('confirm',`${weekdays[d.day]} ${d.time} · ${a.label} 약속을 확정한다.`,prefix+'_CONFIRMED',[app(d,'confirmed'),flag('planDay'+week,d.day),flag('planPerson'+week,c),flag('planActivity'+week,a.id),msg(prefix+'-confirm',c,`${weekdays[d.day]} ${d.time}에 ${d.place}에서 만나요. 그때 같이 ${a.label}!`,'out')]),C('defer','이번에는 시간이 맞지 않는다고 답하고 다음에 잡는다.',prefix+'_DEFER',[app(d,'deferred'),msg(prefix+'-defer',c,'그 시간은 제가 어려울 것 같아요. 이번에는 따로 보내고 다음에 다시 물어볼게요.','out')])]}));
   nodes.push(node(prefix+'_CONFIRMED',`${sunday}주 일요일 · 달력에 남은 약속`,sunday,'sun','bg.home_night',[],[L(`${week}주 ${weekdays[d.day]} ${d.time}. ${planNames[c]} · ${a.label}. 장소까지 확인한 뒤 달력에 적었다.`),L('주간 일정에서 확정 표시를 확인했다. 그날이 오면 이 약속을 위해 시간을 비워 둔다.')],next));
   nodes.push(node(prefix+'_DEFER',`${sunday}주 일요일 · 다음에 다시`,sunday,'sun','bg.home_night',[],[L('보류한 제안은 완료된 만남으로 세지 않았다. 다음 주에도 수업과 정기 모임에서는 평소처럼 인사할 수 있다.')],next));
  }
 }
}

// A gate is inserted once per weekday into the common story spine.
export function addMeetingGate(nodes,week,day,next){
 const gate=`WEEK${week}_${day}_PLAN`;
 nodes.push(node(gate,`${week}주 ${weekdays[day]} · 오늘의 일정`,week,day,'bg.campus_day',[],[L('수업을 마치고 달력에서 오늘 정한 시간을 확인했다.')],next,{when:{all:[{appointment:planId(week),status:'confirmed'},has('planDay'+week,day)]},next:planPeople.flatMap(c=>activities[c].map(a=>({when:{all:[has('planPerson'+week,c),has('planActivity'+week,a.id)]},node:id(week,c,a.id)+'_ARRIVE'}))).concat({node:next})}));
 // Skip gates must still resolve to the next common scene when their condition is false.
 const gateNode=nodes.at(-1);
 gateNode.lines=[L('수업을 마치고 오늘의 약속 장소로 향했다.')];
 gateNode.next=gateNode.next.map(b=>b.when?{...b,when:{all:[{appointment:planId(week),status:'confirmed'},has('planDay'+week,day),b.when]}}:b);
 for(const c of planPeople)for(const a of activities[c]){
  const d=details(week,c,a);if(d.day!==day)continue;
  addMeeting(nodes,week,c,a,d,next);
 }
 return gate;
}

function addMeeting(nodes,week,c,a,d,next){
 const prefix=id(week,c,a.id),cancel=week===7&&c==='minseo'&&a.id==='space';
 const make=(suffix,label,lines,after,extra={})=>nodes.push(node(prefix+suffix,`${week}주 ${weekdays[d.day]} ${d.time} · ${label}`,week,d.day,a.bg,[c],lines,after,{appointmentId:planId(week),...extra}));
 if(cancel){
  nodes.push(node(prefix+'_ARRIVE','7주 목요일 · 바뀐 연구 일정',7,'thu','bg.campus_day',[],[L('약속 장소로 출발하기 전에 민서에게 연락이 왔다.'),L('“연구 점검이 오늘로 당겨졌어요. 네 시에는 못 나갈 것 같아요. 미리 말하지 못해서 미안해요.”'),L('“금요일 12:20에 십오 분은 가능해요. 아니면 이번 주는 쉬어도 괜찮아요.”')],null,{effects:[msg(prefix+'-cancel',c,'연구 점검이 당겨져서 오늘 네 시에는 못 나갈 것 같아요. 미안해요. 금요일 12:20에 십오 분은 가능해요. 이번 주는 쉬어도 괜찮고요.'),app(d,'cancelled')],choices:[C('change','금요일 12:20으로 바꾼다.',prefix+'_CHANGE',[app({...d,id:planId(week)+'-makeup',day:'fri',time:'12:20',label:'연구 점검 뒤 짧은 대화'},'confirmed'),flag('planMakeup7'),msg(prefix+'-change',c,'금요일 12:20에 동아리방에서 만나요. 십오 분만 이야기해요.','out')]),C('rest','이번 주는 쉬고 다음에 다시 잡는다.',prefix+'_SKIP',[msg(prefix+'-skip',c,'이번 주는 서로 할 일부터 마치고 다음에 다시 만나요. 미리 알려 줘서 고마워요.','out')])]}));
  make('_CHANGE','다시 정한 시간',[L('목요일 약속은 취소로 남겼다. 금요일 12:20의 새 약속을 따로 확인했다.')],next,{background:'bg.campus_day',location:'campus',cast:[]});
  make('_SKIP','이번 주는 각자의 시간',[L('오늘 만남은 취소됐다. 나도 남은 시간을 시험 준비에 쓰기로 했다. 만나지 않았으므로 대화의 다음 장은 아직 열리지 않았다.')],next,{background:'bg.campus_day',location:'campus',cast:[]});
  return;
 }
 const thirdHaerin={all:[has('archaerin1'),has('archaerin2'),{not:has('archaerin3')}]};
 const withoutEnvelope=a.id==='meal'
  ?[a.intro[0],'각자 계산하고 정류장 옆에 앉았다. 배가 고플 때보다 말이 조금 느리게 나왔다. 해린이 오늘 하고 싶었던 이야기를 먼저 꺼냈다.']
  :['해린은 약속한 광장 벤치에 먼저 와 있었다. 휴대폰에 저장한 색 견본을 켜고 옆자리를 가리켰다.','화면의 색 견본과 햇빛이 닿은 나뭇잎을 번갈아 보았다. 오늘은 작업 봉투를 펴지 않고 이야기를 나눴다.'];
 const arrival=c==='haerin'
  ?[...a.intro.map(t=>L(t,'narrator',{when:{not:thirdHaerin}})),...withoutEnvelope.map(t=>L(t,'narrator',{when:thirdHaerin}))]
  :a.intro.map(t=>L(t));
 make('_ARRIVE',a.label,arrival,[...personalArcs[c].map((_,i)=>({when:{not:has(`arc${c}${i+1}`)},node:prefix+'_ARC'+(i+1)})),{node:prefix+'_LATER'}]);
 for(const [i,arc]of personalArcs[c].entries()){
  const stage=i+1;
  const callback=arc.callback?Object.entries(arc.callback).map(([key,text])=>L(text,'narrator',{when:has(`arcChoice${c}${i}`,key)})):[];
  const earlier=c==='minseo'&&stage===1?[L('수업 시간을 숨겼던 날을 내가 먼저 사과했다. 민서는 오늘은 서로 끝낼 시간을 먼저 말하자고 했다.','narrator',{when:has('hidClassTime')})]:[];
  const core=arc.lines.map(([t,s])=>L(c==='yuna'&&stage===3&&a.id==='break'?t.replace('밖에서 만나면 어색할 줄 알았는데, 네가 손님처럼 앉아 있어서 좀 웃겨.','카운터 밖에 앉아 보니까 네가 어디 보고 있는지 이제 보이네.').replace('휴대폰 근무 알림을 끄는 데 시간이 조금 걸렸다.','쉬는 시간에는 동료에게 주문대를 맡겨 두었다.'):t,s));
  if(c==='yuna'&&stage===1&&a.offDuty)core[0].text=core[0].text.replace('앞치마 주머니에서','가방에서');
  if(c==='jiwoo'&&stage===1){
   for(const line of core.slice(-2))line.when={experience:'j-first-acting'};
   core.push(L('나는 처음 만났을 때 얼굴이 나오면 먼저 묻겠다고 했던 말을 떠올렸다. 그때도 오늘 같은 일을 걱정했는지 물었다.','narrator',{when:{not:{experience:'j-first-acting'}}}),L('응. 카메라만 보고 있으면 내가 찍고 싶은 것만 보게 되더라. 그래서 말로 한 번 더 물으려고 해.','jiwoo',{when:{not:{experience:'j-first-acting'}}}));
  }
  make('_ARC'+stage,arc.title,[...callback,...earlier,...core],null,{choicePrompt:'지금 이 사람에게 어떻게 답하고 싶을까?',choices:arc.choices.map(([choice,label,response,value])=>C(choice,label,prefix+'_ARC'+stage+'_'+choice,[flag(`arcChoice${c}${stage}`,value)]))});
  for(const [choice,,response]of arc.choices)make('_ARC'+stage+'_'+choice,arc.title,[L(response,c),L(arc.close)],prefix+'_DONE',{exitEffects:[flag(`arc${c}${stage}`),{type:'experience',id:`personal-${c}-${stage}`},rel(c)]});
 }
 const returns=Object.entries(personalReturns[c]).map(([value,t])=>L(t,'narrator',{when:{all:[has(`arcChoice${c}3`,value),{not:has('returned'+c)}]}}));
 const later=(laterScenes[c][week]??laterTalk[week]?.map(t=>[t])??[]).map(([t,s])=>L(t,s));
 make('_LATER','지난 대화 다음의 일',[...returns,...later],null,{choices:[C('share','이번 주 내게 있었던 일도 구체적으로 이야기한다.',prefix+'_LATER_SHARE',[rel(c),flag('returned'+c)]),C('listen','오늘 들은 이야기에서 더 궁금한 부분을 묻는다.',prefix+'_LATER_LISTEN',[rel(c),flag('returned'+c)])]});
 make('_LATER_SHARE','돌아오는 대화',[L('나는 읽기 자료를 미룬 일과 늦잠 때문에 빨래를 두 번 돌린 일을 이야기했다. 상대는 지난번 내가 말한 생활비 걱정을 기억하고 이번 주는 괜찮았는지 물었다.'),L('이야기는 내가 잘 지낸다는 보고에서 시작해, 내일 아침에 뭘 먼저 할지로 끝났다.')],prefix+'_DONE');
 make('_LATER_LISTEN','진행 중인 이야기',[L('지난번 대답을 기억하고 묻자 가방에서 그 뒤의 기록이 나왔다. 한 번 이야기했다고 곧장 해결된 일은 아니었다.'),L('오늘 새로 해 본 일 한 가지와 다음에 다시 할 일을 나눠 듣고 나니, 다음번에 묻고 싶은 질문이 구체적으로 남았다.')],prefix+'_DONE');
 make('_DONE','다녀온 약속',[L(`${a.label} 약속을 마치고 각자 다음 일정으로 향했다. 일요일에 비워 둔 시간이 오늘의 기억이 됐다.`)],next,{exitEffects:[app(d,'completed'),{type:'experience',id:prefix+'-completed'},...(a.cost?[{type:'money',amount:-a.cost}]:[]),msg(prefix+'-after',c,c==='haerin'?'오늘 얘기하니까 좋더라. 다음엔 네가 먼저 말하려던 것도 듣자.':c==='jiwoo'?'오늘 같이 봐 줘서 고마워. 네가 고른 부분 기억해 둘게.':c==='seoyeon'?'오늘 이야기한 부분 메모했어요. 다음에 만나면 그 뒤도 들려 드릴게요.':c==='yuna'?'오늘 시간 내 줘서 고마워. 돌아가는 길 조심하고.': '오늘 함께 시간 내 줘서 고마워요. 다음에는 제 얘기만 하지 않을게요.') ]});
}

export function addMakeup(nodes,next){
 const d={id:planId(7)+'-makeup',character:'minseo',week:7,day:'fri',time:'12:20',label:'연구 점검 뒤 짧은 대화',purpose:'weekly',place:'여운 동아리방'};
 nodes.push(node('WEEK7_MAKEUP','7주 금요일 12:20 · 다시 잡은 약속',7,'fri','bg.club_day',['minseo'],[
  L('민서는 약속한 시각에 연구실 자료를 가방에 넣었다. 변경한 만남은 오늘 십오 분만 쓰기로 했다.'),L('기다리게 할까 봐 자료 정리하다 먼저 연락했어요. 점검 끝나고 지금은 정말 괜찮아요.','minseo'),
  L('나는 취소 연락을 받았을 때 아쉬웠다고 말했다. 민서는 그럴 수 있다며 다음에는 점검 날짜가 나오는 대로 먼저 말하겠다고 했다.'),L('남은 시간에는 내 시험 범위를 이야기했다. 도면을 펼칠 시간은 없었지만 약속한 시각에 만나 서로의 근황을 들었다.')
 ],next,{when:has('planMakeup7'),appointmentId:d.id,exitEffects:[app(d,'completed'),{type:'experience',id:'minseo-makeup-w7'},rel('minseo')]}));
}
