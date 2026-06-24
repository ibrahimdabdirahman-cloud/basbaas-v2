#!/usr/bin/env node
/* ----------------------------------------------------------------------
 * BasBaas — fetch the real food photography into assets/img/
 *
 * Cross-platform (Windows/macOS/Linux). Node 18+ (built-in fetch).
 *   node fetch-assets.mjs
 *
 * The repo ships with on-brand PLACEHOLDER images so it deploys cleanly;
 * this replaces them with the real photos from the live site.
 * -------------------------------------------------------------------- */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const BASE = 'https://basbaascuisine.co.uk/wp-content/uploads';
const DEST = 'assets/img';
const HEADERS = {
  'Referer': 'https://basbaascuisine.co.uk/',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
};

const paths = [
  '2026/01/basbaas-main.jpg',
  '2026/02/Tea-Sabaayad.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-37-5.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36-3.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36-5.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-37-9.jpg',
  '2026/01/unnamed15.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36-11.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-37-7.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-38.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-37-8.jpg',
  '2026/01/omelet.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36-2.jpg',
  '2026/05/PHOTO-2026-05-07-20-31-18.jpg',
  '2026/01/PHOTO-2026-01-10-17-43-36-9.jpg'
];

await mkdir(DEST, { recursive: true });
let ok = 0, fail = 0;
for (const p of paths) {
  const name = basename(p);
  try {
    const res = await fetch(`${BASE}/${p}`, { headers: HEADERS });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(DEST, name), buf);
    console.log('  \u2713 ' + name);
    ok++;
  } catch (e) {
    console.log('  \u2717 ' + name + '  (' + e.message + ')');
    fail++;
  }
}
console.log(`\nDone. ${ok} downloaded, ${fail} failed into ${DEST}/`);
if (fail) console.log(`If some failed, drop your own photos into ${DEST}/ using the same filenames.`);
