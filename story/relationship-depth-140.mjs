import {depthContent,quietDoubts,practiceActions} from './relationship-depth-content.mjs?v=200';
const flag=(key,value=true,when)=>({type:'flag',key,value,...(when?{when}:{})});
const has=(key,value)=>({flag:key,...(value===undefined?{}:{value})});
const all=(...rules)=>({all:rules.filter(Boolean)}),any=(...rules)=>({any:rules}),not=rule=>({not:rule});
const line=(text,speaker='narrator',emotion='serious',extra={})=>({text,speaker,emotion,...extra});
const people=Object.keys(depthContent),key=c=>'bond140_'+c,dayKey=c=>'bond140Day_'+c;
export const unfinishedBond=c=>any(...['hesitant','unsettled','observing','testing'].map(s=>has(key(c),s)));
const rel=(c,trust)=>({type:'relation',character:c,trust});
const concern=c=>any(unfinishedBond(c),...['unsettled','observing','testing'].map(s=>has('friction_'+c,s)));
const dailyWarm={seoyeon:'오늘은 잘 쓴 말 말고 그냥 생각난 말을 했네요. 선배도 편히 말해 줘서 좋았어요.',jiwoo:'오늘은 네가 어떻게 보나 신경 쓰다가도 내 말이 먼저 나왔네. 그거 좀 편해서 좋다.',haerin:'내가 고른 거랑 네가 고른 게 다른데도 같이 하니까 재밌네. 다음에도 먼저 물어봐 줘.',yuna:'오늘은 뭘 해 줘야 하나 생각을 덜 했어. 그냥 같이 앉아 있는 시간도 괜찮네.',minseo:'오늘 본 걸 다 정리하지 않아도 같이 온 시간은 남네요. 그게 생각보다 좋아요.',doa:'예전 이야기를 안 꺼내도 할 말이 생기네요. 오늘 네 얘기 더 알게 돼서 좋았어요.'};
const waterWarm={seoyeon:'물에 들어갈 때는 생각보다 겁났는데, 나오고 나니까 조금 더 놀고 싶어졌어요. 다음엔 제가 먼저 말해 볼게요.',jiwoo:'잘 노는 모습 찍으려고 안 하니까 오히려 더 재밌네. 방금 웃긴 건 카메라 없어도 기억하겠다.',haerin:'나 괜찮아 보이려고 물 안 차가운 척했어. 지금은 같이 으악 하고 나와도 되니까 좀 웃겨.',yuna:'오늘은 내가 먼저 쉬자고 했는데도 같이 웃을 수 있네. 이거 사진보다 오래 기억날 것 같아.',minseo:'어디까지 갈지 계획 안 세웠는데도 괜찮네요. 오늘은 저도 그냥 재밌다고 말해 볼래요.',doa:'이런 날의 너는 아직 잘 모르네요. 예전 모습 맞혀 보는 것보다 그게 더 재밌어요.'};

export function deepenRelationships(base){
 const additions=[],cloned=new Map();
 const edit=n=>{if(!cloned.has(n.id)){const copy=structuredClone(n);copy.lines.forEach((l,i)=>l.source130=i);cloned.set(n.id,copy);}return cloned.get(n.id);};
 const make=(parent,id,label,lines,next,extra={})=>{
  const n={...parent,id,label,lines,next,...extra};
  for(const k of ['effects','exitEffects','choices','when','migrationDefault'])if(!(k in extra))delete n[k];
  additions.push(n);return n;
 };
 for(const original of base.nodes){
  if(original.week<9)continue;
  const match=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC(\d+)$/);
  if(match){
   const c=match[1],stage=Number(match[2]),episode=c==='doa'?stage-1:stage-7,d=depthContent[c],data=d.episodes[episode];
   if(!data)continue;
   const n=edit(original),avoid=n.id+'_avoid140';
   n.lines.push(line(data[0]),line(data[1],'player'),line(data[2],c));
   n.choices.push({id:'avoid140',label:data[3],next:avoid,effects:[flag(key(c),'unsettled'),flag(dayKey(c),n.day),flag('bond140ArrivalSeen_'+c,false),flag('bond140Topic_'+c,episode),flag('bond140Evidence1_'+c,false),flag('bond140Evidence2_'+c,false),rel(c,-2)]});
   make(n,avoid,n.label+' · 가까워지고 싶어서 놓친 말',[line(data[4],c),line(d.arrival),line('마음을 확인하고 싶었던 내 말이 상대가 머물 자리를 좁혔다. 변명하면 더 붙잡는 말이 될 것 같아, 오늘은 먼저 인사했다.','narrator','serious',{stageCast:[]})],n.id.replace(/_ARC\d+$/,'_DONE'),{exitEffects:[flag('arc'+c+stage),{type:'experience',id:'personal-'+c+'-'+stage},{type:'experience',id:'bond140-'+c+'-rupture-'+episode}]});
   for(const choice of n.choices.filter(x=>['a','b'].includes(x.id))){
    choice.effects??=[];
    choice.effects.push(flag('depth140Episode_'+c,episode),flag('depth140Style_'+c,choice.id),flag('depth140Day_'+c,n.day));
   }
  }
  const arrival=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARRIVE$/);
  if(arrival){
   const c=arrival[1],d=depthContent[c],n=edit(original);
   const first=all(has(key(c),'unsettled'),not(has('bond140ArrivalSeen_'+c)));
   const quieter=['필요한 인사는 주고받았다. 말이 끊겼을 때 예전처럼 웃음으로 먼저 잇지는 않았다. 오늘 더 말할 수 있는 만큼부터 물었다.','서로 만날 시간은 지켰지만 마음의 거리가 같은 속도로 좁아지지는 않았다. 나는 오늘의 조용함을 관심 없다는 대답으로 먼저 읽지 않았다.','상대는 약속한 활동을 골랐고 나는 내 몫을 챙겼다. 함께할 수 있는 일과 아직 더 들어야 할 말이 같은 날에 남아 있었다.','다시 만났다는 사실만으로 지난 말이 끝난 것은 아니었다. 오늘은 다정한 인사를 더하는 것보다 상대가 멈춘 데를 알아 두는 쪽을 골랐다.'];
   n.lines.push(line(d.arrival,'narrator','serious',{when:first}),line(d.distance,c,'serious',{when:first}),line(quieter[n.week%4],'narrator','serious',{when:all(has(key(c),'unsettled'),has('bond140ArrivalSeen_'+c))}),line('반가운 마음이 있는데도 서로의 대답을 조심스럽게 살피고 있었다. 아직 잘 모르는 마음을 오늘 다 안다고 말하지는 않기로 했다.','narrator','serious',{when:has(key(c),'hesitant')}),line('지난번에 듣고 정한 방식이 있었다. 오늘은 다 풀렸는지 확인하는 대신, 내가 그 방식을 실제로 지킬 수 있는지 생각하며 앉았다.','narrator','serious',{when:any(has(key(c),'observing'),has(key(c),'testing'))}));
   n.exitEffects??=[];n.exitEffects.push(flag('bond140ArrivalSeen_'+c,true,has(key(c),'unsettled')));
   d.episodes.forEach((ep,i)=>{
    const callback='depth140Callback_'+c+'_'+i;
    for(const [style,text]of [['a',ep[5]],['b',ep[6]]])n.lines.push(line(text,'narrator','neutral',{when:all(has('depth140Episode_'+c,i),has('depth140Style_'+c,style),not(has('depth140Day_'+c,n.day)),not(has(callback)),not(unfinishedBond(c)))}));
    n.exitEffects??=[];n.exitEffects.push(flag(callback,true,all(has('depth140Episode_'+c,i),not(has('depth140Day_'+c,n.day)),not(unfinishedBond(c)))));
   });
  }
  const talk=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_TALK$/);
  if(talk){
   const c=talk[1],d=depthContent[c],n=edit(original),p=n.id+'_BOND140',daily=n.id.replace(/_TALK$/,'_DAILY');
   const continuing=n.choices.find(x=>x.id==='continue');if(continuing)continuing.when=all(continuing.when,not(unfinishedBond(c)));
   n.choices.unshift({id:'repair140',label:'지난번에 끝내지 못한 말부터 듣고 싶다고 묻는다.',when:all(unfinishedBond(c),not(has(dayKey(c),n.day))),next:[{when:has(key(c),'hesitant'),node:p+'_UNCERTAIN'},{when:has(key(c),'unsettled'),node:p+'_HEAR'},{when:has(key(c),'observing'),node:p+'_PRACTICE0'},{node:p+'_PRACTICE1'}],effects:[]});
   const doubts=quietDoubts[c],offered=all(has('arc'+c+(c==='doa'?1:7)),not(has('depth140DoubtExplored_'+c)),not(has(key(c))));
   n.lines.push(line('반가운 만남이었는데도 상대는 말을 하나 삼킨 듯했다. 좋은 답을 주고받았다는 이유로 서로 똑같이 받아들였다고 정할 수는 없었다.','narrator','serious',{when:offered}));
   n.choices.unshift({id:'uncertainty140',label:'하고 싶은 말이 남았는지 묻고, 서로 다르게 받아들인 마음을 나눈다.',next:p+'_UNCERTAIN',when:offered,effects:[flag(key(c),'hesitant'),flag('depth140DoubtExplored_'+c)]});
   const failed=p+'_MISSED',later=p+'_LATER';
   make(n,p+'_UNCERTAIN',n.label+' · 다정한 답 뒤에도 생기는 다른 생각',[line(doubts.a,c,'serious',{when:has('depth140Style_'+c,'a')}),line(doubts.b,c,'serious',{when:has('depth140Style_'+c,'b')}),line(doubts.mine,'player'),line('누가 틀린 말을 한 날만 서로 어긋나는 것은 아니었다. 기다려 준 마음이 혼자 둔 것처럼, 도와주고 싶은 마음이 잘해야 한다는 부담처럼 닿기도 했다.')],null,{choices:[{id:'meaning',label:'바로 안심시키기보다, 서로 어떤 뜻으로 듣고 있었는지 하나씩 확인한다.',next:p+'_MEANING',effects:[]},{id:'prove',label:'나를 믿는다면 이제 그런 불안은 내려놓아 달라고 한다.',next:failed,effects:[]},{id:'later',label:'나도 생각할 시간이 필요하다고 말하고 다음에 더 듣기로 한다.',next:later,effects:[]}]});
   make(n,p+'_MEANING',n.label+' · 불안을 없애기보다 함께 알아 두며',[line(doubts.reply,c),line(d.promise,c),line('나는 나를 믿으라는 말로 답을 재촉하지 않았다. 다음 만남에서 먼저 물을 말 하나와 멈출 행동 하나를 함께 정했다. 두려움이 바로 없어지지는 않았지만, 다음에 확인할 수 있는 자리가 생겼다.')],daily,{exitEffects:[flag(key(c),'observing'),flag(dayKey(c),n.day),flag('bond140Evidence1_'+c,false),flag('bond140Evidence2_'+c,false)]});
   make(n,p+'_HEAR',n.label+' · 미안하다는 말 다음에 남은 것',[line(d.hear[0],c),line(d.hear[1],'player'),line(d.hear[2],c)],null,{choices:[{id:'hear',label:'내 의도를 설명하기 전에, 상대가 겪은 순간을 끝까지 듣는다.',next:p+'_AGREE',effects:[]},{id:'defend',label:'좋은 뜻이었다는 내 입장도 먼저 알아 달라고 한다.',next:failed,effects:[]},{id:'later',label:'오늘 다 듣기는 어렵다고 말하고 다음에 다시 꺼내도 되는지 묻는다.',next:later,effects:[]}]});
   make(n,p+'_AGREE',n.label+' · 다음번에 지킬 수 있는 한 가지',[line(d.promise,c),line('나는 앞으로 절대 실수하지 않겠다는 말 대신, 다음에 같은 순간이 오면 무엇을 멈출지 내 말로 다시 말했다. 상대는 고개를 끄덕였지만 웃어서 대답을 대신하지는 않았다.')],null,{choices:[{id:'wait',label:'오늘 괜찮아졌다는 답을 받지 않고, 다음 행동에서 확인하기로 한다.',next:p+'_OBSERVING',effects:[]},{id:'close',label:'이렇게 사과했으니 이제 끝난 거냐고 확인한다.',next:failed,effects:[]}]});
   make(n,p+'_OBSERVING',n.label+' · 아직 조금 떨어진 의자',[line('말을 마치고도 의자 사이의 거리는 그대로였다. 나는 그 거리를 바로 좁히려 하지 않았다. 다음에도 오늘 들은 답을 기억할지, 상대는 시간을 두고 보고 싶다고 했다.'),line('약속한 활동을 함께한다고 해서 마음까지 원래대로 돌아간 것은 아니었다. 오늘은 끝내지 않은 채로 같이 있을 수 있는 만큼만 남았다.')],daily,{exitEffects:[flag(key(c),'observing'),flag(dayKey(c),n.day),flag('bond140Evidence1_'+c,false),flag('bond140Evidence2_'+c,false)]});
   d.practice.forEach(([intro,label,reply],i)=>{
    make(n,p+'_PRACTICE'+i,n.label+' · '+(i?'다른 상황에서도 남는 약속':'말로 정한 다음에 찾아온 순간'),[line(intro),line('이번에는 잘 듣고 있다는 말을 더할 차례가 아니었다. 상대가 말한 만큼 실제로 바꿀 수 있는 작은 순간이 왔다.')],null,{choices:[{id:'respect',label,next:p+'_ACTION'+i,effects:[]},{id:'bargain',label:'이번 한 번만 내 쪽 사정대로 해 달라고 한다.',next:failed,effects:[]}]});
    make(n,p+'_ACTION'+i,n.label+' · '+(i?'다른 날에도 남은 행동':'한 번 달라진 장면'),[line(practiceActions[c][i]),line(reply,c,i?'happy':'serious'),line(i?d.recovered:'상대의 목소리가 조금 풀렸다. 나는 그 변화를 바로 좋아한다는 뜻이나 사과를 받아 줬다는 선언으로 바꾸지 않았다. 다음에도 같은 답을 지킬 일이 남았다.','narrator',i?'happy':'serious')],daily,{exitEffects:[flag(key(c),i?'repaired':'testing'),flag(dayKey(c),n.day),flag('bond140Evidence'+(i+1)+'_'+c),...(i?[{type:'experience',id:'bond140-'+c+'-repaired'},rel(c,2)]:[])]});
   });
   make(n,failed,n.label+' · 대답을 빨리 받고 싶었던 마음',[line(d.distance,c),line('나는 이만큼 했다는 말이 먼저 올라왔다. 그 말로 상대의 남은 마음을 닫을 수는 없었다. 상대는 오늘 더 설명하지 않겠다고 했고, 나는 다시 이유를 물으며 붙잡지 않았다.')],daily,{exitEffects:[flag(key(c),'unsettled'),flag(dayKey(c),n.day),flag('bond140ArrivalSeen_'+c,false),flag('bond140Evidence1_'+c,false),flag('bond140Evidence2_'+c,false)]});
   make(n,later,n.label+' · 미루되 없애지 않는 말',[line('오늘 다 듣기 어렵다는 말을 숨기지 않았다. 상대는 다음에 다시 물어도 된다고 했지만, 오늘 괜찮아졌다고 답하지는 않았다. 약속을 계속하는 것과 마음을 덮는 것은 다른 일이었다.')],daily,{exitEffects:[flag(dayKey(c),n.day)]});
  }
  const owner=original.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_/);
  if(owner){
   const c=owner[1];
   if(/_DAILY$/.test(original.id))edit(original).lines.push(line(dailyWarm[c],c,'happy',{when:not(concern(c))}));
   const result=original.id.match(/_ARC(\d+)_[ab]$/);
   if(result){const episode=c==='doa'?Number(result[1])-1:Number(result[1])-7;if(episode>=0){const n=edit(original);for(const l of n.lines)if(l.speaker===c&&!l.emotion)l.emotion=episode===1||episode===3?'happy':'serious';}}
   if(/_NEXT$|_DONE_FEEL$|_DONE_CLOSENESS$/.test(original.id)){const n=edit(original);n.when=all(n.when,not(unfinishedBond(c)));}
   if(/_DONE$/.test(original.id)){
    const n=edit(original),left=all(has(key(c),'unsettled'),has(dayKey(c),n.day));
    n.lines.forEach(l=>l.when=all(l.when,not(left)));
    n.lines.push(line('오늘 약속은 여기서 마쳤다. 상대가 먼저 일어나는 걸 붙잡지 않았다. 다음 시간을 정하는 말보다, 지금 더 듣기 싫다는 답을 받아 둘 차례였다.','narrator','serious',{stageCast:[],when:left}));
   }
  }
  const water=original.id.match(/^MT19_(sea|valley|pool)_(seoyeon|jiwoo|haerin|yuna|minseo)$/);
  const doaWater=original.id.match(/^DOA23_(sea|valley|pool)$/);
  if(water||doaWater){
   const c=water?.[2]??'doa',n=edit(original);
   n.lines.forEach(l=>{if(l.speaker===c&&!l.emotion)l.emotion='happy';if(l.speaker===c)l.when=all(l.when,not(unfinishedBond(c)));});
   n.lines.push(line(waterWarm[c],c,'happy',{when:not(concern(c))}),line('함께 즐겁게 보내고 싶은 마음과, 아직 걸리는 말이 남아 있다는 건 같이 있을 수 있었다.','narrator','serious',{when:unfinishedBond(c)}),line(depthContent[c].distance,c,'serious',{when:unfinishedBond(c)}));
   n.lines.push(line('나는 잘하는 모습만 보여 주려다 오히려 어색했던 순간을 말했다. 상대 앞에서 멋있어 보이고 싶다는 마음이, 같이 편하게 있고 싶은 마음보다 먼저 나올 때도 있었다.','player','neutral'));
   for(const choice of n.choices??[]){choice.effects??=[];choice.effects.push(flag('water140Style_'+c,choice.id));}
  }
  const waterEnd=original.id.match(/^MT19_(sea|valley|pool)_(seoyeon|jiwoo|haerin|yuna|minseo)_END$/);
  if(waterEnd){const c=waterEnd[2],n=edit(original);n.lines.push(line('같이 얼마나 오래 있느냐보다 언제 쉬고 싶은지 물어봐 준 게 좋았어'+(['seoyeon','minseo'].includes(c)?'요.':'.'),c,'happy',{when:all(has('water140Style_'+c,'ask'),not(concern(c)))}),line(({seoyeon:'저도 잘 보이고 싶었어요. 그래도 어색했던 순간까지 감추지는 않아도 되겠네요.',jiwoo:'나도 좀 잘 보이고 싶었어. 근데 오늘 못한 장면까지 숨기려고 하진 않을래.',haerin:'나도 네 앞에서 안 무서운 척했어. 다음에는 같이 웃으면서 무섭다고 할래.',yuna:'너도 잘 보이고 싶었구나. 나도 오늘은 뭐든 잘하는 사람으로 보이려고 안 할래.',minseo:'저도 잘 모르는 걸 설명하는 척했네요. 오늘은 서툰 모습도 그대로 둘래요.'})[c],c,'serious',{when:all(has('water140Style_'+c,'share'),not(concern(c)))}));}
  if(original.id==='SUMMER24_END'){
   const n=edit(original);
   for(const c of people){const d=depthContent[c];n.lines.push(line(d.name+'와 다시 가까워지고 싶은 마음만으로 끝내지 못한 말이 사라지지는 않았다. 다음에 만나면 아직 들어야 할 답이 있었다.','narrator','serious',{when:unfinishedBond(c)}),line(d.name+'와는 사과한 날과 실제로 다르게 행동한 날이 서로 다른 날짜로 남았다. 편해진 마음은 그 사이를 건너서 왔다.','narrator','happy',{when:has(key(c),'repaired')}));}
  }
  const after=(original.effects??[]).concat(original.exitEffects??[]).filter(e=>e.type==='message'&&people.includes(e.character)&&e.id.includes('-after'));
  if(after.length){
   const n=edit(original),byField=['effects','exitEffects'];
   for(const field of byField){
    const source=(n[field]??[]).filter(e=>e.type==='message'&&people.includes(e.character)&&e.id.includes('-after'));
    const grouped=new Map();
    for(const e of source){e.when=all(e.when,not(unfinishedBond(e.character)));grouped.set(e.character,e.id.replace(/-(unsettled|observing)$/,''));}
    for(const [c,id]of grouped){const d=depthContent[c];for(const state of ['hesitant','unsettled','observing','testing'])n[field].push({type:'message',id:id+'-depth140-'+state,character:c,direction:'in',text:state==='hesitant'?'오늘 꺼낸 마음을 아직 다 정리하지는 못했어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.')+' 다음에 서로 어떻게 듣고 있었는지 조금 더 말해 보고 싶어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.'):state==='unsettled'?d.pending:d.soft,when:all({contact:c},has(key(c),state))});}
   }
  }
 }
 return {...base,narrativeRevision:'0.14.0',sourceRevision:'19',scope:'감정의 여파와 세 번의 실제 회복 · 주차별 표정과 동작 · 1~24주',nodes:[...base.nodes.map(n=>cloned.get(n.id)??n),...additions]};
}
