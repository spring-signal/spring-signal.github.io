import {AlbumCollection342} from './runtime/album-342.mjs?v=342';
import {startTitleAutoplay341,titleAudio341} from './runtime/title-autoplay-341.mjs?v=341';
import {applyChannel340,developmentTools340} from './runtime/build-channel-340.mjs?v=340';
import {PlayerNotes330} from './runtime/player-notes-330.mjs?v=330';
import {installPlayerNotes330} from './runtime/player-notes-ui-330.mjs?v=330';
import {installMobileDisplay330,requestDisplay330} from './runtime/mobile-display-330.mjs?v=331';
import {choicePreview320} from './runtime/player-experience-320.mjs?v=330';
import {installExperience320} from './runtime/player-experience-ui-320.mjs?v=330';
import {scheduleInsights300,media300} from './runtime/continuity-300.mjs?v=310';
import {readingView240,storySeries240} from './runtime/reading-240.mjs?v=280';
import {ReadLines,readLineKey} from './runtime/player-tools-200.mjs?v=340';
import {installPlayerTools} from './runtime/player-tools-ui-200.mjs?v=340';
import {EndingMemories,ENDING_COUNT} from './runtime/ending-memories.mjs?v=340';
import {interfaceLayout} from './runtime/interface-layout.mjs?v=200';
import {guardTitleTouches} from './runtime/title-input.mjs?v=200';
import {relationshipStatus} from './runtime/relationship-state.mjs?v=230';
import {paintName,renderNamedText} from './runtime/characters.mjs?v=200';
import {SceneAssetLoader,SceneRenderer,networkPolicy,WardrobeLedger} from './runtime/scene-assets.mjs?v=342';
import {eventScene} from './runtime/event-reader.mjs?v=310';
import {GameSession,normalizedSettings,SETTINGS_KEY} from './runtime/game-session.mjs?v=340';
import {SoundDirector} from './runtime/sound-270.mjs?v=330';
import {bindAudioGestures281} from './runtime/audio-compat-281.mjs?v=281';
import {shouldRotate} from './runtime/presentation.mjs?v=200';
import {story,story310,story290,story270,story190,story180,story170,story150,story140,story130,story120,story110,story100,story090,story080,legacyStory} from './story/chapter-one.mjs?v=320';
import {weekSchedule,calendarWeek,planSummary,relationshipNotes,emotionalNote,lifeSummary} from './runtime/weekly-schedule.mjs?v=310';
const $=id=>document.getElementById(id);
const manifest=await fetch('./manifest.json?v=342',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('게임 정보를 불러오지 못했어.');return r.json();});
applyChannel340(manifest);
manifest.story=story;manifest.story310=story310;manifest.story290=story290;manifest.story270=story270;
manifest.story190=story190;
manifest.story180=story180;
manifest.story170=story170;
manifest.story150=story150;
manifest.story140=story140;
manifest.story130=story130;
manifest.story120=story120;
manifest.legacyStory=legacyStory;
manifest.story110=story110;
manifest.story100=story100;
manifest.story090=story090;
manifest.story080=story080;
let storage;try{storage=localStorage;}catch{}
const session=new GameSession(manifest,storage),memories=new EndingMemories(manifest,storage),connection=navigator.connection??{};
if(session.storySaved?.nodeId.startsWith('END'))memories.record(session.storySaved);
let memoryId='',memoryHistory=false,memoryPage=0;
let settings=normalizedSettings({},matchMedia('(prefers-reduced-motion:reduce)').matches);
try{settings=normalizedSettings(JSON.parse(storage?.getItem(SETTINGS_KEY)??'{}'),matchMedia('(prefers-reduced-motion:reduce)').matches);}catch{}
const notes330=new PlayerNotes330(storage);
const album342=new AlbumCollection342(manifest,storage);album342.merge(session.storySaved?.album342);
let songButtons300=[],experienceUI320=null,playerUI330=null,mobileDisplay330=null;
const sound=new SoundDirector({settings,onStatus:updateSoundUI});
function paintInformation330(){experienceUI320?.paint();playerUI330?.paint();}
function updateSoundUI(){
 const state=sound.status,percent=n=>Math.round(n*100)+'%';
 $('sound-status').dataset.audioState=state.unlocked?'running':'suspended';$('sound-status').dataset.audioPlaying=state.playing.join(',');
 $('sound-muted').checked=settings.muted;$('title-music-enabled330').checked=settings.titleMusicEnabled;
 const titleAudio=titleAudio341(state,settings);$('title-music330').hidden=!titleAudio.showControl;$('title-music330').setAttribute('aria-pressed',String(titleAudio.playing));$('title-music330').textContent=titleAudio.label;$('title-music-hint330').textContent=titleAudio.hint;
 for(const [id,key]of [['master-volume','masterVolume'],['ambience-volume','ambienceVolume'],['effects-volume','effectsVolume'],['music-volume','musicVolume']]){$(id).value=Math.round(settings[key]*100);$(id+'-value').value=percent(settings[key]);}
 paintInformation330();
 const music=state.playing.some(id=>id.startsWith('music-'));
 for(const {button,track}of songButtons300){const playing=state.preview===track;button.textContent=playing?'듣는 중 · 누르면 멈추기':'추천곡 듣기';button.setAttribute('aria-pressed',String(playing));}
 $('sound-status').textContent=!state.supported?'이 브라우저에서는 소리를 지원하지 않아.':state.muted||!settings.masterVolume?'전체 소리를 껐어.':state.error?state.error:!state.unlocked?'소리 다시 연결을 누르거나 화면을 한 번 눌러 줘.':session.view==='title'?(settings.titleMusicEnabled&&settings.musicVolume>0?(state.playing.includes('music-330-title-warm')?'타이틀 음악 · 너를 만나기 전의 봄':'타이틀 음악을 준비하고 있어.'):'타이틀 음악을 껐어.'):state.label+(settings.ambienceVolume?'':' · 환경음 꺼짐')+(settings.musicVolume?(music?' · 배경음악 재생 중':' · 배경음악 준비 중'):' · 배경음악 꺼짐');
}
const unlockSound=()=>{void sound.unlock();};
bindAudioGestures281(document,unlockSound);
const loader=new SceneAssetLoader({policy:networkPolicy(connection,navigator.deviceMemory??4)});
const renderer=new SceneRenderer($('stage'),loader,manifest,{motion:settings.motion});
const names=Object.fromEntries(manifest.inventory.map(r=>[r.character,r.name]));Object.assign(names,{narrator:'나',player:'나',minjun:'박민준'});
const readLines=new ReadLines(storage);
let readingMode='off',readingTimer,currentReadKey=null,currentWasRead=false;
function stopReading(){clearTimeout(readingTimer);readingMode='off';$('auto-read').setAttribute('aria-pressed','false');$('skip-read').setAttribute('aria-pressed','false');}
function queueReading(){clearTimeout(readingTimer);if(readingMode==='off')return;const t=session.reader.current();if(session.view!=='game'||t.kind!=='dialogue'||document.querySelector('dialog[open]')||!$('rotate-guide').hidden){stopReading();return;}if(busy||!fullyShown)return;if(readingMode==='skip'&&!currentWasRead){stopReading();toast('여기부터는 아직 읽지 않은 대사야.');return;}readingTimer=setTimeout(()=>{if(busy||document.hidden||document.querySelector('dialog[open]')||!$('rotate-guide').hidden){stopReading();return;}next();},readingMode==='skip'?260:Math.max(1700,Math.min(8000,[...t.line.text].length*65)));}
function toggleReading(mode){if(readingMode===mode){stopReading();return;}stopReading();readingMode=mode;$(mode==='auto'?'auto-read':'skip-read').setAttribute('aria-pressed','true');queueReading();}
let active=0,busy=false,typeTimer,fullyShown=true,currentText='',toastTimer,albumTab='seoyeon',resizeTimer,phoneCharacter='',tutorialTarget='',noticeCharacter='';
let shownCalendarWeek=1,noticeDay='';
const poseNames={neutral:'기본',happy:'미소',shy:'수줍음',serious:'진지함',hurt:'서운함'};
names.group='여운 공지방';
const weekdays={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
const statusNames={pending:'답장 대기',alternative:'시간 변경 제안',confirmed:'확정',declined:'이번 초대 거절',deferred:'보류',cancelled:'취소',completed:'완료'};
function persistUI(action){if(!session.reader.isStory)return;const r=session.candidate(action);session.commit(r.export());}
function markTutorial(id){if(session.reader.isStory&&!session.reader.state.tutorialSeen.includes(id))persistUI(r=>r.tutorialDone(id));$('tutorial').hidden=true;}
function guide(){
 $('tutorial').hidden=true;if(!session.reader.isStory||session.view!=='game'||busy||document.querySelector('dialog[open]')||!$('rotate-guide').hidden)return;
 const r=session.reader,seen=r.state.tutorialSeen,step=r.current();let id,target,text;
 if(!seen.includes('read'))[id,target,text]=['read','dialogue-text','대사를 누르면 이야기가 이어져. 글자가 나오는 중에는 한 번 눌러 모두 볼 수 있어.'];
 else if(step.kind==='choices'&&!seen.includes('choice'))[id,target,text]=['choice','choices','하고 싶은 말을 골라 줘. 이 선택은 다음 만남과 대화에 남아.'];
 else if(r.world.messages.some(m=>m.direction==='in')&&!seen.includes('phone'))[id,target,text]=['phone','open-phone','새 메시지가 왔어. 이 버튼을 눌러 대화를 확인해 봐.'];
 else if(Object.keys(r.world.appointments).length&&!seen.includes('calendar'))[id,target,text]=['calendar','open-calendar','달력에서 답장 대기와 확정된 약속을 구분해서 볼 수 있어.'];
 if(!target)return;tutorialTarget=id;const rect=$(target).getBoundingClientRect(),bubble=$('tutorial');bubble.textContent=text;bubble.hidden=false;const width=Math.min(320,innerWidth-32);bubble.style.setProperty('width',width+'px');bubble.style.setProperty('left',Math.max(16,Math.min(innerWidth-width-16,rect.x+rect.width/2-width/2))+'px');bubble.style.setProperty('top',Math.max(16,Math.min(innerHeight-104,rect.y>120?rect.y-100:rect.y+rect.height+12))+'px');
}
function updateStoryUI(){
 const isStory=Boolean(session.reader.isStory);$('open-phone').hidden=!isStory;$('open-calendar').hidden=!isStory;$('budget').hidden=!isStory;
 // Calendar stays in the HUD while choices use the full scroll area.
 $('weekly-plan').hidden=!isStory||session.reader.current().kind==='choices';
 if(!isStory){paintInformation330();$('message-notice').hidden=true;$('tutorial').hidden=true;return;}
 const r=session.reader,w=r.world;$('budget').textContent='생활비 '+new Intl.NumberFormat('ko-KR',{style:'currency',currency:'KRW',maximumFractionDigits:0}).format(w.money);
 const event=r.current().event,summary=planSummary(w,event,names);renderNamedText($('weekly-plan'),summary);$('weekly-plan').setAttribute('aria-label',summary+' · 주간 일정 열기');
 if(noticeDay&&noticeDay!==event.day)$('message-notice').hidden=true;
 const unread=w.messages.filter(m=>m.direction==='in'&&!r.state.readMessages.includes(m.id));$('unread-count').textContent=unread.length;$('unread-count').hidden=!unread.length;$('open-phone').setAttribute('aria-label',`메시지 ${unread.length}개 안 읽음`);
 const fresh=unread.filter(m=>!r.state.notifiedMessages.includes(m.id));
 if(fresh.length){const latest=fresh.at(-1);sound.play('message',{character:latest.character});noticeCharacter=latest.character;noticeDay=event.day;$('notice-text').textContent=(names[latest.character]??latest.character)+'에게 메시지가 왔어. '+latest.text.slice(0,72);$('message-notice').hidden=false;persistUI(reader=>{for(const m of fresh)reader.acknowledge(m.id);});}
 paintInformation330();viewport();guide();
}
function openPhone(character){
 if(!session.reader.isStory)return;markTutorial('phone');$('message-notice').hidden=true;closeDialogs();const w=session.reader.world;
 const people=[...new Set(w.messages.map(m=>m.character))];phoneCharacter=character&&people.includes(character)?character:people.includes(phoneCharacter)?phoneCharacter:people.at(-1)??'';
 $('phone-contacts').replaceChildren(...people.map(c=>{const b=document.createElement('button');const count=w.messages.filter(m=>m.character===c&&m.direction==='in'&&!session.reader.state.readMessages.includes(m.id)).length;renderNamedText(b,(names[c]??c)+(count?' · '+count:''));b.setAttribute('aria-pressed',String(c===phoneCharacter));b.onclick=()=>openPhone(c);return b;}));
 paintName($('chat-title'),phoneCharacter,names[phoneCharacter]??'아직 도착한 대화가 없어');
 const messages=w.messages.filter(m=>m.character===phoneCharacter);songButtons300=[];$('chat-messages').replaceChildren(...messages.map(m=>{const p=document.createElement('div');p.className='chat-bubble '+(m.direction==='out'?'out':'in');const text=document.createElement('p');text.textContent=m.text;p.append(text);const media=media300(m.media);
 if(media?.kind==='photo'){const button=document.createElement('button'),img=document.createElement('img');button.className='chat-photo';button.setAttribute('aria-label',media.alt+' · 크게 보기');img.src=media.src;img.alt=media.alt;img.loading='lazy';img.decoding='async';button.append(img);button.onclick=()=>{$('zoom-image').src=media.src;$('zoom-image').alt=media.alt;$('zoom-label').textContent=media.alt;modal('lightbox');};p.append(button);}
 if(media?.kind==='song'){const label=document.createElement('p'),button=document.createElement('button');label.className='chat-song-title';label.textContent=media.title+' · '+media.artist;button.className='chat-song-play';button.textContent='추천곡 듣기';button.setAttribute('aria-pressed','false');button.onclick=async()=>{if(sound.status.preview===media.track){sound.stopSong();return;}if(settings.muted||!settings.masterVolume||!settings.musicVolume){toast('옵션에서 전체 소리와 배경음악 음량을 켜 줘.');return;}await sound.playSong(media.track);};songButtons300.push({button,track:media.track});p.append(label,button);}
 const pin=document.createElement('button');pin.className='chat-pin330';const refreshPin=()=>{const pinned=notes330.isPinned(session.reader,m);pin.textContent=pinned?'고정 해제':'중요 문자 고정';pin.setAttribute('aria-pressed',String(pinned));};refreshPin();pin.onclick=()=>{try{notes330.togglePin(session.reader,m.id);refreshPin();paintInformation330();}catch(e){toast(e.message);}};p.append(pin);return p;}));
 persistUI(r=>{for(const m of messages)if(m.direction==='in')r.readMessage(m.id);});updateStoryUI();modal('phone');$('chat-messages').scrollTop=$('chat-messages').scrollHeight;
}
function paintCalendar(){
 const r=session.reader,w=r.world,event=r.current().event;
 $('calendar-date').textContent=`${shownCalendarWeek}주 일정 · 지금은 ${event.week?event.week+'주':'개강 전'} ${weekdays[event.weekday]}`;
 $('calendar-prev').disabled=shownCalendarWeek<=1;$('calendar-next').disabled=shownCalendarWeek>=(story.maxWeek??8);
 const insight=scheduleInsights300(w,event,shownCalendarWeek);$('calendar-insights').replaceChildren(...[insight.summary,...insight.conflicts,...(insight.free.length?['비어 있는 짧은 시간 · '+insight.free.join(' / ')]:[])].map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));
 $('calendar-list').replaceChildren(...weekSchedule(w,event,shownCalendarWeek).map(day=>{
  const section=document.createElement('section');section.className='calendar-day'+(day.today?' today':'');
  const heading=document.createElement('h3');heading.textContent=day.label+(day.today?' · 오늘':'');section.append(heading);
  if(!day.items.length){const p=document.createElement('p');p.className='calendar-empty';p.textContent='정한 일정 없음';section.append(p);}
  for(const item of day.items){const p=document.createElement('p');p.className='calendar-item';p.dataset.status=item.status;
   const origin={incoming:'상대가 먼저 초대한 약속',conversation:'만나서 함께 정한 약속'}[item.origin];
   const text=`${item.time} · ${item.character?(names[item.character]+' · '):''}${item.label}\n${item.place??'약속 장소'} · ${item.status}${origin?'\n'+origin:''}`;renderNamedText(p,text);section.append(p);
  }return section;
 }));
 $('life-summary').textContent=lifeSummary(w)||'아직 새로 남긴 과제·근로 준비 기록이 없어.';
 $('people-list').replaceChildren(...Object.entries(w.people).filter(([,p])=>p.met).map(([c,p])=>{
  const el=document.createElement('p');el.className='calendar-person';
  const completed=Object.values(w.appointments).filter(a=>a.character===c&&a.status==='completed').length;
  renderNamedText(el,`${names[c]} · ${relationshipStatus(w,c)}\n${w.contacts[c]?.scope==='personal'?'개인 연락 가능':'대면으로 인사하는 사이'} · 함께 지킨 약속 ${completed}회\n${relationshipNotes[c]??''}\n${emotionalNote(w,c)}`);return el;
 }));
}
function openCalendar(){if(!session.reader.isStory)return;markTutorial('calendar');closeDialogs();shownCalendarWeek=calendarWeek(session.reader.world,session.reader.current().event);paintCalendar();modal('calendar');}
function openLog(){
 if(!session.reader.isStory)return;
 const entries=session.reader.log();$('log-lines').replaceChildren(...entries.map(entry=>{const reading=readingView240({event:{id:entry.nodeId},line:entry},session.reader.state.playerName),p=document.createElement('p'),who=document.createElement('strong');p.dataset.reading=reading.kind;paintName(who,reading.speaker,reading.who);p.append(who,document.createTextNode(' · '+reading.label+'\n'+reading.text.replaceAll('{name}',session.reader.state.playerName||'나')));return p;}));modal('dialogue-log');$('log-lines').scrollTop=$('log-lines').scrollHeight;
}
function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,4200);}
function closeDialogs(){for(const dialog of document.querySelectorAll('dialog[open]'))dialog.close();$('tutorial').hidden=true;}
function modal(id){stopReading();finishText();$('tutorial').hidden=true;$(id).showModal();}
function titleMotion(){const on=session.view==='title'&&settings.motion;$('title-petals').hidden=!on;$('title-petals').src=on?'./assets/title-petals-050.gif':'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';}
function applySettings(){sound.setSettings(settings);updateSoundUI();document.documentElement.style.setProperty('--font-scale',settings.fontScale);document.body.dataset.motion=settings.motion?'on':'off';renderer.motion=settings.motion;$('font-size').value=Math.round(settings.fontScale*100);$('font-value').value=Math.round(settings.fontScale*100)+'%';$('text-speed').value=settings.textSpeed;$('quality').value=settings.quality;$('motion').checked=settings.motion;titleMotion();paintInformation330();}
function updateSettings(next){settings=normalizedSettings({...settings,...next});try{storage?.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch{}applySettings();if(session.view==='game')scheduleResize();}
function rotateGuide(){const coarse=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;$('rotate-guide').hidden=!(session.view==='game'&&shouldRotate(innerWidth,innerHeight,coarse));}
function viewport(){const rect=$('screen').getBoundingClientRect(),dialogue=$('dialogue').getBoundingClientRect(),hud=$('game-hud').getBoundingClientRect(),plan=$('weekly-plan');const bottom=parseFloat(getComputedStyle($('dialogue')).bottom)||16,layout=interfaceLayout({height:rect.height,hudBottom:(hud.bottom??hud.y+hud.height)-(rect.y??0),dialogueHeight:dialogue.height,dialogueBottom:bottom,planHeight:plan.hidden?0:plan.getBoundingClientRect().height});$('screen').style.setProperty('--dialogue-space',layout.dialogueSpace+'px');$('screen').style.setProperty('--hud-space',layout.hudSpace+'px');$('message-notice').style.setProperty('--notice-top',layout.noticeTop+'px');return {width:rect.width,height:rect.height,dpr:devicePixelRatio||1,dialogueSpace:layout.dialogueSpace,quality:settings.quality,compact:innerHeight<620&&(matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0)};}
function setBusy(value){busy=value;if(value)$('tutorial').hidden=true;for(const button of document.querySelectorAll('[data-step],#choices button'))button.disabled=value;}
function finishText(){clearTimeout(typeTimer);$('line').textContent=currentText;fullyShown=true;}
function reveal(text){clearTimeout(typeTimer);currentText=text;$('line-measure').textContent=text;$('speech-accessible').textContent=$('line-kind').textContent+' · '+$('speaker').textContent+' · '+text;fullyShown=settings.textSpeed===0;let i=0;const chars=[...text];$('line').textContent=fullyShown?text:'';if(fullyShown)return;const tick=()=>{i++;$('line').textContent=chars.slice(0,i).join('');if(i<chars.length)typeTimer=setTimeout(tick,settings.textSpeed);else {fullyShown=true;queueReading();}};tick();}
function paintText(step){
 currentReadKey=readLineKey(session.reader);currentWasRead=readLines.has(currentReadKey);names.player=session.reader.isStory?(session.reader.state.playerName||'나'):'나';
 const dialogue=step.kind==='dialogue',reading=dialogue?readingView240(step,names.player):null;
 $('dialogue').dataset.reading=reading?.kind??'choice';$('line-kind').textContent=reading?.label??(step.kind==='choices'?'선택':'마무리');
 const speaker=reading?.speaker??'narrator',speakerLabel=reading?(speaker==='narrator'?'내 시점':names[speaker]??reading.who):(step.kind==='choices'?'어떻게 할까':'이 장면의 끝');paintName($('speaker'),speaker,speakerLabel);
 const badge=$('relationship-badge'),c=step.line.speaker,isLover=dialogue&&session.reader.isStory&&session.reader.world.flags['romance150Lover_'+c];badge.hidden=!isLover;badge.textContent=isLover?(relationshipStatus(session.reader.world,c).includes('대화')?'연인 · 남은 대화':'연인'):'';
 const text=dialogue?reading.text:step.kind==='choices'?(step.event.choicePrompt??'내가 먼저 해 볼 말을 골라 보자.'):session.reader.isStory?'이번 여름의 이야기를 마쳤어. 메뉴에서 진행 파일을 저장하거나 타이틀로 돌아갈 수 있어.':'함께 보낸 장면은 여기까지야. 다음 행사로 이어 가거나 메뉴에서 다른 이야기를 골라 볼 수 있어.';
 $('line-progress').textContent=dialogue?`문장 ${step.index+1}`:'';reveal(text);const series=storySeries240(step.event);$('scene-tag').textContent=step.event.label+(series?' · '+series.label:'');$('chapter-tag').textContent=session.reader.isStory?'한빛대학교 · 나의 봄':'행사 연출 미리보기';$('events').value=session.reader.isStory?'':step.event.id;$('assumption').textContent=step.event.assumption;
}
function paintControls(step){$('screen').dataset.step=step.kind;const isStory=session.reader.isStory;$('choices').replaceChildren();if(step.kind==='choices')for(const choice of step.event.choices){const button=document.createElement('button');renderNamedText(button,choice.label,{prefix:choice.character??(step.event.cast?.length===1?step.event.cast[0]:undefined)});const preview=choicePreview320(session.reader,choice);if(preview){const hint=document.createElement('small');hint.className='choice-preview320';hint.textContent=preview.text+(preview.conflicts.length?'\n겹치는 일정 · '+preview.conflicts.join(' / '):'')+(preview.others?.length?'\n같은 날 · '+preview.others.join(' / '):'');button.append(hint);}button.onclick=()=>{if(!busy){markTutorial('choice');renderCandidate(session.candidate(r=>r.choose(choice.id)));}};$('choices').append(button);}$('previous').textContent=isStory?'대화 기록':'이전';$('previous').disabled=!isStory&&step.index===0;$('next').hidden=step.kind!=='dialogue';$('next').disabled=step.kind!=='dialogue';$('next-hint').hidden=step.kind!=='dialogue';$('next-event').hidden=step.kind!=='end';$('next-event').disabled=false;$('next-event').textContent=isStory||manifest.events.at(-1).id===step.event.id?'타이틀로 ▸':'다음 행사 ▸';$('again').hidden=Boolean(isStory)||!developmentTools340(manifest);$('again').disabled=isStory||!session.reader.export().choices?.[step.event.id];}
async function renderCandidate(reader,{repaintOnly=false}={}){if(session.view!=='game')return false;const run=++active,snapshot=reader.export(),step=reader.current();$('screen').dataset.step=step.kind;const imageLine=step.kind==='dialogue'?step.imageLine:{...step.imageLine,speaker:'narrator'};const scene=eventScene(step.event,imageLine,manifest);const oldMeasure=$('line-measure').textContent;if(!repaintOnly)$('line-measure').textContent=step.kind==='dialogue'?readingView240(step,reader.state?.playerName).text:step.kind==='choices'?(step.event.choicePrompt??'내가 먼저 해 볼 말을 골라 보자.'):(step.event.terminal&&session.reader.isStory?'이번 여름의 이야기를 마쳤어. 메뉴에서 진행 파일을 저장하거나 타이틀로 돌아갈 수 있어.':'함께 보낸 장면은 여기까지야. 다음 행사로 이어 가거나 메뉴에서 다른 이야기를 골라 볼 수 있어.');setBusy(true);$('status').hidden=false;$('status').className='status';$('status').textContent='장면을 준비하고 있어…';
 try{const shown=await renderer.show(scene,viewport(),{saveData:connection.saveData});if(!shown||run!==active||session.view!=='game')return false;if(reader.isStory&&session.reader.isStory){const live=session.reader.export(),received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));for(const key of ['readMessages','notifiedMessages'])snapshot[key]=[...new Set([...snapshot[key],...live[key]])].filter(id=>received.has(id));snapshot.tutorialSeen=[...new Set([...snapshot.tutorialSeen,...live.tutorialSeen])];}if(reader.isStory){album342.merge(snapshot.album342);album342.record(renderer.displayedAssets,{isStory:true,visible:albumStageVisible342()});snapshot.album342=album342.export();}session.commit(snapshot);if(reader.isStory&&step.kind==='end'&&step.event.terminal)memories.record(snapshot);$('continue-game').disabled=false;sound.present(scene,step,{repaintOnly});$('weather-overlay').dataset.weather=scene.weather??'';$('weather-overlay').dataset.indoor=String(['home','cafe','office','library','club','lodge','seminar'].includes(scene.location));$('weather-label').textContent=scene.weather==='rain'?'비 오는 날':scene.weather==='wind'?'바람 부는 날':'';if(!repaintOnly)paintText(step);paintControls(step);$('save-status').textContent=session.storageOkay?'지금 표시된 위치까지 자동 저장했어.':'자동 저장이 막혀 있어. 진행 파일 저장을 이용해 줘.';$('status').hidden=true;setBusy(false);paintControls(step);updateStoryUI();queueReading();const future=session.candidate();const scenes=[];for(let i=0;i<2;i++){if(future.current().kind!=='dialogue')break;future.next();const next=future.current();if(next.kind==='dialogue')scenes.push(eventScene(next.event,next.imageLine,manifest));}loader.prefetch(scenes,manifest,viewport(),connection.saveData);return true;
 }catch(error){if(run!==active||session.view!=='game')return false;$('line-measure').textContent=oldMeasure;setBusy(false);$('status').className='status error';$('status').replaceChildren(document.createTextNode('장면을 불러오지 못했어. 이전 진행은 그대로야. '));const retry=document.createElement('button');retry.textContent='다시 불러오기';retry.onclick=()=>renderCandidate(reader);$('status').append(retry);console.error(error);return false;}}
function showTitle(){$('weather-overlay').dataset.weather='';$('weather-label').textContent='';sound.toTitle();stopReading();$('boot-status').hidden=true;const menu=document.querySelector('.title-menu');menu.inert=false;menu.setAttribute('aria-busy','false');$('migration-note').textContent=session.migrationMessage??'';active++;renderer.clear();setBusy(false);finishText();closeDialogs();session.title();document.body.dataset.view='title';$('game-screen').hidden=true;$('title-screen').hidden=false;$('status').hidden=true;$('message-notice').hidden=true;$('tutorial').hidden=true;$('continue-game').disabled=!session.saved;rotateGuide();titleMotion();paintInformation330();updateSoundUI();mobileDisplay330?.paint();}
async function fullscreen(silent=false){return requestDisplay330({doc:document,nav:navigator,media:q=>matchMedia(q),silent,onGuide:()=>mobileDisplay330?.guide(),onMessage:toast});}
async function begin(fresh){closeDialogs();if(fresh)session.startNew($('player-name').value);else if(!session.continue())return;renderer.ledger=new WardrobeLedger();document.body.dataset.view='game';$('title-screen').hidden=true;$('game-screen').hidden=false;titleMotion();rotateGuide();fullscreen(true);await renderCandidate(session.reader);}
function next(){clearTimeout(readingTimer);if(busy)return;markTutorial('read');if(!fullyShown){finishText();queueReading();return;}if(session.reader.current().kind==='dialogue'){readLines.mark(currentReadKey);renderCandidate(session.candidate(r=>r.next()));}}
function scheduleResize(){mobileDisplay330?.paint();stopReading();clearTimeout(resizeTimer);rotateGuide();resizeTimer=setTimeout(()=>{if(session.view==='game'){if(busy){scheduleResize();return;}renderCandidate(session.reader,{repaintOnly:true});}},180);}
function openAlbum(){closeDialogs();renderAlbum();modal('album');}
function renderAlbum(){
 const tabs=[...new Map(manifest.inventory.map(r=>[r.character,r.name]).concat([['minjun','박민준'],['gifts','선물'],['background','장소']])).entries()];
 $('album-tabs').replaceChildren(...tabs.map(([id,label])=>{const b=document.createElement('button');renderNamedText(b,label);b.dataset.albumTab=id;b.setAttribute('aria-pressed',String(albumTab===id));b.onclick=()=>{albumTab=id;renderAlbum();};return b;}));
 const list=Object.values(manifest.assets).filter(a=>albumTab==='background'?a.kind==='background':albumTab==='gifts'?a.kind==='illustration':a.kind==='character'&&a.character===albumTab&&(albumTab!=='minjun'||a.outfit==='friend'));
 const character=list.some(a=>a.kind==='character'),seen=list.filter(a=>a.kind!=='character'||album342.has(a)).length;
 if(character)list.sort((a,b)=>Number(album342.has(b))-Number(album342.has(a)));
 $('album-status342').textContent=character?`본 사진 ${seen} / ${list.length} · 플레이 중 직접 본 의상·표정·자세의 사진부터 열려.`+(!album342.storageOkay?' 이 브라우저에 앨범 기록을 저장하지 못했어. 진행 파일을 저장해 줘.':''):'장소와 선물 그림을 둘러볼 수 있어.';
 $('album-grid').replaceChildren(...list.map(a=>{
  const locked=a.kind==='character'&&!album342.has(a),b=document.createElement('button'),label=document.createElement('span');
  b.className='album-card'+(a.kind==='background'?' background':'')+(locked?' locked342':'');b.dataset.albumAsset=a.id;b.dataset.locked=String(locked);
  if(locked){
   b.disabled=true;b.setAttribute('aria-label','잠긴 사진 · 플레이 중 이 사진을 만나면 열려');const placeholder=document.createElement('span');placeholder.className='album-lock342';placeholder.textContent='🔒';placeholder.setAttribute('aria-hidden','true');label.textContent='아직 보지 않은 사진';b.append(placeholder,label);return b;
  }
  const variants=a.kind!=='character'?a.variants:a.bust,image=document.createElement('img');image.src=variants.find(v=>v.width>=384)?.url??variants.at(-1).url;image.alt=a.label;image.loading='lazy';image.decoding='async';
  label.textContent=a.label+(a.poseLabel?' · '+a.poseLabel:'');b.append(image,label);
  b.onclick=()=>{if(a.kind==='character'&&!album342.has(a))return;const full=a.kind!=='character'?a.variants:a.full?.length?a.full:a.bust;$('zoom-image').src=full.at(-1).url;$('zoom-image').alt=a.label;$('zoom-label').textContent=a.label;modal('lightbox');};return b;
 }));
}
function albumStageVisible342(){return !document.hidden&&!$('game-screen').hidden&&$('rotate-guide').hidden&&!document.querySelector('dialog[open]');}
function rememberVisibleAlbum342(){
 if(session.view!=='game'||busy||!albumStageVisible342()||!session.reader.isStory)return;
 if(album342.record(renderer.displayedAssets,{isStory:true,visible:true}))session.commit({...session.reader.export(),album342:album342.export()});
}
function exportProgress(value=session.reader.export(),filename='Spring_Signal_이어읽기_0.33.0.json'){if(value?.schema==='spring-signal-story-1'){value={...value,album342:album342.export()};const ui330=notes330.exportFor(value);if(ui330)value={...value,ui330};}if(!value){toast('아직 저장된 진행이 없어.');return;}const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
for(const button of document.querySelectorAll('[data-close]'))button.onclick=()=>$(button.dataset.close).close();
$('new-game').onclick=()=>session.saved?modal('new-confirm'):modal('name-dialog');$('confirm-new').onclick=()=>{closeDialogs();modal('name-dialog');};$('start-story').onclick=()=>begin(true);$('continue-game').onclick=()=>begin(false);
guardTitleTouches(document.querySelector('.title-menu'));
$('open-album').onclick=openAlbum;$('pause-album').onclick=openAlbum;$('open-options').onclick=()=>modal('options');$('pause-options').onclick=()=>{closeDialogs();modal('options');};$('game-options').onclick=()=>modal('options');$('game-menu').onclick=()=>modal('pause');$('resume-game').onclick=()=>$('pause').close();$('back-title').onclick=showTitle;$('rotate-to-title').onclick=showTitle;
$('fullscreen').onclick=()=>fullscreen();$('options-fullscreen').onclick=()=>fullscreen();$('next').onclick=e=>{e.stopPropagation();next();};$('previous').onclick=e=>{e.stopPropagation();if(!busy){finishText();if(session.reader.isStory)openLog();else renderCandidate(session.candidate(r=>r.previous()));}};$('dialogue-text').onclick=next;$('speaker').onclick=next;
$('next-event').onclick=e=>{e.stopPropagation();if(busy)return;if(session.reader.isStory||manifest.events.at(-1).id===session.reader.event.id){showTitle();return;}renderCandidate(session.candidate(r=>r.nextEvent()));};$('again').onclick=()=>{if(!busy){closeDialogs();renderCandidate(session.candidate(r=>r.chooseAgain()));}};
const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='확인할 행사를 선택해 줘';$('events').replaceChildren(placeholder,...manifest.events.map(e=>{const o=document.createElement('option');o.value=e.id;o.textContent=e.label;return o;}));$('events').onchange=()=>{const id=$('events').value;if(developmentTools340(manifest)&&!busy&&id){closeDialogs();renderer.ledger=new WardrobeLedger();renderCandidate(session.previewEvent(id));}};
$('export-save').onclick=()=>exportProgress();$('export-backup').hidden=!session.backup;$('export-backup').onclick=()=>exportProgress(session.backup,'Spring_Signal_개정전_기록.json');$('migration-note').hidden=!session.migrationNotice;
$('import-save').onclick=()=>$('load-file').click();$('load-file').onchange=async()=>{const file=$('load-file').files[0];if(!file)return;try{if(file.size>524288)throw Error('파일이 너무 커.');const received=JSON.parse(await file.text()),candidate=session.import(received);if(received.ui330)try{notes330.importFor(candidate,received.ui330);}catch(e){toast(e.message);}$('export-backup').hidden=!session.backup;$('migration-note').hidden=!session.migrationNotice;session.view='game';renderer.ledger=new WardrobeLedger();document.body.dataset.view='game';$('title-screen').hidden=true;$('game-screen').hidden=false;titleMotion();closeDialogs();rotateGuide();await renderCandidate(candidate);if(session.migrationNotice)toast(session.migrationMessage);}catch{toast('이 게임의 진행 파일인지 확인해 줘. 기존 기록은 유지했어.');}finally{$('load-file').value='';}};
$('title-music330').onclick=()=>{if(sound.status.playing.includes('music-330-title-warm')){updateSoundSettings({titleMusicEnabled:false});return;}updateSoundSettings({titleMusicEnabled:true,muted:false,masterVolume:settings.masterVolume||.7,musicVolume:settings.musicVolume||.3});unlockSound();};
$('title-music-enabled330').onchange=()=>updateSoundSettings({titleMusicEnabled:$('title-music-enabled330').checked});
$('sound-muted').onchange=()=>updateSoundSettings({muted:$('sound-muted').checked});
for(const [id,key]of [['master-volume','masterVolume'],['ambience-volume','ambienceVolume'],['effects-volume','effectsVolume'],['music-volume','musicVolume']])$(id).oninput=()=>updateSoundSettings({[key]:Number($(id).value)/100});
function updateSoundSettings(next){settings=normalizedSettings({...settings,...next});try{storage?.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch{}sound.setSettings(settings);if(!settings.muted&&settings.masterVolume)unlockSound();updateSoundUI();}
$('resume-sound').onclick=()=>{unlockSound();};
$('test-message-sound').onclick=async()=>{await sound.unlock();sound.play('message',{character:$('alert-voice').value});};
$('test-phone-sound').onclick=async()=>{await sound.unlock();sound.play('phone-ring');};
$('font-size').oninput=()=>updateSettings({fontScale:Number($('font-size').value)/100});$('text-speed').onchange=()=>{finishText();updateSettings({textSpeed:Number($('text-speed').value)});};$('quality').onchange=()=>updateSettings({quality:$('quality').value});$('motion').onchange=()=>updateSettings({motion:$('motion').checked});
$('title-petals').onerror=()=>$('title-petals').hidden=true;
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||['SELECT','INPUT','BUTTON','TEXTAREA'].includes(document.activeElement?.tagName))return;if(e.key==='Escape'&&session.view==='game'){modal('pause');return;}if(session.view!=='game')return;if([' ','ArrowRight'].includes(e.key)){e.preventDefault();next();}else if(e.key==='ArrowLeft'&&!busy){e.preventDefault();finishText();if(session.reader.isStory)openLog();else renderCandidate(session.candidate(r=>r.previous()));}});
window.addEventListener('resize',scheduleResize);window.addEventListener('orientationchange',scheduleResize);document.addEventListener('fullscreenchange',scheduleResize);window.visualViewport?.addEventListener('resize',scheduleResize);
applySettings();showTitle();

$('open-phone').onclick=()=>openPhone();$('open-calendar').onclick=openCalendar;$('notice-open').onclick=()=>openPhone(noticeCharacter);$('notice-dismiss').onclick=()=>{$('message-notice').hidden=true;};
$('weekly-plan').onclick=openCalendar;$('calendar-prev').onclick=()=>{shownCalendarWeek=Math.max(1,shownCalendarWeek-1);paintCalendar();};$('calendar-next').onclick=()=>{shownCalendarWeek=Math.min(story.maxWeek??8,shownCalendarWeek+1);paintCalendar();};
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener?.('close',()=>{
 if(dialog.id==='album'){$('album-grid').replaceChildren();$('album-tabs').replaceChildren();}
 if(dialog.id==='lightbox'){$('zoom-image').removeAttribute('src');$('zoom-image').alt='';}
 setTimeout(()=>{rememberVisibleAlbum342();guide();},0);
});

function openMemories(){closeDialogs();const list=$('memories-list');list.replaceChildren();$('memories-summary').textContent=`끝까지 읽은 결말 ${memories.entries.length}개 · 아직 기록하지 않은 결말 ${ENDING_COUNT-memories.entries.length}개`;
 for(const e of memories.entries){const b=document.createElement('button');b.className='memory-card';b.textContent=e.title+' · '+e.playerName;b.onclick=()=>{memoryId=e.id;memoryHistory=false;memoryPage=0;paintMemory();};list.append(b);}
 $('memories-warning').textContent=memories.invalidCount?'검증하지 못한 기록이 있어. 현재 진행에는 영향을 주지 않아.':!memories.collectionOkay?'결말 모음 저장을 확인해 줘. 현재 진행은 따로 보관돼.':'';
 $('memory-view').hidden=true;modal('memories');
}
function paintMemory(){const view=memories.recall(memoryId,{history:memoryHistory,page:memoryPage});memoryPage=view.page;$('memory-title').textContent=view.title+' · '+view.playerName;$('memory-page').textContent=`${view.page+1} / ${view.pages}`;$('memory-prev').disabled=view.page<=0;$('memory-next').disabled=view.page+1>=view.pages;
 $('memory-lines').replaceChildren(...view.lines.map(l=>{const p=document.createElement('p'),who=document.createElement('strong');paintName(who,l.speaker,l.speaker==='player'||l.speaker==='narrator'?view.playerName:names[l.speaker]??'나');p.append(who,document.createTextNode(' · '+l.text));return p;}));$('memory-view').hidden=false;
}
$('open-memories').onclick=openMemories;$('pause-memories').onclick=openMemories;
$('memory-ending').onclick=()=>{memoryHistory=false;memoryPage=0;paintMemory();};$('memory-history').onclick=()=>{memoryHistory=true;memoryPage=0;paintMemory();};$('memory-prev').onclick=()=>{memoryPage--;paintMemory();};$('memory-next').onclick=()=>{memoryPage++;paintMemory();};
$('export-memories').onclick=()=>exportProgress(memories.export(),'Spring_Signal_결말모음_0.20.0.json');$('import-memories').onclick=()=>$('memories-file').click();
$('memories-file').onchange=async()=>{const f=$('memories-file').files?.[0];if(!f)return;try{if(f.size>5000000)throw Error('결말 모음 파일이 너무 커.');memories.import(JSON.parse(await f.text()));openMemories();toast('검증한 결말 기록을 모음에 더했어. 현재 진행은 그대로야.');}catch(e){toast(e.message);}finally{$('memories-file').value='';}};

$('auto-read').onclick=e=>{e.stopPropagation();toggleReading('auto');};
$('skip-read').onclick=e=>{e.stopPropagation();toggleReading('skip');};
document.addEventListener('visibilitychange',()=>{rememberVisibleAlbum342();if(document.hidden)stopReading();sound.setHidden(Boolean(document.hidden));if(!sound.context)void startTitleAutoplay341(sound,{visible:!document.hidden});});
const playerTools320=installPlayerTools({session,manifest,storage,names,modal,closeDialogs,toast,pinnedFor:(r,c)=>notes330.pinned(r,c),onLoad:async snapshot=>{const candidate=session.import(snapshot);session.view='game';renderer.ledger=new WardrobeLedger();document.body.dataset.view='game';$('title-screen').hidden=true;$('game-screen').hidden=false;titleMotion();closeDialogs();rotateGuide();await renderCandidate(candidate);}});

window.addEventListener('pagehide',()=>sound.setHidden(true));
window.addEventListener('pageshow',()=>{rememberVisibleAlbum342();sound.setHidden(Boolean(document.hidden));if(!sound.context)void startTitleAutoplay341(sound,{visible:!document.hidden});experienceUI320?.recordReturn();});

$('phone').addEventListener('close',()=>{sound.stopSong();songButtons300=[];});

experienceUI320=installExperience320({session,manifest,storage,names,sound,getSettings:()=>settings,updateSettings,modal,closeDialogs,openCalendar,openPhone,openNotes:playerTools320.openNotes,openSlots:playerTools320.openSlots,informationRows:()=>playerUI330?.infoRows()??[]});
playerUI330=installPlayerNotes330({session,notes:notes330,names,getSettings:()=>settings,updateSettings,modal,closeDialogs,toast,openPhone});
mobileDisplay330=installMobileDisplay330({session,modal,onExport:value=>exportProgress(value),onImport:()=>$('load-file').click()});paintInformation330();

void startTitleAutoplay341(sound,{visible:!document.hidden});
