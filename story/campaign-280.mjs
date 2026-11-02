import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
import {personalities as P} from './late-personal-content.mjs?v=200';
import {PEOPLE280 as people,NAMES280 as names,checkin280,invite280} from './messages-280.mjs?v=280';
const days={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
const flag=(key,value=true,when)=>({type:'flag',key,value,when}),has=(key,value=true)=>({flag:key,value}),not=rule=>({not:rule}),all=(...rules)=>({all:rules.filter(Boolean)}),any=(...rules)=>({any:rules}),contact=c=>({contact:c});
const rel=(character,affection=0,trust=1)=>({type:'relation',character,affection,trust}),exp=id=>({type:'experience',id});
const msg=(id,character,text,direction='in',when)=>({type:'message',id,character,text,direction,when,authored280:true});
const L=(text,speaker='narrator',extra={})=>({text,speaker,cast:people.includes(speaker)?[speaker]:[],stageCast:people.includes(speaker)?[speaker]:[],...(people.includes(speaker)?{shot:'medium',pose:'front',to:'player'}:{}),...extra});
const C=(id,label,next,effects=[],when)=>({id,label,next,effects,when});
const appFree=id=>not(any(...['pending','alternative','confirmed','completed','declined','deferred','cancelled'].map(status=>({appointment:id,status}))));
const retarget=(value,from,to)=>typeof value==='string'?(value===from?to:value):value?.map(b=>({...b,node:b.node===from?to:b.node}));
export const GIFTS280=[{id:'bookmark',name:'천 책갈피',price:3500},{id:'notebook',name:'작은 무지 수첩',price:6000},{id:'tea',name:'개별 포장 차 세트',price:4500}];
const venues={seoyeon:['작은 책방 앞','bg.bookshop_day','bookshop'],jiwoo:['학생회관 뒤 산책길','bg.campus_day','campus'],haerin:['동네 시장 입구','bg.market_day','market'],yuna:['온유 건너편 교문','bg.campus_day','campus'],minseo:['시립 전시실 휴게석','bg.city_gallery_day','city-gallery'],doa:['학과 건물 옆 카페','bg.cafe_day','cafe']};
const topics={
 seoyeon:[['글을 보여 주지 않는 저녁','오늘은 원고 안 가져왔어요. 글이 없으면 무슨 얘기할까 싶었는데, 그냥 오늘 점심부터 말해 보고 싶네요.','서연은 수업 사이 급히 먹었던 김밥 얘기를 하다가, 내가 요즘 혼자 있을 때 무엇을 하는지 물었다.','요즘 혼자 보내는 저녁을 하나 들려준다.','서연은 공책에 적지 않고 내 얘기를 들었다. 자기 쪽 저녁도 다음에는 들려주겠다고 했다.'],['질문하고 돌아온 길','오늘 수업에서 질문했어요. 선배가 전에 기다려 줬던 것처럼, 제가 말 다 할 때까지 기다려 주더라고요.','잘된 일만 말하던 서연이 질문 뒤에 틀린 답을 했던 일도 덧붙였다. 나는 바로 괜찮다고 덮지 않았다.','어떤 부분에서 말이 막혔는지 더 물어본다.','그때는 창피했는데 지금 말하니까 좀 웃기네요. 다음에는 손을 조금 더 빨리 들어 볼래요.'],['같이 고른 첫 쪽','책 소개 말고 첫 쪽만 서로 골라 볼까요? 왜 좋았는지 설명은 나중에 해도 되고요.','서로 고른 책은 달랐다. 서연은 내가 책을 오래 들여다보는 동안 먼저 결론을 묻지 않았다.','내가 고른 문장을 소리 내어 읽어 준다.','선배가 읽으니까 제가 읽을 때랑 다른 데서 쉬네요. 오늘은 그게 기억날 것 같아요.']],
 jiwoo:[['카메라가 없는 산책','오늘은 가방 가볍지? 카메라 두고 나왔어. 찍을 게 없으면 너랑 무슨 얘기하나 좀 보려고.','지우는 횡단보도에서 신호를 기다리며 점심에 본 웃긴 일을 뒤늦게 설명했다. 설명 중에 먼저 웃어 버렸다.','끝까지 듣고 내가 겪은 실수도 하나 말한다.','아, 그건 내가 더 잘할 수 있는데. 실수 대결은 다음에 또 하자.'],['끝까지 들은 한 곡','추천곡 하나만 가져왔어. 다 듣고 별로라고 해도 되고, 중간에 다른 얘기해도 되고.','지우는 곡이 끝난 뒤 좋아하는 이유보다 처음 들었던 장소를 먼저 말했다. 나는 내 기억을 하나 꺼냈다.','그 곡을 들을 때 떠오른 내 장면을 말한다.','네 얘기 들으니까 제목보다 그 장면이 먼저 생각나겠다. 이런 추천도 괜찮네.'],['일찍 저장한 날','오늘 파일 이름에 최종 안 붙였어. 그냥 오늘날짜. 내일 바꿀 수도 있으니까.','노트북을 덮고 나온 지우가 요즘은 쉬는 동안에도 편집을 생각한다고 했다. 나는 나도 자꾸 확인하는 것을 말했다.','나도 자꾸 확인하게 되는 일을 솔직히 말한다.','우리 오늘은 집 가는 길에 한 번만 확인하기. 두 번 하면 내일 고백해라. 그 고백 말고 횟수.']],
 haerin:[['옛날 답을 안 고르는 날','네가 지금 뭘 먹고 싶은지 맞혀 보려다가 관뒀어. 물어보면 되는데 맨날 퀴즈를 내네.','해린은 메뉴판을 내 쪽으로 돌리고 자기가 오늘 고른 것을 먼저 말했다. 예전 단골 메뉴와는 달랐다.','예전과 달라진 내 취향도 하나 말한다.','그랬구나. 오래 알았다는 게 새로 물어볼 게 없다는 뜻은 아니네.'],['일부러 비워 둔 종이','이건 완성 못 한 거 말고 일부러 남긴 칸이야. 네가 보기에는 뭐가 들어가면 좋겠어?','해린은 종이를 내게 건넸다가 답을 적어 달라는 건 아니라며 웃었다. 서로 다른 색을 짚었다.','내 답을 말하고 해린이 비워 둔 이유를 듣는다.','너랑 다르게 생각한 게 좀 좋다. 다 똑같았으면 내가 왜 불렀나 싶었을 거야.'],['시장 끝의 벤치','여기까지 오면 원래 뭐 하나 꼭 사야 할 것 같았거든. 오늘은 구경만 해도 재밌네.','해린은 봉투 없이 앉은 자기 손을 내려다봤다. 나는 오늘 아무것도 끝내지 않은 내 얘기를 꺼냈다.','완료한 일 대신 오늘 즐거웠던 일을 나눈다.','그런 걸로 하루 얘기해도 되네. 너한테는 괜히 성과 보고 안 해도 되겠다.']],
 yuna:[['퇴근한 사람의 메뉴','여기서는 내가 물 따라 주지 않아도 되네. 어색해서 자꾸 주전자 찾았어.','유나는 자기가 먹고 싶은 걸 천천히 골랐다. 나는 오늘 가게가 어땠는지보다 지금은 어떤지 먼저 물었다.','지금 먹고 싶은 것과 쉬고 싶은 방식을 묻는다.','오늘은 따뜻한 거 먹고 조금만 걸을래. 네 얘기도 들으면서.'],['쉬는 날의 작은 계획','휴무라고 방 청소부터 하다가 멈췄어. 오늘은 계획 하나만 해 보려고. 너 만나기.','유나는 그 말이 조금 거창했다며 웃고 신발 끈을 고쳐 묶었다. 나는 오늘 만나서 좋았던 것을 하나 말했다.','오늘 같이 해 보고 싶었던 작은 일을 말한다.','그 정도 계획이면 나도 좋아. 잘 쉬었다는 결과까지 제출할 필요는 없겠다.'],['새로운 맛을 고른 이유','맨날 추천하는 맛 말고 내가 궁금했던 걸 샀어. 생각보다 달아서 조금 놀랐지만.','유나가 자기 취향을 말하는 동안 나는 더 잘 맞는 메뉴를 찾아 주려던 휴대폰을 넣었다.','나도 기대와 달랐던 맛 이야기를 한다.','취향 실패 얘기하니까 재밌네. 다음에도 네가 먹고 싶은 쪽으로 골라 봐.']],
 minseo:[['설명하지 않는 자리','오늘 여기 앉은 이유를 설명하려다 그만뒀어요. 그냥 이쪽이 좋았거든요.','민서는 가방에서 자를 꺼내지 않고 창밖을 봤다. 나는 이번 주에 이유를 잘 설명하지 못했던 선택을 말했다.','설명하기 어려웠지만 좋았던 선택을 나눈다.','그런 얘기는 도면에 적기 어렵겠네요. 대신 다음에 다시 물어볼게요.'],['답을 모른다고 한 날','오늘 모른다고 대답했어요. 제가 늘 설명하는 쪽인 줄 알았는데 생각보다 속이 시원했어요.','민서는 웃다가 아직 다시 찾아볼 것은 남아 있다고 말했다. 나는 모르는 채로 남겨 둔 내 질문을 꺼냈다.','나도 아직 답을 못 찾은 질문을 말한다.','오늘 답까지 정하지 않아도 이야기할 건 많네요. 다음에 어디까지 생각했는지 궁금해요.'],['다른 길로 돌아온 저녁','늘 같은 길로 오다가 오늘은 반대로 걸었어요. 길을 새로 알기보다 제가 뭘 보고 다녔는지 알겠더라고요.','민서는 내가 주로 보는 쪽과 자기 쪽 풍경을 번갈아 가리켰다. 같은 길에 서로 다른 표지가 있었다.','내가 그 길에서 기억하는 풍경을 보여 준다.','제가 혼자 왔으면 못 봤을 것 같아요. 다음에는 그쪽이 길을 골라 줘요.']],
 doa:[['명찰을 빼고 나온 사람','업무 끝났어요. 오늘은 누가 뭘 물어볼까 말고 제가 뭘 말하고 싶은지 생각하면서 나왔어요.','도아는 명찰 자국이 남은 셔츠를 정리하고, 요즘 내가 수업에서 좋아하는 시간이 언제인지 물었다.','예전 얘기 대신 요즘 즐거운 수업 이야기를 한다.','처음 듣는 얘기네요. 내가 기억하던 후배랑 지금의 네가 조금씩 같이 보여요.'],['옛날과 다른 주문','예전에 먹던 걸 주문하려다가 메뉴판을 다시 봤어요. 오늘 먹고 싶은 건 다르더라고요.','도아는 내 주문도 바뀌었는지 물었다. 나는 예전에는 좋아 보이고 싶어서 골랐던 메뉴를 털어놨다.','그때는 말하지 못했던 사소한 실수를 나눈다.','그땐 몰랐어요. 오늘 들으니까 그때보다 지금 같이 웃을 수 있는 게 좋네요.'],['먼저 보내 본 연락','제가 먼저 만나자고 쓰고 한참 들여다봤어요. 그냥 안부여도 되는데 이유를 자꾸 붙이게 되네요.','나는 나도 전송 버튼 앞에서 망설인다고 말했다. 도아는 언제부터인지 묻지 않고 지금은 어떤지 물었다.','연락을 기다리며 내 마음이 어땠는지 말한다.','저도 네 연락 오면 바로 열어 보는 날이 있어요. 오늘은 그걸 말하고 싶었나 봐요.']]
};
const buddyTopics={
 3:['학식 트레이를 내려놓으며','너 요즘 약속 없으면 하루가 허전해? 아니면 학교에 다시 온 게 아직 좀 어색해?','민준은 밥 위에 놓인 계란을 반으로 나누며 자기 조별과제 얘기도 했다. 내 얘기만 검사하듯 묻는 자리는 아니었다.'],
 6:['MT 다녀온 뒤의 국밥','MT에서 잘 노는 척하느라 피곤하진 않았냐? 나는 길 아는 척하다가 네가 같이 웃어 줘서 좀 살았어.','숙소에서 엉킨 손가락 게임을 떠올리다 둘 다 웃었다. 민준은 그날 누구와 더 이야기했는지보다 내가 편했던 순간이 있었는지 물었다.'],
 9:['오랜만인 사람을 만난 뒤','사람 다시 만나면 그 사람도 반갑지만, 그때 내 모습까지 같이 따라오잖아. 너는 어느 쪽이 더 복잡해?','민준은 내 대답을 기다리다가 자기 첫 실습 때 얘기를 꺼냈다. 잘 보이고 싶어서 아는 척했던 이야기였다.'],
 12:['퇴근 뒤 작은 술집','요즘 바빠 보이더라. 근데 바쁜 거랑 괜찮은 건 좀 다르잖아. 너는 지금 뭐 때문에 움직이는 것 같아?','맥주와 무알코올 음료를 놓고 안주를 나눴다. 민준도 지원서를 두 번 고치고 아직 보내지 못했다고 말했다.'],
 15:['특강 뒤 늦은 저녁','좋아하는 사람 앞에만 가면 미래 계획이 갑자기 거창해지냐? 나는 면접 앞에서 그러더라. 진짜 하고 싶은 건 따로 있는데.','민준은 오늘 들은 특강보다 내 쪽에 오래 남은 말이 있는지 물었다. 내가 답하자 왜 그 말이었는지 한 번 더 물었다.'],
 17:['방학 첫 주의 분식','시간표 사라지니까 더 바쁘게 살아야 할 것 같더라. 너는 방학 끝나기 전에 뭘 하나 해 보고 싶어?','민준은 아침에 늦게 일어나는 것부터 고치겠다고 했다가, 꼭 뭘 고쳐야만 계획인 건 아니겠다고 말을 바꿨다.'],
 20:['여름 MT 뒤 저녁밥','여행 때 좋았던 거 하나만 말해 봐. 누구랑 있었는지 말고, 네가 어떤 사람이었을 때 편했는지.','민준은 물놀이 때 자기 슬리퍼가 떠내려갈 뻔했던 일을 먼저 털어놨다. 웃음이 잦아든 뒤에도 대화가 끝나지는 않았다.'],
 23:['여름 끝에 남은 잔','이번 학기 시작할 때 점심 혼자 안 먹는 게 목표였잖아. 지금 네 목표는 뭐야? 그거 바뀌어도 되는 거고.','민준은 자기 목표도 하나 말했다. 누가 뽑아 주기를 기다리는 것보다 해 본 것을 먼저 늘려 보고 싶다는 얘기였다.']
};
const buddyAnswers={
 3:['너는 누가 먼저 연락하면 좀 안심되는 편인가 보네. 그럼 네가 먼저 보낼 때는 무슨 마음인지도 같이 생각해 봐.','복학했으니까 처음부터 다 따라잡아야 할 것 같냐? 나는 오늘 수업 안 졸았으면 일단 성공으로 친다.','거절당하면 어색할까 봐? 그럼 네가 해 보고 싶은 말이랑 상대 대답은 일단 따로 생각해 보자.','그럼 오늘 점심 메뉴 망한 이유부터 듣자. 나도 똑같은 거 시켜서 지금 네 얘기가 중요해.'],
 6:['MT에서 누구 옆이었는지보다 네가 웃었던 게 기억나. 네가 편해지는 것도 가까워지는 일에 들어가는 것 같아.','놀러 가는 날까지 과제 들고 가려던 거 봤다. 너도 가방 좀 가볍게 해도 되잖아. 다음엔 내가 먼저 내려놓을게.','게임 틀릴까 봐 처음에 말 안 하더니 나중엔 먼저 질문하더라. 그 정도 변화도 있는 거 아니냐?','나도 다 같이 있으면 괜히 말 많이 하게 되더라. 조용하면 재미없는 사람 될까 봐. 오늘은 좀 덜 해 보려고.'],
 9:['예전에 좋아했던 마음이 지금도 같은 모양일 필요는 없잖아. 오늘 다시 보고 싶은 이유가 따로 생겼는지 그게 궁금하다.','그 사람 다시 만났다고 네 계획표가 전부 바뀌어야 하는 건 아니겠지. 너는 요즘 무슨 수업이 재밌는데?','그때 못 한 말이 먼저 튀어나올까 봐 겁나냐? 오늘 물어볼 것부터 하나 골라 봐. 예전 답 말고 지금 답이 궁금한 걸로.','그럼 천천히 알아가면 되지. 나는 오늘도 처음 먹는 반찬을 십 년 먹은 척하다가 실패했다.'],
 12:['일하고 나면 누가 오늘 어땠냐고 물어주는 게 생각보다 좋더라. 너도 그 사람 하루를 궁금해해서 연락하는 거겠지?','돈 벌기 시작하니까 쉬는 시간에도 계산하게 되냐? 네가 번 돈인데 네 저녁을 편하게 만드는 데 써도 되잖아.','선물 하나 고르면서도 정답을 찾는 거냐? 비싸면 틀릴까 봐 덜 무서운 건지, 그냥 주고 싶은 건지부터 봐.','오늘은 내 얘기도 좀 들어라. 지원서 한 줄 쓰는데 고작 이런 사람인가 싶어서 못 보내고 있었어.'],
 15:['누굴 좋아하면 멋있어 보이고 싶은 건 알겠는데, 너 오늘 진짜 재밌었다고 한 얘기는 표정이 다르더라. 그 얘기도 해 봐.','남한테 설명하기 좋은 계획이랑 네가 아침에 일어나서 하고 싶은 일이 다른 거냐? 어느 쪽인지 나도 요즘 고민이야.','잘될 때만 연락할 수 있는 사이가 되고 싶은 건 아닐 거 아냐. 안 된 날에도 무슨 말은 해 보고 싶은지 생각해 봐.','나도 특강 듣고 갑자기 거창한 계획 세웠다가 버스에서 다 접었다. 그래도 집 가서 한 줄은 적으려고.'],
 17:['방학에 더 자주 볼 수 있다고 자동으로 더 가까워지진 않겠지. 그래도 그냥 보고 싶은 날이 생기면 난 말해 볼래.','학교 시간표 대신 네 시간표를 만드는 거네. 나는 내일 일어나는 시각부터 적으려고. 너는 뭐부터 할래?','방학 끝날 때 달라져 있어야 한다고 생각하면 시작도 좀 무겁더라. 작게 해 보고 별로면 바꿀 수도 있잖아.','나는 쉬는 날에 늦잠 자고도 자꾸 핑계를 만들더라. 오늘은 그냥 잘 잤다고 말해 보려고.'],
 20:['같이 놀고 나서 평범한 날에도 다시 보고 싶었어? 나는 여행 사진보다 돌아와서 같이 밥 먹은 게 더 오래 남을 때도 있더라.','여행 뒤에 또 바로 일할 생각하니까 좀 막막하지? 이번 주에 비워 둘 저녁도 먼저 표시해 봐. 나랑 먹어도 되고.','좋았던 날 끝나면 그만큼 기대하는 게 무서워지냐? 그 사람한테도 오늘만큼은 좋았다고 말할 수 있으면 좋겠다.','난 아직도 슬리퍼 생각하면 웃겨. 잘 놀았다고 말하는 데 거창한 감상이 꼭 필요한 건 아니더라.'],
 23:['처음엔 혼자 밥 안 먹는 게 목표였는데, 이제는 어떤 사람이랑 어떤 얘길 하고 싶은지가 생겼네. 그거면 좀 달라진 거지.','이번 학기에 끝낸 것만 세면 못 한 것만 보일 수도 있겠다. 네가 실제로 해 본 일도 같이 적어 봐.','끝날까 봐 먼저 다음 얘기를 접는 거야? 나는 여름 끝나도 밥 먹자고는 할 건데. 너도 하고 싶은 약속 있으면 말해 봐.','그럼 아직 모르는 걸로 남겨 두자. 대신 다음 학기 첫 점심은 나랑 먹어. 그건 지금 정해도 되겠지.']
};

export function campaign280(base){
 const map=new Map(base.nodes.map(n=>[n.id,n])),changed=new Set();
 const edit=id=>{if(!map.has(id))throw Error('Missing campaign scene '+id);if(!changed.has(id)){map.set(id,structuredClone(map.get(id)));changed.add(id);}return map.get(id);};
 const make=(id,w,d,bg,cast,lines,next,extra={})=>{
  const location=({'bg.home_night':'home','bg.home_day':'home','bg.cafe_day':'cafe','bg.library_day':'library','bg.office_day':'office','bg.seminar_day':'seminar','bg.bookshop_day':'bookshop','bg.market_day':'market','bg.club_day':'club','bg.river_day':'river','bg.busstop_day':'busstop','bg.city_gallery_day':'city-gallery'})[bg]??'campus';
  const n={id,label:`${w}주 ${days[d]} · ${extra.title??'함께 남기는 하루'}`,week:w,weekday:d,day:`story-w${String(w).padStart(2,'0')}-${d}`,background:bg,location,season:w>=17?'summer':w>=9?'earlySummer':'spring',timeOfDay:bg.endsWith('_night')?'night':'day',cast,outfits:Object.fromEntries(cast.map(c=>[c,c==='doa'?'mid130a':'spring'])),wardrobeRevision:'0.9.0',lines,next,...extra};
  n.outfits={...wardrobeFor(n),...extra.outfits};if(n.timeOfDay==='evening')n.lighting280='dusk';
  if(cast.includes('yuna')&&extra.onDuty)n.clothingChanges={yuna:true};
  if(cast.length===1)n.lines=n.lines.map(l=>l.speaker==='player'&&!l.cast?.length?{...l,cast:[...cast],stageCast:[...cast]}:l);
  const fallback=typeof n.next==='string'?n.next:Array.isArray(n.next)?n.next.find(b=>!b.when)?.node:extra.choices?.find(c=>c.id===extra.migrationDefault)?.next;
  if(typeof fallback==='string')n.migrationNext280=fallback;
  map.set(id,n);changed.add(id);return n;
 };
 const hasEdge=(value,target)=>typeof value==='string'?value===target:value?.some(b=>b.node===target);
 const before=(target,id)=>{if(!map.has(target))return false;for(const n of [...map.values()]){const direct=hasEdge(n.next,target),choice=n.choices?.some(c=>hasEdge(c.next,target));if(direct||choice){const copy=edit(n.id);if(direct)copy.next=retarget(n.next,target,id);if(choice)copy.choices=n.choices.map(c=>hasEdge(c.next,target)?{...c,next:retarget(c.next,target,id)}:c);}}return true;};
 const tuesday=w=>w===2?'Q02':w===3?'Q03':w===4?'WEEK4_tue_PLAN':w<9?`W0${w}_TUE`:`LATE${w}_TUE`;
 const midweek=w=>w<9?`LIFE${w}_MID`:`LATE${w}_LIFE`;
 const satAnchor={2:'LIFE2_SAT',3:'LIFE3_SAT',4:'CHERRY04',5:'W05_MT_TRAVEL',6:'LIFE6_SAT',7:'LIFE7_SAT'};

 // A real reunion in week 9. The old week-15 IDs remain usable by old saves.
 const old9=edit('LATE9_THU');
 const after9=old9.next;old9.next='R280_DOA9';
 make('R280_DOA9',9,'thu','bg.office_day',['doa'],[
  L('과제에 쓸 교내 자료 안내를 받으러 다른 학과 사무실에 들렀다. 반납함 옆에서 안내 책자를 묶던 조교가 내 목소리에 고개를 들었다.'),
  L('복학했어요? 잠깐, 정말 오랜만이네요.','doa'),
  L('백도아였다. 입대 전에 혼자 좋아했던 선배. 이름을 듣기 전에는 그냥 지나갈 수 있을 줄 알았는데, 익숙한 목소리에 대답이 한 박자 늦었다.','narrator',{audioQuiet:true,textMode:'thought'}),
  L('선배는 여기서 일하고 계셨어요? 저는 이번 학기에 돌아왔어요.','player'),
  L('다른 학과 조교로 와 있어요. 지금은 책자만 정리하면 끝나요. 급한 일 없으면 밖에서 잠깐 얘기할래요?','doa')
 ],'R280_DOA9_AFTER',{title:'자료실 앞에서 다시 만난 이름',effects:[{type:'meet',character:'doa'},flag('doaEarly280'),exp('doa-reunion')],music:'piano-tender'});
 make('R280_DOA9_AFTER',9,'thu','bg.campus_day',['doa'],[L('사무실 불을 끄고 나온 도아와 건물 앞 계단에 잠깐 앉았다. 나는 익숙한 이름과 달리 아직 모르는 지금의 생활부터 물었다.'),L('옛날에는 선배가 늘 바쁜 사람인 줄만 알았어요. 요즘은 어때요?','player'),L('여전히 바쁘긴 한데, 바쁘다는 대답으로 다 끝내고 싶지는 않아요. 네 얘기도 더 듣고 싶네요. 개인 번호 나눠도 괜찮아요?','doa')],null,{title:'예전 이름 옆의 지금',migrationDefault:'later',choices:[C('contact','반갑다고 답하고 개인 번호를 나눈다.','R280_DOA9_SAVED',[{type:'contact',character:'doa'},rel('doa')]),C('later','오늘은 인사하고 다음에 다시 이야기하고 싶다고 한다.','R280_DOA9_LEAVE',[flag('doaContactDeferred280')])]});
 make('R280_DOA9_SAVED',9,'thu','bg.home_night',[],[L('집에 돌아오니 도아가 먼저 메시지를 보냈다. 예전에는 보내지 못했던 답장을 이번에는 짧게 적었다.'),L('“오늘 반가웠어요. 다음에는 네가 요즘 좋아하는 곳도 알려 줘요. 예전 기억만으로 고르지 말고요.”')],after9,{title:'이번에는 이어지는 대화창',effects:[msg('doa9-first280','doa','오늘 반가웠어요. 다음에는 네가 요즘 좋아하는 곳도 알려 줘요. 예전 기억만으로 고르지 말고요.')]});
 make('R280_DOA9_LEAVE',9,'thu','bg.campus_day',['doa'],[L('그럼 학교에서 보면 먼저 인사해요. 오늘 다 못 한 얘기는 다음에 이어도 되니까.','doa')],after9,{title:'다음 인사를 남겨 두고'});
 const reunion=edit('DOA15_REUNION'),oldLines=reunion.lines;
 reunion.lines=[...oldLines.map(l=>({...l,when:all(l.when,not(has('doaEarly280')))})),L('공개특강 접수대에서 도아가 먼저 손을 흔들었다. 얼마 전 다시 만난 뒤로 오늘은 명찰을 단 선배를 보러 온 날이었다.','narrator',{when:has('doaEarly280')}),L('오늘은 안내문 말고 강연 들으러 왔네요. 끝나면 어떤 얘기가 남았는지 저도 듣고 싶어요.','doa',{when:has('doaEarly280')})];
 const after15=edit('DOA15_AFTER');after15.lines=[L('특강이 끝나고 도아와 안내 책자를 정리했다. 강연에서 말한 계획과 실제로 바라는 하루가 어떻게 다른지 이야기가 이어졌다.'),L('지난번 이후에 하고 싶은 일이 조금 바뀌었어요. 아는 사람한테도 다시 말해야 알게 되는 거겠죠.','doa'),L('아직 개인 번호를 나누지 않았다면 오늘 다시 물어볼 수도 있었다.','narrator',{when:not(contact('doa'))})];
 // Existing contacts do not need to exchange numbers a second time.
 after15.choices.find(c=>c.id==='contact').label='앞으로도 개인적으로 안부 나누고 싶다고 말한다.';
 for(let w=10;w<=15;w++){
  const mon=edit(`LATE${w}_MON`),prior=mon.next,id=`R280_DOA_CONTACT_${w}`,catchup=`R280_DOA_CATCHUP_${w}`;mon.next=catchup;
  make(catchup,w,'mon','bg.office_day',['doa'],[L('자료실 안내문을 반납하러 들렀다가 익숙한 목소리에 걸음을 멈췄다. 백도아, 입대 전 혼자 좋아했던 선배였다.'),L('복학했어요? 정말 오랜만이네요. 요즘 어떻게 지내는지 잠깐 얘기하고 싶어요.','doa')],id,{title:'늦게 이어 온 인사',when:not({met:'doa'}),effects:[{type:'meet',character:'doa'}],exitEffects:[flag('doaEarly280')]});
  make(id,w,'mon','bg.office_day',['doa'],[L('학과 건물 앞에서 도아와 짧게 마주쳤다. 급히 지나가는 인사 대신 오늘은 다음 얘기를 남겼다.'),L('개인적으로 안부 묻고 싶다고 했던 말, 아직 괜찮아요? 이번엔 제가 먼저 번호 물어볼게요.','doa')],prior,{when:all(not(contact('doa')),not(has('doaContactDeferred280'))),title:'한 번 더 이어 보는 인사',migrationDefault:'later',choices:[C('contact','좋다고 답하고 번호를 나눈다.',prior,[{type:'contact',character:'doa'}]),C('later','아직은 학교에서 만나며 더 이야기하고 싶다고 한다.',prior,[flag('doaContactDeferred280')])]});
  for(const slot of ['main','extra']){
   const prefix=`R280_DOA${w}_${slot}`,appointmentId=slot==='main'?`plan-w${String(w).padStart(2,'0')}`:`late-extra-w${w}`,activityFlag='late'+(slot==='main'?'Main':'Extra')+'Activity'+w,personFlag='late'+(slot==='main'?'Main':'Extra')+'Person'+w;
   const dates=slot==='main'?['tue','thu']:['fri'];
   make(prefix,w-1,'sun','bg.home_night',[],[L('도아의 대화창을 열었다. 예전에 알고 있던 곳 말고 요즘 같이 가 보고 싶은 장소를 골랐다.')],null,{title:'도아와 보낼 다음 시간',choices:[C('a0','카페에서 서로의 요즘 하루 이야기하기',prefix+'_TIME0'),C('a1','캠퍼스를 걸으며 옛날과 달라진 취향 나누기',prefix+'_TIME1')]});
   edit(slot==='main'?`LATE${w}_SUNDAY`:`LATE${w}_EXTRA`).choices.push(C('doa','도아에게 연락한다.',prefix,[],contact('doa')));
   for(let i=0;i<2;i++){
    make(prefix+'_TIME'+i,w-1,'sun','bg.home_night',[],[L('선배가 끝나는 시각과 내 수업표를 나란히 보고 가능한 날을 골랐다.')],null,{title:'서로 가능한 날',choices:dates.map(d=>C(d,`${days[d]} ${slot==='main'?'15:30':'12:20'}`,prefix+'_'+i+'_'+d+'_SEND'))});
    for(const d of dates){const p=prefix+'_'+i+'_'+d,time=slot==='main'?'15:30':'12:20',bg=i?'bg.campus_day':'bg.cafe_day',place=i?'학과 건물 옆 산책길':'온유 창가',label=i?'도아와 캠퍼스 산책':'도아와 요즘 하루 나누기',details={id:appointmentId,character:'doa',week:w,day:d,time,label,place,activity:'earlydoa'+i,purpose:'weekly'};
     const text=`${days[d]} ${time}에 ${place}에서 만날까요? 이번엔 ${i?'요즘 즐거운 것들 이야기하면서 걷고 싶어요.':'서로의 요즘 하루가 궁금해요.'}`;
     make(p+'_SEND',w-1,'sun','bg.home_night',[],[L('“'+text+'”')],p+'_REPLY',{title:'먼저 보내는 연락',effects:[msg(p+'-out','doa',text,'out'),{type:'appointment',...details,status:'pending'}]});
     const reply=['좋아요. 이번엔 제가 먼저 창가 자리 찾아볼게요.','그날 괜찮아요. 책상에 명찰 놓고 가볍게 나갈게요.','저도 다음에 무슨 얘기할까 생각했어요. 그때 만나요.','좋아요. 예전 얘기보다 지금 궁금한 것도 하나씩 가져와요.','시간 맞아요. 만나기 전까지 얘기를 다 보내지는 않을게요.','강연 준비 끝내고 나갈 수 있어요. 네 얘기를 들으면 잠깐 머리도 쉬겠네요.'][(w-10+i)%6];
     make(p+'_REPLY',w-1,'sun','bg.home_night',[],[L('“'+reply+'”')],null,{title:'도아가 남긴 답장',effects:[msg(p+'-in','doa',reply)],choices:[C('confirm','이 시간으로 약속을 확정한다.',p+'_SET',[{type:'appointment',...details,status:'confirmed'},flag(personFlag,'doa'),flag(activityFlag,'earlydoa'+i),...(slot==='main'?[flag('lateMainDay'+w,d)]:[])]),C('defer','이번에는 다음 기회로 남긴다.',p+'_SET',[{type:'appointment',...details,status:'deferred'}])]});
     const back=slot==='main'?`LATE${w}_EXTRA`:`LATE${w}_MON`;
     make(p+'_SET',w-1,'sun','bg.home_night',[],[L('서로 정한 시간만 달력에 남겼다. 안부 한 줄을 더 적고 대화창을 닫았다.')],back,{title:'다음 만남이 있는 일요일',scheduledAppointmentId:appointmentId});
     const end=d==='tue'?`LATE${w}_WED`:d==='thu'?(w===15?'DOA15_REUNION':`LATE${w}_INCOMING`):`LATE${w}_PEERS`;
     const gate=edit(`LATE${w}_${d.toUpperCase()}`);gate.next=[{when:all({appointment:appointmentId,status:'confirmed'},has(personFlag,'doa'),has(activityFlag,'earlydoa'+i),slot==='main'?has('lateMainDay'+w,d):null),node:p+'_ARRIVE'},...(Array.isArray(gate.next)?gate.next:[{node:gate.next}])];
     make(p+'_ARRIVE',w,d,bg,['doa'],[L(`${place}에 먼저 도착해 물을 한 모금 마셨다. 도아는 휴대폰을 가방에 넣고 맞은편에 앉았다.`, 'narrator',{footsteps:true}),L('오늘은 무슨 얘기부터 해 볼까요?','doa')],null,{title:`도아와 함께 고른 시간`,appointmentId,choices:[C('continue','지난번 못 다 한 도아의 이야기를 듣는다.',[...[1,2,3,4].map(k=>({when:all(not(has('arcdoa'+k)),...Array.from({length:k-1},(_,j)=>has('arcdoa'+(j+1)))),node:p+'_ARC'+k})),{node:p+'_DAILY'}]),C('daily','오늘은 요즘 즐거웠던 일부터 나눈다.',p+'_DAILY')]});
     for(let k=1;k<=4;k++){const a=P.doa.arcs[k-1];make(p+'_ARC'+k,w,d,bg,['doa'],[L(a[1],'doa'),L(a[2]),L(a[3],'player')],null,{title:a[0],appointmentId,choices:[C('a',a[4],p+'_ARC'+k+'_a',[flag('arcdoa'+k),rel('doa',1,1)]),C('b',a[5],p+'_ARC'+k+'_b',[flag('arcdoa'+k),rel('doa',0,2)])]});for(const [choice,index]of [['a',6],['b',7]])make(p+'_ARC'+k+'_'+choice,w,d,bg,['doa'],[L(a[index],'doa')],p+'_DONE',{title:'다음에 다시 물어볼 말',appointmentId});}
     const topic=topics.doa[(w+i)%3];make(p+'_DAILY',w,d,bg,['doa'],[L(topic[1],'doa'),L(topic[2]),L('나는 오늘의 내 얘기도 하나 꺼냈다. 도아는 예전의 내가 아니라 지금 말하는 쪽을 보고 있었다.')],p+'_DONE',{title:topic[0],appointmentId});
     make(p+'_DONE',w,d,bg,['doa'],[L('돌아갈 시간이 되어 함께 자리에서 일어났다. 이번엔 만나기 전보다 다음에 묻고 싶은 게 조금 더 많아졌다.')],p+'_LEAVE',{title:'같이 보낸 시간이 남고',appointmentId,exitEffects:[{type:'appointment',...details,status:'completed'},{type:'date',character:'doa',id:p+'-date'}]});
     make(p+'_LEAVE',w,d,bg,['doa'],[L('다음에 만나면 오늘 말한 얘기가 어떻게 됐는지도 들려줘요.','doa')],end,{title:'도아와 헤어지기 전',effects:[msg(p+'-after','doa',checkin280('doa',w))],giftTarget280:'doa'});
    }
   }
  }
 }

 // Existing early incoming schedules are replayable for saved history only.
 // New invitations use the independent evening/lunch channels below.
 for(let w=2;w<=7;w++)for(const c of people.filter(c=>c!=='doa')){
  const id=`INBOUND${w}_${c}`;if(!map.has(id))continue;const n=edit(id),schedule=n.choices?.find(ch=>ch.id==='schedule');if(schedule)schedule.replayOnly=true;
  n.choices.push(C('reply280','안부에 답하고 내 쪽의 하루도 들려준다.',id+'_LATER'));
 }
 // Old check-in threads become conversations, never consumers of Sunday slots.
 for(let w=9;w<=24;w++)for(const c of people){
  const id=`LATE${w}_INCOMING_${c}`,text=checkin280(c,w),n=edit(id);n.lines=[L('“'+text+'”')];n.effects=[msg(id+'-checkin280',c,text,'in',contact(c))];
  const reply=edit(id+'_REPLY');reply.lines=[L('바로 잘 지낸다고 쓰려다가 오늘 있었던 일 하나를 적었다. 대화는 약속을 잡는 용건 없이도 조금 더 이어졌다.')];reply.effects=[msg(id+'-reply280',c,['jiwoo','haerin','yuna'].includes(c)?'연락 반갑다. 나는 오늘 이런 일이 있었어. 다음에 네 얘기도 더 듣고 싶어.':'연락 반가워요. 저는 오늘 이런 일이 있었어요. 다음에 그 얘기도 더 듣고 싶어요.','out')];reply.next=`LATE${w}_FRI`;
  n.choices.find(c=>c.id==='reply').label='오늘 내 일도 들려주며 안부에 답한다.';
 }

 // Two NPC invitations use their own IDs and fixed, separate evening slots.
 for(let w=2;w<=24;w++){
  if([8,16].includes(w)||!map.has(tuesday(w)))continue;
  const inbox=`R280_INBOX${w}_A`,target=tuesday(w);before(target,inbox);
  for(const [slot,d,time,anchor]of [['A','thu','19:30',w<9?`INBOUND${w}`:w===15?null:`LATE${w}_INCOMING`],['B','fri','20:00',w<9?satAnchor[w]:`LATE${w}_SAT`]]){
   const id=`R280_INBOX${w}_${slot}`,back=slot==='A'?`R280_INBOX${w}_B`:target,appointmentId=`npc280-w${w}-${slot}`,selected=`npc280Person${w}${slot}`;
   if(!anchor||!map.has(anchor)){make(id,w,'tue','bg.home_night',[],[L('오늘은 정해 둔 다른 일정부터 챙기기로 했다.')],back,{when:{flag:'unused280'},title:'이번 주의 빈칸'});continue;}
   const eligible=w<10?people.filter(c=>c!=='doa'):people,offset=(w+(slot==='B'?3:0))%eligible.length,order=[...eligible.slice(offset),...eligible.slice(0,offset)];
   const chooseRule=(c,i)=>all(contact(c),...order.slice(0,i).map(previous=>not(all(contact(previous),slot==='B'?not(has(`npc280Person${w}A`,previous)):null))),slot==='B'?not(has(`npc280Person${w}A`,c)):null);
   const effects=[];order.forEach((c,i)=>{const when=chooseRule(c,i),place=venues[c][0],text=invite280(c,w,d,time,place),details={id:appointmentId,character:c,week:w,day:d,time,endTime:slot==='A'?'20:10':'20:40',label:names[c]+'의 제안으로 잡은 짧은 만남',place,purpose:'npc280',origin:'incoming'};effects.push(flag(selected,c,when),msg(id+'-'+c,c,text,'in',when),{type:'appointment',...details,status:'pending',when});});
   make(id,w,'tue','bg.home_day',[],[L('수업 자료를 챙기던 중 개인 대화창에 먼저 연락이 왔다. 일요일에 내가 정한 약속과는 다른 저녁 시간이었다.'),...order.map(c=>L('“'+invite280(c,w,d,time,venues[c][0])+'”','narrator',{when:has(selected,c)}))],back,{title:'먼저 온 초대',scheduledAppointmentId:appointmentId,when:any(...order.map((c,i)=>chooseRule(c,i))),effects,migrationDefault:'later',choices:[C('accept',`${days[d]} ${time} · 초대를 받아 별도 약속으로 남긴다.`,id+'_ANSWER',order.flatMap(c=>[{type:'appointment',id:appointmentId,status:'confirmed',when:has(selected,c)},msg(id+'-yes-'+c,c,`${days[d]} ${time}에 갈게${['jiwoo','haerin','yuna'].includes(c)?'.': '요.'}`,'out',has(selected,c))])),C('decline','이번에는 어렵다고 솔직히 답한다.',id+'_ANSWER',order.flatMap(c=>[{type:'appointment',id:appointmentId,status:'declined',when:has(selected,c)},msg(id+'-no-'+c,c,'초대해 줘서 고마워요. 이번 저녁은 쉬고 싶어서 다음에 같이 가고 싶어요.','out',has(selected,c))])),C('later','지금은 날짜를 확정하지 않고 다음에 다시 이야기한다.',id+'_ANSWER',order.map(c=>({type:'appointment',id:appointmentId,status:'deferred',when:has(selected,c)})))]});
   make(id+'_ANSWER',w,'tue','bg.home_night',[],[L('답장을 보내고 달력을 덮었다. 먼저 만나자고 해 준 말에 내 쪽의 마음도 짧게 얹었다.')],back,{title:'서로 다른 약속 칸',scheduledAppointmentId:appointmentId});
   const gate=`R280_NPC${w}_${slot}_GATE`;before(anchor,gate);
   make(gate,w,d,'bg.campus_day',[],[L('수업을 마치고 가방을 챙겼다. 오늘 저녁은 먼저 연락해 준 사람과 잠깐 만나기로 했다.')],[...order.map(c=>({when:all({appointment:appointmentId,status:'confirmed'},has(selected,c)),node:gate+'_'+c})),{node:anchor}],{title:'받아 둔 초대의 저녁',when:{appointment:appointmentId,status:'confirmed'}});
   for(const c of order){const [place,bg,location]=venues[c],p=gate+'_'+c,topic=topics[c][(w+(slot==='B'?1:0))%3];
    make(p,w,d,bg,[c],[L(`${place}에 도착했다. 먼저 나를 알아본 ${names[c]}의 손이 사람들 사이로 올라왔다.`,'narrator',{footsteps:true}),L(topic[1],c),L(topic[2])],null,{title:topic[0],location,timeOfDay:'evening',appointmentId,onDuty:{yuna:false},choices:[C('listen',topic[3],p+'_LISTEN',[flag('npc280Memory_'+c,'listen'),rel(c)]),C('share','나도 비슷했던 하루를 꺼내며 가볍게 웃는다.',p+'_SHARE',[flag('npc280Memory_'+c,'share'),rel(c)])]});
    make(p+'_LISTEN',w,d,bg,[c],[L(topic[4],c),L('처음 물어본 말에서 조금 옆으로 샜지만, 그쪽에도 오늘만 할 수 있는 얘기가 있었다.')],p+'_DONE',{title:'대답 뒤에 이어진 말',location,timeOfDay:'evening',appointmentId,onDuty:{yuna:false}});
    make(p+'_SHARE',w,d,bg,[c],[L('내 실수를 먼저 얘기하자 상대도 아까 말하지 못했던 작은 일을 덧붙였다. 서로 웃을 때는 대답을 잘 골라야 한다는 생각이 잠깐 사라졌다.')],p+'_DONE',{title:'서로의 사소한 하루',location,timeOfDay:'evening',appointmentId,onDuty:{yuna:false}});
    make(p+'_DONE',w,d,bg,[c],[L('정한 시각이 되어 다음 일정을 확인하고 헤어졌다. 먼저 온 초대에 답한 날도 내 주의 한 칸으로 남았다.')],anchor,{title:'초대에 답한 하루',location,timeOfDay:'evening',onDuty:{yuna:false},appointmentId,giftTarget280:c,exitEffects:[{type:'appointment',id:appointmentId,status:'completed'},{type:'date',character:c,id:p+'-date'},exp('npc280-met-'+w+'-'+slot)]});
   }
  }
 }

 // Part-time work has an actual shift, a small decision, and pay only at completion.
 for(const w of [6,10,12,14,17,20,22]){
  const target=midweek(w),p=`R280_WORK${w}`;before(target,p);
  const jobs={6:['포장 주문이 겹친 오후','종류가 비슷한 봉투를 묶다가 주문표 두 장이 겹친 것을 발견했다.'],10:['주문이 밀린 오후','남은 재료로 주문을 더 받을 수 있는지 확인해야 했다.'],12:['비 오는 날의 매장','우산을 접는 손님이 입구에 몰려 주문을 듣는 소리가 자꾸 묻혔다.'],14:['시험 전 짧은 근무','빨리 끝내고 공부하러 가고 싶어 마감표를 먼저 접으려다 빠진 항목을 봤다.'],17:['새로 온 동료 옆에서','처음 나온 동료가 포장 순서를 헷갈렸다. 내가 대신 끝내 버리면 빨랐지만 다음 주문도 곧 들어왔다.'],20:['여행 뒤 다시 돌아온 근무','오랜만에 정리한 재고표와 실제 수량이 맞지 않았다.'],22:['익숙해진 일의 작은 실수','포장 개수는 맞았지만 영수증 한 장을 잘못 끼워 넣은 것을 알아챘다.']}[w];
  make(p,w,'wed','bg.cafe_day',['yuna'],[L('온유에 세 시간 포장 보조가 필요한 공고가 나왔다. 유나는 점장이 가능한 시간을 확인했다며 내 수업이 끝난 뒤인지 먼저 물었다.'),L('수요일 세 시부터 여섯 시야. 가능하면 같이 일하고, 어려우면 이번엔 다른 사람 구하면 돼.','yuna')],null,{title:'내 시간으로 번 돈',next:target,when:{met:'yuna'},onDuty:{yuna:true},migrationDefault:'skip',choices:[C('accept','15:00~18:00 포장 보조 근무를 맡는다.',p+'_SHIFT',[flag('work280Accepted'+w)],{slotFree280:{week:w,day:'wed',start:'15:00',end:'18:00'}}),C('skip','오늘은 과제와 내 일정을 먼저 챙긴다.',target)]});
  make(p+'_SHIFT',w,'wed','bg.cafe_day',['yuna'],[L('가게에 도착해 앞치마를 두르고 손을 씻었다. 오늘 할 일과 휴게 순서를 확인한 뒤 주문표를 받았다.','narrator',{footsteps:true}),L(jobs[1]),L('나는 하던 손을 잠깐 멈추고 어떻게 할지 골랐다.')],null,{title:jobs[0],onDuty:{yuna:true},weather:w===12?'rain':undefined,choices:[C('check','동료에게 상황을 설명하고 함께 확인한다.',p+'_CHECK',[flag('work280Choice'+w,'check')]),C('own','내가 확인한 범위부터 정리하고 남은 부분을 전달한다.',p+'_OWN',[flag('work280Choice'+w,'own')])]});
  make(p+'_CHECK',w,'wed','bg.cafe_day',['yuna'],[L('말해 줘서 고마워. 이쪽부터 같이 보면 되겠다. 손이 멈춘 이유를 알면 다음 순서도 맞출 수 있어.','yuna'),L('확인한 주문부터 다시 묶었다. 한 번 물어본 덕분에 나중에 뜯어 볼 봉투가 줄었다.')],p+'_PAY',{title:'함께 맞춘 순서',onDuty:{yuna:true}});
  make(p+'_OWN',w,'wed','bg.cafe_day',['yuna'],[L('내가 확인한 것과 아직 모르는 것을 구분해 전했다. 동료는 남은 표를 가져가 다음 주문과 비교했다.'),L('여기까지 봤다는 표시가 있으니까 찾기 쉽네. 마감 전에 한 번만 같이 보자.','yuna')],p+'_PAY',{title:'어디까지 했는지 남기는 일',onDuty:{yuna:true}});
  make(p+'_PAY',w,'wed','bg.cafe_day',['yuna'],[L('18:00, 작업대와 포장 수량을 함께 확인하고 앞치마를 벗었다. 세 시간 근무의 급여 36,000원이 입금됐다.'),L('휴대폰에 찍힌 금액을 보고 나니 일요일에 작은 선물을 구경해도 되겠다는 생각이 들었다. 무엇을 사는지는 내가 정하되 생활비도 같이 남겨 둬야 했다.')],target,{title:'일한 뒤에 들어온 급여',onDuty:{yuna:true},exitEffects:[{type:'money',amount:36000},exp('work280-paid'),exp('work280-paid-'+w)]});
 }

 // Minjun gets his own friendship scenes rather than acting as a route announcer.
 for(const [week,data]of Object.entries(buddyTopics)){
  const w=+week,target=w===9?'LATE9_QUIET_SAT':midweek(w),d=w===9?'sat':'wed',p=`R280_MINJUN${w}`;before(target,p);
  const attended=w===6?{experience:'spring-mt-attended'}:w===20?any(...['sea','valley','pool'].map(v=>({experience:'summer-mt-'+v}))):null;
  make(p,w,d,w===12||w===23?'bg.market_day':'bg.cafe_day',[],[L(data[2],'narrator',{when:attended}),L(data[1],'minjun',{when:attended}),...(attended?[L('민준은 같이 가지 않은 주말을 내가 함께 보낸 것처럼 묻지 않았다. 대신 내 쪽에서 보낸 시간이 어땠는지 물었다.','narrator',{when:not(attended)}),L('그럼 네 쪽의 하루는 어땠냐? 남들 다녀온 얘기 말고 네가 실제로 뭘 했을 때 편했는지가 궁금해.','minjun',{when:not(attended)})]:[]),L('민준은 내 쪽으로 몸을 조금 돌렸다. “그렇게 느끼는 이유는 뭔데?”','narrator',{audioQuiet:true})],null,{title:data[0],music:'piano-reflect',migrationDefault:'keep',choices:[C('connection','누군가와 가까워지고 싶지만 조급해지는 내 마음을 말한다.',p+'_connection',[flag('player280Focus','connection')]),C('balance','해야 할 일을 자꾸 뒤로 미루는 게 신경 쓰인다고 한다.',p+'_balance',[flag('player280Focus','balance')]),C('fear','기대했다가 실망할까 봐 먼저 멈추게 된다고 말한다.',p+'_fear',[flag('player280Focus','fear')]),C('keep','오늘은 잘 모르겠다고 말하고 민준의 하루도 묻는다.',p+'_keep')]});
  for(const [index,key]of ['connection','balance','fear','keep'].entries())make(p+'_'+key,w,d,w===12||w===23?'bg.market_day':'bg.cafe_day',[],[L(buddyAnswers[w][index],'minjun',{when:attended}),...(attended?[L(['그럼 네가 편했던 순간부터 들어 볼래. 남이 즐거웠던 걸 따라갈 필요는 없으니까.','이번 주에 실제로 해 본 게 뭔지부터 말해 봐. 나도 못 끝낸 것보다 그 얘기부터 하려고.','쉬었다고 말하면 뒤처진 것 같냐? 네가 직접 고른 하루였으면 그 얘기도 듣고 싶은데.','나도 꼭 잘 논 얘기만 하려던 건 아니야. 오늘 같이 밥 먹으니까 그냥 궁금했어.'][index],'minjun',{when:not(attended)})]:[]),L('나는 당장 결론을 내리지는 않았다. 민준은 자기 얘기도 이어 했고, 남은 음료를 마시며 내일의 일정을 확인했다.')],target,{title:'정답 대신 내 이유',music:'piano-reflect',exitEffects:[exp('minjun280-talk-'+w)]});
 }
 edit('MT090_CHANGE').lines.push(L('민준이 봉투에서 소금 대신 설탕을 꺼내 들고 잠깐 멈췄다. “장보기 완벽했다고 한 사람 누구냐.” 내가 손을 들자 본인이 들겠다며 웃었다.'));
 edit('W05_MT_GAME').lines.splice(2,0,L('나 손가락 부족한데 발가락 써도 되냐? 규칙 위반이면 질문을 좀 쉽게 해 줘.','minjun'));
 edit('MT090_STAY').lines=[L('산책 나간 사람들을 보내고 민준과 빈 컵을 모았다. 민준은 남은 간식을 숨겨 둘까 하다가 내 앞에 봉투를 밀었다.'),L('오늘 뭐 할지 고민 많이 했냐? 누구 옆에 앉을까 말고, 네가 그냥 편했던 순간도 있었는지 궁금해서.','minjun'),L('나는 게임에서 모른다고 웃으며 손들었던 순간을 말했다. 민준은 자기도 반가웠다며 다음에는 우리끼리도 밥 한 번 먹자고 했다.'),L('컵을 씻고 남은 탄산수를 나눴다. 다른 사람들이 돌아오기 전까지 수업과 돈, 다음 주 아침에 일어날 수 있을지 같은 이야기가 이어졌다.')];
 for(const v of ['sea','valley','pool']){
  edit(`MT19_${v}_ARRIVE`).lines.push(L('민준이 짐을 내려놓고 “이번엔 슬리퍼 두 짝 다 챙겼다”라고 했다. 아무도 묻지 않았는데 먼저 말해서 다 같이 웃었다.'));
  edit(`MT19_${v}_GAME`).lines.unshift(L('민준이 맥주와 탄산수를 나눠 놓고 먼저 자기 잔을 들었다. 이번에는 물에 들어가기 전에 겁먹었던 이야기를 먼저 털어놨다.'),L('오늘 제일 잘한 일? 나는 무섭다고 말한 거. 괜히 멀리 갔다가 돌아오는 길에 멋있는 척 못 할 뻔했거든.','minjun'));
 }

 // Sunday shopping uses money already earned; inventory is one actual gift per item.
 for(const target of [...map.values()].filter(n=>/^SUN0[1-7]$|^LATE\d+_SUNDAY$/.test(n.id)).map(n=>n.id)){
  const old=map.get(target),w=old.week,p='R280_SHOP'+w;if(w<4||map.has(p))continue;before(target,p);
  make(p,w,'sun','bg.market_day',[],[L('일요일 저녁 약속을 정하기 전에 동네 가게에 들렀다. 일한 돈 일부로 작은 선물을 골라도 되고, 오늘은 내 생활비를 그대로 남겨 둬도 됐다.'),L('건네고 싶은 이유가 떠오르는 물건만 골라 보기로 했다. 사는 것만으로 상대가 좋아할 거라는 답까지 따라오지는 않았다.')],null,{title:'일요일 오후의 작은 선물',next:target,when:any({experience:'work280-paid'},{experience:'first-shift-completed'}),migrationDefault:'skip',choices:[C('skip','오늘은 사지 않고 저녁 일정을 정한다.',target),...GIFTS280.map(g=>C(g.id,`${g.name} · ${g.price.toLocaleString('ko-KR')}원`,p+'_'+g.id,[{type:'money',amount:-g.price},flag('gift280_'+g.id)],all({moneyAtLeast:g.price},not(has('gift280_'+g.id)))))]});
  for(const g of GIFTS280)make(p+'_'+g.id,w,'sun','bg.market_day',[],[L(`${g.name}를 계산하고 봉투에 넣었다. 다음에 직접 만났을 때 건넬 수도 있고, 아직은 가방에 남겨 둬도 됐다.`)],target,{title:'가방에 넣은 작은 마음'});
 }
 // Invitations spoken in person reserve next Monday lunch, not Sunday's slots.
 const personalEnds=[...map.values()].filter(n=>n.giftTarget280||/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_.*_LEAVE$/.test(n.id));
 for(const n of personalEnds){
  const tw=n.week+1;if(tw>24||[8,16].includes(tw))continue;
  const c=n.giftTarget280??n.id.match(/^PLAN\d+_([^_]+)_/)[1],id=`conversation280-w${tw}`,p='R280_SPOKEN_'+n.id,back=n.next;
  edit(n.id).next=p;
  const details={id,character:c,week:tw,day:'mon',time:'12:10',endTime:'12:45',label:names[c]+'의 제안으로 잡은 점심',place:'학생회관 옆 작은 카페',purpose:'npc280',origin:'conversation'};
  make(p,n.week,n.weekday,n.background,[c],[L({seoyeon:'다음 주 월요일에 점심 같이 먹을래요? 원고 이야기 말고 선배 하루도 더 듣고 싶어요.',jiwoo:'월요일 점심 같이 먹을래? 오늘 웃긴 얘기 하다 보니 시간 다 갔네.',haerin:'다음 주 월요일 점심 비어? 이번엔 내가 먼저 기다리고 있을게.',yuna:'월요일은 나 늦게 출근해. 그 전에 같이 점심 먹을래?',minseo:'다음 주 월요일 점심을 같이 먹고 싶어요. 제가 먼저 부탁해 봐도 될까요?',doa:'다음 주 월요일에는 제가 먼저 점심 약속 잡아도 돼요? 오늘 얘기를 조금 더 듣고 싶어요.'}[c],c),L('학생회관 옆 카페에서 12:10~12:45. 서로 다음 수업에 늦지 않게 짧게 만나기로 했다.')],back,{title:'상대가 먼저 남기는 다음 약속',outfits:n.outfits,location:n.location,timeOfDay:n.timeOfDay,onDuty:{yuna:false},when:all(contact(c),appFree(id)),effects:[{type:'appointment',...details,status:'pending'},flag('conversation280Person'+tw,c)],migrationDefault:'later',choices:[C('accept','월요일 점심 초대를 받고 별도 일정으로 남긴다.',p+'_YES',[{type:'appointment',id,status:'confirmed'},msg(p+'-yes',c,'월요일 12:10에 학생회관 옆 카페에서 만나요. 초대해 줘서 반가워요.','out')]),C('later','이번에는 어렵다고 답하고 다음에 다시 만나자고 한다.',p+'_NO',[{type:'appointment',id,status:'declined'}])]});
  make(p+'_YES',n.week,n.weekday,n.background,[c],[L(['jiwoo','haerin','yuna'].includes(c)?'좋아. 이번엔 내가 먼저 연락하고 기다릴게.':'좋아요. 이번에는 제가 먼저 연락하고 기다릴게요.',c)],back,{title:'먼저 불러 준 사람의 점심',outfits:n.outfits,location:n.location,timeOfDay:n.timeOfDay,onDuty:{yuna:false}});
  make(p+'_NO',n.week,n.weekday,n.background,[c],[L(['jiwoo','haerin','yuna'].includes(c)?'응, 그럼 다음에. 오늘 얘기한 건 그냥 기억해 둘게.':'네, 그럼 다음에요. 오늘 얘기한 건 그냥 기억해 둘게요.',c)],back,{title:'부담 없이 남겨 둔 다음',outfits:n.outfits,location:n.location,timeOfDay:n.timeOfDay,onDuty:{yuna:false}});
 }
 for(let w=3;w<=24;w++){
  if([8,16].includes(w))continue;const target=`R280_INBOX${w}_A`;if(!map.has(target))continue;
  const gate=`R280_LUNCH${w}`,id=`conversation280-w${w}`,lunchPeople=w<10?people.filter(c=>c!=='doa'):people;before(target,gate);
  make(gate,w,'mon','bg.cafe_day',[],[L('지난번 헤어지기 전에 같이 점심을 먹자고 했던 말이 떠올랐다. 상대가 먼저 골라 준 카페로 향했다.')],[...lunchPeople.map(c=>({when:has('conversation280Person'+w,c),node:gate+'_'+c})),{node:target}],{title:'먼저 불러 준 점심',when:{appointment:id,status:'confirmed'},appointmentId:id});
  for(const c of lunchPeople){const p=gate+'_'+c,topic=topics[c][(w+2)%3];
   make(p,w,'mon','bg.cafe_day',[c],[L('카페에 도착하니 먼저 와 있던 사람이 메뉴판을 내 쪽으로 밀었다. 각자 먹고 싶은 것을 고르고, 지난번 하다 만 이야기부터 다시 꺼냈다.','narrator',{footsteps:true}),L(topic[1],c),L(topic[2])],null,{title:topic[0],appointmentId:id,onDuty:{yuna:false},choices:[C('listen',topic[3],p+'_DONE',[rel(c)]),C('share','내 쪽의 최근 일도 하나 덧붙이며 이야기를 잇는다.',p+'_DONE',[rel(c)])]});
   make(p+'_DONE',w,'mon','bg.cafe_day',[c],[L(topic[4],c),L('12:45, 다음 수업과 출근 시각을 보고 자리에서 일어났다. 평범한 점심이었지만 누군가 먼저 나를 기다렸다는 사실이 조금 오래 남았다.')],target,{title:'짧지만 이어지는 점심',appointmentId:id,onDuty:{yuna:false},giftTarget280:c,exitEffects:[{type:'appointment',id,status:'completed'},{type:'date',character:c,id:p+'-date'}]});
  }
 }
 const leaves=[...map.values()].filter(n=>n.giftTarget280||/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_.*_LEAVE$/.test(n.id));
 const giftReplies={seoyeon:{bookmark:'읽던 쪽 사이에 끼워 둘게요. 어떤 걸 읽었는지는 다음에 제가 먼저 얘기할래요.',notebook:'마지막 장부터 써도 되죠? 첫 쪽 망칠까 봐 늘 아껴 두거든요.',tea:'오늘 밤에는 원고 옆에 이 차 먼저 놓아 볼게요.'},jiwoo:{bookmark:'편집 메모에도 끼워도 되냐? 책만 읽는 사람인 척은 못 하겠는데.',notebook:'제목 후보 적는 데 써야겠다. 이상한 제목도 검사 안 하기다.',tea:'편집하면서 마실게. 컵 옆에 놓고 찍다가 다 식히지는 말아야지.'},haerin:{bookmark:'색은 네가 고른 거지? 내가 골랐을 법한 거 말고 네 눈에 들어온 걸 준 게 좋네.',notebook:'한 면쯤 비워도 되는 수첩이지? 내가 좋아하는 방식대로 써 볼게.',tea:'오늘은 이거 마시면서 작업 말고 그냥 쉬어 볼까.'},yuna:{bookmark:'휴게실에서 읽다 만 책 있어. 이번엔 내 쪽 시간을 표시해 두면 되겠다.',notebook:'근무표 말고 내 쉬는 날 적어 볼게. 자꾸 일하는 쪽부터 쓰게 되더라.',tea:'남한테 먼저 권하지 말고 내가 첫 잔 마실게. 오늘은 그러고 싶네.'},minseo:{bookmark:'설명서 말고 읽고 싶은 책에 끼워 볼게요. 그 책은 다음에 알려 줄게요.',notebook:'줄 없는 쪽이 좋네요. 정리 안 된 생각부터 써도 되겠어요.',tea:'연구실 말고 집에 두고 마실게요. 오늘은 집에 가는 길이 조금 기대되네요.'},doa:{bookmark:'예전에 제가 뭘 좋아했는지 맞히려고 고른 건 아니죠? 오늘 네가 고른 거라 더 궁금해요.',notebook:'업무 수첩이랑 따로 쓸게요. 여기는 누가 시키지 않은 얘기를 적고 싶네요.',tea:'퇴근하고 첫 잔 마실 때 오늘 얘기 생각날 것 같아요. 고마워요.'}};
 for(const n of leaves){
  const c=n.giftTarget280??n.id.match(/^PLAN\d+_([^_]+)_/)[1],oldNext=n.next,p='R280_GIFT_'+n.id;edit(n.id).next=p;
  make(p,n.week,n.weekday,n.background,[c],[L('헤어지기 전에 가방에 넣어 둔 작은 봉투가 생각났다. 오늘 건넬지, 조금 더 가지고 있을지 골랐다.')],oldNext,{title:'헤어지기 전의 작은 봉투',outfits:n.outfits,location:n.location,onDuty:{yuna:false},timeOfDay:n.timeOfDay,when:any(...GIFTS280.map(g=>has('gift280_'+g.id))),migrationDefault:'keep',choices:[C('keep','오늘은 그대로 가지고 다음 인사를 한다.',oldNext),...GIFTS280.map(g=>C(g.id,`${g.name}를 고른 이유와 함께 건넨다.`,p+'_'+g.id,[flag('gift280_'+g.id,false),flag('gift280Given_'+c,g.id),rel(c,0,1)],has('gift280_'+g.id)))]});
  for(const g of GIFTS280)make(p+'_'+g.id,n.week,n.weekday,n.background,[c],[L('이걸 보니까 오늘 같이 이야기했던 게 생각났어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.'),'player'),L(giftReplies[c][g.id],c),L('선물을 건넨 뒤에도 오늘 하던 이야기는 그대로 이어졌다. 봉투를 받는 일이 다른 약속의 대답을 대신하지는 않았다.')],oldNext,{title:'물건에 붙여 건넨 내 이유',outfits:n.outfits,location:n.location,timeOfDay:n.timeOfDay,onDuty:{yuna:false}});
 }
 for(const n of [...map.values()])if(n.id.startsWith('R280_WORK12'))edit(n.id).weather='rain';
 for(const n of [...map.values()])if(/^R280_NPC(14|21)_/.test(n.id)){const v=edit(n.id);v.weather=n.week===21?'rain':'wind';if(n.lines[0]?.footsteps)v.lines[0].text=(n.week===21?'우산을 접고 빗물을 턴 뒤 ':'바람에 옷자락을 여미며 ')+v.lines[0].text;}
 return {...base,narrativeRevision:'0.28.0',presentation280:true,sourceRevision:'28',nodes:[...map.values()]};
}
