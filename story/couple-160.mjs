import {L,C} from './weekly-plans.mjs?v=200';
import {has,flag,all,any,not,exp,exists} from './everyday-tools.mjs?v=200';
import {relationshipPending} from './romance-150.mjs?v=200';
import {coupleContent as D} from './couple-content-160.mjs?v=200';
export const coupleStrained160=c=>any(...['strained','observing','testing'].map(s=>has('couple160State_'+c,s)));
const lover=c=>has('romance150Lover_'+c),people=Object.keys(D);
const rel=(c,trust)=>({type:'relation',character:c,trust});
export function addCoupleLife160(base){
 const changed=new Map(),added=[];
 const edit=n=>{if(!changed.has(n.id)){const x={...n,lines:n.lines.map((l,i)=>({...l,source150:l.source150??i})),choices:n.choices?.map(ch=>({...ch})),effects:n.effects?.map(e=>({...e})),exitEffects:n.exitEffects?.map(e=>({...e}))};changed.set(n.id,x);}return changed.get(n.id);};
 const make=(n,id,label,lines,next,extra={})=>{const x={...n,id,label,lines,next,choices:undefined,effects:[],exitEffects:[],when:undefined,terminal:false,...extra};added.push(x);return x;};
 for(const original of base.nodes){
  const talk=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_TALK$/);
  if(talk&&original.week>=17){
   const c=talk[1],d=D[c],n=edit(original),p=n.id+'_COUPLE160',daily=n.id.replace(/_TALK$/,'_DAILY'),state='couple160State_'+c,day='couple160Day_'+c,step='couple160Step_'+c;
   for(const ch of n.choices)ch.when=all(ch.when,not(coupleStrained160(c)));
   n.choices.push(C('couple160','연인이 된 뒤 달라진 평범한 하루를 이야기한다.',d.episodes.map((_,i)=>({when:i?has(step,i):not(exists(step)),node:p+'_EP'+i})),[],all(lover(c),not(relationshipPending(c)),not(coupleStrained160(c)),not(has(step,3)),not(has(day,n.day)))));
   n.choices.push(C('coupleRepair160','연인이 된 뒤 끝내지 못한 말부터 다시 듣는다.',[{when:has(state,'strained'),node:p+'_HEAR'},{when:has(state,'observing'),node:p+'_PRACTICE0'},{node:p+'_PRACTICE1'}],[],all(lover(c),not(relationshipPending(c)),coupleStrained160(c),not(has(day,n.day)))));
   d.episodes.forEach(([title,intro,ask,mine,a,b,replyA,replyB],i)=>{
    const q=p+'_EP'+i;
    make(n,q,n.label+' · '+title,[L(intro),L(ask,c,{emotion:'serious'}),L(mine,'player')],null,{choices:[C('a',a,q+'_A'),C('b',b,q+'_B'),C('press','연인이니까 내 마음부터 맞춰 줘야 하지 않느냐고 한다.',p+'_MISSED',[flag('couple160Topic_'+c,'everyday-'+i)])]});
    for(const [id,reply]of [['A',replyA],['B',replyB]])make(n,q+'_'+id,n.label+' · 서로 고른 오늘의 방식',[L(reply,c,{emotion:i===2?'happy':'neutral'}),L('나는 서운했던 부분까지 바로 없어진 척하지 않았다. 오늘 함께 정한 만큼을 다음 만남에서도 지킬 수 있는지 천천히 보자고 했다.')],daily,{exitEffects:[flag(step,i+1),flag(day,n.day),flag('couple160Choice_'+c+'_'+i,id.toLowerCase()),exp('couple160-'+c+'-'+i)]});
   });
   make(n,p+'_HEAR',n.label+' · 가까워진 뒤에 더 말하기 어려웠던 것',[L(d.hurt,c,{emotion:'serious',when:not(has('couple160Topic_'+c,'jealousy'))}),L(d.jealous,c,{emotion:'serious',when:has('couple160Topic_'+c,'jealousy')}),L('사귀기 전에는 기다리던 답을 이제는 당연히 받을 수 있다고 생각한 순간이 있었다. 나는 변명부터 꺼내려던 입을 다물고, 상대가 겪은 장면을 다시 들었다.','player'),L(d.need,c,{emotion:'serious',when:not(has('couple160Topic_'+c,'jealousy'))})],null,{choices:[C('hear','내 뜻을 설명하기 전에, 상대가 받은 느낌과 바라는 변화를 확인한다.',p+'_HEARD'),C('defend','연인이 됐는데 이 정도도 이해 못 하느냐고 한다.',p+'_MISSED'),C('later','생각할 시간을 갖고 다른 날 다시 듣기로 한다.',p+'_LATER')]});
   make(n,p+'_HEARD',n.label+' · 사과 다음에 아직 남은 거리',[L('우리는 지금 괜찮아졌다는 답을 주고받지는 않았다. 다음에 무엇을 멈추고 무엇을 먼저 물어볼지 각자 자기 말로 다시 말했다. 함께 할 활동은 남아 있었지만 서로의 표정을 살피는 속도는 조금 달라졌다.')],daily,{exitEffects:[flag(state,'observing'),flag(day,n.day),exp('couple160-'+c+'-heard')]});
   for(let i=0;i<2;i++){
    make(n,p+'_PRACTICE'+i,n.label+' · '+(i?'다른 날에도 지킬 수 있는지':'말을 듣고 다시 만난 날'),[L(i?'이번에도 마음을 빨리 확인하고 싶은 순간이 왔다. 지난번 한 행동이 다음에도 같은 답으로 남을지, 이번에는 내 쪽에서 멈춰 볼 차례였다.':'지난번 정한 방식이 떠오르는 작은 순간이 왔다. 잘 듣고 있다는 말보다, 오늘 어떤 행동을 고를지가 먼저 보였다.')],null,{choices:[C('respect',i?'오늘도 먼저 물어보고 들은 답에 맞춰 행동한다.':'약속한 만큼만 묻고, 상대가 정한 답을 기다린다.',p+'_ACTION'+i),C('bargain','이번에는 나를 먼저 이해해 달라고 부탁한다.',p+'_MISSED'),C('later','오늘은 더 생각하고 다음에 이어 가기로 한다.',p+'_LATER')]});
    make(n,p+'_ACTION'+i,n.label+' · '+(i?'두 번째 날의 달라진 행동':'처음 다르게 해 본 날'),[L(d.actions[i],'narrator',{when:not(has('couple160Topic_'+c,'jealousy'))}),L(i?'오늘도 서로의 일정에서 궁금한 부분을 숨기지 않고 물었다. 불안하다고 말하는 것과 다른 만남을 전부 막는 일은 나누어 두기로 했다.':'지난번 다른 사람과 만난 시간을 어떤 약속이었는지 내 말로 설명했다. 상대가 서운했던 부분을 다시 물으며, 누구를 만날지 대신 정하게 하지는 않았다.','narrator',{when:has('couple160Topic_'+c,'jealousy')}),L(i?d.recovered:'한 번 달라진 행동을 봤다고 오늘 바로 예전처럼 편해지지는 않았다. 그래도 다음에 다시 말해 볼 자리는 조금 남았다.',i?c:'narrator',{emotion:i?'happy':'serious'})],daily,{exitEffects:[flag(state,i?'settled':'testing'),flag(day,n.day),flag('couple160Evidence'+(i+1)+'_'+c),exp('couple160-'+c+'-evidence'+i)]});
   }
   make(n,p+'_MISSED',n.label+' · 가까운 사이라는 말로 넘기려던 마음',[L(d.hurt,c,{emotion:'serious',when:not(has('couple160Topic_'+c,'jealousy'))}),L(d.jealous,c,{emotion:'serious',when:has('couple160Topic_'+c,'jealousy')}),L('가까워졌다는 이유로 내 쪽 답이 먼저 받아들여질 거라고 생각했다. 상대는 오늘 더 설명하기 어렵다고 했고, 나는 그 말을 다시 설명해 달라고 붙잡지 않았다.')],daily,{exitEffects:[flag(state,'strained'),flag(day,n.day),flag('couple160Evidence1_'+c,false),flag('couple160Evidence2_'+c,false),rel(c,-2)]});
   make(n,p+'_LATER',n.label+' · 오늘 다 풀지 못한 채',[L('오늘은 생각이 덜 정리됐다고 말했다. 다음에 다시 말할 자리는 남겼지만, 미뤄 둔 일이 해결된 것처럼 웃지는 않았다.')],daily,{exitEffects:[flag(day,n.day)]});
   for(const other of people.filter(x=>x!==c)){
    const q=p+'_JEALOUS_'+other,rule=all(lover(c),not(relationshipPending(c)),not(coupleStrained160(c)),not(has(day,n.day)),not(has('jealous160_'+c+'_'+other)),{meetingSince:{person:other,afterFlag:'romance150Day_'+c}});
    n.choices.push(C('jealousy160_'+other,D[other].name+'와 따로 만났던 일을 내 쪽에서 먼저 이야기한다.',q,[],rule));
    make(n,q,n.label+' · 내가 먼저 꺼낸 다른 만남',[L(D[other].name+'와 따로 만난 날이 있었다고 말했다. 상대가 이미 알 거라고 생각하거나, 불안해할까 봐 설명을 빼기보다 어떤 시간이었는지 내 말로 먼저 꺼냈다.','player'),L(d.jealous,c,{emotion:'serious'}),L('누구를 만났다는 사실보다 왜 지금 듣게 됐는지가 마음에 남을 수 있었다. 나도 이 말을 꺼내면 다른 친구를 못 만나게 될까 봐 먼저 방어하고 있었다.')],null,{choices:[C('tell','어떤 약속이었는지 말하고, 서로 서운했던 부분과 필요한 경계를 묻는다.',q+'_TOLD'),C('dismiss','그 정도로 질투하면 앞으로 아무도 못 만나겠다고 한다.',p+'_MISSED',[flag('couple160Topic_'+c,'jealousy'),flag('jealous160_'+c+'_'+other)])]});
    make(n,q+'_TOLD',n.label+' · 질투를 대신 대답하지 않고',[L('나는 친구를 만날 수 있다는 답만 확인하려던 마음을 내려놓고, 상대가 어떤 순간에 소외됐는지 물었다. 상대도 질투가 났다는 말과 만남을 막겠다는 답은 다르다고 말했다.'),L('당장 불안이 없어졌다고 약속하지는 않았다. 앞으로 어떻게 알리고 무엇을 먼저 물을지는 다음 만남의 행동에서도 확인하기로 했다.')],daily,{exitEffects:[flag('jealous160_'+c+'_'+other),flag('couple160Topic_'+c,'jealousy'),flag(state,'observing'),flag(day,n.day)]});
   }
  }
  // Fill the old missing WAIT edge without changing any already-played path.
  if(original.id.endsWith('_ROMANCE150_CONFESS')){
   const c=original.cast[0],id=original.id.replace(/_CONFESS$/,'_WAIT'),daily=original.id.replace(/_ROMANCE150_CONFESS$/,'').replace(/_TALK$/,'_DAILY');
   make(original,id,original.label+' · 내 마음을 더 생각할 시간',[L('좋아하는 마음이 있다는 말과 지금 관계를 정할 수 있다는 답이 내 안에서도 같은 속도로 나오지 않았다. 생각할 시간을 갖고 다시 이야기하고 싶다고 말했다. 상대도 오늘 답을 맞추려 하지는 않겠다고 했다.')],daily,{exitEffects:[flag('romance150Day_'+c,original.day)]});
  }
  const owner=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_/);
  if(owner&&original.week>=17&&/_(ARRIVE|TALK|DAILY|DONE|LEAVE)$/.test(original.id)){const c=owner[1],n=edit(original);
   for(const l of n.lines)if(l.speaker===c&&l.emotion==='happy')l.when=all(l.when,not(coupleStrained160(c)));
   if(original.id.endsWith('_TALK')||original.id.endsWith('_ARRIVE'))n.lines.push(L('서로 연인이라고 부르면서도 아직 끝내지 못한 말이 있었다. 오늘의 다정함으로 그 말을 덮지 않고, 얼마나 이야기할 수 있을지 먼저 살폈다.','narrator',{emotion:'serious',when:all(lover(c),coupleStrained160(c))}));
   for(const field of ['effects','exitEffects']){const msgs=(n[field]??[]).filter(e=>e.type==='message'&&e.character===c&&e.id.includes('-after'));
    if(msgs.length){for(const e of msgs)e.when=all(e.when,not(coupleStrained160(c)));n[field].push({type:'message',id:n.id+'-couple160-pending',character:c,direction:'in',text:'오늘 다 이야기하지 못한 마음은 다음에 다시 꺼내고 싶어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.')+' 지금 괜찮다는 답을 급히 받고 싶지는 않아'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.'),when:all({contact:c},coupleStrained160(c),not(relationshipPending(c)))});}
   }
  }
  const end=original.id.match(/^END150_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);
  if(end){const c=end[1],n=edit(original);
   n.lines.forEach(l=>l.when=all(l.when,not(coupleStrained160(c))));
   n.lines.push(L(D[c].name+'와 연인이 된 뒤에도 서로 다르게 기다리던 시간이 있었다. 아직 끝내지 못한 말은 다음 계절에도 남아 있었다. 나는 좋아한다는 말로 그 질문을 지우지 않기로 했다.','narrator',{emotion:'serious',when:coupleStrained160(c)}),L('한 번 사과한 날보다, 다른 날에도 같은 답을 지켜 본 기억이 더 오래 남았다. 서운한 마음을 말한 뒤에도 서로를 다시 찾을 수 있었다.','narrator',{when:has('couple160State_'+c,'settled')}));
   for(let i=0;i<3;i++)n.lines.push(L(D[c].name+'와 '+D[c].episodes[i][0]+' 이야기를 나눴던 날이 떠올랐다. 연인이 된 뒤에야 새로 물어본 질문도 있었다.','narrator',{when:has('couple160Choice_'+c+'_'+i,'a')}),L(D[c].name+'와는 '+D[c].episodes[i][0]+' 이야기를 하다가 각자의 시간을 남기는 쪽을 골랐다. 같은 마음이어도 같은 방식만 고를 필요는 없었다.','narrator',{when:has('couple160Choice_'+c+'_'+i,'b')}));
  }
 }
 return {...base,nodes:[...base.nodes.map(n=>changed.get(n.id)??n),...added]};
}
