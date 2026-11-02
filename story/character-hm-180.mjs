// Applied Haerin/Minseo continuity repairs.
// Pass the frozen production 0.17 story as previous170, even when base has already
// received new universal callbacks. New lines deliberately have no source170.
import {has,all} from './everyday-tools.mjs?v=200';

const narrator=(text,when)=>({text,speaker:'narrator',stageCast:[],...(when?{when}:{})});
const key=line=>JSON.stringify([line.text,line.speaker,line.when??null]);
export function repairCharactersHM180(base,previous170=base){
 const oldById=new Map(previous170.nodes.map(n=>[n.id,n]));
 const nodes=base.nodes.map(n=>{
  const haerin=n.id.includes('_haerin_');
  const minseo=n.id.includes('_minseo_');
  const ownHaerin4=haerin&&/_ARC4$/.test(n.id);
  const ownHaerinLater=haerin&&/_LATER_SHARE$/.test(n.id);
  const ownMinseo3=minseo&&/_ARC3$/.test(n.id);
  const minseoLonger=minseo&&/_ARC3_longer$/.test(n.id);
  const minseoNext=minseo&&/_ARC3_next$/.test(n.id);
  const reflection=n.id==='SUMMER24_END';
  if(!ownHaerin4&&!ownHaerinLater&&!ownMinseo3&&!minseoLonger&&!minseoNext&&!reflection)return n;
  const old=oldById.get(n.id),origins=new Map((old?.lines??[]).map((l,i)=>[key(l),i]));
  const lines=n.lines.map(l=>{
   // Respect origins already established by a preceding wrapper. A newly added
   // callback has no matching old line and receives no fabricated old index.
   if(Number.isInteger(l.source170))return {...l};
   const originalIndex=origins.get(key(l));
   return originalIndex===undefined?{...l}:{...l,source170:originalIndex};
  });
  if(ownHaerin4){
   for(const l of lines)if(l.text==='나는 그럼 전화해 보라고 말하려다, 지난번 끝내지 못한 날에도 연락해 달라고 했던 말을 떠올렸다.')
    l.text='나는 그럼 전화해 보라고 말하려다, 서로 먼저 연락하지 못한 이유를 이야기했던 저녁을 떠올렸다. 이번에도 기다리는 마음부터 듣기로 했다.';
  }
  if(ownHaerinLater){
   for(const l of lines)if(l.speaker==='haerin'&&l.text==='우리 끝낸 날만 연락하지 말기로 했잖아. 정리 안 된 말이어도 오늘 먼저 한 거 좋네.')
    l.text='우리 서로 혼자 생각하다 연락을 놓쳤던 얘기 했잖아. 정리 안 된 말이어도 오늘 먼저 한 거 좋네.';
  }
  if(ownMinseo3){
   for(const l of lines)if(l.text==='나는 다음 수업 시간을 확인했다. 함께 있을 수 있는 시간을 실제로 확인하고 나서 다시 앉았다.')
    l.text='나는 이 뒤의 일정과 돌아갈 시각을 확인했다. 조금 더 머물 수 있는지와 오늘 어떻게 하고 싶은지는 따로 답할 일이었다.';
  }
  if(minseoLonger)lines.unshift(narrator('나는 다음 일정까지 남은 시간을 확인하고 십 분 더 함께 있고 싶다고 말했다. 민서도 괜찮다고 답한 뒤에야 다시 앉았다.'));
  if(minseoNext)lines.unshift(narrator('오늘 함께하기로 한 이십 분은 여기까지 쓰기로 했다. 더 머물 수 있다는 답이 오늘 더 있어야 한다는 뜻은 아니었다. 나는 다음에 만날 수 있는 날을 먼저 물었다.'));
  if(reflection){
   lines.push(
    narrator('해린과 연락이 끊겼던 이유를 이야기한 저녁이 떠올랐다. 끝내지 못한 날에도 연락해 달라는 말은 잘된 소식만 기다리는 사이로 돌아가지 않겠다는 내 쪽의 답이었다.',all(has('archaerin2'),has('arcChoicehaerin2','unfinished'))),
    narrator('해린이 바쁠 거라고 혼자 정하는 대신 내가 먼저 안부를 묻기로 했던 저녁이 떠올랐다. 가까운 사이라는 이유로 연락하지 않은 내 몫까지 해린의 사정으로 쓰지는 않기로 했다.',all(has('archaerin2'),has('arcChoicehaerin2','reciprocal'))),
    narrator('해린이 보여 준 접수 확인 사진이 생각났다. 결과가 나오기 전에 먼저 소식을 나눈 날이었다. 완성한 모습만 가져와야 만날 수 있는 자리는 아니었다.',has('archaerin6')),
    narrator('민서와 더 머물 수 있는 시간을 서로 확인한 뒤 다시 앉았던 날이 남았다. 도울 일이 없어도 기다리던 대답이 있었다.',all(has('arcminseo3'),has('arcChoiceminseo3','longer'))),
    narrator('민서와 정한 끝 시각을 지키고 다음 만남을 먼저 제안했던 날이 남았다. 짧게 떠나는 답도 다시 만나고 싶은 마음을 지우지는 않았다.',all(has('arcminseo3'),has('arcChoiceminseo3','next'))),
    narrator('민서가 연구 발표에서 모르는 질문에 확인해 답하겠다고 했던 날이 떠올랐다. 모른다고 말한 순간도, 아무것도 고쳐 주지 않고 만난 시간도 실패 목록에 넣지 않았다.',has('arcminseo6'))
   );
  }
  return {...n,lines};
 });
 return {...base,nodes};
}
