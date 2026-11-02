import {personalities} from '../story/late-personal-content.mjs?v=200';
const venues={
 seoyeon:[
 ['책방 창가에서 서로 고른 책 읽기','동네 책방 창가 테이블','bg.bookshop_day','bookshop','원고부터 꺼내지 않고 서로 고른 책의 첫 쪽을 읽었다. 마음에 걸린 문장은 서연이 먼저 골랐다.'],
 ['도서관 작은 열람석에서 문장 나누기','도서관 안쪽 작은 열람석','bg.library_talk170','library','서연은 소리 내어 읽기 어려운 문장에 작은 표시를 했다. 나는 그 표시가 끝난 뒤 어느 부분부터 함께 볼지 물었다.'],
 ['카페에서 책갈피와 오늘의 문장 고르기','카페 안쪽 책장이 있는 테이블','bg.cafe_summer180','cafe','각자 음료를 놓고 오늘 기억하고 싶은 한 문장을 골랐다. 서연은 잘 쓴 문장보다 자꾸 돌아보게 되는 문장을 찾았다.']],
 jiwoo:[
 ['카페에서 소리 없이 짧은 영상 보기','카페 구석 노트북을 펴는 자리','bg.cafe_summer180','cafe','이어폰은 한쪽씩 나누지 않고 번갈아 들었다. 지우는 소리를 지웠을 때도 남는 장면이 무엇인지 물었다.'],
 ['빈 강의실에서 작은 상영회 열기','예약이 비어 있는 강의실','bg.lecture_day','lecture','노트북 화면을 함께 보기 편한 자리에 놓았다. 지우는 오늘은 공개할 영상을 고르지 말고 그냥 본 느낌부터 말하자고 했다.'],
 ['책방에서 영화책과 장면 제목 찾기','동네 책방의 긴 테이블','bg.bookshop_day','bookshop','책에 나온 장면과 지우가 떠올린 장면은 달랐다. 서로 먼저 떠오른 제목을 듣고 나서야 책을 다시 펼쳤다.']],
 haerin:[
 ['시장 식탁에서 간단히 먹고 근황 나누기','시장 안 메뉴판이 놓인 식탁','bg.market_day','market','해린이 메뉴판을 내 쪽으로 돌렸다. 늘 먹던 것을 맞혀 주는 대신 오늘 궁금한 쪽을 각자 고르기로 했다.'],
 ['카페에서 색과 메뉴를 하나씩 고르기','큰 창이 있는 카페 테이블','bg.cafe_summer180','cafe','햇빛이 닿는 색 견본과 음료의 색을 번갈아 보았다. 해린은 예전 취향을 기억하는 것보다 오늘 고른 이유가 궁금하다고 했다.'],
 ['전시실 휴게석에서 색 견본 펼쳐 보기','작은 전시실의 휴게 테이블','bg.city_gallery_day','city-gallery','해린이 가져온 색 견본을 휴게 테이블에 펼쳤다. 작품을 평가하기보다 같은 색이 어떻게 달라 보였는지 이야기했다.']],
 yuna:[
 ['쉬는 날 카페 창가에서 각자 음료 마시기','온유의 조용한 창가 테이블','bg.cafe_summer180','cafe','유나는 손님으로 앉아 자기 음료를 골랐다. 나는 오늘도 누군가를 챙기는 시간이 되지 않게 내 주문부터 직접 골랐다.'],
 ['퇴근 뒤 시장에서 간식 하나씩 고르기','시장 골목의 작은 간식 식탁','bg.market_day','market','유나는 오늘은 손님에게 권할 메뉴를 찾지 않고 자기가 궁금한 간식을 골랐다. 먼저 앉아 쉬고 싶은지도 같이 확인했다.'],
 ['퇴근 뒤 책방 휴게석에서 쉬어 가기','동네 책방의 작은 휴게석','bg.bookshop_day','bookshop','유나는 누군가에게 도움이 될 책을 찾다가 손을 멈췄다. 오늘은 자기가 읽고 싶은 쪽을 고르고 잠깐 쉬기로 했다.']],
 minseo:[
 ['전시실에서 직접 본 공간 이야기하기','전시실의 휴게 테이블','bg.city_gallery_day','city-gallery','민서는 가져온 도면을 접어 두고 실제로 걸어 본 자리를 먼저 이야기했다. 숫자와 느낌이 다른 부분을 급히 한 답으로 정리하지 않았다.'],
 ['도서관에서 각자 읽고 잠깐 이야기하기','도서관 안쪽 작은 테이블','bg.library_talk170','library','민서와 각자 읽을 것을 먼저 펼쳤다. 궁금한 부분이 생겨도 바로 설명해 달라고 하지 않고 서로 쉬는 때를 기다렸다.'],
 ['카페에서 연구와 무관한 취향 나누기','카페 안쪽 조용한 테이블','bg.cafe_summer180','cafe','민서는 자료 대신 메뉴판을 오래 봤다. 무엇을 고른 이유까지 잘 설명해야 하는 것은 아니라고 말하자 자기 쪽 선택을 천천히 골랐다.']],
 doa:[
 ['책방에서 각자 고른 책 이야기하기','동네 책방 창가 테이블','bg.bookshop_day','bookshop','도아는 예전에 좋아했을 법한 책 대신 지금 궁금한 책을 골랐다. 나는 그 이유를 옛 기억으로 맞혀 보지 않고 직접 물었다.'],
 ['카페에서 일과 무관한 요즘 취향 나누기','카페 안쪽 조용한 테이블','bg.cafe_summer180','cafe','업무 연락을 잠깐 내려놓은 뒤 도아와 각자 음료를 골랐다. 예전 이야기를 꺼내기 전에 오늘 어떻게 지냈는지부터 들었다.'],
 ['전시실 휴게석에서 지금의 감상 나누기','작은 전시실 휴게 테이블','bg.city_gallery_day','city-gallery','도아와 같은 작품을 본 뒤 휴게석에 앉았다. 먼저 답을 아는 선배와 따라가는 후배 대신 각자 다르게 본 것을 말해 보기로 했다.']]
};
const key=(w,c,slot)=>`venue240_${w}_${c}_${slot}`;
export function venueOption240(w,c,slot,index){
 const pool=venues[c].filter(row=>row[2]!==personalities[c].bg[index]);
 let selected=(w+index)%pool.length;
 if(index===1&&pool.length>1&&pool[selected][2]===venueOption240(w,c,slot,0).background)selected=(selected+1)%pool.length;
 const [label,place,background,location,detail]=pool[selected];
 return {week:w,character:c,slot,index,key:key(w,c,slot),value:'slot'+index,label,place,background,location,detail};
}
export function addVenueChoices240(base){
 return {...base,nodes:base.nodes.map(n=>{
  const h=n.id.match(/^LATE(\d+)_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_(ACT|EXTRA_ACT)$/);if(!h)return n;
  const w=+h[1],c=h[2],slot=h[3]==='ACT'?'main':'extra';
  const extras=(n.choices??[]).filter(ch=>/^a[01]$/.test(ch.id)).map(ch=>{
   const v=venueOption240(w,c,slot,+ch.id[1]);
   return {...ch,id:ch.id+'_venue240',label:v.label+' · 새 장소',when:{all:[ch.when,{flag:'arc'+c+(c==='doa'?2:6),value:true}]},effects:[{type:'flag',key:v.key,value:v.value},...(ch.effects??[])],venue240:true};
  });
  return {...n,choices:[...(n.choices??[]),...extras],choicePrompt:'어디서 무엇을 함께 할까? 개인 이야기는 만난 뒤 이어 들을 수 있어.'};
 })};
}
function sourceInfo(source){
 let h=source.match(/^PLAN(\d+)_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(main|extra)([01])_/);
 if(h)return {week:+h[1],character:h[2],slot:h[3],index:+h[4]};
 h=source.match(/^LATE(\d+)_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_(MAIN|EXTRA)_TIME([01])/);
 return h?{week:+h[1],character:h[2],slot:h[3].toLowerCase(),index:+h[4]}:null;
}
export function selectedVenue240(source,world){const d=sourceInfo(source);return !d||world.flags[key(d.week,d.character,d.slot)]!=='slot'+d.index?null:venueOption240(d.week,d.character,d.slot,d.index);}
function replaceInvitation(text,v){
 const old=personalities[v.character],action=v.label.replace(/^.*?에서\s*/,'');
 return text.replaceAll(old.place[v.index]+'에서 '+old.activity[v.index],v.place+'에서 '+action).replaceAll(old.place[v.index],v.place).replaceAll(old.activity[v.index],v.label);
}
export function venueEffect240(effect,source,world){
 const v=selectedVenue240(source,world);if(!v)return effect;
 const appointmentId=v.slot==='main'?'plan-w'+String(v.week).padStart(2,'0'):'late-extra-w'+v.week;
 if(effect.type==='appointment'&&effect.id===appointmentId&&effect.activity==='late'+v.index&&effect.week===v.week&&effect.character===v.character)return {...effect,label:v.label,place:v.place,venue240:{background:v.background,location:v.location,key:v.key}};
 if(effect.type==='message'&&/_(?:SEND|REPLY)(?:\/|$)/.test(source)&&effect.character===v.character)return {...effect,text:replaceInvitation(effect.text,v)};
 return effect;
}
export function venueLine240(node,line,index,world){
 const v=selectedVenue240(node.venueOrigin310??node.id,world);if(!v)return line;
 if(node.id.endsWith('_ARRIVE')&&line.speaker==='narrator'){
  if(line.text.includes(personalities[v.character].place[v.index])&&line.text.includes('에서 만났다.'))return {...line,text:`${personalities[v.character].name}${['seoyeon','haerin'].includes(v.character)?'과':'와'} ${v.place}에서 만났다. 오늘 함께 하기로 한 일은 ${v.label}였다.`};
  if(line.text==='같은 활동을 다시 골랐어도 지난번의 대답을 오늘의 답으로 미리 쓰지는 않았다.')return {...line,text:v.detail};
 }
 if(/_(SEND|REPLY)$/.test(node.id))return {...line,text:replaceInvitation(line.text,v)};
 return line;
}
export function venuePresentation240(node,line,world){
 const v=node.venueDetached310?null:selectedVenue240(node.venueOrigin310??node.id,world);return !v||node.week!==v.week||(!node.cast?.includes(v.character)&&!node.venueOrigin310)?null:{background:v.background,location:v.location};
}
export function venueChoice240(node,choice,world){const v=selectedVenue240(node.id,world);return v&&/_TIME[01]$/.test(node.id)?{...choice,label:replaceInvitation(choice.label,v)}:choice;}
