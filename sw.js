const C='jar-pwa-v18';
const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(v=>v.startsWith('jar-pwa-')&&v!==C).map(v=>caches.delete(v)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate')e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(C).then(c=>c.put('./index.html',copy))}return r}).catch(()=>caches.match('./index.html')));
 else e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});
