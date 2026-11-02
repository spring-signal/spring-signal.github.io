// Narrow 0.19 editorial repairs. Apply after frozen story180; no relationship history changes.
import {has,all,any,not} from './everyday-tools.mjs?v=200';
const polite=c=>['seoyeon','minseo','doa'].includes(c);
const states=['strained','observing','testing'];
const pending=c=>all(any(...states.map(s=>has('couple160State_'+c,s))),not(has('couple160Ended_'+c)));
const phase=c=>states.map(s=>[s,all(has('couple160State_'+c,s),not(has('couple160Ended_'+c)))]);
const observed={
 seoyeon:'지난번 제 말을 끝까지 들어 주신 뒤로, 다음에는 제 쪽에서 먼저 말해 보고 싶어졌어요. 아직 편한 만큼만 천천히 이야기하고 싶어요.',
 jiwoo:'지난번에 내 말 끝날 때까지 들어 준 건 기억해. 아직 바로 장난칠 기분은 아닌데, 다음에는 내가 하고 싶은 말부터 꺼내 볼게.',
 haerin:'지난번엔 아는 답부터 말하지 않고 내 얘기 들어 줬잖아. 바로 예전처럼은 아니어도, 다음에 뭐가 달랐는지 더 얘기하고 싶어.',
 yuna:'지난번엔 내 얘기부터 들어 줬지. 오늘은 괜찮은 얼굴부터 준비하지 않고 연락했어. 다음에 만날 때도 그 얘기 조금 더 해 보고 싶어.',
 minseo:'지난번에 제 쪽의 말을 먼저 들어 주신 건 기억해요. 설명을 다 정리하지 못해도 다음에 이어 말해 보고 싶어요. 아직 답을 한꺼번에 고르기는 어렵고요.',
 doa:'지난번 제 말을 듣고 기다려 주셨던 건 기억해요. 다음에도 업무가 끝난 뒤, 지금 제 쪽에 남은 마음부터 조금 더 이야기하고 싶어요.'
};
const tested={
 seoyeon:'그때 말했던 방식을 다르게 해 본 순간은 제 쪽에도 남아 있어요. 그 한 번으로 다 편해진 건 아니지만 다음에도 제 쪽에서 말해 볼 수는 있겠어요.',
 jiwoo:'지난번에 말로만 듣고 넘기지 않은 건 봤어. 아직 다 괜찮다는 말보단, 다음에도 그랬으면 좋겠다는 말을 하고 싶네.',
 haerin:'지난번엔 우리가 말했던 대로 해 본 순간이 있었잖아. 한 번으로 다 안다고 하진 않을게. 다음에 네 쪽에선 어땠는지도 듣고 싶어.',
 yuna:'그때 이야기했던 걸 다르게 해 본 순간은 나도 기억해. 오늘은 그때 조금 편했던 걸 말하고 싶었어. 다음에도 내가 먼저 내 하루를 말해 볼게.',
 minseo:'지난번 다르게 해 본 일을 집에 와서도 생각했어요. 한 번의 답을 언제나 같은 허락으로 만들지 않고, 다음에도 다시 물을 수 있으면 좋겠어요.',
 doa:'지난번 말했던 방식을 실제로 지켜 본 날이 있었죠. 아직 모든 게 편해진 건 아니지만, 다음에도 지금 제 답을 먼저 말해 보고 싶어요.'
};
function strained(c){const p=polite(c);return '지난번 멈춘 이야기가 아직 '+(p?'제':'내')+' 쪽에 남아 있어'+(p?'요.':'.')+' 다음에 만나면 다른 근황보다 그 말부터 조금 더 하고 싶어'+(p?'요.':'.');}
export function pendingSms190(c,state){return state==='observing'?observed[c]:state==='testing'?tested[c]:strained(c);}
const jiwooPrivate={
 a:'휴대폰은 지우 쪽에 그대로 뒀다. 화면을 함께 고르는 대신 지금 서로 눈에 들어온 것을 하나씩 말하며 걸었다.',
 b:'지우는 전송 화면을 열지 않았다. 다음에 꼭 보여 주겠다는 약속도 받지 않은 채, 우리는 돌아갈 시간을 확인했다.'
};
const yunaClosing={
 7:{a:'유나는 맡겠다고 한 일만 목록에 남겼다. 빈칸을 전부 채울 때까지 기다리는 대신, 오늘 같이 쉬고 싶은 이야기를 하나 꺼냈다.',b:'나는 내가 할 수 있는 몫만 말하고 유나의 빈칸까지 채우지는 않았다. 유나는 그 목록을 접고 오늘 하고 싶었던 다른 이야기를 꺼냈다.'},
 8:{a:'유나는 물병 뚜껑을 닫고 잠깐 말없이 옆에 있었다. 나도 새 질문을 찾지 않았다. 대답이 없는 몇 분도 오늘 만난 시간에 남았다.',b:'우리는 오늘의 만남을 짧게 마치고 인사했다. 유나가 다음에는 더 잘해 주겠다는 말을 꺼내려다 멈췄고, 나도 그 약속을 기다리지 않았다.'},
 9:{a:'유나는 내 취향을 듣고 자기가 고른 간식을 한 입 더 먹었다. 한쪽이 다른 쪽의 답을 고치지 않고도 같이 먹을 수 있었다.',b:'유나는 다음 쉬는 날 처음 가 보고 싶은 곳을 잠깐 생각했다. 장소와 시간을 바로 확정하지 않고, 지금 떠오른 취향부터 조금 더 이야기했다.'},
 10:{a:'우리는 답하기 편한 때와 혼자 쉬고 싶은 때를 구별해 말했다. 연락을 못 하는 시간도 다음에 다시 이어 말할 수 있는 하루의 일부로 남겼다.',b:'유나는 일이 없는 초대 문장을 소리 내어 한 번 말하고 웃었다. 부탁할 일이 없어도 연락할 수 있다는 말을, 오늘은 자기 목소리로 먼저 꺼냈다.'}
};
export function repairContinuity190(base){
 const nodes=base.nodes.map(original=>{
  const privateResult=original.id.match(/^PLAN\d+_jiwoo_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC9_([ab])$/);
  const yunaResult=original.id.match(/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_ARC(7|8|9|10)_([ab])$/);
  const yunaWalk=/^MT19_(sea|valley|pool)_WALK_yuna$/.test(original.id);
  const inbox=original.id.match(/^LATE\d+_INCOMING_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);
  const reply=original.id.match(/^LATE\d+_INCOMING_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_REPLY$/);
  const invitation=original.id.match(/^LATE\d+_INCOMING_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_NEXT_ASK$/);
  const returnVisit=original.id==='DOA17_CONTACT';
  if(!privateResult&&!yunaResult&&!yunaWalk&&!inbox&&!reply&&!invitation&&!returnVisit)return original;
  const n={...original,lines:original.lines.map((l,i)=>({...l,source180:l.source180??i}))};
  if(privateResult)for(const l of n.lines)if(l.text==='지우는 사진을 바로 보내지 않고 내게 보여도 되는지 먼저 물었다. 나는 고개를 끄덕이고 오늘의 장면을 같이 골랐다.')l.text=jiwooPrivate[privateResult[1]];
  if(yunaResult&&Number(yunaResult[1])===8)for(const l of n.lines)if(l.speaker==='yuna'){l.emotion='serious';l.emotionPolicy180='strict';delete l.acting;delete l.gesture;}
  if(yunaResult)for(const l of n.lines)if(l.text==='유나는 마지막 빈 컵을 치우려다 손을 멈췄다. 오늘은 손님이 아니라는 말을 내게도, 자기 자신에게도 해 보는 것 같았다.')l.text=yunaClosing[Number(yunaResult[1])][yunaResult[2]];
  if(yunaWalk)for(const l of n.lines)if(l.text==='유나는 마지막 빈 컵을 치우려다 손을 멈췄다. 오늘은 손님이 아니라는 말을 내게도, 자기 자신에게도 해 보는 것 같았다.')l.text='유나는 잠깐 말없이 물가를 봤다. 다음에 뭘 해야 할지 찾기보다, 지금 쉬고 싶어서 나온 자리에서 바람을 조금 더 맞았다.';
  if(returnVisit)n.label='17주 월요일 · 다시 마주친 도아';
  const c=inbox?.[1]??reply?.[1]??invitation?.[1];
  if(c){
   const held=pending(c),alternatives=phase(c);
   if(inbox){
    n.choices=original.choices?.map(ch=>({...ch,label:ch.id==='reply'?'오늘 온 연락에 답하고, 다음에 이야기할 수 있는 시간을 묻는다.':ch.id==='later'?'연락을 확인하고, 구체적인 약속은 다음에 정한다.':ch.label}));
    for(const l of n.lines)l.when=all(l.when,not(held));
    n.lines.push(...alternatives.map(([state,when])=>({speaker:'narrator',text:'“'+pendingSms190(c,state)+'”',when,source180:0})));
   }
   if(reply){
    const old=n.lines[0];old.when=all(old.when,not(held));
    n.lines.push(...alternatives.map(([state,when])=>({speaker:'narrator',text:state==='strained'?'다음에는 지난번 멈춘 말부터 듣고 싶다고 답했다. 이미 정한 약속은 바꾸지 않고 서로 이야기할 수 있는 날을 다시 확인하기로 했다.':state==='observing'?'지난번 듣고 나서 내 쪽에 남은 생각도 다음에 이야기하겠다고 답했다. 괜찮아졌다는 답부터 기다리기보다 서로 가능한 시간을 확인했다.':'지난번 다르게 해 본 순간이 내 쪽에도 기억난다고 답했다. 그 한 번으로 답을 다 아는 척하지 않고 다음에 이어 이야기할 시간을 남겼다.',when,source180:0})));
   }
   if(invitation){
    const old=n.lines[1];old.when=all(old.when,not(held));
    const suffix=polite(c)?'시간은 괜찮아요. 다음에는 남아 있는 말부터 조금 더 나눠요. 오늘 바로 다 풀렸다고 하지는 않을게요.':'시간은 괜찮아. 다음에는 남아 있는 말부터 조금 더 나누자. 오늘 바로 다 풀렸다고 하진 않을게.';
    n.lines.push({speaker:'narrator',text:'“'+suffix+'”',when:held,source180:1});
   }
   // Keep each original message ID/direction/condition. Only its narrative text
   // changes at the actual existing strained/observing/testing state.
   if(inbox||reply){n.effects=(original.effects??[]).flatMap(e=>{
    if(e.type!=='message'||e.character!==c)return[e];
    const out=e.direction==='out',p=!['jiwoo','haerin'].includes(c);
    return[{...e,when:all(e.when,not(held))},...alternatives.map(([state,when])=>({...e,when:all(e.when,when),text:out?(state==='strained'?'다음에는 지난번 멈춘 말부터 다시 듣고 싶어':state==='observing'?'지난번 들은 뒤 내 쪽에 남은 생각도 다음에 이야기하고 싶어':'지난번 다르게 해 본 순간은 내 쪽에도 남아 있어')+(p?'요. 가능한 날은 서로 다시 확인해요.':'. 가능한 날은 서로 다시 보자.'):pendingSms190(c,state)}))];
   });}
  }
  return n;
 });
 return {...base,narrativeRevision:'0.19.0',sourceRevision:'23',scope:'사적 사진과 휴식의 선택 · 단계별 갈등 뒤 안부 · 실제 선택에 맞는 마무리 · 1~24주',nodes};
}
