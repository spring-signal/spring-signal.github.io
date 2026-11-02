import {StoryReader} from './story-reader.mjs?v=330';
// Replay old decisions, bypassing new optional scenes without inventing old pay,
// gifts, invitations, conversations, contacts or dates.
export function migrateCampaign280(oldReader,manifest){
 const old=oldReader.export(),oldView=oldReader.inspect(),reader=new StoryReader(manifest.story,manifest);
 reader.migrating280=true;
 const decisions=new Map(old.decisions.map(d=>[d.nodeId,d.choiceId]));
 reader.state.playerName=old.playerName;
 for(const id of oldView.visited)if(/^LATE\d+_INCOMING_.+_REPLY$/.test(id))reader.state.legacyNext280[id]=oldReader.nodes.get(id).next;
 const target=old.nodeId;
 for(let guard=0;guard<16000;guard++){
  const view=reader.inspect(),n=view.node;
  if(n.id===target){
   const original=oldView.lines[old.lineIndex],mapped=original?view.lines.findIndex(l=>l.speaker===original.speaker&&l.text===original.text):-1;
   reader.state.lineIndex=old.lineIndex>=oldView.lines.length?view.lines.length:mapped>=0?mapped:Math.max(0,Math.min(old.lineIndex,view.lines.length-1));
   const received=new Set(reader.world.messages.filter(m=>m.direction==='in').map(m=>m.id));
   for(const key of ['readMessages','notifiedMessages'])reader.state[key]=old[key].filter(id=>received.has(id));reader.state.tutorialSeen=[...old.tutorialSeen];
   reader.migrating280=false;reader.restore(reader.export());return reader;
  }
  if(n.id.startsWith('R280_')&&n.migrationNext280){
   const world=view.world;reader.state.skipped280.push(n.id);reader.move(n.migrationNext280,world);continue;
  }
  if(view.kind==='choices'){
   const chosen=decisions.get(n.id),choice=view.choices.find(c=>c.id===chosen);
   if(!choice)throw Error('이전 선택을 새 이야기와 연결하지 못했습니다: '+n.id);
   reader.choose(choice.id);
  }else if(view.kind==='dialogue'){
   if(view.choices.length||n.terminal)reader.state.lineIndex=view.lines.length;
   else {reader.state.lineIndex=Math.max(0,view.lines.length-1);reader.next();}
  }else throw Error('이전 진행 위치보다 이야기가 먼저 끝났습니다.');
 }
 throw Error('이전 이야기를 연결하는 데 너무 많은 단계가 필요합니다.');
}
