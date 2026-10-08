import { readFile, stat } from 'node:fs/promises';
import { loadEnv } from 'vite';
import path from 'node:path';

const env = loadEnv('production', process.cwd(), '');
const base = env.VITE_BASE_PATH || '/beyond-the-horizon/';
const outDir = env.VITE_OUTPUT_DIR || 'dist';
const html = await readFile(path.join(outDir,'index.html'),'utf8');
const sw = await readFile(path.join(outDir,'sw.js'),'utf8');
const localRefs = [...html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)].map(match => match[1]);
for (const url of localRefs) {
  if (!url.startsWith(base)) throw new Error(`Asset escapes Pages base: ${url}`);
  await stat(path.join(outDir, url.slice(base.length)));
}
const assets = JSON.parse(sw.match(/const ASSETS = (\[[\s\S]*?\]);/)[1]);
for (const url of assets) {
  if (!url.startsWith(base)) throw new Error(`Offline asset escapes Pages base: ${url}`);
  if (url !== base) await stat(path.join(outDir, url.slice(base.length)));
}
await stat(path.join(outDir,'Beyond-the-Horizon.pdf'));
console.log(`Checked ${localRefs.length} HTML asset URLs and ${assets.length} offline URLs for ${base}.`);
