import {has,all,any,not} from './everyday-tools.mjs?v=200';
// Preserve historical choice replay and all effects; offer a short farewell today.
export function repairShortGoodbye190(base){
 return {...base,nodes:base.nodes.map(original=>{
  if(!/^PLAN\d+_yuna_late(?:main|extra)[01]_(?:tue|thu|fri|sat)_DONE_(FEEL|CLOSENESS)$/.test(original.id))return original;
  const short=all(has('depth140Episode_yuna',1),has('depth140Style_yuna','b'),has('depth140Day_yuna',original.day));
  return {...original,lines:[...original.lines.map((l,i)=>({...l,source180:l.source180??i,when:all(l.when,not(short))})),{speaker:'narrator',stageCast:[],text:'짧게 만나기로 한 답을 그대로 두고 인사했다. 돌아가 쉬고 나서 다음에 이어 이야기할 수 있으면 좋겠다고 말했다.',source180:0,when:short}],choices:original.choices?.map(ch=>ch.id==='leave'?ch:{...ch,hideWhen:ch.hideWhen?any(ch.hideWhen,short):short})};
 })};
}
