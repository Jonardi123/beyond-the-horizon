import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = await Promise.all(entries.map(async entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return result.flat();
}
const paths = (await files('dist')).filter(file => !file.endsWith('sw.js'));
const hash = createHash('sha256');
for (const file of paths) hash.update(await readFile(file));
const cacheName = `horizon-${hash.digest('hex').slice(0, 12)}`;
const urls = ['/', ...paths.map(file => '/' + file.replaceAll('\\', '/').replace(/^dist\//, ''))];
await writeFile('dist/sw.js', `
const CACHE = ${JSON.stringify(cacheName)};
const ASSETS = ${JSON.stringify(urls)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('horizon-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')));
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});
`);
console.log(`Offline cache prepared: ${paths.length} local files.`);
