import {scheduleInsights300} from './continuity-300.mjs?v=310';
export const dayIds=['mon','tue','wed','thu','fri','sat','sun'];
export const dayNames={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
export const statusNames={pending:'답장 대기',alternative:'시간 변경 제안',confirmed:'확정',declined:'거절',deferred:'보류',cancelled:'취소',completed:'완료',ongoing:'만나는 중'};
export const relationshipNotes={
 haerin:'입대 전 같은 동네에서 버스를 타던 친구. 지우와는 작년 여운 전시를 함께 준비했다.',
 jiwoo:'민준과 나의 학과 동기. 해린과는 기존 여운 부원으로 함께 작업했다.',
 seoyeon:'이번 학기 모집 포스터를 보고 온 새 부원. 첫 모임에서 우리와 처음 인사했다.',
 yuna:'여운 졸업 부원이자 온유 직원. 민서와 동아리 시기가 겹쳤고 기존 부원들의 간식을 챙긴다.',
 minseo:'여운 졸업 부원이자 건축 대학원생. 방 배치를 도와주러 왔고 유나와도 동아리 선후배다.',
 doa:'입대 전 알고 지낸 선배. 다른 학과의 조교로 학교에서 다시 만났다. 예전 기억만으로 지금의 마음을 정하지 않고 알아가는 중이다.'
};
export function calendarWeek(world,event){return world.appointments[event.scheduledAppointmentId]?.week??(event.weekday==='sun'&&event.week<(event.campaignLastWeek??8)?Math.max(1,event.week+1):Math.max(1,event.week));}
export function appointmentStatus(a,event){return a.status==='confirmed'&&event.appointmentId===a.id?'ongoing':a.status;}
export function weekSchedule(world,event,week){
 const now=dayIds.indexOf(event.weekday),passed=day=>week<event.week||week===event.week&&dayIds.indexOf(day)<now;
 const fixed=[];
 if(week<=15&&week!==8)fixed.push({id:'class',day:'tue',time:'13:00~14:15',label:'교양 · 이야기와 일상',place:'인문관 203호',status:passed('tue')?'완료':'수업'});
 if(week<=15&&week!==8)fixed.push({id:'club',day:'fri',time:'18:00',label:week===7?'여운 · 시험 전 짧은 모임':'여운 · 정기 작업 모임',place:'동아리방',status:passed('fri')?'완료':'정기 모임'});
 if(week===4&&world.flags.jobAccepted)fixed.push({id:'job',day:'tue',time:'17:00~19:00',label:'온유 포장 보조',place:'카페 온유',status:world.experiences.includes('first-shift-completed')?'완료':'근무'});
 if(world.flags['work280Accepted'+week])fixed.push({id:'job280-'+week,day:'wed',time:'15:00~18:00',label:'온유 단기 포장 보조',place:'카페 온유',status:world.experiences.includes('work280-paid-'+week)?'완료':'근무'});
 if(week===5&&world.flags.springMtJoined)fixed.push({id:'mt',day:'sat',time:'1박 2일',label:'여운 봄 MT',place:'숙소',status:world.experiences.includes('spring-mt-completed')?'완료':world.experiences.includes('spring-mt-attended')?'함께 지내는 중':'참가 확정'});
 if(week===16)fixed.push({id:'finals',day:'mon',time:'월~금',label:'기말고사 · 공부와 시험',place:'도서관·강의실',status:passed('fri')?'완료':'시험'});
 if(week===19&&world.flags.summerVenue&&world.flags.summerVenue!=='skip')fixed.push({id:'summer-mt',day:'sat',time:'1박 2일',label:({sea:'바다',valley:'계곡',pool:'호텔 수영장'})[world.flags.summerVenue]+' 여름 MT',place:'선택한 장소와 숙소',status:world.experiences.includes('summer-mt-completed')?'완료':world.experiences.includes('summer-mt-'+world.flags.summerVenue)?'함께 지내는 중':'참가 예정'});
 if(week===8)fixed.push({id:'exams',day:'tue',time:'화~금',label:'중간고사 · 내 과목별 시간표 확인',place:'각 강의실',status:world.experiences.includes('midterm-completed')?'완료':'시험'});
 const plans=Object.values(world.appointments).filter(a=>a.week===week).map(a=>({...a,status:statusNames[appointmentStatus(a,event)]??a.status,kind:'appointment'}));
 return dayIds.map(day=>({day,label:dayNames[day],today:week===event.week&&day===event.weekday,items:[...fixed,...plans].filter(a=>a.day===day).sort((a,b)=>a.time.localeCompare(b.time))}));
}
export function planSummary(world,event,names){
 const week=calendarWeek(world,event),plans=Object.values(world.appointments).filter(a=>a.week===week&&a.purpose==='weekly').sort((a,b)=>dayIds.indexOf(a.day)-dayIds.indexOf(b.day)||a.time.localeCompare(b.time));
 const a=world.appointments[event.scheduledAppointmentId]??world.appointments[event.appointmentId]??scheduleInsights300(world,event,week).nearest??plans.find(a=>a.status==='confirmed')??plans.at(-1);
 return a?`${a.week??week}주 ${dayNames[a.day]} ${a.time} · ${names[a.character]} · ${a.label} · ${statusNames[appointmentStatus(a,event)]}`:`${week}주 · 확정한 개인 약속 없음`;
}

export function emotionalNote(world,c){
 const f=world.flags,concern={unsettled:'지난 대화에 아직 마음이 남아 있음',observing:'서로 원하는 방식을 듣고, 다음 행동을 지켜보는 중',testing:'한 번 달라진 행동을 보았고 천천히 다시 편해지는 중',repaired:'서로 다른 날에도 약속을 지키며 마음을 다시 나눔'}[f['friction_'+c]];
 const close=['','용건 없이도 만나고 싶은 마음을 나눔','잘되지 않은 하루도 함께 이야기함','각자의 시간과 속도를 이야기함','친구라는 말 너머의 마음을 조심스럽게 나눔','좋아하는 마음을 서로의 말로 확인함'][f['closeness_'+c]??0];
 const recent={hesitant:'다정한 답을 서로 다르게 받아들인 마음을 알아가는 중',unsettled:'새로 꺼낸 말에 상처가 남아 있어 다음 대화를 기다림',observing:'남은 마음을 듣고 다음 행동을 지켜보는 중',testing:'한 번 달라진 행동을 보았고 다른 날에도 확인하는 중',repaired:'서로 다른 날의 행동을 거쳐 다시 편해진 마음을 나눔'}[f['bond140_'+c]];
 const couple={strained:'연인이 된 뒤 서운한 마음이 남아 있음',observing:'새로 정한 방식을 다음 만남에서 확인하는 중',testing:'다른 날에도 지킬 수 있는지 다시 보는 중',settled:'서운했던 마음을 듣고 다른 날의 행동으로 다시 가까워짐',ended:'연인 관계를 마치고 시간을 두는 중'}[f['couple160State_'+c]];
 return [...new Set([concern,recent,couple]),close,f['relationshipIntent_'+c]==='friend'?'지금은 친구로 만나고 싶다고 이야기함':''].filter(Boolean).join(' · ');
}
export function lifeSummary(world){const paid=world.experiences.filter(e=>/^work280-paid-\d+$/.test(e)).length,gifts=[['bookmark','천 책갈피'],['notebook','무지 수첩'],['tea','차 세트']].filter(([id])=>world.flags['gift280_'+id]).map(([,name])=>name);return [world.flags.minjun300Stage?'민준의 기록팀 이야기 '+world.flags.minjun300Stage+'/5'+(world.flags.minjun300Submitted?' · 실제 지원서 제출':''):'',({outline:'과제 질문과 자료를 정함',draft:'과제 초안을 작성함',submitted:'과제를 제출함'})[world.flags.lifeStudy],({browse:'교내 근로 공고를 확인함',draft:'교내 근로 지원서 초안을 작성함',sent:'교내 근로 지원서를 제출함'})[world.flags.lifeWork],paid?`마친 단기 근무 ${paid}회 · 받은 급여 ${(paid*36000).toLocaleString('ko-KR')}원`:'',gifts.length?'가지고 있는 선물: '+gifts.join(', '):''].filter(Boolean).join(' · ');}
