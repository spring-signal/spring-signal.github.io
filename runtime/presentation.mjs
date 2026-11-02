export function spriteLayout(scene,manifest,viewport){
 const width=Math.max(1,viewport.width),height=Math.max(1,viewport.height);
 // Dialogue overlays the stage. Fit actors to the viewport, not the small
 // empty area above the dialogue, and anchor their hips/feet to its bottom.
 const top=viewport.compact&&width<760&&height<340?40:height<620?48:78,available=Math.max(1,height-top);
 const frame=scene.frame==='medium-group'||(scene.cast?.length??0)===1&&scene.frame==='bust'?'bust':'full';
 const items=(scene.cast??[]).map(p=>{const a=manifest.assets[p.asset];const f=a.bustOnly?'bust':frame;const v=a[f]?.at(-1);if(!v)throw Error('이 화면 크기에 맞는 인물 이미지가 없습니다.');const source=a.visualBounds?.[f]??{x:0,y:0,width:1,height:1};const end=f==='bust'?Math.min(source.y+source.height,a.upperBodyCrop?.bottom??1):source.y+source.height;const bounds={...source,height:Math.max(.1,end-source.y)};return {person:p,asset:a,frame:f,aspect:v.width/v.height,bounds};});
 const count=items.length,slotWidth=(width*.9-Math.max(count-1,0)*16)/Math.max(count,1);
 const maxAspect=Math.max(.1,...items.map(i=>i.aspect*i.bounds.width/i.bounds.height));
 const figureHeight=Math.min(available*.98,slotWidth/maxAspect);
 return items.map((i,index)=>{const imageHeight=figureHeight/i.bounds.height,imageWidth=imageHeight*i.aspect;const x=count===1?width*.5:width*(.05+.9*(index+.5)/count);return {...i,height:imageHeight,width:imageWidth,bottom:-(1-i.bounds.y-i.bounds.height)*imageHeight,left:x-(i.bounds.x+i.bounds.width/2-.5)*imageWidth};});
}
export function shouldRotate(width,height,coarse){return Boolean(coarse&&width<height&&width<850);}
export function highQualityWidth(width,dpr,nativeWidth,quality,saveData,preferNative=false){return quality==='high'&&!saveData?Math.max(width,(preferNative?nativeWidth:Math.min(nativeWidth,768))/Math.max(1,Math.min(dpr||1,2))):width;}

export function responsiveScene(scene,manifest,viewport){if(viewport.compact&&scene.camera==='group'){const speaker=scene.cast?.find(p=>manifest.assets[p.asset]?.character===scene.speaker);if(speaker)return {...scene,cast:[speaker],frame:'bust',camera:'single'};}return scene;}
