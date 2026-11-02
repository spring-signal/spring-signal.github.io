export function ios330(nav={}){return /iPhone|iPad|iPod/.test(nav.userAgent??'')||nav.platform==='MacIntel'&&nav.maxTouchPoints>1;}
export function standalone330(nav={},media=()=>({matches:false})){return Boolean(nav.standalone||media('(display-mode:standalone)').matches||media('(display-mode:fullscreen)').matches);}
export async function requestDisplay330({doc,nav,media,silent=false,onGuide=()=>{},onMessage=()=>{}}){
 const active=doc.fullscreenElement??doc.webkitFullscreenElement,exit=doc.exitFullscreen??doc.webkitExitFullscreen;
 if(active){if(!silent&&exit)await exit.call(doc);return 'fullscreen';}
 if(standalone330(nav,media)){if(!silent)onMessage('주소창 없는 앱 화면으로 실행 중이야.');return 'standalone';}
 const root=doc.documentElement,request=root.requestFullscreen??root.webkitRequestFullscreen;
 if(request&&doc.fullscreenEnabled!==false){try{await request.call(root);try{await globalThis.screen?.orientation?.lock?.('landscape');}catch{}return 'fullscreen';}catch{}}
 if(!silent){if(ios330(nav))onGuide();else onMessage('이 브라우저는 전체화면을 지원하지 않아. 사용할 수 있는 화면에 맞춰 진행할게.');}return ios330(nav)?'home-screen':'unavailable';
}
export function installMobileDisplay330({modal,session,onExport,onImport}){const $=id=>document.getElementById(id);
 function paint(){const standalone=standalone330(navigator,q=>matchMedia(q));document.body.dataset.appDisplay=standalone?'standalone':'browser';$('home-screen-label').textContent=standalone?'주소창 없는 앱 화면으로 실행 중':'아이폰에서 주소창 없이 플레이';$('home-screen-label').hidden=!ios330(navigator)&&!standalone;$('home-screen-help').hidden=!ios330(navigator)&&!standalone;$('install-export').disabled=!session.storySaved;const h=window.visualViewport?.scale>1?innerHeight:window.visualViewport?.height??innerHeight;document.documentElement.style.setProperty('--app-height',Math.round(h)+'px');}
 function guide(){paint();modal('home-screen-guide');}
 $('home-screen-help').onclick=guide;$('options-home-screen').onclick=guide;$('install-export').onclick=()=>onExport(session.storySaved);$('install-import').onclick=onImport;paint();return {paint,guide};
}
