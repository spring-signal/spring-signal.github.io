import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
import {MINJUN300,DOA300,GIFT_TASTES300,FOLLOWUP300,FOCUS300} from './continuity-content-300.mjs?v=310';
import {PHOTOS300,SONGS300} from './life-data-300.mjs?v=300';
const people=['seoyeon','jiwoo','haerin','yuna','minseo','doa'],names={seoyeon:'서연',jiwoo:'지우',haerin:'해린',yuna:'유나',minseo:'민서',doa:'도아'},days={mon:'월요일',tue:'화요일',wed:'수요일',thu:'목요일',fri:'금요일',sat:'토요일',sun:'일요일'};
const F=(key,value=true,when)=>({type:'flag',key,value,when}),H=(flag,value=true)=>({flag,value}),N=not=>({not}),A=(...all)=>({all:all.filter(Boolean)}),O=(...any)=>({any}),E=id=>({type:'experience',id}),R=c=>({type:'relation',character:c,affection:0,trust:1}),C=(id,label,next,effects=[],when)=>({id,label,next,effects,when}),M=(id,c,text,extra={})=>({type:'message',id,character:c,text,authored280:true,...extra});
const L=(text,speaker='narrator',extra={})=>({speaker,text,cast:people.includes(speaker)?[speaker]:[],stageCast:people.includes(speaker)?[speaker]:[],...(people.includes(speaker)?{shot:'medium',pose:'front',to:'player'}:{}),...extra});
const convert=rows=>rows.map(r=>L(r.text,r.speaker));
const promiseText={seoyeon:['다음에는 서로 한 쪽만 써 와서 첫 문장부터 읽어 볼까요?','써 온 한 쪽을 나란히 펴고 첫 문장을 번갈아 읽었다. 서연은 고쳐 줄 곳보다 어디서 숨을 쉬었는지부터 말했다.'],jiwoo:['다음에 카메라 없이 한 바퀴만 더 걸을래? 기억나는 건 집 가서 말해 보고.','카메라는 가방에 둔 채 잠깐 걸었다. 지우는 찍지 않고 지나친 장면 하나를 말했고, 나는 다른 장면을 덧붙였다.'],haerin:['다음엔 시장 끝까지 구경만 하자. 뭐 안 사고 와도 약속 지킨 걸로.','시장에서 서로 다른 가게를 구경하고 봉투 없이 돌아왔다. 해린은 사고 싶었던 것과 그냥 보는 게 좋았던 것을 따로 이야기했다.'],yuna:['다음에는 식기 전에 따뜻한 거 같이 먹자. 나도 앉아서 첫 입부터 먹고.','유나는 남의 접시부터 챙기려다 자기 숟가락을 먼저 들었다. 따뜻할 때 첫 입을 먹고 나서 서로의 하루를 물었다.'],minseo:['다음에는 늘 가던 길에서 반대쪽으로 조금 걸어 볼까요?','익숙한 길에서 방향을 바꿔 잠깐 걸었다. 민서는 치수를 재지 않고 마음에 드는 그늘 하나를 골랐다.'],doa:['다음에는 예전에 좋아하던 것 말고 지금 궁금한 차를 같이 골라 봐요.','도아와 메뉴판을 처음 보는 사람처럼 읽고 각자 궁금한 차를 골랐다. 서로의 잔을 바꾸지는 않고, 마셔 본 느낌부터 들려줬다.']};
const photoText={seoyeon:'책갈피를 엉뚱한 쪽에 끼웠는데, 거기서 읽은 문장이 더 오래 남았어요. 아까 카페에서 펴 둔 공책이에요.',jiwoo:'어제 저녁에 카메라 없이 걷다가 폰으로 한 장만 찍었어. 같은 학교인데 하늘 때문에 좀 달라 보이네.',haerin:'접은 선이 조금 틀렸는데 완성하니까 이쪽도 괜찮네. 오늘은 안 펴고 남겨 두려고.',yuna:'가게 음식 말고 내가 먹으려고 만든 아침이야. 모양은 이래도 따뜻할 때 먹으니까 좋더라.',minseo:'앉아 보기 전에 그림자가 먼저 보여서 찍었어요. 오늘은 크기를 안 재고 그냥 보고 왔어요.',doa:'어제 퇴근하고 명찰을 빼고 앉았을 때 찍었어요. 업무 메모를 덮은 쪽도 보여 주고 싶었어요.'};
const songFor={seoyeon:'piano-tender',jiwoo:'band-campus',haerin:'band-festival',yuna:'piano-daily',minseo:'piano-reflect',doa:'piano-tender'};
const songText={seoyeon:'원고를 덮고 이 연주를 들었어요. 오늘은 문장으로 정리하지 않은 기분도 좀 남겨 두고 싶어서요. 선배는 어떤 때 음악을 들어요?',jiwoo:'편집 끝내고 이 곡 들으면서 걸었어. 영상에 넣을 생각 없이 듣는 것도 좋더라. 너라면 어디 걸을 때 듣고 싶어?',haerin:'오늘은 접은 선 다시 안 펴고 이 곡 틀어 놨어. 잘 맞췄는지 확인하는 시간 말고 그냥 신나는 시간도 좀 있어야겠더라.',yuna:'가게 정리할 때 말고 집에 와서 내 쉬는 시간에 들은 곡이야. 너도 오늘 하루 끝나면 잠깐 앉아서 들어 봐.',minseo:'오늘은 다른 일을 켜 놓지 않고 이 연주만 들어 봤어요. 남는 시간이 조금 다르게 느껴졌어요. 들으면서 떠오른 게 있으면 다음에 알려 주세요.',doa:'퇴근길에 업무 대화창을 닫고 들었어요. 요즘 제가 고른 곡도 보내 보고 싶었어요. 다음에는 네가 듣는 것도 궁금해요.'};
const photoReply={seoyeon:'책갈피가 공책 옆에 놓인 게 먼저 보였어요. 오늘은 어떤 문장이 남았는지도 다음에 들려주세요.',jiwoo:'하늘 빛이 먼저 눈에 들어오네. 매일 보던 학교도 네가 찍은 쪽으로 보니까 다르다.',haerin:'조금 틀린 선도 그대로 남겨 둔 게 좋다. 사진 보여 줘서 고마워. 완성한 얘기도 다음에 듣고 싶어.',yuna:'네가 먹으려고 만든 아침이라니까 더 반갑다. 따뜻할 때 잘 먹었다니 다행이네.',minseo:'계단에 생긴 그늘이 먼저 보였어요. 다음에 그 길 지날 때는 저도 잠깐 멈춰 보고 싶네요.',doa:'덮어 둔 수첩 옆의 차가 먼저 보였어요. 오늘은 어떤 맛으로 골랐는지도 다음에 듣고 싶어요.'};

export function campaign300(base){
 const map=new Map(base.nodes.map(n=>[n.id,n])),changed=new Set(),incoming=new Map();
 const edit=id=>{if(!map.has(id))throw Error('Missing continuity anchor '+id);if(!changed.has(id)){map.set(id,structuredClone(map.get(id)));changed.add(id);}return map.get(id);};
 const targetIds=x=>typeof x==='string'?[x]:(x??[]).map(v=>v.node),retarget=(x,from,to)=>typeof x==='string'?(x===from?to:x):x?.map(v=>({...v,node:v.node===from?to:v.node}));
 const index=n=>{for(const target of [...targetIds(n.next),...(n.choices??[]).flatMap(c=>targetIds(c.next))]){if(!incoming.has(target))incoming.set(target,new Set());incoming.get(target).add(n.id);}};for(const n of map.values())index(n);
 const before=(target,id)=>{if(!map.has(target))return false;for(const sourceId of [...(incoming.get(target)??[])]){const n=map.get(sourceId);if(targetIds(n.next).includes(target)||n.choices?.some(c=>targetIds(c.next).includes(target))){const e=edit(n.id);e.next=retarget(e.next,target,id);if(e.choices)e.choices=e.choices.map(c=>({...c,next:retarget(c.next,target,id)}));index(e);}}return true;};
 const make=(id,source,cast,lines,next,extra={})=>{
  const n={...source,id,label:`${source.week}주 ${days[source.weekday]} · ${extra.title??'이어지는 일상'}`,cast,lines,next,choices:undefined,effects:undefined,exitEffects:undefined,when:undefined,giftTarget280:undefined,...extra};
  n.venueOrigin310=source.venueOrigin310??source.id;n.day=`story-w${String(n.week).padStart(2,'0')}-${n.weekday}`;n.outfits={...wardrobeFor(n),...source.outfits,...extra.outfits};if(cast.includes('doa')&&!n.outfits.doa&&n.week>=9&&n.week<15)n.outfits.doa='mid130a';
  if(cast.length===1)n.lines=n.lines.map(l=>l.speaker==='player'&&!l.cast.length?{...l,cast:[...cast],stageCast:[...cast]}:l);
  n.migrationNext300=extra.migrationNext300??(typeof next==='string'?next:next?.find(v=>!v.when)?.node);if(!n.migrationNext300)throw Error('Missing migration return '+id);
  if(n.timeOfDay==='evening')n.lighting280='dusk';map.set(id,n);changed.add(id);index(n);return n;
 };
 const source=(week,weekday,bg='bg.home_day')=>({week,weekday,background:bg,location:bg.includes('home')?'home':bg.includes('market')?'market':'cafe',season:week>=17?'summer':week>=9?'earlySummer':'spring',timeOfDay:bg.endsWith('_night')?'night':'day',wardrobeRevision:'0.9.0',outfits:{}});
 const contact=c=>({contact:c}),after=(day,flag)=>({dayAfterFlag300:{day,flag}}),free=(week,day,start,end,exclude)=>({slotFree300:{week,day,start,end,exclude}});
 // 1: The player's actual earlier focus is asked about, without asserting progress.
 for(const w of [6,9,12,15,17,20,23]){
  const anchor='R280_MINJUN'+w,old=map.get(anchor),id='R300_FOCUS'+w;before(anchor,id);
  make(id,old,[],Object.entries(FOCUS300).flatMap(([key,rows])=>convert(rows).map(l=>({...l,when:H('player280Focus',key)}))),null,{title:'전에 꺼냈던 내 마음',when:O(...['connection','balance','fear'].map(v=>H('player280Focus',v))),migrationNext300:anchor,choices:[C('changed','그 뒤 실제로 해 본 작은 일을 들려준다.',id+'_YES',[F('focus300Latest','changed')]),C('still','아직 같은 고민을 하고 있다고 솔직히 말한다.',id+'_STILL',[F('focus300Latest','still')])]});
  make(id+'_YES',old,[],[L('대단한 결과 말고 네가 해 본 얘기라서 듣고 싶었어. 나도 이따 내 얘기 하나 할게.','minjun')],anchor,{title:'내가 직접 해 본 것'});
  make(id+'_STILL',old,[],[L('그럴 수도 있지. 오늘도 같은 얘기라고 빨리 결론 낼 필요는 없잖아. 나도 아직 못 정한 게 있어.','minjun')],anchor,{title:'아직 모르는 채로 이어서'});
 }
 // 2: Minjun's own five-stage story, one eligible chapter per real conversation.
 for(const w of [6,9,12,15,17,20,23]){
  const roots=['connection','balance','fear','keep'].map(k=>map.get(`R280_MINJUN${w}_${k}`)),back=roots[0].next,p='R300_BUDDY'+w;
  for(const n of roots)edit(n.id).next=p;
  const eligible=MINJUN300.map((d,i)=>({when:A({flag:'minjun300Stage',value:i||undefined},w>=d.week?null:H('never300')),node:p+'_STAGE'+(i+1)}));
  // Stage zero has no flag yet; later stages require their actual previous result.
  eligible[0].when=w>=MINJUN300[0].week?N({flag:'minjun300Stage'}):H('never300');
  make(p,roots[0],[],[L('민준은 내 얘기를 다 듣고 나서 자기 휴대폰을 꺼냈다. 이번에는 내가 민준의 말을 기다렸다.')],[...eligible,{node:back}],{title:'이번에는 민준의 하루',when:O(...eligible.map(v=>v.when)),migrationNext300:back});
  for(const [i,d]of MINJUN300.entries()){
   const id=p+'_STAGE'+(i+1),lines=[];
   if(d.previousChoiceFollowup)for(const [key,text]of Object.entries(d.previousChoiceFollowup))lines.push(L(text,'minjun',{when:H('minjun300Choice'+i,key)}));
   lines.push(...convert(d.opening));
   if(d.outcomes?.submitted)lines.push(...convert(d.outcomes.submitted).map(l=>({...l,when:H('minjun300Submitted')})),...convert(d.outcomes.notSubmitted).map(l=>({...l,when:N(H('minjun300Submitted'))})));
   if(d.outcomes?.mtAttended){const attended=O(...['sea','valley','pool'].map(v=>({experience:'summer-mt-'+v})));lines.push(...convert(d.outcomes.mtAttended).map(l=>({...l,when:attended})),...convert(d.outcomes.mtSkipped).map(l=>({...l,when:N(attended)})));}
   make(id,roots[0],[],lines,null,{title:`민준 이야기 ${i+1} · ${d.title}`,migrationNext300:back,choices:[...d.choices.map(c=>C(c.id,c.label,id+'_'+c.id)),C('later','오늘은 가볍게 밥 먹고 다음에 더 듣기로 한다.',back)]});
   for(const c of d.choices)make(id+'_'+c.id,roots[0],[],convert(c.response),back,{title:d.title,exitEffects:[F('minjun300Stage',i+1),F('minjun300Choice'+(i+1),c.id),...(i===1&&c.id==='practical'?[F('minjun300Submitted')]:[]),E('minjun300-stage-'+(i+1))]});
  }
 }
 // 3/5/6: Real completed meetings lead to present-day Doa chapters, tastes and small promises.
 const ends=[...map.values()].filter(n=>n.giftTarget280&&people.includes(n.giftTarget280));
 for(const n of ends){
  const c=n.giftTarget280,p='R300_END_'+n.id,back=n.next;edit(n.id).next=p;
  const taste=p+'_TASTE',promise=p+'_PROMISE',remember=p+'_REMEMBER',doa=p+'_DOA';
  make(p,n,[c],[L('헤어지기 전에 오늘 못 다 한 말을 잠깐 더 나눴다.')],c==='doa'?doa:taste,{title:'다음에 남길 말',migrationNext300:back});
  if(c==='doa'){
   const gates=DOA300.map((d,i)=>({when:A(i?H('doa300Stage',i):N({flag:'doa300Stage'}),n.week>=d.week?null:H('never300')),node:doa+'_'+(i+1)}));
   make(doa,n,[c],[L('도아는 예전 얘기 뒤에 오늘 자기 쪽에서 있었던 일을 하나 덧붙였다.')],[...gates,{node:taste}],{title:'요즘의 도아',when:O(...gates.map(v=>v.when)),migrationNext300:back});
   for(const [i,d]of DOA300.entries()){
    const id=doa+'_'+(i+1);
    make(id,n,[c],convert(d.opening),null,{title:`도아의 요즘 ${i+1} · ${d.title}`,when:N(H('doa300Week',n.week)),next:taste,migrationNext300:back,choices:d.choices.map(ch=>C(ch.id,ch.label,id+'_'+ch.id))});
    for(const ch of d.choices)make(id+'_'+ch.id,n,[c],convert(ch.response),taste,{title:d.title,exitEffects:[F('doa300Stage',i+1),F('doa300Week',n.week),F('doa300Choice'+(i+1),ch.id),M('doa300-stage-'+(i+1),'doa',d.laterMessages?.[ch.id]??d.laterMessage),E('doa300-stage-'+(i+1))]});
   }
  }
  const pref=GIFT_TASTES300[c];
  make(taste,n,[c],[L('늘 추천해 주는 것 말고 본인이 자주 쓰거나 좋아하는 것도 궁금해졌다.')],promise,{title:'대화에서 알게 된 취향',when:A(n.week>=6?null:H('never300'),N(H('gift300Asked_'+c)),N(H('gift300Deferred_'+c,n.week)),c==='doa'?N(H('doa300Week',n.week)):null),migrationNext300:back,choices:[C('ask','요즘 본인이 좋아하는 물건이나 맛을 묻는다.',taste+'_YES',[F('gift300Asked_'+c),F('gift300Known_'+c)]),C('later','오늘 나눈 이야기로 충분하다고 생각하며 인사한다.',promise,[F('gift300Deferred_'+c,n.week)])]});
  make(taste+'_YES',n,[c],[L(pref.line,c),L('상대가 직접 들려준 취향을 기억해 뒀다. 선물의 정답을 정한 건 아니었다.')],promise,{title:'직접 들어 알게 된 것'});
  make(promise,n,[c],[L(promiseText[c][0],c)],remember,{title:'둘이 남기는 작은 약속',when:A(N(H('promise300Asked_'+c)),N(H('promise300AskedLater_'+c,n.week)),{dateCount300:{character:c,min:3}},c==='doa'?N(H('doa300Week',n.week)):null),migrationNext300:back,choices:[C('accept','좋다고 답하고 다음에 같이 해 보기로 한다.',remember,[F('promise300Asked_'+c),F('promise300Pending_'+c),F('promise300Day_'+c,n.day)]),C('later','확답은 미루고 오늘의 이야기에 고맙다고 한다.',remember,[F('promise300AskedLater_'+c,n.week)])]});
  make(remember,n,[],[L('오늘 나눈 말을 다음 만남에서도 기억하고 싶었다.')],back,{title:'오늘의 기억',effects:[F('memory300Ready_'+c),F('memory300Day_'+c,n.day),...(/^R280_NPC/.test(n.id)?[F('memory300Mode_'+c,'listen',H('npc280Memory_'+c,'listen')),F('memory300Mode_'+c,'share',H('npc280Memory_'+c,'share'))]:[F('memory300Mode_'+c,'daily')])]});
 }
 // New gift use is recorded after actual giving, never retroactively on old saves.
 for(const n of [...map.values()].filter(n=>/^R280_GIFT_/.test(n.id)&&/_(bookmark|notebook|tea)$/.test(n.id))){
  const match=n.id.match(/_(bookmark|notebook|tea)$/),gift=match[1],c=n.cast[0],p='R300_GIVEN_'+n.id,back=n.next;edit(n.id).next=p;
  make(p,n,[],[L('건넨 물건과 그날 나눈 이야기를 함께 기억해 뒀다.')],back,{title:'실제로 건넨 선물',effects:[F('gift300Pending_'+c+'_'+gift),F('gift300Day_'+c+'_'+gift,n.day)]});
 }
 // Follow-ups occur on a different actual day, at a real meeting arrival.
 const arrivals=[...map.values()].filter(n=>n.cast?.length===1&&people.includes(n.cast[0])&&n.appointmentId&&(/_ARRIVE$/.test(n.id)||/^R280_NPC\d+_[AB]_GATE_[a-z]+$/.test(n.id)||/^R280_LUNCH\d+_[a-z]+$/.test(n.id)));
 for(const n of arrivals){
  const c=n.cast[0],p='R300_RECALL_'+n.id;before(n.id,p);const use=p+'_USE',promise=p+'_PROMISE';
  make(p,n,[c],[L(FOLLOWUP300[c].listen,c,{when:H('memory300Mode_'+c,'listen')}),L(FOLLOWUP300[c].share,c,{when:H('memory300Mode_'+c,'share')}),L(['jiwoo','haerin','yuna'].includes(c)?'지난번에 잠깐 얘기 나눈 뒤에 네 하루도 궁금했어. 오늘은 어떻게 지냈어?':'지난번에 잠깐 이야기 나눈 뒤에 오늘은 어떻게 지냈는지 궁금했어요.',c,{when:H('memory300Mode_'+c,'daily')})],use,{title:'지난번 얘기의 그 뒤',when:A(H('memory300Ready_'+c),after(n.day,'memory300Day_'+c)),exitEffects:[F('memory300Ready_'+c,false),F('memory300Followed_'+c),E('memory300-followup-'+c)],migrationNext300:n.id});
  const uses=['bookmark','notebook','tea'].map(g=>({when:A(H('gift300Pending_'+c+'_'+g),after(n.day,'gift300Day_'+c+'_'+g)),node:use+'_'+g}));
  make(use,n,[c],[L('전에 건넸던 물건이 오늘의 일상 속에 다시 보였다.')],[...uses,{node:promise}],{title:'선물이 쓰이는 날',when:O(...uses.map(x=>x.when)),migrationNext300:n.id});
  for(const g of ['bookmark','notebook','tea'])make(use+'_'+g,n,[c],[L(g===GIFT_TASTES300[c].item?GIFT_TASTES300[c].followup:(['seoyeon','minseo','doa'].includes(c)?{bookmark:'전에 준 책갈피로 읽던 쪽을 표시해 뒀어요. 다음에 어디까지 읽었는지도 이야기해 줄게요.',notebook:'전에 준 수첩에 생각나는 걸 적어 봤어요. 정리된 이야기만 쓰지 않아도 되더라고요.',tea:'전에 준 차를 집에서 마셨어요. 잠깐 쉬는 시간을 따로 만드는 데 좋았어요.'}:{bookmark:'전에 준 책갈피로 읽던 쪽을 표시해 뒀어. 다음에 어디까지 읽었는지도 얘기해 줄게.',notebook:'전에 준 수첩에 생각나는 걸 적어 봤어. 정리된 얘기만 쓰지 않아도 되더라.',tea:'전에 준 차를 집에서 마셨어. 잠깐 쉬는 시간을 따로 만드는 데 좋더라.'})[g],c)],promise,{title:'물건에 남은 다음 이야기',exitEffects:[F('gift300Pending_'+c+'_'+g,false),F('gift300Used_'+c+'_'+g),E('gift300-used-'+c+'-'+g)]});
  make(promise,n,[c],[L('지난번 다음에 같이 해 보자던 작은 약속이 떠올랐다.')],n.id,{title:'작은 약속을 꺼내며',when:A(H('promise300Pending_'+c),after(n.day,'promise300Day_'+c),N(H('promise300Deferred_'+c,n.week))),migrationNext300:n.id,choices:[C('keep','오늘 그 작은 약속을 함께 해 본다.',promise+'_DONE'),C('later','오늘은 여건을 이야기하고 다음 만남에 이어 가기로 한다.',n.id,[F('promise300Deferred_'+c,n.week)])]});
  make(promise+'_DONE',{...n,background:({jiwoo:'bg.campus_day',haerin:'bg.market_day',minseo:'bg.campus_day'}[c]??'bg.cafe_day'),location:({jiwoo:'campus',haerin:'market',minseo:'campus'}[c]??'cafe')},[c],[L(promiseText[c][1]),L('거창한 날짜가 아니어도 둘이 기억한 말 하나가 오늘의 일이 됐다.')],n.id,{title:'기억하고 지킨 약속',venueDetached310:true,exitEffects:[F('promise300Pending_'+c,false),F('promise300Kept_'+c),E('promise300-kept-'+c)]});
 }
 // 4/6: Modest daily attachments, actual local songs, and contact anniversaries.
 for(let w=3;w<=24;w++){
  const anchor=map.has(`R280_INBOX${w}_A`)?`R280_INBOX${w}_A`:null;if(!anchor)continue;const p='R300_PHONE'+w;before(anchor,p);const ids=[];
  for(const [i,c]of people.entries()){
   const photo=p+'_PHOTO_'+c,song=p+'_SONG_'+c,ann=p+'_ANN_'+c;ids.push(photo,song,ann);
   make(photo,source(w,'tue'),[],[L('약속 상담과는 별개로 오늘의 사진이 도착했다.'),L('“'+photoText[c]+'”')],song,{title:names[c]+'의 오늘 한 장',when:A(contact(c),N(H('photo300Sent_'+c)),N(H('photo300Week',w)),w>=(c==='doa'?10:i+3)?null:H('never300')),effects:[M(photo,c,photoText[c],{media:PHOTOS300[c]}),F('photo300Sent_'+c),F('photo300Week',w)],migrationNext300:anchor,choices:[C('reply','사진에서 눈에 들어온 것을 이야기하며 답한다.',photo+'_REPLY'),C('later','대화창에 남겨 두고 나중에 천천히 본다.',song)]});
   make(photo+'_REPLY',source(w,'tue'),[],[L('사진 속 사소한 부분을 하나 짚어 답장을 보냈다. 서로의 하루가 조금 더 구체적으로 보였다.')],song,{title:'사진 뒤에 이어진 말',effects:[M(photo+'-out',c,photoReply[c],{direction:'out'}),F('photo300Replied_'+c)]});
   const track=SONGS300[songFor[c]];
   make(song,source(w,'tue'),[],[L('오늘 듣던 연주곡이라며 링크 대신 재생할 수 있는 짧은 음악 메시지가 왔다.')],ann,{title:names[c]+'가 고른 한 곡',when:A(contact(c),N(H('song300Sent_'+c)),N(H('song300Week',w)),w>=7+i?null:H('never300')),effects:[M(song,c,songText[c],{media:track}),F('song300Sent_'+c),F('song300Week',w)],migrationNext300:anchor});
   make(ann,source(w,'tue'),[],[L('처음 개인 번호를 나눴던 때를 떠올리는 짧은 문자가 왔다.')],null,{title:'번호를 나눈 지 네 주',when:A(contact(c),{contactAnniversary300:{character:c,week:w,weeks:4}},N(H('anniversary300_'+c))),effects:[M(ann,c,({seoyeon:'번호 나눈 지 벌써 네 주쯤 됐네요. 처음 보낸 인사보다 오늘 보낼 말은 덜 고르고 있어요.',jiwoo:'번호 저장한 지 벌써 네 주네. 이제 용건 없어도 대화창 잘 열게 된다.',haerin:'번호는 오래 알던 이름으로 저장했는데 요즘 네 얘기는 새로 듣는 게 많네. 이 번호 나눈 지 네 주쯤 됐더라.',yuna:'개인 번호 나눈 지 네 주쯤 됐네. 메뉴 물어보는 얘기 말고 네 하루 듣는 것도 좋더라.',minseo:'번호 나눈 지 네 주쯤 됐어요. 질문을 다 정리하지 않아도 먼저 보내 볼 수 있게 됐네요.',doa:'개인 번호를 다시 나눈 지 네 주쯤 됐어요. 예전에 알던 이름 옆에 요즘 이야기가 붙은 게 좋아요.'})[c]),F('anniversary300_'+c),E('anniversary300-'+c)],migrationNext300:anchor});
  }
  for(let i=0;i<ids.length;i++){const n=map.get(ids[i]);if(ids[i].includes('_ANN_'))n.next=ids[i+1]??anchor;}
  make(p,source(w,'tue'),[],[L('밖에 나갈 준비를 하다가 개인 대화창을 잠깐 확인했다.')],ids[0],{title:'먼저 도착한 일상',migrationNext300:anchor});
 }
 // 7: Independent invitation choices really alter duration/day and their scene date.
 for(const n of [...map.values()].filter(n=>/^R280_INBOX\d+_[AB]$/.test(n.id)&&n.choices?.some(c=>c.id==='accept'))){
  const [,wText,slot]=n.id.match(/^R280_INBOX(\d+)_([AB])$/),w=+wText,id=`npc280-w${w}-${slot}`,d=slot==='A'?'thu':'fri',time=slot==='A'?'19:30':'20:00',end=slot==='A'?'20:10':'20:40',shortEnd=slot==='A'?'19:50':'20:20',altDay=slot==='A'?'fri':'sat',altStart=slot==='A'?'19:10':'11:00',altEnd=slot==='A'?'19:45':'11:40',mode=`npc300Mode${w}${slot}`,answer=n.id+'_ANSWER';
  const e=edit(n.id);e.choices.find(c=>c.id==='accept').hideWhen=N(free(w,d,time,end,id));
  e.choices.splice(1,0,C('short',`${days[d]} ${time}~${shortEnd} · 20분만 짧게 만나자고 제안한다.`,answer,[{type:'appointment',id,status:'confirmed',day:d,time,endTime:shortEnd,label:'짧게 만나기로 조정한 저녁',mode300:'short'},F(mode,'short'),...people.map(c=>M(n.id+'-short-'+c,c,`${days[d]} ${time}부터 ${shortEnd}까지 20분만 만나도 괜찮을까요?`,{direction:'out',when:H(`npc280Person${w}${slot}`,c)}))],free(w,d,time,shortEnd,id)),C('another',`${days[altDay]} ${altStart}~${altEnd} · 다른 날로 제안한다.`,answer,[{type:'appointment',id,status:'confirmed',day:altDay,time:altStart,endTime:altEnd,label:'서로 다른 날로 조정한 만남',mode300:'another'},F(mode,'another'),...people.map(c=>M(n.id+'-another-'+c,c,`${days[altDay]} ${altStart}~${altEnd}로 바꿔서 만나면 어떨까요?`,{direction:'out',when:H(`npc280Person${w}${slot}`,c)}))],free(w,altDay,altStart,altEnd,id)));
  const a=edit(answer);a.lines.push(L('짧게 만나기로 한 시간만 따로 달력에 고쳐 적었다.','narrator',{when:H(mode,'short')}),L(`${days[altDay]} ${altStart}, 상대도 그 시간은 가능하다고 답했다. 실제 만남도 그날로 옮겼다.`,'narrator',{when:H(mode,'another')}));
  const gate=edit(`R280_NPC${w}_${slot}_GATE`),back=gate.next.find(b=>!b.when).node;gate.when=A(gate.when,N(H(mode,'another')));gate.next=gate.next.map(b=>b.when?{...b,when:A(b.when,N(H(mode,'another')))}:b);
  const chars=people.filter(c=>map.has(gate.id+'_'+c));
  for(const c of chars){const p=`R300_SHORT${w}_${slot}_${c}`,old=map.get(gate.id+'_'+c);gate.next.unshift({when:A(H(mode,'short'),H(`npc280Person${w}${slot}`,c)),node:p});
   make(p,old,[c],[L('오늘은 20분만 만나기로 했다. 서로 다음 시간을 확인하고 가장 들려주고 싶었던 하루 한 가지씩만 꺼냈다.'),L(({seoyeon:'오늘은 급히 답을 정하지 말고 쉬는 얘기부터 할까요?',jiwoo:'오늘 제일 웃겼던 일 하나씩만 말하자. 짧게 만나도 그 정도는 되겠지.',haerin:'지금 뭐가 제일 먹고 싶어? 오늘의 입맛부터 물어볼래.',yuna:'나도 잠깐 앉아서 쉬고 싶었어. 너는 오늘 어땠어?',minseo:'오늘은 설명을 다 끝내지 않아도 괜찮겠어요. 지금 어떤 기분인지부터 들려주세요.',doa:'잠깐이라도 따로 만나니까 좋네요. 오늘 네 하루는 어땠어요?'}[c]),c)],back,{title:'짧아도 만난 저녁',exitEffects:[{type:'appointment',id,status:'completed'},{type:'date',character:c,id:p+'-date'},E('npc300-short-'+w+'-'+slot)]});
  }
  const altAnchor=slot==='A'?`R280_NPC${w}_B_GATE`:back;if(!map.has(altAnchor))continue;const alt=`R300_ALTERNATE${w}_${slot}`;before(altAnchor,alt);
  make(alt,{...source(w,altDay,'bg.cafe_day'),timeOfDay:altDay==='sat'?'day':'evening'},[],[L('달력에서 날짜를 바꿨던 만남이 오늘이다.')],[...chars.map(c=>({when:A({appointment:id,status:'confirmed'},H(mode,'another'),H(`npc280Person${w}${slot}`,c)),node:alt+'_'+c})),{node:altAnchor}],{title:'다른 날로 고른 만남',when:A({appointment:id,status:'confirmed'},H(mode,'another')),migrationNext300:altAnchor,appointmentId:id});
  for(const c of chars){const sample=map.get(gate.id+'_'+c),src={...sample,weekday:altDay,day:`story-w${String(w).padStart(2,'0')}-${altDay}`,timeOfDay:altDay==='sat'?'day':'evening',outfits:{},onDuty:{yuna:false}},p=alt+'_'+c;
   make(p,src,[c],[L('시간을 바꾼 덕분에 서두르지 않고 만날 수 있었다. 오늘은 서로의 하루에서 가장 기억나는 일을 물었다.'),L((['jiwoo','haerin','yuna'].includes(c)?'시간 바꾸자고 말해 줘서 좋았어. 못 만나는 줄 알고 혼자 정할 뻔했네.':'시간을 바꾸자고 말해 줘서 좋았어요. 서로 가능한 시간을 다시 물어볼 수 있어서요.'),c)],altAnchor,{title:'서로 가능한 날의 대화',when:A({appointment:id,status:'confirmed'},H(mode,'another')),appointmentId:id,exitEffects:[{type:'appointment',id,status:'completed'},{type:'date',character:c,id:p+'-date'},E('npc300-alternate-'+w+'-'+slot)]});
  }
 }
 return {...base,narrativeRevision:'0.30.0',presentation300:true,sourceRevision:'30',nodes:[...map.values()]};
}
