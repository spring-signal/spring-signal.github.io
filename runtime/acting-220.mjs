// Bind movement to specific authored beats, never to draw count or text hashes.
// The candidate may be absent after an image refusal; performanceAsset then
// keeps the existing same-outfit emotional fallback.
const summerBeats=new Map([
 ['접수대에서 다시 봤을 때 기억 속 얼굴을 먼저 떠올렸어요. 기억 속 사람은 이상하게 그대로 있는데 실제 시간은 계속 갔더라고요.','explain220'],
 ['저도 당신 앞에서 잘 보이고 싶어서 답을 오래 골랐어요. 오늘은 제가 먼저 말할게요. 우리 연인으로 만나 볼까요?','shy220'],
 ['서운했던 걸 말하면 네가 미안하다고만 할까 봐 망설였어요. 오늘은 미안함 뒤에도 제가 무슨 말을 하는지 조금 더 들어 줬으면 해요.','hurt220']
]);
const reunionBeats=new Map([
 ['DOA15_REUNION',['복학했어요? 목소리 듣고 혹시 했는데. 오랜만이네요.','listen220']],
 ['DOA15_BUSY',['저도 반가워요. 그런데 지금은 접수하는 분들이 기다려서요. 끝나고도 괜찮으면 그때 이야기할까요?','refuse220']],
 ['DOA15_AFTER',['옛날 이야기만 하려니까 지금 어떻게 지내는지부터 모르겠네요. 개인적으로도 안부 물어봐도 될까요?','think220']]
]);
const privateBeats=new Map([
 ['그 장면은 저도 기억나요. 예전엔 모르던 {name} 씨 쪽의 이야기가 생겼네요.','listen220'],
 ['예전 이야기를 안 꺼내도 할 말이 생기네요. 오늘 네 얘기 더 알게 돼서 좋았어요.','tease220'],
 ['학교에서 마주치면 제가 늘 답을 아는 사람처럼 보이죠? 일 아닌 말은 자꾸 어떻게 답해야 할지 모르겠어요.','hesitant220']
]);
export function authoredActing220(node,line,presentation){
 if(line.speaker!=='doa')return;
 const outfit=presentation.outfits.doa;
 let acting;
 if(outfit==='mid130a'){
  const beat=reunionBeats.get(node.id);
  if(beat?.[0]===line.text)acting=beat[1];
 }else if(outfit==='mid130b'&&/^PLAN16_doa_/.test(node.id))acting=privateBeats.get(line.text);
 else if(outfit==='summer130g'&&/^PLAN23_doa_/.test(node.id))acting=summerBeats.get(line.text);
 if(acting)return `char.doa.${outfit}.acting.${acting}`;
}
