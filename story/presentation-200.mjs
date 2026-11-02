// Keep listeners' authored reaction through a two-person conflict. New movement
// art is attached only when the actual same-outfit image has been imported.
export function presentConversations200(base,assets){
 const peerIds=new Set(['LATE9_PEERS','LATE10_PEERS','LATE15_PEERS']);
 return {...base,nodes:base.nodes.map(n=>{
  const peer=peerIds.has(n.id),fresh=n.id.includes('200');
  if(!peer&&!fresh)return n;
  let changed=false;const lines=n.lines.map((l,i)=>{
   let result=l;
   if(peer&&l.emotion==='serious'&&n.cast.includes(l.to)&&l.to!==l.speaker){result={...result,source190:l.source190??i,listenerEmotions200:{[l.to]:'serious'}};changed=true;}
   if(fresh&&l.visual200&&n.week===23&&(n.cast.includes(l.speaker)||l.speaker==='player'&&n.cast.length===1)&&!['serious','hurt','heartbroken','sad'].includes(l.emotion)){
    const c=l.speaker==='player'?n.cast[0]:l.speaker,o=l.outfits?.[c]??n.outfits?.[c],seated=l.visual200==='seated';
    let key=seated?`char.${c}.${o}.posture.seated.neutral`:`char.${c}.${o}.acting.${l.visual200==='relief'?'relief200':'listen200'}`;
    if(!assets.has(key)&&l.visual200==='listening'&&assets.has(`char.${c}.${o}.listening`))key=`char.${c}.${o}.listening`;
    if(assets.has(key)){result={...result,performance200:key,...(seated?{posture:'seated',posturePolicy180:'strict'}:{})};changed=true;}
   }
   return result;
  });return changed?{...n,lines}:n;
 })};
}
