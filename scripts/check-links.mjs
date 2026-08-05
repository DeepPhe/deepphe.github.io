#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const SKIPPED_SCHEMES = new Set(['data:', 'mailto:', 'tel:', 'javascript:', 'sms:', 'blob:']);
const BLOCKED_STATUSES = new Set([401, 403, 429, 999]);

const options = {
  checkExternal: false,
  concurrency: 8,
  timeoutMs: 15000,
  root: '_site',
  baseurl: null,
  siteUrl: null,
};

for (const arg of process.argv.slice(2)) {
  if (arg === '--external') {
    options.checkExternal = true;
  } else if (arg.startsWith('--concurrency=')) {
    options.concurrency = Number(arg.split('=')[1]);
  } else if (arg.startsWith('--timeout-ms=')) {
    options.timeoutMs = Number(arg.split('=')[1]);
  } else if (arg.startsWith('--baseurl=')) {
    options.baseurl = normalizeBaseurl(arg.split('=').slice(1).join('='));
  } else if (arg.startsWith('--site-url=')) {
    options.siteUrl = arg.split('=').slice(1).join('=');
  } else if (!arg.startsWith('--')) {
    options.root = arg;
  } else {
    throw new Error(`Unknown option: ${arg}`);
  }
}

if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
  throw new Error('--concurrency must be a positive number');
}

if (!Number.isFinite(options.timeoutMs) || options.timeoutMs < 1000) {
  throw new Error('--timeout-ms must be at least 1000');
}

const cwd = process.cwd();
const siteRoot = path.resolve(cwd, options.root);
const config = await readJekyllConfig(path.join(cwd, '_config.yml'));
const baseurl = options.baseurl ?? normalizeBaseurl(config.baseurl ?? '');
const siteUrl = options.siteUrl ?? config.url ?? '';
const siteOrigin = siteUrl ? new URL(siteUrl).origin : null;
const htmlFiles = await listHtmlFiles(siteRoot);
const failures = [];
const externalUrls = new Map();
let checkedInternal = 0;
let skippedExternal = 0;
let blockedExternal = 0;

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const references = extractReferences(html);

  for (const reference of references) {
    const result = classifyReference(reference.url, file);

    if (result.kind === 'skip') {
      continue;
    }

    if (result.kind === 'invalid') {
      failures.push(formatFailure(file, reference.attribute, reference.url, result.reason));
      continue;
    }

    if (result.kind === 'external') {
      if (options.checkExternal) {
        addSource(externalUrls, result.url, file, reference.attribute);
      } else {
        skippedExternal += 1;
      }
      continue;
    }

    checkedInternal += 1;
    const target = await resolveInternalTarget(result.path, file);

    if (!target.exists) {
      failures.push(formatFailure(file, reference.attribute, reference.url, `missing target ${target.displayPath}`));
      continue;
    }

    if (result.hash && target.htmlPath) {
      const targetHtml = await fs.readFile(target.htmlPath, 'utf8');
      if (!hasFragment(targetHtml, result.hash)) {
        failures.push(formatFailure(file, reference.attribute, reference.url, `missing fragment #${result.hash}`));
      }
    }
  }
}

let checkedExternal = 0;
if (options.checkExternal && externalUrls.size > 0) {
  const checks = Array.from(externalUrls.entries()).map(([url, sources]) => async () => {
    checkedExternal += 1;
    const result = await checkExternalUrl(url);
    if (result.blocked) {
      blockedExternal += 1;
      return;
    }
    if (!result.ok) {
      const sourceList = sources.slice(0, 3).map((source) => `${relative(source.file)} ${source.attribute}`).join(', ');
      const suffix = sources.length > 3 ? `, and ${sources.length - 3} more` : '';
      failures.push(`${url}\n  ${result.reason}\n  referenced by ${sourceList}${suffix}`);
    }
  });
  await runWithConcurrency(checks, options.concurrency);
}

if (failures.length > 0) {
  console.error(`Link check failed with ${failures.length} problem${failures.length === 1 ? '' : 's'}:\n`);
  console.error(failures.join('\n\n'));
  process.exit(1);
}

const externalSummary = options.checkExternal
  ? `checked ${checkedExternal} external URL${checkedExternal === 1 ? '' : 's'} (${blockedExternal} blocked by remote hosts)`
  : `skipped ${skippedExternal} external reference${skippedExternal === 1 ? '' : 's'}; use --external to check them`;

console.log(`Link check passed: checked ${checkedInternal} internal reference${checkedInternal === 1 ? '' : 's'}, ${externalSummary}.`);

async function readJekyllConfig(configPath) {
  try {
    const configText = await fs.readFile(configPath, 'utf8');
    return {
      baseurl: matchConfigValue(configText, 'baseurl'),
      url: matchConfigValue(configText, 'url'),
    };
  } catch {
    return {};
  }
}

function matchConfigValue(configText, key) {
  const match = configText.match(new RegExp(`^${key}:\\s*["']?([^"'#\\n]+)`, 'm'));
  return match ? match[1].trim() : null;
}

function normalizeBaseurl(value) {
  if (!value || value === '/') {
    return '';
  }

  return `/${String(value).replace(/^\/+|\/+$/g, '')}`;
}

async function listHtmlFiles(root) {
  const files = [];
  const entries = await fs.readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractReferences(html) {
  const references = [];
  const attrPattern = /\b(href|src|action)=["']([^"']+)["']/gi;
  const srcsetPattern = /\bsrcset=["']([^"']+)["']/gi;
  let match;

  while ((match = attrPattern.exec(html)) !== null) {
    references.push({
      attribute: match[1].toLowerCase(),
      url: decodeHtmlEntities(match[2]),
    });
  }

  while ((match = srcsetPattern.exec(html)) !== null) {
    for (const candidate of decodeHtmlEntities(match[1]).split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) {
        references.push({ attribute: 'srcset', url });
      }
    }
  }

  return references;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function classifyReference(rawUrl, sourceFile) {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { kind: 'skip' };
  }

  if (trimmed.startsWith('#')) {
    return {
      kind: 'internal',
      path: fileUrlPath(sourceFile),
      hash: decodeFragment(trimmed.slice(1)),
    };
  }

  if (trimmed.startsWith('//')) {
    return { kind: 'external', url: `https:${trimmed}` };
  }

  const scheme = trimmed.match(/^[a-z][a-z0-9+.-]*:/i)?.[0].toLowerCase();
  if (scheme && SKIPPED_SCHEMES.has(scheme)) {
    return { kind: 'skip' };
  }

  if (scheme === 'http:' || scheme === 'https:') {
    const parsed = new URL(trimmed);
    if (siteOrigin && parsed.origin === siteOrigin && isWithinBaseurl(parsed.pathname)) {
      return splitInternalUrl(stripBaseurl(parsed.pathname), parsed.hash);
    }
    return { kind: 'external', url: withoutHash(parsed) };
  }

  if (scheme) {
    return { kind: 'skip' };
  }

  const parsed = new URL(trimmed, 'https://example.invalid');
  if (trimmed.startsWith('/')) {
    if (baseurl && !isWithinBaseurl(parsed.pathname)) {
      return {
        kind: 'invalid',
        reason: `root-relative path is missing configured baseurl ${baseurl}`,
      };
    }
    return splitInternalUrl(stripBaseurl(parsed.pathname), parsed.hash);
  }

  const sourceDir = path.posix.dirname(fileUrlPath(sourceFile));
  const resolvedPath = path.posix.normalize(path.posix.join(sourceDir, parsed.pathname));
  return splitInternalUrl(resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`, parsed.hash);
}

function isWithinBaseurl(pathname) {
  return !baseurl || pathname === baseurl || pathname.startsWith(`${baseurl}/`);
}

function stripBaseurl(pathname) {
  if (!baseurl) {
    return pathname;
  }

  if (pathname === baseurl) {
    return '/';
  }

  return pathname.startsWith(`${baseurl}/`) ? pathname.slice(baseurl.length) : pathname;
}

function splitInternalUrl(pathname, hash) {
  return {
    kind: 'internal',
    path: pathname || '/',
    hash: decodeFragment(hash.startsWith('#') ? hash.slice(1) : hash),
  };
}

function fileUrlPath(file) {
  const relativePath = toPosix(path.relative(siteRoot, file));
  if (relativePath === 'index.html') {
    return '/';
  }

  return `/${relativePath}`;
}

async function resolveInternalTarget(urlPath, sourceFile) {
  const decodedPath = decodePath(urlPath);
  const rawTarget = path.resolve(siteRoot, `.${decodedPath}`);

  if (!isInsideSite(rawTarget)) {
    return { exists: false, displayPath: decodedPath };
  }

  const candidates = [
    rawTarget,
    path.join(rawTarget, 'index.html'),
  ];

  if (!path.extname(rawTarget)) {
    candidates.push(`${rawTarget}.html`);
  }

  for (const candidate of candidates) {
    if (!isInsideSite(candidate)) {
      continue;
    }

    const stat = await statOrNull(candidate);
    if (stat?.isFile()) {
      return {
        exists: true,
        htmlPath: candidate.endsWith('.html') ? candidate : null,
        displayPath: toPosix(path.relative(siteRoot, candidate)),
      };
    }
  }

  return {
    exists: false,
    displayPath: `${toPosix(path.relative(siteRoot, rawTarget))} from ${relative(sourceFile)}`,
  };
}

function decodePath(urlPath) {
  try {
    return decodeURI(urlPath);
  } catch {
    return urlPath;
  }
}

function decodeFragment(hash) {
  if (!hash) {
    return '';
  }

  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

async function statOrNull(file) {
  try {
    return await fs.stat(file);
  } catch {
    return null;
  }
}

function isInsideSite(file) {
  const relativePath = path.relative(siteRoot, file);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function hasFragment(html, hash) {
  if (!hash) {
    return true;
  }

  const escaped = escapeRegExp(encodeHtmlAttribute(hash));
  const pattern = new RegExp(`\\s(?:id|name)=["']${escaped}["']`, 'i');
  return pattern.test(html);
}

function encodeHtmlAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function withoutHash(parsed) {
  parsed.hash = '';
  return parsed.toString();
}

function addSource(map, url, file, attribute) {
  if (!map.has(url)) {
    map.set(url, []);
  }
  map.get(url).push({ file, attribute });
}

async function checkExternalUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'DeepPhe link checker (+https://deepphe.github.io)',
      },
    });

    if (BLOCKED_STATUSES.has(response.status)) {
      return { ok: true, blocked: true };
    }

    if (response.status >= 400) {
      return { ok: false, reason: `HTTP ${response.status}` };
    }

    return { ok: true, blocked: false };
  } catch (error) {
    return { ok: false, reason: error.name === 'AbortError' ? 'request timed out' : error.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency(tasks, concurrency) {
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, async () => {
    while (index < tasks.length) {
      const task = tasks[index];
      index += 1;
      await task();
    }
  });

  await Promise.all(workers);
}

function formatFailure(file, attribute, url, reason) {
  return `${relative(file)} ${attribute}="${url}"\n  ${reason}`;
}

function relative(file) {
  return toPosix(path.relative(cwd, file));
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
