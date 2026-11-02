import {campaign320} from './campaign-320.mjs?v=320';
import {reviewContinuity310} from './review-310.mjs?v=310';
import {campaign300} from './campaign-300.mjs?v=310';
import {addVenueChoices240} from '../runtime/meeting-venues-240.mjs?v=310';
import {campaign280} from './campaign-280.mjs?v=280';
import {artStates230} from '../runtime/art-catalog-230.mjs?v=230';
import {continueRelationships200} from './relationships-200.mjs?v=230';
import {addAftermath200} from './aftermath-200.mjs?v=230';
import {presentConversations200} from './presentation-200.mjs?v=200';
import {artStates200} from '../runtime/art-catalog-200.mjs?v=200';
import {artStates290} from '../runtime/art-catalog-290.mjs?v=290';
import {repairShortGoodbye190} from './short-goodbye-190.mjs?v=200';
import {repairContinuity190} from './continuity-190.mjs?v=200';
import {repairContinuity180} from './continuity-180.mjs?v=200';
import {repairWeeklyFlow180} from './weekly-flow-180.mjs?v=200';
import {repairSj180} from './character-sj-180.mjs?v=200';
import {repairCharactersHM180} from './character-hm-180.mjs?v=200';
import {repairYunaDoa180} from './character-yd-180.mjs?v=200';
import {addVisuals170} from './visuals-170.mjs?v=200';
import {continueAfterLove160} from './after-love-160.mjs?v=200';
import {completeRomance} from './romance-150.mjs?v=200';
import {extendSemester} from './late-semester.mjs?v=200';
import {deepenRelationships} from './relationship-depth-140.mjs?v=200';
import {cherryRoutes,FESTIVAL_CAST,FESTIVAL_OUTFITS,named} from './seasonal-scenes.mjs?v=200';
import {chapterTwoNodes} from './chapter-two.mjs?v=200';
import {reviseStory} from './revision-eight.mjs?v=200';
import {reviseMtAndWardrobe} from './mt-night.mjs?v=200';
import {enrichWeeks} from './richer-weeks.mjs?v=200';
import {addCityOutings} from './city-outings.mjs?v=200';
import {addLifeChoices} from './life-choices.mjs?v=200';
import {addEmotionalContinuity} from './emotional-continuity.mjs?v=200';
import {connectRelationships} from './relationship-links.mjs?v=200';
// Production adaptation of Story Draft 01, revision 11: prologue and W01–W04.
// Connective appointment scenes are written here without changing the source draft.
const nodes=[];
const f=(key,value=true)=>({type:'flag',key,value});
const rel=(character,affection=0,trust=0)=>({type:'relation',character,affection,trust});
const meet=character=>({type:'meet',character});
const exp=id=>({type:'experience',id});
const msg=(id,character,text,direction='in',when)=>({type:'message',id,character,text,direction,when});
const app=(id,character,status,week,day,time,label)=>({type:'appointment',id,character,status,week,day,time,label,purpose:'meal'});
const has=flag=>({flag}),no=flag=>({not:{flag}}),contact=character=>({contact:character});
const L=(text,speaker='narrator',pose='front',extra={})=>({text,speaker,...(speaker!=='narrator'&&speaker!=='player'?{shot:'medium',pose}:{}),...extra});
const C=(id,label,next,effects=[],when)=>({id,label,next,effects,when});
const N=(id,label,week,day,background,cast,lines,next,extra={})=>{nodes.push({id,label,week,day:`story-w${String(week).padStart(2,'0')}-${day}`,weekday:day,season:'spring',background,location:background==='bg.home_night'?'home':background==='bg.club_day'?'club':background==='bg.lecture_day'?'lecture':background==='bg.busstop_day'?'busstop':background==='bg.cafe_day'?'cafe':background==='bg.cherry_day'?'cherry':'campus',cast,outfits:Object.fromEntries(cast.map(c=>[c,'spring'])),lines,next,...extra});};

N('P00','프롤로그 · 개강 전날 밤',0,'sun','bg.home_night',[],[
 L('냉장고를 열었다가 닫았다. 물 두 병, 어머니가 넣어 둔 반찬통 세 개, 내가 사 온 캔커피 하나.'),
 L('나는 스물셋이다. 한빛대학교 사회학과 2학년. 군대에 다녀왔고, 지난달에 복학 신청을 했다.'),
 L('행정 처리는 그것으로 끝났다. 돌아오는 일도 그만큼 간단했으면 좋았을 텐데.'),
 L('연애는 해 본 적이 없다. 누군가를 좋아한 적은 있지만, 서로 좋아한다고 말하고 사귀는 데까지 가 본 적은 없었다.'),
 L('책상 위 시간표에는 처음 보는 강의실 번호가 많았다. 익숙했던 학교인데도 이번에는 어디부터 걸어야 할지 잠깐 생각했다.'),
 L('가방에 공책과 펜을 넣었다가 학생증을 빼먹은 걸 알아챘다. 문 옆에 걸어 두니 내일 나갈 준비가 조금은 된 것 같았다.'),
 L('한 학기를 잘 보내겠다는 계획은 아직 막연했다. 우선 내일 첫 수업에 늦지 않는 것부터 해 보기로 했다.'),
 L('휴대폰이 울렸다. 박민준이었다. 학과 공지방에 답을 안 했더니, 내일 정말 오는지 확인하는 전화였다.','narrator','front',{sfx:'phone-ring'}),
 L('열두 시에 학생회관 앞. 밥 먹자. 너 옛날 학생식당 생각하면 놀란다.','minjun','front',{sfx:'phone-answer'}),
 L('맛있어졌어?','player'),L('가격표가 커졌어.','minjun'),
 L('전화를 끊고 은행 앱을 열었다. 생활비로 쓸 수 있는 돈은 500,000원. 등록금과 방 보증금은 따로 정리했다.'),
 L('책값, 식비, 교통비. 이번 주는 써 보고, 부족하면 아르바이트 자리를 알아보기로 했다.'),
 L('빈 시간을 뒤처짐으로 느껴 아무 약속이나 받아들이곤 했다. 이번에도 그러다 보면 한 학기가 갈까.'),
 L('알람을 일곱 시 이십 분에 맞췄다. 시간표 아래에는 조금 우스운 목표를 적었다. ‘점심은 혼자 먹지 말 것.’'),
 L('내일 나는 학교에 돌아간다. 아직은, 그 뒤에 붙일 말을 모르겠다.')
],'W01_MON');

N('W01_MON','1주 월요일 · 학생회관',1,'mon','bg.campus_day',['minjun'],[
 L('학생회관 앞에서 민준을 찾는 데 삼 분이 걸렸다. 둥근 안경을 쓴 채 삼각김밥을 뜯고 있었다.'),
 L('밥 먹자며.','player'),L('이건 아침. 지금 일어났으면 아침이지.','minjun'),
 L('민준은 내가 든 인쇄 시간표를 봤다. “그거 우리 아버지 출장 일정표 같네.”'),
 L('강의실을 한 층 잘못 찾아갔다고 말하자 민준도 자기는 출석만 했다고 했다. 두 번째 이야기부터 조금 편해졌다.'),
 L('나 창작 동아리 다시 나가 보려고. 여운이라고. 영화도 찍고 글도 읽고 전시도 한대.','minjun'),
 L('너는 뭘 하는데?','player'),L('사람 모자라면 장비 든다. 지난번에는 의자. 금요일에 한 번 와. 가입은 보고 정해도 돼.','minjun'),
 L('막연한 권유가 의자 수가 되자 조금 대답하기 쉬워졌다. 점심값 7,000원을 내고 오후 수업으로 갔다.')
],'H01',{exitEffects:[{type:'money',amount:-7000}]});

N('H01','1주 월요일 · 다시 만난 해린',1,'mon','bg.busstop_day',['haerin'],[
 L('정류장에서 버스 카드를 떨어뜨렸다. 누군가 나보다 먼저 허리를 굽혔다.'),
 L('여전하네.','haerin','left'),L('윤해린? 너도 아직 여기 다녀?','player'),
 L('작업실에서 발견되기 싫어서 도망쳤는데, 정류장에서 신분 확인을 당하네.','haerin','right'),
 L('말하고 나서 이상한 질문이라는 걸 알았다. 나는 졸업했나 해서 그랬다고 덧붙였다.'),
 L('휴학도 했고 수업도 남았고. 설명은 버스 두 대쯤 보내야 돼.','haerin','front'),
 L('버스를 기다리며 사는 곳을 물었다. 나는 부모님 집에서 두 정거장 떨어진 곳에 방을 구했다고 했다.'),
 L('독립했네.','haerin','left'),L('반찬은 아직 독립 못 했어.','player'),
 L('해린이 웃었다. 오래 알고 지냈다는 사실만으로 오늘의 이야기를 다 아는 건 아니었다.')
],null,{effects:[meet('haerin')],choices:[
 C('present','요즘 네가 어떻게 지내는지 궁금해.','H01_NOW',[rel('haerin',2,1),f('askedHaerinNow')]),
 C('past','너 만나니까 예전 같아서 좀 안심된다.','H01_PAST',[rel('haerin',1)])
]});
N('H01_NOW','1주 월요일 · 오늘의 이야기',1,'mon','bg.busstop_day',['haerin'],[
 L('그 말 좋다. 나도 네가 어떻게 달라졌는지 궁금했어.','haerin','right'),
 L('해린은 모형 종이를 잘못 주문해 세 명에게 나눠 줄 만큼 큰 상자를 받았다고 했다. 나는 이번 주에 들을 수업을 이야기했다.')
],'CONTACT_H');
N('H01_PAST','1주 월요일 · 익숙함 다음',1,'mon','bg.busstop_day',['haerin'],[
 L('그건 좋지. 근데 우리 옛날 얘기만 하면 버스 금방 내려야 돼. 요즘 얘기도 하나 준비해.','haerin','left'),
 L('나는 자취방 반찬 이야기를 했다. 해린이 어머니의 멸치볶음이 여전하냐고 물어서, 오늘 아침에도 먹었다고 답했다.')
],'CONTACT_H');
N('CONTACT_H','1주 월요일 · 새 번호',1,'mon','bg.busstop_day',['haerin'],[
 L('동네 골목 벽화 바뀐 거 봤어? 사진 있는데. 보내 줄까?','haerin','right'),
 L('예전 번호 그대로야? 난 군대 있을 때 바꿨어.','player'),
 L('그래서 연락이….','haerin','front'),L('해린은 말을 끝내지 않고 화면 잠금을 풀었다.')
],null,{choices:[C('yes','그럼 새 번호 줄게.','H_CONTACT_YES',[{type:'contact',character:'haerin'},rel('haerin',0,1)]),C('later','사진은 다음에 만나면 보여 줘.','H_CONTACT_LATER')]});
N('H_CONTACT_YES','1주 월요일 밤 · 벽화 사진',1,'mon','bg.home_night',[],[
 L('서로 번호를 저장했다. 각자 집으로 돌아온 뒤, 해린에게 벽화 사진이 한 번 왔다.'),
 L('휴대폰 화면에서 새로 칠한 담벼락을 한참 봤다. 알고 있던 골목도 내가 없는 동안 조금 달라져 있었다.')
],'W01_TUE',{effects:[msg('h-wall-w01','haerin','바뀐 벽화. 사진으로 보니까 골목 엄청 넓어 보이지? 실제로는 여전히 차 한 대 지나가면 다 비켜야 함.')]});
N('H_CONTACT_LATER','1주 월요일 · 다음에 직접',1,'mon','bg.busstop_day',['haerin'],[
 L('그래. 원본이 더 커서 좋겠네. 다음에 보여 줄게.','haerin','left'),
 L('해린과는 각자 골목으로 걸었다. 그날 밤 민준에게 금요일에 가겠다고 답했다. 아직 해린의 새 연락처는 저장하지 않았다.')
],'W01_TUE');

N('W01_TUE','1주 화요일 · 카페 온유',1,'tue','bg.cafe_day',['yuna'],[
 L('빈 두 시간을 도서관에서 보내고, 간식 주문을 하러 가는 민준을 따라 온유에 들렀다. 문을 조금 당겼지만 열리지 않았다.'),
 L('지금 들었어. 경첩 수리 기다리는 중이야.','yuna','left'),
 L('카운터 안의 유나가 웃었다. 손님이 먼저라 주문을 마치고 벽 쪽에서 기다렸다.'),
 L('정유나. 졸업은 했고 지금은 여기서 일해. 여운에서 가끔 먹을 것 담당이고.','yuna','front'),
 L('유나는 금요일 간식 주문서를 돌렸다. 레몬 파운드와 호두 쿠키 사진이 있었다.'),
 L('여럿이 나눠 먹을 거야. 너라면 어느 쪽이 낫겠어?','yuna','right'),
 L('둘 다 괜찮아 보이는데요.','player'),L('대충 넘기지 말고 네 의견을 말해. 여기서는 나 선배라고 다 맞춰 주면 안 돼.','yuna','left')
],null,{effects:[meet('yuna')],choices:[C('cookie','쿠키요. 늦게 온 사람 것도 남기기 쉬워서요.','Y01_COOKIE',[f('snackCookie'),rel('yuna',1,1)]),C('lemon','저는 레몬 쪽이요. 단것만 있으면 커피를 계속 마시게 돼서.','Y01_LEMON',[rel('yuna',1)])]});
N('Y01_COOKIE','1주 화요일 · 주문서 한 줄',1,'tue','bg.cafe_day',['yuna'],[L('좋네. 그럼 따로 덜어 두기 편하게 포장하자.','yuna','right'),L('내 대답 때문에 주문서 한 줄이 정해졌다.')],'Y01_OUT');
N('Y01_LEMON','1주 화요일 · 아직은 추측',1,'tue','bg.cafe_day',['yuna'],[L('먹어 본 건 아니지?','yuna','left'),L('네. 추측입니다.','player'),L('좋아. 그럼 금요일에 평가 다시 받는다.','yuna','right')],'Y01_OUT');
N('Y01_OUT','1주 화요일 · 묻고 돕기',1,'tue','bg.cafe_day',['yuna'],[
 L('손님이 와서 대화가 끊겼다. 나는 비뚤어진 의자를 바로 놓았다. 상자까지 옮기려 하자 유나가 손을 들었다.'),
 L('그건 고마운데, 저 상자는 건드리지 마. 유리병이야. 도와주기 전에 물어보면 서로 편해.','yuna','left'),
 L('나는 손을 뺐다. 민준은 모임 인원수를 카페 주문 기록으로 확인했다. 유나와 개인 번호를 나누지는 않았다.'),
 L('학교 적응은 어때?','yuna','right'),L('아직 수업보다 빈 시간이 어렵네요.','player'),L('그럼 오늘은 빈 시간 하나 잘 보낸 셈 치고.','yuna','front')
],'W01_WED');

N('W01_WED','1주 수요일 · 복도의 카메라',1,'wed','bg.campus_day',['jiwoo'],[
 L('조별 자료 정리를 하겠다고 손부터 들었다. 삼십 분 만에 읽을 자료가 세 배로 늘었다. 복도에서 민준이 카메라를 멘 여자를 소개했다.'),
 L('이지우. 우리 입학 동기라는데, 얼굴 본 적 있나?','jiwoo','left'),L('있을 것 같기도 하고.','player'),
 L('그럼 둘 다 모르는 걸로 하자. 아는 척하다 사고 나는 것보다 낫지.','jiwoo','right'),
 L('지우는 금요일 모임 장소를 보여 줄 길 안내 영상을 찍고 있었다. 지금은 표지만, 얼굴이 나오면 먼저 묻는다고 했다.'),
 L('찍는 쪽이 좋아, 찍히는 쪽이 좋아?','jiwoo','front')
],null,{effects:[meet('jiwoo')],choices:[C('actor','찍히는 것도 한 번은 해 볼 만한데.','J01_ACT',[exp('j-first-acting'),rel('jiwoo',1,1)]),C('camera','뒤에서 뭘 하는지 보는 게 더 궁금해.','J01_CAMERA',[exp('j-first-camera'),rel('jiwoo',2)]),C('study','오늘은 자료 정리부터 해야 해. 금요일에 구경해도 돼?','J01_STUDY',[rel('jiwoo',0,1)])]});
N('J01_ACT','1주 수요일 · 두 번째 컷',1,'wed','bg.campus_day',['jiwoo'],[L('좋아. 대신 마음에 안 들면 지울 권리는 배우한테 있어.','jiwoo','right'),L('나는 삼 층을 삼 호라고 읽었다. 지우는 웃었지만 몰아붙이지 않았다. 두 번째 컷에서는 문장을 끝냈다.')],'GROUP_JOIN');
N('J01_CAMERA','1주 수요일 · 카메라 너머',1,'wed','bg.campus_day',['jiwoo'],[L('아, 내 노동을 구경하겠다?','jiwoo','left'),L('감독님도 한 컷 나오는 게 공평하지 않느냐고 묻자 지우가 카메라를 내려다봤다.'),L('나? 뒤에 있는 게 편한데… 한 컷만이다.','jiwoo','right'),L('나는 계단 표지를 가리키는 모습을 찍고, 저장 전에 보여 줬다. 지우가 고개를 끄덕였다.')],'GROUP_JOIN');
N('J01_STUDY','1주 수요일 · 오늘의 분량',1,'wed','bg.campus_day',['jiwoo'],[L('당연하지. 내가 카메라 들었다고 전부 출연해야 되는 건 아니니까.','jiwoo','left'),L('나는 벤치에서 자료 두 개를 읽었다. 지우는 장소 안내 촬영을 마치고 다음 수업으로 갔다.')],'GROUP_JOIN');
N('GROUP_JOIN','1주 수요일 · 여운 공지방',1,'wed','bg.campus_day',['jiwoo'],[L('민준이 돌아오자 지우가 모임 공지방 링크를 보여 줬다. 장소 공지는 개인 연락처나 사적인 연락과는 달랐다.')],null,{choices:[C('join','공지방에 들어간다.','W01_THU',[f('groupJoined')]),C('face','이번에는 금요일 장소만 직접 확인한다.','W01_THU')]});

N('W01_THU','1주 목요일 · 문 앞의 의자',1,'thu','bg.club_day',['minseo'],[
 L('모임 장소를 미리 보러 간 동아리방에서는 의자 다리가 바닥을 긁고 있었다. 하늘색 셔츠를 입은 선배가 도면에서 눈을 들었다.'),
 L('저는 차민서예요. 건축 대학원 다녀요. 도면만 보고 배치했더니 사람이 지나갈 데가 없네요.','minseo','left'),
 L('일부러 막아 둔 건 줄 알았어요.','player'),L('그러면 그럴듯하기라도 했을 텐데. 어디부터 바꾸면 편할까?','minseo','right')
],null,{effects:[meet('minseo')],choices:[C('entry','들어왔을 때 앉을 곳이 보이면 좋겠어요.','M01_ENTRY',[rel('minseo',1,1)]),C('window','쉬러 온 사람이 창가를 쓸 수 있으면 좋겠어요.','M01_WINDOW',[rel('minseo',1)])]});
N('M01_ENTRY','1주 목요일 · 보이는 자리',1,'thu','bg.club_day',['minseo'],[L('안내판보다 자리가 먼저네. 이쪽 의자 방향을 돌릴게.','minseo','left')],'M02');
N('M01_WINDOW','1주 목요일 · 남겨 둘 창가',1,'thu','bg.club_day',['minseo'],[L('작업보다 쉬는 시간이 필요하구나. 창가를 비워 두자.','minseo','right')],'M02');
N('M02','1주 목요일 · 가능한 만큼',1,'thu','bg.club_day',['minseo'],[L('의자를 옮기자 생각보다 공간이 넓어졌다. 휴대폰을 보니 수업까지 십오 분이었다.'),L('계속 도와줄 수 있어요?','minseo','left')],null,{choices:[C('limit','십 분은 돼요. 그 뒤에는 수업에 가야 해서요.','M02_LIMIT',[rel('minseo',1,2),f('keptTime')]),C('over','네, 괜찮아요.','M02_OVER',[rel('minseo',0,-2),f('hidClassTime')]),C('tomorrow','오늘은 가야 해요. 내일 모임 전에 일찍 올 수는 있어요.','M02_TOMORROW',[f('chairPromise')])]});
N('M02_LIMIT','1주 목요일 · 열 분의 도움',1,'thu','bg.club_day',['minseo'],[L('그럼 의자만 같이 해요. 선반은 제가 할게요.','minseo','right'),L('나는 수업에 늦지 않았다. 도와준 시간만큼, 가야 한다고 말한 시간도 남았다.')],'W01_FRI');
N('M02_OVER','1주 목요일 · 괜찮다고 한 뒤',1,'thu','bg.club_day',['minseo'],[L('선반을 잡아 놓고 시계를 봤다. 이미 수업 시작 시간이었다.'),L('수업 있었어요? 그러면 괜찮다고 하면 안 되죠. 놓고 가요. 이건 급한 일 아니에요.','minseo','front'),L('강의실 뒤로 들어갔다. 출석 확인을 다시 부탁해야 했다. 민서에게는 도움과 별개로 시간을 숨긴 일이 남았다.')],'W01_FRI');
N('M02_TOMORROW','1주 목요일 · 내일의 약속',1,'thu','bg.club_day',['minseo'],[L('그럼 내일 십 분만 부탁할게요. 시간 바뀌면 말해 주고요.','minseo','left'),L('나는 휴대폰에 모임 십 분 전이라고 적었다.')],'W01_FRI');

N('W01_FRI','1주 금요일 · 첫 모임',1,'fri','bg.club_day',['seoyeon','haerin','jiwoo'],[
 L('모임 십 분 전에 도착했다. 민서와 미리 정한 의자 정리를 먼저 마쳤다.','narrator','front',{when:has('chairPromise')}),
 L('문 앞에서 원고철을 안은 여자와 서로 먼저 들어가라며 한 번 멈췄다. 결국 내가 문을 잡았다.'),
 L('한서연이에요. 국문과 이학년이고요.','seoyeon','left'),
 L('해린은 테이프를 자르고 지우는 종이컵을 꺼냈다. 민서는 연구실 일정 때문에 늦고, 유나는 근무 중이라 간식만 먼저 도착했다.'),
 L('그럼 학교에서 못 본 곳이 생기셨겠네요. 저도 아직 모르는 데 많아서요.','seoyeon','right'),
 L('나만 길을 모르는 사람이 아니라는 뜻처럼 들렸다. 서연의 원고에는 제목 대신 ‘수정 6’이라고 적혀 있었다.'),
 L('글 쓰세요? 여섯 번 수정했으면 쓴다고 말해도 되지 않아요?','player'),
 L('지금 읽어 보실래요? 아니면 다 쓴 뒤에…?','seoyeon','front')
],null,{effects:[meet('seoyeon'),rel('minseo',0,1)].map(e=>e.character==='minseo'?{...e,when:has('chairPromise')}:e),choices:[C('read','지금 한 장만 봐도 괜찮으면요. 어디까지 읽을까요?','S01_READ',[f('readFirstPage'),exp('s-first-page'),rel('seoyeon',2,2)]),C('wait','편할 때 보여 주세요. 보여 주면 읽고 이야기할게요.','S01_WAIT',[rel('seoyeon',1,1)])]});
N('S01_READ','1주 금요일 · 첫 장만',1,'fri','bg.club_day',['seoyeon'],[L('완성된 것만 보여줘야 하는 줄 알았어요. 그럼 첫 장부터요.','seoyeon','left'),L('서연은 첫 장만 밀었다. 나는 그 장만 읽고, 밑의 두 번째 장은 넘기지 않았다.')],'C01');
N('S01_WAIT','1주 금요일 · 기다리는 독자',1,'fri','bg.club_day',['seoyeon'],[L('기다려 준다는 말, 적어 둬도 돼요? 중간에 독촉하기 없기예요.','seoyeon','right'),L('서연은 원고를 묶었다. 나는 아직 그 안에 무슨 이야기가 있는지 몰랐다.')],'C01');
N('C01','1주 금요일 · 여름에 남길 것',1,'fri','bg.club_day',['seoyeon','jiwoo','haerin','minseo'],[
 L('이번 학기에 해 보고 싶은 것을 이야기했다. 지우는 영상, 해린은 작은 전시, 서연은 끝까지 쓴 글을 말했다.'),
 L('그럼 마지막에 한 번에 보여 주면 안 돼?','minjun'),L('상영회 옆에 전시?','jiwoo','left'),L('낭독도 할 수 있죠.','seoyeon','right'),
 L('잘되면 좋고, 작아도 하고. 다들 바빠져도 취소 안 할 수 있는 정도로.','haerin','front'),L('늦게 온 민서는 자리를 너무 넓게 잡을 필요는 없겠다고 했다. 나는 지금 맡을 수 있는 일을 생각했다.')
],null,{choices:[C('record','저는 기록을 해 볼게요. 아직 촬영은 잘 모르지만.','W01_SAT',[f('roleRecord')]),C('help','처음엔 보면서 돕고 싶어요. 하나 정하면 끝까지 할게요.','W01_SAT',[f('roleHelp')]),C('visit','수업 적응부터 해야 할 것 같아요. 모임은 계속 와도 돼요?','W01_SAT',[f('roleVisitor')])]});
N('W01_SAT','1주 토요일 · 빨래가 마르는 시간',1,'sat','bg.home_night',[],[
 L('빨래를 널자 방이 절반으로 줄었다. 어머니는 학교가 다닐 만하냐고 물었다. 나는 학생식당과 동아리 이야기를 조금 했다.'),
 L('해린과 주고받은 사진을 다시 봤다. 아직 답이 없다고 재촉하는 문자가 오지는 않았다.','narrator','front',{when:contact('haerin')}),
 L('해린에게 사진을 받기로 한 건 아니었다. 슈퍼에서 우유를 고르다 옛 골목으로 돌아갈까 잠깐 생각했다.','narrator','front',{when:{not:contact('haerin')}}),
 L('오후에는 과제 자료를 읽고 반찬통을 하나 비웠다. 저녁에 걷은 셔츠는 여전히 어깨가 조금 당겼다. 이번에는 내가 달라졌다고 생각하기로 했다.')
],'SUN01');

function sunday(id,week,next,canInvite=true){
 N(id,`${week}주 일요일 밤 · 다음 약속`,week,'sun','bg.home_night',[],[
  L(week===1?'시간표에 ‘혼자 먹고 싶은 날은 빼고’라고 덧붙였다. 이번 주에 특별한 사이가 된 사람은 없지만, 다음 금요일 어디로 가면 되는지는 알았다.':'달력을 열었다. 이미 정한 수업과 모임은 그대로였다. 빈칸 전부를 채우기보다, 다음에 나누고 싶은 말 하나를 생각했다.'),
  L('연락할 수 있는 사이인지, 상대와 내가 가능한 시간인지부터 확인하자. 이번 주는 새 약속 없이 쉬어도 된다.')
 ],null,{choices:[
  ...(canInvite?[C('haerin','해린에게 다음 주 식사를 제안한다.',id+'_ASK',[f('focusHaerin')],contact('haerin'))]:[]),
  C('seoyeon','다음 모임에서 서연에게 먼저 인사하고 싶다.',id+'_FACE_S',[f('focusSeoyeon')]),
  C('jiwoo','다음 모임에서 지우와 더 이야기하고 싶다.',id+'_FACE_J',[f('focusJiwoo')]),
  C('minseo','다음 모임에서 민서의 작업 이야기를 듣고 싶다.',id+'_FACE_M',[f('focusMinseo')]),
  C('yuna','다음 카페 방문에서 유나에게 먼저 인사하고 싶다.',id+'_FACE_Y',[f('focusYuna')]),
  C('haerin-face','다음 모임에서 해린에게 말을 걸고 싶다.',id+'_FACE_H',[f('focusHaerin')],{not:contact('haerin')}),
  C('rest','이번 주는 새 약속을 잡지 않는다.',id+'_REST',[f('restW'+week)])
 ]});
 for(const [suffix,char,text]of [['S','seoyeon','원고를 읽었는지부터 떠올렸다. 다음 모임에서는 내가 실제로 읽은 만큼만 이야기하고 싶었다.'],['J','jiwoo','지우가 찍던 표지 영상이 어떻게 됐는지 궁금했다. 모임에서 먼저 말을 걸어 보기로 했다.'],['M','minseo','창가와 문 앞 의자가 생각났다. 민서가 다음 모임에 올 수 있는지 먼저 확인해야겠다.'],['Y','yuna','다음에 온유에 들르면 주문을 마친 뒤 잠깐 이야기할 여유가 있는지 물어봐야겠다.'],['H','haerin','번호를 모르는 지금은 문자를 보낼 수 없다. 다음에 실제로 만났을 때 사진 이야기를 꺼내 보기로 했다.']])N(id+'_FACE_'+suffix,`${week}주 일요일 · 다음에 할 말`,week,'sun','bg.home_night',[],[L(text),L('아직 상대에게 전하지 않은 내 생각이었다. 달력에 확정 약속을 만들지는 않았다.')],next);
 N(id+'_REST',`${week}주 일요일 · 남겨 둔 저녁`,week,'sun','bg.home_night',[],[L('나는 달력을 닫았다. 아무것도 시작하지 않는 것과 이번에는 조금 남겨 두는 것은 달랐다. 다음 주 월요일은 어느 쪽을 골라도 찾아온다.')],next);
}
sunday('SUN01',1,'W02_MON');
N('SUN01_ASK','1주 일요일 · 보내기 버튼',1,'sun','bg.home_night',[],[
 L('‘바쁘면 괜찮아’를 붙였다가 지웠다. 아직 물어보지도 않았는데 내가 먼저 거절하는 것 같았다.'),
 L('수요일에 수업 끝나고 밥 먹을래? 지난번 정류장에서 얘기하다 끊긴 거 생각나서.','player')
],'SUN01_REPLY',{effects:[msg('h-invite-01-out','haerin','수요일에 수업 끝나고 밥 먹을래? 지난번 정류장에서 얘기하다 끊긴 거 생각나서.','out'),app('h-meal-w02','haerin','pending',2,'wed','17:30','수업 뒤 식사')]});
N('SUN01_REPLY','1주 일요일 · 다른 날짜',1,'sun','bg.home_night',[],[
 L('답장은 내가 컵을 씻고 돌아왔을 때 와 있었다. 해린의 수요일에는 이미 작업이 있었다.'),
 L('수요일은 작업 때문에 안 돼. 목요일 다섯 시 반은 괜찮은데, 너는?','haerin')
],null,{effects:[msg('h-invite-01-reply','haerin','수요일은 작업 때문에 안 돼. 목요일 다섯 시 반은 괜찮은데, 너는?'),app('h-meal-w02','haerin','alternative',2,'thu','17:30','정문에서 만나 식사')],choices:[C('confirm','목요일 17:30, 정문에서 만나자.','SUN01_CONFIRMED',[app('h-meal-w02','haerin','confirmed',2,'thu','17:30','정문에서 만나 식사'),msg('h-invite-01-confirm-out','haerin','좋아. 목요일 다섯 시 반에 정문에서 보자.','out'),rel('haerin',1,1)]),C('defer','이번에는 미루자. 모임에서 보자.','SUN01_DEFER',[app('h-meal-w02','haerin','deferred',2,'thu','17:30','이번 식사는 보류'),msg('h-invite-01-defer-out','haerin','이번에는 미루자. 금요일 모임에서 보자.','out')])]});
N('SUN01_CONFIRMED','1주 일요일 · 함께 정한 시간',1,'sun','bg.home_night',[],[L('내가 처음 고른 시간은 아니었다. 그래서인지 실제로 누군가와 정한 약속처럼 느껴졌다.')],'W02_MON',{effects:[msg('h-invite-01-confirm','haerin','응. 이번엔 밥 먹고 버스 타는 걸로.')]});
N('SUN01_DEFER','1주 일요일 · 이번에는 미루기',1,'sun','bg.home_night',[],[L('둘이 가능한 시간이 맞지 않는 주도 있다. 목요일 식사 약속은 확정되지 않았다.')],'W02_MON',{effects:[msg('h-invite-01-defer','haerin','알겠어. 그럼 금요일에 보자. 내 작업도 그날까지는 끝내야지.')]});

N('W02_MON','2주 월요일 · 점심시간이 남았다',2,'mon','bg.campus_day',[],[L('민준이 먼저 수업에 갔다. 나는 혼자 식당에 앉았다. 지난주와 달리 도망치듯 먹지는 않았다.'),L('교수는 사람들이 어떤 자리에 오래 머무는지 기록하라고 했다. 보고 싶은 결론에 맞춰 해석하지 말라는 말이 오래 남았다.')],'Q02');
N('Q02','2주 화요일 · 이야기와 일상',2,'tue','bg.lecture_day',['seoyeon'],[
 L('화요일 13시, 인문관 203호. 서연을 알아본 채 함께 듣는 첫 교양 수업이었다.'),L('선배도 이 수업 들으세요? 오늘은 아는 사람이 있어서 조금 다르네요.','seoyeon','left'),
 L('강사는 ‘정류장에 두 사람이 서 있었다. 버스 한 대가 떠나고 한 사람만 남았다’는 문장을 보여 줬다. 적힌 사실과 우리가 덧붙인 것을 나눠 보라고 했다.')
],null,{choices:[C('facts','원래 같이 온 사람인지도 모르겠네요.','Q02_FACT',[rel('seoyeon',1,1),exp('q02-talk')]),C('feeling','남은 사람이 어떤 기분인지 궁금했어요.','Q02_FEEL',[rel('seoyeon',1),exp('q02-talk')]),C('alone','오늘은 혼자 메모를 정리한다.','Q02_ALONE')]});
N('Q02_FACT','2주 화요일 · 적힌 것과 짐작',2,'tue','bg.lecture_day',['seoyeon'],[L('저는 같이 왔다고 생각하고 읽었어요. 적힌 건 아닌데요.','seoyeon','right'),L('우리는 강의 자료의 짧은 문장을 한동안 이야기했다. 답을 고르기보다 내가 덧붙인 생각을 하나씩 지워 보는 수업이었다.')],'W02_CAFE');
N('Q02_FEEL','2주 화요일 · 다음 한 줄',2,'tue','bg.lecture_day',['seoyeon'],[L('저도 그다음 한 줄이 궁금해요. 그래도 외롭다고 정해 버리면 다른 얘기를 못 쓸 것 같아요.','seoyeon','left'),L('수업 뒤에는 서로 다음 문장을 생각하다 지금 말을 놓치는 버릇을 이야기했다. 다음 강의실이 서로 반대편이라 복도에서 인사했다.')],'W02_CAFE');
N('Q02_ALONE','2주 화요일 · 혼자 적은 메모',2,'tue','bg.lecture_day',['seoyeon'],[L('네. 다음에 이야기할 기회도 있겠죠.','seoyeon','right'),L('서연은 자기 메모를 계속 썼다. 같은 교실에 있었다는 사실만 남았다.')],'W02_CAFE');
N('W02_CAFE','2주 목요일 · 주문은 메뉴판에서',2,'thu','bg.cafe_day',['jiwoo','haerin','yuna'],[
 L('주문을 마치고 지우와 해린의 테이블에 합석했다. 셋은 내가 오기 전부터 하던 이야기를 이어 갔다.'),L('달고 차갑고 커피 아닌 거.','jiwoo','left',{shot:'ensemble'}),L('메뉴판에 있는 걸로 말해.','yuna','right',{shot:'ensemble'}),L('매번 그 조건으로 물어보면서 왜 메뉴 이름을 못 외워.','haerin','front'),L('오늘 다른 게 먹고 싶을 수도 있잖아.','jiwoo','right'),L('결국 지우는 지난번 음료를 골랐다. 대화가 포스터에서 영상으로, 수업으로 옮겨 갔다. 끼어들 타이밍을 재지 않고 대답할 수 있었다.')
],[{when:{appointment:'h-meal-w02',status:'confirmed'},node:'H_MEAL_02'},{node:'W02_FRI'}],{exitEffects:[{type:'money',amount:-4500}]});
N('H_MEAL_02','2주 목요일 17:30 · 정문 앞',2,'thu','bg.busstop_day',['haerin'],[
 L('카페에서 헤어진 뒤 수업을 마치고 정문으로 갔다. 해린은 약속한 시각에 스케치북을 가방에 넣고 있었다.'),L('오늘은 진짜 밥부터. 저번처럼 정류장에서 메뉴만 말하지 말고.','haerin','left'),L('우리는 가까운 식당에서 각자 먹고 싶은 걸 골랐다. 식사 뒤에는 같은 정류장까지 걸었다.'),
 L('작업 얘기 너무 오래 했나?','haerin','right'),L('아니. 예전엔 그냥 학교에 있다고만 생각했는데, 요즘 뭘 하는지 조금 알겠어.','player'),L('그럼 다음엔 네 얘기도 준비해 와. 관찰 과제 말고.','haerin','front'),L('오래된 친구와 약속한 식사. 아직 그 저녁에 다른 이름을 붙일 필요는 없었다. 그래도 먼저 물어본 일이 잘한 것 같았다.')
],'W02_FRI',{exitEffects:[app('h-meal-w02','haerin','completed',2,'thu','17:30','함께 식사 완료'),exp('h-meal-02'),rel('haerin',2,2),{type:'money',amount:-9000}]});
N('W02_FRI','2주 금요일 · 다시 보는 첫 장',2,'fri','bg.club_day',['seoyeon'],[
 L('서연이 고친 첫 장을 내밀었다. 지난주 읽은 문장 옆에 작은 수정이 보였다.','narrator','front',{when:has('readFirstPage')}),
 L('서연이 처음으로 첫 장을 내밀었다. 기다리겠다고 한 뒤 처음 읽는 원고였다.','narrator','front',{when:no('readFirstPage')}),
 L('아직 끝은 없어요. 이번엔 제가 여기까지만 보여 드리고 싶어서요.','seoyeon','left')
],null,{choices:[C('why','여기서 주인공이 왜 돌아갔는지 궁금했어요.','W02_READ_A',[exp('s-read-w02'),rel('seoyeon',1,1)]),C('honest','아직 좋은지 잘 모르겠어요. 대신 다음 장이 궁금해요.','W02_READ_B',[exp('s-read-w02'),rel('seoyeon',1,2)])]});
N('W02_READ_A','2주 금요일 · 남겨 둔 질문',2,'fri','bg.club_day',['seoyeon'],[L('제가 너무 생략했나 봐요. 설명을 더 할지는 생각해 볼게요.','seoyeon','right')],'SUN02');
N('W02_READ_B','2주 금요일 · 읽은 만큼만',2,'fri','bg.club_day',['seoyeon'],[L('그 대답도 괜찮네요. 읽은 척하는 것보다요.','seoyeon','left')],'SUN02');
sunday('SUN02',2,'Q03');
N('SUN02_ASK','2주 일요일 · 이번 주는 어려워',2,'sun','bg.home_night',[],[L('다음 주에도 잠깐 식사할 수 있는지 물었다. 해린은 작업 중인 모형을 마감해야 했다.'),L('이번 주 저녁은 어렵겠어. 약속 잡았다가 다시 바꾸고 싶진 않아. 금요일에 보자.','haerin')],'Q03',{effects:[msg('h-invite-02-out','haerin','다음 주에도 수업 끝나고 밥 먹을 시간 있어?','out'),app('h-meal-w03','haerin','pending',3,'wed','18:00','저녁 식사 제안'),msg('h-invite-02-no','haerin','이번 주 저녁은 어렵겠어. 모형 마감이 있어. 약속 잡았다가 다시 바꾸고 싶진 않아. 금요일에 보자.'),app('h-meal-w03','haerin','declined',3,'wed','18:00','마감으로 이번 초대 거절')],exitEffects:[f('haerinDeadlineKnown')]});

N('Q03','3주 화요일 · 각자의 이름',3,'tue','bg.lecture_day',['seoyeon'],[
 L('교양에서는 같은 공개 장소를 관찰하되 각자 보고서를 내는 과제가 나왔다. 동의 없이 개인을 따라다니는 관찰은 하지 않는다.'),L('같이 장소 정해 보실래요? 부담되시면 다른 분하고 해도 괜찮아요.','seoyeon','right')
],null,{choices:[C('pair','가능한 시간부터 확인하고 서연과 짝이 된다.','Q03_PAIR',[exp('q03-pair-s'),rel('seoyeon',1,1)]),C('other','이번에는 다른 조원과 해 보고 싶다고 말한다.','Q03_OTHER',[exp('q03-other')])]});
N('Q03_PAIR','3주 화요일 · 과제의 약속',3,'tue','bg.lecture_day',['seoyeon'],[L('우리는 과제 게시판에서 시간과 자료를 확인하기로 했다. 서로 가능한 시간을 적고 나니, 다음 수업까지 남은 시간이 별로 없었다.')],'W03_JOB');
N('Q03_OTHER','3주 화요일 · 다른 짝',3,'tue','bg.lecture_day',['seoyeon'],[L('네. 저는 옆자리 분한테 여쭤볼게요.','seoyeon','left'),L('서연은 옆자리와 시간을 맞췄다. 나는 내 조원 이름을 적었다. 수업이 끝나고 문 앞에서는 평소처럼 인사했다.')],'W03_JOB');
N('W03_JOB','3주 목요일 · 먼저 확인하는 조건',3,'thu','bg.cafe_day',['yuna'],[
 L('온유에서 단기 보조 근무 안내를 봤다. 유나는 업무와 시간을 먼저 설명했다.'),L('학교 일정부터 보고 정해. 아는 사이라고 얼렁뚱땅 시작하면 서로 곤란해.','yuna','left'),L('이번 제안은 다음 주 화요일 17~19시 포장 보조 한 번이었다. 시급 12,000원, 두 시간 24,000원을 마친 뒤 지급하는 조건을 확인했다.')
],null,{choices:[C('yes','수업과 겹치지 않는 걸 확인하고 두 시간 근무를 수락한다.','W03_JOB_YES',[f('jobAccepted')]),C('no','지금은 적응이 먼저라고 말한다.','W03_JOB_NO')]});
N('W03_JOB_YES','3주 목요일 · 일의 약속',3,'thu','bg.cafe_day',['yuna'],[L('좋아. 그 시간에 포장부터 알려 줄게. 개인 약속이랑 근무는 따로 정하는 거야.','yuna','right'),L('나는 달력에 화요일 보조 근무를 적었다. 일하기로 한 사실만으로 임금이 들어오지는 않았다.')],'W03_FRI');
N('W03_JOB_NO','3주 목요일 · 지금의 여유',3,'thu','bg.cafe_day',['yuna'],[L('그럼 손님으로 와. 일은 나중에 다시 물어봐도 돼.','yuna','front'),L('나는 근무표에 이름을 올리지 않았다. 유나는 다음 주문을 받았다.')],'W03_FRI');
N('W03_FRI','3주 금요일 · 콘센트 옆 자리',3,'fri','bg.club_day',['minseo','jiwoo','haerin'],[
 L('자리가 편해서 앉은 건지, 친한 사람이 있어서 앉은 건지 구분해 봤어요?','minseo','left'),L('둘 다면요?','player'),L('그렇게 적으면 되죠. 하나로 정해야 한다고 생각하지 말고.','minseo','right'),L('그럼 내 자리는 콘센트 때문이라고 적어 줘.','jiwoo','left'),L('너만 필요한 거 아니거든.','haerin','right',{shot:'ensemble'}),
 L('해린이 충전기를 먼저 꽂았다. 나는 내가 맡은 기록 노트에 오늘 실제로 들은 말만 적었다.','narrator','front',{when:has('roleRecord')}),
 L('다음 주 벚꽃 축제 이야기가 나왔다. 지우는 촬영을, 해린은 과제를 떠올렸고 민서는 연구 일정을 확인했다. 다 같이 모이는 약속은 잡지 않았다. 같이 걷고 싶은 사람이 있으면 각자 물어보기로 했다.')
],'H_CONTACT_LATE',{effects:[msg('group-cherry-w03','group','벚꽃 축제는 4주 토요일. 단체 집합은 없어요. 같이 갈 사람이 있으면 서로 가능한 시간을 먼저 확인해요.','in',has('groupJoined'))],exitEffects:[{...exp('record-w03'),when:has('roleRecord')}]});
N('H_CONTACT_LATE','3주 금요일 · 사진을 보내려면',3,'fri','bg.club_day',['haerin'],[L('벽화 사진 아직 안 봤지? 다음에 직접 봐도 되고, 괜찮으면 번호 저장해서 보내 줄 수도 있고.','haerin','left')],null,{when:{not:contact('haerin')},choices:[C('yes','개인적으로 연락해도 괜찮아. 번호를 저장한다.','SUN03',[{type:'contact',character:'haerin'},msg('h-wall-late','haerin','아까 말한 벽화 사진. 지난번보다 색이 조금 더 진해졌네.')]),C('no','사진은 다음에 직접 볼게.','SUN03')],next:'SUN03'});
sunday('SUN03',3,'W04_MON');
N('SUN03_ASK','3주 일요일 · 마감 뒤의 저녁',3,'sun','bg.home_night',[],[L('이번에는 마감 뒤에 시간이 있는지부터 물었다. 해린은 수요일 저녁은 비어 있다고 답했다.'),L('수요일 여섯 시면 돼. 학교 앞에서 먹자. 혹시 작업 늦어지면 바로 말할게.','haerin')],'W04_MON',{effects:[msg('h-invite-03-out','haerin','마감 지나면 수요일에 저녁 먹을 시간 있어?','out'),app('h-meal-w04','haerin','pending',4,'wed','18:00','마감 뒤 식사'),msg('h-invite-03-yes','haerin','수요일 여섯 시면 돼. 학교 앞에서 먹자. 혹시 작업 늦어지면 바로 말할게.'),app('h-meal-w04','haerin','confirmed',4,'wed','18:00','마감 뒤 식사')]});
N('W04_MON','4주 월요일 · 꽃이 지기 전에',4,'mon','bg.campus_day',[],[L('월요일부터 바람이 불었다. 꽃이 주말까지 남아 있을지 이야기하는 동안 나는 금요일 발표의 첫 문장을 외웠다.'),L('기록을 맡은 만큼 지난 모임의 메모를 정리했다. 할 수 있는 일을 한 줄 남기는 게 아무것도 안 적은 큰 약속보다 나았다.','narrator','front',{when:has('roleRecord')})],[{when:has('jobAccepted'),node:'W04_JOB'},{node:'W04_CANCEL'}]);
N('W04_JOB','4주 화요일 · 두 시간의 근무',4,'tue','bg.cafe_day',['yuna'],[L('17시, 수업 뒤 온유로 갔다. 유나는 포장 순서와 유리병을 두는 위치를 먼저 알려 줬다.'),L('헷갈리면 멈추고 물어봐. 빨리 하는 것보다 오늘 익힌 걸 다음에도 똑같이 하는 게 먼저야.','yuna','left'),L('두 시간을 마치고 작업대를 정리했다. 유나가 확인한 뒤 약속한 24,000원이 들어왔다. 고마웠다는 말과 급여는 별개였다.')],'W04_CANCEL',{exitEffects:[{type:'money',amount:24000},exp('first-shift-completed'),rel('yuna',0,2)]});
N('W04_FRI','4주 금요일 · 끝까지 한 발표',4,'fri','bg.lecture_day',[],[L('발표는 중간에 한 번 막혔다. 그래도 준비한 결론은 끝까지 말했다. 오후에는 어깨가 조금 가벼웠다.'),L('내일 축제를 같이 보고 싶은 사람을 떠올렸다. 오늘 직접 물어보고, 괜찮다고 하면 함께 걸을 시간과 장소를 정하고 싶었다.')],'CHERRY04');
N('CHERRY04','4주 금요일 · 같이 걷고 싶은 사람',4,'fri','bg.campus_day',[],[
 L('축제를 같이 즐기고 싶은 사람이 있었다. 막연히 그곳에서 만나기를 기다리는 대신, 오늘 먼저 물어보기로 했다.')
],null,{choicePrompt:'토요일 꽃길을 누구와 함께 걷고 싶을까?',choices:FESTIVAL_CAST.map(c=>C(c,cherryRoutes[c].invite,'CHERRY_INVITE_'+c,[f('cherryCompanion',c)]))});
N('W04_CANCEL','4주 수요일 · 갑자기 비어 버린 저녁',4,'wed','bg.lecture_day',[],[L('수업이 끝나기 전에 메시지가 왔다. 해린의 인쇄물이 망가져, 조원들과 저녁까지 다시 출력해야 한다고 했다.'),L('미안. 오늘은 못 나갈 것 같아. 네가 나오기 전에 말해야 될 것 같아서.','haerin'),L('먼저 연락해 준 건 고마웠다. 그래도 기다리던 저녁이 사라져 조금 서운한 건 사실이었다.')],null,{when:{appointment:'h-meal-w04',status:'confirmed'},effects:[msg('h-cancel-04','haerin','미안. 오늘 출력물이 망가져서 조원들이랑 저녁까지 다시 해야 해. 오늘은 못 나갈 것 같아. 네가 나오기 전에 말해야 될 것 같아서.'),app('h-meal-w04','haerin','cancelled',4,'wed','18:00','작업 문제로 식사 취소')],choices:[C('understand','미리 말해 줘서 고마워. 오늘은 작업 잘 마쳐.','W04_FREE',[rel('haerin',0,1),msg('h-cancel-04-understand-out','haerin','미리 말해 줘서 고마워. 오늘은 작업 잘 마쳐.','out')]),C('honest','아쉽긴 해. 그래도 오늘은 작업부터 끝내자.','W04_FREE',[rel('haerin',1,1),msg('h-cancel-04-honest-out','haerin','아쉽긴 해. 그래도 오늘은 작업부터 끝내자. 다음에는 둘 다 여유 있을 때 보자.','out')])],next:'W04_FRI'});
N('W04_FREE','4주 수요일 · 남은 시간을 고르는 일',4,'wed','bg.lecture_day',[],[L('나도 휴대폰을 내려놓았다. 빈 시간이 생겼다고 다른 누군가가 그 시간을 채워 줘야 하는 건 아니었다.')],null,{choices:[C('library','도서관에서 금요일 발표를 준비한다.','W04_LIBRARY',[exp('w04-own-study')]),C('cafe','온유에서 차를 마시며 발표 메모를 정리한다.','W04_CAFE',[exp('w04-cafe-visit')])]});
N('W04_LIBRARY','4주 수요일 · 내 발표의 첫 문장',4,'wed','bg.library_day',[],[L('도서관에서 발표 메모를 폈다. 저녁 한 시간을 어떻게 써야 할지 내가 정하고 나니, 서운함도 조금 다른 모양이 됐다.')],'W04_FRI');
N('W04_CAFE','4주 수요일 · 마감이라는 말',4,'wed','bg.cafe_day',['yuna'],[L('주문한 차를 들고 앉았다. 유나가 잠깐 컵을 정리하러 왔다.'),L('오늘은 혼자네. 과제 중이야?','yuna','right'),L('원래 약속이 있었는데 작업 때문에 취소됐어요. 저는 발표 준비나 하려고요.','player'),L('기다렸으면 아쉽지. 그렇다고 네 저녁까지 취소되는 건 아니니까. 차 식기 전에 한 모금 해.','yuna','left'),L('유나는 새 주문을 받으러 갔다. 나는 발표 첫 문장을 고쳤다. 차를 다 마실 즈음엔 창밖이 조금 어두워져 있었다.')],'W04_FRI',{exitEffects:[{type:'money',amount:-4500},rel('yuna',1,1)]});
for(const c of FESTIVAL_CAST){
 const route=cherryRoutes[c],cameo=route.cameo;
 const appointment=status=>({type:'appointment',id:'cherry-outing',character:c,status,week:4,day:'sat',time:c==='minseo'?'13:00~14:30':'13:00',label:'벚꽃축제 함께 구경',purpose:'outing'});
 N('CHERRY_INVITE_'+c,'4주 금요일 · '+route.name+'의 대답',4,'fri',c==='yuna'?'bg.cafe_day':'bg.campus_day',[c],[
  L('나는 '+route.name+'에게 토요일 축제를 함께 구경할 시간이 있는지 물었다.'),L(route.accept,c),L('가능한 시간을 확인하고 꽃길 입구에서 만나기로 했다. 두 사람이 정한 약속을 달력에 적었다.')
 ],'CHERRY_MEET_'+c,{effects:[appointment('confirmed')]});
 N('CHERRY_MEET_'+c,'4주 토요일 · '+named(route.name,'과','와')+' 꽃길에서',4,'sat','bg.cherry_day',[c],[
  L('약속한 입구에 '+named(route.name,'이','가')+' 와 있었다. 오늘은 둘이 축제를 구경하기로 했다.'),L(route.greeting,c)
 ],null,{outfits:FESTIVAL_OUTFITS,effects:[exp('cherry-attended'),exp('cherry-companion-'+c)],choicePrompt:'둘이 무엇부터 해 볼까?',choices:route.activities.map(a=>C(a.id,a.label,'CHERRY_'+c+'_'+a.id,[rel(c,1,1),exp('cherry-'+a.id),...(a.id==='snack'?[{type:'money',amount:-6000}]:[])]))});
 for(const activity of route.activities)N('CHERRY_'+c+'_'+activity.id,'4주 토요일 · '+activity.label,4,'sat','bg.cherry_day',[c],activity.lines,'CHERRY_CROSS_'+c,{outfits:FESTIVAL_OUTFITS});
 N('CHERRY_CROSS_'+c,'4주 토요일 · 길에서 마주친 얼굴',4,'sat','bg.cherry_day',[c,cameo],route.encounter.map(l=>({...l,stageCast:l.speaker==='narrator'?[]:[l.speaker]})),'CHERRY_RETURN_'+c,{outfits:FESTIVAL_OUTFITS});
 N('CHERRY_RETURN_'+c,'4주 토요일 · 다시 둘이 걷는 길',4,'sat','bg.cherry_day',[c],[
  L('인사를 마치고 다시 둘이 걷기 시작했다. 아까 끊겼던 이야기를 어디까지 했는지 물었다.'),
  ...(c==='haerin'?[L('요즘 좋아하는 색 있어? 예전처럼 다 파란색이라고 하지 말고.','haerin','front',{when:has('askedHaerinNow')})]:[]),
  L(route.closing,c),L('꽃길 끝에서 다음 일정을 확인하고 헤어졌다. 약속한 사람과 시작해서, 그 사람과 이야기를 마쳤다.')
 ],'CHERRY_AFTER',{outfits:FESTIVAL_OUTFITS,exitEffects:[appointment('completed'),rel(c,1,1)]});
}
N('CHERRY_AFTER','4주 토요일 · 돌아오는 길',4,'sat','bg.campus_day',[],[
 L('신발에 꽃잎 하나가 붙어 있었다. 오늘 함께 걸은 사람의 마지막 말이 돌아오는 길에도 생각났다.')
],'CHAPTER_END');
N('CHAPTER_END','4주 일요일 · 다음 이야기를 남기며',4,'sun','bg.home_night',[],[
 L('복학 첫날에는 점심을 같이 먹을 사람이 필요했다. 지금은 다음에 무슨 이야기를 나누고 싶은 사람이 생겼다.'),
 L('연락처를 나눈 사람과 아직 대면으로 인사하는 사람, 실제로 한 약속과 머릿속으로만 생각한 약속은 서로 달랐다.'),
 L('나는 내일 시간표를 한 번 더 봤다. 수업과 과제 사이, 아직 정하지 않은 저녁 하나를 남겨 두었다.')
],'SUN04');

for(const node of nodes)if(node.id==='C01')for(const line of node.lines.slice(0,-1))line.cast=['seoyeon','jiwoo','haerin'];
// Arrival beats change physical presence, not just the camera.
const firstMeeting=nodes.find(n=>n.id==='W01_FRI');
for(const line of firstMeeting.lines)if(line.text.startsWith('문 앞에서 원고철')||line.speaker==='seoyeon'&&line.text.startsWith('한서연이에요'))line.cast=['seoyeon'];


export const legacyStory={version:'0.6.0',sourceRevision:'12',narrativeRevision:'0.7.0',start:'P00',nodes:[...nodes,...chapterTwoNodes],scope:'프롤로그와 1~8주 공통 본편'};
export const story080=reviseStory(legacyStory);
export const story090=reviseMtAndWardrobe(story080);
export const story100=enrichWeeks(story090);
export const story110=connectRelationships(story100);
export const story120=addEmotionalContinuity(addLifeChoices(addCityOutings(story110)));
export const story130=extendSemester(story120);
export const story140=deepenRelationships(story130);
export const story150=completeRomance(story140);
export const story160=continueAfterLove160(story150);
export const story170=addVisuals170(story160);
export const story180=repairWeeklyFlow180(repairContinuity180(repairYunaDoa180(repairCharactersHM180(repairSj180(story170),story170)),story170));

export const story190=repairShortGoodbye190(repairContinuity190(story180));
export const story230={...presentConversations200(addAftermath200(continueRelationships200(story190)),new Set([...artStates200,...artStates230])),narrativeRevision:'0.20.0',sourceRevision:'24'};

export const story270={...addVenueChoices240(story230),presentation260:true};
export const story290=presentConversations200(campaign280(story270),new Set([...artStates200,...artStates230,...artStates290]));
export const story300=campaign300(story290);
export const story310=reviewContinuity310(story300);
export const story=campaign320(story310);
