import {L,C} from './weekly-plans.mjs?v=200';
import {has,flag,all,not,exp} from './everyday-tools.mjs?v=200';
import {peerResolved} from './peer-conflicts.mjs?v=200';
import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
export const peerRepairData160={
 SJ:{name:'서연·지우',pair:['seoyeon','jiwoo'],minWeek:16,
 hear:[['새 공개 작업을 정하기 전에 서연과 지우에게 지난번에 남은 말을 다시 들어도 되는지 물었다. 두 사람은 오늘은 각자 직접 말하고 싶다고 했다.'],['글을 어디까지 보여 줄지, 어떤 뜻으로 썼는지 제가 직접 말하고 고를 자리가 필요했어요. 오늘은 다른 사람이 뜻을 대신 정하지 않았으면 해요.','seoyeon'],['나도 잘 보여 주고 싶었다는 말부터 하려 했어. 그런데 그 말을 듣고 괜찮아져야 하는 사람은 서연이가 아니었네.','jiwoo']],
 first:[['서연이 공개할 문장을 직접 고를 시간을 뒀다. 지우는 고른 범위에 맞춰 원본과 공개본을 나누고 안내문도 새로 저장했다. 나는 두 사람의 문장을 한 줄로 바꾸지 않고 각각 남겼다.'],['뺀 문장을 왜 뺐는지 길게 설명하지 않아도 오늘 작업은 같이 할 수 있네요.','seoyeon'],['오늘 확인받은 파일만 남겼어. 한 번 잘했다고 지난번에 남은 마음이 없어진 건 아니지만, 다음에도 이 순서부터 할게.','jiwoo']],
 follow:[['새 작업의 마감이 가까워졌다. 서연의 확인이 늦어지자 지우가 공개 시각을 미루겠다고 먼저 말했다. 나는 답이 늦는 이유를 서연에게 대신 캐묻지 않았다.'],['늦었다는 이유로 허락한 범위를 넓히지 않아 줬네요. 이제는 다음 글도 제 쪽에서 먼저 보여 주고 싶어요.','seoyeon'],['확인할 시간이 드는 것도 작업 시간에 넣어야겠네. 줄인 건 우리가 같이 쓰는 원고가 아니라 내가 먼저 정하던 순서였어.','jiwoo']],
 action:'서연이 고른 공개 범위만 남기고, 지우와 파일·안내문을 실제로 다시 정리한다.',last:'마감이 가까워도 확인을 재촉하지 않고 공개 시각을 조정한다.',summary:'서연과 지우는 공개 범위와 말할 순서 때문에 불편했던 일을 없던 일로 만들지 않았다. 서로의 말을 직접 듣고, 다른 날짜의 공개 작업에서도 확인할 범위를 지킨 뒤에야 다음 원고를 함께 보자고 했다.'},
 HM:{name:'해린·민서',pair:['haerin','minseo'],minWeek:19,
 hear:[['새 모형을 꺼내기 전에 해린과 민서가 각자 오늘 부탁할 부분부터 이야기했다. 나는 내가 먼저 결론 내리려던 말도 다시 꺼냈다.'],['안전한 폭은 지켜야 해요. 그래도 그 안에서 제가 고르고 싶은 부분까지 맞는 답으로 정리되면 작업을 보여 주기가 어려워요.','haerin'],['고치면 좋아지는 부분과 제가 고르기 편한 부분을 섞었어요. 오늘은 부탁받은 범위를 듣고 제 의견은 따로 말할게요.','minseo']],
 first:[['해린이 모형의 한 면을 설명한 뒤 민서가 자기 의견을 옆 종이에 적었다. 민서는 해린이 고른 색을 바꾸어 칠하지 않았다. 나는 안전 기준과 조언을 서로 다른 칸에 남겼다.'],['다른 의견이 적혀 있어도 마지막 선택이 제 쪽에 남아 있네요. 숨기지 않고 다시 펼쳐 볼 수 있겠어요.','haerin'],['제가 고치지 않았다고 아무 도움도 못 드린 건 아니었네요. 어떤 답을 원하는지 듣는 시간이 먼저였어요.','minseo']],
 follow:[['새 작업에서도 민서는 이전에 괜찮았던 범위를 영구한 허락처럼 쓰지 않았다. 해린이 봐 달라고 한 부분을 먼저 듣고, 설명이 끝난 뒤 의견을 보탰다.'],['오늘은 전에 고른 색하고 달라도 먼저 물어봐 주셨네요. 다음에도 제가 직접 부탁할 수 있을 것 같아요.','haerin'],['먼저 물으면 의견이 사라지는 게 아니라 자리가 달라지네요. 다음 작업도 그 순서부터 해 볼게요.','minseo']],
 action:'해린의 설명 뒤 민서 의견을 옆에 남기고, 해린이 직접 고른 디자인을 유지한다.',last:'새 작업에서도 봐 달라는 범위를 다시 묻고 그 부분만 살핀다.',summary:'해린과 민서는 예전 작업에서 서로의 답을 듣던 순서를 기억하면서도 새 작업을 다시 펼쳤다. 다른 날에도 안전 기준과 마지막 선택의 주인을 구분할 수 있었고, 해린이 먼저 의견을 부탁하는 날이 생겼다.'},
 YJ:{name:'유나·지우',pair:['yuna','jiwoo'],minWeek:21,
 hear:[['유나가 함께 볼 수 있다고 한 시간에 지우와 준비표를 다시 폈다. 유나는 오늘 맡을 일을 정하기 전에 지난번에 쉬고 싶다는 말을 하며 어떤 마음이 들었는지부터 이야기하고 싶다고 했다.'],['내가 대신 다 해 줄 사람을 찾고 있었던 건 아니야. 아무도 안 맡으면 줄여도 되는 일이라는 답을 같이 보고 싶었어.','yuna'],['고맙다고 말하면 부탁도 괜찮은 줄 알았어. 내가 맡을 수 있는 시간부터 직접 적고, 못 맡는 건 줄이는 쪽도 생각할게.','jiwoo']],
 first:[['맡겠다고 답한 사람의 이름과 시간만 준비표에 남겼다. 아무도 맡지 않은 간식 항목은 줄였고, 유나가 비워 둔 휴식 칸을 다른 일로 채우지 않았다.'],['빈칸을 보고도 누가 나를 부를지 기다리지 않아도 되네. 오늘은 내가 하겠다고 한 몫에서 멈출 수 있겠어.','yuna'],['준비물을 줄이니까 마음까지 덜 쓴 모임이 되는 건 아니네. 내 쪽에서 할 일도 정확해졌어.','jiwoo']],
 follow:[['다음 모임에서 유나가 오늘은 더 돕기 어렵다고 말했다. 지우는 이유를 더 묻지 않고 정한 인원으로 할 수 있는 규모를 골랐다. 나는 유나를 다시 부르자는 말을 보태지 않았다.'],['거절한 뒤에도 같은 자리에 있어도 되는 모임이면 다음에도 오고 싶지. 오늘은 그게 조금 믿어져.','yuna'],['다음에는 같이 쉬고 싶은 시간을 먼저 물을게. 뭘 부탁할지부터 찾지 않고.','jiwoo']],
 action:'맡겠다고 한 사람·시간만 남기고, 아무도 맡지 않은 일을 실제로 줄인다.',last:'유나가 더 돕지 않겠다고 해도 이유를 캐묻지 않고 정한 규모로 모임을 마친다.',summary:'유나와 지우는 준비표를 고친 날 뒤에도 같은 답을 지킬 수 있는지 보았다. 유나가 도움을 거절해도 다시 부르지 않았고, 지우는 부탁할 일보다 함께 쉬고 싶은 시간을 먼저 묻게 되었다.'}
};
export function addPeerRecovery160(base){
 const changed=new Map(),added=[];
 const edit=n=>{if(!changed.has(n.id)){const x={...n,lines:n.lines.map((l,i)=>({...l,source150:l.source150??i})),choices:n.choices?.map(ch=>({...ch})),effects:n.effects?.map(e=>({...e})),exitEffects:n.exitEffects?.map(e=>({...e}))};changed.set(n.id,x);}return changed.get(n.id);};
 const make=(n,id,label,cast,lines,next,extra={})=>{const x={...n,id,label,cast,lines,next,choices:undefined,effects:[],exitEffects:[],when:undefined,terminal:false,background:'bg.club_day',location:'club',timeOfDay:'day',onDuty:{yuna:false},...extra};x.outfits=wardrobeFor(x);added.push(x);return x;};
 const lines=data=>data.map(([t,c])=>L(t,c??'narrator',c?{stageCast:[c],to:'player',shot:'medium',emotion:'serious'}:{stageCast:[]}));
 for(const original of base.nodes){
  if(/^LATE(?:16|19|21|22|23|24)_PEERS_CONTACT$/.test(original.id)){
   const n=edit(original),back=n.next,root=n.id+'_REPAIR160';
   n.choices.push(C('repairPeers160','시간이 괜찮은 사람들과 지난 작업에서 남은 말을 다시 듣는다.',root+'_HUB0'));
   for(let round=0;round<3;round++){
    const after=round===2?back:root+'_HUB'+(round+1);
    make(n,root+'_HUB'+round,n.week+'주 금요일 · 끝내지 못한 작업 이야기',[],[L(round?'오늘 이야기할 부분은 마치고 각자의 다음 일을 정리했다. 아직 시간과 마음이 괜찮은 사람들의 이야기를 더 들어도 되는지 살폈다.':'정리 모임 뒤에 잠깐 더 이야기할 시간이 있는지 물었다. 누구를 빨리 화해시키기보다 지난 작업에서 끝내지 못한 말을 당사자가 다시 꺼낼 수 있으면 좋겠다고 말했다.','narrator',{stageCast:[]})],back,{choices:[C('leave','오늘은 여기서 마치고 먼저 간다.',back),...Object.entries(peerRepairData160).filter(([,d])=>n.week>=d.minWeek).map(([pair,d])=>C(pair,d.name+'와 서로 괜찮은지 확인하고 이야기한다.',[{when:has('peerRepair160_'+pair,'testing'),node:root+'_'+round+'_'+pair+'_FOLLOW'},{when:has('peerRepair160_'+pair,'heard'),node:root+'_'+round+'_'+pair+'_FIRST'},{node:root+'_'+round+'_'+pair+'_HEAR'}],[],all(not(peerResolved[pair]),not(has('peerRepair160_'+pair,'repaired')),not(has('peerRepair160Day_'+pair,n.day)))))]});
    for(const [pair,d]of Object.entries(peerRepairData160)){
     if(n.week<d.minWeek)continue;
     const p=root+'_'+round+'_'+pair,day=flag('peerRepair160Day_'+pair,n.day),state=s=>flag('peerRepair160_'+pair,s);
     for(const [phase,data,label,success]of [['HEAR',d.hear,'서로의 말을 정리하지 않고 각자 끝까지 듣고 내 개입도 인정한다.','heard'],['FIRST',d.first,d.action,'testing'],['FOLLOW',d.follow,d.last,'repaired']]){
      // Action itself is authored after the decision; it cannot have happened before choosing.
      const intro=phase==='HEAR'?lines(data):[L(phase==='FIRST'?'지난번 나눈 말을 떠올리며 오늘 같이 할 작업을 폈다. 정한 방식을 실제로 지킬 수 있는 작은 순간이 왔다.':'지난번과 다른 작업에서도 같은 답을 지킬 수 있는지 볼 차례였다. 예전에 괜찮았다는 답을 먼저 쓰지 않기로 했다.','narrator',{stageCast:[]})];
      make(n,p+'_'+phase,n.week+'주 · '+d.name+' · '+(phase==='HEAR'?'남은 마음을 다시 듣기':phase==='FIRST'?'실제로 달라진 작업':'다른 날에도 지킨 선택'),d.pair,intro,null,{choices:[C('respect',label,p+'_'+phase+'_DONE'),C('rush',phase==='HEAR'?'서로 좋은 뜻이었으니 오늘은 끝내자고 한다.':'이번 한 번만 전처럼 하고 다음에는 바꾸자고 한다.',p+'_MISSED'),C('later','오늘은 더 생각하고 다른 날 다시 이야기하기로 한다.',p+'_LATER')]});
      make(n,p+'_'+phase+'_DONE',n.week+'주 · '+d.name+' · '+(phase==='FOLLOW'?'다음에도 다시 물을 수 있는 사이':'오늘 한 단계만 남기며'),d.pair,phase==='HEAR'?[L('각자의 말을 들은 뒤에도 두 사람이 바로 편해졌다고 답하지는 않았다. 다음 작업에서 무엇을 바꿀지 자기 말로 다시 정하고 오늘은 여기까지 두었다.','narrator',{stageCast:[]})]:lines(data),after,{exitEffects:[state(success),day,exp('peer-repair160-'+pair+'-'+phase.toLowerCase())]});
     }
     make(n,p+'_MISSED',n.week+'주 · '+d.name+' · 아직 끝내지 못한 답',d.pair,[L('두 사람은 사정을 알았다는 말과 편해진 마음은 다르다고 말했다. 나는 이번 한 번이라는 말로 다시 양보를 기다리고 있었다는 걸 알아차렸다. 오늘은 더 대답을 재촉하지 않았다.','narrator',{stageCast:[]})],after,{exitEffects:[state('strained'),day]});
     make(n,p+'_LATER',n.week+'주 · '+d.name+' · 시간을 더 둔 작업',d.pair,[L('오늘은 더 생각할 시간이 필요하다고 말했다. 다음에 다시 꺼낼 수 있는지는 그때도 묻기로 했다. 미뤄 둔 일을 풀린 일로 바꾸지는 않았다.','narrator',{stageCast:[]})],after,{exitEffects:[day]});
    }
   }
  }
  if(['EXHIBIT24_START','SUMMER24_END'].includes(original.id)){
   const n=edit(original);
   for(const [pair,d]of Object.entries(peerRepairData160)){
    const prefix=pair==='SJ'?'서연과 지우':pair==='HM'?'해린과 민서':'유나와 지우';
    for(const l of n.lines)if(l.text.startsWith(prefix))l.when=all(l.when,not(has('peerRepair160_'+pair,'repaired')));
    n.lines.push(L(d.summary,'narrator',{when:has('peerRepair160_'+pair,'repaired')}));
   }
  }
 }
 return {...base,nodes:[...base.nodes.map(n=>changed.get(n.id)??n),...added]};
}
