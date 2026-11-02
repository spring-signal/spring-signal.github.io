// Presence and camera framing are different: a person can be nearby off camera.
// Reviewed cuts use actual story beats, never a count or a text-name heuristic.
export const STAGED_BEATS=[
 ['W01_FRI','모임 십 분 전에',[]],
 ['W01_FRI','문 앞에서 원고철',['seoyeon']],
 ['W01_FRI','해린은 테이프',['haerin','jiwoo']],
 ['W01_FRI','나만 길을',['seoyeon']],
 ['W01_FRI','글 쓰세요?',['seoyeon']],
 ['C01','이번 학기에',['seoyeon','jiwoo','haerin']],
 ['C01','그럼 마지막에',['jiwoo','seoyeon']],
 ['C01','늦게 온 민서는',['minseo']],
 ['W02_CAFE','주문을 마치고',['jiwoo','haerin']],
 ['W02_CAFE','결국 지우는',['jiwoo','haerin']],
 ['W03_FRI','둘 다면요?',['minseo']],
 ['W03_FRI','해린이 충전기를',['haerin']],
 ['W03_FRI','다음 주 벚꽃',[]],
 ['W04_CAFE','유나는 새 주문을',[]],
 ['J01_STUDY','나는 벤치에서',[]],
 ['H_CONTACT_LATER','해린과는 각자',[]],
 ['EVENT_CLUB_MT_W05','토요일 저녁',[]],
 ['EVENT_CLUB_MT_W05','서연은 의외로',['seoyeon']],
 ['EVENT_CLUB_MT_W05','해린은 다음',['haerin']],
 ['EVENT_CLUB_MT_W05','지우는 규칙을',['jiwoo','seoyeon']],
 ['EVENT_CLUB_MT_W05','민서는 시간을',[]],
 ['EVENT_CLUB_MT_W05','해린과 지우는',['seoyeon']],
 ['EVENT_CAMPUS_FESTIVAL_W11','지우가 노트북을',['jiwoo','haerin']],
 ['EVENT_CAMPUS_FESTIVAL_W11','영상이 끝난',['seoyeon','haerin']],
 ['NEWCOMER_SEMINAR_W15','선배가 다음',[]],
 ['NEWCOMER_SEMINAR_W15','도아 선배와는',[]],
 ['NEWCOMER_SEMINAR_W15','잘못 짚었다고',[]],
 ['EVENT_SUMMER_MT_W19','물놀이를 마치고',[]],
 ['EVENT_SUMMER_MT_W19','지우와 민서가',['jiwoo','minseo']],
 ['EVENT_SUMMER_MT_W19','지우, 해린, 민서와',[]],
 ['EVENT_SUMMER_MT_W19','짧게 한 바퀴를',[]],
 ['EVENT_SUMMER_MT_W19','서연이 쿠션을',[]],
 ['EVENT_SUMMER_MT_W19','민서는 잠깐',[]],
 ['EVENT_SUMMER_MT_W19','해린이 간식을',['haerin']],
 ['EVENT_SUMMER_MT_W19','해린을 배웅하고',[]],
 ['EVENT_SUMMER_MT_W19','잠시 뒤 해린이',['haerin']],
 ['EVENT_FIREWORKS_W22','해가 지기 전부터',[]],
 ['EVENT_FIREWORKS_W22','해린이 반기고',['haerin','jiwoo']],
 ['EVENT_FIREWORKS_W22','해가 지고 첫',[]],
 ['EVENT_FIREWORKS_W22','서연과 민서는',[]],
 ['EVENT_FIREWORKS_W22','첫 불꽃이',[]],
 ['EVENT_FIREWORKS_W22','유나가 메뉴를',['yuna','haerin']],
 ['EVENT_FIREWORKS_W22','밤하늘에 불꽃이',[]],
 ['EXHIBITION_W24','의자가 두 개',[]],
 ['EXHIBITION_W24','처음 여운에',[]],
 ['EXHIBITION_W24','벽에는 해린의',['haerin']],
 ['EXHIBITION_W24','서연은 원고를',['seoyeon','jiwoo','minseo']],
 ['EXHIBITION_W24','박수는 예상보다',[]],
 ['EXHIBITION_W24','상영과 낭독이',[]],
 ['EXHIBITION_W24','다음 학기도',[]],
 ['EXHIBITION_W24','지금도 거창한',[]]
];
export function sceneStaging(event,line,present){
 const authored=line.stageCast??STAGED_BEATS.find(([id,prefix])=>id===event.id&&line.text?.startsWith(prefix))?.[2];
 if(authored!==undefined){
  if(!Array.isArray(authored)||new Set(authored).size!==authored.length||authored.some(c=>!present.includes(c)))throw Error('현재 장소에 있는 인물만 화면에 배치할 수 있습니다.');
  if(present.includes(line.speaker)&&!authored.includes(line.speaker))throw Error('대화 중인 화자를 화면 배치에서 뺄 수 없습니다.');
  if(authored.length>3&&!(line.shot==='wide'&&line.stagingReason?.trim()))throw Error('네 명 이상은 근거가 있는 단체 장면으로 명시해야 합니다.');
  return {stageCast:[...authored],authored:true};
 }
 if(present.includes(line.speaker))return {};
 // Multi-person narration, time changes and offscreen speech do not summon
 // every attendee. Single-person conversations retain their existing framing.
 return {stageCast:present.length>1?[]:[...present],authored:false};
}
