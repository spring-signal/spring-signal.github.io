import {StoryReader} from './story-reader.mjs?v=330';
export function migrateCampaign300(oldReader,manifest){
 const old=oldReader.export(),oldView=oldReader.inspect(),reader=new StoryReader(manifest.story,manifest);
 reader.migrating300=true;reader.migrationSkipped300=new Set();reader.state.playerName=old.playerName;
 reader.state.skipped280=[...(old.skipped280??[])];reader.state.legacyNext280={...(old.legacyNext280??{})};
 const decisions=new Map(old.decisions.map(d=>[d.nodeId,d.choiceId]));
 for(let guard=0;guard<18000;guard++){
  const v=reader.inspect(),n=v.node;
  if(n.id===old.nodeId){const original=oldView.lines[old.lineIndex],mapped=original?v.lines.findIndex(l=>l.speaker===original.speaker&&l.text===original.text):-1;reader.state.lineIndex=old.lineIndex>=oldView.lines.length?v.lines.length:mapped>=0?mapped:Math.min(old.lineIndex,Math.max(0,v.lines.length-1));
   reader.state.skipped300=[...reader.migrationSkipped300];const received=new Set(v.world.messages.filter(m=>m.direction==='in').map(m=>m.id));for(const key of ['readMessages','notifiedMessages'])reader.state[key]=old[key].filter(id=>received.has(id));reader.state.tutorialSeen=[...old.tutorialSeen];reader.migrating300=false;reader.restore(reader.export());return reader;
  }
  if(v.kind==='choices'){const chosen=decisions.get(n.id);if(!v.choices.some(c=>c.id===chosen))throw Error('이전 선택을 일상 이야기와 연결하지 못했습니다: '+n.id);reader.choose(chosen);}
  else if(v.kind==='dialogue'){if(v.choices.length||n.terminal)reader.state.lineIndex=v.lines.length;else{reader.state.lineIndex=v.lines.length-1;reader.next();}}
  else throw Error('이전 위치보다 이야기가 먼저 끝났습니다.');
 }
 throw Error('이전 진행을 연결하는 데 너무 많은 단계가 필요합니다.');
}
