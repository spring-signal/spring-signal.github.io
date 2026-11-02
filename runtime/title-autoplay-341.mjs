// Attempt normal autoplay; a denied/pending browser resume never blocks the UI.
// Existing gesture handlers retry resume inside a real tap or keyboard event.
export function titleAudio341(status,settings){
 const enabled=settings.titleMusicEnabled&&!settings.muted&&settings.masterVolume>0&&settings.musicVolume>0;
 const playing=status.playing.includes('music-330-title-warm');
 return {playing,showControl:playing||!enabled||Boolean(status.error),label:playing?'타이틀 음악 끄기':status.error?'소리 다시 연결':'타이틀 음악 켜기',hint:!status.supported?'이 브라우저의 소리 지원을 확인해 줘':playing?'너를 만나기 전의 봄 · 피아노':!enabled?'타이틀 음악을 껐어':status.unlocked?'타이틀 음악을 준비하고 있어':'화면을 누르면 음악과 함께 시작돼'};
}
export function startTitleAutoplay341(sound,{visible=true}={}){
 const s=sound.settings;if(!visible||sound.status.profile!=='title'||!sound.status.supported||!s.titleMusicEnabled||s.muted||!s.masterVolume||!s.musicVolume)return Promise.resolve(false);
 return sound.unlock();
}
