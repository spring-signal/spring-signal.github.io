import {topicIndex320,legacyNode320,topicChoice320,topicNode320} from './topic-320.mjs?v=320';
import {upgradeReview310,legacyNode310} from './review-310.mjs?v=310';
import {readingKind240,choiceReading240} from './reading-240.mjs?v=280';
import {venueEffect240,venueLine240,venuePresentation240,venueChoice240} from './meeting-venues-240.mjs?v=310';
import {conversationLine260,conversationChoice260,endingClosingIndex260} from './conversation-260.mjs?v=260';
import {storyPresentation} from './scene-direction.mjs?v=290';
import {messageText280,messageLine280} from '../story/messages-280.mjs?v=280';
import {slotAvailable300,dayNumber300,media300} from './continuity-300.mjs?v=310';
export const STORY_SCHEMA='spring-signal-story-1';
export const STORY_VERSION='0.6.0';
export const TARGETS=['haerin','seoyeon','jiwoo','yuna','minseo','doa'];
const nodeMapCache=new WeakMap();
const clone=value=>JSON.parse(JSON.stringify(value));
const clamp=n=>Math.min(100,Math.max(0,n));

export function condition(rule,world){
 if(!rule)return true;
 if(rule.topic320)return topicIndex320(world,rule.topic320.character)===rule.topic320.index;
 if(rule.slotFree300)return slotAvailable300(world,rule.slotFree300);
 if(rule.dayAfterFlag300)return dayNumber300(rule.dayAfterFlag300.day)>dayNumber300(world.flags[rule.dayAfterFlag300.flag])&&dayNumber300(world.flags[rule.dayAfterFlag300.flag])>=0;
 if(rule.dateCount300)return (world.people[rule.dateCount300.character]?.dateCount??0)>=rule.dateCount300.min;
 if(rule.contactAnniversary300){const r=rule.contactAnniversary300;return world.contactWeeks300?.[r.character]?.week!==undefined&&r.week-world.contactWeeks300[r.character].week===r.weeks;}
 if(rule.moneyAtLeast!==undefined)return world.money>=rule.moneyAtLeast;
 if(rule.slotFree280){const {week,day,start,end}=rule.slotFree280,minutes=t=>{const m=String(t).match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:null;},from=minutes(start),to=minutes(end);return !Object.values(world.appointments).some(a=>{if(a.week!==week||a.day!==day||!['confirmed','completed'].includes(a.status))return false;const at=minutes(a.time),until=minutes(a.endTime??String(a.time).split('~')[1])??(at===null?null:at+90);return at!==null&&until!==null&&at<to&&until>from;});}
 if(rule.all)return rule.all.every(r=>condition(r,world));
 if(rule.any)return rule.any.some(r=>condition(r,world));
 if(rule.not)return !condition(rule.not,world);
 if(rule.flag)return rule.value===undefined?Boolean(world.flags[rule.flag]):world.flags[rule.flag]===rule.value;
 if(rule.contact)return world.contacts[rule.contact]?.scope===(rule.scope??'personal');
 if(rule.met)return Boolean(world.people[rule.met]?.met);
 if(rule.appointment)return world.appointments[rule.appointment]?.status===rule.status;
 if(rule.experience)return world.experiences.includes(rule.experience);
 if(rule.meetingSince){
  const {person,afterFlag}=rule.meetingSince,start=String(world.flags[afterFlag]??'').match(/^story-w(\d+)-(mon|tue|wed|thu|fri|sat|sun)$/);
  if(!start)return false;const days=['mon','tue','wed','thu','fri','sat','sun'],after=Number(start[1])*7+days.indexOf(start[2]);
  return Object.values(world.appointments).some(a=>a.character===person&&a.status==='completed'&&Number(a.week)*7+days.indexOf(a.day)>after);
 }
 if(rule.affection)return world.people[rule.affection].affection>=(rule.min??0);
 if(rule.trust)return world.people[rule.trust].trust>=(rule.min??0);
 return false;
}
function initialWorld(){return {money:500000,flags:{},contacts:{},messages:[],appointments:{},experiences:[],people:Object.fromEntries(TARGETS.map(c=>[c,{met:false,affection:c==='haerin'?8:0,trust:0,status:'unmet',dateCount:0,meetings:[]}]))};}
function applyEffects(world,effects=[],source){
 for(const originalEffect of effects){
  const effect=venueEffect240(originalEffect,source,world);
  if(!condition(effect.when,world))continue;
  const c=effect.character,p=world.people[c];
  switch(effect.type){
   case 'flag':world.flags[effect.key]=effect.value??true;break;
   case 'meet':if(!p)throw Error('알 수 없는 인물');p.met=true;if(p.status==='unmet')p.status=c==='haerin'?'friend':'acquaintance';break;
   case 'relation':if(!p?.met)throw Error('만나지 않은 인물과의 관계');p.affection=clamp(p.affection+(effect.affection??0));p.trust=clamp(p.trust+(effect.trust??0));break;
   case 'contact':if(!p?.met)throw Error('대면 전 연락처 교환');world.contacts[c]={scope:effect.scope??'personal',source};if(world.contactWeeks300&&!world.contactWeeks300[c])world.contactWeeks300[c]={...world.nodeDate300};break;
   case 'money':if(world.money+effect.amount<0)throw Error('생활비가 부족합니다.');world.money+=effect.amount;break;
   case 'experience':if(!world.experiences.includes(effect.id))world.experiences.push(effect.id);break;
   case 'message':{
    if(world.messages.some(m=>m.id===effect.id))break;
    if(c==='group'?!world.flags.groupJoined:world.contacts[c]?.scope!=='personal')throw Error('허락되지 않은 개인 연락입니다.');
    world.messages.push({id:effect.id,character:c,text:world.campaign280?messageText280(effect,world,source):effect.text,...(world.campaign280?{originalText280:effect.text}:{}),direction:effect.direction??'in',label:effect.label??'',source,...(world.contactWeeks300&&media300(effect.media)?{media:media300(effect.media)}:{})});break;
   }
   case 'appointment':{
    const old=world.appointments[effect.id],status=effect.status;
    const transitions={pending:['alternative','confirmed','declined','deferred'],alternative:['confirmed','declined','deferred'],confirmed:['cancelled','completed'],cancelled:[],completed:[],declined:[],deferred:[]};
    if(old&&old.status!==status&&!transitions[old.status]?.includes(status))throw Error('약속 상태의 순서가 맞지 않습니다.');
    if(!old&&status!=='pending'&&status!=='confirmed')throw Error('제안하지 않은 약속입니다.');
    world.appointments[effect.id]={...old,...effect,source};break;
   }
   case 'date':if(!p?.met)throw Error('만남 기록이 없습니다.');if(!world.experiences.includes(effect.id)){world.experiences.push(effect.id);p.dateCount++;}break;
   default:throw Error('알 수 없는 이야기 효과: '+effect.type);
  }
 }
}
function nextId(next,world){if(typeof next==='string')return next;const match=next?.find(branch=>condition(branch.when,world));return match?.node;}

// Save only decisions and the current position. Relationships, messages and money
// are rebuilt from that reachable path instead of trusting imported counters.
export class StoryReader{
 constructor(story,manifest,saved){
  this.story=story;this.manifest=manifest;this.nodes=nodeMapCache.get(story);if(!this.nodes){this.nodes=new Map(story.nodes.map(n=>[n.id,n]));nodeMapCache.set(story,this.nodes);}
  this.state={schema:STORY_SCHEMA,version:STORY_VERSION,narrativeRevision:story.narrativeRevision,identityVersion:manifest.identityVersion,playerName:'',nodeId:story.start,lineIndex:0,decisions:[],readMessages:[],notifiedMessages:[],tutorialSeen:[],...(story.presentation280?{skipped280:[],legacyNext280:{}}:{}),...(story.presentation300?{skipped300:[]}:{}),...(story.reviewRevision?{reviewRevision:story.reviewRevision}:{}),...(story.presentation320?{legacy320:[]}:{})};
  if(saved)this.restore(saved);else this.inspect();
 }
 get isStory(){return true;}
 export(){return clone(this.state);}
 inspect(){
  const cacheKey=JSON.stringify(this.state);if(this.cachedView?.key===cacheKey)return this.cachedView.value;
  const saved=this.state,world=initialWorld(),visited=[],transcript=[];if(this.story.presentation280)world.campaign280=true;if(this.story.presentation300)world.contactWeeks300={};let id=this.story.start,decisionIndex=0;
  for(let guard=0;guard<12000;guard++){
   let node=this.nodes.get(id);if(node)node=legacyNode320(legacyNode310(node,saved),saved);if(!node)throw Error('이야기 장면을 찾을 수 없습니다: '+id);
   if(saved.skipped300?.includes(id)||this.migrating300&&id.startsWith('R300_')){this.migrationSkipped300?.add(id);id=node.migrationNext300;continue;}
   if(saved.skipped280?.includes(id)){id=node.migrationNext280;continue;}
   if(saved.legacyNext280?.[id])node={...node,next:saved.legacyNext280[id]};
   if(!condition(node.when,world)){id=nextId(node.next,world);continue;}
   if(visited.includes(id))throw Error('이야기가 같은 장면을 반복합니다.');visited.push(id);
   if(this.story.presentation300)world.nodeDate300={week:node.week,day:node.weekday};applyEffects(world,node.effects,id);node=topicNode320(node,world);
   const endingIndex=this.story.presentation260?endingClosingIndex260(node,world,condition):-1;
   const lines=node.lines.map((line,index)=>{
    const shown=venueLine240(node,line,index,world);
    const conversation=this.story.presentation260?conversationLine260(node,shown,index,world,saved.decisions,endingIndex):shown;
    return this.story.presentation280?messageLine280(node,conversation,world):conversation;
   }).filter(line=>condition(line.when,world));
   const seenLines=id===saved.nodeId?lines.slice(0,saved.lineIndex+1):lines;
   const seenCast=new Set(seenLines.flatMap(line=>line.cast??node.cast??[]));
   for(const c of seenCast){const p=world.people[c],encounter=node.encounterId??`${node.day}/${venuePresentation240(node,{},world)?.location??node.location}`;if(p?.met&&!p.meetings.includes(encounter))p.meetings.push(encounter);}
   const choices=(node.choices??[]).filter(choice=>condition(choice.when,world)&&(id!==saved.nodeId||this.migrating280||this.migrating300||(!choice.replayOnly&&(!choice.hideWhen||!condition(choice.hideWhen,world)))));
   if(id===saved.nodeId){
    if(decisionIndex!==saved.decisions.length||saved.lineIndex>lines.length||(!lines.length&&!choices.length&&!node.terminal))throw Error('이어읽기 위치가 올바르지 않습니다.');
    for(const key of ['readMessages','notifiedMessages'])if(saved[key].some(mid=>!world.messages.some(m=>m.id===mid&&m.direction==='in')))throw Error('수신하지 않은 문자 기록입니다.');
    const kind=saved.lineIndex<lines.length?'dialogue':choices.length?'choices':'end';
    const line=lines[Math.min(saved.lineIndex,lines.length-1)]??{speaker:'narrator',text:''};
    const result={world,node,lines,choices,kind,line,visited,transcript};this.cachedView={key:cacheKey,value:result};return result;
   }
   for(const line of lines)transcript.push({speaker:line.speaker,text:line.text,chapter:node.label,nodeId:node.id,reading240:readingKind240(node,line,world)});
   if(choices.length){
    const selection=saved.decisions[decisionIndex++];
    const chosen=selection?.nodeId===id?choices.find(c=>c.id===selection.choiceId):undefined;
    if(!chosen)throw Error('선택하지 않은 분기를 건너뛸 수 없습니다.');
    applyEffects(world,chosen.effects,id+'/'+chosen.id);applyEffects(world,node.exitEffects,id+'/done');id=nextId(chosen.next??node.next,world);
   }else{if(node.terminal)throw Error('이야기의 끝을 넘었습니다.');applyEffects(world,node.exitEffects,id+'/done');id=nextId(node.next,world);}
  }
  throw Error('이야기 연결이 너무 깁니다.');
 }
 get world(){return this.inspect().world;}
 get event(){return this.current().event;}
 current(){
  const {node,lines,choices,kind,line,world}=this.inspect();
  const shown=line.cast??node.cast??[];
  const presentation={...storyPresentation(node,line),...venuePresentation240(node,line,world)};
  const displayChoices=choices.map(ch=>{let choice=topicChoice320(node,venueChoice240(node,ch,world),world);if(this.story.presentation260)choice=conversationChoice260(node,choice,world);return {...choice,label:choiceReading240(node,choice,world,nextId)};});
  const event={...node,campaignLastWeek:this.story.maxWeek??8,outfits:presentation.outfits,background:presentation.background,location:presentation.location,body:lines,choices:displayChoices,assumption:'선택과 실제 경험에 따라 이어지는 본편이야.'};
  const imageLine={...line,cast:shown,...presentation};
  const replace=text=>text.replaceAll('{name}',this.state.playerName||'나');
  return {kind,event,line:{...line,text:replace(line.text),reading240:readingKind240(node,line,world)},imageLine,index:this.state.lineIndex,world};
 }
 move(next,world){let id=nextId(next,world);for(let i=0;i<12000;i++){const original=this.nodes.get(id),n=original&&legacyNode320(legacyNode310(original,this.state),this.state);if(!n)throw Error('다음 장면이 없습니다.');if(this.state.skipped300?.includes(id)||this.migrating300&&id.startsWith('R300_')){this.migrationSkipped300?.add(id);id=n.migrationNext300;continue;}if(this.state.skipped280?.includes(id)){id=n.migrationNext280;continue;}if(condition(n.when,world)){this.state.nodeId=id;this.state.lineIndex=0;return;}id=nextId(n.next,world);}throw Error('장면 순환');}
 next(){const view=this.inspect();if(view.kind!=='dialogue')return this.current();if(this.state.lineIndex+1<view.lines.length||view.choices.length||view.node.terminal)this.state.lineIndex++;else{const world=clone(view.world);applyEffects(world,view.node.exitEffects,view.node.id+'/done');this.move(view.node.next,world);}return this.current();}
 choose(id){const view=this.inspect();if(view.kind!=='choices')throw Error('선택할 때가 아닙니다.');const selected=view.choices.find(c=>c.id===id);if(!selected)throw Error('선택할 수 없는 대답입니다.');const world=clone(view.world);applyEffects(world,selected.effects,view.node.id+'/'+id);applyEffects(world,view.node.exitEffects,view.node.id+'/done');this.state.decisions.push({nodeId:view.node.id,choiceId:id});this.move(selected.next??view.node.next,world);return this.current();}
 previous(){return this.current();}
 readMessage(id){if(!this.world.messages.some(m=>m.id===id&&m.direction==='in'))throw Error('문자가 없습니다.');if(!this.state.readMessages.includes(id))this.state.readMessages.push(id);this.acknowledge(id);}
 acknowledge(id){if(!this.world.messages.some(m=>m.id===id&&m.direction==='in'))throw Error('문자가 없습니다.');if(!this.state.notifiedMessages.includes(id))this.state.notifiedMessages.push(id);}
 tutorialDone(id){if(!this.state.tutorialSeen.includes(id))this.state.tutorialSeen.push(id);}
 log(){const view=this.inspect();return [...view.transcript,...view.lines.slice(0,this.state.lineIndex+1).map(l=>({...l,chapter:view.node.label,nodeId:view.node.id,reading240:readingKind240(view.node,l,view.world)}))];}
 restore(saved){
  if(saved?.playthroughId330!==undefined&&(typeof saved.playthroughId330!=='string'||!/^[a-zA-Z0-9-]{8,80}$/.test(saved.playthroughId330)))throw Error('플레이 기록 구분을 확인해 줘.');
  if(saved?.legacy320&&(!this.story.presentation320||!Array.isArray(saved.legacy320)||saved.legacy320.length>6000||saved.legacy320.some(id=>!this.nodes.get(id)?.legacy320)))throw Error('이전 일상 기록이 올바르지 않습니다.');
  if(this.story.reviewRevision===31&&saved?.narrativeRevision===this.story.narrativeRevision)saved=upgradeReview310(saved,this.nodes);
  if(saved?.legacyFestival310&&(!saved.decisions?.some(d=>d.nodeId==='R280_INBOX4_B'&&d.choiceId==='another')||saved.legacyFestival310!==true))throw Error('이전 축제 일정 기록이 올바르지 않습니다.');
  if(this.story.narrativeRevision==='0.7.0'&&saved?.schema===STORY_SCHEMA&&saved.narrativeRevision==='0.6.6'){
   saved=clone(saved);
   if(saved.nodeId==='CHAPTER_END'&&saved.lineIndex===3){saved.nodeId='SUN04';saved.lineIndex=0;}
   saved.narrativeRevision=this.story.narrativeRevision;
  }
  if(this.story.narrativeRevision==='0.7.0'&&saved?.schema===STORY_SCHEMA&&!saved.narrativeRevision){
   saved=clone(saved);
   // The old group festival has different decisions and cannot resume midway.
   // Keep all preceding decisions and replay only the revised invitation onward.
   if(['CHERRY04','CHERRY_PHOTO','CHERRY_SNACK','CHERRY_QUIET','CHERRY_AFTER','CHAPTER_END'].includes(saved.nodeId)){
    saved.nodeId='CHERRY04';saved.lineIndex=0;
    saved.decisions=saved.decisions?.filter(d=>d.nodeId!=='CHERRY04');
    saved.readMessages=saved.readMessages?.filter(id=>id!=='group-cherry-photos');
    saved.notifiedMessages=saved.notifiedMessages?.filter(id=>id!=='group-cherry-photos');
   }
   saved.narrativeRevision=this.story.narrativeRevision;
  }
  if(saved?.narrativeRevision!==this.story.narrativeRevision)throw Error('현재 이야기 개정과 맞지 않는 저장 파일입니다.');
  if(saved.skipped300&&(!this.story.presentation300||!Array.isArray(saved.skipped300)||saved.skipped300.length>6000||saved.skipped300.some(id=>typeof id!=='string'||!id.startsWith('R300_')||!this.nodes.get(id)?.migrationNext300)))throw Error('새 일상 장면의 이전 진행 기록이 올바르지 않습니다.');
  if(saved.skipped280&&(!this.story.presentation280||!Array.isArray(saved.skipped280)||saved.skipped280.length>4000||saved.skipped280.some(id=>typeof id!=='string'||!id.startsWith('R280_')||!this.nodes.get(id)?.migrationNext280)))throw Error('이전 진행의 추가 장면 처리 기록이 올바르지 않습니다.');
  if(saved.legacyNext280&&(typeof saved.legacyNext280!=='object'||Array.isArray(saved.legacyNext280)||Object.entries(saved.legacyNext280).some(([id,next])=>!/^LATE\d+_INCOMING_(seoyeon|jiwoo|haerin|yuna|minseo|doa)_REPLY$/.test(id)||next!==id.replace(/_REPLY$/,'_NEXT')||!this.nodes.has(next))))throw Error('이전 약속의 연결 기록이 올바르지 않습니다.');
  if(!saved||saved.schema!==STORY_SCHEMA||saved.version!==STORY_VERSION||saved.identityVersion!==this.manifest.identityVersion||!this.nodes.has(saved.nodeId)||!Number.isInteger(saved.lineIndex)||saved.lineIndex<0)throw Error('현재 본편과 맞지 않는 저장 파일입니다.');
  if(typeof saved.playerName!=='string'||saved.playerName.length>16||!Array.isArray(saved.decisions)||saved.decisions.length>2000||saved.decisions.some(d=>!d||typeof d.nodeId!=='string'||typeof d.choiceId!=='string'))throw Error('선택 기록이 올바르지 않습니다.');
  for(const key of ['readMessages','notifiedMessages','tutorialSeen'])if(!Array.isArray(saved[key])||saved[key].length>1000||saved[key].some(v=>typeof v!=='string'))throw Error('진행 기록이 올바르지 않습니다.');
  const old=this.state;this.state=clone(saved);try{this.inspect();}catch(error){this.state=old;throw error;}return this.current();
 }
}
