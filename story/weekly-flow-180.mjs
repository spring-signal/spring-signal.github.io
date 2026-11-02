import {has,all,any,not} from './everyday-tools.mjs?v=200';
import {weeklyMoments180} from './weekly-moments-180.mjs?v=200';
const chars=['seoyeon','jiwoo','haerin','yuna','minseo','doa'];
const ended=any(...chars.map(c=>has('couple160Ended_'+c)));
const lover=any(...chars.map(c=>has('romance150Lover_'+c)));
const spoken=any(...chars.flatMap(c=>[has('closeness_'+c,5),...[1,2,3].map(s=>has('romance150Stage_'+c,s))]));
const study=[
 '제출한 파일은 그대로 두고 내 메모용 사본을 열었다. 다시 읽으니 이유를 건너뛴 문장 한 줄이 보였다.',
 '자료 두 곳에 적힌 같은 단어의 뜻이 조금 달랐다. 어느 뜻으로 썼는지 내 문장 옆에 적었다.',
 '초안에서 길게 설명한 부분을 소리 내어 읽었다. 숨이 모자란 곳에서 문장을 둘로 나눴다.',
 '제출본에 표시한 출처를 다시 열어 보았다. 그때 접어 둔 질문 하나를 다음 읽기 목록에 옮겼다.',
 '공책의 요약과 원문을 번갈아 읽었다. 내가 덧붙인 생각에 표시를 해 두니 어디에서 헷갈렸는지 보였다.',
 '책상 위 자료를 펼친 순서와 실제 읽은 순서가 달랐다. 다시 찾을 때 덜 헤매도록 작은 색인부터 붙였다.',
 '긴 문단을 표로 옮겼다가 빠뜨린 조건을 발견했다. 보기 좋게 정리하는 일과 정확히 이해한 일은 따로 확인했다.',
 '다 풀지 못한 문제 옆에 막힌 지점만 적었다. 답을 모른다는 말보다 다음에 물을 질문이 조금 구체적이었다.',
 '학기 중 메모를 한 번에 버리려다 다시 꺼냈다. 아직 읽고 싶은 자료 두 장만 따로 남겼다.',
 '새 질문을 하나 적고 관련 없는 검색 창을 닫았다. 오늘 읽을 분량은 내가 끝낼 수 있는 만큼만 정했다.',
 '같은 설명을 다른 예로 써 보니 원래 문장의 빈칸이 드러났다. 사본에만 고칠 표시를 남겼다.',
 '자료의 제목만 보고 예상했던 내용과 실제 첫 쪽이 달랐다. 예상이 틀린 이유부터 한 줄 적었다.',
 '도서관에서 내 메모를 다시 읽었다. 창밖이 어두워지기 전에 오늘 고칠 문장 한 군데만 정했다.',
 '인용한 문장 앞뒤를 더 읽어 보았다. 내가 필요한 부분만 너무 짧게 잘랐던 곳을 메모에 표시했다.',
 '남에게 설명한다면 어디부터 말할지 순서를 바꿔 봤다. 다시 설명하기 어려운 부분은 아는 척하고 넘기지 않았다.',
 '마지막 메모를 정리하며 다음 학기에 다시 읽을 질문을 골랐다. 제출한 일은 끝났어도 궁금한 일까지 모두 끝난 것은 아니었다.'
];
const work=[
 '이미 받은 결과 안내를 다시 확인했다. 이번에는 선발되지 않았다는 답을 새 신청 결과처럼 세지는 않았다.',
 '다음 공고에서 꼭 맞아야 할 요일을 먼저 적었다. 빈칸을 많이 채우는 것보다 실제 가능한 시간이 필요했다.',
 '생활비와 시간을 함께 계산했다. 아직 맡지 않은 근무의 급여를 통장 잔액에 보태지는 않았다.',
 '지원서 사본에서 내가 설명하기 어려웠던 경험을 골랐다. 새로 제출하지 않고 내 말로 바꾸는 연습만 했다.',
 '예전 공고의 담당 업무를 읽고 내가 모르는 일을 표시했다. 다음에는 묻고 확인할 질문을 따로 남겼다.',
 '다음 학기 시간표가 나오면 다시 확인할 칸을 비워 뒀다. 아직 모르는 수업 시간을 가능하다고 적지는 않았다.',
 '공고 알림을 확인하고 닫았다. 오늘 새 모집이 없다는 사실을 내 쪽이 멈춘 증거로 쓰지는 않았다.',
 '지원서 사본과 결과 안내를 같은 폴더에 정리했다. 해 본 일과 다음에 해 볼 일을 나눠 적고 노트북을 닫았다.'
];
const sat=['주말의 약속 시간을 확인하고 필요한 것만 가방에 넣었다.','토요일에는 평일에 미뤄 둔 일도 있었다. 오늘 가능한 시간부터 다시 보았다.','학교 축제가 열리는 토요일이었다. 내 쪽에서 고른 일정을 확인했다.','늦게 일어난 아침에는 준비 순서부터 달라졌다. 오늘 떠날 시간만 먼저 확인했다.','기말 기간 전에 볼 자료와 오늘 쓸 물건을 나눠 챙겼다.','달력에 정한 시간과 아직 빈 시간을 구별해 봤다. 오늘은 그 약속부터 지킬 생각이었다.','공개특강이 있던 주의 주말이 왔다. 오늘의 개인 일정은 따로 확인했다.','기말고사 주의 토요일이었다. 끝낸 시험과 오늘의 약속을 같은 할 일로 섞지 않았다.','방학 첫 주말에도 내 쪽에서 정한 일이 있었다. 먼저 그 시간을 확인했다.','여름 MT를 앞둔 토요일이었다. 참가 계획과 별개로 오늘 해야 할 일을 챙겼다.','여름 MT가 잡힌 토요일이었다. 내가 고른 참가 여부와 오늘의 일정을 다시 확인했다.','여행이 있던 주를 넘기고 토요일이 돌아왔다. 오늘의 약속은 오늘의 시간으로 확인했다.','더운 시간을 피해 움직일 수 있도록 출발 시각을 보았다. 아직 정하지 않은 만남을 약속처럼 적지는 않았다.','불꽃놀이가 열리는 토요일이었다. 같이 볼 사람이 있는지와 돌아올 시간을 각각 확인했다.','방학 끝자락의 주말이었다. 누군가의 휴무와 내 빈 시간이 같은지는 다시 물어볼 일이었다.','여름 마지막 전시가 있는 토요일이었다. 오늘 내가 맡은 일과 개인 시간을 구별해 챙겼다.'];
export function repairWeeklyFlow180(base){
 const nodes=base.nodes.map(original=>{
  const guide=original.id.match(/^LATE(\d+)_(EXTRA|LIFE|INCOMING_LIST150)$/);
  const result=original.id.match(/^LATE(\d+)_LIFE_(study|work)_result$/);
  const saturday=original.id.match(/^LATE(\d+)_SAT$/);
  const moment=original.id.match(/^LATE(\d+)_(SUNDAY|MON|HOME|QUIET_SAT)$/);
  const ending=['END150_REVIEW','END150_FRIENDS','END150_ALONE','SUMMER24_END'].includes(original.id);
  const stale=original.lines.some(l=>/아직 결과 전이라|결과 안내 전이었다|접수 내역은 그대로였고 결과/.test(l.text));
  if(!guide&&!result&&!saturday&&!moment&&!ending&&!stale)return original;
  const n={...original,lines:original.lines.map((l,i)=>({...l,source170:Object.prototype.hasOwnProperty.call(l,'source170')?l.source170:i}))};
  if(guide&&Number(guide[1])>9)n.lines=[]; // These nodes always have a real menu.
  if(moment){const w=Number(moment[1]),kind={SUNDAY:'sunday',MON:'monday',HOME:'home',QUIET_SAT:'quiet'}[moment[2]];n.lines[0].text=weeklyMoments180[kind][w-9];if(kind==='sunday'&&w>9)n.lines=n.lines.filter(l=>l.source170!==1||!l.text.startsWith('먼저 길게 만날 약속'));}
  if(saturday)n.lines[0].text=sat[Number(saturday[1])-9];
  if(result){
   const w=Number(result[1]);
   if(result[2]==='study')n.lines=n.lines.map((l,i)=>({...l,text:l.text.includes('받은 피드백')||l.text.startsWith('제출한 일은 다시')?(n.lines.length>1&&i===0?'저녁 도서관에 잠깐 들러 자료를 폈다. 먼저 찾아볼 쪽에 표시해 두었다.':study[w-9]):l.text}));
   else if(w>=17){const old=n.lines[0];old.when=all(old.when,not(has('lifeWorkResult','not-selected')));n.lines.push({...old,text:work[w-17],when:has('lifeWorkResult','not-selected')});}
  }
  if(stale){
   n.lines=n.lines.flatMap(l=>/아직 결과 전이라|결과 안내 전이었다|접수 내역은 그대로였고 결과/.test(l.text)?[{...l,when:all(l.when,not(has('lifeWorkResult','not-selected')))},{...l,text:'교내 자료실 근로 결과를 받았어요. 이번에는 선발되지 않았고요. 이미 보낸 지원서는 그대로 두고 다음에 확인할 조건을 적어 두고 있어요.',when:all(l.when,has('lifeWorkResult','not-selected')),emotion:'serious'}]:[l]);
  }
  if(original.id==='END150_REVIEW'){
   n.lines[0].when=all(n.lines[0].when,spoken);
   n.lines.push({text:'늦은 바람이 들어와 공책이 한 장 넘어갔다. 주고받았던 말과 혼자 고른 시간을 떠올리며 이번 여름을 어떤 말로 기억할지 생각했다.',speaker:'narrator',when:not(spoken),source170:0});
  }
  if(original.id==='END150_FRIENDS')n.lines[0].text='연애를 약속하지 않은 만남도 이 시간에 남아 있었다. 서로의 말을 들었던 날과 내 쪽의 시간을 골랐던 날을 나란히 떠올렸다.';
  if(original.id==='END150_ALONE'){
   n.lines[0].when=all(n.lines[0].when,not(ended));
   n.lines.push({text:'연인으로 함께했던 시간이 끝난 뒤에도 내 쪽의 하루는 이어졌다. 좋았던 일을 없던 일로 만들지 않고, 오늘 혼자 고를 수 있는 일부터 생각했다.',speaker:'narrator',when:ended,source170:0});
  }
  if(original.id==='SUMMER24_END')for(const l of n.lines)if(l.text==='다음 약속을 기다리는 마음에도 조금씩 다른 이름이 생겼다. 함께 정한 말과 아직 묻고 싶은 말이 나란히 남아 있었다.'){
   l.when=all(l.when,not(all(ended,not(lover))));n.lines.push({...l,text:'관계를 마친 뒤에는 다음 약속보다 서로 남겨 두기로 한 시간이 먼저 떠올랐다. 좋았던 기억을 지우지 않으면서도 지금의 답을 바꾸어 적지는 않았다.',when:all(ended,not(lover))});break;
  }
  return n;
 });
 return {...base,nodes};
}
