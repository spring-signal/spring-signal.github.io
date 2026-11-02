import {artStates230} from './art-catalog-230.mjs?v=230';
import {artStates290} from './art-catalog-290.mjs?v=290';
import {artStates200} from './art-catalog-200.mjs?v=200';
import {storyArt170} from './art-catalog-170.mjs?v=200';
export function authoredEmotion170(node,line,outfits){
 if(node.artRevision!=='0.17.0'||!line.speaker||line.speaker==='narrator')return;
 const character=line.speaker==='player'?(node.cast?.length===1?node.cast[0]:null):line.speaker;
 if(!character)return;
 const id=node.id;
 let emotion;
 if(line.speaker==='player')emotion='listening';
 else if(/_COUPLE160_JEALOUS_/.test(id))emotion='jealous';
 else if(/_COUPLE160_EP\d$|_SEPARATE160$/.test(id))emotion='hesitant';
 else if(/_COUPLE160_(HEAR|MISSED)$|_OVERLAP160_(SEEN|TELL|OWN|DEFLECT)$/.test(id))emotion='heartbroken';
 else if(/_COUPLE160_ACTION0$/.test(id))emotion='listening';
 else if(/_REPAIR160_.*_HEAR$/.test(id))emotion='hesitant';
 else if(/_REPAIR160_.*_FIRST(?:_DONE)?$/.test(id))emotion='listening';
 const key=`char.${character}.${outfits[character]}.${emotion}`;
 return emotion&&(storyArt170.has(key)||artStates200.has(key)||artStates230.has(key)||artStates290.has(key))?emotion:undefined;
}
