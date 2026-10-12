// VU official-updates watcher.
// Runs on GitHub Actions every 15 minutes. Reads official Virtual University pages,
// finds notices / date sheets / results / admission / fee / exam news, and keeps them
// in updates.json. Items are STICKY: once found they stay in the file (newest first)
// until 120 newer items push them out, so the site keeps showing them until a newer
// update arrives. No npm packages needed (Node 20+).
import fs from 'fs';

const FILE = 'updates.json';
const MAX_ITEMS = 120;
const HEARTBEAT_H = 6; // write the file at least this often (keeps repo "active" for GitHub schedules)

// Pages to read. A failing page is skipped; the others still work.
const SOURCES = [
  'https://www.vu.edu.pk/',
  'https://vu.edu.pk/',
  'https://www.vu.edu.pk/Admissions/Default',
  'https://www.vu.edu.pk/Announcements/Default',
  'https://www.vu.edu.pk/News/Default',
  'https://www.vu.edu.pk/Examination/Default',
  'https://datesheet.vu.edu.pk/',
  'https://vulms.vu.edu.pk/',
];

const KEY = /admission|date ?sheet|datesheet|result|schedule|notice|notification|fee|voucher|announce|exam|quiz|gdb|assignment|semester|last date|extended|extension|scholarship|convocation|enrol|enroll|registration|merit|admit card|roll no|re-?check|supplementary|hec|ramadan|holiday|closed|dues/i;
const JUNK = /^(home|about|contact|login|log in|sign in|read more|more|click here|here|next|previous|apply now|admissions?|news|events?|programs?|faq|help|privacy|terms|sitemap|download|view all|vu lms|lms)$/i;
const DATE_RX = /\b(\d{1,2}(st|nd|rd|th)?[\s,-]+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*[\s,-]+\d{2,4}|(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*[\s,-]+\d{1,2}(st|nd|rd|th)?,?[\s-]+\d{2,4}|\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})\b/i;

const kindOf = t =>
  /date ?sheet|datesheet|exam schedule|admit card|roll no/i.test(t) ? 'datesheet' :
  /result|merit|gazette/i.test(t) ? 'result' :
  /admission|enrol|enroll|registration|apply|last date/i.test(t) ? 'admission' :
  /fee|voucher|dues|scholarship/i.test(t) ? 'fee' :
  /assignment|quiz|gdb/i.test(t) ? 'coursework' : 'notice';

const clean = s => s.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ').trim();
const normUrl = u => { try { const x = new URL(u); x.hash = ''; return x.href.replace(/\/$/, '').toLowerCase(); } catch { return u; } };
const normTxt = t => t.toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, ' ').trim();
const idOf = (t, u) => { let h = 0; const s = normTxt(t) + '|' + normUrl(u); for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };

async function get(url) {
  for (let a = 0; a < 3; a++) {
    const c = new AbortController(), t = setTimeout(() => c.abort(), 25000);
    try {
      const r = await fetch(url, { signal: c.signal, redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; ChishtiPortalBot/1.0)', 'accept': 'text/html,*/*', 'accept-language': 'en' } });
      if (r.ok) return await r.text();
      if (r.status === 404) return null;
    } catch { /* retry */ } finally { clearTimeout(t); }
    await new Promise(r => setTimeout(r, 1500 * (a + 1)));
  }
  return null;
}

function extract(html, src) {
  const out = [];
  // 1) links whose text looks like an official update
  for (const m of html.matchAll(/<a\b[^>]*?href\s*=\s*["']([^"'#][^"']*)["'][^>]*>([\s\S]{3,400}?)<\/a>/gi)) {
    const href = m[1].trim();
    if (/^(javascript:|mailto:|tel:)/i.test(href)) continue;
    const t = clean(m[2]);
    if (t.length < 14 || t.length > 220 || JUNK.test(t)) continue;
    const isFile = /\.(pdf|docx?|xlsx?)(\?|$)/i.test(href);
    if (!KEY.test(t) && !(isFile && DATE_RX.test(t))) continue;
    let u; try { u = new URL(href, src).href; } catch { continue; }
    out.push({ t, u });
  }
  // 2) plain text lines (not links) that mention a keyword AND a date, e.g. "Last date to submit fee: 15 Oct 2026"
  const body = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<\/(p|li|div|h\d|tr|td|span|br)>|<br\s*\/?>/gi, '\n');
  for (const line of clean2(body)) {
    if (line.length < 20 || line.length > 200) continue;
    if (KEY.test(line) && DATE_RX.test(line) && !JUNK.test(line)) out.push({ t: line, u: src });
  }
  return out;
}
const clean2 = s => s.replace(/<[^>]*>/g, ' ').split(/\n+/).map(x => clean(x)).filter(Boolean);

// ---- load old state (supports old array format) ----
let old = {}; let items = [];
try {
  const j = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  if (Array.isArray(j)) items = j; else { old = j; items = j.items || []; }
} catch { /* first run */ }
items = items.filter(x => x && x.t && x.u).map(x => ({ id: x.id || idOf(x.t, x.u), t: x.t, u: x.u, d: x.d || new Date().toISOString(), k: x.k || kindOf(x.t) }));
const seen = new Set(items.map(x => x.id)), seenTxt = new Set(items.map(x => normTxt(x.t)));

const now = new Date().toISOString();
const sources = {}; let okCount = 0; const added = [];

const pages = await Promise.all(SOURCES.map(async s => [s, await get(s)]));
for (const [s, html] of pages) {
  if (!html) { sources[s] = { ok: false, at: now }; console.log('skip', s); continue; }
  okCount++;
  let n = 0;
  for (const x of extract(html, s)) {
    const id = idOf(x.t, x.u), tx = normTxt(x.t);
    if (seen.has(id) || seenTxt.has(tx)) continue;
    seen.add(id); seenTxt.add(tx); n++;
    added.push({ id, t: x.t, u: x.u, d: now, k: kindOf(x.t) });
  }
  sources[s] = { ok: true, at: now, new: n };
}

const changed = added.length > 0;
if (changed) items = [...added, ...items];
items = items.slice(0, MAX_ITEMS);

const hoursSince = old.checked ? (Date.now() - new Date(old.checked)) / 36e5 : 99;
const out = {
  v: 2,
  checked: okCount ? now : (old.checked || now),   // last time at least one official page was read OK
  lastChange: changed ? now : (old.lastChange || (items[0] && items[0].d) || now),
  ok: okCount, total: SOURCES.length,
  sources,
  items,
};
if (changed || hoursSince >= HEARTBEAT_H || !fs.existsSync(FILE) || Array.isArray(old)) {
  fs.writeFileSync(FILE, JSON.stringify(out, null, 1));
  console.log(changed ? `new: ${added.length}` : 'heartbeat', `| pages ok ${okCount}/${SOURCES.length}`);
} else console.log('no change');
