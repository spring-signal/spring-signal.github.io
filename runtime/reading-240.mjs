const names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서',doa:'도아',minjun:'민준',player:'나',narrator:'나'};
const thoughts=new Set([
 '행정 처리는 그것으로 끝났다. 돌아오는 일도 그만큼 간단했으면 좋았을 텐데.',
 '빈 시간을 뒤처짐으로 느껴 아무 약속이나 받아들이곤 했다. 이번에도 그러다 보면 한 학기가 갈까.',
 '내일 나는 학교에 돌아간다. 아직은, 그 뒤에 붙일 말을 모르겠다.',
 '한 학기를 잘 보내겠다는 계획은 아직 막연했다. 우선 내일 첫 수업에 늦지 않는 것부터 해 보기로 했다.'
]);
const unquote=s=>/^[“"].*[”"]$/s.test(s)?s.slice(1,-1):null;
export function readingKind240(event,line,world){
 if(line.reading240)return line.reading240;
 const text=line.text??'',quote=unquote(text);
 if(line.speaker==='narrator'){
  const message=quote!==null&&world?.messages?.find(m=>m.source===event.id&&m.text===quote);
  if(message)return {kind:'message',label:message.direction==='out'?'보낸 문자':'받은 문자',speaker:message.direction==='out'?'player':message.character,partner:message.character};
  if(line.textMode==='thought'||thoughts.has(text))return {kind:'thought',label:'속마음',speaker:'player'};
  return {kind:'narration',label:/[“”]/.test(text)?'장면 설명 · 인용 대화':'장면 설명',speaker:'narrator'};
 }
 if(line.speaker==='player'&&/^나는 .*고 (?:말했다|답했다|물었다)\.?$/s.test(text))return {kind:'recount',label:'내가 건넨 말 · 서술',speaker:'player'};
 return {kind:'speech',label:line.speaker==='player'?'내가 한 말':'대화',speaker:line.speaker};
}
export function readingView240(step,playerName=''){
 const info=readingKind240(step.event,step.line,step.world);
 const who=info.speaker==='narrator'?'내 시점':info.speaker==='player'?(playerName||'나'):(names[info.speaker]??info.speaker);
 const label=info.kind==='message'?info.label+' · '+names[info.partner]+(info.speaker==='player'?'에게':'에게서'):info.label;
 let text=step.line.text??'';
 if(info.kind==='message')text=unquote(text)??text;
 if(info.kind==='speech'&&unquote(text)===null)text='“'+text+'”';
 if(text.length>110){const sentences=text.split(/(?<=[.!?])\s+/);text=sentences.map((s,i)=>s+(i<sentences.length-1?(i%2?'\n\n':' '):'')).join('');}
 return {...info,label,who,text};
}
export function storySeries240(event){
 const doa280=event.id.match(/^R280_DOA\d+_(?:main|extra)_[01]_(?:tue|thu|fri)_ARC([1-4])/);if(doa280)return {character:'doa',number:+doa280[1],label:'도아 이야기 '+doa280[1]};
 const owner=event.id.match(/^PLAN\d+_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_/);if(!owner)return null;
 const c=owner[1],arc=event.id.match(/_ARC(\d+)(?:_|$)/),couple=event.id.match(/_COUPLE160_EP([012])(?:_|$)/),goal=event.id.match(/_GOAL200_([012])(?:_|$)/);
 const stage=arc?{number:+arc[1],title:'이야기'}:couple?{number:+couple[1]+1,title:'연인 이야기'}:goal?{number:+goal[1]+1,title:'나의 다음 일'}:null;
 return stage?{character:c,number:stage.number,label:names[c]+' '+stage.title+' '+stage.number}:null;
}
export function choiceReading240(event,choice,world,resolve){
 if(!['continue','couple160','goal200'].includes(choice.id))return choice.label;
 const target=resolve(choice.next,world),series=target&&storySeries240({id:target});
 return series?choice.label+' · '+series.label+' 이어서':choice.label;
}
