import {L,C} from './weekly-plans.mjs?v=200';
import {has,flag,all,not} from './everyday-tools.mjs?v=200';
import {unresolved} from './emotional-continuity.mjs?v=200';
import {unfinishedBond} from './relationship-depth-140.mjs?v=200';
import {any} from './everyday-tools.mjs?v=200';
const relationshipPending=c=>any(unresolved(c),unfinishedBond(c));
const names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서',doa:'도아'};
const incoming={seoyeon:'오늘 읽다가 설명하지 못한 문장을 그대로 둬 봤어요. 다음에 만나면 정리 안 된 얘기부터 해도 될까요?',jiwoo:'편집하다 잠깐 쉬는데 네가 생각났어. 오늘은 재밌는 소식 없어도 그냥 안부 묻고 싶네.',haerin:'오늘 다른 색을 골랐는데 네가 왜 그쪽인지 물어볼 것 같았어. 다음에 지금 생각을 얘기해 줄게.',yuna:'퇴근했어. 오늘은 손님 얘기 말고 내가 어떻게 지냈는지 네가 궁금해졌네. 너는 뭐 했어?',minseo:'정리 안 된 질문을 오늘은 그대로 뒀어요. 다음에 만나면 서로 잘 모르는 얘기도 해 보고 싶어요.',doa:'오늘은 업무 끝나고 연락해요. 예전 이야기 말고 요즘 어떻게 지내는지 조금 더 듣고 싶었어요.'};
const fireworks={seoyeon:'같이 봐도 눈에 남는 순간이 다르네요. 왜 저와 보고 싶었는지 듣고 싶어요. 제 쪽에서도 말해 볼게요.',jiwoo:'응, 나도 오늘 네 표정 보느라 불꽃 하나 놓쳤어. 그 얘기를 장난으로만 넘기고 싶진 않네.',haerin:'말해 줘. 나도 예전에 같이 봤던 것 말고 오늘 네 옆에 있어서 좋았던 게 있어.',yuna:'오늘은 내가 뭘 챙겼는지 말고 그냥 같이 있어서 좋았다고 해도 되지? 나도 그랬어.',minseo:'좋아요. 같은 불꽃을 보고 다른 걸 기억했으면 그 얘기도 같이 듣고 싶어요.',doa:'오늘의 저한테 물어봐 줘서 좋아요. 저도 지금 당신이 어떤 마음인지 천천히 듣고 싶어요.'};
const peerChecks={
 12:{when:all(has('peerSJ_listen'),has('peerSJ_public',true)),lines:[['축제에서 지키지 못한 공개 범위가 남아 있었다. 서연은 원본을 다시 틀기 전에 무엇을 빼고 싶은지 자기 말로 먼저 이야기하겠다고 했다.'],['공개된 뒤에는 제가 어디까지 말할지 다시 고를 수가 없었어요. 오늘은 왜 싫었는지 설명하기보다 다음에 무엇을 먼저 물어볼지 말하고 싶어요.','seoyeon'],['나도 내 의도를 설명하면 괜찮아질 줄 알았어. 오늘은 답을 먼저 정리하지 않을게.','jiwoo']]},
 13:{when:has('peerHM_scope'),lines:[['해린은 모형을 봉투에서 꺼내지 않은 채 오늘 봐 줬으면 하는 부분부터 말했다. 지난번에 답을 대신 골랐던 일이 아직 두 사람 사이에 남아 있었다.'],['제가 먼저 만지면 도와주는 거라고 생각했어요. 오늘은 어느 부분을 봐 달라는 건지 듣고 시작할게요.','minseo'],['통로 폭은 지켜야 하는 거 알아요. 그 안에서 제가 고르고 싶은 게 뭔지는 끝까지 말해 보고 싶어요.','haerin']]},
 14:{when:all(has('peerSJ_listen'),has('peerSJ_public',true),has('peerSJ_process')),lines:[['새 사진을 공개하기 전에 두 사람이 다시 앉았다. 확인 순서를 정한 적은 있어도, 그것만으로 이전에 보인 장면의 기억까지 없어지지는 않았다.'],['오늘 뺄 사진부터 제가 고를게요. 그다음에 어디에 보여 줄 건지도 같이 확인하고 싶어요.','seoyeon'],['이번에 잘 물었다고 그전 일까지 끝난 걸로 말하지 않을게.','jiwoo']]},
 17:{when:all(has('peerHM_scope'),has('peerHM_practice'),not(has('peerHM_merged'))),lines:[['방학 전 모형을 정리하며 지난번에 섞어 적었던 두 사람의 의견을 다시 나눴다. 해린은 자기 선택을 설명할 차례를 기다렸다.'],['다른 답을 하나로 정리한다고 의견 차이가 없어지는 건 아니었네요. 오늘은 해린의 답부터 듣고 제 생각을 옆에 적을게요.','minseo'],['안전 기준은 같이 볼게요. 제가 고르는 부분도 남겨 두고 싶어요. 아직 그 말을 다시 해 보는 중이에요.','haerin']]},
 18:{when:has('peerYJ_roles'),lines:[['예약금을 보내기 전에 준비표를 다시 폈다. 유나의 이름이 먼저 들어가 있던 칸을 보며 지우가 어떤 일을 맡을 수 있는지부터 다시 물었다.'],['내가 쉬러 간다는 말을 몇 번 해야 하는지 모르겠네. 비어 있는 일이 있다고 내가 맡기로 한 건 아니잖아.','yuna'],['맞아. 이번에는 누가 해 주겠지 하고 칸을 남기지 않을게. 못 정한 일은 줄이는 것도 같이 보자.','jiwoo']]},
 20:{when:all(has('peerYJ_roles'),has('peerYJ_reduce'),not(has('peerYJ_expect'))),lines:[['여행 후 준비표를 다시 보며 지우와 유나가 아직 남은 부탁의 방식을 이야기했다. 여행이 끝난 사실과 서로 편해진 마음은 같은 기록이 아니었다.'],['현장에서 내가 채우겠지 하고 기다린 칸이 있었어. 다음에는 처음부터 안 맡은 일도 남겨 둘 수 있어야 할 것 같아.','yuna'],['고맙다고 말하는 것부터 빨리 끝내고 싶었나 봐. 다음 표에서는 누구 이름을 먼저 쓰지 않고 물어볼게.','jiwoo']]}
};
const paragraph=(text,c)=>L(text,c??'narrator',c?{emotion:'serious',to:'player',stageCast:[c],shot:'medium'}:{stageCast:[]});
export function repairContinuity150(base){
 const map=new Map(base.nodes.map(n=>[n.id,n])),extra=[];
 const edit=id=>{const n=map.get(id);if(!n)return;const x=JSON.parse(JSON.stringify(n));x.lines.forEach((l,i)=>l.source140??=i);map.set(id,x);return x;};
 for(const [w,d]of Object.entries(peerChecks)){
  const n=edit('LATE'+w+'_PEERS');if(!n)continue;
  n.lines=n.lines.map(l=>({...l,when:all(l.when,d.when)}));
  n.lines.push(...d.lines.map(([t,c])=>({...paragraph(t,c),when:not(d.when)})));
 }
 const twenty=edit('LATE20_PEERS');
 if(twenty){const first=twenty.lines[0];first.when=all(first.when,not(has('summerVenue','skip')));twenty.lines.unshift(L('나는 여름 MT에 가지 않았다. 모임에서 전해 들은 여행 후기를 듣다가, 유나와 지우가 준비표를 다시 펴는 걸 보았다.','narrator',{stageCast:[],when:has('summerVenue','skip')}));}
 for(let w=9;w<=24;w++){
  const parent=edit('LATE'+w+'_INCOMING'),read=parent?.choices?.find(c=>c.id==='read');if(!read)continue;
  // Preserve the earlier first-match route only for replays of pre-150 saves.
  read.replayOnly=true;
  const id='LATE'+w+'_INCOMING_LIST150';
  parent.choices.unshift(C('messages150','주고받던 대화 중 오늘 더 듣고 싶은 안부를 확인한다.',id));
  extra.push({...parent,id,label:w+'주 목요일 밤 · 다시 열어 볼 대화',lines:[L('먼저 온 안부도 내가 자주 열던 대화만 보게 될 때가 있었다. 오늘은 누구의 이야기를 이어 듣고 싶은지 대화창을 살펴봤다.')],effects:[],choices:[C('leave','오늘은 더 읽지 않고 쉬기로 한다.',parent.next),...Object.entries(names).map(([c,name])=>C(c,name+'의 안부를 읽는다.','LATE'+w+'_INCOMING_'+c,[],all({contact:c},has('arc'+c+'1'))))],next:parent.next});
  for(const c of Object.keys(names)){
   const n=edit('LATE'+w+'_INCOMING_'+c);if(!n)continue;
   n.lines=[L('“'+incoming[c]+'”','narrator',{when:not(relationshipPending(c))}),L('“다음에 만나면 지난번 끝내지 못한 얘기부터 조금 더 해 보고 싶어'+(['seoyeon','minseo','doa'].includes(c)?'요.':'.')+' 오늘은 답을 급히 받으려고 연락한 건 아니'+(['seoyeon','minseo','doa'].includes(c)?'에요.”':'야.”'),'narrator',{when:relationshipPending(c)})];
   n.effects=n.effects.map(e=>e.type==='message'?{...e,text:incoming[c],when:all(e.when,not(relationshipPending(c)))}:e);
   n.effects.push({type:'message',id:'LATE'+w+'_INCOMING-'+c,character:c,direction:'in',text:'다음에 만나면 지난번 끝내지 못한 이야기부터 조금 더 듣고 싶어요. 오늘 답을 급히 받으려는 건 아니에요.',when:all({contact:c},relationshipPending(c))});
  }
 }
 for(const c of Object.keys(names)){
  const n=edit('FIRE22_'+c);if(!n)continue;
  n.lines=n.lines.filter(l=>l.speaker!==c);
  for(const l of n.lines)if(l.speaker==='player')l.when=all(l.when,not(relationshipPending(c)));
  n.lines.push(L(fireworks[c],c,{emotion:'happy',when:not(relationshipPending(c))}),L('함께 불꽃을 보러 왔지만 아직 끝내지 못한 말은 남아 있었다. 나는 소리가 잦아든 뒤 오늘 얼마나 이야기하고 싶은지부터 물었다.','narrator',{emotion:'serious',when:relationshipPending(c)}),L(['seoyeon','minseo','doa'].includes(c)?'오늘 같이 보는 건 좋아요. 그렇다고 지난번 마음이 바로 풀렸다는 뜻은 아니에요. 오늘은 조금 천천히 있어도 될까요?':'오늘 같이 보는 건 좋아. 그렇다고 지난번 마음이 바로 풀렸다는 뜻은 아니야. 오늘은 조금 천천히 있어도 될까?',c,{emotion:'serious',when:relationshipPending(c)}));
 }
 // Only proven broken Korean particles are normalized; story facts stay intact.
 const grammar=t=>typeof t==='string'?t.replaceAll('서연와','서연과').replaceAll('해린와','해린과').replaceAll('민서와는는','민서와는'):t;
 const nodes=[...map.values(),...extra].map(n=>{if(grammar(n.label)===n.label&&n.lines.every(l=>grammar(l.text)===l.text)&&(n.choices??[]).every(ch=>grammar(ch.label)===ch.label))return n;return {...n,label:grammar(n.label),lines:n.lines.map(l=>grammar(l.text)===l.text?l:{...l,text:grammar(l.text)}),...(n.choices?{choices:n.choices.map(ch=>grammar(ch.label)===ch.label?ch:{...ch,label:grammar(ch.label)} )}:{})};});
 return {...base,nodes};
}
