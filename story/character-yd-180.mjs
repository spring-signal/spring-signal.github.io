// Applied character-specific continuity repairs.
// It preserves all node IDs, line source positions, decisions and effects.
// Apply before the universal 180 emotion/event guards so the new alternate
// Doa trip line receives the same pending-state treatment as its siblings.
import {L} from './weekly-plans.mjs?v=200';
import {has,all,any,not} from './everyday-tools.mjs?v=200';

const giftIntro='유나는 선물 봉투를 만지다 자기 쪽으로 당겼다. “고맙다는 말은 하고 싶은데, 받은 만큼 다시 잘해 줘야 할 것 같으면 좀 무거워져.”';
const giftMine='나는 호의를 받고도 확인을 더 받고 싶어질 때 선물을 핑계로 쓴 적이 있다고 말했다. 잘해 주면 내 자리를 잃지 않을 것 같아서 그랬다고.';
const giftNeed='주는 마음을 싫다고 하는 건 아니야. 내가 오늘 기쁘게 못 받아도 그 마음으로 내 표정을 사 두진 말아 줘.';
const tasteIntro='유나는 자기가 고른 간식과 내 쪽 접시를 번갈아 봤다. “내가 고른 맛이 네 입에는 안 맞을 수도 있잖아. 그런데 네가 좋다고 해야 내가 잘 고른 사람이 되는 것처럼 기다렸네.”';
const tasteMine='나는 유나가 고른 건 다 좋다고 답하면 가까운 사람처럼 보일까 생각했다고 말했다. 그러다 내 취향을 말하지 않으면 유나도 내 쪽을 다시 물을 수 없겠다고.';
const tasteNeed='다른 걸 좋아해도 같이 온 날이 줄어드는 건 아니니까. 내가 고른 걸 바꾸려 하지 말고 네가 고른 맛도 따로 들려줘.';
const tasteAvoid='같이 왔으니 내가 고른 맛으로 맞추는 게 낫겠다고 한다.';
const tasteHurt='같이 먹으러 왔다고 내가 고른 것까지 바꿔야 하는 거면, 오늘도 네가 좋아할 답부터 고르게 되잖아. 지금은 내 쪽에서 고른 걸 그대로 두고 싶어.';
const tripAttended=any(...['sea','valley','pool'].map(v=>has('summerVenue',v)));

export function repairYunaDoa180(base){
 const changed=new Map();
 const edit=n=>{
  if(!changed.has(n.id))changed.set(n.id,{...n,lines:n.lines.map((l,i)=>({...l,source170:l.source170??i}))});
  return changed.get(n.id);
 };
 for(const original of base.nodes){
  if(original.id==='DOA17_CONTACT'){
   const n=edit(original);
   n.lines[0]={...n.lines[0],text:'다음 공개특강 일정을 확인하러 갔다가 안내를 마친 도아와 다시 인사했다. 오늘은 공식 접수 시간이 끝난 뒤였다.'};
  }
  if(/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC1$/.test(original.id)){
   const n=edit(original);n.lines=n.lines.map(l=>l.text==='유나는 앞치마 주머니에서 작은 수첩을 꺼냈다. 레시피 옆에 버터 가격과 버려진 조각 무게가 적혀 있었다.'?{...l,text:'유나는 작은 수첩을 꺼냈다. 레시피 옆에 버터 가격과 버려진 조각 무게가 적혀 있었다.'}:l);
  }
  if(/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC9$/.test(original.id)){
   const n=edit(original);
   n.lines=n.lines.map(l=>({...l,text:l.text===giftIntro?tasteIntro:l.text===giftMine?tasteMine:l.text===giftNeed?tasteNeed:l.text}));
   n.choices=n.choices.map(ch=>ch.id==='avoid140'?{...ch,label:tasteAvoid}:ch);
  }
  if(/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC9_avoid140$/.test(original.id)){
   const n=edit(original);n.lines[0]={...n.lines[0],text:tasteHurt};
  }
  if(/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARRIVE$/.test(original.id)){
   const oldA='받는 쪽의 마음을 유나가 고르도록 둔 일이 떠올랐다.';
   const oldB='호의에 같은 크기의 답을 붙이지 않았던 약속이 떠올랐다.';
   if(original.lines.some(l=>l.text===oldA||l.text===oldB)){
    const n=edit(original);n.lines=n.lines.map(l=>({...l,text:l.text===oldA?'유나가 고른 맛과 내 취향을 따로 말했던 날이 떠올랐다.':l.text===oldB?'다음 쉬는 날에는 유나도 처음인 곳을 골라도 좋겠다고 물었던 말이 떠올랐다.':l.text}));
   }
  }
  if(/^PLAN\d+_doa_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC2$/.test(original.id)){
   const n=edit(original);
   n.lines.unshift(
    L('공개특강 접수대에서 반가운 마음에 말을 길게 붙였던 일이 떠올랐다. 오늘은 명찰을 빼고 만났어도 도아가 어디까지 이야기하고 싶은지는 다시 물을 일이었다.','narrator',{when:has('doaBoundary',false)}),
    L('공개특강이 끝날 때까지 기다렸다가 인사했던 날이 떠올랐다. 오늘도 업무가 끝났다는 사실과 무엇이든 부탁해도 된다는 뜻은 나누어 두었다.','narrator',{when:has('doaBoundary',true)})
   );
  }
  if(/^DOA23_(sea|valley|pool)$/.test(original.id)){
   const n=edit(original),index=n.lines.findIndex(l=>l.text.startsWith('동아리 여행은 어땠는지 궁금했어요.'));
   if(index>=0){
    const old=n.lines[index];
    n.lines[index]={...old,when:all(old.when??{all:[]},tripAttended)};
    n.lines.splice(index+1,0,L('오늘은 동아리 일정과 별개로 우리가 고른 하루네요. 남의 여행 이야기 말고, 지금 보고 싶은 풍경부터 정하면 좋겠어요.','doa',{stageCast:['doa'],to:'player',emotion:old.emotion??'neutral',when:all(old.when??{all:[]},not(tripAttended))}));
   }
  }
  if(original.id==='SUMMER24_END'){
   const n=edit(original);
   n.lines.push(
    L('유나의 수첩에는 남은 여섯 조각 옆으로 네 조각이라는 숫자가 이어져 있었다. 내가 한 조각을 사던 날 유나는 서비스 조각을 더 넣으려다 손을 멈췄다. 그때처럼, 잘했다고 말해 주는 일과 대신 다 해 주는 일은 따로 남겨 두고 싶었다.','narrator',{when:has('arcyuna2')}),
    L('유나가 다른 가게에 보냈던 문의의 답장도 떠올랐다. 옮길 곳을 정해 둔 말은 아직 없었다. 다음에 만나면 내가 익숙한 가게에 남는지를 묻기보다, 유나가 자기 생활에서 꼭 남기고 싶은 조건을 더 듣고 싶었다.','narrator',{when:has('arcyuna6')}),
    L('접수대 명찰에서 다시 읽었던 이름을, 나는 어느 날 내 첫사랑이었다고 소리 내어 말했었다. 그 말을 꺼낸 뒤에도 도아의 대답을 기다릴 시간은 따로 남아 있었다. 오래 기억한 마음 옆에, 오늘 처음 듣고 싶은 이야기가 생겼다.','narrator',{when:has('arcdoa3')}),
    L('도아와 다시 인사한 뒤에도 옛날의 마음을 모두 말한 것은 아니었다. 오래 기억했다는 사실과 지금 서로를 얼마나 아는지는 다른 자리에 남아 있었다.','narrator',{when:all({met:'doa'},not(has('arcdoa3')))})
   );
  }
 }
 return {...base,nodes:base.nodes.map(n=>changed.get(n.id)??n)};
}
