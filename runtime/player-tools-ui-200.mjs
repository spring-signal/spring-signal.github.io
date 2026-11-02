import {DAYS320} from './player-experience-320.mjs?v=330';
import {ManualSlots,relationNotebook} from './player-tools-200.mjs?v=340';
import {renderNamedText} from './characters.mjs?v=200';
export function installPlayerTools({session,manifest,storage,names,modal,closeDialogs,toast,onLoad,pinnedFor=()=>[]}){
 const $=id=>document.getElementById(id),slots=new ManualSlots(manifest,storage);let person='',pending;
 const text=(tag,value,cls='')=>{const e=document.createElement(tag);e.textContent=value;e.className=cls;return e;};
 function paintNotes(){
  const data=relationNotebook(session.reader,names,{character:person,query:$('notebook-search').value});person=data.character;
  $('notebook-people').replaceChildren(...data.people.map(c=>{const b=text('button',names[c]);b.setAttribute('aria-pressed',String(c===person));b.onclick=()=>{person=c;paintNotes();};return b;}));
  $('notebook-timeline').replaceChildren(...(data.timeline??[]).map(r=>text('p',`${r.week}주 ${DAYS320[r.day]??''} · ${r.title}`)));
  $('notebook-status').textContent=data.character?names[data.character]+' · '+data.status:data.status;
  $('notebook-questions').replaceChildren(...(data.questions.length?data.questions:['지금 기록된 미해결 대화는 없어. 서로의 다음 답은 만남에서 다시 듣게 돼.']).map(t=>text('p',t)));
  $('notebook-appointments').replaceChildren(...(data.appointments.length?data.appointments.map(a=>`${a.week}주 ${{mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'}[a.day]??''} ${a.time} · ${a.label}\n${a.place??''} · ${a.status}`):['현재 함께 정해 둔 다음 약속은 없어.']).map(t=>text('p',t)));
  $('notebook-memories').replaceChildren(...(data.memories?.length?data.memories:['직접 들은 취향과 함께 남긴 작은 약속이 여기에 기록돼.']).map(t=>text('p',t)));
  $('notebook-pins330').replaceChildren(...pinnedFor(session.reader,person).map(m=>text('p',m.text)));
  $('notebook-choices').replaceChildren(...data.choices.map(c=>text('p',c.chapter+'\n'+c.text)));
  $('notebook-lines').replaceChildren(...data.lines.map(l=>{const p=text('p',''),who=text('strong','');renderNamedText(who,names[l.speaker]??session.reader.state.playerName??'나');p.append(who,text('span',' · '+l.chapter+'\n'+l.text));return p;}));
  $('notebook-count').textContent=`읽은 대화 중 ${data.lines.length}개 표시 · 최근 선택 ${data.choices.length}개`;
 }
 function openNotes(character){if(typeof character==='string')person=character;closeDialogs();$('notebook-search').value='';paintNotes();modal('notebook');}
 function paintSlots(){
  $('slots-status').textContent=slots.error||'현재 자동 저장과 별도로 다섯 칸을 보관할 수 있어. 저장은 지금 화면에 표시된 위치를 기준으로 해.';
  $('slot-list').replaceChildren(...slots.entries.map((entry,index)=>{const row=text('section','','save-slot'),h=text('h3',`${index+1}번 칸`),p=text('p',entry?entry.name+' · '+entry.chapter:'비어 있는 칸'),actions=text('div','','slot-actions');
   const save=text('button',entry?'이 칸에 덮어쓰기':'여기에 저장');save.disabled=session.view!=='game'||!session.reader.isStory||Boolean(slots.error);save.onclick=()=>{if(entry){pending={kind:'save',index};$('slot-confirm-text').textContent=`${index+1}번 칸의 ‘${entry.chapter}’ 기록을 지금 위치로 바꿀까?`;$('slot-confirm-yes').textContent='이 칸에 덮어쓰기';modal('slot-confirm');}else write(index);};
   const load=text('button','불러오기');load.disabled=!entry;load.onclick=()=>{pending={kind:'load',index};$('slot-confirm-text').textContent=`${index+1}번 칸의 ‘${entry.chapter}’부터 이어 읽을까? 현재 진행도 보관하려면 먼저 다른 칸에 저장해 줘.`;$('slot-confirm-yes').textContent='이 기록 불러오기';modal('slot-confirm');};actions.append(save,load);row.append(h,p,actions);return row;}));
 }
 function write(index){try{slots.save(index,session.reader.export());paintSlots();toast(`${index+1}번 칸에 지금 위치를 저장했어.`);}catch(e){toast(e.message);}}
 function openSlots(){closeDialogs();paintSlots();modal('manual-slots');}
 $('open-notebook').onclick=openNotes;$('open-slots').onclick=openSlots;$('title-slots').onclick=openSlots;
 $('notebook-search').oninput=paintNotes;
 $('slot-confirm-yes').onclick=async()=>{const action=pending;pending=null;$('slot-confirm').close();if(!action)return;if(action.kind==='save'){write(action.index);return;}try{const snapshot=slots.load(action.index);await onLoad(snapshot);}catch(e){toast(e.message);}};
 return {slots,openNotes,openSlots};
}
