/**
 * Checks every internal link in the built site.
 *
 * Three bugs in this repository have been a link or an entry pointing at something that was not
 * there, each surviving a clean build and a clean type check. The schemas catch a bad reference in
 * the data; this catches a bad reference in the markup, which is the other half.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

const files = await htmlFiles(DIST);
const routeOf = (f) => '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/\/$/, '');

const pages = new Map();
for (const f of files) {
  const html = await readFile(f, 'utf8');
  pages.set(routeOf(f), { html, ids: new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1])) });
}

const problems = [];
for (const [route, { html }] of pages) {
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const [path, anchor] = m[1].split('#');
    const target = path === '' ? route : path.replace(/\/$/, '') || '/';
    // Assets are served from disk and are not routes.
    if (target.startsWith('/_astro') || /\.[a-z0-9]{2,5}$/i.test(target)) continue;
    const page = pages.get(target) ?? pages.get(target + '/');
    if (!page) {
      problems.push(`${route} -> ${m[1]} (no such page)`);
      continue;
    }
    if (anchor && !page.ids.has(anchor)) problems.push(`${route} -> ${m[1]} (no such anchor)`);
  }
}

if (problems.length > 0) {
  console.error(`check-links: ${problems.length} broken internal link(s)`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`check-links: ${pages.size} pages, all internal links resolve.`);
