// A week is a wardrobe decision, independent of draw count or route order.
export const WEEKLY_LOOKS={
 seoyeon:['spring','lilac','date','w04','w05','w06','w07','w08'],
 jiwoo:['spring','field','date','w04','w05','w06','w07','w08'],
 haerin:['spring','stripe','w03','w04','w05','w06','w07','w08'],
 minseo:['spring','research','date','w04','w05','w06','w07','w08'],
 yuna:['spring','w02','w03','outing','w05','w06','w07','w08']
};
export const MT_PEOPLE=['seoyeon','jiwoo','haerin','minseo'];
const lateMain=['mid130a','mid130b','mid130c','mid130d','mid130b','mid130a','mid130c','mid130d'];
export function weeklyLooks(week){if(week>=9&&week<=24){const outfit=week>=17?'summer130'+'abcdefgh'[week-17]:lateMain[week-9];return Object.fromEntries(['seoyeon','jiwoo','haerin','yuna','minseo',...(week>=15?['doa']:[])].map(c=>[c,c==='doa'&&week===15?'mid130a':c==='doa'&&week===16?'mid130b':outfit]));}return week>=1&&week<=8?Object.fromEntries(Object.entries(WEEKLY_LOOKS).map(([c,looks])=>[c,looks[week-1]])):{};}
export function wardrobeFor(node){const looks=weeklyLooks(node.week);return Object.fromEntries((node.cast??[]).map(c=>[c,node.wardrobeContext==='lounge'&&MT_PEOPLE.includes(c)?'lounge':looks[c]??node.outfits[c]]));}
