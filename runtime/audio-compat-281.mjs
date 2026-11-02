// Keep these calls inside the input handler: iOS checks activation before await.
export function playbackSession281(nav=globalThis.navigator){
 try{if(nav?.audioSession)nav.audioSession.type='playback';}catch{}
}
export function bindAudioGestures281(target,unlock){
 const events=['pointerup','touchend','click','keydown'];
 const handler=()=>{void unlock();};
 for(const event of events)target.addEventListener(event,handler,{capture:true,passive:true});
 return ()=>{for(const event of events)target.removeEventListener(event,handler,{capture:true});};
}
export function decodeAudio281(context,bytes,timeoutMs=8000){
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(Error('Audio decode timed out')),timeoutMs);
  const success=buffer=>{clearTimeout(timer);if(buffer)resolve(buffer);else reject(Error('Empty audio buffer'));};
  const failure=error=>{clearTimeout(timer);reject(error??Error('Audio format unavailable'));};
  try{const pending=context.decodeAudioData(bytes,success,failure);pending?.then(success,failure);}catch(error){failure(error);}
 });
}
export async function loadAudio281(context,fetcher,url){
 const controller=typeof globalThis.AbortController==='function'?new AbortController():null;
 let timer;
 const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller?.abort();reject(Error('Audio request timed out'));},12000);});
 try{
  return await Promise.race([(async()=>{
   const response=await fetcher(url,controller?{signal:controller.signal}:{});
   if(!response.ok)throw Error('Audio HTTP '+response.status);
   return decodeAudio281(context,await response.arrayBuffer());
  })(),timeout]);
 }finally{clearTimeout(timer);}
}
