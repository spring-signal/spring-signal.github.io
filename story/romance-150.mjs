import {L,C} from './weekly-plans.mjs?v=200';
import {has,flag,all,any,not,exp,exists} from './everyday-tools.mjs?v=200';
import {unresolved} from './emotional-continuity.mjs?v=200';
import {unfinishedBond} from './relationship-depth-140.mjs?v=200';
import {closenessContent} from './emotional-content.mjs?v=200';
import {romanceContent as R,doaCloseness} from './romance-content-150.mjs?v=200';
import {repairContinuity150} from './continuity-150.mjs?v=200';
const people=Object.keys(R),contact=c=>({contact:c});
export const relationshipPending=c=>any(unresolved(c),unfinishedBond(c));
const lover=c=>has('romance150Lover_'+c),otherLover=c=>any(...people.filter(x=>x!==c).map(lover));
export const romanceReady=c=>all(contact(c),has('arc'+c+(c==='doa'?4:10)),has('closeness_'+c,5),has('relationshipIntent_'+c,'romantic'),not(relationshipPending(c)));
const rel=(c,a=0,t=0)=>({type:'relation',character:c,affection:a,trust:t});
export function completeRomance(base){
 const edits=new Map(),added=[];
 const edit=n=>{if(!edits.has(n.id)){const x=JSON.parse(JSON.stringify(n));x.lines.forEach((l,i)=>l.source140=i);edits.set(n.id,x);}return edits.get(n.id);};
 const make=(n,id,label,lines,next,extra={})=>{const x={...n,id,label,lines,next,effects:[],exitEffects:[],choices:undefined,when:undefined,terminal:false,...extra};added.push(x);return x;};
 for(const original of base.nodes){
  const match=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(main|extra)[01]_(?:tue|thu|fri|sat)_TALK$/);
  if(match){
   const [,c,slot]=match,d=R[c],n=edit(original),daily=n.id.replace(/_TALK$/,'_DAILY'),p=n.id+'_ROMANCE150',state='romance150Stage_'+c,date='romance150Day_'+c;
   const continuing=n.choices.find(x=>x.id==='continue');if(continuing)continuing.hideWhen=has('arc'+c+(c==='doa'?4:10));
   // Extra appointments share the same five real-day steps as main appointments.
   // Doa receives her own present-day content instead of an unreachable flag.
   if(slot==='extra'||c==='doa'){
    const content=c==='doa'?doaCloseness:closenessContent[c],q=n.id+'_CLOSE150';
    const available=all(has('arc'+c+(c==='doa'?4:3)),not(has('closeness_'+c,5)),not(has('closenessDay_'+c,n.day)),not(relationshipPending(c)),not(lover(c)));
    n.choices.push(C('closeness150','우리 사이에서 달라진 마음을 조금 더 이야기한다.',content.map((_,i)=>({when:i?has('closeness_'+c,i):not(exists('closeness_'+c)),node:q+'_'+i})),[],available));
    content.forEach(([title,text,reply],i)=>{
     make(n,q+'_'+i,n.label+' · '+title,[L(text,c,{emotion:'serious'}),L('바로 관계의 이름을 묻고 싶은 마음을 잠시 두었다. 내 쪽에서도 무엇이 달라졌는지 말하고, 상대가 오늘 말한 범위부터 듣기로 했다.')],null,{choices:[C('listen','오늘 말한 마음의 범위와 내 마음을 따로 이야기한다.',q+'_'+i+'_HEARD'),C('rush','같은 마음이라면 오늘 관계를 확정하자고 한다.',q+'_PAUSE'),C('later','생각할 시간을 갖고 다음에 다시 이야기하자고 한다.',q+'_LATER')]});
     make(n,q+'_'+i+'_HEARD',n.label+' · 서로 꺼낸 만큼의 마음',[L(i===4&&c==='doa'?'저도 지금의 선배를 좋아해요. 오늘 들은 말을 예전 기억의 대답으로 바꾸지 않고 듣고 싶어요.':'나는 상대의 말을 잘 알아들었다고 답하는 대신, 내가 오늘 망설였던 순간 하나를 먼저 말했다.',i===4&&c==='doa'?'player':'narrator'),L(reply,c,{emotion:i===4?'happy':'neutral'})],null,{choices:[C('pace','말한 속도와 각자의 시간을 지키며 다시 만나기로 한다.',q+'_'+i+'_AGREED'),C('prove','이 정도 말했으면 확답을 받을 수 있지 않느냐고 묻는다.',q+'_PAUSE')]});
     make(n,q+'_'+i+'_AGREED',n.label+' · 다른 날에도 이어 볼 마음',[L(i===4?'서로 좋아하는 마음을 오늘의 말로 확인했다. 바로 사귄다는 뜻으로 바꾸지는 않았다. 어떤 관계로 만나고 싶은지는 다른 날에도 묻고 답할 자리를 남겼다.':'오늘 알아본 마음은 오늘의 크기로 남겼다. 다음에 만나면 다시 물어볼 수 있는 이야기가 하나 생겼다.')],daily,{exitEffects:[flag('closeness_'+c,i+1),flag('closenessDay_'+c,n.day),flag('relationshipIntent_'+c,'romantic'),flag('closenessHesitation_'+c,false),exp('closeness-'+c+'-'+(i+1))]});
    });
    make(n,q+'_PAUSE',n.label+' · 아직 준비되지 않은 답',[L(c==='doa'?'지금 답을 맞혀야 하는 자리라면 조금 어려워요. 좋아질 수 있는 마음과 오늘 사귀겠다는 답은 같은 속도로 나오지 않네요.':'지금은 내가 말한 만큼부터 들어 줬으면 좋겠어'+(['seoyeon','minseo','yuna'].includes(c)?'요.':'.'),c,{emotion:'serious'}),L('상대의 머뭇거림을 거절이나 약속으로 대신 정하지 않았다. 오늘의 대화는 여기서 멈췄다.')],daily,{exitEffects:[flag('closenessDay_'+c,n.day),flag('closenessHesitation_'+c,true)]});
    make(n,q+'_LATER',n.label+' · 다음에 다시 묻기 전에',[L('생각이 덜 정리됐다고 말했다. 상대도 오늘 결론을 내리지는 않았다. 다음에 다시 꺼내도 되는지 묻고 오늘의 활동으로 돌아갔다.')],daily,{exitEffects:[flag('closenessDay_'+c,n.day)]});
   }
   if(n.week<17)continue;
   const available=all(romanceReady(c),not(lover(c)),not(has(date,n.day)));
   if(n.week>=17)n.choices.push(C('romance150','우리가 어떤 관계로 만나고 싶은지, 남겨 둔 말을 이어 간다.',[{when:has(state,2),node:p+'_CONFIRM'},{when:has(state,1),node:p+'_BOUNDARY'},{node:p+'_CONFESS'}],[],available));
   n.choices.push(C('reconsider150','친구로 지내다 달라진 내 마음을 조심스럽게 꺼낸다.',p+'_CONFESS',[flag('relationshipIntent_'+c,'romantic'),flag('romance150Reconsider_'+c)],all(contact(c),has('arc'+c+(c==='doa'?4:10)),has('closeness_'+c,5),has('relationshipIntent_'+c,'friend'),not(relationshipPending(c)),not(lover(c)),not(has(date,n.day)))));
   make(n,p+'_CONFESS',n.label+' · 좋아한다는 말을 내 쪽에서 꺼내며',[L('전에 친구로 만나고 싶다고 했던 내 답이 조금 달라졌다고 말했다. 그때의 답이 가벼웠던 건 아니었다. 달라진 마음을 상대도 같은 마음으로 받아 줘야 하는 건 아니기에, 다시 이야기해 봐도 되는지 먼저 물었다.','narrator',{when:has('romance150Reconsider_'+c)}),L(d.confess,c,{emotion:'serious'}),L(d.mine,'player'),L('대답을 기다리는 동안 괜히 손에 잡힌 걸 만지작거렸다. 좋아하는 마음을 말하는 일과 그 마음대로 상대의 다음 시간을 정하는 일은 다르다는 걸, 나도 배워 가는 중이었다.')],null,{choices:[C('listen','좋아한다는 마음을 전하고, 지금 상대가 원하는 답을 듣는다.',p+'_HEARD'),C('press','좋아한다면 오늘 바로 사귀겠다는 답을 달라고 한다.',p+'_PAUSE'),C('wait','나도 마음을 더 생각해 보고 싶다고 말한다.',p+'_WAIT')]});
   make(n,p+'_HEARD',n.label+' · 서로의 말로 남은 마음',[L(d.answer,c,{emotion:'happy'}),L('오늘은 서로 좋아한다는 말을 듣고도 바로 관계의 이름을 정하지 않았다. 다음에 만나면 어떤 방식으로 만나고 싶은지도 각자 생각해 오기로 했다.')],daily,{exitEffects:[flag(state,1),flag(date,n.day),flag('romance150Paused_'+c,false),flag('romance150Reconsider_'+c,false),exp('romance150-'+c+'-feelings')]});
   make(n,p+'_BOUNDARY',n.label+' · 마음이 같아도 물어볼 것',[L(d.boundary,c,{emotion:'serious'}),L('나는 연락하는 속도가 다르면 마음도 다른 줄 알까 봐 걱정된다고 말했다. 내 불안 때문에 상대의 시간을 전부 달라고 할 수는 없었다. 다른 사람과의 관계도 숨기지 않고, 서로 연인이 되면 한 사람과 만나고 싶다는 뜻을 확인했다.')],null,{choices:[C('agree','각자의 시간과 사적인 경계를 확인하고, 관계를 숨기지 않기로 한다.',p+'_AGREED'),C('free','아직 한 사람과만 만날 준비는 안 됐다고 솔직히 말한다.',p+'_NOTREADY'),C('press','사귀면 그 정도는 당연히 맞춰 줘야 한다고 한다.',p+'_PAUSE')]});
   make(n,p+'_AGREED',n.label+' · 실제로 지킬 수 있는 약속',[L('바라는 방식이 전부 같지는 않았다. 바로 답장하지 못하는 날, 다른 사람에게 말하기 전에 물을 일, 서운할 때 다시 꺼낼 말을 각각 나눴다. 오늘의 합의를 다음 행동에서도 지킬 수 있는지 보기로 했다.')],daily,{exitEffects:[flag(state,2),flag(date,n.day),flag('romance150Promise_'+c,'exclusive'),exp('romance150-'+c+'-boundaries')]});
   make(n,p+'_CONFIRM',n.label+' · 다른 날에도 남은 선택',[L(d.action),L(d.yes,c,{emotion:'happy',when:not(otherLover(c))}),L('말을 꺼내기 전에 다른 사람과 이미 연인으로 만나기로 한 약속이 떠올랐다. 그 약속을 숨기고 같은 말을 다시 할 수는 없었다.','narrator',{emotion:'serious',when:otherLover(c)})],null,{choices:[C('yes','나도 연인으로 만나고 싶다고 답하고, 서로 다시 확인한다.',p+'_TOGETHER',[],not(otherLover(c))),C('honest','이미 다른 사람과 교제하고 있다는 사실을 먼저 말한다.',p+'_OTHER',[],otherLover(c)),C('wait','좋아하지만 지금은 연인이라는 약속을 하기 어렵다고 말한다.',p+'_NOTREADY'),C('no','마음을 더 생각해 보니 친구로 만나고 싶다고 말한다.',p+'_FRIEND')]});
   make(n,p+'_TOGETHER',n.label+' · 둘이 같은 이름으로 고른 관계',[L(c==='doa'?'선배가 먼저 내 답을 기다렸다. 나는 예전부터 좋아했다는 말을 다시 꺼내는 대신, 지금 연인이 되고 싶다고 답했다.':'내가 고개를 끄덕이자 상대가 한 번 더 같은 뜻인지 물었다. 우리는 서로 좋아하는 마음과 한 사람의 연인으로 만나겠다는 약속을 각자의 말로 확인했다.'),L('다음 만남이 저절로 정해지는 것은 아니었다. 서로 가능한 시간을 다시 묻고, 오늘의 활동을 이어 갔다.')],daily,{exitEffects:[flag('romance150Lover_'+c),flag(state,3),flag(date,n.day),flag('romance150Paused_'+c,false),flag('relationshipIntent_'+c,'romantic'),exp('romance150-'+c+'-mutual'),rel(c,1,2)]});
   make(n,p+'_NOTREADY',n.label+' · 좋아하는 마음과 할 수 있는 약속',[L('마음을 좋아하는 쪽으로만 꾸미지 않고 지금 할 수 없는 약속을 말했다. 상대도 좋아한다는 말로 모든 조건을 받아들이지는 않았다. 우리는 오늘 연인이 되지 않았고, 다음 이야기는 다시 서로 괜찮은지 물어보기로 했다.')],daily,{exitEffects:[flag(date,n.day),flag('romance150Paused_'+c)]});
   make(n,p+'_OTHER',n.label+' · 먼저 말했어야 할 현재의 약속',[L('다른 사람과 이미 연인으로 만나고 있다고 말했다. 상대는 잠시 대답하지 않았다. 좋아하는 마음이 있다고 해서 먼저 한 약속을 없는 일로 만들 수는 없었다.'),L(c==='doa'?'알려 줘서 고마워요. 하지만 저는 그 약속이 있는 동안 같은 관계를 시작하고 싶지 않아요.':'말해 줘서 고마워'+(['seoyeon','minseo'].includes(c)?'요. 하지만 지금 다른 관계를 시작하고 싶지는 않아요.':'. 하지만 지금 다른 관계를 시작하고 싶지는 않아.'),c,{emotion:'serious'})],daily,{exitEffects:[flag(date,n.day),flag('romance150Paused_'+c)]});
   make(n,p+'_FRIEND',n.label+' · 다른 답도 내 말로 전하며',[L('나는 친구로 만나고 싶다는 쪽으로 마음이 달라졌다고 말했다. 상대의 아쉬움까지 편한 대답으로 고쳐 주려 하지는 않았다. 다음에 만날 방식은 각자 시간을 두고 다시 정하기로 했다.')],daily,{exitEffects:[flag(state,0),flag(date,n.day),flag('relationshipIntent_'+c,'friend'),flag('romance150Paused_'+c,false)]});
   make(n,p+'_PAUSE',n.label+' · 좋아한다는 말로 재촉한 답',[L(c==='doa'?'좋아하는 마음을 증명하려고 오늘 답을 정하고 싶지는 않아요.':'좋아하는 마음을 증명하려고 오늘 답을 정하고 싶지는 않아'+(['seoyeon','minseo'].includes(c)?'요.':'.'),c,{emotion:'serious'}),L('나를 좋아한다면 해 줄 수 있다는 말이 먼저 올라왔다. 상대가 대답을 멈춘 걸 보고 그 말을 삼켰다. 다음에는 오늘 재촉한 일부터 다시 이야기해야 했다.')],daily,{exitEffects:[flag(state,0),flag(date,n.day),flag('romance150Paused_'+c),flag('romance150Pressured_'+c),rel(c,0,-1)]});
   if(n.week>=17)n.choices.push(C('romanceRepair150','관계의 답을 재촉했던 일을 먼저 사과하고, 지금 듣고 싶은 말을 묻는다.',p+'_REPAIR',[],all(has('romance150Pressured_'+c),not(has(date,n.day)),not(relationshipPending(c)))));
   // A pressured answer must be repaired on another day before any fresh confession.
   const proposal=n.choices.find(x=>x.id==='romance150');if(proposal)proposal.when=all(proposal.when,not(has('romance150Pressured_'+c)));
   make(n,p+'_REPAIR',n.label+' · 답을 기다린다는 말부터 다시',[L('나는 좋아한다는 말을 들은 뒤 마음이 급해졌다고 말했다. 기다리겠다고 해 놓고 답할 날짜를 내 쪽에서 정한 것도 인정했다.'),L(c==='doa'?'좋아하는 마음이 없어졌다는 뜻은 아니에요. 다음에는 제가 대답을 고를 시간을 남겨 주세요.':'좋아하는 마음이 없어졌다는 뜻은 아니'+(['seoyeon','minseo'].includes(c)?'에요. 다음에는 제가 대답을 고를 시간을 남겨 주세요.':'야. 다음에는 내가 대답을 고를 시간을 남겨 줘.'),c,{emotion:'serious'}),L('나는 오늘 고백을 다시 꺼내지 않았다. 상대가 더 말할 것이 있는지 기다린 뒤 오늘의 활동으로 돌아갔다.')],daily,{exitEffects:[flag('romance150Pressured_'+c,false),flag(date,n.day)]});
   n.lines.push(L('연인이라고 부르게 된 뒤에도 오늘 얼마나 이야기할지는 새로 물었다. 서로의 다른 하루를 궁금해하는 일은 관계의 이름으로 대신할 수 없었다.','narrator',{when:all(lover(c),not(relationshipPending(c)))}));
  }
  const leave=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_LEAVE$/);
  if(leave){
   const c=leave[1],n=edit(original),first=all(lover(c),not(has('romance150FirstMessage_'+c)),not(relationshipPending(c)));
   const text={seoyeon:'오늘은 다 설명하지 않아도 다음에 만나고 싶다고 말할 수 있어서 좋았어요. 잘 들어갔어요?',jiwoo:'잘 도착했어? 오늘 한 말 장난으로 돌리지 않을 거야. 그냥 한 번 더 말하고 싶었어.',haerin:'오늘 네가 지금의 나한테 물어봐 준 거 생각나. 다음에 만나면 나도 요즘 네 마음 더 물어볼게.',yuna:'잘 들어갔지? 오늘은 아무것도 더 챙겨 주려 하지 않고 그냥 네 안부만 물을래.',minseo:'오늘 말에 설명을 덧붙이려다가 멈췄어요. 좋아한다는 말은 오늘 말한 그대로 두고 싶어서요. 잘 자요.',doa:'잘 들어갔어요? 오늘은 오래 알고 지낸 선배라는 말 옆에 우리가 새로 고른 말이 생겼네요. 저도 아직 좀 떨려요.'}[c];
   for(const e of n.effects??[])if(e.type==='message'&&e.id.endsWith('-after'))e.when=all(e.when,not(first));
   n.effects.push({type:'message',id:n.id+'-mutual150',character:c,direction:'in',text,when:first},{type:'flag',key:'romance150FirstMessage_'+c,value:true,when:first});
  }
 }
 // The old reflection is now a bridge. No unplayed confession is invented.
 const end=edit(base.nodes.find(n=>n.id==='SUMMER24_END'));
 end.terminal=false;end.next='END150_REVIEW';
 end.lines=end.lines.filter(l=>!l.text.includes('앞으로의 고백이나 결말')&&!l.text.includes('그 말을 다음 관계의 이름으로 정할지'));
 end.lines.push(L('다음 약속을 기다리는 마음에도 조금씩 다른 이름이 생겼다. 함께 정한 말과 아직 묻고 싶은 말이 나란히 남아 있었다.'));
 const someLover=any(...people.map(lover)),someMet=any(...people.map(c=>({met:c}))),pending=any(...people.map(relationshipPending));
 make(end,'END150_REVIEW','24주 일요일 · 우리가 고른 관계',[L('창문으로 늦은 바람이 들어왔다. 휴대폰 대화창을 열자 좋아한다는 말을 나눴던 날과 대답을 기다렸던 날이 떠올랐다. 나는 이번 여름을 어떤 말로 기억할지 천천히 생각했다.')],null,{choices:[...people.map(c=>C(c,R[c].name+'와 서로 정한 관계를 돌아본다.','END150_'+c,[],lover(c))),C('friends','연애로 이름 붙이지 않은 인연을 돌아본다.','END150_FRIENDS',[],all(not(someLover),someMet,not(pending))),C('unfinished','아직 끝내지 못한 말을 남긴 채 여름을 마친다.','END150_UNFINISHED',[],all(not(someLover),pending)),C('alone','이번 여름에 내가 고른 시간을 돌아본다.','END150_ALONE',[],not(someLover))]});
 for(const c of people){const d=R[c],n=make(end,'END150_'+c,'여름의 끝 · '+d.name+'와 다음 계절',[L(d.end,'narrator',{when:not(relationshipPending(c))}),L(d.last,'narrator',{when:not(relationshipPending(c))}),L(d.name+'와 연인이 된 날도 있었고 그 뒤에 다시 조심스러워진 날도 있었다. 연인이라는 이름으로 끝내지 못한 말을 지우지는 않았다. 다음에 만나면 먼저 그 말부터 듣고 싶었다.','narrator',{when:relationshipPending(c)}),L('우리의 다음 계절은 모든 답을 안다는 약속보다, 다시 물을 수 있다는 믿음에서 시작되고 있었다.','narrator',{when:not(relationshipPending(c))})],null,{terminal:true,effects:[flag('ending150','romance-'+c),exp('ending150-'+c)]});
  // Keep final observations at home; quoted messages are recollection, not off-site actors.
  n.cast=[];n.outfits={};
 }
 make(end,'END150_FRIENDS','여름의 끝 · 서로 다른 가까움',[L('좋아하는 마음이 꼭 같은 방향으로 자라지는 않았다. 함께 읽은 책, 고치다 남겨 둔 선, 쉬는 날 건넨 안부는 연인이 되지 않았다고 사라지지 않았다.'),L('나는 친절을 나중의 고백으로 바꾸어 적지 않았다. 친구로 남고 싶은 답과 아직 관계의 이름을 고르지 않은 답을 각각 그대로 두었다.'),L('다음 학기의 빈 시간표를 폈다. 누구와 무엇을 하고 싶은지, 그때도 먼저 물어볼 생각이었다.')],null,{terminal:true,effects:[flag('ending150','friends'),exp('ending150-friends')]});
 make(end,'END150_UNFINISHED','여름의 끝 · 지우지 않은 질문',[L('끝내지 못한 말이 남아 있었다. 만난 횟수나 사과한 문장을 세어도 상대의 마음이 대신 정리되지는 않았다.'),...people.map(c=>L(R[c].name+'에게 다음 말을 건네고 싶지만, 먼저 듣지 못한 답이 무엇인지 기억해 두었다.','narrator',{when:relationshipPending(c)})),L('오늘은 편해졌다는 결론을 쓰지 않았다. 말할 준비가 될 때 다시 물을 수 있기를 바라며 여름의 마지막 페이지를 덮었다.')],null,{terminal:true,effects:[flag('ending150','unfinished'),exp('ending150-unfinished')]});
 make(end,'END150_ALONE','여름의 끝 · 내가 고른 하루',[L('누구와 사귀지 않은 여름에도 내 쪽에서 달라진 일은 있었다. 약속을 비워 둔 날에는 내 일을 했고, 잘 풀리지 않은 날에는 밥을 먹고 잠을 잤다.'),L('누군가를 만나기 위해서만 다음 계절을 기다릴 필요는 없었다. 그래도 다시 만나고 싶은 사람에게는 그때의 내 말로 물어볼 수 있을 것 같았다.'),L('내일 아침에 할 일을 하나 적었다. 빈칸은 아직 남아 있었다.')],null,{terminal:true,effects:[flag('ending150','alone'),exp('ending150-alone')]});
 const result={...base,narrativeRevision:'0.15.0',sourceRevision:'20',scope:'실제 만남으로 쌓는 여섯 관계 · 고백과 합의 · 한 학기와 여름의 결말',nodes:[...base.nodes.map(n=>edits.get(n.id)??n),...added]};
 return repairContinuity150(result);
}
