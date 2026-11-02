import {artStates230} from './art-catalog-230.mjs?v=230';
import {artStates290} from './art-catalog-290.mjs?v=290';
import {artStates200} from './art-catalog-200.mjs?v=200';
import {artStates190} from './art-catalog-190.mjs?v=200';
import {artStates180} from './art-catalog-180.mjs?v=200';
// A small explicit dialogue-direction list, not a broad '좋다' keyword rule.
// Tentative/conflict lines retain their authored expressions.
const friendly=[/^그 말 좋다\./,/^좋네\./,/^고마워(?:요)?[.!]/,/^반가워(?:요)?[.!]/,/^오늘은 .*좋았어(?:요)?\./];
const seoyeonDate290=new Set([
 '좋아요. 읽어 달라는 부탁이 없어도 같이 볼 건 있네요. 제가 가능한 시간도 먼저 확인할게요.',
 '그때는 창피했는데 지금 말하니까 좀 웃기네요. 다음에는 손을 조금 더 빨리 들어 볼래요.',
 '좋아요. 이번에는 제가 먼저 연락하고 기다릴게요.'
]);
export function authoredEmotion180(node,line,outfits){
 if(line.emotion||!line.speaker||['narrator','player'].includes(line.speaker))return;
 if(/하지만|서운|불편|상처|싫|걱정|부담/.test(line.text))return;
 if(/_REPAIR|_BOND|_CLOSE|_ROMANCE|_COUPLE|_SEPARATE|_OVERLAP|_ARC/.test(node.id))return;
 const id=`char.${line.speaker}.${outfits[line.speaker]}.happy`;
 const newlyCompletedBeat=id==='char.seoyeon.date.happy'&&artStates290.has(id)&&seoyeonDate290.has(line.text);
 if(!newlyCompletedBeat&&!friendly.some(pattern=>pattern.test(line.text)))return;
 return (artStates180.has(id)||artStates190.has(id)||artStates200.has(id)||artStates230.has(id)||artStates290.has(id))?'happy':undefined;
}
