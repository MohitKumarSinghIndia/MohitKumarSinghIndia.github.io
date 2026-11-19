import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({window: {}});
vm.runInContext(read('assets/data/projects.js'), context);
vm.runInContext(read('assets/js/project-art.js'), context);
const projects = context.window.PORTFOLIO_PROJECTS;
assert(Array.isArray(projects) && projects.length > 0, 'Add at least one project.');
const ids = new Set();
let assets = 0;

function checkPath(value, label) {
  if (!value || /^(https?:|mailto:|tel:|#)/i.test(value)) return;
  assert(!value.startsWith('/'), `${label}: use a relative path without a leading slash.`);
  assert(!value.includes('\\'), `${label}: use forward slashes in website paths.`);
  const file = path.resolve(root, value.split(/[?#]/)[0]);
  assert(file.startsWith(root + path.sep), `${label}: path must stay inside the website.`);
  assert(fs.existsSync(file) && fs.statSync(file).isFile(), `${label}: missing file ${value}`);
  assets++;
}

for (const project of projects) {
  assert(/^[a-z0-9-]+$/.test(project.id), `Invalid project id: ${project.id}`);
  assert(!ids.has(project.id), `Duplicate project id: ${project.id}`);
  ids.add(project.id);
  assert(['games', 'xr', 'web'].includes(project.category), `Invalid category: ${project.id}`);
  for (const field of ['title', 'summary', 'type', 'label', 'intro']) assert(typeof project[field] === 'string' && project[field].trim(), `Missing ${field}: ${project.id}`);
  assert(Array.isArray(project.tags) && project.tags.every(tag => typeof tag === 'string'), `Invalid tags: ${project.id}`);
  assert(Array.isArray(project.details) && project.details.every(detail => typeof detail === 'string'), `Invalid details: ${project.id}`);
  assert(Array.isArray(project.links), `Invalid links: ${project.id}`);
  for (const link of project.links) {
    assert(typeof link.label === 'string' && link.label.trim(), `Missing link label: ${project.id}`);
    assert(typeof link.url === 'string' && /^https?:\/\//i.test(link.url), `Use a full HTTP(S) URL for project links: ${project.id}`);
  }
  checkPath(project.thumbnail, `${project.id} thumbnail`);
  checkPath(project.webglUrl, `${project.id} WebGL build`);
  if (project.video) {
    assert(['file', 'youtube'].includes(project.video.type), `Invalid video type: ${project.id}`);
    if (project.video.type === 'youtube') assert(/^[a-zA-Z0-9_-]{11}$/.test(project.video.id || ''), `Use only the 11-character YouTube id: ${project.id}`);
    else {
      assert(project.video.src, `Missing video src: ${project.id}`);
      checkPath(project.video.src, `${project.id} video`);
      checkPath(project.video.poster, `${project.id} video poster`);
      checkPath(project.video.captions, `${project.id} video captions`);
    }
  }
}
const html = read('index.html');
for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) checkPath(value, 'index.html asset');
assert(fs.existsSync(path.join(root, '.nojekyll')), 'Keep .nojekyll for GitHub Pages.');
for (const file of ['assets/data/projects.js', 'assets/js/project-art.js', 'assets/js/projects.js', 'assets/js/main.js', 'scripts/serve.mjs']) {
  execFileSync(process.execPath, ['--check', path.join(root, file)]);
}

function inspect(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) inspect(file);
    else if (!file.endsWith('.zip')) assert(fs.statSync(file).size <= 100 * 1024 * 1024, `${path.relative(root, file)} exceeds GitHub's 100 MiB regular-file limit. Host this media externally.`);
  }
}
inspect(root);
console.log(`Passed: ${projects.length} projects, ${assets} local asset references, JavaScript syntax, and file-size checks.`);
