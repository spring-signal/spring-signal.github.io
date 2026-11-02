import {L,C} from './weekly-plans.mjs?v=200';
import {has,flag,all,any,not,exp} from './everyday-tools.mjs?v=200';
import {coupleContent as D} from './couple-content-160.mjs?v=200';
const people=Object.keys(D),lover=c=>has('romance150Lover_'+c);
function cancelPlans(c,n){const effects=[];for(let w=n.week;w<=24;w++)for(const [id,key]of [[`plan-w${w}`,`lateMainPerson${w}`],[`late-extra-w${w}`,`lateExtraPerson${w}`]])if(id!==n.appointmentId)effects.push({type:'appointment',id,character:c,status:'cancelled',when:all({appointment:id,status:'confirmed'},has(key,c))});return effects;}
const bothTold=any(...people.flatMap((c,i)=>people.slice(i+1).map(d=>all(has('overlap160Told_'+c),has('overlap160Told_'+d)))));
const hurt={seoyeon:'제가 고른 관계라고 생각했어요. 그런데 제가 고르기 전에 알아야 할 말을 빼놓으셨네요. 지금은 연인이라는 말을 계속 쓰기 어려워요.',jiwoo:'웃고 넘어가면 또 무슨 말이 진짜였는지 모르겠네. 난 한 사람과 만나기로 한 답을 믿었어. 지금은 그 관계를 멈추고 싶어.',haerin:'오래 알았다고 내가 다 이해할 거라고 생각했어? 네가 한 말을 믿은 내 쪽 마음도 있었어. 지금은 예전처럼 부를 수가 없어.',yuna:'내가 이해해 줄 사람일 거라고 기다리지는 않았으면 해. 나도 알고 고를 수 있었어야 하잖아. 지금 관계는 여기서 멈추고 싶어.',minseo:'제가 받아들인 약속과 실제 상황이 달랐네요. 이유를 잘 설명한다고 제 선택이 있었던 일이 되지는 않아요. 지금은 연인으로 만날 수 없겠어요.',doa:'예전부터 좋아했다는 말보다 오늘 한 약속을 믿었어요. 제가 서툴러서 못 알아본 이야기처럼 남기지는 말아 주세요. 지금은 관계를 멈추고 싶어요.'};
export function addOverlap160(base){
 const changed=new Map(),added=[];const edit=n=>{if(!changed.has(n.id)){const x={...n,lines:n.lines.map((l,i)=>({...l,source150:l.source150??i})),choices:n.choices?.map(ch=>({...ch})),effects:n.effects?.map(e=>({...e})),exitEffects:n.exitEffects?.map(e=>({...e}))};changed.set(n.id,x);}return changed.get(n.id);};
 const make=(n,id,label,lines,next,extra={})=>{const x={...n,id,label,lines,next,choices:undefined,effects:[],exitEffects:[],when:undefined,terminal:false,...extra};added.push(x);return x;};
 for(const original of base.nodes){
  if(original.id.endsWith('_ROMANCE150_CONFIRM')){
   const c=original.cast[0],n=edit(original),daily=n.id.replace(/_ROMANCE150_CONFIRM$/,'').replace(/_TALK$/,'_DAILY');
   for(const other of people.filter(x=>x!==c)){
    const p=n.id+'_HIDE160_'+other;
    n.choices.push(C('hide160_'+other,D[other].name+'와 교제 중이라는 사실을 숨기고, 이 사람에게도 한 사람의 연인이라고 약속한다.',p,[],all(lover(other),not(has('overlap160Ever')))));
    make(n,p,n.label+' · 말하지 않고 겹친 약속',[L(D[c].name+'는 다른 관계는 없는지, 서로 한 사람의 연인으로 만나는 뜻이 맞는지 다시 물었다. 나는 이미 '+D[other].name+'에게도 같은 약속을 했다는 말을 하지 않았다.'),L('나는 다른 관계는 없다고 답했다. 상대는 그 답을 믿고 연인으로 만나겠다고 말했다. 나는 대답을 받았는데도 휴대폰의 다른 대화창이 자꾸 신경 쓰였다.')],daily,{exitEffects:[flag('overlap160Ever'),flag('overlap160State','hidden'),flag('overlap160Primary',other),flag('overlap160Secondary',c),flag('overlap160Day',n.day),flag('romance150Lover_'+c),flag('romance150Stage_'+c,3),flag('romance150Day_'+c,n.day),exp('overlap160-began')]});
   }
  }
  const talk=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_TALK$/);
  if(talk&&original.week>=17){
   const c=talk[1],n=edit(original),daily=n.id.replace(/_TALK$/,'_DAILY'),p=n.id+'_OVERLAP160';
   const primary=all(has('overlap160Primary',c),has('overlap160State','hidden'),has('overlap160ProofSent'),not(has('overlap160Day',n.day)));
   const secondary=all(has('overlap160Secondary',c),has('overlap160Ever'),not(has('overlap160State','hidden')),not(has('overlap160Told_'+c)),not(has('overlap160Day',n.day)));
   for(const l of n.lines)l.when=all(l.when,not(primary),not(secondary));
   for(const ch of n.choices)ch.when=all(ch.when,not(primary),not(secondary));
   for(const ch of n.choices)if(/^(romance150|reconsider150|closeness150|couple160|coupleRepair160|jealousy160_)/.test(ch.id))ch.when=all(ch.when,not(has('overlap160Ever')),not(has('couple160Ended_'+c)));
   n.lines.push(L('약속 시간을 확인하려고 휴대폰을 열었다가 지난 대화창을 그대로 둔 채 탁자에 내려놓았다. 화면에는 다른 사람과 한 사람의 연인으로 만나겠다고 나눈 말이 남아 있었다. 상대가 그 문장을 보고 조용히 화면에서 눈을 뗐다.','narrator',{emotion:'serious',when:primary}),L('나는 다른 관계가 드러났던 날을 떠올렸다. 오늘 만난 사람에게는 아직 그 사실을 내 말로 전하지 않았다. 평소처럼 말을 이어 가기 전에 먼저 말해야 할 일이 있었다.','narrator',{emotion:'serious',when:secondary}));
   n.choices.push(C('overlap160','화면에 남은 말이 누구와 한 약속인지 답한다.',p+'_SEEN',[],primary),C('tellOverlap160','겹쳐 맺은 관계가 있었다는 사실을 내 말로 전한다.',p+'_TELL',[],secondary));
   make(n,p+'_SEEN',n.label+' · 보게 된 문장 뒤의 질문',[L('이 대화에서도 한 사람의 연인으로 만나기로 한 거예요? 나한테 했던 말하고 같은 뜻으로요?',c,{emotion:'serious'}),L('내가 어떤 뜻으로 사랑했다고 말하느냐보다, 서로 다른 약속을 숨겼다는 사실이 먼저 남아 있었다.')],null,{effects:[flag('overlap160State','caught'),flag('overlap160Told_'+c),flag('overlap160Day',n.day)],choices:[C('own','겹친 약속을 숨겼다고 인정하고, 상대가 원하는 거리를 듣는다.',p+'_OWN'),C('minimize','둘 다 좋아한 마음은 진심이었으니 이해해 달라고 한다.',p+'_DEFLECT')]});
   make(n,p+'_TELL',n.label+' · 내가 먼저 말하지 못했던 사실',[L('다른 사람과 이미 연인으로 만나고 있으면서 그 사실을 숨기고 같은 약속을 했다고 말했다. 먼저 드러난 상대가 있었다는 사실도 빼지 않았다.'),L('오늘 처음 듣는 입장에서는 어디부터 믿어야 할지 모르겠어요. 왜 이제야 말하는 건지보다, 내가 무엇을 모르고 선택했는지 먼저 알고 싶어요.',c,{emotion:'serious'})],null,{effects:[flag('overlap160Told_'+c),flag('overlap160Day',n.day)],choices:[C('own','서로 다르게 알고 있던 약속을 설명하고, 내 선택의 책임을 인정한다.',p+'_OWN'),C('minimize','마음이 복잡했던 것뿐이니 크게 생각하지 말아 달라고 한다.',p+'_DEFLECT')]});
   for(const [kind,accounted]of [['OWN',true],['DEFLECT',false]])make(n,p+'_'+kind,n.label+' · 돌아오라는 답을 먼저 묻지 않고',[L(hurt[c],c,{emotion:'serious'}),L(accounted?'나는 다시 믿어 달라는 말을 먼저 붙이지 않았다. 상대가 관계를 멈추겠다고 한 답을 받아들이고 미리 잡았던 개인 약속도 취소했다. 다른 사람에게도 아직 말해야 할 사실이 남아 있었다.':'좋아했던 마음을 설명하면 숨긴 사실의 크기도 줄어들 거라고 생각했다. 상대는 그 설명이 지금 관계를 이어 갈 이유가 되지는 않는다고 했다. 미리 잡았던 개인 약속도 취소하기로 했다.')],daily,{exitEffects:[flag('romance150Lover_'+c,false),flag('couple160Ended_'+c),flag('couple160State_'+c,'ended'),flag('overlap160Accounted_'+c,accounted),flag('overlap160State',accounted?'accounting':'deflected'),flag('overlap160Day',n.day),...cancelPlans(c,n),exp('overlap160-'+c+'-'+kind.toLowerCase()),...people.filter(x=>x!==c).map(other=>({type:'flag',key:'overlap160State',value:'accounted',when:all(has('overlap160Told_'+other),has('overlap160Accounted_'+other),has('overlap160Accounted_'+c))}))]});
   // Ending a relationship is a spoken scene, rather than a silent flag toggle.
   const b=n.id+'_SEPARATE160';
   n.choices.push(C('separate160','연인으로 계속 만날 수 있을지 내 마음부터 이야기한다.',b,[],all(lover(c),not(has('overlap160Ever')),not(has('couple160Day_'+c,n.day)))));
   make(n,b,n.label+' · 관계를 계속한다는 답 앞에서',[L('나는 좋아하는 마음이 있었던 것과 지금 같은 관계를 이어 갈 수 있는지는 다르게 느껴진다고 말했다. 상대가 아무 일 없던 듯 받아 주길 바라며 말하지는 않았다.'),L('관계를 멈추고 싶은 건지, 아직 말하지 못한 게 더 있는 건지 먼저 듣고 싶어요. 내 답까지 대신 정하지는 말아 주세요.',c,{emotion:'serious'})],null,{choices:[C('end','지금은 연인 관계를 마치고 싶다는 뜻을 분명히 말한다.',b+'_END'),C('talk','아직 정리하지 못한 마음을 더 이야기해 보고 싶다고 말한다.',b+'_WAIT')]});
   make(n,b+'_END',n.label+' · 같은 관계의 끝에서',[L('나는 관계를 마치고 싶다는 뜻을 다시 말했다. 상대는 잠시 생각한 뒤 오늘 바로 친구처럼 돌아갈 수는 없다고 했다. 나는 그 답을 설득하지 않고 받아들였다.'),L('미리 정했던 개인 약속도 취소하고 서로의 다음 일정은 각자 정하기로 했다. 좋았던 시간을 없던 일로 만들지는 않았지만, 앞으로의 약속을 계속 같은 뜻으로 읽을 수도 없었다.')],daily,{exitEffects:[flag('romance150Lover_'+c,false),flag('couple160Ended_'+c),flag('couple160State_'+c,'ended'),flag('couple160Day_'+c,n.day),flag('relationshipIntent_'+c,'separated'),...cancelPlans(c,n),exp('separated160-'+c)]});
   make(n,b+'_WAIT',n.label+' · 끝이라는 답 전에 남은 말',[L('내 마음도 아직 다 정리되지 않았다고 말했다. 상대는 지금 관계를 마친 것으로 받아들이지는 않겠지만, 다음 만남에서도 이 말을 없던 일로 넘기지는 말자고 했다.')],daily,{exitEffects:[flag('couple160Day_'+c,n.day)]});
  }
  const leave=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_LEAVE$/);
  if(leave){const c=leave[1],n=edit(original),when=all(has('overlap160State','hidden'),has('overlap160Secondary',c),not(has('overlap160ProofSent')));
   n.effects.push({type:'message',id:n.id+'-overlap160-proof',character:c,direction:'in',text:'오늘 서로 한 사람의 연인으로 만나기로 한 말, 저도 같은 뜻으로 기억할게요. 다음 만남도 서로 가능한 때 물어봐요.',when},{type:'flag',key:'overlap160ProofSent',value:true,when});
  }
  const owner=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_/);
  if(owner&&original.week>=17&&/_(TALK|DAILY|ARRIVE|DONE|LEAVE|REPLY|NEXT)$/.test(original.id)){const c=owner[1],n=edit(original),ended=has('couple160Ended_'+c);
   for(const l of n.lines)if(l.speaker===c&&l.emotion==='happy')l.when=all(l.when,not(ended));
   if(n.id.endsWith('_NEXT'))n.when=all(n.when,not(ended));
   for(const field of ['effects','exitEffects']){const messages=(n[field]??[]).filter(e=>e.type==='message'&&e.character===c&&(/-after|-mutual150/.test(e.id)));
    if(messages.length){for(const e of messages)e.when=all(e.when,not(ended));n[field].push({type:'message',id:n.id+'-separated160',character:c,direction:'in',text:'오늘 한 이야기는 시간을 두고 생각하고 싶어요. 바로 예전처럼 다음 약속을 정하지는 않을게요.',when:all({contact:c},ended)});}
   }
   if(n.id.endsWith('_REPLY')){
    n.lines.forEach(l=>l.when=all(l.when,not(ended)));n.lines.push(L('“지금은 개인적인 만남을 다시 잡기 전에 시간을 더 갖고 싶어요. 오늘은 약속을 확정하지 않을게요.”','narrator',{when:ended}));
    for(const e of n.effects??[])if(e.type==='message'&&e.character===c)e.when=all(e.when,not(ended));
    n.effects.push({type:'message',id:n.id+'-space160',character:c,direction:'in',text:'지금은 개인 약속을 다시 잡기 전에 시간을 더 갖고 싶어요. 오늘은 확정하지 않을게요.',when:all({contact:c},ended)});
    const confirm=n.choices?.find(ch=>ch.id==='confirm');if(confirm)confirm.when=all(confirm.when,not(ended));
   }
  }
  if(original.id==='FIRE22_PICK'||original.id==='DOA23_OPTION'||/^MT19_(sea|valley|pool)_(PICK|WALK)$/.test(original.id)){
   const n=edit(original);for(const ch of n.choices??[]){const c=original.id==='DOA23_OPTION'&&['sea','valley','pool'].includes(ch.id)?'doa':people.includes(ch.id)?ch.id:null;if(c)ch.when=all(ch.when,not(has('couple160Ended_'+c)));}
  }
  if(/^LATE\d+_INCOMING_LIST150$/.test(original.id)){
   const n=edit(original);for(const ch of n.choices??[])if(people.includes(ch.id))ch.when=all(ch.when,not(has('couple160Ended_'+ch.id)));
  }
  const incoming=original.id.match(/^LATE\d+_INCOMING_(seoyeon|jiwoo|haerin|yuna|minseo|doa)(?:_|$)/);
  if(incoming){const c=incoming[1],n=edit(original),ended=has('couple160Ended_'+c);
   for(const e of n.effects??[])if(e.type==='message')e.when=all(e.when,not(ended));
   for(const ch of n.choices??[])if(['reply','ask','confirm'].includes(ch.id))ch.when=all(ch.when,not(ended));
   if(n.id.endsWith('_NEXT'))n.when=all(n.when,not(ended));
   if(n.id.endsWith('_'+c)){for(const l of n.lines)l.when=all(l.when,not(ended));n.lines.push(L('지금은 서로 시간을 두기로 한 대화였다. 예전의 안부를 새로운 초대처럼 다시 읽지 않고 대화창을 덮었다.','narrator',{when:ended}));}
  }
  if(original.id==='END150_REVIEW'){
   const n=edit(original),someLover=any(...people.map(lover)),ended=any(...people.map(c=>has('couple160Ended_'+c)));
   for(const ch of n.choices)ch.when=all(ch.when,not(has('overlap160Ever')),ch.id==='friends'?not(ended):undefined);
   n.choices.push(C('overlap160','겹친 약속 뒤에 남은 말을 돌아본다.','END160_OVERLAP',[],has('overlap160Ever')),C('separated160','관계를 마친 뒤 남은 시간을 돌아본다.','END160_SEPARATED',[],all(not(someLover),ended,not(has('overlap160Ever')))));
   make(n,'END160_OVERLAP','여름의 끝 · 겹친 약속이 남긴 자리',[L('두 대화창에 같은 약속이 남아 있었다. 나는 한 사람의 연인으로 만나겠다는 말을 두 번 했고, 서로가 고르는 데 필요했던 사실을 말하지 않았다.'),L('아직 그 사실을 내 말로 전하지 않은 사람이 있었다. 들키지 않았다는 이유로 아무 일 없던 여름이라고 적을 수는 없었다.','narrator',{when:has('overlap160State','hidden')}),L('화면에 남은 문장을 본 뒤로 같은 관계의 이름을 계속 부를 수는 없었다. 나는 이해해 달라는 말을 먼저 꺼냈고, 그 말이 상대의 선택을 돌려주는 답은 아니었다.','narrator',{when:has('overlap160State','deflected')}),L('두 사람에게 각각 사실을 말하고 관계를 멈추겠다는 답을 들었다. 책임을 인정한 날과 다시 믿을 수 있는 날은 같지 않았다. 돌아오겠다는 약속을 받아 적지는 않았다.','narrator',{when:has('overlap160State','accounted')}),L('한 사람에게 한 말 뒤에도 아직 전하지 못한 사실이 남아 있었다. 오늘의 설명으로 다른 사람의 답까지 받은 것으로 기억하지 않았다.','narrator',{when:all(not(has('overlap160State','hidden')),not(has('overlap160State','deflected')),not(has('overlap160State','accounted')),not(bothTold))}),L('두 사람에게 사실을 전했지만 내 설명을 받아들여야 한다고 기다리던 마음도 남아 있었다. 이미 들은 대답을 못 들은 일로 바꾸지는 않았다.','narrator',{when:all(bothTold,not(has('overlap160State','accounted')),not(has('overlap160State','deflected')))}),L('다음 계절에는 대답을 얻는 것보다, 상대도 알고 고를 수 있는 말을 먼저 꺼내야 했다.')],null,{terminal:true,cast:[],outfits:{},effects:[flag('ending160','overlap'),exp('ending160-overlap')]});
   make(n,'END160_SEPARATED','여름의 끝 · 함께였던 시간 다음에',[L('연인으로 부르던 관계를 마친 뒤에는 다음 연락을 고르는 손도 달라졌다. 좋았던 시간과 맞지 않았던 시간을 어느 한쪽으로 지워 적지는 않았다.'),L('오늘 당장 친구가 되어야 한다는 답을 기다리지 않았다. 서로가 원한 거리를 남겨 두고, 내 쪽의 하루를 다시 골랐다.'),L('다음 계절에도 같은 관계로 만날 거라고 약속하지는 않았다. 그래도 내 마음을 말할 때 상대의 답까지 대신 정하지 않았던 순간은 남아 있었다.')],null,{terminal:true,cast:[],outfits:{},effects:[flag('ending160','separated'),exp('ending160-separated')]});
  }
 }
 return {...base,nodes:[...base.nodes.map(n=>changed.get(n.id)??n),...added]};
}
