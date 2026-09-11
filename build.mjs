import { readFile, mkdir, copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
const files = ['index.html', 'styles.css', 'script.js', 'favicon.svg', '.nojekyll', 'assets/anto-patrex.jpg', 'assets/san-francisco.jpg', 'assets/workshop-robot.webp'];
const html = await readFile('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML ID');
for (const [, hash] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(hash)) throw new Error(`Missing anchor: ${hash}`);
}
for (const [, ref] of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(ref)) continue;
  await stat(ref);
}
for (const file of files) {
  const target = join('dist', file);
  await mkdir(join(target, '..'), { recursive: true });
  await copyFile(file, target);
}
console.log(`Static build ready: ${files.length} files; local assets and anchors verified.`);
