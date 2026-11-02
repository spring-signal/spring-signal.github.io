export function interfaceLayout({height,hudBottom,dialogueHeight,dialogueBottom=16,planHeight=0}){
 const h=Math.max(180,Number(height)||390),bottom=Number.isFinite(hudBottom)?hudBottom:56;
 const hudSpace=Math.ceil(Math.max(44,Math.min(h*.36,bottom+8)));
 const dialogueSpace=Math.ceil(Math.max(80,Number(dialogueHeight)||120)+Math.max(0,Number(dialogueBottom)||0)+12);
 return {hudSpace,dialogueSpace,noticeTop:hudSpace+Math.max(0,Number(planHeight)||0)+6,choiceHeight:Math.max(36,h-hudSpace-dialogueSpace-8)};
}
