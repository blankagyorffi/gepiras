(() => {
  'use strict';
  const footer=document.querySelector('#startPanel .start-footer')||document.getElementById('startPanel');
  const install=document.createElement('button');install.type='button';install.textContent='📲 Alkalmazás telepítése';install.hidden=true;install.id='installApp';footer.append(install);
  const update=document.createElement('button');update.type='button';update.textContent='Új változat betöltése';update.hidden=true;update.id='updateApp';footer.append(update);
  let promptEvent=null,registration=null,reloadRequested=false;
  const standalone=()=>window.matchMedia('(display-mode: standalone)').matches;
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;install.hidden=standalone();});
  install.addEventListener('click',async()=>{
    if(!promptEvent)return;
    const event=promptEvent;promptEvent=null;install.hidden=true;
    try{await event.prompt();await event.userChoice;}catch(e){}
  });
  window.addEventListener('appinstalled',()=>{promptEvent=null;install.hidden=true;});
  const safeToUpdate=()=>!document.getElementById('startPanel').classList.contains('hidden')&&!(typeof testActive!=='undefined'&&testActive)&&!(typeof saving!=='undefined'&&saving)&&!(typeof pendingResult!=='undefined'&&pendingResult&&!savedOk);
  const refreshUpdate=()=>{update.hidden=!(registration?.waiting&&navigator.serviceWorker.controller);update.disabled=!safeToUpdate();update.title=update.disabled?'A frissítés a kezdőlapon, mentés után indítható.':'A program frissítése; a helyben tárolt adatok megmaradnak.';};
  update.addEventListener('click',()=>{if(!registration?.waiting||!safeToUpdate())return;reloadRequested=true;registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});});
  if(!('serviceWorker' in navigator)||!window.isSecureContext||location.protocol==='file:')return;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloadRequested)location.reload();});
  navigator.serviceWorker.register('./service-worker.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
    registration=reg;refreshUpdate();
    reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')refreshUpdate();});});
    new MutationObserver(refreshUpdate).observe(document.getElementById('startPanel'),{attributes:true,attributeFilter:['class']});
    window.addEventListener('online',()=>{reg.update().catch(()=>{});refreshUpdate();});
  }).catch(()=>{});
})();
