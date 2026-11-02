import {eveningPeople170} from '../runtime/art-catalog-170.mjs?v=200';
const names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서',doa:'도아'};
const closer={'bg.campus_summer':'bg.campus_talk170','bg.library_day':'bg.library_talk170','bg.club_day':'bg.club_talk170'};
export function addVisuals170(base){
 const nodes=base.nodes.map(n=>{
  const fire=n.id.match(/^FIRE22_(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);
  if(fire&&eveningPeople170.has(fire[1])){
   const c=fire[1];
   return {...n,artRevision:'0.17.0',outfits:{...n.outfits,[c]:'evening170'},lines:n.lines.map(l=>({...l,...(l.speaker==='narrator'&&l.text.includes('정한 자리에서 만났다.')?{text:names[c]+(['seoyeon','haerin'].includes(c)?'은':'는')+' 저녁 외출에 맞춰 옷을 갈아입고 나왔다고 말했다. '+l.text}:{}),clothingChanges:{...l.clothingChanges,[c]:true}}))};
  }
  if(/_COUPLE160_|_OVERLAP160_|_SEPARATE160|_REPAIR160_/.test(n.id))return {...n,artRevision:'0.17.0',background:closer[n.background]??n.background};
  return n;
 });
 return {...base,nodes,artRevision:'0.17.0'};
}
