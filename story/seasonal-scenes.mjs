// Authored encounters shared by the chapter and the independent event previews.
export const FESTIVAL_CAST=['seoyeon','jiwoo','haerin','yuna','minseo'];
export const FESTIVAL_OUTFITS={seoyeon:'lilac',jiwoo:'field',haerin:'stripe',yuna:'outing',minseo:'date'};
export const line=(text,speaker='narrator',extra={})=>({speaker,text,...(FESTIVAL_CAST.includes(speaker)||speaker==='doa'?{shot:'medium',to:'player'}:{}),...extra});
const say=(c,text)=>line(text,c);
export const named=(name,consonant,vowel)=>name+((name.codePointAt(name.length-1)-0xAC00)%28?consonant:vowel);
export const cherryRoutes={
 seoyeon:{name:'서연',invite:'서연에게 토요일 꽃길을 같이 걸을지 물어본다.',accept:'좋아요. 사람 많은 길에서는 조금 천천히 걸어도 될까요?',greeting:'어제는 바람이 세서 다 떨어질 줄 알았어요. 아직 남아 있네요.',
  activities:[
   {id:'photo',label:'꽃 아래에서 서로 사진을 찍어 준다.',lines:[say('seoyeon','어디를 봐야 자연스러워요? 카메라를 보면 너무 사진 찍는 얼굴이 돼서요.'),line('서연이 웃음을 참다가 결국 웃었다. 나는 그때 찍은 사진부터 보여 줬다.'),say('seoyeon','이건 지우지 말아 주세요. 제가 웃은 이유를 알 것 같아서요.')]},
   {id:'snack',label:'간식을 사서 벤치에서 이야기한다.',lines:[line('종이봉투를 가운데 놓자 서연이 빈 모서리를 접어 접시처럼 만들었다.'),say('seoyeon','밖에서 먹으면 꼭 한 손이 부족해요. 아, 이쪽 잡아 주실래요?'),line('대단한 이야기는 하지 않았다. 봉투를 같이 잡고 있는 동안 다음 말이 쉽게 나왔다.')]},
   {id:'quiet',label:'사람이 적은 옆길로 천천히 걷는다.',lines:[say('seoyeon','큰길에서는 무슨 말을 해도 끝을 못 들을 것 같았어요.'),line('걸음을 늦추자 꽃보다 먼저 서연의 목소리가 들렸다.'),say('seoyeon','오늘 본 걸 글로 쓰면, 저는 이 골목부터 쓸 것 같아요.')]}
  ],cameo:'jiwoo',encounter:[line('갈림길에서 카메라를 든 지우와 마주쳤다. 동아리 영상에 넣을 꽃길 풍경을 찍고 있었다.'),say('jiwoo','어, 둘이 왔네. 나는 저쪽 빛 있을 때 한 장만 더 찍고 갈게.'),line('지우가 서연에게도 손을 흔들었다. 촬영을 따라가지는 않고, 우리는 걷던 방향으로 돌아섰다.')],closing:'같이 걸어 주셔서 고마워요. 아까 하던 이야기, 다음에도 이어서 해요.'},
 jiwoo:{name:'지우',invite:'지우에게 토요일 축제를 둘이 구경하자고 한다.',accept:'좋지. 이번에는 기록만 하지 말고 나도 구경 좀 해야겠어.',greeting:'오늘은 배터리 하나만 가져왔어. 다 쓰면 카메라 넣고 놀 거야.',
  activities:[
   {id:'photo',label:'서로 찍고 싶은 풍경을 한 장씩 고른다.',lines:[say('jiwoo','잘 찍는 거 말고, 네가 왜 그걸 골랐는지 듣고 싶어.'),line('나는 바닥에 고인 꽃잎을 골랐다. 지우는 내 사진을 확대해 보더니 카메라를 내렸다.'),say('jiwoo','나는 맨날 위만 봤네. 오늘은 네가 앞에서 걸어 봐.')]},
   {id:'snack',label:'카메라를 넣고 간식부터 고른다.',lines:[say('jiwoo','사진부터 찍자는 말 안 하네? 좋아. 그럼 오늘 첫 기록은 영수증.'),line('지우가 카메라를 가방에 넣고 두 손으로 따뜻한 간식을 받았다.'),say('jiwoo','같이 먹으면 식기 전에 먹으라고 재촉해 주는 사람이 있어서 좋네.')]},
   {id:'quiet',label:'촬영을 잠깐 쉬고 옆길을 걷는다.',lines:[say('jiwoo','가방 열면 한 번만 말려 줘. 손이 자꾸 카메라로 가서.'),line('지우가 가방 지퍼를 만지다 말고 웃었다. 우리는 사진으로 남기지 않을 이야기를 했다.'),say('jiwoo','안 찍으면 다 놓치는 줄 알았는데, 듣고 있는 것도 남기는 거네.')]}
  ],cameo:'haerin',encounter:[line('분수 앞에서 색연필 통을 들고 있던 해린과 마주쳤다. 과제에 쓸 봄빛을 스케치하러 왔다고 했다.'),say('haerin','둘이 구경 중이야? 난 그늘 더 옮겨 가기 전에 이것만 마저 할게.'),line('해린은 다시 스케치북을 폈다. 지우도 카메라를 꺼내지 않고 내 옆으로 돌아왔다.')],closing:'오늘 못 찍은 게 좀 있는데, 아쉽기만 한 건 아니네.'},
 haerin:{name:'해린',invite:'해린에게 토요일 꽃구경을 같이 가자고 한다.',accept:'좋아. 이번에는 작업 없는 시간으로 비워 둘게. 꽃 다 지기 전에 보자.',greeting:'오늘은 출력소 전화 안 올 거야. 파일까지 다 확인하고 왔거든.',
  activities:[
   {id:'photo',label:'마음에 드는 꽃빛을 함께 찾아본다.',lines:[say('haerin','예쁘다는 말 말고. 네 눈에는 무슨 색 같아?'),line('나는 분홍빛 사이의 거의 흰 꽃을 가리켰다. 해린은 가지 아래로 몸을 옮겨 같은 꽃을 봤다.'),say('haerin','같은 데를 보고 있어도 고르는 건 다르네. 그게 재밌어.')]},
   {id:'snack',label:'줄이 짧은 간식 가게에 함께 선다.',lines:[say('haerin','메뉴부터 정하자. 줄 끝에 가서 또 고민하면 뒤에서 원망해.'),line('서로 고른 것을 한 입씩 바꿔 먹었다. 해린은 내 쪽 간식을 한 번 더 봤다.'),say('haerin','다음에는 그걸로 사야겠다. 오늘은 네 선택이 더 낫네.')]},
   {id:'quiet',label:'해린이 아는 조용한 골목으로 걷는다.',lines:[say('haerin','여긴 예전에도 있었는데, 너랑 와 본 건 처음이네.'),line('해린이 앞서가다 걸음을 맞췄다. 예전 이야기로 시작해서 요즘 잠을 못 잔다는 이야기로 옮겨 갔다.'),say('haerin','오래 알았다고 다 아는 건 아니니까. 물어보면 대답은 해 줄게.')]}
  ],cameo:'yuna',encounter:[line('간식 가게를 지나는데 유나가 손을 흔들었다. 휴무에 친구와 구경하다가 친구가 있는 줄로 돌아가던 길이었다.'),say('yuna','너희도 왔구나. 저쪽 줄 빨리 줄더라. 나는 친구 기다려서 먼저 갈게.'),line('짧게 인사하고 서로 다른 줄로 향했다. 해린이 아까 고르던 메뉴를 다시 물었다.')],closing:'오늘은 기다리게 안 해서 다행이다. 다음 약속도 이렇게 지키고 싶네.'},
 yuna:{name:'유나',invite:'유나에게 쉬는 토요일에 축제를 같이 볼지 묻는다.',accept:'토요일은 쉬어. 낮에 같이 걷자. 일 얘기 말고 다른 얘기도 좀 하고.',greeting:'앞치마 안 두르니까 손 둘 데가 좀 어색하네. 오늘은 손님처럼 다녀야지.',
  activities:[
   {id:'photo',label:'꽃 아래에서 유나의 사진을 찍어 준다.',lines:[say('yuna','매장 사진 말고 내 사진을 부탁하는 건 오랜만이네.'),line('유나가 사진을 확인하더니 햇빛 때문에 찡그린 얼굴을 보고 웃었다.'),say('yuna','다시 찍자. 이번에는 네 것도 한 장 남기고.')]},
   {id:'snack',label:'유나와 먹어 보고 싶은 간식을 고른다.',lines:[say('yuna','남이 만들어 주는 거 받으니까 좋다. 먹고 설거지할 생각도 안 해도 되고.'),line('유나는 간식을 한 입 먹은 뒤 맛을 설명하려다 멈췄다.'),say('yuna','오늘은 분석 안 할래. 그냥 맛있다고만 해도 되잖아.')]},
   {id:'quiet',label:'사람이 적은 길에서 쉬엄쉬엄 걷는다.',lines:[say('yuna','쉬는 날도 뭘 해야 잘 쉰 것 같아서 자꾸 계획을 채워.'),line('우리는 빈 벤치에서 잠깐 쉬었다. 유나는 휴대폰을 확인하지 않고 가방에 넣었다.'),say('yuna','그냥 앉아 있어도 되네. 같이 있는 사람이 괜찮으면.')]}
  ],cameo:'minseo',encounter:[line('꽃길 출구에서 자료 봉투를 든 민서와 마주쳤다. 연구실로 가기 전 잠깐 돌아서 걷는 길이었다.'),say('minseo','오늘은 두 분 다 쉬는 날이군요. 저는 잠깐 보고 들어가려고요. 천천히 즐기세요.'),line('민서는 연구동 방향으로 걸었다. 유나는 아직 남은 꽃길을 가리키며 어느 쪽으로 돌아갈지 물었다.')],closing:'오늘 같이 오길 잘했네. 내일 매장에서도 이 얘기 한 번은 하겠다.'},
 minseo:{name:'민서',invite:'민서에게 연구 일정 전에 꽃길을 함께 걸을지 묻는다.',accept:'토요일 두 시 반까지는 괜찮아요. 그 뒤에는 연구실에 가야 하는데, 그 시간까지 같이 걸을까요?',greeting:'시간은 미리 말했지만, 걷는 동안까지 시계만 보고 싶지는 않네요.',
  activities:[
   {id:'photo',label:'민서가 마음에 든 풍경을 같이 찍는다.',lines:[say('minseo','사진에 사람이 없어야 조용해 보이는 건 아니네요.'),line('민서는 벤치에 앉은 사람들이 작게 들어간 풍경을 골랐다. 나는 왜 그 장면인지 물었다.'),say('minseo','각자 다른 이유로 잠깐 멈춘 것 같아서요. 저도 오늘은 그런 쪽이고요.')]},
   {id:'snack',label:'가까운 벤치에서 간식을 나눠 먹는다.',lines:[say('minseo','걸으면서 먹으면 무슨 맛인지 모르고 다 먹을 때가 있어요. 잠깐 앉을까요?'),line('봉투를 접어 무릎에 놓고 천천히 먹었다. 민서는 연구 얘기 대신 최근 읽은 소설을 꺼냈다.'),say('minseo','이런 얘기는 질문받기 전에는 잘 안 하게 되네요.')]},
   {id:'quiet',label:'연구동으로 이어지는 조용한 길을 걷는다.',lines:[say('minseo','이 길은 매일 다니는데, 오늘은 조금 느리네요.'),line('민서는 평소라면 그냥 지났을 나무 앞에 멈췄다. 나는 서둘러 다음 장소를 권하지 않았다.'),say('minseo','같은 길도 누구랑 걷는지에 따라 다르다는 말, 조금 알겠어요.')]}
  ],cameo:'seoyeon',encounter:[line('작은 안내판 앞에서 서연과 마주쳤다. 수업 친구와 만나기로 한 곳을 확인하고 있었다.'),say('seoyeon','두 분도 오셨네요. 저는 친구가 곧 온대서 여기서 기다리려고요. 즐겁게 보고 가세요.'),line('우리는 인사를 하고 길을 비켜 주었다. 민서의 연구실 약속 전까지 남은 길을 천천히 걸었다.')],closing:'이제 연구실로 가야겠어요. 시간을 맞춰 줘서 고마워요. 다음에는 조금 더 여유 있을 때 봐요.'}
};

export function festivalPreview(){
 return {id:'EVENT_CHERRY_W04',label:'4주 · 벚꽃축제 · 한 명과 함께',week:4,day:'W04-Sat',season:'spring',location:'cherry',background:'bg.cherry_day',cast:FESTIVAL_CAST,outfits:{seoyeon:'spring',jiwoo:'spring',haerin:'spring',yuna:'outing',minseo:'spring'},
 assumption:'동행자는 한 명이야. 다른 사람은 자기 일정 중에 잠깐 마주치고, 인사 뒤에는 원래 동행자와의 시간으로 돌아와.',choicePrompt:'오늘 축제는 누구와 함께 걸을까?',
 body:[line('토요일 꽃길 입구. 어제 같이 오기로 한 사람을 기다리며 약속 장소를 다시 확인했다.','narrator',{cast:[],stageCast:[]})],
 choices:FESTIVAL_CAST.map(c=>({id:c,label:named(cherryRoutes[c].name,'과','와')+' 함께 구경한다.',character:c,response:[
  line(named(cherryRoutes[c].name,'이','가')+' 약속한 입구로 왔다. 오늘은 둘이 축제를 구경하기로 했다.','narrator',{cast:[c],stageCast:[c]}),say(c,cherryRoutes[c].greeting),
  ...cherryRoutes[c].activities[0].lines,
  ...cherryRoutes[c].encounter.map(l=>({...l,cast:[c,cherryRoutes[c].cameo],stageCast:l.speaker==='narrator'?[]:[l.speaker]})),
  line('인사를 마치고 다시 둘이 꽃길을 걸었다. 아까 끊겼던 이야기를 이어 갔다.','narrator',{cast:[c],stageCast:[c]}),say(c,cherryRoutes[c].closing)
 ]}))};
}

export const studyData={
 8:[
  {id:'library',label:'도서관 창가 자리에서 읽는다.',background:'bg.library_day',location:'library',c:'seoyeon',intro:'도서관 창가에 빈자리가 보여 다가갔다. 책 옆에 작은 쪽지를 늘어놓은 서연이 고개를 들었다.',why:'저도 이 장 정리하다가 막혔어요. 옆에 앉으실래요?',study:'우리는 각자 한 절씩 읽고, 로비로 나가 헷갈린 개념을 번갈아 설명했다. 서연은 답을 알려 주기보다 내가 설명을 끝낼 때까지 기다렸다.',talk:'설명하려니까 제가 모르는 데가 보이네요. 혼자 읽을 때는 다 아는 것 같았는데.',close:'마지막에 서로 설명하지 못한 항목만 표시했다. 서연은 먼저 다음 수업으로 갔고, 나는 표시한 한 장을 마저 읽었다.'},
  {id:'classroom',label:'빈 강의실에서 문제를 풀어 본다.',background:'bg.lecture_day',location:'lecture',c:'jiwoo',intro:'수업이 비어 있는 강의실에 갔다. 뒷자리의 지우는 카메라 대신 시험 범위를 펼쳐 놓고 있었다.',why:'나도 시험은 보거든. 마침 이 문제, 설명할 사람이 필요했어. 같이 할래?',study:'지우는 타이머를 켰다. 나는 내 문제를 풀고 지우는 자기 수업의 문제를 풀었다. 쉬는 시간에는 왜 그 답을 골랐는지 서로 물었다.',talk:'틀린 걸 말로 꺼내니까 덜 억울하다. 그냥 답만 보면 문제 탓부터 하게 돼.',close:'다음 수업 학생들이 들어오기 전에 책상을 원래대로 돌려놓았다. 오늘 푼 분량을 접어 각자 가방에 넣었다.'},
  {id:'club',label:'동아리방에서 노트를 정리한다.',background:'bg.club_day',location:'club',c:'haerin',intro:'조용할 것 같아 동아리방 문을 열었다. 해린이 작업 도구를 한쪽으로 밀고 교양 수업 노트를 펴고 있었다.',why:'왜, 나 여기 있으면 공부 안 할 것 같아? 오늘은 진짜야. 너도 할 거면 앉아.',study:'각자 외울 것을 적고 십 분 뒤 책을 덮었다. 나는 해린의 노트에서 질문하고, 해린은 내가 외운 개념을 예로 들어 보라고 했다.',talk:'네가 설명하는 예시가 좀 웃겨서 기억은 잘 나겠다. 시험에서도 그 얘기 생각날 것 같아.',close:'정한 분량을 마친 뒤에야 해린이 작업 도구를 다시 꺼냈다. 나는 시험 전날 다시 볼 요약 한 장을 챙겼다.'},
  {id:'cafe',label:'온유의 안쪽 테이블에서 정리한다.',background:'bg.cafe_day',location:'cafe',c:'minseo',intro:'온유에서 차를 주문하고 안쪽으로 갔다. 민서가 연구 자료를 읽던 테이블 옆에 자리가 남아 있었다.',why:'저는 시험 대신 읽을 논문이 밀렸어요. 조용히 같이 해도 괜찮으면 앉아요.',study:'나는 시험 범위를 읽고 민서는 자기 자료에 메모했다. 한 시간을 채운 뒤 서로 막힌 부분을 짧게 설명했다. 과목은 달라도 집중하는 시간은 나눌 수 있었다.',talk:'다 이해했다고 쓰는 것보다, 어디서 막혔는지 한 줄 남기는 게 내일 더 도움이 돼요.',close:'민서는 연구실로 돌아갔다. 나는 오늘 이해하지 못한 질문 하나를 노트 맨 위에 적었다.'}
 ],
 16:[
  {id:'library',label:'도서관의 조용한 자리로 간다.',background:'bg.library_day',location:'library',c:'minseo',intro:'기말고사 범위를 들고 도서관으로 갔다. 자료 서가에서 돌아온 민서가 옆자리의 가방을 치웠다.',why:'여기 비었어요. 저는 발표 자료 읽는 중인데, 같이 집중할까요?',study:'나는 시험 정리를 하고 민서는 발표의 근거를 확인했다. 쉬는 시간에 로비에서 내가 헷갈리는 주장 하나를 말하자, 민서는 근거가 어느 문장인지 먼저 물었다.',talk:'정답처럼 들리는 문장과 근거가 있는 문장은 조금 다르죠. 저도 발표 앞두면 자꾸 확인해요.',close:'민서는 세미나 시간에 맞춰 자리를 정리했다. 나는 근거를 못 찾은 문장에 별표를 치고 다시 읽었다.'},
  {id:'classroom',label:'빈 강의실에서 발표하듯 복습한다.',background:'bg.lecture_day',location:'lecture',c:'seoyeon',intro:'소리 내서 복습할 수 있을까 싶어 빈 강의실에 갔다. 서연이 칠판 앞에서 작은 목소리로 문장을 반복하다 멈췄다.',why:'아, 저만 있는 줄 알았어요. 서로 들어 줄까요? 읽기만 하면 자꾸 지나쳐서요.',study:'우리는 번갈아 앞에 서서 정리한 내용을 설명했다. 듣는 쪽은 이해가 안 된 곳에만 질문했다. 서연의 설명은 두 번째에 조금 짧고 분명해졌다.',talk:'중간고사 때보다 어디가 어려운지 말하기는 쉬워졌어요. 아직 잘하는 건 아니지만요.',close:'칠판을 닦고 남은 시험 날짜를 확인했다. 서로의 시험이 끝나는 날이 달라 다음 약속은 나중에 묻기로 했다.'},
  {id:'club',label:'동아리방 책상에서 남은 문제를 푼다.',background:'bg.club_day',location:'club',c:'jiwoo',intro:'동아리방 문틈으로 불빛이 보였다. 지우가 편집하던 노트북을 닫고 시험 문제집을 꺼내던 참이었다.',why:'영상은 시험 끝나고. 지금은 이것부터 끝내야 집에 갈 수 있어. 너도 남았어?',study:'우리는 남은 문제 수를 적고 삼십 분만 각자 풀었다. 쉬는 시간에 지우가 틀린 문제를 설명하다가 자기 말의 빈틈을 먼저 찾았다.',talk:'아, 이걸 거꾸로 기억했네. 누가 듣고 있으니까 끝까지 말하게 된다.',close:'지우는 오늘 목표 수를 지우고 노트북은 다시 켜지 않았다. 우리는 동아리방 불을 끄고 나왔다.'},
  {id:'cafe',label:'온유에서 차를 마시며 요약한다.',background:'bg.cafe_day',location:'cafe',c:'haerin',intro:'온유 안쪽에 앉으려는데 해린의 손이 먼저 올라갔다. 작업 파일이 아니라 기말고사 요약 노트가 펼쳐져 있었다.',why:'마감 하나 끝나면 시험 하나가 남네. 너도 공부하러 왔으면 여기 앉아.',study:'우리는 각자 요약한 한 장을 읽고, 책을 덮은 채 기억나는 것만 써 봤다. 주문이 한산해지자 유나가 빈 컵을 치우러 잠깐 왔다.',talk:'노트는 얇아졌는데 머릿속에 들어왔는지는 또 다른 문제네. 마지막으로 한 번만 서로 물어보자.',close:'유나는 다음 주문을 받으러 돌아갔다. 우리는 틀린 부분만 한 번 더 확인하고 각자 시험 보러 갈 시간을 맞췄다.'}
 ]
};

export function studyPreview(week){
 const finals=week===16,data=studyData[week],cast=[...new Set(data.map(d=>d.c).concat('yuna'))];
 return {id:finals?'EVENT_FINALS_W16':'EVENT_MIDTERM_W08',label:`${week}주 · ${finals?'기말':'중간'}고사 · 공부할 장소`,week,day:`W${week}-Mon`,season:finals?'earlySummer':'spring',location:'campus',background:'bg.campus_day',cast,
 outfits:Object.fromEntries(cast.map(c=>[c,c==='yuna'?'work_alt':'spring'])),onDuty:{yuna:true},
 assumption:'공부 장소를 고른 뒤 그곳에서 우연히 만나는 이야기야. 대학원생 민서는 자기 연구 자료를 읽고, 유나는 카페 근무를 계속해.',choicePrompt:'오늘은 어디에서 시험공부를 할까?',
 body:[line(`${finals?'기말':'중간'}고사 범위를 펼쳤다. 방에서는 자꾸 딴짓하게 돼서, 가방에 노트를 넣고 학교로 나왔다. 누구와 약속한 건 없었다.`,'narrator',{cast:[],stageCast:[]}),line('조용히 읽을지, 문제를 풀지, 소리 내서 정리할지. 오늘 필요한 공부부터 생각했다.','narrator',{cast:[],stageCast:[]})],
 choices:data.map(d=>({id:d.id,label:d.label,response:[
  line(d.intro,'narrator',{cast:[d.c],stageCast:[d.c],background:d.background,location:d.location}),say(d.c,d.why),
  line('같이 해도 괜찮으면, 나도 여기서 할게.','player'),
  line(d.study,'narrator',{stageCast:[]}),say(d.c,d.talk),
  ...(d.location==='cafe'?[
   line('유나가 주문을 확인하러 잠깐 다가왔다. 테이블에는 각자 펼친 자료가 남아 있었다.','narrator',{cast:[d.c,'yuna'],stageCast:['yuna']}),
   say('yuna','다들 오늘 끝낼 건 정했어? 나는 주문 받으러 갈게. 필요한 거 있으면 불러.'),
   line('유나는 카운터로 돌아갔다. 우리는 공부하던 자리로 시선을 돌렸다.','narrator',{cast:[d.c],stageCast:[d.c]})
  ]:[]),
  line(d.close,'narrator',{cast:[],stageCast:[]})
 ]}))};
}

export const doaReunion=[
 line('접수대에서 내 학생증을 받아 든 사람이 고개를 들었다. 이름표의 ‘백도아’보다, 나를 부르는 목소리를 먼저 알아봤다.','narrator',{cast:['doa'],stageCast:['doa']}),
 line('오랜만이네. 복학했구나? 오늘 강연 들으러 왔어?','doa'),
 line('도아 선배였다. 입대 전, 다른 과 건물에서 길을 잃은 나를 반대편 계단까지 데려다주었던 사람.','narrator',{cast:['doa'],stageCast:['doa']}),
 line('그 뒤로 괜히 그 계단을 한 번 더 지나곤 했다. 좋아한다고도, 개인적으로 연락해도 되느냐고도 끝내 묻지 못했다. 내 첫사랑이었다.','narrator',{cast:['doa'],stageCast:['doa']}),
 line('우리가 사귀었던 적은 없었다. 선배가 기다리겠다고 한 적도 없었다. 오래 품었던 마음과 지금 선배가 반갑게 인사하는 일은 다른 이야기였다.','narrator',{cast:['doa'],stageCast:['doa']}),
 line('네. 오랜만이에요. 오늘은 강연 들으러 왔어요.','player',{cast:['doa'],stageCast:['doa']}),
 line('그럼 끝나고 어떤 부분이 좋았는지 알려 줘. 지금은 접수부터 마저 할게.','doa',{acting:'explain'}),
 line('선배는 뒤에 선 다른 학생에게도 같은 정확한 안내를 했다. 나는 통로를 비켜 강의실로 들어갔다.','narrator',{cast:[],stageCast:[]})
];
