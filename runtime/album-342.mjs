export const ALBUM_KEY342='spring-signal-album-342';
const SCHEMA='spring-signal-album-1';

// Only a successfully displayed main-story frame can earn a character photo.
// Prefetch, the album itself, and development previews never call this path.
export class AlbumCollection342{
 constructor(manifest,storage){
  this.manifest=manifest;this.storage=storage;this.seen=new Set();this.storageOkay=Boolean(storage);
  try{const raw=storage?.getItem(ALBUM_KEY342);if(raw)this.read(JSON.parse(raw)).forEach(id=>this.seen.add(id));}
  catch{this.storageOkay=false;}
 }
 read(data){
  if(data?.schema!==SCHEMA||data.identityVersion!==this.manifest.identityVersion||!Array.isArray(data.seen)||data.seen.length>Object.keys(this.manifest.assets).length||data.seen.some(id=>typeof id!=='string'||this.manifest.assets[id]?.kind!=='character'))throw Error('앨범 기록을 확인해 줘.');
  return data.seen;
 }
 has(asset){return this.seen.has(typeof asset==='string'?asset:asset.id);}
 export(){return {schema:SCHEMA,identityVersion:this.manifest.identityVersion,seen:[...this.seen].sort()};}
 persist(){try{if(!this.storage)throw Error('Storage unavailable');this.storage.setItem(ALBUM_KEY342,JSON.stringify(this.export()));this.storageOkay=true;}catch{this.storageOkay=false;}}
 merge(data){
  if(data===undefined)return false;
  let ids;try{ids=this.read(data);}catch{return false;}
  const before=this.seen.size;ids.forEach(id=>this.seen.add(id));if(this.seen.size===before)return false;this.persist();return true;
 }
 record(ids,{isStory=false,visible=false}={}){
  if(!isStory||!visible)return false;
  const before=this.seen.size;
  for(const id of ids??[])if(this.manifest.assets[id]?.kind==='character')this.seen.add(id);
  if(this.seen.size===before)return false;this.persist();return true;
 }
}
