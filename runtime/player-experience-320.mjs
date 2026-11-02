import {condition} from './story-reader.mjs?v=330';
import {legacyNode320} from './topic-320.mjs?v=320';
import {dayNumber300,minutes300,busySlots300} from './continuity-300.mjs?v=320';
import {relationshipStatus} from './relationship-state.mjs?v=230';
export const DAYS320={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
export const GIFTS320={bookmark:'천 책갈피',notebook:'작은 수첩',tea:'차 세트'};
const shortDay=day=>DAYS320[day]?.slice(0,1)??'',byDate=(a,b)=>(a.week-b.week)||Object.keys(DAYS320).indexOf(a.day)-Object.keys(DAYS320).indexOf(b.day)||(minutes300(a.time)??0)-(minutes300(b.time)??0);
export function minjunKnown320(reader){if(!reader.isStory)return false;const v=reader.inspect();return v.visited.includes('W01_MON')||v.node.id==='P00'&&reader.state.lineIndex>=v.lines.findIndex(l=>l.speaker==='minjun')&&v.lines.some(l=>l.speaker==='minjun');}
export function unfinished320(world,c){const f=world.flags,rows=[];
 if(['waiting','heard','practiced'].includes(f['separation200State_'+c]))rows.push('관계에 관해 아직 이어 갈 대화');
 if(['strained','observing','testing'].includes(f['couple160State_'+c]))rows.push('연인이 된 뒤 다시 확인할 약속');
 if(['hesitant','unsettled','observing','testing'].includes(f['bond140_'+c])||['unsettled','observing','testing'].includes(f['friction_'+c]))rows.push('지난 만남에서 남은 마음');
 if(f['dilemma200State_'+c]==='waiting')rows.push('일정 때문에 미뤄 둔 이야기');
 if(f['goal200_'+c]>0&&f['goal200_'+c]<3)rows.push('개인 계획의 다음 소식');
 if(f['promise300Pending_'+c])rows.push('함께 해 보기로 한 작은 약속');
 if(c==='minjun'&&f.minjun300Stage>0&&f.minjun300Stage<5)rows.push('민준의 기록팀 준비 다음 이야기');return rows;
}
export function timeline320(reader,character=''){
 if(!reader.isStory)return [];const v=reader.inspect(),w=v.world,rows=[],seen=new Set(),add=row=>{if(!seen.has(row.id)&&(!character||row.character===character)){seen.add(row.id);rows.push(row);}};
 for(const [c,p]of Object.entries(w.people))if(p.met){const n=v.visited.map(id=>reader.nodes.get(id)).find(n=>n.effects?.some(e=>e.type==='meet'&&e.character===c));if(n)add({id:'met-'+c,character:c,week:n.week,day:n.weekday,title:'대면으로 인사한 날',kind:'meet'});const when=w.contactWeeks300?.[c];if(when)add({id:'contact-'+c,character:c,week:when.week,day:when.day,title:'개인 번호를 나눔',kind:'contact'});}
 for(const a of Object.values(w.appointments))if(a.status==='completed')add({id:'appointment-'+a.id,character:a.character,week:a.week,day:a.day,time:a.time,title:a.label,detail:a.place??'',kind:'meeting'});
 const actual=new Set(w.experiences);for(const id of v.visited){const raw=reader.nodes.get(id),n=legacyNode320(raw,reader.state);for(const e of [...(n.effects??[]),...(n.exitEffects??[])])if(e.type==='experience'&&actual.has(e.id)){
  let c,title,kind='story',hit=e.id.match(/^personal-(seoyeon|jiwoo|haerin|yuna|minseo|doa)-(\d+)$/);if(hit){c=hit[1];title='개인 이야기 '+hit[2]+'를 함께 나눔';}
  hit=e.id.match(/^goal200-(seoyeon|jiwoo|haerin|yuna|minseo|doa)-(\d+)$/);if(hit){c=hit[1];title='개인 계획 '+(+hit[2]+1)+'단계의 다음 소식을 들음';}
  hit=e.id.match(/^daily320-(seoyeon|jiwoo|haerin|yuna|minseo|doa)-(.+)-t([0-3])$/);if(hit){c=hit[1];title=reader.nodes.get(hit[2])?.topicTitles320?.[+hit[3]]??'새 일상 이야기';kind='daily';}
  hit=e.id.match(/^aftermath320-(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);if(hit){c=hit[1];title='목표 뒤의 일상을 함께 이야기함';}
  hit=e.id.match(/^gift300-used-(seoyeon|jiwoo|haerin|yuna|minseo|doa)-(bookmark|notebook|tea)$/);if(hit){c=hit[1];title=GIFTS320[hit[2]]+'를 쓰는 다음 이야기를 들음';kind='gift';}
  hit=e.id.match(/^promise300-kept-(seoyeon|jiwoo|haerin|yuna|minseo|doa)$/);if(hit){c=hit[1];title='함께 남긴 작은 약속을 지킴';kind='promise';}
  hit=e.id.match(/^minjun300-stage-(\d+)$/);if(hit){c='minjun';title='민준의 기록팀 이야기 '+hit[1]+'/5';}
  hit=e.id.match(/^doa300-stage-(\d+)$/);if(hit){c='doa';title='도아의 요즘 이야기 '+hit[1]+'/5';}
  if(c)add({id:'experience-'+e.id,character:c,week:n.week,day:n.weekday,title,kind});
 }}return rows.sort(byDate);
}
export function recap320(reader,names,{character=''}={}){if(!reader.isStory)return {title:'본편에서 지난 이야기를 볼 수 있어.',rows:[],pending:[],recent:''};const v=reader.inspect(),w=v.world,rows=timeline320(reader,character).slice(-5),known=character?[character]:Object.entries(w.people).filter(([,p])=>p.met).map(([c])=>c),pending=known.flatMap(c=>unfinished320(w,c).map(text=>(names[c]??c)+' · '+text)).slice(0,5),last=reader.log().at(-1);return {title:character?(names[character]??character)+'와 지나온 이야기':'최근에 함께 남긴 이야기',rows,pending,recent:last?last.text.replaceAll('{name}',reader.state.playerName||'나'):''};}
export function hudLayout320({width,height,mode='auto',coarse=false}){const small=height<600||coarse&&width<1100;return {mode:mode==='auto'?(small?'compact':'full'):mode,width:Math.max(190,Math.min(small?250:300,width-36)),maxHeight:Math.max(88,height-(small?210:300)),small};}
export function hud320(reader,names,{storageOkay=false,lastSavedAt=0,audio={},settings={}}={}){
 if(!reader.isStory)return {story:false};const t=reader.current(),w=t.world,event=t.event,day=Object.keys(DAYS320).indexOf(event.weekday),apps=Object.values(w.appointments),upcoming=apps.filter(a=>a.status==='confirmed'&&(a.week>event.week||a.week===event.week&&Object.keys(DAYS320).indexOf(a.day)>=day)).sort(byDate),current=w.appointments[event.appointmentId],next=current?.status==='confirmed'?current:upcoming[0],cast=(t.imageLine.cast??event.cast??[]).filter(c=>c==='minjun'||w.people[c]?.met),person=cast.length===1?cast[0]:null,flags=w.flags,progress=person==='minjun'?`기록팀 이야기 ${flags.minjun300Stage??0}/5`:person?`개인 이야기 ${Array.from({length:person==='doa'?4:10},(_,i)=>flags['arc'+person+(i+1)]).filter(Boolean).length}/${person==='doa'?4:10}`:'',pending=person?unfinished320(w,person):Object.entries(w.people).filter(([,p])=>p.met).flatMap(([c])=>unfinished320(w,c).map(v=>(names[c]??c)+' · '+v));
 const sound=!audio.supported?'이 브라우저 소리 지원 확인 필요':settings.muted||!settings.masterVolume?'소리 꺼짐':!audio.unlocked?'소리 연결 필요':audio.error?'소리 다시 연결 필요':audio.playing?.length||audio.preview?'소리 재생 준비됨':'소리 연결됨';
 return {story:true,giftDetail:event.giftDetail320,date:event.week?`${event.week}/24주 · ${DAYS320[event.weekday]}`:'개강 전날',place:({home:'집',campus:'캠퍼스',cafe:'카페',library:'도서관',bookshop:'책방',market:'시장','city-gallery':'전시실',club:'동아리방',office:'자료실',beach:'바닷가',valley:'계곡',pool:'수영장',lodge:'숙소',lecture:'강의실'})[event.location]??event.location,time:({day:'낮',evening:'저녁',night:'밤',dusk:'해질녘',sunset:'해질녘'})[event.timeOfDay]??'',weather:event.weather==='rain'?'비':event.weather==='wind'?'바람':'',next:next?`${next.week}주 ${shortDay(next.day)} ${next.time} · ${names[next.character]??''} ${next.label}`:'확정한 다음 약속 없음',nextId:next?.id,unread:w.messages.filter(m=>m.direction==='in'&&!reader.state.readMessages.includes(m.id)).length,pendingInvites:apps.filter(a=>['pending','alternative'].includes(a.status)).length,money:w.money,gifts:Object.entries(GIFTS320).filter(([id])=>flags['gift280_'+id]).map(([,label])=>label),person,personName:person?names[person]??person:cast.map(c=>names[c]??c).join(' · '),relationship:person==='minjun'?'친구':person?relationshipStatus(w,person):'',progress,pending:pending.slice(0,2),save:storageOkay?(lastSavedAt?'현재 위치 저장됨':'이 브라우저 저장 사용'):'저장 확인 필요',savedAt:lastSavedAt,sound,chapter:event.label};
}
export function choicePreview320(reader,choice){if(!reader.isStory)return null;const t=reader.current(),w=t.world,fx=(choice.effects??[]).filter(e=>condition(e.when,w)),a=fx.find(e=>e.type==='appointment'),cost=fx.filter(e=>e.type==='money'&&e.amount<0).reduce((s,e)=>s-e.amount,0);if(!a)return cost?{text:cost.toLocaleString('ko-KR')+'원 사용',conflicts:[]}:null;
 const previous=w.appointments[a.id],app={...previous,...a},week=app.week??t.event.week,day=app.day;if(!day||!app.time)return null;const start=minutes300(app.time),end=minutes300(app.endTime??String(app.time).split('~')[1]),busy=busySlots300(w,week,day,app.id),conflicts=start===null?[]:busy.filter(b=>b.start<(end??start+1)&&b.end>start).map(b=>b.label),others=busy.filter(b=>!conflicts.includes(b.label)&&!['class','club'].includes(b.id)).slice(0,2).map(b=>`${Math.floor(b.start/60)}:${String(b.start%60).padStart(2,'0')} ${b.label}`);return {text:`${week}주 ${DAYS320[day]} ${app.time}${app.endTime?'~'+app.endTime:''}${app.place?' · '+app.place:''}${cost?' · '+cost.toLocaleString('ko-KR')+'원':''}`,conflicts,others};}
