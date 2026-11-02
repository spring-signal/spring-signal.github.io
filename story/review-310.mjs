import {varyRepeated310} from './repeat-310.mjs?v=310';
// Repairs apply to the current edition while historical story snapshots stay intact.
const people=['seoyeon','jiwoo','haerin','yuna','minseo','doa'];
const all=(...rules)=>({all:rules}),flag=(key,value)=>({flag:key,value});
export function reviewContinuity310(base){
 const nodes=base.nodes.map(n=>{
  let changed=false;const next={...n};
  const origin=(n.venueOrigin310??n.id).replace(/^(?:(?:R280_(?:GIFT|SPOKEN)|R300_(?:END|GIVEN|RECALL))_)+/,'');
  if(/^(PLAN\d+_|LATE\d+_)/.test(origin)&&origin!==n.id){next.venueOrigin310=origin;changed=true;}
  if(/^R280_MINJUN3(?:_|$)/.test(n.id)){next.label=n.label.replace('수업 사이 학생식당','수업 사이의 점심');changed=true;}
  if(/^R280_MINJUN6(?:_|$)/.test(n.id)){next.label=n.label.replace('MT 다녀온 뒤의 국밥','MT 뒤 카페에서');changed=true;}
  if(/^R280_MINJUN17(?:_|$)/.test(n.id)){next.label=n.label.replace('방학 첫 주의 분식','방학 첫 주의 카페');changed=true;}
  if(/^(?:R280_MINJUN(?:12|15|20|23)(?:_|$)|R300_(?:FOCUS|BUDDY)(?:12|15|20|23)(?:_|$))/.test(n.id)){next.timeOfDay='evening';next.lighting280='dusk';next.label=n.label.replace('퇴근 뒤 작은 술집','하루 끝 시장 식탁').replace('특강 뒤 늦은 저녁','특강을 앞둔 저녁');changed=true;}
  next.lines=n.lines.map(l=>{let text=l.text;
   if(/^R280_DOA\d+_/.test(n.id))text=text.replace('접수대에서 다시 봤을 때','학교에서 다시 봤을 때');
   if(/^R280_LUNCH\d+_yuna/.test(n.id))text=text.replace('휴무라고 방 청소부터 하다가 멈췄어.','늦게 출근하는 날이라 방 청소부터 하다가 멈췄어.');
   if(n.id==='R280_MINJUN12_balance')text='생활비랑 해야 할 일 때문에 쉬는 시간에도 자꾸 계산하게 되냐? 네 저녁을 편하게 만드는 데 쓸 시간도 남겨 두면 좋겠어.';
   if(n.id==='R280_MINJUN12_fear')text='상대가 어떻게 받아들일지 정답부터 찾고 있냐? 틀리지 않으려는 마음이랑 네가 정말 하고 싶은 말부터 따로 봐도 되잖아.';
   text=text.replace('민준은 오늘 들은 특강보다 내 쪽에 오래 남은 말이 있는지 물었다.','민준은 요즘 들은 말 중에 내 쪽에 오래 남은 것이 있는지 물었다.').replace('나도 특강 듣고 갑자기 거창한 계획 세웠다가 버스에서 다 접었다.','나도 특강 듣기 전부터 거창한 계획 세웠다가 버스에서 다 접었다.');
   text=text.replace('다음 만남은 긴 외출 대신 짧은 식사로 줄였다.','다음 약속을 잡을 때는 짧은 식사부터 찾아보기로 했다.');
   if(text===l.text)return l;changed=true;return {...l,text};
  });
  if(n.choices)next.choices=n.choices.map(c=>{const label=c.label.replace('유나가 고른 한 번의 체험을 응원하고, 그 주의 만남은 짧게 잡는다.','유나가 고른 한 번의 체험을 응원하고, 다음에는 짧게 만나자고 제안한다.');if(label===c.label)return c;changed=true;return {...c,label};});
  const lunch=n.id.match(/^R280_LUNCH(\d+)$/);if(lunch){next.next=n.next.map(b=>b.when?{...b,when:all({appointment:'conversation280-w'+lunch[1],status:'confirmed'},b.when)}:b);changed=true;}
  return changed?next:n;
 });
 const map=new Map(nodes.map(n=>[n.id,n])),edit=id=>{const n={...map.get(id)};map.set(id,n);return n;};
 const oldGate='R300_ALTERNATE4_B';
 const retarget=x=>typeof x==='string'?(x===oldGate?'CHERRY04':x):x?.map(b=>({...b,node:b.node===oldGate?'CHERRY04':b.node}));
 for(const n of [...map.values()])if(n.next&&(typeof n.next==='string'?n.next===oldGate:n.next.some(b=>b.node===oldGate))){edit(n.id).next=retarget(n.next);}
 // Saturday's alternative is after Friday's festival invitation, before the 13:00 festival.
 for(const companion of people.filter(c=>c!=='doa')){
  const meet='CHERRY_MEET_'+companion,p='R310_ALTERNATE4_B_'+companion,old=map.get(oldGate),gate={...old,id:p,next:old.next.map(b=>b.when?{...b,node:p+'_'+b.node.slice((oldGate+'_').length)}:{node:meet}),migrationNext300:meet};
  map.set(p,gate);edit('CHERRY_INVITE_'+companion).next=p;
  for(const c of people){const src=map.get(oldGate+'_'+c);if(src)map.set(p+'_'+c,{...src,id:p+'_'+c,next:meet,migrationNext300:meet});}
 }
 return {...base,reviewRevision:31,nodes:[...map.values()].map(varyRepeated310)};
}
