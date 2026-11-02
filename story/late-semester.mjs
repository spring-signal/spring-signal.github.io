import {L,C,node,planId,weekdays} from './weekly-plans.mjs?v=200';
import {has,flag,all,any,not,msg,exp,exists} from './everyday-tools.mjs?v=200';
import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
import {personalArcs} from './personal-arcs.mjs?v=200';
import {deeperArcs} from './personal-depth.mjs?v=200';
import {personalities as P} from './late-personal-content.mjs?v=200';
import {peerPlots,peerStatusLines,peerResolved} from './peer-conflicts.mjs?v=200';
import {addEmotionalContinuity,unresolved} from './emotional-continuity.mjs?v=200';
import {lifeLines,lifeCallbacks} from './life-choices.mjs?v=200';
const main=['seoyeon','jiwoo','haerin','yuna','minseo'],people=[...main,'doa'];
const contact=c=>({contact:c}),rel=(c,a=1,t=1)=>({type:'relation',character:c,affection:a,trust:t});
const titles={9:'같은 일을 다르게 기억하는 사람들',10:'고치는 일과 고르는 일',11:'축제에서 남겨 둔 자리',12:'보여 주지 않은 장면',13:'다른 답 옆의 내 답',14:'시험 전에 묻는 안부',15:'다시 만난 이름',16:'알고 있는 것과 모르는 것',17:'빈 시간표를 함께 펴며',18:'쉬는 사람의 이름',19:'우리가 고른 여름 MT',20:'돌아온 뒤에도 남는 약속',21:'잘되지 않은 날의 소식',22:'불꽃이 꺼진 뒤의 말',23:'기억 대신 오늘을 묻기',24:'여름에 남겨 둔 자리'};
const venueNames={sea:'바다',valley:'계곡',pool:'호텔 수영장'},waterBg=v=>`bg.${v}130_day`,waterLoc=v=>({sea:'beach',valley:'valley',pool:'pool'}[v]);
const lodgeBg=v=>({sea:'bg.beach_lodge130_night',valley:'bg.valley_lodge130_night',pool:'bg.hotel_lounge130_night'}[v]);
const endId='SUMMER24_END',sun=w=>`LATE${w}_SUNDAY`,day=(w,d)=>`LATE${w}_${d.toUpperCase()}`;
const extras=w=>`late-extra-w${w}`;
const freeExtra=w=>not(any(...['pending','confirmed','completed','cancelled','declined','deferred'].map(status=>({appointment:extras(w),status}))));
export function extendSemester(base){
 const nodes=[],byId=new Map(),make=(id,label,w,d,bg,cast,lines,next,extra={})=>{
  const n=node(id,label,w,d,bg,cast,lines,next,{...extra,season:w>=17?'summer':'earlySummer',wardrobeRevision:'0.9.0',onDuty:extra.onDuty??(cast.includes('yuna')?{yuna:false}:undefined)});
  const locations={'bg.bookshop_day':'bookshop','bg.city_gallery_day':'city-gallery','bg.market_day':'market','bg.campus_summer':'campus','bg.library130_evening':'library','bg.office_day':'office','bg.seminar_day':'seminar','bg.festival_day':'festival','bg.festival_booth_day':'festival','bg.river_day':'river','bg.fireworks_night':'river','bg.exhibition_evening':'club','bg.exhibition_night':'exhibition'};
  n.location=extra.location??locations[bg]??n.location;if(bg==='bg.river_day')n.timeOfDay='dusk';if(bg==='bg.exhibition_evening')n.timeOfDay='sunset';if(bg==='bg.library130_evening')n.timeOfDay='evening';n.outfits={...wardrobeFor(n),...extra.outfits};nodes.push(n);byId.set(id,n);return n;
 };
 const nextWeek=w=>w===24?endId:sun(w+1),afterSat=w=>`LATE${w}_HOME`;
 for(let w=9;w<=24;w++){
  const start=day(w,'mon'),available=people.filter(c=>c!=='doa'||w>=16);
  make(sun(w),`${w-1}주 일요일 밤 · ${w}주의 약속`,w-1,'sun','bg.home_night',[],[L(w>=17?'방학의 새 주 시간표를 폈다. 각자의 휴무와 연구 일정 사이에 함께 비울 수 있는 시간을 찾아 보고 싶었다.':'새 주 시간표를 폈다. 지난 만남에서 끝내지 못한 말도 있었고, 이번에는 그냥 같이 보내고 싶은 시간도 있었다.'),L(w===16?'월요일 공부 장소는 그날 정한다. 개인 만남은 시험 뒤 금요일과 토요일로 비워 뒀다.':w===19?'주말은 여름 MT 일정이다. 개인 약속은 이동 전 평일에 잡고, 숙소에서 누구와 시간을 보낼지는 현장에서 다시 물어보기로 했다.':'먼저 길게 만날 약속 하나를 고르고, 원하면 짧은 만남도 하나 더 정할 수 있다. 지난 대화가 남아 있으면 그 말부터 이어 간다.')],`LATE${w}_EXTRA`,{choices:[C('rest','첫 약속은 비워 두고 추가 만남만 살펴본다.',`LATE${w}_EXTRA`),...available.map(c=>C(c,P[c].name+'에게 연락한다.',`LATE${w}_${c}_ACT`,[],contact(c)))]});
  make(`LATE${w}_EXTRA`,`${w-1}주 일요일 · 남은 한 번의 시간`,w-1,'sun','bg.home_night',[],[L('같은 사람을 다시 만나거나 다른 사람에게 연락해도 좋았다. 두 칸을 다 채울 필요는 없었다.')],start,{when:freeExtra(w),choices:[C('skip','추가 약속은 잡지 않는다.',start),...available.map(c=>C(c,P[c].name+'에게 짧은 만남을 제안한다.',`LATE${w}_${c}_EXTRA_ACT`,[],contact(c)))]});
  for(const c of available)for(const slot of ['main','extra']){
   const d=P[c],root=`LATE${w}_${c}_${slot.toUpperCase()}`,id=slot==='main'?planId(w):extras(w),dates=w===16?(slot==='main'?['fri']:['sat']):(slot==='main'?['tue','thu']:['fri']),time=w===16?(slot==='main'?'16:30':'14:00'):(slot==='main'?'15:30':'12:20'),back=slot==='main'?`LATE${w}_EXTRA`:start;
   make(`LATE${w}_${c}_${slot==='main'?'ACT':'EXTRA_ACT'}`,`${w-1}주 일요일 · ${d.name}와 보낼 시간`,w-1,'sun','bg.home_night',[],[L(d.name+'의 대화창을 열고 같이 해 보고 싶은 일을 적었다. 아직 모르는 취향을 예전의 답으로 먼저 채우지 않기로 했다.')],null,{choices:d.activity.map((a,i)=>C('a'+i,a,root+'_TIME'+i,[],slot==='extra'?not(all(has('lateMainPerson'+w,c),has('lateMainActivity'+w,'a'+i))):not(all(has('lateExtraPerson'+w,c),has('lateExtraActivity'+w,'a'+i)))))});
   for(let i=0;i<2;i++){
    const pre=`PLAN${w}_${c}_late${slot}${i}`,act=d.activity[i],bg=d.bg[i],place=d.place[i];
    make(root+'_TIME'+i,`${w-1}주 일요일 · 가능한 날짜`,w-1,'sun','bg.home_night',[],[L('수업·연구·근무 일정과 겹치지 않는 시간을 골라 제안했다. 아직 확인하지 않은 시간은 달력에 확정으로 넣지 않았다.')],null,{choices:dates.map(dd=>C(dd,`${weekdays[dd]} ${time} · ${place}`,pre+'_'+dd+'_SEND'))});
    for(const dd of dates){const p=pre+'_'+dd,details={id,character:c,week:w,day:dd,time,activity:'late'+i,label:act,place,purpose:'weekly'},text=`${w}주 ${weekdays[dd]} ${time}, ${place}에서 ${act} ${['jiwoo','haerin'].includes(c)?'어때?':'어때요?'}`;
     make(p+'_SEND',`${w-1}주 일요일 · 보낸 제안`,w-1,'sun','bg.home_night',[],[L('“'+text+'”'),L('답장을 기다리는 동안 내 시간표의 마감도 확인했다.')],p+'_REPLY',{effects:[msg(p+'-out',c,text,'out'),{type:'appointment',...details,status:'pending'}]});
     make(p+'_REPLY',`${w-1}주 일요일 · 받은 답장`,w-1,'sun','bg.home_night',[],[L('“'+d.reply+'”')],null,{effects:[msg(p+'-reply',c,d.reply)],choices:[C('confirm','확인한 시간으로 약속을 확정한다.',p+'_SET',[{type:'appointment',...details,status:'confirmed'},flag('late'+(slot==='main'?'Main':'Extra')+'Person'+w,c),flag('late'+(slot==='main'?'Main':'Extra')+'Activity'+w,'a'+i)]),C('defer','이번에는 보류하고 다음에 다시 묻는다.',p+'_SET',[{type:'appointment',...details,status:'deferred'}])]});
     make(p+'_SET',`${w-1}주 일요일 · 서로 남긴 일정`,w-1,'sun','bg.home_night',[],[L('확정한 시간만 달력에 남겼다. 서로의 다른 약속은 그대로 두었다.')],back,{scheduledAppointmentId:id});
     buildMeeting(p,w,dd,c,i,details,bg,place,slot);
    }
   }
  }
  make(start,`${w}주 월요일 · ${titles[w]}`,w,'mon',w>=17?'bg.campus_summer':'bg.campus_day',[],[L(w>=17?'방학에도 각자의 일은 계속됐다. 연구실에 가는 사람, 근무표를 확인하는 사람, 늦게 일어나고 싶은 사람이 같은 시간을 비울 수는 없었다.':'새 주의 수업 자료를 받았다. 지난 주에 만난 사람의 답과 아직 묻지 못한 질문이 노트의 서로 다른 쪽에 남아 있었다.'),L('내 쪽의 하루도 한 가지는 직접 고르고 싶었다.')],w===16?'FINALS16_PLACE':day(w,'tue'));
  for(const dd of ['tue','wed','thu','fri','sat']){
   const next=dd==='tue'?day(w,'wed'):dd==='wed'?day(w,'thu'):dd==='thu'?day(w,'fri'):dd==='fri'?day(w,'sat'):afterSat(w);
   make(day(w,dd),`${w}주 ${weekdays[dd]} · 오늘의 시간`,w,dd,w>=17?'bg.campus_summer':'bg.campus_day',[],[L(dd==='sat'?'토요일 아침, 오늘 함께 하기로 한 일과 혼자 남겨 둔 시간을 다시 확인했다.':'수업이나 내 일을 마치고 오늘 정한 시간을 확인했다.')],dd==='wed'?`LATE${w}_LIFE`:dd==='fri'?`LATE${w}_PEERS`:dd==='sat'?specialSaturday(w):w===15&&dd==='thu'?'DOA15_REUNION':dd==='thu'?`LATE${w}_INCOMING`:next);
   if(dd==='tue'||dd==='thu'||w===16&&dd==='fri'){
    const n=byId.get(day(w,dd)),after=n.next;n.next=[...available.flatMap(c=>[0,1].map(i=>({when:all({appointment:planId(w),status:'confirmed'},has('lateMainPerson'+w,c),has('lateMainActivity'+w,'a'+i)),node:`PLAN${w}_${c}_latemain${i}_${dd}_ARRIVE`}))).filter(b=>byId.has(b.node)),{node:after}];
   }
   if(dd==='fri'&&w!==16||dd==='sat'&&w===16){const n=byId.get(day(w,dd)),after=n.next;n.next=[...available.flatMap(c=>[0,1].map(i=>({when:all({appointment:extras(w),status:'confirmed'},has('lateExtraPerson'+w,c),has('lateExtraActivity'+w,'a'+i)),node:`PLAN${w}_${c}_lateextra${i}_${dd}_ARRIVE`}))),{node:after}];}
  }
  // Main appointment routes are day-specific even when both dates were offered.
  for(const dd of ['tue','thu','fri']){const n=byId.get(day(w,dd));if(Array.isArray(n.next))for(const b of n.next)if(b.when&&b.node.includes('_latemain'))b.when=all(b.when,{flag:'lateMainDay'+w,value:dd});}
  for(const n of nodes.filter(n=>n.id.startsWith('PLAN'+w+'_')&&n.id.endsWith('_REPLY')))for(const choice of n.choices??[])if(choice.id==='confirm'){const a=choice.effects.find(e=>e.type==='appointment');if(a.id===planId(w))choice.effects.push(flag('lateMainDay'+w,a.day));}
  buildLife(w,day(w,'thu'));
  buildPeer(w,day(w,'sat'));
  make(afterSat(w),`${w}주 토요일 밤 · 하루를 닫으며`,w,'sat','bg.home_night',[],[L('집에 돌아와 오늘 실제로 함께 한 일만 떠올렸다. 하지 않은 외출을 추억으로 보태거나, 끝내지 못한 대화를 다 풀린 일로 바꾸지는 않았다.'),...main.map(c=>L(P[c].name+'와 아직 끝내지 못한 말은 다음 만남에 다시 물어보기로 했다.','narrator',{when:unresolved(c)}))],nextWeek(w));
  buildIncoming(w,day(w,'fri'));
 }
 // Finals: place first, then an unexpected person; the pairings differ from week8.
 make('FINALS16_PLACE','16주 월요일 · 어디서 공부할까',16,'mon','bg.campus_day',[],[L('기말 범위를 보고 오늘 공부할 장소부터 골랐다. 누구를 만날지보다 내가 집중할 수 있는 곳을 먼저 생각했다.')],null,{choices:[['library','도서관 조용한 열람석','minseo','bg.library_day'],['cafe','온유의 손님 자리','haerin','bg.cafe_day'],['club','예약이 비어 있는 동아리방','jiwoo','bg.club_day'],['classroom','빈 강의실','seoyeon','bg.lecture_day']].map(([id,label,c,bg])=>C(id,label,'FINALS16_'+id))});
 for(const [place,c,bg]of [['library','minseo','bg.library_day'],['cafe','haerin','bg.cafe_day'],['club','jiwoo','bg.club_day'],['classroom','seoyeon','bg.lecture_day']]){
  const p='FINALS16_'+place;
  make(p,'16주 월요일 · 뜻밖의 같은 자리',16,'mon',bg,[c],[L(P[c].name+'도 자기 자료를 펴고 있었다. 중간고사 때의 만남을 그대로 되풀이하는 날은 아니었다. 오늘 각자 남은 질문부터 적었다.'),L(c==='minseo'?'저는 연구 발표 자료를 읽으러 왔어요. 같은 걸 공부하지 않아도 쉬는 시간은 같이 맞출까요?':c==='haerin'?'이번엔 내가 먼저 와 있었네. 각자 풀다가 모르는 문제만 하나씩 말해 볼까?':c==='jiwoo'?'노트북 예약은 공부용이야. 오늘은 편집 핑계로 페이지 안 넘기지 않으려고.':'이 강의실은 제 수업 끝나고 비더라고요. 답을 설명하다 막힌 부분만 같이 표시해 볼까요?',c)],null,{onDuty:{yuna:false},choices:[C('explain','막힌 부분을 번갈아 설명해 본다.',p+'_END',[exp('finals-'+c+'-explain')]),C('quiet','각자 집중하고 쉬는 시간에만 이야기한다.',p+'_END',[exp('finals-'+c+'-quiet')])]});
  make(p+'_END','16주 월요일 · 책을 덮기 전에',16,'mon',bg,[c],[L('오늘 끝낸 분량과 다시 볼 부분을 나눠 적었다. 함께 공부했다고 시험 결과까지 서로 책임질 수는 없었다.'),L('개인 연락처를 나누지 않았다면 다음에 직접 물어볼 말을 남겼다.','narrator',{when:not(contact(c))})],p+'_HOME',{exitEffects:[exp('finals-study-'+c),rel(c)]});
  make(p+'_HOME','16주 월요일 밤 · 공부 뒤의 안부',16,'mon','bg.home_night',[],[L('집에 돌아와 오늘 남긴 질문을 다시 폈다. 함께 공부한 사람의 연락처를 나눴다면 안부가 와 있었다.')],day(16,'tue'),{effects:[msg(p+'-after',c,'아까 남긴 질문은 내일 다시 볼 때도 기억날 것 같아'+(['seoyeon','minseo'].includes(c)?'요. 남은 시험도 잘 마쳐요.':'. 남은 시험도 잘 보자.'),'in',contact(c))]});
 }
 buildDoa();buildFestival();buildSummerMt();buildFireworks();buildDoaTrip();buildExhibition();
 make(endId,'24주 일요일 · 여름에 남겨 둔 자리',24,'sun','bg.home_night',[],[L('복학하던 날에는 빈 시간표가 먼저 보였다. 지금은 실제로 만난 날, 미뤘던 답, 아직 다시 물어볼 말이 그 빈칸 사이에 있었다.'),...peerStatusLines(),...people.map(c=>L(P[c].name+'와 서로 좋아하는 마음을 말해 본 일도 남았다. 그 말을 다음 관계의 이름으로 정할지는 앞으로 함께 고를 일이었다.','narrator',{when:has('closeness_'+c,5)})),L('오늘까지 나눈 마음은 지워지지 않았다. 앞으로의 고백이나 결말을 이미 겪은 일처럼 적지는 않았다.')],null,{terminal:true});
 const library=byId.get('LATE21_LIFE_study_result');if(library){library.background='bg.library130_evening';library.location='library';library.timeOfDay='evening';library.lines.unshift(L('저녁 도서관에 잠깐 들러 받은 피드백을 다시 읽었다. 창밖의 여름 나무가 어두워지기 전에 오늘 고칠 한 군데만 정했다.'));}
 const late=addEmotionalContinuity({version:base.version,start:sun(9),nodes,narrativeRevision:'0.13.0'});
 // Preserve old eight-week content and saves verbatim, extending only its exit.
 const old=structuredClone(base.nodes),exit=old.find(n=>n.id==='CHAPTER_TWO_END');exit.terminal=false;exit.next=sun(9);
 return {...base,narrativeRevision:'0.13.0',sourceRevision:'18',maxWeek:24,scope:'프롤로그·1~24주 본편 / 여성 사이의 갈등·회복 / 장소 선택 여름 MT',nodes:[...old,...late.nodes]};
 function specialSaturday(w){return w===11?'FEST11_START':w===19?'MT19_DEPART':w===22?'FIRE22_PICK':w===23?'DOA23_OPTION':w===24?'EXHIBIT24_START':`LATE${w}_QUIET_SAT`;}
 function weeklySmall(c,w,i){const moments={seoyeon:['책갈피를 고르다가 서로 다른 색을 집었다. 서연은 다음에 알아볼 표시는 자기가 고르겠다고 웃었다.','서연은 긴 문장 하나를 읽다가 숨이 모자라 멈췄다. 우리는 그 쉼표를 지우지 않고 오늘의 읽는 속도로 남겼다.','말하지 못한 질문을 공책 뒤에 적었다. 서연은 지금 답할 것 하나만 직접 골랐다.','서연은 내 추천 대신 자기가 오래 보고 싶은 페이지를 폈다. 나는 왜 그쪽이었는지 물었다.'],jiwoo:['지우는 같은 노래를 끝까지 듣고도 바로 평가하지 않았다. 처음 들었을 때 생각난 장소부터 말했다.','내 사진을 고르기 전 지우가 공개해도 되는지를 먼저 물었다. 오늘만 보고 지울 사진도 따로 남겼다.','지우가 잘 안 들리는 작은 소리를 찾아 재생을 멈췄다. 나는 기다리다가 내가 먼저 놓친 소리도 말했다.','사진을 찍지 않는 동안 지우는 나를 설명하는 말보다 오늘 어떤 기분인지 묻는 말을 더 오래 골랐다.'],haerin:['해린은 접었다가 편 자국을 그대로 뒀다. 오늘은 틀린 선을 다 지우는 것보다 어디서 망설였는지 말하고 싶다고 했다.','햇빛에서 본 색을 그늘에서도 비교했다. 같은 이름을 붙여도 지금 보이는 색은 달라서 다시 물었다.','해린은 예전에 좋아하던 색 대신 오늘 눈에 들어오는 쪽을 골랐다. 나는 아는 답을 고집하지 않았다.','해린이 끝내지 않은 한 면을 보여 줬다. 오늘은 그 면에 손을 대지 않고 왜 멈췄는지 들었다.'],yuna:['유나는 메뉴 설명을 꺼내려다 오늘은 손님이 아니라고 웃었다. 우리는 값보다 지금 먹고 싶은 맛부터 골랐다.','유나는 내가 고른 간식을 바꾸어 권하지 않았다. 서로 다른 취향을 한 접시에 억지로 맞추지 않았다.','잘 쉬었냐는 질문에 유나는 쉬는 날에도 잘해야 할 일을 찾았다고 말했다. 우리는 오늘 할 일을 하나 줄였다.','유나가 먼저 물을 마시고 나서 이야기했다. 다른 사람 목마른지부터 묻지 않는 작은 순서가 오늘은 달랐다.'],minseo:['민서는 자리를 옮기기 전에 내 쪽에 보이는 풍경도 물었다. 같은 의자가 편한지 대신 정하지 않았다.','정리되지 않은 질문을 공책 한쪽에 그대로 남겼다. 오늘 답을 다 고르지 않아도 함께 있는 시간은 끝나지 않았다.','민서가 내가 고른 길을 따라오다 왜 이쪽인지 물었다. 고칠 점을 찾기 전에 이유를 듣는 연습이라고 했다.','민서는 설명을 멈추고 잠깐 조용히 있어도 되겠느냐고 물었다. 나는 내 하루를 한 가지 꺼냈다.'],doa:['도아는 업무 알림을 확인하고 개인 이야기를 할 수 있는 시간을 직접 말했다. 나는 그 몇 분을 더 늘려 달라고 하지 않았다.','입대 전에는 묻지 못했던 평범한 취향을 하나 물었다. 도아는 그때와 지금 답이 다르다고 했다.','도아는 잘 지냈다는 말 대신 오늘 어려웠던 일을 짧게 말했다. 나는 이유를 다 알아야 위로할 수 있다는 생각을 내려놨다.','옛날 기억이 아닌 오늘 같이 보고 싶은 풍경을 골랐다. 도아도 내 쪽의 지금을 다시 물었다.']};return moments[c][(w+i)%4];}
 function buildMeeting(p,w,dd,c,i,a,bg,place,slot){
  const d=P[c],after=dd==='tue'?day(w,'wed'):dd==='thu'?(w===15?'DOA15_REUNION':`LATE${w}_INCOMING`):dd==='fri'?`LATE${w}_PEERS`:specialSaturday(w),common={appointmentId:a.id,onDuty:{yuna:false}};
  make(p+'_ARRIVE',`${w}주 ${weekdays[dd]} ${a.time} · ${a.label}`,w,dd,bg,[c],[L(`${d.name}와 ${place}에서 만났다. 오늘 함께 하기로 한 일은 ${a.label}였다.`,'narrator',c==='yuna'?{clothingChanges:{yuna:true}}:{}),L('같은 활동을 다시 골랐어도 지난번의 대답을 오늘의 답으로 미리 쓰지는 않았다.')],p+'_TALK',common);
  const earliestNewArc={seoyeon:10,jiwoo:10,haerin:11,yuna:16,minseo:11};
  const arcBranches=Array.from({length:c==='doa'?4:10},(_,k)=>({stage:k+1,when:all(not(has('arc'+c+(k+1))),...Array.from({length:k},(_,j)=>has('arc'+c+(j+1)))),node:p+'_ARC'+(k+1)})).filter(b=>c==='doa'||b.stage<=6||w>=earliestNewArc[c]);
  make(p+'_TALK',`${w}주 · 오늘 꺼낼 말`,w,dd,bg,[c],[L('오늘 하고 싶은 이야기를 먼저 물었다. 지난 고민의 다음 장을 열어도 되고, 일상부터 나눠도 좋았다.')],null,{...common,choices:[C('continue','지난번 이후에 어떤 일이 있었는지 묻는다.',[...arcBranches,{node:p+'_DAILY'}]),C('daily','오늘은 각자의 하루와 활동 이야기를 나눈다.',p+'_DAILY')],migrationDefault:'daily'});
  const arcs=c==='doa'?d.arcs:[...personalArcs[c],...deeperArcs[c],...d.arcs];
  arcs.forEach((arc,k)=>{
   const stage=k+1,q=p+'_ARC'+stage;let lines,choices,close;
   if(Array.isArray(arc)){const [title,line,detail,mine,a1,a2,r1,r2]=arc;lines=[L(detail),L(line,c),L(mine,'player')];choices=[['a',a1,r1],['b',a2,r2]];close=d.closing;}
   else {lines=arc.lines.map(([t,s])=>L(t,s));choices=arc.choices.map(([id,label,response])=>[id,label,response]);close=arc.close;}
   make(q,`${w}주 · ${Array.isArray(arc)?arc[0]:arc.title}`,w,dd,bg,[c],lines,null,{...common,choices:choices.map(([id,label])=>C(id,label,q+'_'+id,[flag('arcChoice'+c+stage,id)]))});
   for(const [id,,response]of choices)make(q+'_'+id,`${w}주 · 이어서 남긴 말`,w,dd,bg,[c],[L(response,c),L(close)],p+'_DONE',{...common,exitEffects:[flag('arc'+c+stage),exp('personal-'+c+'-'+stage),rel(c)]});
  });
  make(p+'_DAILY',`${w}주 · 오늘 함께 하는 일`,w,dd,bg,[c],[L(w>=17?'뜨거운 길을 피해 그늘 자리를 골랐다. 물을 마시고 각자 이번 주에 시간을 어떻게 썼는지 이야기했다.':'각자 먼저 보고 싶은 부분을 골랐다. 같은 답을 맞히기보다 왜 그쪽을 골랐는지 번갈아 들었다.'),...lifeLines('study'),L(weeklySmall(c,w,i))],null,{...common,choices:[C('share','내가 망설였던 작은 일도 하나 이야기한다.',p+'_DONE',[rel(c,0,1)]),C('listen','상대가 더 하고 싶은 말을 기다린다.',p+'_DONE',[rel(c,1,0)])]});
  make(p+'_DONE',`${w}주 · 오늘의 만남을 마치며`,w,dd,bg,[c],[L('서로 돌아갈 시각을 확인했다. 남은 말은 다음에 다시 꺼내도 되는지 물으며 오늘의 약속을 마쳤다.')],p+'_NEXT',{...common,exitEffects:[{type:'appointment',...a,status:'completed'},exp(p+'-completed')]});
  buildNext(p+'_NEXT',w,dd,c,i,bg,place,p+'_LEAVE',false,common);
  make(p+'_LEAVE',`${w}주 · 각자의 다음 일정`,w,dd,w>=17?'bg.campus_summer':'bg.campus_day',[],[L('헤어진 뒤 각자의 다음 일정으로 향했다. 조금 전의 대화를 돌아오는 길에도 한 번 더 생각했다.')],after,{effects:[msg(p+'-after',c,c==='doa'?'오늘은 예전 이야기만 하지 않아서 좋았어요. 업무가 끝난 뒤에 또 연락할게요.':({seoyeon:'오늘 나눈 문장 생각났어요. 바로 정리 못 한 말은 다음에 다시 물어봐도 돼요?',jiwoo:'오늘 얘기, 집 오는 길에 다시 생각났어. 장난으로 넘기지 않고 들어 줘서 고마워.',haerin:'오늘은 예전 답 말고 지금 어떤지 다시 물어봐서 좋았어. 잘 들어갔지?',yuna:'오늘은 일 말고 내 얘기도 할 수 있었네. 너도 잘 들어갔지?',minseo:'오늘 같이 본 걸 한 줄 적어 뒀어요. 답이 같지 않아도 더 이야기할 수 있어서 좋았어요.'})[c],'in',contact(c))]});
 }
 function buildNext(id,w,dd,c,i,bg,place,back,incoming=false,common={}){
  const current=['tue','thu'].includes(dd)&&w!==16,tw=current?w:w+1,td=tw===16?'sat':'fri',tm=tw===16?'14:00':'12:20',ai=1-i,d=P[c];
  if(tw>24){make(id,`${w}주 · 다음에 남겨 둔 말`,w,dd,bg,incoming?[]:[c],[L('다음에 같이 해 보고 싶은 일을 적었다. 아직 이어지는 일정이 없는 시간을 확정한 약속으로 만들지는 않았다.')],back,common);return;}
  const app={id:extras(tw),character:c,week:tw,day:td,time:tm,activity:'late'+ai,label:d.activity[ai],place:d.place[ai],purpose:'weekly',origin:incoming?'incoming':'conversation'};
  make(id,`${w}주 · 다음 만남을 지금 정할까`,w,dd,bg,incoming?[]:[c],[L(incoming?'먼저 온 초대에 구체적인 시간도 함께 확인할 수 있었다.':'헤어지기 전에 오늘 나온 관심사로 다음 활동을 제안할 수 있었다. 이미 정한 다른 약속은 그대로 두었다.')],back,{...common,when:all(contact(c),freeExtra(tw)),choices:[C('leave','구체적인 약속은 다음에 다시 정한다.',back),C('ask',`${tw===w?'이번 주':'다음 주'} ${weekdays[td]} ${tm} · ${d.activity[ai]}를 제안한다.`,id+'_ASK')]});
  const request=`${tw}주 ${weekdays[td]} ${tm}, ${d.place[ai]}에서 ${d.activity[ai]} ${['haerin','jiwoo'].includes(c)?'어때?':'어때요?'}`;
  make(id+'_ASK',`${w}주 · 서로 같은 시간을 확인하고`,w,dd,bg,incoming?[]:[c],[L(incoming?'“'+request+'”':request,incoming?'narrator':'player'),L(incoming?'“'+d.reply+'”':d.reply,incoming?'narrator':c)],null,{...common,choices:[C('confirm','서로 확인한 시간으로 확정한다.',id+'_SET',[{type:'appointment',...app,status:'confirmed'},flag('lateExtraPerson'+tw,c),flag('lateExtraActivity'+tw,'a'+ai),msg(id+'-confirm',c,`${tw}주 ${weekdays[td]} ${tm}, ${d.place[ai]}`,'out')]),C('defer','이번에는 확정하지 않는다.',back)]});
  make(id+'_SET',`${w}주 · 달력에 남긴 다음 약속`,w,dd,bg,incoming?[]:[c],[L(`${tw}주 ${weekdays[td]} ${tm}. 서로 가능한 날짜와 장소만 달력에 남겼다. 다음 일요일에도 이 약속은 그대로 비워 둔다.`)],back,{...common,scheduledAppointmentId:app.id});
 }
 function buildLife(w,back){
  const p=`LATE${w}_LIFE`;make(p,`${w}주 수요일 밤 · 내 쪽의 하루`,w,'wed','bg.home_night',[],[L('누군가와 만나지 않는 시간도 내 하루였다. 지난번 실제로 해 둔 일에서 다음 한 가지를 골랐다.')],null,{choices:[C('study','과제·읽기 자료를 한 단계 진행한다.',p+'_study'),C('work','교내 근로 지원·진행을 확인한다.',p+'_work'),C('rest','밥과 휴식을 먼저 챙긴다.',p+'_rest'),C('family','집에 먼저 전화한다.',p+'_family')]});
  for(const [kind,key,steps,texts]of [['study','lifeStudy',['outline','draft','submitted'],['과제에서 답할 질문과 자료를 다시 골랐다.','지난번 적은 질문으로 초안을 썼다. 출처가 빠진 줄은 남겨 두지 않았다.','초안과 제출 항목을 확인하고 실제 접수 표시를 확인했다.']],['work','lifeWork',['browse','draft','sent'],['교내 근로 공고와 가능한 요일을 확인했다.','실제로 가능한 시간을 적어 지원서 초안을 만들었다.','접수 버튼을 누르고 확인 메일을 읽었다. 결과를 받은 일과는 달랐다.']]]){
   make(p+'_'+kind,`${w}주 · 마지막으로 해 둔 곳`,w,'wed','bg.home_night',[],[L('지난번 남긴 파일과 메모부터 확인했다.')],[...steps.map((s,i)=>({when:i?has(key,steps[i-1]):not(exists(key)),node:p+'_'+kind+'_'+i})),{node:p+'_'+kind+'_result'}]);
   steps.forEach((s,i)=>make(p+'_'+kind+'_'+i,`${w}주 · 오늘의 한 단계`,w,'wed','bg.home_night',[],[L(texts[i])],back,{exitEffects:[flag(key,s)]}));
   make(p+'_'+kind+'_result',`${w}주 · 제출 뒤에도 남는 시간`,w,'wed','bg.home_night',[],[L(kind==='study'?'제출한 일은 다시 제출했다고 세지 않았다. 받은 피드백 중 내가 고치고 싶은 한 군데를 다음 공부에 남겼다.':w>=17?'접수했던 교내 근로 지원의 결과 안내를 확인했다. 이번 모집에는 선발되지 않았다. 가능한 요일이 달라진 것을 확인하고 다음 공고 알림만 남겼다.':'접수 내역은 그대로였다. 결과 전인 일을 합격한 것처럼 말하거나 새 근무를 달력에 넣지 않았다.')],back,{exitEffects:kind==='work'&&w>=17?[flag('lifeWorkResult','not-selected')]:[]});
  }
  make(p+'_rest',`${w}주 · 오늘 멈출 곳`,w,'wed','bg.home_night',[],[L('간단히 밥을 차리고 휴대폰 충전기를 책상에 뒀다. 다 끝내서 쉬는 날만 기다리면 오늘은 쉬지 못할 것 같았다.')],back,{exitEffects:[flag('lifeCare','sleep')]});
  make(p+'_family',`${w}주 · 먼저 걸어 본 전화`,w,'wed','bg.home_night',[],[L('집에 전화해 잘된 일 하나와 말하기 어려웠던 일 하나를 같이 말했다. 어머니의 오늘 저녁 이야기도 끝까지 들었다.')],back,{exitEffects:[flag('lifeCare','family')]});
 }
 function buildPeer(w,back){
  const d=peerPlots[w],p=`LATE${w}_PEERS`;
  if(d){make(p,`${w}주 금요일 · ${d.title}`,w,'fri','bg.club_day',d.cast,d.lines,null,{choices:d.choices.map(([id,label,key,value])=>C(id,label,p+'_'+id,[flag(key,value)]))});for(const [id,,key,value,text]of d.choices)make(p+'_'+id,`${w}주 · 말 뒤에 남은 행동`,w,'fri','bg.club_day',d.cast,[L(text,'narrator',{stageCast:[]})],w===11?'FEST11_INVITE':back);}
  else make(p,`${w}주 금요일 · 정리하고 남기는 모임`,w,'fri','bg.club_day',[],[L(w>=17?'방학에는 모두가 매주 모이지 않았다. 이번에 가능한 사람들의 작업 공지만 확인하고 내 준비물을 정리했다.':'모임을 마치고 오늘 정한 일과 미뤄 둔 결론을 나눠 적었다. 없던 사람의 의견을 대신 정하지는 않았다.')],w===11?'FEST11_INVITE':back);
  // Another chance to exchange contacts remains optional, with actual face-to-face agreement.
  const n=byId.get(p),tail=n.next;if(!d){n.next=p+'_CONTACT';make(p+'_CONTACT',`${w}주 · 모임을 나서며`,w,'fri','bg.club_day',[],[L('학교에서 이미 인사하는 사람과 번호를 나눌 기회도 있었다. 처음 미뤘던 이유를 설명할 의무는 없었다.')],tail,{choices:[C('leave','오늘은 인사하고 먼저 간다.',tail),...main.map(c=>C(c,P[c].name+'에게 연락처를 물어본다.',p+'_CONTACT_'+c,[],not(contact(c))))]});for(const c of main)make(p+'_CONTACT_'+c,`${w}주 · 서로 괜찮은 걸 확인하고`,w,'fri','bg.club_day',[c],[L('다음에 개인적으로도 연락해도 되는지 물었다.'),L(['seoyeon','minseo'].includes(c)?'좋아요. 제가 먼저 저장할게요. 답장은 서로 가능한 때 해요.':'좋아. 내가 먼저 저장할게. 답장은 서로 편할 때 하고.',c)],tail,{exitEffects:[{type:'contact',character:c}]});}
  if(![11,19,22,23,24].includes(w))make(`LATE${w}_QUIET_SAT`,`${w}주 토요일 · 혼자 남긴 시간`,w,'sat',w>=17?'bg.campus_summer':'bg.park_day',[],[L('오늘은 정해진 행사가 없었다. 빨래를 돌리고 산책하다 떠오른 말을 다음에 묻고 싶은 질문으로 남겼다.')],afterSat(w));
 }
 function buildIncoming(w,back){
  const p=`LATE${w}_INCOMING`;make(p,`${w}주 목요일 밤 · 먼저 온 안부`,w,'thu','bg.home_night',[],[L('잠들기 전 받은 연락을 확인할지, 오늘은 쉬고 다음에 읽을지 골랐다.')],back,{choices:[C('rest','오늘은 쉬고 다음 일정으로 간다.',back),C('read','연락을 확인한다.',[...people.map(c=>({when:all(contact(c),has('arc'+c+'1')),node:p+'_'+c})),{node:back}])]});
  for(const c of people){const text=c==='doa'?'오늘은 업무 때문에 늦게 끝났어요. 다음에 개인 일정 맞춰 만나고 싶은데, 가능한 날 물어봐도 될까요?':P[c].name==='해린'?'오늘 이 색 보니까 네가 했던 말 생각났어. 예전 답 말고 요즘은 어떤지 다음에 또 물어볼게.':P[c].reply;
   make(p+'_'+c,`${w}주 목요일 밤 · ${P[c].name}의 연락`,w,'thu','bg.home_night',[],[L('“'+text+'”')],null,{effects:[msg(p+'-'+c,c,text,'in',contact(c))],choices:[C('reply','오늘 떠오른 안부에 답하고 다음 가능 시간을 물어본다.',p+'_'+c+'_REPLY'),C('later','반갑다고 답하고 구체적인 약속은 다음에 정한다.',back)]});
   make(p+'_'+c+'_REPLY',`${w}주 · 서로 가능한 다음 시간`,w,'thu','bg.home_night',[],[L('이미 예약한 약속을 바꾸지 않고, 다음 일요일에 서로 가능한 시간을 확인하기로 답했다. “보고 싶다”는 말과 날짜 확정은 따로 남겼다.')],p+'_'+c+'_NEXT',{effects:[msg(p+'-'+c+'-reply',c,'연락해 줘서 반가워'+(['seoyeon','minseo','doa','yuna'].includes(c)?'요. 다음 일요일에 가능한 날 같이 확인해요.':'. 다음 일요일에 가능한 날 같이 보자.'),'out')]});
   buildNext(p+'_'+c+'_NEXT',w,'thu',c,0,'bg.home_night','자취방',back,true);
  }
 }
 function buildDoa(){
  make('DOA15_REUNION','15주 목요일 · 공개특강 접수대',15,'thu','bg.seminar_day',['doa'],[L('다른 학과 공개특강에 신청해 접수대를 찾았다. 안내하던 조교가 내 이름을 읽고 잠깐 고개를 들었다.','narrator',{cast:[],stageCast:[]}),L('복학했어요? 목소리 듣고 혹시 했는데. 오랜만이네요.','doa',{shot:'medium',stageCast:['doa'],to:'player'}),L('백도아. 입대 전에 혼자 좋아했던 첫사랑이었다. 그때 끝내 말하지 못한 이름이 오늘의 명찰에 적혀 있었다.'),L('하지만 오늘의 도아는 접수 중이었다. 내가 오래 기억한 사람이라는 이유로 지금의 업무 시간을 내 몫처럼 가져갈 수는 없었다.')],null,{effects:[{type:'meet',character:'doa'},exp('doa-reunion')],choices:[C('wait','먼저 인사하고 일이 끝난 뒤 잠깐 말해도 되는지 묻는다.','DOA15_AFTER',[flag('doaBoundary',true)]),C('rush','반가운 마음에 지금 예전 이야기를 길게 꺼낸다.','DOA15_BUSY',[flag('doaBoundary',false)])]});
  make('DOA15_BUSY','15주 · 지금 필요한 대답',15,'thu','bg.seminar_day',['doa'],[L('저도 반가워요. 그런데 지금은 접수하는 분들이 기다려서요. 끝나고도 괜찮으면 그때 이야기할까요?','doa',{stageCast:['doa'],to:'player'}),L('나는 뒤에서 기다리는 사람을 보고 한 발 물러났다. 반가웠다는 말이 지금 답해 달라는 뜻으로 들렸을 수도 있겠다고 생각했다.')],'DOA15_AFTER');
  make('DOA15_AFTER','15주 목요일 · 업무가 끝난 뒤',15,'thu','bg.office_day',['doa'],[L('특강이 끝난 뒤 안내문을 정리하던 도아와 잠깐 마주쳤다. 같은 동아리 선배가 아니어서 여기서 만난 이유부터 다시 이야기했다.'),L('옛날 이야기만 하려니까 지금 어떻게 지내는지부터 모르겠네요. 개인적으로도 안부 물어봐도 될까요?','doa',{stageCast:['doa'],to:'player'})],null,{choices:[C('contact','서로 괜찮다고 확인하고 개인 번호를 나눈다.','DOA15_CONTACT',[{type:'contact',character:'doa'},rel('doa',0,1)]),C('later','오늘은 인사하고 다음에 다시 이야기하고 싶다고 한다.','DOA15_LEAVE')]});
  make('DOA15_CONTACT','15주 목요일 밤 · 오늘의 이름으로',15,'thu','bg.home_night',[],[L('업무가 끝나고 도아에게 짧은 안부가 왔다. 첫사랑이라는 말로 지금의 친밀함까지 앞당기지 않기로 했다.')],day(15,'fri'),{effects:[msg('doa15-first','doa','오늘 반가웠어요. 다음에는 업무 끝난 뒤 조금 더 이야기해요. 개인 일정은 서로 다시 확인하고요.')]});
  make('DOA15_LEAVE','15주 목요일 · 다음에 남겨 둔 말',15,'thu','bg.office_day',['doa'],[L('다음에 학교에서 보면 먼저 인사해요. 오늘 못 정한 걸 거절한 걸로 기억하지는 않을게요.','doa',{stageCast:['doa'],to:'player'})],day(15,'fri'));
  // A later optional encounter permits the missed exchange without invented texts.
  const n=byId.get(day(17,'mon')),back=n.next;n.next='DOA17_CONTACT';make('DOA17_CONTACT','17주 월요일 · 반납할 안내 책자',17,'mon','bg.office_day',['doa'],[L('특강 때 빌린 안내 책자를 반납하며 도아와 다시 인사했다. 오늘은 공식 접수 시간이 끝난 뒤였다.'),L('지난번 안부를 더 듣고 싶었어요. 개인 번호 나눠도 괜찮으면 이번에는 제가 먼저 물어볼게요.','doa',{stageCast:['doa'],to:'player'})],back,{when:not(contact('doa')),choices:[C('yes','좋다고 답하고 개인 번호를 나눈다.',back,[{type:'contact',character:'doa'}]),C('later','아직은 학교에서 인사하며 더 알아가고 싶다고 말한다.',back)]});
 }
 function buildFestival(){
  make('FEST11_INVITE','11주 금요일 · 축제에 같이 갈 사람',11,'fri','bg.club_day',[],[L('각자 부스 당번이 달랐다. 돌아보는 시간은 한 사람과 먼저 약속하고, 다른 사람을 마주쳐도 자기 일을 하고 있음을 기억하기로 했다.')],day(11,'sat'),{choices:[C('alone','이번에는 혼자 둘러본다.',day(11,'sat'),[flag('festival11Partner','alone')]),...main.map(c=>C(c,P[c].name+'의 빈 시간에 같이 둘러보자고 제안한다.',day(11,'sat'),[flag('festival11Partner',c)]))]});
  make('FEST11_START','11주 토요일 · 학교 축제',11,'sat','bg.festival_day',[],[L('부스가 열리고 지난주에 고른 전시 규모에 맞춰 준비한 것들을 꺼냈다. 보여 주지 않기로 한 글과 공개본은 서로 다른 폴더에 있었다.')],[...main.map(c=>({when:has('festival11Partner',c),node:'FEST11_'+c})),{node:'FEST11_PUBLIC'}]);
  for(const c of main)make('FEST11_'+c,'11주 토요일 · 함께 고른 축제 시간',11,'sat','bg.festival_day',[c],[L(P[c].name+'와 당번이 끝난 시각에 만났다. 무대 소리 사이로 서로 먼저 보고 싶은 부스를 말하며 걸었다.'),L('같은 축제를 보고도 방금 마음에 남은 장면은 달랐다. 상대의 답을 내 답으로 고치지 않고 하나씩 들었다.')],'FEST11_PUBLIC',{exitEffects:[exp('festival11-'+c),rel(c)]});
  make('FEST11_PUBLIC','11주 토요일 · 공개하기 전 마지막 확인',11,'sat','bg.festival_booth_day',['seoyeon','jiwoo'],[L('홍보용 화면을 켜기 전 지우가 공개본을 찾았다. 원본을 더 보여 달라는 관객도 있었지만 서연이 허락한 범위는 따로 있었다.','narrator',{stageCast:[]})],null,{choices:[C('approved','당사자가 확인한 공개본만 안내한다.','FEST11_END',[flag('peerSJ_public',true)]),C('private','잠깐만 보이는 거라며 원본 장면까지 보여 준다.','FEST11_END',[flag('peerSJ_public',false),flag('peerSJ_override',true)])]});
  make('FEST11_END','11주 토요일 · 소란이 지나간 자리',11,'sat','bg.festival_day',[],[L('확인한 범위 안에서만 공개해 달라는 부탁을 지켰다. 공연 뒤의 빈 자리에서 서연과 지우는 공개본 폴더를 따로 남겼다.','narrator',{when:has('peerSJ_public',true)}),L('공개하고 싶지 않았던 장면을 보인 일이 남았다. 서연은 왜 안 되는지 다시 설명해야 했고 지우는 상영을 멈췄다. 축제가 끝났다고 그 말까지 끝난 건 아니었다.','narrator',{when:has('peerSJ_public',false)})],afterSat(11),{exitEffects:[exp('campus-festival-completed')]});
 }
 function buildFireworks(){
  make('FIRE22_PICK','22주 토요일 · 불꽃놀이에 같이 갈 사람',22,'sat','bg.campus_summer',[],[L('불꽃놀이는 같은 하늘 아래 있다고 모두 같은 약속이 되는 것은 아니었다. 함께 볼 사람에게 먼저 가능한 시간을 물었다.')],null,{choices:[C('alone','혼자 강변으로 간다.','FIRE22_ALONE'),...people.map(c=>C(c,P[c].name+'에게 함께 볼 수 있는지 묻는다.','FIRE22_'+c,[],contact(c)))]});
  make('FIRE22_ALONE','22주 토요일 저녁 · 혼자 고른 자리',22,'sat','bg.river_day',[],[L('돗자리 없이도 앉을 자리는 있었다. 누군가와 오지 않은 날을 다른 결말의 실패로 적지는 않았다.')],'FIRE22_END');
  for(const c of people)make('FIRE22_'+c,'22주 토요일 밤 · 불꽃 사이의 말',22,'sat','bg.fireworks_night',[c],[L(P[c].name+'와 정한 자리에서 만났다. 소리가 큰 동안은 말을 멈추고, 불꽃이 뜸해진 사이에 오늘 어떻게 지냈는지 물었다.'),L(c==='doa'?'내가 기억한 옛날의 선배만 찾고 있었으면 오늘의 이런 표정은 못 봤을 것 같아요.':'다음에 또 만나고 싶은 이유를 오늘 같이 본 것 하나에서 찾아 말해도 될까'+(['seoyeon','minseo','yuna'].includes(c)?'요?':'?'),'player'),L(c==='doa'?'오늘의 저한테 물어봐 줘서 좋아요. 저도 지금 네가 어떤 마음인지 천천히 듣고 싶어요.':P[c].reply,c,{stageCast:[c],to:'player'})],'FIRE22_END',{exitEffects:[exp('fireworks22-'+c),rel(c)]});
  make('FIRE22_END','22주 토요일 밤 · 불이 꺼진 뒤에도',22,'sat','bg.home_night',[],[L('돌아와 물을 마시고 오늘 보낸 시간을 떠올렸다. 소리가 사라진 뒤에도 말해 보고 싶은 마음이 남았다.')],afterSat(22),{exitEffects:[exp('fireworks-completed')]});
 }
 function buildSummerMt(){
  // Choice is made before travel, with the same venue persisted across all scenes.
  const n=byId.get('LATE18_PEERS');for(const x of n.choices??[])x.next=x.next; // pair responses lead here below
  for(const x of nodes.filter(n=>n.id.startsWith('LATE18_PEERS_')&&!n.id.includes('CONTACT')))x.next='MT18_PICK';
  make('MT18_PICK','18주 금요일 · 여름 MT 장소 정하기',18,'fri','bg.club_day',[],[L('각자 갈 수 있는 날짜와 예산을 확인했다. 개인 분담금은 바다 65,000원, 계곡 45,000원, 호텔 수영장 90,000원이었다. 유나도 휴무를 맞출 수 있다고 답했지만, 도아는 같은 동아리가 아니어서 참가 명단에 넣지 않았다.'),L('바다는 해변 펜션, 계곡은 산장, 호텔 수영장은 가까운 리조트 공용 라운지까지 이용하는 일정이었다. 장소를 고른 뒤 이동편과 준비물을 확정하기로 했다.')],day(18,'sat'),{choices:[...Object.entries(venueNames).map(([v,name])=>C(v,name+'로 간다.',day(18,'sat'),[flag('summerVenue',v),{type:'money',amount:-({sea:65000,valley:45000,pool:90000})[v]},exp('summer-mt-reserved')])),C('skip','이번 MT는 참가하지 않고 내 주말을 보낸다.',day(18,'sat'),[flag('summerVenue','skip')])]});
  make('MT19_DEPART','19주 토요일 아침 · 여름 MT 출발',19,'sat','bg.busstop_day',[],[L('일요일에 정한 평일 약속은 따로 마쳤다. 오늘은 지난주 함께 고른 MT 장소로 이동하는 날이었다. 인원과 당번표를 다시 확인했다.','narrator',{when:not(has('summerVenue','skip'))}),L('이번 MT에는 참가하지 않기로 했다. 출발 시간에 맞춰 정류장으로 나가는 대신 집에서 내 주말을 보냈다. 다른 사람들이 다녀온 일을 내 추억으로 세지는 않았다.','narrator',{when:has('summerVenue','skip')})],[{when:has('summerVenue','skip'),node:'LATE19_HOME'},...Object.keys(venueNames).map(v=>({when:has('summerVenue',v),node:'MT19_'+v+'_ARRIVE'})),{node:'MT19_sea_ARRIVE'}]);
  for(const v of Object.keys(venueNames)){
   const p='MT19_'+v,bg=waterBg(v),loc=waterLoc(v),lodge=lodgeBg(v),outfit=v+'130';
   make(p+'_ARRIVE',`19주 토요일 · ${venueNames[v]}에 도착해서`,19,'sat',bg,[],[L(v==='sea'?'해변 숙소에 짐을 맡기고 물에 들어갈 수 있는 구역과 돌아올 시각을 확인했다.':v==='valley'?'산장에 짐을 두고 계곡 관리 구역과 얕은 물가의 동선을 먼저 확인했다.': '리조트 수영장 이용 시간과 시설 규칙을 확인했다. 객실에 먼저 들러 짐을 놓고 탈의 공간을 이용하기로 했다.'),L('각자 탈의 공간에서 물놀이 옷으로 갈아입었다. 사진을 찍을 때는 옷을 갈아입었다는 사실과 별개로 먼저 물어보기로 했다.')],p+'_PICK',{location:loc,exitEffects:[exp('summer-mt-'+v)]});
   make(p+'_PICK',`19주 토요일 · ${venueNames[v]}에서 함께 보낼 시간`,19,'sat',bg,[],[L('모두 같은 시간 내내 붙어 다닐 필요는 없었다. 한 사람에게 지금 같이 해 보고 싶은 일을 물어볼 수 있었다.')],null,{location:loc,choices:[C('rest','그늘에서 쉬며 각자 물놀이를 즐긴다.',p+'_CHANGE'),...main.map(c=>C(c,P[c].name+'에게 잠깐 함께 하자고 묻는다.',p+'_'+c))]});
   for(const c of main){const a=p+'_'+c;make(a,`19주 토요일 · ${venueNames[v]}의 ${P[c].name}`,19,'sat',bg,[c],[L(P[c].name+'도 물놀이 옷으로 갈아입고 약속한 자리로 나왔다.','narrator',{clothingChanges:{[c]:true}}),L(v==='sea'?'파도가 밀려올 때마다 한 발씩 물러섰다. 같은 속도로 들어가야 하는 것은 아니었다.':v==='valley'?'차가운 물에 발을 담그고 가까운 평평한 바위에 앉았다. 멀리 올라가지 않아도 함께 보이는 풍경은 달라졌다.':'물에서 나온 뒤 의자 간격을 맞춰 앉았다. 잘 수영하는 모습을 보여 주는 것보다 서로 쉬고 싶은 때를 묻는 게 먼저였다.'),L(c==='seoyeon'?'오늘 본 걸 꼭 글로 옮기지는 않을래요. 같이 본 사람한테 먼저 말해 보고 싶어요.':c==='jiwoo'?'찍고 싶은 장면이 많은데, 오늘은 네가 나오고 싶은지부터 물어볼게.':c==='haerin'?'옛날에도 물 차가운 건 싫어했지? 아, 지금도 그런지는 다시 물어봐야겠다.':c==='yuna'?'누가 배고픈지 먼저 챙기려다 멈췄어. 나도 지금은 그냥 놀러 온 사람이네.':'오늘은 물길을 설명하지 말고 그냥 발 담그고 있어도 되겠어요.',c,{stageCast:[c],to:'player'})],null,{location:loc,outfits:{[c]:outfit},choices:[C('ask','상대가 더 하고 싶은 활동과 쉬고 싶은 때를 묻는다.',a+'_END',[rel(c,1,1),flag('summerMoment_'+c,v)]),C('share','나도 오늘 어색했던 순간을 하나 솔직히 말한다.',a+'_END',[rel(c,0,2),flag('summerMoment_'+c,v)])]});make(a+'_END',`19주 토요일 · 물가에서 나누고 남긴 말`,19,'sat',bg,[c],[L('더 오래 같이 있어야 가까운 사이라는 뜻은 아니었다. 각자 물과 수건을 챙기고 약속한 집합 시각에 돌아왔다.')],p+'_REST',{location:loc,outfits:{[c]:outfit}});}
   make(p+'_REST',`19주 토요일 저녁 · ${venueNames[v]}에서 돌아오는 길`,19,'sat',v==='valley'?'bg.valley_path130_dusk':v==='pool'?'bg.pool_terrace130_dusk':bg,[],[L('물놀이를 마치고 물기를 닦으며 각자 쉬고 싶은 시간을 이야기했다. 해가 낮아져 숙소로 돌아가 마른 옷으로 갈아입기로 했다.')],p+'_CHANGE',{location:loc,timeOfDay:v==='sea'?'day':'dusk'});
   make(p+'_CHANGE',`19주 토요일 저녁 · 마른 옷으로 갈아입고`,19,'sat',lodge,[],[L('물놀이를 마치고 샤워한 뒤 젖은 옷을 따로 넣었다. 각자 편한 실내복으로 갈아입고 공용 거실로 나왔다.','narrator',{clothingChanges:Object.fromEntries(main.map(c=>[c,true]))}),L('준비표에 적은 사람이 자기 몫을 챙겼다. 유나가 쉬고 있는 자리를 보고도 누가 먼저 불러 부탁하지는 않기로 했다.')],p+'_GAME',{location:'lodge'});
   make(p+'_GAME','19주 토요일 밤 · 이번에는 누가 먼저 말할까',19,'sat',lodge,[],[L('맥주와 탄산수는 각자 골랐다. 마시지 않아도 답할 수 있는 손가락 게임으로 시작하고, 말하고 싶지 않은 질문은 넘길 수 있게 했다.'),L('“다른 사람이 나를 아는 모습과 내가 아는 내가 달랐던 적.” 질문을 읽자 누군가는 웃었고 누군가는 오래 생각했다. 오늘 모두의 대답을 한 번에 듣지는 않기로 했다.')],null,{location:'lodge',choices:main.map(c=>C(c,P[c].name+'의 이야기를 조금 더 듣는다.',p+'_GAME_'+c))});
   for(const c of main)make(p+'_GAME_'+c,'19주 토요일 밤 · 웃음 뒤에 남은 대답',19,'sat',lodge,[c],[L(P[c].pace+'이라는 말이 오늘은 조금 다른 뜻으로 들렸다.','narrator',{clothingChanges:{[c]:true}}),L(c==='seoyeon'?'잘 쓴 말이 아니어도 기다려 주는 사람이 있다는 걸 요즘 조금 믿어 봐요.':c==='jiwoo'?'내가 장난 안 치면 분위기 망친다고 생각했어. 근데 오늘은 그냥 말해도 되네.':c==='haerin'?'오래 알았다는 말로 지금 대답을 다 맞히려고 하진 않을래. 너도 나한테 다시 물어봐.':c==='yuna'?'쉬는 사람으로 앉아 있어도 되는 자리가 좋네. 오늘은 내가 먼저 일어나 치우지 않아도 되고.':'틀린 답이 아니어도 고치지 않고 남겨 둘 수 있는 게 있네요. 아직 연습 중이지만요.',c,{stageCast:[c],to:'player'})],p+'_WALK',{location:'lodge',outfits:{[c]:c==='yuna'?'lounge130':'lounge'}});
   make(p+'_WALK','19주 토요일 밤 · 잠깐 바람 쐬러 갈까',19,'sat',lodge,[],[L('거실 정리를 마친 뒤 밤바람을 쐬고 싶은지 물을 수 있었다. 오늘 대답을 더 듣고 싶은 한 사람에게만 먼저 제안했다.')],null,{location:'lodge',choices:[C('stay','오늘은 거실에 남아 쉰다.',p+'_HOME'),...main.map(c=>C(c,P[c].name+'에게 짧게 걸어도 좋은지 묻는다.',p+'_WALK_'+c))]});
   for(const c of main){const walkBg=v==='sea'?'bg.lodge_coast_night':lodge,walkLoc=v==='sea'?'coast':'lodge';make(p+'_WALK_'+c,'19주 토요일 밤 · 둘이 고른 거리',19,'sat',walkBg,[c],[L(P[c].name+'가 잠깐이면 좋겠다고 답했다. 바다는 밝은 숙소 앞길로 나갔고, 계곡과 호텔에서는 야외 물가 대신 공용 거실의 창가 쪽으로 자리를 옮겼다. 돌아갈 시각도 정했다.','narrator',{clothingChanges:{[c]:true}}),L('오늘 함께 놀았던 사람만 아는 말부터 꺼냈다. 다른 사람과 보낸 시간을 내가 함께 한 일처럼 섞지는 않았다.','narrator',{when:has('summerMoment_'+c,v)}),L('낮에는 따로 보낸 시간이 많았다고 말했다. 그래서 오늘 어땠는지 처음 듣는 얼굴로 물었다.','narrator',{when:not(has('summerMoment_'+c,v))}),L(c==='doa'?'':P[c].closing)],p+'_HOME',{location:walkLoc,timeOfDay:'night',outfits:{[c]:c==='yuna'?'lounge130':'lounge'},exitEffects:[flag('summerNightPartner',c),rel(c),exp('summer-night-'+c)]});}
   make(p+'_HOME','19주 토요일 밤 · 거실 불을 끄기 전에',19,'sat',lodge,[],[L('방으로 돌아가기 전에 물과 충전기를 챙겼다. 같이 걸은 사람이 있다면 문 앞에서 다시 인사했다. 모두에게 같은 밤의 추억이 생기지는 않았다.')],'MT19_SUNDAY',{location:'lodge'});
  }
  make('MT19_SUNDAY','19주 일요일 아침 · 우리가 고른 곳을 떠나며',19,'sun','bg.busstop_day',[],[L('숙소를 정리하고 빠진 물건을 확인했다. 어제의 역할표는 다음에도 유나가 알아서 챙길 목록이 아니라, 각자 다시 물어볼 일로 남겼다.'),...main.map(c=>L(P[c].name+'와 걸었던 밤의 대화가 버스를 기다리는 동안 떠올랐다.','narrator',{when:has('summerNightPartner',c)}))],sun(20),{exitEffects:[exp('summer-mt-completed')]});
 }
 function buildDoaTrip(){
  make('DOA23_OPTION','23주 토요일 · 따로 약속할 수 있는 휴무',23,'sat','bg.campus_summer',[],[L('도아는 여운 MT 참가자가 아니었다. 방학 끝자락의 개인 휴무를 확인한 뒤라면, 별도로 하루 외출을 제안할 수 있었다.')],afterSat(23),{choices:[C('rest','이번 주말은 내 생활을 정리한다.',afterSat(23)),...Object.entries(venueNames).map(([v,name])=>C(v,'도아에게 '+name+' 당일 외출을 제안한다.','DOA23_'+v,[],all(contact('doa'),has('arcdoa2'))))]});
  for(const v of Object.keys(venueNames))make('DOA23_'+v,'23주 토요일 · 업무와 별개로 고른 하루',23,'sat',waterBg(v),['doa'],[L('도아와 각자의 휴무와 이용 시간을 다시 확인하고 만났다. 옷을 갈아입는 공간은 따로 이용했고, 준비가 끝난 뒤 약속한 그늘 자리에서 만났다.','narrator',{clothingChanges:{doa:true}}),L('동아리 여행은 어땠는지 궁금했어요. 하지만 오늘은 남의 추억을 따라가는 날 말고 제 쪽에서도 처음인 하루면 좋겠네요.','doa',{stageCast:['doa'],to:'player'}),L('나는 오늘 처음 보고 싶은 풍경을 하나 골랐다. 도아도 예전에 좋아했을 것 같은 답 대신 지금 마음에 드는 쪽을 골랐다.')],null,{location:waterLoc(v),outfits:{doa:v+'130'},choices:[C('talk','지금 달라진 마음과 남은 망설임을 서로 묻는다.','DOA23_'+v+'_RETURN',[flag('doaSummerTrip',v),rel('doa',1,2)]),C('quiet','오늘은 편히 쉬고 다음에 더 이야기해도 되는지 묻는다.','DOA23_'+v+'_RETURN',[flag('doaSummerTrip',v),rel('doa',0,2)])]});
  for(const v of Object.keys(venueNames))make('DOA23_'+v+'_RETURN','23주 토요일 · 마른 옷으로 돌아오며',23,'sat','bg.campus_summer',['doa'],[L('샤워하고 각자의 마른 옷으로 갈아입은 뒤 돌아갈 차편을 기다렸다. 도아가 먼저 다음 개인 약속은 가능한 날을 다시 확인하자고 했다.','narrator',{clothingChanges:{doa:true}})],afterSat(23),{exitEffects:[exp('doa-summer-daytrip')]});
 }
 function buildExhibition(){
  make('EXHIBIT24_START','24주 토요일 · 여름 마지막 전시',24,'sat','bg.exhibition_evening',[],[L('서연의 글, 지우의 영상, 해린의 작업과 민서가 함께 본 동선이 각자의 자리에 놓였다. 유나는 부탁받은 시간만 들렀고, 전시를 보기 위해 일을 새로 떠맡지는 않았다.'),...peerStatusLines(),L('갈등이 모두 같은 결말로 끝나지는 않았다. 아직 조심스러운 관계도 자기 일을 마치고 인사할 수는 있었다.')],null,{choices:[C('public','당사자가 확인한 작업과 공개 범위만 안내한다.','EXHIBIT24_CLOSE',[flag('exhibitionConsent',true)]),C('listen','작품 설명보다 만든 사람들이 하고 싶은 말을 먼저 듣는다.','EXHIBIT24_CLOSE',[flag('exhibitionConsent',true)])]});
  make('EXHIBIT24_CLOSE','24주 토요일 밤 · 정리가 끝난 자리',24,'sat','bg.exhibition_night',[],[L('전시를 정리한 뒤 남은 의자를 원래 자리로 돌렸다. 함께 일한 것과 서로의 마음을 다 알게 된 것은 같지 않았다. 그래서 다음에 물어볼 말도 남았다.')],afterSat(24),{exitEffects:[exp('summer-exhibition-completed')]});
 }
}
