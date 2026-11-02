import {addWeeklyPlans,addMeetingGate,addMakeup,node,L,C} from './weekly-plans.mjs?v=200';
const contact=c=>({contact:c}),flag=(key,value=true)=>({type:'flag',key,value});

export function reviseStory(base){
 const nodes=structuredClone(base.nodes),find=id=>{const n=nodes.find(n=>n.id===id);if(!n)throw Error(id);return n;};
 const replace=(id,lines,next)=>{const n=find(id);n.lines=lines;if(next!==undefined)n.next=next;return n;};
 const offer=(id,c,week,day,bg,text,next)=>{
  nodes.push(node(id,`${week}주 · 다음에 연락하려면`,week,day,bg,[c],[L(text,c)],next,{when:{not:contact(c)},choices:[
   C('yes','앞으로 개인적으로도 연락해도 좋다고 하고 번호를 나눈다.',id+'_YES',[{type:'contact',character:c}]),
   C('later','다음에 학교에서 만나 이야기하자고 한다.',id+'_LATER')
  ]}));
  nodes.push(node(id+'_YES',`${week}주 · 저장한 이름`,week,day,bg,[c],[L('서로 번호를 저장하고 이름을 확인했다. 이제 일요일에 시간이 되는지 직접 물어볼 수 있다.')],next));
  nodes.push(node(id+'_LATER',`${week}주 · 다음 인사`,week,day,bg,[c],[L(c==='jiwoo'?'그래. 금요일에 보면 그때 이야기하자.':c==='seoyeon'?'네. 그럼 다음 모임에서 인사해요.':c==='minseo'?'괜찮아요. 모임에서 또 만나요.':'그래. 다음에 가게 오면 이야기하자.',c)],next));
 };
 // Relationships are introduced while people have a reason to share a scene.
 find('W01_MON').lines.splice(5,0,L('해린이랑 지우도 거기 나와. 둘은 네 입대 전부터 작품 같이 했고. 나는 지난 학기부터 장비 옮기는 쪽으로 끼었어.','minjun'));
 find('H01').lines.splice(4,0,L('해린은 입대 전 같은 동네에서 버스를 타고 다니던 친구였다. 우리 집 반찬 이름을 알 정도로 자주 봤지만, 군대에 간 뒤로 연락이 뜸해졌다.'));
 replace('W01_TUE',[
  L('민준이 금요일 모임 간식 주문을 맡았다며 온유로 데려갔다. 빈 두 시간을 도서관에서 보낸 뒤였다. 나는 문을 당겼다가 밀라는 안내를 늦게 봤다.'),
  L('밀면 돼. 경첩이 아직 수리 중이라.','yuna'),
  L('민준이 주문을 마치고 나를 소개했다. 카운터 안의 유나가 손을 닦고 이름표를 가리켰다.'),
  L('정유나야. 여운 졸업 부원. 민서랑 동아리 다닐 때 간식 주문 많이 맡았는데 아직도 이러네.','yuna'),
  L('지금은 여기서 일하고, 모임 있는 날 간식만 보내기도 해. 금요일에는 마감 근무라 못 가고.','yuna'),
  L('유나는 모임 인원을 적은 주문서를 내밀었다. 먼저 알레르기 있는 사람이 없는지 민준에게 확인한 뒤 두 메뉴 사진을 보여 줬다.'),
  L('레몬 파운드랑 호두 쿠키. 너라면 어느 쪽 먹고 싶어?','yuna'),L('둘 다 괜찮아 보이는데요.','player'),
  L('그럼 하나 골라 봐. 네가 금요일에 먹을 거잖아.','yuna')
 ]);
 replace('W01_WED',[
  L('조별 자료 정리를 맡았다가 읽을 자료가 세 배로 늘었다. 복도에서 민준이 카메라를 멘 동기를 불렀다.'),
  L('이지우. 민준이 복학한 동기 데리고 온댔는데 너구나. 우리 입학할 때 같은 강의 들었을 수도 있겠다.','jiwoo'),
  L('출석 부를 때 이름은 들은 것 같아. 얼굴은 자신 없고.','player'),L('그럼 오늘 처음 제대로 보는 걸로 하자. 나도 그래.','jiwoo'),
  L('지우는 여운 모임 장소 안내를 찍는 중이었다. 해린이 지난 학기 전시 때 길 잃은 사람을 세 명이나 데려왔다며 이번에는 영상을 남긴다고 했다.'),
  L('찍는 쪽이 좋아, 찍히는 쪽이 좋아?','jiwoo')
 ]);
 for(const id of ['J01_ACT','J01_CAMERA','J01_STUDY'])find(id).next='CONTACT_J080';
 offer('CONTACT_J080','jiwoo',1,'wed','bg.campus_day','안내 영상 완성하면 보내 줄게. 괜찮으면 번호 바꿀래? 공지방 말고 개인적으로도 연락해도 되는 걸로.','GROUP_JOIN');
 find('GROUP_JOIN').lines=[L('지우가 민준에게 내일 민서가 방 배치를 보러 오는지 물었다. 민준이 목요일 점심 뒤라고 확인해 줬다.'),L('금요일에 입구에서 헤매기 싫으면 내일 들러 봐. 선반 옆에 자료 반납함도 있어. 민서 선배가 배치 중일 거야.','jiwoo'),L('지우는 따로 모임 공지방 링크를 보여 줬다. 가입하면 금요일 시간과 준비물 공지를 받을 수 있었다.')];
 replace('W01_THU',[
  L('빌린 자료를 반납하고 모임 장소도 확인하려고 지우가 알려 준 방에 갔다. 문이 열려 있었고 안에서 의자 끄는 소리가 났다.'),
  L('금요일 처음 오기로 한 분이죠? 민준이가 들를 수도 있다고 했어요. 자료는 선반 옆에 놓아 주세요.','minseo'),
  L('저는 차민서예요. 건축 대학원 다니고, 여기 졸업 부원이에요. 이번에 방 배치만 좀 봐주기로 했는데 생각보다 오래 걸리네요.','minseo'),
  L('도면과 달리 문 앞에 의자가 걸려 있었다. 나는 자료를 놓으려다 가방을 문고리에 부딪쳤다.'),
  L('이렇게 사람이 지나가면 또 다르죠. 들어오는 사람 눈에는 어디부터 바꾸면 편할까요?','minseo')
 ]);
 for(const id of ['M02_LIMIT','M02_OVER','M02_TOMORROW'])find(id).next='CONTACT_M080';
 offer('CONTACT_M080','minseo',1,'thu','bg.club_day','오늘 의견 적어 둘게요. 다음에 배치 바뀐 것도 보여 드리고 싶네요. 괜찮으면 개인 연락처도 나눌까요?','W01_FRI');
 replace('W01_FRI',[
  L('민서가 남겨 둔 배치 메모대로 의자를 정리했다. 민서는 낮에 연구실로 돌아갔고, 모임 뒤쪽에 다시 오기로 했다고 했다.','narrator',{when:{flag:'chairPromise'}}),
  L('문 앞에서 원고철을 든 사람과 서로 먼저 들어가라며 멈췄다. 안에서는 해린이 내 이름을 불렀다. 나는 문을 잡고 함께 들어갔다.','narrator',{cast:['seoyeon']}),
  L('저도 오늘 처음이에요. 모집 포스터 보고 신청했는데, 여기 맞죠?','seoyeon',{cast:['seoyeon']}),
  L('맞아요. 저도 아직 가입 전이고요. 복학해서 아는 사람이 많이 없네요.','player',{cast:['seoyeon']}),
  L('한서연이에요. 국문과 이학년이에요. 그럼 우리 둘 다 어디 앉아야 하는지부터 찾아야겠네요.','seoyeon',{cast:['seoyeon']}),
  L('해린이 빈 의자 두 개를 가리켰다. 지우가 “새로 온 사람은 일단 앉아, 종이컵은 내가 할게” 하고 옆으로 비켰다.'),
  L('유나 선배는 근무라 간식만 보냈고, 민서 선배는 연구실 회의 끝나고 온대. 나랑 지우는 작년부터 여기 있었어.','haerin',{to:'seoyeon',stageCast:['haerin','seoyeon']}),
  L('서연이 원고철을 무릎에 올렸다. 표지에 제목 대신 ‘수정 6’이 적혀 있어, 내가 읽어도 되는 글인지 먼저 물었다.'),
  L('낭독할까 해서 가져오긴 했는데… 앞부분만 읽어 보실래요? 아직 모임 시작까지 조금 남아서요.','seoyeon')
 ]);
 for(const id of ['S01_READ','S01_WAIT'])find(id).next='CONTACT_S080';
 offer('CONTACT_S080','seoyeon',1,'fri','bg.club_day','읽을 부분 고르면 다음에 보내 드려도 될까요? 괜찮으시면 개인적으로도 연락하고 싶어요.','C01');
 replace('C01',[
  L('민준이 자리를 정리하고 한 사람씩 소개했다. 서연과 나는 오늘 처음 온 사람으로, 해린과 지우는 기존 부원으로 인사했다.','narrator',{cast:['seoyeon','jiwoo','haerin']}),
  L('해린이랑 나는 작년 전시 영상 때문에 일주일 내내 붙어 있었어. 여기 테이프 자국도 그때 거야.','jiwoo',{cast:['seoyeon','jiwoo','haerin'],to:'player'}),
  L('그만큼 붙였으면 네가 좀 떼라.','haerin',{cast:['seoyeon','jiwoo','haerin'],to:'jiwoo',stageCast:['jiwoo','haerin']}),
  L('회의를 마친 민서가 문을 두드리고 들어왔다. 민준이 의자를 당겨 줬다. 민서는 서연에게 처음 인사하고, 유나가 보낸 간식 포장부터 알아봤다.'),
  L('유나랑 제가 여기 다닐 때도 이 쿠키 먹었어요. 졸업 부원은 가끔 돕고, 이번 학기 작업은 여러분이 정하면 돼요.','minseo'),
  L('각자 하고 싶은 일을 적었다. 영상과 작은 전시, 한 편을 끝까지 쓴 글. 민준이 여름에 같은 날 보여 주면 어떻겠냐고 물었다.'),
  L('그럼 저는 낭독할 글 하나 준비해 볼게요. 길이는 아직 모르겠어요.','seoyeon'),
  L('지우가 상영 시간을 적고 해린이 전시할 벽 길이를 쟀다. 나는 이 안에서 맡을 수 있는 일을 생각했다.')
 ]);
 offer('CONTACT_Y080','yuna',2,'thu','bg.cafe_day','너도 이제 모임 때 몇 번 봤네. 다음에는 가게 말고 쉬는 날 얘기도 해 볼까? 괜찮으면 개인 번호 저장하고.','WEEK2_thu_PLAN');
 find('W02_CAFE').lines[0]=L('금요일 작업 준비물을 사러 지우, 해린과 함께 나왔다가 온유에 들렀다. 지난 전시부터 카페에 자주 왔던 둘은 주문대 앞에서 유나와 하던 농담을 이어 갔다.');
 find('W02_CAFE').next='CONTACT_Y080';
 const yunaInvite=find('CHERRY_INVITE_yuna');yunaInvite.background='bg.campus_day';yunaInvite.location='campus';yunaInvite.outfits={yuna:'spring'};
 yunaInvite.lines[0]=L('금요일, 근무를 마치고 나온 유나를 교문에서 만나 토요일 축제를 함께 구경할 시간이 있는지 물었다.');
 // Later contacts can be offered in person without inventing an existing number.
 for(const [week,c,anchor,next,bg]of [[2,'seoyeon','W02_READ_A','SUN02','bg.club_day'],[3,'minseo','W03_FRI','H_CONTACT_LATE','bg.club_day']]){
  const offerId=`CONTACT_${c}_LATE080`;find(anchor).next=offerId;
  if(week===2)find('W02_READ_B').next=offerId;
  offer(offerId,c,week,'fri',bg,c==='seoyeon'?'다음에 읽을 부분 보내 드려도 될까요? 괜찮으면 번호 저장해요.':'다음에 시간 바뀌면 미리 말씀드리고 싶어요. 괜찮으면 개인 연락처도 나눌까요?',next);
 }
 for(let week=2;week<=8;week++){
  const next=week===2?'W02_MON':week===3?'Q03':week===4?'W04_MON':`W0${week}_MON`;
  // Remove the old same-ID Sunday menu; its orphaned invitation nodes are pruned below.
  const old=nodes.findIndex(n=>n.id===`SUN0${week-1}`);if(old>=0)nodes.splice(old,1);
  addWeeklyPlans(nodes,week,next);
 }
 const gates=(week,end)=>{
  let next=end;
  for(const day of ['fri','thu','wed','tue'])next=addMeetingGate(nodes,week,day,next);
  return next;
 };
 // Place actual appointments between the fixed class / work / club scenes.
 let fri=addMeetingGate(nodes,2,'fri','W02_FRI'),thu=addMeetingGate(nodes,2,'thu',fri),wed=addMeetingGate(nodes,2,'wed','W02_CAFE'),tue=addMeetingGate(nodes,2,'tue',wed);
 for(const id of ['Q02_FACT','Q02_FEEL','Q02_ALONE'])find(id).next=tue;
 fri=addMeetingGate(nodes,3,'fri','W03_FRI');thu=addMeetingGate(nodes,3,'thu',fri);wed=addMeetingGate(nodes,3,'wed','W03_JOB');tue=addMeetingGate(nodes,3,'tue',wed);
 for(const id of ['Q03_PAIR','Q03_OTHER'])find(id).next=tue;
 for(const id of ['W03_JOB_YES','W03_JOB_NO'])find(id).next=thu;
 fri=addMeetingGate(nodes,4,'fri','CHERRY04');find('W04_FRI').next=fri;
 thu=addMeetingGate(nodes,4,'thu','W04_FRI');wed=addMeetingGate(nodes,4,'wed',thu);
 const afterTue='WEEK4_AFTER_TUE';nodes.push(node(afterTue,'4주 화요일 · 다음 일정',4,'tue','bg.campus_day',[],[L('오늘 잡은 시간을 마치고 남은 수업과 근무 일정을 확인했다.')],[{when:{flag:'jobAccepted'},node:'W04_JOB'},{node:wed}]));
 tue=addMeetingGate(nodes,4,'tue',afterTue);find('W04_MON').next=tue;find('W04_JOB').next=wed;
 for(const week of [5,6,7]){
  replace(`W0${week}_MON`,[find(`W0${week}_MON`).lines[0],L('일요일에 확정한 약속은 달력에 남아 있었다. 오늘은 수업부터 듣고, 정한 날에 만나기로 했다.','narrator',{when:{appointment:`plan-w0${week}`,status:'confirmed'}})],`W0${week}_TUE`);
  const end=week===7?'WEEK7_MAKEUP':`W0${week}_FRI`;
  find(`W0${week}_TUE`).next=gates(week,end);
 }
 addMakeup(nodes,'W07_FRI');
 // The Monday exam encounter is still a place-first surprise. Friday is the planned meeting.
 find('W08_FRI').next=addMeetingGate(nodes,8,'fri','CHAPTER_TWO_END');
 find('CHAPTER_TWO_END').lines.push(L('달력에 완료된 만남과 보류한 제안이 남아 있었다. 누군가와 깊어진 만큼, 아직 모르는 사람에게 물어보고 싶은 이야기도 생겼다.'));
 // All fixed club scenes now have explicit work-related reasons to be there.
 find('W02_FRI').lines.unshift(L('금요일 원고 나눔 시간에 맞춰 여운에 갔다. 서연은 오늘 읽을 사람 명단을 확인하고 내 옆에 앉았다.'));
 find('W03_FRI').lines.unshift(L('금요일 작업 모임이었다. 민서는 배치한 공간을 확인하러, 지우는 영상 장비를 챙기러, 해린은 전시 벽을 재러 왔다. 나는 맡은 일을 마치고 같은 테이블에 앉았다.'));
 // The shared project has a problem, a decision and a visible consequence too.
 replace('W05_MT_TALK',[
  L('서연과 민서는 거실에 남았다. 해린과 지우는 설거지를 마무리하고 바깥 공기를 쐬러 나갔다.','narrator',{stageCast:[]}),
  L('서연이 내게 복학하면 원래 다니던 곳으로 돌아온 기분이냐고 물었다. 나는 여기 오는 버스를 두 번 놓쳤다고 했다. 노선이 바뀐 걸 몰랐다고.'),
  L('아는 데니까 괜찮을 줄 알았는데, 모르는 걸 묻기가 더 어렵더라고요.','player'),
  L('저도 졸업 부원이라 해 놓고 요즘 모임 방식은 잘 몰라요. 자꾸 예전에는 이랬다고만 말하게 되더라고요.','minseo'),
  L('첫날 선배들도 다 아는 사이인 줄 알았어요. 저만 나중에 온 것 같아서요.','seoyeon',{to:'minseo',stageCast:['seoyeon','minseo']}),
  L('저랑 유나는 오래 알았고, 해린이랑 지우는 제가 졸업할 즈음 들어왔어요. 같이 있는 시간은 생각보다 달라요.','minseo',{to:'seoyeon',stageCast:['seoyeon','minseo']}),
  L('나는 첫 모임에 서연과 문 앞에서 멈췄던 이야기를 했다. 서연이 자기보다 내가 먼저 길을 아는 척했다고 지적했다. 셋이 작게 웃었다.'),
  L('다음 신입 오면 문에서 기다리지 않게 해야겠네요. 먼저 이름 물어보고 자리부터 같이 찾아주고요.','seoyeon')
 ],'W05_MT_RETURN');
 replace('W05_MT_GAME',[
  L('서연과 민서는 먼저 쉬러 들어갔다. 해린과 지우가 카드 규칙으로 티격태격해, 나는 설명 한 판을 먼저 하자고 했다.'),
  L('그걸 왜 지금 말해? 나 작년에도 몰라서 계속 졌는데.','haerin',{to:'jiwoo',stageCast:['haerin','jiwoo']}),
  L('작년엔 안다고 했잖아.','jiwoo',{to:'haerin',stageCast:['haerin','jiwoo']}),
  L('너희 다 아는 것 같아서.','haerin',{to:'jiwoo',stageCast:['haerin','jiwoo']}),
  L('지우가 카드를 거두고 처음부터 펼쳤다. 이번에는 자기도 헷갈린 규칙을 휴대폰으로 확인했다. 첫 판은 연습이라 점수를 적지 않았다.'),
  L('나도 새 동아리에 들어와 조용히 웃기만 하던 날을 이야기했다. 지우가 다음엔 웃지 말고 질문하라며 카드를 내 쪽으로 밀었다.'),
  L('한 판 뒤에 셋이 그릇을 정리했다. 해린이 아직 모르는 규칙을 물었고, 지우가 대답하기 전에 먼저 자기도 확인했다.')
 ],'W05_MT_RETURN');
 const project=find('W06_FRI');
 project.cast=['jiwoo','haerin','seoyeon'];project.outfits={jiwoo:'spring',haerin:'spring',seoyeon:'spring'};
 project.lines=[
  L('여름 공동 전시 신청서를 앞에 놓고 지우와 해린이 말이 없어졌다. 대관 마감은 다음 주 수요일, 각자 생각한 준비물은 한 달 치였다.'),
  L('전시 벽 두 면에 상영까지 하면 설치 이틀 필요해. 우리 시험 주인데.','haerin',{to:'jiwoo',stageCast:['jiwoo','haerin']}),
  L('짧게 보여 주면 작업한 게 다 빠지잖아.','jiwoo',{to:'haerin',stageCast:['jiwoo','haerin']}),
  L('서연은 아직 낭독할 글을 확정하지 못했다고 말했다. 민준이 내게 첫 모임 때 맡겠다고 한 일을 지금도 할 수 있는지 물었다.'),
  L('기록 노트에는 해 보자는 말이 많았지만 누가 언제 할지는 비어 있었다. 나는 내가 적어 놓고도 확인하지 않은 줄을 손가락으로 짚었다.','narrator',{when:{flag:'roleRecord'}}),
  L('나는 준비물을 옮길 수 있다고만 했다. 목록을 보니 내 가방으로는 들 수 없는 장비가 두 개 있었다.','narrator',{when:{flag:'roleHelp'}}),
  L('나는 관객으로 오겠다고 했다. 일정이 커지는 동안 아무 역할도 맡지 않은 게 미안해져, 지금이라도 전부 돕겠다고 말할 뻔했다.','narrator',{when:{flag:'roleVisitor'}}),
  L('민준이 펜을 건넸다. 오늘 내가 할 수 있는 대답은 약속을 더 크게 쓰는 것만은 아니었다.')
 ];
 project.next=undefined;project.choices=[C('small','한 공간에서 한 시간만 여는 작은 첫 전시를 제안한다.','PROJECT_SMALL',[flag('projectScale','small')]),C('split','각자 완성한 것만 모아 시간대를 나누자고 제안한다.','PROJECT_SPLIT',[flag('projectScale','split')])];
 nodes.push(node('PROJECT_SMALL','6주 금요일 · 첫 번째 관객부터',6,'fri','bg.club_day',['jiwoo','haerin','seoyeon'],[
  L('해린이 벽 한 면을 지우고 지우가 영상 한 편에 동그라미를 쳤다. 서연은 낭독 대신 읽을 종이를 두는 방식도 가능하냐고 물었다.'),
  L('한 번 작게 열어 보고 부족하면 다음에 더 하자. 오늘 빠지는 게 영원히 못 나오는 건 아니니까.','player'),
  L('지우가 잠깐 망설이다 신청서에 한 시간을 적었다. 나는 관객이 처음 들어왔을 때 볼 안내 한 장을 다음 모임까지 준비하기로 했다.')
 ],'SUN06',{exitEffects:[{type:'experience',id:'project-small-agreed'}]}));
 nodes.push(node('PROJECT_SPLIT','6주 금요일 · 따로 만든 순서',6,'fri','bg.club_day',['jiwoo','haerin','seoyeon'],[
  L('각자 시간을 적자 지우의 상영과 해린의 설치가 같은 오후에 겹쳤다. 나는 그 충돌부터 신청서 옆에 표시했다.'),
  L('내 거 설치하고 상영 준비도 도와줄 수 있어. 대신 혼자 벽 두 면은 못 해. 한 면만 할래.','haerin'),
  L('지우는 상영 시간을 뒤로 옮겼고 서연은 낭독 참가 여부를 시험 뒤에 확정하기로 했다. 나는 각자의 시간을 모은 일정표를 맡았다.')
 ],'SUN06',{exitEffects:[{type:'experience',id:'project-split-agreed'}]}));
 find('W07_FRI').cast=['minjun'];find('W07_FRI').outfits={minjun:'spring'};
 find('W07_FRI').lines.unshift(
  L('한 시간짜리 전시 안내를 가져갔다. 민준은 처음 온 사람이 보는 문장부터 읽고 입구 위치가 빠졌다고 지적했다. 나는 바로 옆에 찾아오는 길을 그렸다.','narrator',{when:{flag:'projectScale',value:'small'}}),
  L('각자의 일정표를 가져갔다. 민준이 설치 시간과 상영 시간이 다시 겹친 곳을 찾았다. 나는 확인 안 한 칸에 물음표를 붙이고 당사자에게 직접 물었다.','narrator',{when:{flag:'projectScale',value:'split'}}),
  L('민준이 자기 수업 과제도 보여 줬다. 내게만 빈 시간이 많은 줄 알았는데, 민준도 이번 주에는 도울 일을 줄이기로 했다고 했다.')
 );
 replace('W08_FRI',[
  L('마지막 시험을 마치고 건물을 나왔다. 결과는 아직 모르지만 가방에 넣어 둔 자료를 오늘은 더 펴지 않아도 됐다.'),
  L('일요일에 잡아 둔 금요일 약속을 확인했다. 만나기로 한 사람이 있으면 그 시각에 가고, 오늘은 비워 뒀다면 밀린 잠과 빨래부터 챙기기로 했다.')
 ]);
 for(const c of ['seoyeon','jiwoo','haerin','minseo'])for(const n of nodes.filter(n=>n.id.startsWith('W08_ARRIVE_'))){
  if(n.cast.includes(c))n.lines.push(L('일요일에 시간을 정해 따로 만나 본 뒤라, 먼저 인사를 건네는 목소리가 전보다 편해졌다.','narrator',{when:{flag:`arc${c}1`}}));
 }
 // Prune superseded intentions and fixed Thursday focus scenes from production.
 const map=new Map(nodes.map(n=>[n.id,n])),reachable=new Set();
 const visit=id=>{if(!id||reachable.has(id))return;const n=map.get(id);if(!n)throw Error('Unresolved story node: '+id);reachable.add(id);const follow=x=>typeof x==='string'?visit(x):x?.forEach(b=>visit(b.node));follow(n.next);for(const c of n.choices??[])follow(c.next);};
 visit(base.start);
 return {...base,narrativeRevision:'0.8.0',sourceRevision:'13',scope:'일요일 약속과 인물별 연속 대화 · 1~8주',nodes:nodes.filter(n=>reachable.has(n.id))};
}
