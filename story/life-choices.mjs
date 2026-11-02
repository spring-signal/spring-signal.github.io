import {L,C} from './weekly-plans.mjs?v=200';
import {weaver,has,flag,not,any,exp} from './everyday-tools.mjs?v=200';
export const lifeLabels={study:'과제 한 단계 진행',work:'교내 근로 지원 준비',meal:'직접 저녁 해 먹기',sleep:'일찍 쉬기',family:'가족에게 먼저 전화'};
export const lifeCallbacks={
 study:{none:'아직 과제는 시작할 부분을 고르는 중이에요. 오늘 펼칠 곳부터 정하려고요.',outline:'과제 질문을 한 줄로 줄여 놨어요. 뭘 모르는지는 전보다 분명해졌어요.',draft:'과제 초안을 썼어요. 아직 마음에 안 들지만 빈 문서랑은 다르더라고요.',submitted:'이번 과제는 직접 제출했어요. 결과는 아직 모르고요. 보내고 나니 고치고 싶은 줄이 보여요.'},
 work:{none:'교내 근로는 아직 알아보지 않았어요. 온유에서 일하는 일과는 따로 제 수업 시간부터 보고 있어요.',browse:'교내 자료실 근로 공고를 읽고 시간표를 대 봤어요. 아직 지원한 건 아니고요.',draft:'교내 근로 지원서에 가능한 요일을 적었어요. 할 수 있어 보이려고 전부 채우지는 않았어요.',sent:'교내 자료실 근로 지원서를 보냈어요. 아직 결과 전이라 근무가 생겼다고 다른 약속을 바꾸지는 않았어요.'}
};
export function lifeLines(kind){const key=kind==='study'?'lifeStudy':'lifeWork',data=lifeCallbacks[kind],values=Object.keys(data).filter(v=>v!=='none');return Object.entries(data).map(([v,t])=>L(t,'player',{when:v==='none'?not(any(...values.map(v=>has(key,v)))):has(key,v)}));}
export function addLifeChoices(base){
 const {map,get,make,finish}=weaver(base);
 const study=[['outline','안내문에서 내가 답할 질문 한 줄과 읽을 자료 두 개를 남겼다. 오늘 완성한 것은 보고서가 아니라 시작할 순서였다.'],['draft','지난번 적은 질문을 읽고 자료 두 군데를 비교했다. 출처가 없는 줄을 표시하고 내 말로 한 쪽을 써 저장했다. 아직 제출한 건 아니었다.'],['submitted','초안의 출처와 빠진 문항을 확인했다. 제출할 판과 내 메모를 따로 저장하고 학교 과제창에서 전송을 눌렀다. 접수 표시를 확인했지만 점수는 아직 몰랐다.']];
 const work=[['browse','교내 자료실 근로 공고의 필요한 요일을 읽었다. 내 수업표에 겹치는 줄을 지우고 가능한 시간만 적었다. 마감은 8주 일요일이었다. 아직 지원한 건 아니었다.'],['draft','지난번 적은 시간으로 지원서 초안을 썼다. 온유에서 일하기로 했다면 그 시간도 제외했다. 잘 보이기 위한 대답보다 실제로 갈 수 있는 요일을 남겼다.'],['sent','지원서 초안의 가능 요일과 연락처를 확인하고 접수 버튼을 눌렀다. 자동 접수 메일을 읽었다. 결과 안내는 시험 주 뒤라서 새 근무를 미리 달력에 넣지 않았다.']];
 const care={meal:'냉장고에 남은 달걀과 반찬으로 밥을 차렸다. 밥이 되는 동안 설거지를 했다. 오늘 저녁을 거르지 않았다는 말 대신 무엇을 먹었는지 말할 수 있었다.',sleep:'내일 가져갈 것만 가방에 넣고 알람을 맞췄다. 남은 페이지에 종이를 끼웠다. 다 끝내서 자는 날만 있으면 너무 늦어질 것 같아 오늘 멈춘 줄을 내일의 시작으로 남겼다.',family:'어머니에게 먼저 전화를 걸었다. 잘 다니냐는 말에 이번 주 어려웠던 일도 하나 답했다. 어머니가 오늘 드신 음식을 듣고 나도 내 저녁을 말했다. 잘 지낸다는 대답이 처음보다 조금 구체적이었다.'};
 for(let w=2;w<=7;w++){
  const old=get(`LIFE${w}_MID`),back=old.next,p=`LIFE${w}_CHOICE`;
  old.lines=[L('수요일 밤, 이번 주 마감과 통장 내역을 함께 폈다. 남에게 보여 주고 싶은 하루와 내가 실제로 보낸 하루 사이에 빈칸이 있었다.'),L('누군가와 약속한 시간 밖에도 내가 고를 수 있는 저녁이 있었다. 아직 하지 않은 일 중 오늘 한 가지를 골랐다.')];old.next=p;
  make(p,`${w}주 수요일 밤 · 내 시간을 고르는 일`,w,'wed','bg.home_night',[],[L('지난번 펼쳐 둔 파일을 보다가 시계를 확인했다. 오늘은 한 쪽 더 써도 되고, 밥부터 챙기거나 집에 전화를 걸어도 좋을 것 같았다.')],null,{migrationDefault:'keep',choicePrompt:'오늘 저녁은 어떻게 보낼까?',choices:[C('study',lifeLabels.study,p+'_study',[flag('lifeChoice'+w,'study')]),C('work',lifeLabels.work,p+'_work',[flag('lifeChoice'+w,'work')]),...Object.keys(care).map(c=>C(c,lifeLabels[c],p+'_'+c,[flag('lifeChoice'+w,c)])),C('keep','오늘은 더 정하지 않고 하던 일을 마무리한다.',back)]});
  for(const [kind,key,stages]of [['study','lifeStudy',study],['work','lifeWork',work]]){
   make(p+'_'+kind,`${w}주 수요일 · 지금의 다음 한 칸`,w,'wed','bg.home_night',[],[L(kind==='study'?'과제 폴더에서 마지막으로 실제 저장한 파일부터 확인했다.':'온유 포장 보조와 별개인 교내 근로 공고를 폈다. 한 곳을 알아본다고 다른 곳의 시간을 마음대로 늘릴 수는 없었다.')],[{when:has(key,stages[2][0]),node:p+'_'+kind+'_again'},{when:has(key,stages[1][0]),node:p+'_'+kind+'_2'},{when:has(key,stages[0][0]),node:p+'_'+kind+'_1'},{node:p+'_'+kind+'_0'}]);
   stages.forEach(([value,text],i)=>make(p+'_'+kind+'_'+i,`${w}주 수요일 · 내 생활에 남은 기록`,w,'wed','bg.home_night',[],[L(text)],back,{exitEffects:[flag(key,value),exp('life-'+kind+'-'+value),exp(`life-${w}-${kind}`)]}));
   make(p+'_'+kind+'_again',`${w}주 수요일 · 이미 한 일을 다시 세지 않고`,w,'wed','bg.home_night',[],[L(kind==='study'?'이미 제출한 파일을 다시 냈다고 세지 않았다. 이해하지 못했던 문제를 다시 풀고 다음 수업에 물을 줄을 적었다.':'접수 내역은 그대로였고 결과 안내 전이었다. 같은 지원서를 다시 냈다고 세지 않고, 기다리는 동안 쓸 생활비를 계산했다.')],back,{exitEffects:[exp(`life-${w}-${kind}`)]});
  }
  for(const [id,text]of Object.entries(care))make(p+'_'+id,`${w}주 수요일 · ${lifeLabels[id]}`,w,'wed','bg.home_night',[],[L(text)],back,{exitEffects:[flag('lifeCare',id),exp(`life-${w}-${id}`)]});
 }
 for(const w of [3,6,7])get(`LIFE${w}_SAT`).lines=[L('토요일 아침, 이번 주에 끝낸 일과 아직 남은 일을 따로 적었다.'),L('오늘 긴 외출을 약속했다면 출발 전에 준비하고, 비워 둔 날이면 내 속도로 아침을 시작한다.')];
 get('LIFE3_MON').lines=[L('월요일 아침, 지난주 공책에서 실제로 어디까지 해 두었는지 확인하고 새 장을 폈다.'),L('점심 먹을 시간을 먼저 표시했다. 이번 주에 누구를 만나는지와 별개로 내 생활도 시작되고 있었다.')];
 for(const n of map.values()){
  if(/_LATER$/.test(n.id)&&/^(PLAN|FLEX)/.test(n.id))n.lines=[L('각자의 일이 계속됐다. 서로 이번 주에 실제로 해 본 일부터 나눴다.'),...lifeLines('study'),...lifeLines('work').slice(1)];
  if(/_ARC6$/.test(n.id)){
   for(const line of n.lines){
    if(/나는 미뤄 둔 교내 지원서|나는 지원서 제출을 미루고|유나가 내 다음 주 일정을 물었다|나는 내 지원서에도/.test(line.text))line.text='내 근황을 물어 와 지금까지 실제로 고른 일부터 말했다. 아직 준비 중인 일을 끝냈다고 포장하지는 않았다.';
    if(/서연이 내 지원 동기를 읽고/.test(line.text))line.text='서연은 내가 왜 망설였는지부터 들었다. 무엇을 고칠지보다 다음에 해 보고 싶은 일의 이유를 물었다.';
    if(/내 빈 지원 동기 칸/.test(line.text))line.text='해린은 내 이야기를 들으면서 대답을 대신 고르려 하지 않았다.';
    if(/나는 떨어진 뒤에도 해린에게/.test(line.text))line.text='잘된 소식을 가져오지 못한 날에도 같은 얼굴로 만날 수 있을지 겁난다고 말했다.';
   }
   const i=n.lines.findIndex(l=>l.text.startsWith('내 근황을 물어 와'));if(i>=0)n.lines.splice(i+1,0,...lifeLines('work'));
   if(n.cast[0]==='seoyeon'){n.choices[0].label='나도 실제로 가능한 다음 한 단계를 정해 이야기한다.';n.choices[1].label='오늘은 서연의 제출을 축하하고 내 이야기는 천천히 꺼낸다.';}
  }
  if(/_seoyeon_.*_ARC6_together$/.test(n.id))n.lines[0].text='그럼 각자 다음 걸 고르는 사람 됐네요. 결과 오는 날 말고, 그전에도 만나 줘요.';
 }
 return finish();
}
