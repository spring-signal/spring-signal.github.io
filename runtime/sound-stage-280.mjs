export const TITLE_MUSIC330='music-330-title-warm';
export const MUSIC_FILES280={
 'title-warm':TITLE_MUSIC330,
 'piano-daily':'music-280-piano-daily','piano-tender':'music-280-piano-tender','piano-reflect':'music-280-piano-reflect',
 'band-campus':'music-280-band-campus','band-festival':'music-280-band-festival'
};
export const ALERT_NOTES280={seoyeon:[784,988,1175],jiwoo:[1047,784,1319],haerin:[880,1175,1047],yuna:[659,880,988],minseo:[740,988,1319],doa:[698,880,1047],group:[880,1320]};
export function musicFor280(scene,step){
 if(!scene)return null;if(scene.music===false||scene.music==='none')return null;
 if(MUSIC_FILES280[scene.music])return scene.music;
 const id=scene.id??'',bg=scene.background??'',text=step?.line?.text??'';
 if(/R280_MINJUN|_PAUSE|_FRIEND|_OTHER|_UNFINISHED|_WAIT|_REPAIR/.test(id))return 'piano-reflect';
 if(/_CONFESS|_TOGETHER|_CONFIRM|DOA9|_WALK_|_COUPLE|_CLOSENESS/.test(id))return 'piano-tender';
 if(/festival|cherry|party|MT19.*GAME|MT090.*FINGER/.test(bg+' '+id))return 'band-festival';
 if(/campus|park|river|sea130|valley130|pool130|busstop/.test(bg)&&!/_night/.test(bg))return 'band-campus';
 return 'piano-daily';
}
export function floorFor280(scene){
 const bg=scene?.background??'',loc=scene?.location??'';
 if(/sea130|beach/.test(bg+' '+loc))return 'sand';
 if(/pool/.test(bg+' '+loc))return 'wet';
 if(/lodge_path|valley_path|lodge-path/.test(bg+' '+loc))return 'gravel';
 if(/park/.test(bg))return 'grass';
 if(/lodge|club|bookshop|library/.test(bg+' '+loc))return 'wood';
 if(/cafe|office|seminar|exhibition|gallery/.test(bg+' '+loc))return 'tile';
 return 'pavement';
}
export function walking280(step){
 if(step.kind!=='dialogue')return false;
 if(step.line.footsteps)return true;
 if(step.line.speaker!=='narrator'||step.line.reading240?.kind==='thought')return false;
 return /걸어갔다\.|걸음을 옮겼다\.|길을 걸었다\.|숙소로 돌아왔다\.|정류장으로 걸었다\./.test(step.line.text??'')&&!/[“”]/.test(step.line.text??'');
}
