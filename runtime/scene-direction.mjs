import {authoredActing220} from './acting-220.mjs?v=220';
import {authoredEmotion170} from './story-art-170.mjs?v=290';
import {authoredEmotion180} from './story-art-180.mjs?v=290';
// Visual choices depend on the story date, never on how many times it was drawn.
export const YUNA_WORK_UNIFORM='work_alt';
export function sceneOutfits(event,line={}){
 const outfits={...event.outfits,...line.outfits};
 const onDuty={...event.onDuty,...line.onDuty};
 const location=line.location??event.location;
 const cast=line.cast??event.cast??[];
 // Explicit off-duty scenes may use her own clothes even inside the cafe.
 if(cast.includes('yuna')&&(onDuty.yuna??(location==='cafe')))outfits.yuna=YUNA_WORK_UNIFORM;
 return outfits;
}
export const DAILY_OUTFITS={
 'story-w01-fri':{haerin:'stripe',jiwoo:'field',minseo:'research'},
 'story-w02-tue':{seoyeon:'lilac'},
 'story-w02-thu':{jiwoo:'field',haerin:'spring'},
 'story-w02-fri':{seoyeon:'lilac'},
 'story-w03-tue':{seoyeon:'date'},
 'story-w03-thu':{yuna:'work_alt'},
 'story-w03-fri':{haerin:'stripe',jiwoo:'date',minseo:'research'},
 'story-w04-tue':{yuna:'work_alt'},
 'story-w04-wed':{yuna:'work_alt'},
 'story-w04-sat':{seoyeon:'lilac',jiwoo:'field',haerin:'stripe',minseo:'date',yuna:'outing'}
};
export function storyPresentation(node,line){
 const result={outfits:sceneOutfits({...node,outfits:{...node.outfits,...(node.wardrobeRevision==='0.9.0'?{}:DAILY_OUTFITS[node.day])}},line),background:line.background??node.background,location:line.location??node.location,timeOfDay:line.timeOfDay??node.timeOfDay,pose:line.pose??'front'};
 if(result.background==='bg.home_night')result.timeOfDay='night';
 if(node.id==='W01_SAT'){
  const night=line.text.includes('저녁에 걷은 셔츠');result.background=night?'bg.home_night':'bg.home_day';result.timeOfDay=night?'night':'day';
 }
 const c=line.speaker,text=line.text;
 if(node.id==='W02_READ_B'&&c==='seoyeon')Object.assign(result,{acting:'flower',emotion:'happy',shot:'medium'});
 if(node.id==='W02_CAFE'&&c==='jiwoo'&&text.startsWith('오늘 다른'))Object.assign(result,{acting:'folded',emotion:'playful',shot:'medium'});
 if(node.id==='W03_FRI'&&c==='haerin')Object.assign(result,{acting:'flower',emotion:'playful',shot:'ensemble'});
 if(node.id==='W03_FRI'&&c==='minseo'&&text.startsWith('자리가 편해서'))Object.assign(result,{acting:'thinking',emotion:'curious',shot:'medium'});
 if(node.id==='W03_JOB'&&c==='yuna')Object.assign(result,{acting:'folded',emotion:'serious',shot:'medium'});
 const delicate=/표정이 잠깐 굳|웃음이 잠깐 멎|상처|속상|마음에 걸|불편|겁났|겁이 나|울컥|눈물이|말을 멈췄|서운|내가 실망|마음이 조급|조급해졌/.test(text);
 const authored=authoredEmotion170(node,line,result.outfits)??(!delicate&&!result.acting?authoredEmotion180(node,line,result.outfits):undefined);
 if(authored){result.emotion=authored;delete result.acting;result.gesture='';}
 else if(line.emotion==='serious'||delicate){result.emotion='serious';delete result.acting;result.gesture='';}
 const performance220=authoredActing220(node,line,result);
 if(performance220)result.performance220=performance220;
 return result;
}
export function performanceAsset(base,line,manifest){
 const valid=a=>a?.identityVersion===manifest.identityVersion&&a.character===base.character&&a.outfit===base.outfit;
 const gaze=line.gaze??'front';
 const candidate220=line.performance220&&manifest.assets[line.performance220];
 const sensitive=['serious','sad','worried','hurt','heartbroken','hesitant'];
 const compatible220=!sensitive.includes(line.emotion)||candidate220?.emotion===line.emotion||(line.emotion==='serious'&&['serious','sad','worried','hurt','heartbroken'].includes(candidate220?.emotion));
 if(candidate220&&valid(candidate220)&&candidate220.armFrame&&(candidate220.gaze??'front')===gaze&&compatible220&&(!line.posture||candidate220.posture===line.posture))return candidate220;
 const specific=line.performance200&&manifest.assets[line.performance200];if(specific&&valid(specific)&&(specific.gaze??'front')===gaze)return specific;
 const matches=a=>valid(a)&&(a.gaze??'front')===gaze;
 if(line.posture){const a=manifest.assets[`char.${base.character}.${base.outfit}.posture.${line.posture}.${line.emotion??'neutral'}`];if(matches(a)&&a.armFrame)return a;
  if(['happy','playful','warm','neutral',undefined].includes(line.emotion)){const calm=manifest.assets[`char.${base.character}.${base.outfit}.posture.${line.posture}.neutral`];if(matches(calm)&&calm.armFrame)return calm;}
 }
 if(line.acting&& !['serious','sad','worried'].includes(line.emotion)){const a=manifest.assets[`char.${base.character}.${base.outfit}.acting.${line.acting}`];if(matches(a)&&a.armFrame)return a;}
 if(line.emotion){const a=manifest.assets[`char.${base.character}.${base.outfit}.${line.emotion}`+(gaze==='front'?'':'.'+gaze)];if(matches(a)&&a.armFrame)return a;}
 const angle=manifest.assets[`char.${base.character}.${base.outfit}.pose.${gaze}`];
 if(matches(angle))return angle;
 if(gaze!=='front')throw Error('상대 방향을 바라보는 같은 의상 이미지가 없습니다: '+base.character+'/'+base.outfit+'/'+gaze);
 return base;
}
