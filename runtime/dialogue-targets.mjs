// Reviewed addressees. Keep this separate from saved dialogue indices.
// Everything else spoken by a visible character addresses the player/group.
export const DIALOGUE_TARGETS=[
 ['W02_CAFE','jiwoo','달고 차갑고','yuna'],
 ['W02_CAFE','yuna','메뉴판에','jiwoo'],
 ['W02_CAFE','haerin','매번 그 조건','jiwoo'],
 ['W02_CAFE','jiwoo','오늘 다른','haerin'],
 ['W03_FRI','haerin','너만 필요한','jiwoo'],
 ['EVENT_CLUB_MT_W05','haerin','네가 사 온','jiwoo'],
 ['EVENT_CLUB_MT_W05','jiwoo','망이 작아','haerin'],
 ['EVENT_CLUB_MT_W05','haerin','언니 근무 중','minseo'],
 ['EVENT_CLUB_MT_W05','jiwoo','그 긴 준비','seoyeon'],
 ['EVENT_CAMPUS_FESTIVAL_W11','haerin','잠깐. 이거','jiwoo'],
 ['EVENT_CAMPUS_FESTIVAL_W11','jiwoo','화면 켜야','haerin'],
 ['EVENT_CAMPUS_FESTIVAL_W11','haerin','붙일 벽부터','jiwoo'],
 ['EVENT_SUMMER_MT_W19','haerin','이번엔 양파','jiwoo'],
 ['EVENT_SUMMER_MT_W19','jiwoo','그 얘기 여름','haerin'],
 ['EVENT_SUMMER_MT_W19','seoyeon','언니, 봄 MT','yuna'],
 ['EVENT_SUMMER_MT_W19','yuna','이번 건 적당하네','jiwoo'],
 ['EVENT_SUMMER_MT_W19','jiwoo','이걸로 인정','yuna'],
 ['EVENT_SUMMER_MT_W19','yuna','언니, 여행','minseo'],
 ['EVENT_SUMMER_MT_W19','minseo','유나가 그 말','yuna'],
 ['EVENT_FIREWORKS_W22','haerin','그 말 증인','jiwoo'],
 ['EVENT_FIREWORKS_W22','seoyeon','조금 멀어도','minseo'],
 ['EVENT_FIREWORKS_W22','minseo','위쪽은 나갈 때도','seoyeon']
];
export function dialogueTarget(event,line){
 if(line.to!==undefined)return line.to;
 return DIALOGUE_TARGETS.find(([id,speaker,prefix])=>id===event.id&&speaker===line.speaker&&line.text?.startsWith(prefix))?.[3]??'player';
}
