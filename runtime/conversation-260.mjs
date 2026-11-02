import {pendingLines260,dailyLabels260,dailyResponses260,pendingResponses260} from './conversation-content-260.mjs?v=260';
import {aftermathPairs200} from '../story/aftermath-200.mjs?v=230';

const dailyOwner=/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_(ARRIVE|DAILY|DONE|DONE_FEEL|DONE_CLOSENESS|LEAVE)$/;
const oldPending='지난번 관계를 더 생각해 보자고 한 질문은 아직 남아 있었다. 오늘 같이 보낸 시간을 그 질문에 대한 대답으로 대신 쓰지는 않았다.';
const oldClosing='서로 돌아갈 시각을 확인했다. 남은 말은 다음에 다시 꺼내도 되는지 물으며 오늘의 약속을 마쳤다.';
function phaseFor(c,world){
 const f=world.flags,state=f['separation200State_'+c];
 return !f['couple160Ended_'+c]&&!f.overlap160Ever&&['waiting','heard','practiced'].includes(state)?state:'calm';
}
export function endingClosingIndex260(node,world,condition){
 if(!/^END150_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/.test(node.id))return -1;
 for(let i=node.lines.length-1;i>=0;i--)if(node.lines[i].speaker==='narrator'&&condition(node.lines[i].when,world))return i;
 return -1;
}
export function conversationLine260(node,line,index,world,decisions,closingIndex=-1){
 const owner=dailyOwner.exec(node.id);
 if(owner){
  const c=owner[1],beat=owner[2],phase=phaseFor(c,world);
  if(line.text===oldPending&&phase!=='calm')return {...line,text:pendingLines260[c][phase][beat.startsWith('DONE')?'DONE':beat],continuity260:{phase,beat}};
  if(beat==='DONE'&&line.text===oldClosing){
   const source=node.id.replace(/_DONE$/,'_DAILY');let choice;
   for(let i=decisions.length-1;i>=0;i--)if(decisions[i].nodeId===source){choice=decisions[i].choiceId;break;}
   const response=(phase==='calm'?dailyResponses260:pendingResponses260)[c]?.[choice];
   if(response)return {...line,text:response+'\n\n'+line.text,feedback260:{source,choice,phase}};
  }
 }
 if(index===closingIndex){
  const recaps=[];
  for(const [pair,d]of Object.entries(aftermathPairs200)){
   const stage=world.flags['collab200_'+pair];
   if(stage===3)recaps.push(d.summary);
   else if(stage===1||stage===2)recaps.push(d.name+'의 새 협업에는 다음에 다시 확인할 부분이 남았다. 첫날 같이 앉았다는 이유로 모든 의견이 맞아진 것은 아니었다.');
  }
  if(recaps.length)return {...line,text:line.text+'\n\n둘 사이의 답과 별개로, 함께 지켜본 작업도 남았다.\n'+recaps.join('\n'),payoffs260:true};
 }
 return line;
}
export function conversationChoice260(node,choice,world){
 const owner=dailyOwner.exec(node.id);if(!owner||owner[2]!=='DAILY')return choice;
 const c=owner[1],label=dailyLabels260[c][phaseFor(c,world)]?.[choice.id];
 return label?{...choice,label}:choice;
}
