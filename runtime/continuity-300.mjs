export const PEOPLE300=['seoyeon','jiwoo','haerin','yuna','minseo','doa'];
export const minutes300=t=>{const m=String(t??'').match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:null;};
export const dayNumber300=s=>{const m=String(s??'').match(/story-w(\d+)-(mon|tue|wed|thu|fri|sat|sun)/);return m?+m[1]*7+['mon','tue','wed','thu','fri','sat','sun'].indexOf(m[2]):-1;};
export function busySlots300(world,week,day,exclude){
 const slots=Object.values(world.appointments).filter(a=>a.id!==exclude&&a.week===week&&a.day===day&&['confirmed','completed'].includes(a.status)).map(a=>{const start=minutes300(a.time)??0,allDay=/하루|1박|종일/.test(a.time??'')||a.purpose==='outing'&&a.id!=='cherry-outing';return {id:a.id,label:a.label,start:allDay?0:start,end:allDay?1440:minutes300(a.endTime??String(a.time).split('~')[1])??start+90};});
 const add=(id,label,start,end)=>slots.push({id,label,start,end});
 if(week<=15&&week!==8&&day==='tue')add('class','교양 수업',780,855);
 if(week<=15&&week!==8&&day==='fri')add('club','여운 정기 모임',1080,1140);
 if(week===4&&day==='tue'&&world.flags.jobAccepted)add('job','포장 보조 근무',1020,1140);
 if(day==='wed'&&world.flags['work280Accepted'+week])add('job280','포장 보조 근무',900,1080);
 if(week===5&&['sat','sun'].includes(day)&&world.flags.springMtJoined)add('mt','봄 MT',0,1440);
 if(week===19&&['sat','sun'].includes(day)&&world.flags.summerVenue&&world.flags.summerVenue!=='skip')add('summer-mt','여름 MT',0,1440);
 return slots;
}
export function slotAvailable300(world,{week,day,start,end,exclude}){const from=minutes300(start),to=minutes300(end);return from!==null&&to!==null&&to>from&&!busySlots300(world,week,day,exclude).some(a=>a.start<to&&a.end>from);}
export function scheduleInsights300(world,event,week){
 const names={mon:'월',tue:'화',wed:'수',thu:'목',fri:'금',sat:'토',sun:'일'},days=Object.keys(names),plans=Object.values(world.appointments).filter(a=>a.week===week&&a.status==='confirmed').sort((a,b)=>days.indexOf(a.day)-days.indexOf(b.day)||(minutes300(a.time)??0)-(minutes300(b.time)??0)),conflicts=[];
 for(const a of plans){const start=minutes300(a.time),end=minutes300(a.endTime)??(start===null?null:start+90);if(start===null)continue;const others=busySlots300(world,week,a.day,a.id).filter(b=>b.start<end&&b.end>start);if(others.length)conflicts.push(`${names[a.day]} ${a.time} · ${a.label}: ${others.map(b=>b.label).join(', ')}와 시간이 겹쳐.`);}
 const free=[];for(const [day,start,end]of [['thu','19:30','20:10'],['fri','19:10','19:45'],['fri','20:00','20:40'],['sat','11:00','11:40']])if((week>event.week||week===event.week&&days.indexOf(day)>=days.indexOf(event.weekday))&&slotAvailable300(world,{week,day,start,end}))free.push(`${names[day]} ${start}~${end}`);
 return {count:plans.length,summary:plans.length?`확정 약속 ${plans.length}개 · ${plans.map(a=>`${names[a.day]} ${a.time}`).join(' → ')}`:'확정된 개인 약속은 없어.',conflicts:[...new Set(conflicts)],free,nearest:plans.find(a=>week>event.week||days.indexOf(a.day)>=days.indexOf(event.weekday))};
}
export function media300(value){
 if(!value||typeof value!=='object')return null;
 if(value.kind==='photo'&&/^\.\/assets\/phone300-[a-z]+-[a-f0-9]+\.webp$/.test(value.src)&&typeof value.alt==='string')return {kind:'photo',src:value.src,alt:value.alt.slice(0,160)};
 if(value.kind==='song'&&['piano-daily','piano-tender','piano-reflect','band-campus','band-festival'].includes(value.track)&&typeof value.title==='string')return {kind:'song',track:value.track,title:value.title.slice(0,100),artist:String(value.artist??'').slice(0,100)};
 return null;
}
export function notebook300(world,c,tastes){
 const f=world.flags,notes=[];if(f['gift300Known_'+c])notes.push('직접 들은 취향 · '+tastes[c].line);
 if(f['memory300Followed_'+c])notes.push('지난 만남에서 나눈 이야기를 다음 날 다시 물으며 이어 갔다.');
 if(f['promise300Pending_'+c])notes.push('다음 만남에 함께 해 보기로 한 작은 약속이 남아 있다.');
 if(f['promise300Kept_'+c])notes.push('둘이 남겼던 작은 약속을 실제 다음 만남에서 지켰다.');
 if(f['anniversary300_'+c])notes.push('개인 번호를 나눈 지 네 주쯤 된 날을 서로 기억했다.');
 for(const [g,label]of [['bookmark','책갈피'],['notebook','수첩'],['tea','차']])if(f['gift300Used_'+c+'_'+g])notes.push('건넨 '+label+'를 실제로 쓰는 다음 이야기를 들었다.');
 if(c==='doa'&&f.doa300Stage)notes.push('도아의 요즘 이야기 '+f.doa300Stage+'/5');return notes;
}
