// Keep native button hit testing. A swipe, rotation, or finger released over a
// different button must never activate another menu item on the delayed click.
export function guardTitleTouches(menu) {
 const doc=menu.ownerDocument,win=doc.defaultView;
 let gesture;
 const button=event=>{const el=event.target?.closest?.('button');return el&&menu.contains(el)?el:null;};
 const invalidate=()=>{if(gesture)gesture.cancelled=true;};
 const down=event=>{
  if(!['touch','pen'].includes(event.pointerType)) {gesture=undefined;return;}
  const target=button(event);if(!target)return;
  gesture={target,pointerId:event.pointerId,x:event.clientX,y:event.clientY,cancelled:false,time:event.timeStamp};
 };
 const move=event=>{if(gesture&&event.pointerId===gesture.pointerId&&Math.hypot(event.clientX-gesture.x,event.clientY-gesture.y)>12)invalidate();};
 const up=event=>{if(!gesture||event.pointerId!==gesture.pointerId)return;move(event);gesture.time=event.timeStamp;if(button(event)!==gesture.target)invalidate();};
 const cancel=event=>{if(gesture&&event.pointerId===gesture.pointerId)invalidate();};
 const click=event=>{
  if(!gesture||event.detail===0)return; // Keyboard and assistive activation.
  const last=gesture;gesture=undefined;
  if(event.timeStamp-last.time>1000)return;
  if(last.cancelled||button(event)!==last.target){event.preventDefault();event.stopImmediatePropagation();}
 };
 const listeners=[[menu,'pointerdown',down],[doc,'pointermove',move],[doc,'pointerup',up],[doc,'pointercancel',cancel],[menu,'click',click],[win,'resize',invalidate],[win,'orientationchange',invalidate],[win.visualViewport,'resize',invalidate],[win.visualViewport,'scroll',invalidate],[doc,'scroll',invalidate]];
 for(const [target,type,handler] of listeners)target?.addEventListener(type,handler,true);
 return ()=>{for(const [target,type,handler] of listeners)target?.removeEventListener(type,handler,true);gesture=undefined;};
}
