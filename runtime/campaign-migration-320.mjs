import {StoryReader} from './story-reader.mjs?v=330';
export function migrateCampaign320(oldReader,manifest){const old=oldReader.export(),view=oldReader.inspect(),nodes=new Map(manifest.story.nodes.map(n=>[n.id,n])),legacy=new Set(view.visited.filter(id=>nodes.get(id)?.legacy320)),group=nodes.get(old.nodeId)?.topicGroup320;
 if(group)for(const n of nodes.values())if(n.topicGroup320===group&&n.legacy320)legacy.add(n.id);
 const snapshot={...old,narrativeRevision:'0.32.0',legacy320:[...legacy]};const reader=new StoryReader(manifest.story,manifest,snapshot);return reader;
}
