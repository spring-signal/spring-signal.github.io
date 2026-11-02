import {studyData,named} from './seasonal-scenes.mjs?v=200';

const nodes=[];
const people=['seoyeon','jiwoo','haerin','yuna','minseo'];
const names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서'};
const flag=(key,value=true)=>({type:'flag',key,value});
const experience=id=>({type:'experience',id});
const relation=(character,affection=0,trust=0)=>({type:'relation',character,affection,trust});
const contact=character=>({contact:character});
const has=(key,value=true)=>({flag:key,value});
const all=(...rules)=>({all:rules});
const not=rule=>({not:rule});
const message=(id,character,text,direction='in',when)=>({type:'message',id,character,text,direction,when});
const L=(text,speaker='narrator',extra={})=>({text,speaker,...(people.includes(speaker)?{shot:'medium',pose:'front',to:'player'}:{}),...extra});
const C=(id,label,next,effects=[],when)=>({id,label,next,effects,when});
const locations={'bg.home_night':'home','bg.home_day':'home','bg.club_day':'club','bg.lecture_day':'lecture','bg.busstop_day':'busstop','bg.cafe_day':'cafe','bg.library_day':'library','bg.spring_lodge_night':'lodge'};
const N=(id,label,week,weekday,background,cast,lines,next,extra={})=>nodes.push({id,label,week,weekday,day:`story-w${String(week).padStart(2,'0')}-${weekday}`,season:'spring',location:locations[background]??'campus',timeOfDay:background.endsWith('_night')?'night':'day',background,cast,outfits:Object.fromEntries(cast.map(c=>[c,c==='yuna'&&locations[background]==='cafe'?'work_alt':'spring'])),lines,next,...extra});
const appointment=(week,c,status,extra={})=>({type:'appointment',id:`focus-w0${week}`,character:c,status,week,day:'thu',time:'16:00',label:'수업 뒤 짧은 대화',purpose:'conversation',...extra});
const focusNext=(week,fallback)=>people.map(c=>({when:has('focusW'+week,c),node:`W0${week}_INVITE_${c}`})).concat({node:fallback});
const meetingNext=(week,fallback)=>people.map(c=>({when:has('focusW'+week,c),node:week===7&&c==='minseo'?'W07_CANCEL_ROUTE':`W0${week}_MEET_${c}`})).concat({node:fallback});

function focusMenu(week,next){
 const target=week+1;
 N(`SUN0${week}`,`${week}주 일요일 밤 · 다음에 듣고 싶은 이야기`,week,'sun','bg.home_night',[],[
  L('다음 주 시간표를 열었다. 수업과 생활 사이에, 한 사람의 이야기를 조금 더 들을 시간을 남겨 두고 싶었다.'),
  L('혼자 생각한 계획이 약속이 되는 건 아니다. 학교에서 직접 물어보고 서로 가능한 시간을 확인하기로 했다.')
 ],next,{choicePrompt:'다음 주에는 누구와 조금 더 이야기하고 싶을까?',choices:[
  ...people.map(c=>C(c,named(names[c],'과','와')+' 이야기할 시간을 먼저 물어본다.',next,[flag('focusW'+target,c)])),
  C('rest','이번 주는 내 공부와 생활에 시간을 쓴다.',next,[flag('focusW'+target,'rest')])
 ]});
}

const focusStories={
 seoyeon:{background:'bg.library_day',invitation:'목요일 네 시, 도서관 로비에서 잠깐 괜찮아요? 원고 한 장만 같이 보고 싶어요.',
  contact:'다음에 읽을 부분도 보내 드리고 싶어요. 괜찮으시면 서로 번호 저장할까요? 답은 편할 때 주셔도 돼요.',
  5:{intro:'서연은 대출 도서 옆에 원고 한 장만 놓았다. 지난번보다 종이가 적었다.',talk:'이번에는 제가 궁금한 부분을 먼저 말해 볼게요. 주인공이 돌아가는 이유가, 읽는 사람한테도 보이나요?',
   memory:L('함께 관찰 과제를 했을 때 적었던 ‘실제로 본 것’과 ‘짐작한 것’을 나란히 펼쳤다.','narrator',{when:{experience:'q03-pair-s'}}),
   choices:[['ask','돌아가기 직전에 무엇을 망설였는지 묻는다.','그 장면을 너무 빨리 넘겼나 봐요. 무슨 답을 줘야 할지보다, 어디를 다시 읽고 싶은지 알겠어요.'],['read','내가 이해한 이유부터 말하고 서연의 생각을 듣는다.','저는 다른 이유로 썼는데, 그렇게 읽힐 수도 있겠네요. 제 설명부터 덮어씌우지 말아야겠다.']],close:'서연은 고칠 문장에 표시하고 나머지 원고를 가방에 넣었다. 나는 오늘 읽지 않은 뒷이야기를 아는 척하지 않았다.'},
  6:{intro:'서연은 지난주보다 짧아진 문장을 보여 줬다. 덜 썼는데 더 오래 걸렸다고 했다.',talk:'끝을 쓰면 누가 별로라고 할 수도 있잖아요. 그래서 계속 첫 장만 고치고 있었나 봐요.',
   choices:[['small','이번 주에 끝내 보고 싶은 작은 장면을 묻는다.','그럼 주인공이 집에 돌아오는 데까지만 써 볼래요. 잘 썼는지 말고, 돌아왔는지만 봐 주세요.'],['listen','읽어 주길 원하는 부분과 아직 혼자 두고 싶은 부분을 묻는다.','오늘은 이 두 문장까지만요. 나머지는 완성한 다음 제가 먼저 가져올게요.']],close:'언제까지 보내 달라는 말은 하지 않았다. 서연은 스스로 정한 마지막 장면의 제목을 적었다.'},
  7:{intro:'서연은 시험 범위를 먼저 챙긴 뒤 원고를 접었다. 오늘 약속은 십오 분만 보기로 했다.',talk:'이번 주에는 새 원고 안 가져왔어요. 약속했다고 보여 줄 걸 억지로 만들고 싶지는 않아서요.',
   choices:[['respect','시험 끝나고 다시 듣겠다고 하고 오늘은 안부를 묻는다.','좋아요. 오늘은 원고가 아니라 그냥 저랑 이야기하는 날인 걸로요.'],['own','나도 이번 주에 벅찼던 일을 하나 이야기한다.','매번 읽어 주는 사람이라고만 생각했네요. 오늘은 제가 듣는 쪽 할게요.']],close:'시간을 확인하고 서로의 노트를 챙겼다. 약속을 짧게 지킨 덕분에 저녁 공부를 미루지 않았다.'}},
 jiwoo:{background:'bg.campus_day',invitation:'목요일 네 시에 표지 영상 한 번만 봐 줄래? 촬영은 끝났어. 십오 분이면 돼.',
  contact:'영상 보여 줄 때마다 학교에서 붙잡기도 그렇네. 괜찮으면 번호 바꿀래? 개인적으로 연락해도 되는 걸로.',
  5:{intro:'지우는 계단 난간에 휴대폰을 올리고 길 안내 영상을 재생했다. 내가 본 표지가 화면에서 빠르게 지나갔다.',talk:'처음 오는 사람한테는 이 속도가 어때? 나는 길을 아니까 자꾸 다 보인다고 생각하게 돼.',
   memory:L('처음 카메라 뒤에서 지우를 찍었던 날이 떠올랐다. 이번에는 찍는 사람의 익숙함을 잠깐 내려놓고 봤다.','narrator',{when:{experience:'j-first-camera'}}),
   choices:[['pause','헷갈린 갈림길에서 멈추고 왜 놓쳤는지 말한다.','아, 나는 계단을 먼저 보는데 너는 문 번호부터 보는구나. 그럼 그 순서대로 바꿔 볼게.'],['walk','영상에 나온 길을 실제로 걸으며 확인한다.','같이 걸으니까 여기서 멈추는 이유가 보이네. 혼자 편집실에 있었으면 또 넘겼겠다.']],close:'지우는 바꿀 컷 두 개만 적었다. 오늘 안에 전부 다시 찍겠다는 말은 하지 않았다.'},
  6:{intro:'지우는 카메라를 켜지 않은 채 벤치에 앉았다. 오늘은 보여 줄 영상이 없다고 먼저 말했다.',talk:'영상 망치면 지우면 되는데, 그냥 이야기하다 말 막히는 건 편집을 못 하잖아.',
   choices:[['wait','대답을 급히 채우지 않고 잠깐 같이 앉아 있는다.','지금 침묵이 그렇게 불편하진 않네. 네가 다음 질문 준비하는 얼굴은 아니라서.'],['share','나도 말을 고르다 타이밍을 놓친 일을 이야기한다.','너도 그러는구나. 나는 나만 잘하는 척하느라 바쁜 줄 알았네.']],close:'지우가 카메라 가방을 고쳐 멨다. 찍어 둔 장면은 없었지만 오늘 나눈 말은 기억할 수 있을 것 같았다.'},
  7:{intro:'지우는 편집 앱을 닫고 시험 날짜가 적힌 화면을 보여 줬다. 약속한 시간 뒤에는 바로 도서관에 가야 했다.',talk:'시험 끝나면 해 줄게, 이 말 너무 많이 해 놨어. 끝나는 날에 할 일이 더 많아.',
   choices:[['sort','지금 꼭 지켜야 할 약속과 다시 물어볼 일을 나눠 본다.','못 하는 걸 지금 말하는 것도 일이네. 그래도 사라졌다가 나타나는 것보단 낫겠다.'],['limit','오늘 우리 약속부터 정한 시간에 마치자고 한다.','좋아. 연장 없는 약속 하나부터 성공시키자.']],close:'지우는 먼저 가야 할 시간을 지켰다. 나는 같이 도서관까지 따라가는 대신 내 공부할 곳으로 갔다.'}},
 haerin:{background:'bg.busstop_day',invitation:'목요일 네 시에 정류장 앞에서 잠깐 볼래? 이번에는 작업 사이에 비는 시간부터 확인했어.',
  contact:'아직 새 번호 안 바꿨지. 사진 얘기 말고도, 괜찮으면 이제 개인적으로 연락해도 될까?',
  5:{intro:'해린은 정류장 옆 벤치에 작은 스케치북을 펼쳤다. 아직 제출하지 않은 색 견본이 끼워져 있었다.',talk:'어릴 때 좋아하던 거랑 지금 잘하는 게 꼭 같지는 않더라. 계속 하면 좋아질 줄 알았는데.',
   memory:L('취소됐던 저녁이 생각났다. 그래도 오늘 약속을 그날의 보상처럼 이야기하고 싶지는 않았다.','narrator',{when:{appointment:'h-meal-w04',status:'cancelled'}}),
   choices:[['now','요즘 작업에서 아직 좋아하는 순간이 있는지 묻는다.','색이 딱 맞았을 때. 그때는 남이 뭐라고 할지 잠깐 잊어. 아, 아직 있네.'],['honest','잘해야 한다는 생각 때문에 내가 피했던 일을 이야기한다.','너는 그런 얘기 안 할 줄 알았는데. 예전 이야기만 아는 건 나도 마찬가지였네.']],close:'버스 한 대가 지나갔다. 이번에는 보내기 전에 서로 탈 노선을 확인했다.'},
  6:{intro:'해린은 제출한 모형 사진보다 잘라 낸 종이 조각 사진을 먼저 보여 줬다.',talk:'이거 만드는 시간은 제출물에 안 보이잖아. 그래서 나도 자꾸 없던 시간처럼 취급하게 돼.',
   choices:[['process','보이지 않는 과정 중 가장 오래 걸린 부분을 묻는다.','여기 접힌 데. 다시 한 게 다섯 번이야. 별것 아닌 데를 봐 주니까 이상하게 덜 억울하네.'],['rest','오늘은 결과 설명을 쉬고 다른 이야기를 해도 된다고 한다.','그럼 네 자취 요리 얘기 해 봐. 반찬 독립은 아직도 안 됐어?']],close:'해린은 사진을 넘기다 휴대폰을 껐다. 아무 결과물도 평가하지 않고 끝낸 대화였다.'},
  7:{intro:'해린은 손에 묻은 풀을 닦고 나왔다. 약속 시간을 늘릴 수는 없지만 오늘은 취소하지 않아도 된다고 했다.',talk:'만나는 시간 남기려면 그전에 끝낼 수 있는 양부터 정해야 하더라. 이번에는 그렇게 해 봤어.',
   memory:L('취소됐던 저녁이 떠올랐다. 오늘은 둘 다 가능한 시간을 확인하고 왔다는 점이 조금 달랐다.','narrator',{when:{appointment:'h-meal-w04',status:'cancelled'}}),
   choices:[['balance','만나는 시간도 공부할 시간도 같이 지키자고 한다.','응. 너 기다리게 안 하려고 밤새우는 것도 좀 이상하니까. 우리 둘 다 적당히 하자.'],['honest','짧게라도 얼굴을 보니 반갑다고 솔직하게 말한다.','그 말은 좀 좋네. 십 분 만났다고 십 분짜리로 반가운 건 아니니까.']],close:'해린이 먼저 가방을 들었다. 나는 남은 시간을 붙잡지 않고 시험 잘 보라고 했다.'}},
 yuna:{background:'bg.cafe_day',invitation:'목요일 네 시, 다음 주문 몰리기 전 십 분은 괜찮아. 이야기하다 바빠지면 일부터 해야 해.',
  contact:'근무 연락이랑은 별개로 물어보는 거야. 서로 괜찮으면 개인 번호도 저장할까? 쉬는 날 이야기할 수도 있으니까.',
  5:{intro:'온유에서 주문을 마치고 기다렸다. 유나는 동료에게 카운터를 부탁한 뒤 약속한 십 분을 확인했다.',talk:'네가 주문 기다릴 때 의자 정리하던 거 기억나. 요즘은 상자 옮기기 전에 꼭 물어보더라.',
   memory:L('두 시간 포장 보조를 했을 때 확인한 순서가 떠올랐다. 오늘은 손님이라 작업대 안으로 들어가지 않았다.','narrator',{when:{experience:'first-shift-completed'}}),
   choices:[['ask','필요한 도움인지 묻는 게 왜 편한지 이야기한다.','맞아. 거절해도 고마움까지 거절하는 건 아니잖아. 이제 말이 좀 통하네.'],['day','일 말고 오늘 유나에게 좋았던 일을 묻는다.','출근길에 커피 안 쏟은 거? 농담 같지. 오늘은 그 정도 작은 일부터 세고 싶네.']],close:'새 주문 소리가 나자 유나가 자리에서 일어났다. 나는 더 이야기해 달라고 붙잡지 않았다.'},
  6:{intro:'유나는 휴대폰 계산기를 끄고 테이블로 왔다. 쉬는 시간에도 다음 주문 숫자를 세고 있었다.',talk:'아무것도 안 하면 놓치는 것 같아서. 쉬는 날 계획도 근무표처럼 짤 때가 있어.',
   choices:[['listen','계획 없이 쉬어서 좋았던 날이 있었는지 묻는다.','그냥 빵 하나 사서 걷던 날. 누구한테 잘 쉬었다고 설명할 필요가 없었어.'],['pause','오늘 십 분 동안은 다음 일 얘기를 쉬어도 될지 묻는다.','좋아. 그럼 너 먼저 아무 쓸모 없는 얘기 하나 해 봐. 재미있으면 더 좋고.']],close:'유나는 알람이 울린 뒤 돌아갔다. 짧은 휴식이었다는 사실과 편하게 이야기했다는 사실은 같이 남았다.'},
  7:{intro:'카페가 한산해질 때까지 기다렸다. 유나는 시험 전에는 너무 늦게까지 앉아 있지 말라고 했다.',talk:'다들 졸린 얼굴로 와서 커피만 늘려. 나도 마감 남으면 그러니까 남 얘기 같지는 않고.',
   choices:[['plan','오늘은 정한 분량까지만 하고 집에 가겠다고 한다.','그럼 마지막 잔 추가하기 전에 한 번만 생각해. 네가 정한 게 어디까지였는지.'],['thanks','시험 안 보는 사람도 챙길 일이 많겠다고 안부를 묻는다.','응. 나는 다음 주도 출근인데, 그걸 물어봐 주니까 조금 고맙네.']],close:'유나는 빈 컵을 챙기고 카운터로 돌아갔다. 나는 그날 공부를 마칠 시간을 노트 위에 적었다.'}},
 minseo:{background:'bg.club_day',invitation:'목요일 네 시에 도면 돌려놓으러 동아리방에 와요. 이십 분 정도 괜찮으면 그때 이야기할까요?',
  contact:'다음에는 시간 바뀌면 바로 알려 드리고 싶네요. 서로 괜찮으면 개인적으로 연락할 번호를 나눌까요?',
  5:{intro:'민서는 접이식 의자 두 개를 서로 비스듬히 놓았다. 예전에 막혀 있던 문 앞 통로는 비어 있었다.',talk:'도면에서는 괜찮았는데 사람이 앉으면 다른 자리가 되는 게 재밌어요. 제 계획도 좀 그렇고요.',
   memory:L('십 분만 도울 수 있다고 말했던 날이 생각났다. 민서는 오늘도 먼저 가능한 시간을 물었다.','narrator',{when:has('keptTime')}),
   choices:[['people','그 공간에서 실제로 쉴 사람의 이야기를 묻는다.','그 질문이 먼저였어야 했네요. 잘 배치했다고 말하고 싶어서 사람 얘기를 뒤로 밀었나 봐요.'],['time','민서 자신의 쉬는 자리는 어디인지 묻는다.','연구실 제 자리밖에 생각이 안 나네요. 오늘은 이 의자로 해 둘까요?']],close:'민서는 연구실에 돌아갈 시간을 확인했다. 나는 약속한 이십 분을 넘겨 새 도면을 펴 달라고 하지 않았다.'},
  6:{intro:'민서는 연구 자료를 펼쳤다가 다시 묶었다. 오늘은 검토를 부탁하려고 부른 게 아니라고 했다.',talk:'누가 고민을 말하면 자꾸 답부터 찾게 돼요. 저한테도 그렇게 하니까, 쉬어도 해결한 게 있어야 할 것 같고요.',
   choices:[['listen','지금은 해결보다 그냥 말하고 싶은 이야기인지 묻는다.','네. 그걸 제가 먼저 말해도 되는군요. 오늘은 조언 없이 들어 주면 좋겠어요.'],['share','나도 답을 못 찾은 채 지내는 일을 하나 말한다.','그 얘기 끝에 결론 안 붙여도 괜찮네요. 저도 오늘은 그렇게 말해 볼게요.']],close:'민서는 자료를 다시 펴지 않았다. 우리는 해결한 일 대신 이야기한 시간을 기억하며 나왔다.'}}
};

function contactOffer(prefix,week,c,background,next,weekday='thu'){
 N(prefix+'_CONTACT',`${week}주 · 연락해도 되는 사이`,week,weekday,background,[c],[L(focusStories[c].contact,c)],next,{when:not(contact(c)),choicePrompt:'앞으로 개인적으로 연락해도 괜찮을까?',choices:[
  C('yes','서로 괜찮은 걸 확인하고 번호를 저장한다.',prefix+'_CONTACT_YES',[{type:'contact',character:c}]),
  C('later','오늘 이야기는 좋았지만 연락처는 다음에 나누고 싶다고 한다.',prefix+'_CONTACT_LATER')
 ]});
 N(prefix+'_CONTACT_YES',`${week}주 · 서로 저장한 이름`,week,weekday,background,[c],[L('서로 번호를 입력하고 이름을 확인했다. 번호를 안다는 것과 언제든 답을 받아야 한다는 것은 다른 일이었다.')],next);
 const later={seoyeon:'괜찮아요. 다음에 학교에서 만나면 그때 이야기해요.',jiwoo:'좋아. 그럼 다음에 학교에서 보면 직접 이야기하자.',haerin:'그래. 다음에 만나면 직접 이야기하자.',yuna:'괜찮아. 다음에 매장에 오면 편할 때 이야기하자.',minseo:'괜찮아요. 다음에 학교에서 만나면 그때 이야기해요.'};
 N(prefix+'_CONTACT_LATER',`${week}주 · 다음에 직접`,week,weekday,background,[c],[L(later[c],c),L('번호를 저장하지 않고 헤어졌다. 오늘 나눈 이야기까지 없어진 것은 아니었다.')],next);
}

function focusWeek(week){
 const start=`W0${week}`,end=start+'_FRI';
 N(start+'_MON',`${week}주 월요일 · 다시 펼친 시간표`,week,'mon','bg.campus_day',[],[
  L(week===5?'꽃길이 끝난 다음 주에도 수업은 그대로 있었다. 나는 주말에 함께 걸었던 사람과 오늘 할 공부를 따로 떠올렸다.':week===6?'학기 초에 길을 묻던 건물까지 이제 혼자 걸을 수 있었다. 익숙해진 만큼, 누구에게 어떤 말을 듣고 싶은지도 조금 구체적이 됐다.':'강의실마다 시험 범위를 묻는 사람이 늘었다. 누군가를 만나고 싶다는 마음과 공부할 시간은 같은 달력 안에 적어야 했다.'),
  L('일요일에 생각한 사람에게 오늘 짧게 물어보기로 했다.','narrator',{when:not(has('focusW'+week,'rest'))})
 ],focusNext(week,start+'_TUE'));
 for(const c of people){
  const invite=week===6&&c==='jiwoo'?'목요일 네 시에 잠깐 볼래? 이번에는 촬영 말고 그냥 이야기 좀 하고 싶어.':week===7&&c==='jiwoo'?'목요일 네 시, 도서관 가기 전 십오 분은 괜찮아. 그때 잠깐 이야기할까?':week===7&&c==='seoyeon'?'이번 주는 원고 말고 그냥 안부도 괜찮아요? 목요일 네 시에 십오 분 정도면 좋겠어요.':focusStories[c].invitation;
  N(start+'_INVITE_'+c,`${week}주 월요일 · 가능한 시간부터`,week,'mon',focusStories[c].background,[c],[L('수업 뒤 '+names[c]+'에게 이번 주에 잠깐 이야기할 시간이 있는지 직접 물었다.'),L(invite,c),L('목요일 네 시. 서로 가능한 시간을 확인하고 달력에 적었다.')],start+'_TUE',{effects:[appointment(week,c,'confirmed')]});
 }
 N(start+'_TUE',`${week}주 화요일 · 수업에 남은 말`,week,'tue','bg.lecture_day',['seoyeon'],[
  L(week===5?'발표를 마친 뒤 제출한 관찰 보고서를 돌려받았다. 서연은 자기 글에서 실제로 본 것과 추측한 부분을 다른 색으로 표시했다.':week===6?'수업에서는 같은 짧은 글을 서로 다른 시점으로 다시 읽었다. 시험 범위를 묻기 전에 지난주 메모부터 펼쳤다.':'중간고사 범위가 확정됐다. 강사는 외운 문장을 쓰는 것보다 자기 말로 근거를 설명할 수 있는지 확인하라고 했다.'),
  L(week===5?'저는 설명을 줄이면 더 정확해지는 줄 알았는데, 필요한 말을 빼기도 했네요.':week===6?'제가 적은 걸 다른 사람이 읽는다고 생각하니까, 생략한 부분이 보이네요.':'읽을 때는 알겠는데 책 덮으면 문장이 안 나오더라고요. 이번 주는 그걸 해 보려고요.','seoyeon'),
  L('서로 다음 강의실을 확인하고 인사했다. 수업에서 나눈 말이 곧바로 사적인 약속이 되는 것은 아니었다.')
 ],meetingNext(week,start+'_REST'));
 N(start+'_REST',`${week}주 목요일 · 내가 정한 빈 시간`,week,'thu','bg.library_day',[],[L('새 약속을 잡지 않은 오후, 도서관에서 밀린 읽기를 끝냈다. 다음에 누군가를 만날 때에도 내 생활을 다 미뤄 둔 얼굴로 가고 싶지는 않았다.')],end,{exitEffects:[experience('own-study-w0'+week)]});
 for(const c of people){
  if(week===7&&c==='minseo')continue;
  const data=focusStories[c][week],prefix=start+'_MEET_'+c;
  N(prefix,`${week}주 목요일 · ${names[c]}의 이야기`,week,'thu',focusStories[c].background,[c],[L(data.intro),...(data.memory?[data.memory]:[]),L(data.talk,c)],null,{choices:data.choices.map(([id,label])=>C(id,label,prefix+'_'+id,[relation(c,1,1)]))});
  for(const [id,,answer]of data.choices)N(prefix+'_'+id,`${week}주 · 듣고 나서 할 말`,week,'thu',focusStories[c].background,[c],[L(answer,c),L('나는 바로 다음 질문을 덧붙이지 않고, 그 말을 한 번 더 생각했다.')],prefix+'_CONTACT',{exitEffects:[experience(`focus-w0${week}-${c}`)]});
  contactOffer(prefix,week,c,focusStories[c].background,prefix+'_LEAVE');
  N(prefix+'_LEAVE',`${week}주 목요일 · 약속한 만큼`,week,'thu',focusStories[c].background,[c],[L(data.close)],end,{exitEffects:[appointment(week,c,'completed')]});
 }
}

focusMenu(4,'W05_MON');
focusWeek(5);
N('W05_FRI','5주 금요일 · 봄 MT 신청',5,'fri','bg.club_day',[],[
 L('민준이 토요일 봄 MT 안내를 붙였다. 하루 숙박과 식재료를 합쳐 참가비는 25,000원. 일요일 오전에 학교로 돌아오는 일정이었다.'),
 L('서연과 지우, 해린은 수업을 확인했고 민서는 토요일 연구 일정 뒤에 합류하기로 했다. 유나는 주말 근무가 있어 가지 않는다. 참가할지 아직 정하지 않은 사람에게는 먼저 물었다.')
],null,{choicePrompt:'이번 주말은 어떻게 보낼까?',choices:[
 C('join','일정을 확인하고 참가비 25,000원을 내고 간다.','W05_MT_TRAVEL',[{type:'money',amount:-25000},flag('springMtJoined')]),
 C('stay','이번에는 자취방에서 쉬고 내 공부를 한다.','W05_HOME',[experience('spring-mt-declined')])
]});
N('W05_MT_TRAVEL','5주 토요일 · 학교 밖으로',5,'sat','bg.campus_day',[],[L('약속한 학교 정문에서 버스를 탔다. 민준은 인원을 확인했고, 장보기 담당인 지우는 봉투 두 개를 발밑에 내려놨다.'),L('해가 기울 무렵 숙소에 도착했다. 나는 먼저 도착한 사람들과 짐을 넣고 주방으로 갔다.')],'W05_MT_KITCHEN');
N('W05_MT_KITCHEN','5주 토요일 저녁 · 장보기 봉투',5,'sat','bg.spring_lodge_night',['haerin','jiwoo'],[
 L('해린과 지우가 봉투를 풀었다. 양파 두 망이 탁자 위로 굴러 나왔다.','narrator',{stageCast:['haerin','jiwoo']}),
 L('여섯 명인데 왜 두 망이야?','haerin',{to:'jiwoo'}),L('망이 작아 보였어.','jiwoo',{to:'haerin'}),
 L('나는 둘 사이에서 한 망을 다시 묶었다. 서연은 거실에 컵을 놓고 있었고, 민서는 약속한 늦은 버스로 오는 중이었다.','narrator',{stageCast:[]})
],'W05_MT_SEOYEON',{event:'spring-mt'});
N('W05_MT_SEOYEON','5주 토요일 저녁 · 컵을 놓는 순서',5,'sat','bg.spring_lodge_night',['seoyeon'],[
 L('거실에서 서연이 컵을 한 개씩 세었다. 도와줄 일이 있는지 묻자 아직 오지 않은 사람 자리를 비워 달라고 했다.'),
 L('늦게 왔는데 자기 자리만 없는 건 좀 그렇잖아요. 저도 모임 처음 갔을 때 그게 제일 걱정됐어요.','seoyeon'),L('나는 문 쪽 자리를 하나 남겨 뒀다. 잠시 뒤 민서와 민준이 현관으로 들어왔다.')
],'W05_MT_DINNER',{event:'spring-mt'});
N('W05_MT_DINNER','5주 토요일 밤 · 늦게 온 자리',5,'sat','bg.spring_lodge_night',['seoyeon','jiwoo','haerin','minseo'],[
 L('민서가 가방을 내려놓고 남겨 둔 자리에 앉았다. 밥과 국이 놓인 뒤에야 처음부터 온 사람과 늦게 온 사람이 같은 식탁에 모였다.','narrator',{stageCast:[]}),
 L('제 자리까지 챙겨 뒀네요. 늦었는데 들어오기 편했어요.','minseo'),L('식탁에는 양파 요리가 두 개 올라왔다. 지우가 그중 하나를 슬쩍 자기 쪽으로 당겼다.','narrator',{stageCast:['jiwoo']}),
 L('이건 내가 책임질게. 다른 건 남기지 말고 먹어.','jiwoo'),L('식사를 마치고 그릇을 나눠 치웠다. 거실에 남을 사람과 먼저 쉴 사람이 각자 시간을 확인했다.','narrator',{stageCast:[]})
],null,{event:'spring-mt',effects:[experience('spring-mt-attended')],choicePrompt:'식사 뒤에는 무엇을 할까?',choices:[
 C('talk','거실에 남아 서연·민서와 조용히 이야기한다.','W05_MT_TALK'),
 C('game','해린·지우와 짧은 게임을 하고 주방을 정리한다.','W05_MT_GAME'),
 C('rest','오늘은 먼저 들어가 쉬고 아침에 인사한다.','W05_MT_REST')
]});
N('W05_MT_TALK','5주 토요일 밤 · 꼭 쓸모가 없어도',5,'sat','bg.spring_lodge_night',['seoyeon','minseo'],[
 L('서연과 민서는 거실에 남았다. 해린과 지우는 설거지를 마무리하고 바깥 공기를 쐬러 나갔다.','narrator',{stageCast:[]}),
 L('요즘 좋아하는 거요? 엄청 매운 과자요. 글 쓸 때 말고 그냥 먹어요.','seoyeon'),L('좋아하는 것마다 작업에 도움이 돼야 하는 건 아니죠. 저는 버스에서 보는 창밖이 좋아요.','minseo'),L('나도 아무 이유 없이 좋아하는 것을 하나 말했다. 다음 질문을 준비하기보다 서로 웃는 시간을 오래 뒀다.')
],'W05_MT_RETURN',{event:'spring-mt',exitEffects:[experience('spring-mt-talk'),relation('seoyeon',1,1),relation('minseo',1,1)]});
N('W05_MT_GAME','5주 토요일 밤 · 규칙을 아는 사람',5,'sat','bg.spring_lodge_night',['haerin','jiwoo'],[
 L('서연은 원고를 챙겨 방으로 갔고 민서도 먼저 쉬기로 했다. 남은 셋이 주방 탁자를 닦고 카드 몇 장을 펼쳤다.'),
 L('설명한 사람이 먼저 틀리면 벌칙 두 번 아니야?','haerin',{to:'jiwoo'}),L('그 규칙은 방금 생긴 거잖아.','jiwoo',{to:'haerin'}),L('큰 소리가 나기 전에 게임을 한 번만 하고 접었다. 지우가 진 사람 몫까지 컵을 들었다.')
],'W05_MT_RETURN',{event:'spring-mt',exitEffects:[experience('spring-mt-game'),relation('haerin',1,1),relation('jiwoo',1,1)]});
N('W05_MT_REST','5주 토요일 밤 · 먼저 쉬어도 되는 날',5,'sat','bg.spring_lodge_night',[],[L('내일 아침에 보자고 말하고 먼저 방으로 들어갔다. 문밖에서 이야기가 조금 더 이어졌지만, 그 자리에 끝까지 있어야만 함께 온 사람이 되는 것은 아니었다.')],'W05_MT_RETURN',{event:'spring-mt',exitEffects:[experience('spring-mt-rest')]});
N('W05_MT_RETURN','5주 일요일 · 다시 학교 앞',5,'sun','bg.campus_day',[],[L('아침을 먹고 각자 쓴 자리를 정리한 뒤 버스를 탔다. 학교 앞에서 짐을 나누고 인사했다. 즐거웠다는 말과 돌아가서 할 일은 같이 남았다.')],'SUN05');
N('W05_HOME','5주 토요일 · 남아 있는 주말',5,'sat','bg.home_night',[],[L('빨래를 걷고 읽다 만 자료를 마저 읽었다. MT에 가지 않았으니 그날 식탁에서 어떤 이야기가 나왔는지는 몰랐다.'),L('나는 내 주말에 있었던 일을 노트에 적었다. 다음 모임에서 들을 이야기가 하나 생겼다.')],'SUN05');

focusMenu(5,'W06_MON');
focusWeek(6);
N('W06_FRI','6주 금요일 · 작게 남기는 계획',6,'fri','bg.club_day',[],[
 L('금요일 모임에서는 여름 전시의 준비 일을 작게 나눴다. 민준은 이번 주에 끝낼 수 있는 것만 적으라고 했다.'),
 L('기록 담당이라 지난 모임의 실제 대화를 정리해 건넸다. 못 들은 이야기를 채워 넣지는 않았다.','narrator',{when:has('roleRecord')}),
 L('나는 준비물을 옮기고 맡은 일을 마쳤다고 이야기했다. 아직 모르는 장비는 다음에 배우기로 했다.','narrator',{when:has('roleHelp')}),
 L('나는 이번에는 관객으로 의견을 보탰다. 아직 맡지 않은 일을 끝냈다고 기록하지는 않았다.','narrator',{when:has('roleVisitor')}),
 L('장보기 목록의 양파 수를 보고 지우가 웃었다. MT에 갔던 사람들 사이에서 짧은 설명이 오갔다.','narrator',{when:{experience:'spring-mt-attended'}}),
 L('나는 지난주 MT 이야기를 처음 들었다. 그 자리에 없었던 만큼 모르는 대목은 물어봤다.','narrator',{when:{experience:'spring-mt-declined'}}),
 L('집에 돌아갈 때는 다음 모임보다 중간고사 날짜가 먼저 떠올랐다.')
],'SUN06');

focusMenu(6,'W07_MON');
focusWeek(7);
N('W07_CANCEL_ROUTE','7주 수요일 · 바뀌는 일정',7,'wed','bg.campus_day',[],[L('목요일에 만나기로 했던 민서의 연구 일정이 바뀌었다.')],[{when:contact('minseo'),node:'W07_CANCEL_MESSAGE'},{node:'W07_CANCEL_FACE'}]);
N('W07_CANCEL_MESSAGE','7주 수요일 · 먼저 도착한 연락',7,'wed','bg.home_day',[],[
 L('오전 수업 전 민서에게 메시지가 왔다. 연구 중간 점검이 목요일 오후로 옮겨져 약속한 시간에 나올 수 없다고 했다.'),L('대신 금요일 열두 시 이십 분, 동아리방에서 십오 분은 가능하다고 덧붙였다. 나는 점심 수업 시간을 확인했다.')
],'W07_CHANGE',{effects:[message('minseo-w07-cancel','minseo','연구 점검이 목요일 오후로 바뀌었어요. 약속한 시간에는 못 나갈 것 같아요. 미리 말해 두고 싶어서요. 금요일 12:20에 동아리방에서 15분은 가능한데, 수업 괜찮아요?')]});
N('W07_CANCEL_FACE','7주 수요일 · 직접 전하는 변경',7,'wed','bg.club_day',['minseo'],[
 L('개인 번호를 아직 나누지 않아 민서는 수요일 자료 반납 때 직접 일정을 전했다. 목요일에 기다리게 만들기 전에 말하고 싶었다고 했다.'),L('연구 점검이 목요일 오후로 바뀌었어요. 금요일 열두 시 이십 분에 십오 분은 괜찮은데, 수업이 있으면 이번 주는 미뤄요.','minseo')
],'W07_CHANGE');
N('W07_CHANGE','7주 수요일 · 다시 맞출 수 있을까',7,'wed','bg.campus_day',[],[L('원래 목요일 약속은 취소됐다. 금요일의 짧은 점심까지 만나야 하는지는 내 일정도 보고 정할 일이었다.')],null,{effects:[appointment(7,'minseo','cancelled'),appointment(7,'minseo','pending',{id:'focus-w07-makeup',day:'fri',time:'12:20',label:'연구 점검 뒤 짧은 대화'})],choices:[
 C('confirm','금요일 12:20~12:35가 가능하다고 답한다.','W07_MAKEUP',[appointment(7,'minseo','confirmed',{id:'focus-w07-makeup',day:'fri',time:'12:20~12:35',label:'연구 점검 뒤 짧은 대화'}),message('minseo-w07-confirm','minseo','금요일 12:20~12:35는 괜찮아요. 그때 동아리방에서 봬요.','out',contact('minseo'))]),
 C('defer','이번 주는 미루고 서로 시험과 연구를 먼저 하자고 한다.','W07_REST',[appointment(7,'minseo','deferred',{id:'focus-w07-makeup',day:'fri',time:'12:20',label:'이번 주 대화는 보류'}),message('minseo-w07-defer','minseo','이번 주는 미루고 시험이랑 연구부터 마쳐요. 다음에 학교에서 봬요.','out',contact('minseo'))])
]});
N('W07_MAKEUP','7주 금요일 12:20 · 십오 분의 점심',7,'fri','bg.club_day',['minseo'],[
 L('민서는 약속한 시간에 도면을 접고 기다렸다. 나는 다음 수업까지 남은 시간을 먼저 말했다.'),L('바뀐 시간까지 맞춰 줘서 고마워요. 만나는 시간을 늘리는 것보다, 정한 만큼 지키는 게 오늘은 더 좋네요.','minseo'),L('나는 연구 점검이 어땠는지 묻고 내 시험 준비 이야기도 짧게 했다. 시계를 보고 같이 일어났다.')
],'W07_MAKEUP_CONTACT',{exitEffects:[appointment(7,'minseo','completed',{id:'focus-w07-makeup',day:'fri',time:'12:20~12:35',label:'연구 점검 뒤 대화 완료'}),experience('focus-w07-minseo'),relation('minseo',1,2)]});
contactOffer('W07_MAKEUP',7,'minseo','bg.club_day','W07_FRI','fri');
N('W07_FRI','7주 금요일 · 시험 전의 모임',7,'fri','bg.club_day',[],[L('모임은 평소보다 일찍 끝났다. 다음 주에는 정기 모임을 쉬고 각자 시험이나 연구 일정부터 마치기로 했다.'),L('남아 공부할 수 있는 동아리방 시간과 다음 수업이 없는 강의실을 확인했다. 어디서 누구를 만날지는 약속하지 않았다.')],'SUN07');
N('SUN07','7주 일요일 밤 · 이번 주는 공부할 방법부터',7,'sun','bg.home_night',[],[L('이번에는 누군가와 약속부터 잡는 대신, 내 시험 범위를 펼쳤다. 읽을 때와 문제를 풀 때 필요한 자리가 다를 것 같았다.'),L('내일 아침에는 오늘 필요한 공부를 생각하고 장소를 골라 보기로 했다.')],'W08_MON');

N('W08_MON','8주 월요일 · 어디에서 공부할까',8,'mon','bg.campus_day',[],[
 L('중간고사 범위를 가방에 넣고 나왔다. 오늘 함께 공부하기로 미리 약속한 사람은 없었다.'),L('읽을 내용을 차분히 정리할지, 문제를 풀지, 소리 내어 설명해 볼지. 필요한 공부부터 생각했다.')
],null,{choicePrompt:'오늘은 어디에서 시험공부를 할까?',choices:studyData[8].map(d=>C(d.id,d.label,'W08_ARRIVE_'+d.id,[flag('studyPlaceW8',d.id),flag('studyPartnerW8',d.c)]))});

const quietStudy={
 seoyeon:{study:'우리는 각자 한 절을 읽고 모르는 문장에만 표시했다. 쉬는 시간에 로비로 나와 표시한 문장 하나씩을 이야기했다.',talk:'말 안 하고 옆에 있어도 같이 하는 느낌은 있네요. 쉬는 시간에 물어볼 사람도 있고요.'},
 jiwoo:{study:'지우는 타이머를 켰다. 서로 문제를 방해하지 않고 풀다가 쉬는 시간이 되자 어려웠던 한 문제씩만 설명했다.',talk:'아까는 네 연필 소리 듣고 나도 다시 시작했어. 나 혼자였으면 쉬는 시간이 더 길었겠다.'},
 haerin:{study:'서로의 노트를 먼저 펼쳐 보지는 않았다. 각자 외운 내용을 써 보고 쉬는 시간에 기억이 안 난 부분만 이야기했다.',talk:'계속 질문받는 것보다 이렇게 잠깐씩 말하는 게 오늘은 좋네. 나도 내 속도로 해 볼 수 있고.'},
 minseo:{study:'나는 시험 범위를 읽고 민서는 자기 연구 자료를 읽었다. 한 시간이 지나서야 책갈피를 끼우고 쉬는 시간에 질문 하나를 나눴다.',talk:'조용히 같이 있는 시간도 괜찮네요. 꼭 같은 자료를 봐야 같이 공부하는 건 아닌가 봐요.'}
};
const followups={
 seoyeon:{explain:'아까 설명하려다 막힌 문장 다시 읽어 봤어요. 혼자서는 그냥 지나쳤을 것 같아요. 같이 정리해 줘서 고마워요.',quiet:'아까 표시한 문장 한 개는 다시 읽으니까 이해됐어요. 조용히 같이 읽다가 쉬는 시간에 이야기한 게 좋았어요.',close:' 다음에도 선배 설명을 한번 듣고 싶어요.',specific:'아까 그 문장은 나도 메모 옆에 질문으로 남겨 뒀어. 시험 끝나고 서로 어떻게 이해했는지 이야기하자.',specificAck:'좋아요. 답부터 맞추지 말고 어떻게 읽었는지요. 우선 내일 시험 잘 봐요.',warm:'오늘 같이 공부해서 좋았어. 남은 시험도 잘 보자.',warmAck:'저도요. 오늘은 정리한 데까지만 보고 쉬려고요.',morning:'어제 같이 읽은 부분, 오늘 아침에 다시 보니까 조금 덜 막혔어. 답이 늦었네. 오늘 시험 잘 봐.',morningAck:'지금 봤어요. 저도 가방 챙기는 중이에요. 시험 끝나고 학교에서 봐요.'},
 jiwoo:{explain:'아까 내가 답만 보고 문제 탓하던 거 웃겼지. 설명하다 막힌 데 표시해 뒀어. 그 문제는 이제 안 잊을 듯.',quiet:'타이머 끝날 때마다 쉬니까 오늘은 진짜 분량 채웠다. 옆에서 같이 푸는 사람 있으니까 덜 도망가게 되네.',close:' 다음에도 편집 핑계 말고 공부하자고 해 봐야겠다.',specific:'아까 헷갈린 문제는 나도 표시해 뒀어. 내일 답만 외우지 말고 이유까지 떠올려 보려고.',specificAck:'나도. 시험지 앞에서 네가 왜냐고 묻는 얼굴 떠오를 것 같네. 오늘은 좀 자.',warm:'오늘 옆에서 같이 해서 덜 미뤘다. 남은 시험도 잘 보자.',warmAck:'좋아. 끝나기 전에 벌써 끝난 기분 내지만 말자. 나부터 책 다시 펴야겠네.',morning:'어제 표시한 문제 아침에 한 번 더 봤어. 답 늦었네. 오늘 시험 잘 봐.',morningAck:'나도 이제 출발. 시험 끝나면 카메라보다 밥부터 챙겨야겠다.'},
 haerin:{explain:'아까 네가 든 이상한 예시가 계속 생각나. 덕분에 그 개념은 안 잊겠네. 나머지도 그랬으면 좋겠다.',quiet:'혼자 외운 거 한번 써 보니까 빈칸 많더라. 그래도 아까 쉬는 시간에 이야기한 데는 좀 채워졌어.',close:' 네 앞에서는 모른다고 말하기가 좀 편해졌나 봐.',specific:'아까 비었던 부분만 다시 봤어. 내일은 예시 말고 개념 이름도 같이 떠올려 보자.',specificAck:'이름까지 써야 점수 받지. 알겠어. 오늘은 여기까지만 하고 자자.',warm:'오늘 같이 공부해서 좋았어. 작업도 공부도 남은 만큼만 하자.',warmAck:'응. 이제 침대에서 노트 보다가 잠드는 건 그만해야겠다. 너도 좀 쉬어.',morning:'어제 정리한 부분 다시 봤어. 답 늦었네. 오늘 너무 몰아붙이지 말고 시험 잘 봐.',morningAck:'나도 이제 나가. 끝나고 버스 놓치면 또 네 탓할 뻔했네. 농담. 잘 봐.'},
 minseo:{explain:'아까 설명하다 남긴 질문은 내일 다시 볼 때도 도움이 될 거예요. 저는 표시한 논문 두 쪽 더 읽고 정리했어요. 시험 잘 봐요.',quiet:'오늘 조용히 각자 읽고 쉬는 시간에 이야기한 게 좋았어요. 저는 연구실 돌아와서 표시한 두 쪽만 더 읽었어요. 시험 준비 잘 마쳐요.',close:' 다음에는 시험 얘기 말고도 조금 더 듣고 싶네요.',specific:'아까 남긴 질문은 노트 맨 위에 적어 뒀어요. 답을 아는 척하고 넘기지 않으려고요. 선배도 연구 잘 마치세요.',specificAck:'좋네요. 저도 제 질문부터 다시 볼게요. 오늘 할 만큼 했으면 쉬어요.',warm:'오늘 같이 집중할 수 있어서 좋았어요. 선배도 연구 일정 잘 마치세요.',warmAck:'고마워요. 저는 내일도 연구실이지만, 시험 끝나고 한숨 돌릴 시간은 꼭 챙겨요.',morning:'어제 표시한 질문 아침에 다시 봤어요. 답이 늦었네요. 같이 집중해 줘서 고마웠어요.',morningAck:'괜찮아요. 저도 아침에 봤어요. 저는 연구실 가는 길이에요. 시험 잘 보고 와요.'}
};

for(const d of studyData[8]){
 const c=d.c,prefix='W08_'+d.id,record='midterm-study-'+c;
 N('W08_ARRIVE_'+d.id,'8주 월요일 · 뜻밖의 옆자리',8,'mon',d.background,[c],[
  L(d.intro),L(d.why,c),L('전에 따로 이야기한 뒤여서, 먼저 인사하는 일이 조금 자연스러워졌다.','narrator',{when:{any:[5,6,7].map(w=>({experience:`focus-w0${w}-${c}`}))}})
 ],null,{choicePrompt:'같이 공부한다면 어떻게 해 볼까?',effects:d.id==='cafe'?[{type:'money',amount:-4500}]:[],choices:[
  C('explain','각자 읽고 쉬는 시간에 번갈아 설명해 본다.',prefix+'_EXPLAIN',[flag('studyStyleW8','explain')]),
  C('quiet','옆에서 각자 집중하고 쉬는 시간에 이야기한다.',prefix+'_QUIET',[flag('studyStyleW8','quiet')])
 ]});
 for(const style of ['explain','quiet']){
  const text=style==='quiet'?quietStudy[c]:{study:d.study,talk:d.talk};
  N(prefix+'_'+style.toUpperCase(),'8주 월요일 · 함께 채운 분량',8,'mon',d.background,[c],[L('오늘 끝낼 분량부터 짧게 말했다. 나는 가방에서 책을 꺼내 옆자리에 놓았다.'),L(text.study,'narrator',{stageCast:[]}),L(text.talk,c)],d.id==='cafe'?prefix+'_SERVICE':prefix+'_CONTACT',{exitEffects:[experience(record),experience('midterm-'+style),relation(c,1,1)]});
 }
 if(d.id==='cafe')N(prefix+'_SERVICE','8주 월요일 · 공부하는 자리와 일하는 자리',8,'mon',d.background,[c,'yuna'],[
  L('유나가 빈 컵을 치우러 잠깐 다가왔다. 테이블에는 각자 표시한 자료가 남아 있었다.','narrator',{stageCast:['yuna']}),L('오늘 끝낼 분량 정했지? 나는 주문 받으러 갈게. 필요한 거 있으면 불러.','yuna'),L('유나가 카운터로 돌아갔다. 나는 민서와 남은 자료를 정리했다.','narrator',{cast:[c],stageCast:[c]})
 ],prefix+'_CONTACT');
 contactOffer(prefix,8,c,d.background,prefix+'_LEAVE','mon');
 N(prefix+'_LEAVE','8주 월요일 · 각자 다음 일정으로',8,'mon',d.background,[c],[L(d.close,'narrator',{stageCast:[]})],prefix+'_NIGHT');
 const received=all(contact(c),{experience:record}),close=all({affection:c,min:6},{trust:c,min:4});
 const effects=[];
 for(const style of ['explain','quiet'])for(const intimate of [false,true])effects.push(message('midterm-followup-'+c,c,followups[c][style]+(intimate?followups[c].close:''),'in',all(received,has('studyStyleW8',style),intimate?close:not(close))));
 N(prefix+'_NIGHT','8주 월요일 밤 · 공부 뒤에 남은 말',8,'mon','bg.home_night',[],[
  L('가방에서 노트를 꺼내는데 오늘 같이 공부한 사람에게 메시지가 왔다. 공부한 자리에서 끝난 줄 알았던 이야기가 조금 더 이어졌다.','narrator',{when:received}),
  L('오늘 만난 사람과 개인 번호는 나누지 않았다. 집에 돌아와 갑자기 연락이 오는 일은 없었다. 다음에 직접 말하고 싶은 내용을 노트 한쪽에 적었다.','narrator',{when:not(contact(c))})
 ],'W08_EXAMS',{effects,choicePrompt:'어떻게 답하고 싶을까?',choices:[
  C('specific','같이 공부하면서 남긴 질문을 떠올려 답한다.',prefix+'_REPLY_SPECIFIC',[message('midterm-reply-'+c,c,followups[c].specific,'out'),relation(c,0,1)],received),
  C('warm','함께해서 좋았다고 말하고 서로의 일정을 응원한다.',prefix+'_REPLY_WARM',[message('midterm-reply-'+c,c,followups[c].warm,'out'),relation(c,1)],received),
  C('morning','오늘은 쉬고 내일 아침에 답한다.',prefix+'_MORNING',[],received)
 ]});
 for(const kind of ['specific','warm'])N(prefix+'_REPLY_'+kind.toUpperCase(),'8주 월요일 밤 · 짧은 답장',8,'mon','bg.home_night',[],[L('나는 오늘 실제로 같이 한 일을 떠올리며 답했다. 답장이 짧게 한 번 돌아왔다. 더 길게 이어 가지 않고 책상 위 노트를 덮었다.')],'W08_EXAMS',{effects:[message('midterm-ack-'+c,c,followups[c][kind+'Ack'])]});
 N(prefix+'_MORNING','8주 화요일 아침 · 늦어도 이어지는 말',8,'tue','bg.home_day',[],[L('아침에 일어나 준비를 마친 뒤 답장을 보냈다. 늦게 답했다고 이야기가 사라지는 것은 아니었다. 나는 가방 속 필기구를 한 번 더 확인했다.')],'W08_EXAMS',{effects:[message('midterm-reply-'+c,c,followups[c].morning,'out'),message('midterm-ack-'+c,c,followups[c].morningAck)]});
}

N('W08_EXAMS','8주 화요일부터 · 시험지를 앞에 두고',8,'tue','bg.lecture_day',[],[
 L('시험지 앞에서 막히는 문제도 있었다. 아는 문장을 길게 쓰기보다, 설명할 수 있는 근거부터 적었다.'),L('며칠 동안 남은 시험과 수업을 하나씩 마쳤다. 같이 공부한 날이 모든 문제를 풀어 주지는 않았지만, 어디가 어려운지 말해 본 기억은 남았다.')
],'W08_FRI',{exitEffects:[experience('midterm-completed')]});
N('W08_FRI','8주 금요일 · 끝났다는 말 다음',8,'fri','bg.campus_day',[],[L('마지막 시험을 마치고 건물을 나왔다. 성적은 아직 나오지 않았다. 오늘은 끝난 시험과 아직 모르는 결과를 구분해 두기로 했다.'),L('바로 약속부터 만들지는 않았다. 밀린 빨래와 잠, 다음 수업 준비도 내 생활이었다.')],'CHAPTER_TWO_END');
N('CHAPTER_TWO_END','8주 일요일 · 다음 장으로 남기는 질문',8,'sun','bg.home_night',[],[
 L('복학한 지 두 달이 지났다. 함께 어딘가에 간 사람도 있고, 잠깐 앉아 자기 일을 하다 이야기한 사람도 있었다.'),L('같이 보낸 시간과 나눈 연락은 선택한 만큼 남았다. 연락처를 나누지 않은 사람에게는 다음에 직접 할 말이 남아 있었다.'),L('나는 다음 주 시간표를 펼쳤다. 학기는 아직 남아 있었고, 이번에는 그 빈칸이 전부 막막하지만은 않았다.')
],null,{terminal:true});

export const chapterTwoNodes=nodes;
