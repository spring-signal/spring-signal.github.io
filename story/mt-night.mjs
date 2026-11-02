import {node,L,C} from './weekly-plans.mjs?v=200';
import {wardrobeFor,MT_PEOPLE} from '../runtime/wardrobe.mjs?v=200';
import {mtWalks} from './mt-walks.mjs?v=200';
import {named} from './seasonal-scenes.mjs?v=200';
const f=(key,value=true)=>({type:'flag',key,value}),exp=id=>({type:'experience',id}),rel=(character,affection=1,trust=1)=>({type:'relation',character,affection,trust});
const names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',minseo:'민서'};
const changes=Object.fromEntries(MT_PEOPLE.map(c=>[c,'챙겨 온 편한 실내복으로 갈아입었다.']));
const S=t=>L(t,'narrator',{stageCast:[]});
export function reviseMtAndWardrobe(base){
 const nodes=structuredClone(base.nodes),get=id=>nodes.find(n=>n.id===id);
 const add=(id,label,cast,lines,next,extra={})=>{const n=node(id,'5주 토요일 밤 · '+label,5,'sat','bg.spring_lodge_night',cast,lines,next,{event:'spring-mt',location:'lodge',wardrobeContext:'lounge',...extra});nodes.push(n);return n;};
 get('W05_MT_TRAVEL').next='MT090_CHANGE';
 add('MT090_CHANGE','짐을 풀고 편한 옷으로',[],[
  S('숙소에 도착해 방부터 나눴다. 가방을 침대 옆에 두고 외출복을 벗어 챙겨 온 편한 옷으로 갈아입었다.'),
  S('해린은 넉넉한 스웨트셔츠, 지우는 지퍼 후드, 서연은 부드러운 가디건 차림으로 거실에 나왔다. 나도 티셔츠와 면바지로 갈아입고 손을 씻었다.'),
  S('민서는 연구실 일정을 마친 뒤 온다고 연락했다. 먼저 온 사람들끼리 저녁을 준비하기로 했다.')
 ],'W05_MT_KITCHEN');
 get('W05_MT_SEOYEON').next='MT090_MINSEO_ARRIVE';
 add('MT090_MINSEO_ARRIVE','늦게 도착한 사람',['minseo'],[
  L('현관에서 민서가 재킷 소매를 정리했다. 민준이 남은 방과 짐 놓을 곳을 알려 줬다.'),
  L('연구실에서 바로 와서요. 저도 편한 옷으로 갈아입고 나올게요. 먼저 먹기 시작해요.','minseo'),
  S('민서가 방으로 들어갔다. 나는 서연이 남겨 둔 자리 옆에 물컵을 하나 더 놓았다.')
 ],'W05_MT_DINNER',{wardrobeContext:'outside'});
 for(const id of ['W05_MT_KITCHEN','W05_MT_SEOYEON','W05_MT_DINNER','W05_MT_TALK','W05_MT_GAME','W05_MT_REST'])get(id).wardrobeContext='lounge';
 for(const id of ['W05_MT_KITCHEN','W05_MT_SEOYEON','W05_MT_DINNER'])get(id).lines[0].clothingChanges=changes;
 const dinner=get('W05_MT_DINNER');dinner.lines[0]=S('편한 실내복으로 갈아입고 나온 민서가 남겨 둔 자리에 앉았다. 밥과 국이 놓이고 여섯 사람이 같은 식탁에 모였다.');dinner.lines[0].clothingChanges=changes;
 dinner.lines.find(l=>l.speaker==='minseo').clothingChanges={minseo:'방에서 편한 실내복으로 갈아입고 식탁으로 나왔다.'};
 dinner.choicePrompt='저녁을 먹고 어떻게 시간을 보낼까?';
 dinner.choices=[C('talk','서연·민서와 이야기한 뒤 저녁 자리에 합류한다.','W05_MT_TALK'),C('game','맥주와 음료를 꺼내 술게임 자리에 앉는다.','MT090_DRINK'),C('rest','먼저 쉬고 아침에 함께한다.','W05_MT_REST')];
 const talk=get('W05_MT_TALK');talk.next='MT090_DRINK';talk.lines.push(S('바깥 공기를 쐬고 돌아온 해린과 지우가 컵을 들고 앉았다. 민준이 맥주와 탄산수를 꺼내 어느 쪽을 마실지 물었다.'));
 add('MT090_DRINK','어느 잔을 들까',MT_PEOPLE,[
  S('식탁을 치우고 거실 낮은 탁자에 둘러앉았다. 맥주 캔과 탄산수, 남겨 둔 간식이 가운데 놓였다.'),
  L('너는 뭐 마실래? 나는 오늘 천천히 마실 거야.','haerin'),L('설명하는 사람이 먼저 틀리기 금지. 작년엔 설명 듣고도 몰랐어.','jiwoo'),
  S('서연이 작은 잔을 꺼내고 민서가 시계를 탁자 끝에 놓았다.')
 ],null,{choicePrompt:'게임하면서 무엇을 마실까?',choices:[C('beer','맥주를 한 잔 받아 천천히 마신다.','W05_MT_GAME',[f('mtDrink','beer')]),C('soda','탄산수를 받아 같은 게임에 참여한다.','W05_MT_GAME',[f('mtDrink','soda')])]});
 const game=get('W05_MT_GAME');game.cast=MT_PEOPLE;game.label='5주 토요일 밤 · 손가락이 접히는 순간';game.next=null;
 game.lines=[S('지우가 손가락 다섯 개를 폈다. 해당되는 사람이 접는 게임이었다. 맨 먼저 다 접으면 자기 컵으로 건배하기로 했다.'),
  L('처음 온 곳인데 길 아는 척해 본 사람.','jiwoo'),
  S('민준과 내가 동시에 손가락을 접자 해린이 웃다가 자기 손가락도 접었다. 서연은 잠깐 망설이다 따라 접었다.'),
  L('저도 첫 모임 때요. 문 앞까지 와 놓고 다른 층까지 다시 올라갔어요.','seoyeon'),L('나도 지난 학기에 그랬어. 아는 사람 따라가면 되는데 혼자 앞장서서.','haerin'),
  S('손가락 수가 엉켰다. 지우가 규칙을 다시 읽는 동안 나는 다음 질문을 골랐다.')];
 game.choicePrompt='내 차례에는 어떤 이야기를 꺼낼까?';game.choices=[C('pretend','모르는데 괜찮다고 해 본 사람.','MT090_FINGERS_PRETEND',[f('mtRound','pretend'),exp('spring-mt-game')]),C('crush','마음에 드는 사람 앞에서 말이 꼬인 사람.','MT090_FINGERS_CRUSH',[f('mtRound','crush'),exp('spring-mt-game')])];game.exitEffects=[];
 add('MT090_FINGERS_PRETEND','웃고 나니 할 수 있는 말',MT_PEOPLE,[
  S('내가 먼저 손가락을 접었다. 민서는 내 손을 보더니 자기 손가락을 접었다.'),L('저는 오늘 연구실에서요. 알아들었다고 했는데 버스 타고도 다시 찾아봤어요.','minseo'),
  L('저는 안 괜찮은 글을 괜찮다고 한 적 있어요. 그래 놓고 밤에 혼자 다시 읽고.','seoyeon'),S('해린이 내 잔에 자기 잔을 가볍게 댔다. 지우는 손가락 두 개 접어야 할 것 같다며 투덜댔다.'),
  S('한 사람이 얘기하는 동안 나머지는 잔을 내려놓고 들었다.')
 ],'MT090_IMAGE');
 add('MT090_FINGERS_CRUSH','누가 먼저 접었는지',MT_PEOPLE,[
  S('말을 끝내기도 전에 지우가 손가락을 접었다. 해린이 지우 손을 보더니 자기도 접고, 서연은 손을 무릎 아래로 잠깐 내렸다.'),
  L('접은 건 보였어. 숨기면 두 배 이런 규칙은 없으니까 괜찮고.','jiwoo'),L('말을 왜 자꾸 덧붙여. 네가 더 수상해.','haerin'),
  S('민서는 손가락을 접고 컵을 들었다. 누구 앞이었는지는 말하지 않겠다고 하자 민준이 자기도 그 규칙이 좋다고 했다.'),S('서로 이름을 억지로 끌어내지는 않았다. 그래도 질문 전보다 눈이 마주치는 시간이 조금 길어졌다.')
 ],'MT090_IMAGE');
 add('MT090_IMAGE','이미지 게임 한 판',MT_PEOPLE,[S('이번에는 질문에 어울리는 사람을 동시에 가리키는 게임이었다. 민준이 질문을 읽자 다들 바로 나를 보는 바람에 시작 전에 웃음이 났다.'),L('낯선 데 가면 제일 먼저 다른 사람 챙길 것 같은 사람? 네가 먼저 골라 봐.','jiwoo')],null,{choicePrompt:'오늘 함께 지낸 모습으로 누구를 고를까?',choices:MT_PEOPLE.map(c=>C(c,named(names[c],'을','를')+' 가리킨다.','MT090_IMAGE_'+c,[f('mtImagePick',c),rel(c)]))});
 const replies={seoyeon:['서연을 가리키고 늦게 온 사람의 컵을 남겨 둔 일을 말했다. 서연은 자기 컵을 내려다봤다.','그걸 보고 계셨어요? 저는 그냥… 없으면 좀 서운할 것 같아서요.'],jiwoo:['지우를 가리키고 장보기 봉투를 버스 내릴 때까지 세고 있던 일을 말했다. 지우가 양파 두 망 얘기는 빼 달라고 손을 들었다.','많이 산 것까지 챙긴 걸로 인정해 주면 좋겠는데.'],haerin:['해린을 가리키고 낯선 길에서 아는 척했던 일을 먼저 이야기해 준 게 좋았다고 말했다. 해린은 접었던 손가락을 다시 폈다.','이런 것도 챙긴 거야? 그럼 다음엔 더 크게 물어봐야겠네.'],minseo:['민서를 가리키고 늦게 오면서 도착 시각을 먼저 알려 준 일을 말했다. 민서는 휴대폰을 가리켰다.','기다리는 사람이 있을 줄 아니까 미리 말하게 되네요. 오늘은.']};
 for(const c of MT_PEOPLE)add('MT090_IMAGE_'+c,'기억하고 있던 모습',MT_PEOPLE,[S(replies[c][0]),L(replies[c][1],c),S('다른 사람들도 각자 골랐던 이유를 말했다. 작은 일을 기억해 주는 말에 장난치던 표정이 잠깐 풀렸다.')],'MT090_NIGHT_PICK');
 add('MT090_NIGHT_PICK','아직 끝내기 아쉬운 밤',MT_PEOPLE,[S('두 판을 마치고 간식을 다시 채웠다. 누군가는 음악을 작게 틀었고, 현관 쪽 창문으로 선선한 바람이 들어왔다.'),S('숙소 앞길에는 조명이 켜져 있었다. 밖에 잠깐 같이 나가고 싶은 사람이 떠올랐다.')],null,{choicePrompt:'누구에게 밤 산책을 제안할까?',choices:[...MT_PEOPLE.map(c=>C(c,names[c]+'에게 숙소 앞을 함께 걷자고 한다.','MT090_INVITE_'+c)),C('stay','거실에 남아 뒷정리하며 더 이야기한다.','MT090_STAY'),C('rest','오늘은 먼저 들어가 쉰다.','W05_MT_REST')]});
 for(const c of MT_PEOPLE){const d=mtWalks[c],app=status=>({type:'appointment',id:'mt-night-walk',character:c,status,week:5,day:'sat',time:'21:30',label:'MT 숙소 앞 밤 산책',place:'숙소 앞 조명 길',purpose:'mt-walk'});
  add('MT090_INVITE_'+c,'둘이 나가도 괜찮을까',[c],[L('나는 '+names[c]+'에게 숙소 앞을 잠깐 같이 걷겠느냐고 물었다.'),L(d.invite,c),S('다른 사람들에게 앞뜰 한 바퀴만 돌고 온다고 말하고 운동화를 신었다.')],'MT090_WALK_'+c,{exitEffects:[app('confirmed')]});
  add('MT090_WALK_'+c,named(names[c],'과','와')+' 걷는 숙소 앞길',[c],d.lines.map(([t,s])=>L(t,s)),null,{background:'bg.spring_lodge_path_night',location:'lodge-path',appointmentId:'mt-night-walk',choicePrompt:'지금 하고 싶은 말을 골라 보자.',choices:d.choices.map(([id,label])=>C(id,label,'MT090_WALK_'+c+'_'+id,[rel(c,1,1)]))});
  for(const [id,,answer]of d.choices)add('MT090_WALK_'+c+'_'+id,'돌아갈 시간을 늦추며',[c],[L(answer,c),L(d.close)],'MT090_BACK_'+c,{background:'bg.spring_lodge_path_night',location:'lodge-path',appointmentId:'mt-night-walk',exitEffects:[app('completed'),exp('mt-night-walk-'+c),rel(c,1,1)]});
  add('MT090_BACK_'+c,'같이 걸은 뒤',[c],[L('거실로 돌아와 남은 컵을 함께 치웠다. 나는 '+named(names[c],'과','와')+' 눈이 마주치자 아까의 말을 떠올리고 한 번 더 웃었다.'),S('잠들기 전 내일 출발 시간을 확인했다. 오늘 둘이 걸은 시간은 다른 사람과 나눈 저녁과는 조금 다른 기억으로 남았다.')],'MT090_GOODNIGHT_'+c);
  add('MT090_GOODNIGHT_'+c,'잠들기 전에 남은 말',[],[
   L('다들 방으로 들어간 뒤 거실 불을 끄기 전에 휴대폰이 울렸다. 함께 걸었던 사람에게 짧은 안부가 와 있었다.','narrator',{stageCast:[],when:{contact:c}}),
   L('다들 방으로 들어갔다. 개인 번호는 나누지 않았지만, 내일 아침에 먼저 인사하고 싶은 말이 남았다.','narrator',{stageCast:[],when:{not:{contact:c}}}),
   S('나는 내일 출발 알람을 확인하고 거실 불을 껐다. 숙소 앞길에서 나눈 말이 잠들 때까지 생각났다.')
  ],'W05_MT_RETURN',{effects:[{type:'message',id:'mt-walk-after-'+c,character:c,text:d.message,when:{contact:c}}]});
 }
 add('MT090_STAY','거실에 남은 이야기',[],[S('산책을 나가지 않고 민준과 빈 컵을 모았다. 게임에서 아무도 말하지 않았던 첫 모임의 실수 이야기가 하나씩 더 나왔다.'),S('다 같이 처음보다 편해진 목소리로 인사하고 방에 들어갔다.')],'W05_MT_RETURN',{exitEffects:[exp('mt-night-stayed')]});
 get('W05_MT_RETURN').lines.unshift(S('아침에 다시 외출복으로 갈아입고 가방을 쌌다. 거실에 남은 컵을 정리하고 신발을 찾아 신었다.'));
 get('W05_MT_RETURN').exitEffects=[...(get('W05_MT_RETURN').exitEffects??[]),exp('spring-mt-completed')];
 const monday=get('W06_MON');monday.cast=[...MT_PEOPLE];for(const line of monday.lines)line.cast=[];
 const memories={seoyeon:'교문에서 만난 서연이 휴대폰 케이스 안의 꽃잎을 보여 줬다. 숙소 앞길에서 주운 꽃잎이었다. 나는 주말에 잘 쉬었느냐고 묻는 대신 꽃잎이 안 부서졌네요, 하고 먼저 웃었다.',jiwoo:'지우가 교문에서 손을 흔들며 “오늘은 내 이름 안 물어봐도 되지?” 하고 놀렸다. 숙소 앞길에서 둘이 웃었던 얘기였다. 나는 이번에는 자신 있게 지우 이름을 불렀다.',haerin:'해린이 교문에서 버스 얘기를 꺼내려다 멈췄다. “오늘은 기다리는 얘기 말고.” 숙소에서 함께 걸었던 밤이 생각나 둘 다 웃었다.',minseo:'교문에서 만난 민서가 먼저 다음 모임 도착 시간을 말했다. 숙소 앞길에서 쉬러 온 것 같다고 말하던 모습이 떠올랐다. 나는 시간을 확인하고 그때 보자고 답했다.'};
 for(const c of MT_PEOPLE)monday.lines.push(L(memories[c],'narrator',{cast:[c],stageCast:[c],when:{experience:'mt-night-walk-'+c}}));
 get('MT090_CHANGE').label='5주 토요일 저녁 · 짐을 풀고 편한 옷으로';get('MT090_MINSEO_ARRIVE').label='5주 토요일 저녁 · 늦게 도착한 사람';
 for(const n of nodes){if((n.id.startsWith('MT090_')&&!['MT090_CHANGE','MT090_MINSEO_ARRIVE'].includes(n.id)||n.id==='W05_MT_GAME')&&n.background==='bg.spring_lodge_night')n.background='bg.spring_lodge_party_night';n.wardrobeRevision='0.9.0';n.outfits=wardrobeFor(n);}
 return {...base,narrativeRevision:'0.9.0',nodes,scope:'주차별 의상과 MT의 저녁·밤 산책 · 1~8주'};
}
