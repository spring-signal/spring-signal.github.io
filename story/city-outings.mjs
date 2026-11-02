import {L,C,planPeople,planNames,planId,weekdays} from './weekly-plans.mjs?v=200';
import {weaver,has,flag,all,not,msg,exp} from './everyday-tools.mjs?v=200';
import {outingContent} from './outing-content.mjs?v=200';
import {activityCatalog} from './activity-catalog.mjs?v=200';
import {extraPlanId,extraSlots} from './richer-weeks.mjs?v=200';
import {freeExtra} from './relationship-links.mjs?v=200';
import {lifeLines} from './life-choices.mjs?v=200';
const bg={bookshop:'bg.bookshop_day',gallery:'bg.city_gallery_day',market:'bg.market_day'},places={bookshop:'독립 책방',gallery:'작은 시립 전시실',market:'동네 시장'};
export const outingWeeks=[3,6,7];
export function addCityOutings(base){
 const {map,get,make,finish}=weaver(base);
 for(const w of outingWeeks){
  get(`LIFE${w}_SAT`).next=`OUT${w}_GATE`;
  make(`OUT${w}_GATE`,`${w}주 토요일 · 시내로 나가는 날`,w,'sat','bg.home_day',[],[L('출발 시각에 맞춰 나갈 준비를 했다. 돌아오는 교통편도 다시 확인했다.')],[...planPeople.map(c=>({when:all({appointment:planId(w),status:'confirmed'},has('planActivity'+w,'city'),has('planPerson'+w,c)),node:`OUT${w}_${c}_ARRIVE`})),{node:`SUN0${w}`}],{when:all({appointment:planId(w),status:'confirmed'},has('planActivity'+w,'city'))});
  for(const c of planPeople){
   const d=outingContent[c],p=`OUT${w}_${c}`,formal=['seoyeon','minseo','yuna'].includes(c),app={id:planId(w),character:c,week:w,day:'sat',time:'11:00',endTime:'17:30',activity:'city',slot:'city',purpose:'weekly',place:'정문 정류장 → 시내 → 선택 산책',label:d.label},common={appointmentId:app.id,onDuty:c==='yuna'?{yuna:false}:undefined};
   get(`PLAN${w}_${c}_ACT`).choices.push(C('city',d.label+' · 토요일 11:00~17:30',p+'_SEND'));
   const request=`토요일 열한 시 정문 정류장에서 만나 ${places[d.first]}부터 같이 ${formal?'가 볼까요?':'가 볼래?'} 점심 먹고 한 곳 더 보고, 다섯 시 반쯤 헤어지면 좋겠${formal?'어요.':'어.'}`;
   make(p+'_SEND',`${w-1}주 일요일 · 긴 외출의 제안`,w-1,'sun','bg.home_night',[],[L('평일의 긴 만남 대신 토요일을 함께 쓰고 싶다고 적었다. 이동과 식사까지 생각해 두고 실제로 쉴 수 있는지 먼저 물었다.'),L('“'+request+'”')],p+'_REPLY',{effects:[msg(p+'-out',c,request,'out'),{type:'appointment',...app,status:'pending'}]});
   make(p+'_REPLY',`${w-1}주 일요일 · 함께 비울 수 있는 시간`,w-1,'sun','bg.home_night',[],[L('“'+d.availability+'”'),L('교통비와 점심은 각자 부담하고 물건은 꼭 사지 않아도 된다고 확인했다. 피곤하면 마지막 산책은 줄일 수 있었다.')],null,{effects:[msg(p+'-reply',c,d.availability)],migrationDefault:'defer',choices:[C('confirm','토요일 긴 외출을 확정한다.',p+'_SET',[{type:'appointment',...app,status:'confirmed'},flag('planPerson'+w,c),flag('planActivity'+w,'city'),flag('planDay'+w,'sat'),flag('planSlot'+w,'city'),msg(p+'-confirmed',c,'토요일 열한 시 정문 정류장에서 '+(formal?'만나요.':'보자.'),'out')]),C('defer','이번 외출은 보류한다.',p+'_SET',[{type:'appointment',...app,status:'deferred'}])]});
   make(p+'_SET',`${w-1}주 일요일 · 달력에 남긴 외출`,w-1,'sun','bg.home_night',[],[L('확정한 시간만 달력에 남겼다. 짧은 추가 약속은 별도로 고를 수 있었다.')],`EXTRA${w}_PICK`,{scheduledAppointmentId:app.id});
   make(p+'_ARRIVE',`${w}주 토요일 11:00 · 정문 정류장`,w,'sat','bg.busstop_day',[c],[L(`${planNames[c]}와 약속한 정류장에서 만났다. 오늘은 다음 수업에 맞춰 교정으로 돌아올 필요가 없었다.`,'narrator',c==='yuna'?{clothingChanges:{yuna:true}}:{}),...(c==='yuna'?[L('유나는 앞치마와 이름표를 가게에 두고 개인 옷차림으로 왔다.')]:[]),L('버스에 나란히 앉아 창밖을 보았다. 침묵을 급하게 채우지 않으니 오늘 아침 이야기가 먼저 나왔다.','narrator',{cast:[],background:'bg.bus_day',location:'bus'}),L('시내에 내려 골목까지 걸으며 번갈아 지도를 확인했다.','narrator',{background:bg[d.first],location:{bookshop:'bookshop',gallery:'city-gallery',market:'market'}[d.first]})],p+'_FIRST',common);
   make(p+'_FIRST',`${w}주 토요일 11:40 · ${places[d.first]}`,w,'sat',bg[d.first],[c],[...d.firstLines.map(([t,s])=>L(t,s,{when:not(has('outingSeen_'+c))})),L(d.recall,'narrator',{when:has('outingSeen_'+c)})],null,{...common,choicePrompt:'함께 보는 시간에 무엇을 나누고 싶을까?',choices:d.choices.map(([id,label])=>C(id,label,p+'_FIRST_'+id,[flag('outingMemory_'+c,id)]))});
   for(const [id,,response]of d.choices)make(p+'_FIRST_'+id,`${w}주 토요일 · 서로 다르게 본 것`,w,'sat',bg[d.first],[c],[L(response,c),L('상대가 고른 이유를 듣고 내가 보지 못한 쪽을 다시 봤다. 결론이 달라도 같은 곳에 조금 더 머물 수 있었다.')],p+'_LUNCH',common);
   make(p+'_LUNCH',`${w}주 토요일 13:00 · 시장에서 점심`,w,'sat','bg.market_day',[c],[L('작은 식탁에 앉아 메뉴와 매운 정도를 먼저 물었다. 왕복 교통비 3,000원과 내 점심값 9,000원을 확인했다.'),L('요즘 어떻게 지내느냐는 질문이 내게 돌아왔다. 잘 지낸다는 말 대신 실제로 해 둔 일부터 말하기로 했다.')],null,{...common,choices:[C('study','과제에서 어디까지 왔는지 말한다.',p+'_LIFE_study'),C('work','교내 근로 준비를 어디까지 했는지 말한다.',p+'_LIFE_work'),C('rest','쉬는 시간에 대해 이야기한다.',p+'_LIFE_rest')]});
   for(const kind of ['study','work','rest'])make(p+'_LIFE_'+kind,`${w}주 토요일 · 내 쪽의 이야기`,w,'sat','bg.market_day',[c],[...(kind==='rest'?[L('쉬는 시간을 자꾸 남는 시간이라고 불렀다고 말했다. 오늘은 별일 없어도 함께 점심 먹고 싶은 시간을 먼저 골라 봤다고.')]:lifeLines(kind)),L(c==='seoyeon'?'지금 어디까지인지 말해 줘서 좋아요. 나머지를 제가 잘된 쪽으로 짐작하지 않아도 되고요.':c==='jiwoo'?'끝난 얘기만 하면 우리 할 말이 너무 줄어들겠다. 다음에도 거기서부터 들을게.':c==='haerin'?'나만 안 끝낸 거 들고 온 건 아니네. 잘 안된 날도 말해 줘.':c==='yuna'?'결과 전이면 전인 대로 말해 줘. 나도 그 기다리는 시간 알아.':'오늘 무엇을 도와줬는지 안 세도 되겠네요. 그냥 이야기할 시간도 있었으면 해요.',c)],p+'_SECOND',common);
   make(p+'_SECOND',`${w}주 토요일 14:30 · ${places[d.second]}`,w,'sat',bg[d.second],[c],[L('점심 뒤 다음 골목으로 걸었다. 따라오는지 한 번씩 돌아보며 속도를 맞췄다.'),...d.secondLines.map(([t,s])=>L(t,s)),L('세 시 반이 가까워져 남은 시간과 체력을 다시 물었다. 원래의 끝까지 밀어붙일 필요는 없었다.')],null,{...common,choices:[C('river','서로 더 걷고 싶다고 확인하고 강변까지 간다.',p+'_RIVER',[flag('outingFinish'+w,'river')]),C('early','피로와 내 할 일을 말하고 일찍 돌아간다.',p+'_EARLY',[flag('outingFinish'+w,'early')])]});
   make(p+'_RIVER',`${w}주 토요일 16:00 · 강변으로 가는 길`,w,'sat','bg.park_day',[c],[L('서로 더 걸을 수 있다고 답한 뒤 강변 쪽 버스를 탔다. 이동하는 동안은 말없이 쉬고 내릴 정류장만 같이 확인했다.','narrator',{cast:[],background:'bg.bus_day',location:'bus'}),L('공원 길을 천천히 걸었다. 한 사람만 돌아갈 시간을 미루지는 않기로 했다.')],p+'_RIVER_END',common);
   make(p+'_RIVER_END',`${w}주 토요일 17:30 · 강변에서`,w,'sat','bg.river_day',[c],[L(d.late),L('돌아갈 시각을 확인했다. 오래 있었다는 사실보다 중간에 서로 다르게 골랐던 말들이 남았다.')],p+'_RIVER_NEXT',{...common,exitEffects:done('17:30')});
   make(p+'_EARLY',`${w}주 토요일 15:30 · 오늘은 여기까지`,w,'sat',bg[d.second],[c],[L('나는 남겨 둔 일을 하거나 쉬고 싶다고 말했다. 오래 있고 싶은 마음과 돌아갈 필요를 같은 문장에 넣었다.'),L(formal&&c!=='yuna'?'말해 줘서 고마워요. 오늘 본 게 줄어드는 건 아니니까요.':'응. 더 오래 있는다고 오늘이 더 좋아지는 건 아닐 수도 있지.',c),L('산책을 줄인 날을 실패한 외출로 세지 않았다. 서로 확인해서 고른 귀가였다.')],p+'_EARLY_NEXT',{...common,exitEffects:done('15:30')});
   for(const end of ['RIVER','EARLY']){
    const q=p+'_'+end+'_NEXT',b=end==='RIVER'?'bg.river_day':bg[d.second],a=activityCatalog[c][2],slots=extraSlots(w+1,c,a);
    make(q,`${w}주 토요일 · 헤어지기 전에`,w,'sat',b,[c],[L('다음에 함께 해 보고 싶은 일이 떠올랐다. 이미 잡은 다른 약속을 그대로 두고 서로 가능한 시간만 확인할 수 있었다.')],p+'_HOME',{...common,when:freeExtra(w+1),migrationDefault:'leave',choices:[C('leave','오늘은 인사하고 다음에 연락한다.',p+'_HOME'),...slots.map((s,i)=>C('time'+i,`다음 주 ${weekdays[s.day]} ${s.time} · ${a.label}`,q+'_TIME'+i))]});
    slots.forEach((s,i)=>{
     make(q+'_TIME'+i,`${w}주 토요일 · 서로 가능한지 묻기`,w,'sat',b,[c],[L(`다음 주 ${weekdays[s.day]} ${s.time}에 ${a.place}에서 ${formal?'만날 수 있어요?':'만날 수 있어?'}`,'player'),L(c==='seoyeon'||c==='minseo'?'그 시간은 괜찮아요. 기존 약속은 그대로 두고 만나요.':'그 시간은 괜찮아. 이미 잡은 약속은 그대로 두고 그때 보자.',c)],null,{...common,choices:[C('confirm','함께 확인한 시간으로 확정한다.',q+'_SET'+i,[{type:'appointment',...s,status:'confirmed',origin:'conversation'},flag('extraPerson'+s.week,c),flag('extraActivity'+s.week,a.id),flag('extraDay'+s.week,s.day),flag('extraSlot'+s.week,s.slot),flag('extraOrigin'+s.week,'conversation'),msg(q+'-confirm'+i,c,`${s.week}주 ${weekdays[s.day]} ${s.time}, ${a.place}`,'out')]),C('defer','아직 확정하지 않는다.',p+'_HOME')],migrationDefault:'defer'});
     make(q+'_SET'+i,`${w}주 토요일 · 함께 남긴 다음 약속`,w,'sat',b,[c],[L(`${s.week}주 ${weekdays[s.day]} ${s.time}, ${a.place}. 대화창에서도 같은 시간을 확인했다.`)],p+'_HOME',{...common,scheduledAppointmentId:s.id});
    });
   }
   make(p+'_HOME',`${w}주 토요일 밤 · 돌아온 뒤`,w,'sat','bg.home_night',[],[L('집에 돌아와 가방을 내려놓고 씻은 뒤 잘 도착했는지 연락했다. 하루를 함께 쓴 뒤에도 각자 할 일이 남았다.')],`SUN0${w}`,{effects:[msg(p+'-after',c,formal&&c!=='yuna'?'잘 도착했어요. 오늘 서로 보고 싶은 곳 골라서 좋았어요.':'잘 도착했어. 오늘 서로 보고 싶은 곳 골라서 좋았어.')]});
   function done(endTime){return [{type:'appointment',...app,status:'completed',endTime},flag('outingSeen_'+c),exp(p+'-completed'),exp('outing-'+c),{type:'money',amount:-12000},{type:'relation',character:c,affection:1,trust:1}];}
  }
 }
 return finish();
}
