'use strict';
// Minden közzétett programváltozatnál módosítsd a VERSION értékét.
const VERSION='2026-10-12-05';
const PREFIX='gepiras-static-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+VERSION;
const ASSETS=['./index.html','./manifest.webmanifest','./pwa.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
const STATIC_URLS=new Set(ASSETS.map(path=>new URL(path,self.registration.scope).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url),base=new URL(self.registration.scope);
  // A Google-végpontok, eredmények, jelszóellenőrzés és minden POST kérés kizárólag a hálózatra kerül.
  if(request.method!=='GET'||url.origin!==base.origin||!url.href.startsWith(base.href))return;
  const appNavigation=request.mode==='navigate'&&(url.pathname===base.pathname||url.pathname===new URL('index.html',base).pathname);
  if(!appNavigation&&!STATIC_URLS.has(url.href))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),key=appNavigation?new URL('index.html',base).href:request.url;
    try{const response=await fetch(request);if(response.ok){await cache.put(key,response.clone());return response;}}catch(e){}
    const saved=await cache.match(key);return saved||new Response('A program első megnyitásához internetkapcsolat szükséges.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  })());
});
