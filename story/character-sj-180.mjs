// Proposed character-specific repairs. Root owns composition, migration and publication.
import {lifeLines} from './life-choices.mjs?v=200';
import {has,all,any,not} from './everyday-tools.mjs?v=200';
import {relationshipPending} from './romance-150.mjs?v=200';
import {coupleStrained160} from './couple-160.mjs?v=200';
const remembers=(c,stage,...values)=>any(...values.map(v=>has(`arcChoice${c}${stage}`,v)));
const settled=c=>all(not(relationshipPending(c)),not(coupleStrained160(c)),not(has('couple160Ended_'+c)),not(has('overlap160Ever')));
const recall=(text,when)=>({text,speaker:'narrator',when,stageCast:[]});
export function repairSj180(base){
 const nodes=base.nodes.map(original=>{
  const seoyeon=/^(?:PLAN|FLEX)\d+_seoyeon_/.test(original.id);
  const familyClose=seoyeon&&/_ARC1_(permission|rewrite)$/.test(original.id);
  const fold=seoyeon&&/_ARC5$/.test(original.id);
  const application=seoyeon&&/_ARC6(?:_together)?$/.test(original.id);
  const ending=/^END150_(seoyeon|jiwoo)$/.test(original.id);
  if(!familyClose&&!fold&&!application&&!ending)return original;
  const n={...original,lines:original.lines.map((l,i)=>({...l,source170:l.source170??i})),choices:original.choices?.map(c=>({...c}))};
  if(familyClose)for(const l of n.lines)if(l.text==='서연이 종이 위에 오늘의 독자 두 명을 적었다. 내 이름 옆에 물음표를 붙였다가, 내 쪽을 보고 지웠다.'){
   l.text=original.id.endsWith('_permission')
    ?'서연은 종이 위에 ‘엄마께 먼저’라고 적었다. 나는 다시 읽어 주겠다는 약속부터 하기보다, 다음에 누구까지 보여 줄지 서연이 고를 자리를 남겼다.'
    :'서연은 원래 기억과 새로 써 보고 싶은 결말을 종이 양쪽에 나누어 적었다. 어느 판을 누구에게 보여 줄지는 오늘 한꺼번에 정하지 않았다.';
  }
  if(fold)for(const l of n.lines)if(l.text==='서연이 접어 둔 자기 답을 다시 폈다. 내 답 옆에 놓았지만 하나로 합치지는 않았다.')l.text='서연은 자기가 남기고 싶은 마지막 장면을 다시 짚었다. 내가 고른 곳과 나란히 두었지만 하나로 합치지는 않았다.';
  // Early weeks already corrected these invented player-application claims in0.10.
  // Raw late-start arc rebuilding reintroduced them. Add only state-backed work lines.
  if(application&&/_ARC6$/.test(original.id)){
   const lines=[];
   for(const l of n.lines){
    if(l.text.startsWith('나는 미뤄 둔 교내 지원서의 초안을 꺼냈다.')){
     lines.push({...l,text:'서연이 보내기 버튼을 누르기 전에 내 쪽은 어디까지 해 두었는지 물었다. 나는 지금까지 실제로 고른 일부터 말했다.'});
     lines.push(...lifeLines('work').map(status=>({...status,when:all(l.when,status.when)})));
    }else if(l.text.startsWith('서연이 내 지원 동기를 읽고'))lines.push({...l,text:'서연은 내가 왜 망설였는지부터 들었다. 무엇을 고칠지보다 다음에 해 보고 싶은 일의 이유를 물었다.'});
    else lines.push(l);
   }
   n.lines=lines;
   for(const c of n.choices??[]){if(c.id==='together')c.label='나도 실제로 가능한 다음 한 단계를 정해 이야기한다.';if(c.id==='stay')c.label='오늘은 서연의 제출을 축하하고 내 이야기는 천천히 꺼낸다.';}
  }
  if(application&&original.id.endsWith('_ARC6_together'))for(const l of n.lines)if(l.text==='그럼 둘 다 기다리는 사람 됐네요. 결과 오는 날 말고, 그전에도 만나 줘요.')l.text='그럼 각자 다음 걸 고르는 사람 됐네요. 결과 오는 날 말고, 그전에도 만나 줘요.';
  if(original.id==='END150_seoyeon'){
   n.lines.push(
    recall('서연이 어머니의 이야기를 어디까지 보여 줄지 고민하던 날이 떠올랐다. 먼저 두 사람만 읽을 판을 고른 일은, 좋아하는 사람의 사정도 내가 대신 공개할 수는 없다는 첫 답으로 남았다.',all(settled('seoyeon'),has('arcseoyeon2'),remembers('seoyeon',1,'private','permission'))),
    recall('서연과 실제 기억을 그대로 설명하지 않는 새 결말을 생각했던 날이 있었다. 어머니의 이야기는 어머니의 것으로 두고, 서연이 자기 문장을 고를 수 있는 자리를 남겼다.',all(settled('seoyeon'),has('arcseoyeon2'),remembers('seoyeon',1,'rewrite'))),
    recall('탈락 소식을 들었던 날에는 다음 공모전부터 찾지 않고 서연이 하고 싶은 말을 들었다. 안 뽑힌 글도 서연이 끝까지 쓴 글이라는 사실은 남았다.',all(settled('seoyeon'),has('arcseoyeon9'),remembers('seoyeon',9,'a'))),
    recall('탈락 소식을 들었던 날에는 무슨 말을 보탤지보다 말없이 걸어도 되는지부터 물었다. 서연이 자기 속도로 속상함을 말할 자리를 남긴 일이 오래 기억났다.',all(settled('seoyeon'),has('arcseoyeon9'),remembers('seoyeon',9,'b')))
   );
  }
  if(original.id==='END150_jiwoo'){
   n.lines.push(
    recall('지우와 마지막 길에는 사람을 세우지 않는 쪽을 골랐던 날을 기억했다. 잘 나온 컷을 놓아주는 일도 같이 만들고 싶은 영상을 고르는 일에 들어갔다.',all(settled('jiwoo'),has('arcjiwoo2'),remembers('jiwoo',1,'empty'))),
    recall('지우와 문제의 컷을 빼고 소리로 끝내는 쪽을 골랐다. 먼저 맞춘 음악보다 그 장면의 사람이 빼 달라고 한 답을 남기는 선택이었다.',all(settled('jiwoo'),has('arcjiwoo2'),remembers('jiwoo',1,'sound'))),
    recall('상영하기 전에 나오는 사람끼리 먼저 보는 자리를 제안했던 일도 남았다. 내 취향과 다른 장면을 고를 권리가 화면 속 사람에게도 있다는 걸 함께 배웠다.',all(settled('jiwoo'),has('arcjiwoo3'),remembers('jiwoo',2,'review'))),
    recall('지우와 수정본을 그날 둘만 보고 다음 판단을 내일로 남긴 일이 있었다. 서둘러 인정받고 싶었던 마음을 바로 남의 허락으로 바꾸지 않은 선택이었다.',all(settled('jiwoo'),has('arcjiwoo3'),remembers('jiwoo',2,'pause','private')))
   );
  }
  return n;
 });
 return {...base,nodes};
}
