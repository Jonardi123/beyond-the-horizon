import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');
const base = env.VITE_BASE_PATH || '/beyond-the-horizon/';
const outDir = env.VITE_OUTPUT_DIR || 'dist';
if (!/^\/(?:[\w.-]+\/)*$/.test(base)) throw new Error('VITE_BASE_PATH must be an absolute directory path ending in /.');

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = await Promise.all(entries.map(async entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return result.flat();
}
const paths = (await files(outDir)).filter(file => !file.endsWith('sw.js'));
const hash = createHash('sha256');
for (const file of paths) hash.update(await readFile(file));
const prefix = `horizon-${base.replace(/[^\w]/g,'-')}-`;
const cacheName = `${prefix}${hash.digest('hex').slice(0, 12)}`;
const urls = [base, ...paths.map(file => base + file.replaceAll('\\', '/').slice(outDir.length + 1))];
await writeFile(path.join(outDir,'sw.js'), `
const CACHE = ${JSON.stringify(cacheName)};
const PREFIX = ${JSON.stringify(prefix)};
const BASE = ${JSON.stringify(base)};
const ASSETS = ${JSON.stringify(urls)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE) || event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match(BASE + 'index.html').then(cached => cached || new Response('Open the exhibition online once to save it for offline use.', {status:503, headers:{'Content-Type':'text/plain'}}))));
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});
`);
console.log(`Offline cache prepared: ${paths.length} local files under ${base}.`);
