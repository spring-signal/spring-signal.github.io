const clone=v=>JSON.parse(JSON.stringify(v));
export function upgradeReview310(saved,nodes){
 if(saved.reviewRevision===31)return saved;
 const next=clone(saved),hasAlternative=next.decisions.some(d=>d.nodeId==='R280_INBOX4_B'&&d.choiceId==='another');
 if(hasAlternative&&(next.nodeId==='CHERRY04'||next.nodeId.startsWith('R300_ALTERNATE4_B')||next.decisions.some(d=>d.nodeId==='CHERRY04')))next.legacyFestival310=true;
 // An old save may be inside the phantom lunch that ran after an explicit decline.
 const lunch=next.nodeId.match(/R280_LUNCH(\d+)_/);
 if(lunch){const appointment='conversation280-w'+lunch[1],proposal=[...next.decisions].reverse().find(d=>nodes.get(d.nodeId)?.effects?.some(e=>e.type==='appointment'&&e.id===appointment));
  if(proposal?.choiceId==='later'){const gate=nodes.get('R280_LUNCH'+lunch[1]);next.nodeId=gate.next.find(b=>!b.when).node;next.lineIndex=0;next.decisions=next.decisions.filter(d=>!d.nodeId.includes('R280_LUNCH'+lunch[1]+'_'));next.repair310='declined-lunch';}
 }
 next.reviewRevision=31;return next;
}
export function legacyNode310(node,saved){
 if(!saved.legacyFestival310)return node;
 if(node.id==='R280_NPC4_B_GATE')return {...node,next:node.next.map(b=>b.when?b:{node:'R300_ALTERNATE4_B'})};
 if(/^CHERRY_INVITE_/.test(node.id))return {...node,next:node.id.replace('INVITE','MEET')};
 return node;
}
export const EVENING_BACKGROUNDS310={
 'bg.cafe_day':'bg.cafe_evening310','bg.cafe_summer180':'bg.cafe_evening310',
 'bg.campus_day':'bg.campus_evening310','bg.campus_summer':'bg.campus_evening310','bg.campus_talk170':'bg.campus_evening310',
 'bg.market_day':'bg.market_evening310','bg.bookshop_day':'bg.bookshop_evening310','bg.city_gallery_day':'bg.city_gallery_evening310'
};
export function eveningBackground310(background,time,manifest){const id=time==='evening'?EVENING_BACKGROUNDS310[background]:null;return id&&manifest.assets[id]?id:background;}
