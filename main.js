'use strict';

const obsidian = require('obsidian');
const { Plugin, PluginSettingTab, Setting, Modal, Notice, normalizePath, setIcon, TFile, ItemView } = obsidian;
const VIEW_TYPE = 'theme-lab-panel';

// The showcase note. A readable copy lives in showcase.md; keep the two in sync.
const SHOWCASE = `---
tags: [theme-lab, showcase]
title: Theme Lab Showcase
issue: 12
drawn: 2026-09-12
published: true
aliases: [Showcase]
---
A first paragraph directly under the properties. It should sit comfortably below the metadata block and read at body size, with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, ==highlight==, \`inline code\`, a [[Theme Lab Showcase|resolved link]], an [[Not A Real Note|unresolved link]], an [external link](https://obsidian.md), a footnote[^1], inline math $E = mc^2$, and two tags: #showcase #theme-lab

A second, longer paragraph to check line height, measure and wrapping. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. A word with a trailing ==highlight==, then punctuation. Keyboard: <kbd>Ctrl</kbd> + <kbd>P</kbd>. Sub<sub>script</sub> and super<sup>script</sup>. An HTML <mark>mark</mark>. A \`code span with a #tag-like string\` and a \`very-long-inline-code-span-that-should-not-break-the-line-badly\`.

# Heading one

## Heading two

### Heading three

#### Heading four

##### Heading five

###### Heading six

## A heading long enough to wrap onto a second line in a note with Readable line length turned on

## Lists

- Bullet one
- Bullet two with **bold** and a [[Theme Lab Showcase|link]]
	- Nested bullet
		- Third level
			- Fourth level
- Bullet with a \`code span\`

1. Numbered one
2. Numbered two
	1. Nested numbered
	2. Nested numbered two
3. Numbered three
	- Mixed bullet under a number

- [ ] Task open
- [x] Task done
- [ ] Task with a #tag and a [[Theme Lab Showcase|link]]
	- [ ] Nested task
	- [x] Nested task done
- [/] Task in progress (custom state)
- [-] Task cancelled (custom state)
- [?] Task question (custom state)

## Callouts

> [!note] Note
> The stock note callout. Every type below should be visibly different.

> [!abstract] Abstract
> Also \`summary\` and \`tldr\`.

> [!info] Info
> Plain information.

> [!todo] Todo
> Something to do.

> [!tip] Tip
> Also \`hint\` and \`important\`.

> [!success] Success
> Also \`check\` and \`done\`.

> [!question] Question
> Also \`help\` and \`faq\`.

> [!warning] Warning
> Also \`caution\` and \`attention\`.

> [!failure] Failure
> Also \`fail\` and \`missing\`.

> [!danger] Danger
> Also \`error\`.

> [!bug] Bug
> A bug.

> [!example] Example
> An example.

> [!quote] Quote
> Also \`cite\`. "Nothing good happens after 2 a.m., but nothing bad does either."

> [!tip]- Collapsed by default
> You should not see this until the callout is opened.

> [!note]+ Expanded by default
> This one starts open.

> [!warning] A callout with a long title that should wrap or truncate gracefully in a narrow pane without breaking the icon alignment
> Body text.

> [!tip] Nested callouts
> Outer body.
> > [!question] Inner
> > Inner body.
> > - a list inside a callout
> > - [ ] a task inside a callout
> > \`\`\`bash
> > echo "code inside a callout"
> > \`\`\`

> [!custom] A custom type
> Types the theme does not know should fall back sensibly.

> A plain blockquote, not a callout.
> Second line of the blockquote.

## Code

\`\`\`bash
sudo lsof -i :5230
kill -9 $(lsof -t -i :5230)   # a comment
export VERY_LONG_VARIABLE_NAME="a long string value that should scroll horizontally rather than wrap unless the theme chooses to wrap code"
\`\`\`

\`\`\`js
// keywords, strings, numbers, functions, comments
const answer = 42;
function greet(name = "world") {
  return \`Hello, \${name}!\`;
}
export default greet;
\`\`\`

\`\`\`python
def fib(n: int) -> int:
    """Return the nth Fibonacci number."""
    return n if n < 2 else fib(n - 1) + fib(n - 2)
\`\`\`

\`\`\`
A fenced block with no language.
\`\`\`

    An indented code block.

## Table

| Left | Center | Right |
|:-----|:------:|------:|
| \`lsof\` | Open files and ports | slow |
| **ss** | Socket stats | fast |
| A much longer cell of text that pushes the column | *italic* | 1,024 |

## Rules and embeds

---

***

![[Theme Lab Showcase#Heading two]]

![[missing-image.png]]

![Alt text for an external image](https://obsidian.md/images/banner.png)

$$
\\int_0^\\infty e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}
$$

\`\`\`mermaid
graph LR
  A[Capture] --> B[Inspect]
  B --> C[Report]
\`\`\`

%%
A comment block. It must not render in Reading view.
%%

<div class="theme-lab-html">A raw HTML block with <b>bold</b> and <a href="https://obsidian.md">a link</a>.</div>

## Long form

This section exists so there is enough text below the fold to test scrolling, the scrollbar, and how the note ends. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

The end.

[^1]: The footnote text, with a [[Theme Lab Showcase|link]] and \`code\`.

---

> [!info]- Chrome checklist (not part of the note)
> Things to open while this note is showing, in both schemes:
> - Settings → Appearance (headings, dropdowns, toggle, slider, buttons)
> - Command palette (Ctrl/Cmd+P) with something typed so there are matches
> - Right-click a file in the explorer; right-click inside the note
> - Hover a ribbon icon (tooltip) and a link (hover preview)
> - Search in the left sidebar with a query that has results
> - Backlinks and outline in the right sidebar
> - Graph view; a canvas; a new empty note
> - Both sidebars collapsed, then expanded
> - Readable line length on and off
`;

const DEFAULT_SETTINGS = {
  panelOpen: {},
  outputFolder: 'Theme Lab',
  showcaseName: 'Theme Lab Showcase',
  settleMs: 700,
  schemes: { dark: true, light: true },
  views: { reading: true, live: true, source: false },
  sidebars: { open: true, closed: true },
  extras: { settings: true, 'settings-editor': true, 'settings-plugins': true, palette: true, switcher: true, menu: true, 'editor-menu': true, tooltip: true, hover: true, preview: true, search: true, 'right-sidebar': true, graph: true, notice: true },
  targets: '',            // one heading per line; empty = top of note + every H2
  cropListing: true,      // 1200x800 crop centred on the note
  cropHero: true,         // 1920-wide full-window resize
  inspectWriteNote: false,
  preset: 'review',
  forceReadable: true,
  leftTab: 'file-explorer',   // which left-sidebar pane to show during captures
  scratchCss: '',
  scratchEnabled: true,
  watchVars: '--background-primary, --text-normal, --text-accent, --interactive-accent',
  abScratch: false,
};

// ---------- small helpers ----------
const PRESETS = {
  review:  { label: 'Full review',        desc: 'Both schemes, Reading + Live Preview, sidebars open and closed, all chrome, every H2. ~120 shots, 10 sheets.', schemes: { dark: true, light: true }, views: { reading: true, live: true, source: false }, sidebars: { open: true, closed: true }, extras: { settings: true, 'settings-editor': true, 'settings-plugins': true, palette: true, switcher: true, menu: true, 'editor-menu': true, tooltip: true, hover: true, preview: true, search: true, 'right-sidebar': true, graph: true, notice: true }, targets: '' },
  quick:   { label: 'Quick check',        desc: 'Both schemes, Reading only, sidebars open, top of note only, no chrome. 2 shots.', schemes: { dark: true, light: true }, views: { reading: true, live: false, source: false }, sidebars: { open: true, closed: false }, extras: { settings: false, 'settings-editor': false, 'settings-plugins': false, palette: false, switcher: false, menu: false, 'editor-menu': false, tooltip: false, hover: false, preview: false, search: false, 'right-sidebar': false, graph: false, notice: false }, targets: '-' },
  editor:  { label: 'Editor pass',        desc: 'Both schemes, Live Preview + Source, sidebars open, every H2, no chrome.', schemes: { dark: true, light: true }, views: { reading: false, live: true, source: true }, sidebars: { open: true, closed: false }, extras: { settings: false, 'settings-editor': false, 'settings-plugins': false, palette: false, switcher: false, menu: false, 'editor-menu': false, tooltip: false, hover: false, preview: false, search: false, 'right-sidebar': false, graph: false, notice: false }, targets: '' },
  chrome:  { label: 'Chrome only',        desc: 'Both schemes, every chrome capture (settings tabs, palette, switcher, menus, hover, preview, search, right sidebar, graph, notice); one Reading shot of the top of the note each.', schemes: { dark: true, light: true }, views: { reading: true, live: false, source: false }, sidebars: { open: true, closed: false }, extras: { settings: true, 'settings-editor': true, 'settings-plugins': true, palette: true, switcher: true, menu: true, 'editor-menu': true, tooltip: true, hover: true, preview: true, search: true, 'right-sidebar': true, graph: true, notice: true }, targets: '-' },
  artwork: { label: 'Artwork',            desc: 'Both schemes, Reading, sidebars closed, top of note only — the two captures for listing shots and README heroes.', schemes: { dark: true, light: true }, views: { reading: true, live: false, source: false }, sidebars: { open: false, closed: true }, extras: { settings: false, 'settings-editor': false, 'settings-plugins': false, palette: false, switcher: false, menu: false, 'editor-menu': false, tooltip: false, hover: false, preview: false, search: false, 'right-sidebar': false, graph: false, notice: false }, targets: '-' },
};

const sleep = (ms) => new Promise((r) => window.setTimeout(r, ms));
const pad = (n) => String(n).padStart(2, '0');
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'x';

const INSPECT_PROPS = [
  'display', 'position', 'z-index', 'overflow', 'width', 'height', 'margin', 'padding', 'box-sizing',
  'color', 'background-color', 'background-image', 'opacity', 'visibility',
  'border', 'border-radius', 'outline', 'box-shadow',
  'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-transform', 'text-align', 'text-decoration', 'text-shadow',
  'transform', 'mix-blend-mode', 'list-style', 'cursor',
];
const BANNED = [
  ['!important', '!important'], ['clip-path', 'clip-path'], ['-webkit-mask', '-webkit-mask'], ['mask:', 'mask'],
  ['text-decoration-color', 'text-decoration-color'], ['-webkit-text-stroke', '-webkit-text-stroke'],
  ['backdrop-filter', 'backdrop-filter'], [':has(', ':has()'], ['text-indent', 'text-indent (partial support in 1.4.5)'],
];
const OBS_PREFIXES = ['workspace', 'nav-', 'view-', 'markdown', 'cm-', 'callout', 'metadata', 'tree-item', 'status-bar', 'modal', 'prompt', 'suggestion', 'menu', 'setting', 'tab-', 'tag', 'search-', 'graph', 'side-dock', 'sidebar', 'titlebar', 'inline-title', 'HyperMD', 'multi-select', 'checkbox', 'clickable-icon', 'dropdown', 'slider', 'notice', 'tooltip', 'popover', 'embed', 'list-', 'task-list', 'footnote', 'table', 'math', 'mermaid', 'vertical-tab', 'horizontal-tab', 'community', 'backlink', 'outline', 'canvas', 'internal-embed', 'external-link', 'is-', 'mod-'];

function specificity(sel) {
  // rough but adequate: ids / classes+attrs+pseudo-classes / elements+pseudo-elements
  let s = sel.replace(/\\./g, '').replace(/\[[^\]]*\]/g, ' [a] ').replace(/::?(before|after|marker|selection|first-letter|first-line)/g, ' e ').replace(/:not\(([^)]*)\)/g, ' $1 ').replace(/:(is|where)\([^)]*\)/g, ' ');
  const ids = (s.match(/#[\w-]+/g) || []).length;
  const classes = (s.match(/\.[\w-]+/g) || []).length + (s.match(/\[a\]/g) || []).length + (s.match(/:[\w-]+/g) || []).length;
  const els = (s.match(/(^|[\s>+~(])[a-zA-Z][\w-]*/g) || []).length;
  return [ids, classes, els];
}
const specStr = (a) => `${a[0]},${a[1]},${a[2]}`;
const specCmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

function sheetOrigin(sheet) {
  const node = sheet.ownerNode;
  if (!node) return 'unknown';
  if (node.tagName === 'LINK') return (node.getAttribute('href') || 'link').split('/').pop();
  const txt = (node.textContent || '').trim().slice(0, 200);
  const m = txt.match(/^\/\*\s*=*\s*\n?\s*([^\n*]{3,60})/);
  if (m) return 'style: ' + m[1].trim();
  const id = node.id || node.getAttribute('data-plugin') || '';
  return id ? 'style#' + id : 'style (' + (txt.slice(0, 40).replace(/\s+/g, ' ') || 'inline') + '…)';
}

function pathOf(el) {
  const parts = [];
  let e = el;
  while (e && e !== document.body && parts.length < 14) {
    let p = e.tagName.toLowerCase();
    if (e.classList.length) p += '.' + [...e.classList].slice(0, 6).join('.');
    for (const a of ['data-type', 'data-callout', 'data-task', 'data-heading']) if (e.hasAttribute(a)) p += `[${a}="${e.getAttribute(a)}"]`;
    parts.unshift(p);
    e = e.parentElement;
  }
  return parts.join(' > ');
}

function prunedHtml(el) {
  const c = el.cloneNode(true);
  const walk = (n, depth) => {
    for (const ch of [...n.children]) {
      if (depth >= 1) { const keep = ch.cloneNode(false); keep.textContent = ch.children.length ? `…(${ch.children.length} children)` : (ch.textContent || '').trim().slice(0, 40); n.replaceChild(keep, ch); }
      else walk(ch, depth + 1);
    }
  };
  walk(c, 0);
  let html = c.outerHTML;
  return html.length > 2500 ? html.slice(0, 2500) + '…' : html;
}

function matchedRules(el) {
  const out = [];
  let order = 0;
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; }
    const origin = sheetOrigin(sheet);
    const visit = (list) => {
      for (const r of list) {
        if (r.cssRules && (r.type === 4 || r.type === 12 || r.type === 3)) { visit(r.cssRules); continue; } // media/supports/layer
        if (!r.selectorText) continue;
        for (const sel of r.selectorText.split(/,(?![^(]*\))/)) {
          const s = sel.trim();
          const base = s.replace(/::?(before|after|marker|selection|first-letter|first-line)$/, '');
          let ok = false;
          try { ok = el.matches(base); } catch (e) { ok = false; }
          if (!ok) continue;
          out.push({ order: order++, origin, selector: s, pseudo: base !== s, spec: specificity(s), style: r.style });
        }
      }
    };
    visit(rules);
  }
  return out;
}

function inspectData(el) {
  const rules = matchedRules(el);
  const winners = {};
  for (const ru of rules) {
    if (ru.pseudo) continue;
    for (let i = 0; i < ru.style.length; i++) {
      const prop = ru.style[i]; const imp = ru.style.getPropertyPriority(prop) === 'important';
      const cur = winners[prop];
      if (!cur || (imp && !cur.imp) || (imp === cur.imp && specCmp(ru.spec, cur.ru.spec) >= 0)) winners[prop] = { ru, imp, value: ru.style.getPropertyValue(prop) };
    }
  }
  return { rules, winners };
}
function inspectReport(el) {
  const cs = getComputedStyle(el);
  const lines = [];
  lines.push('# Theme Lab — inspect');
  lines.push('');
  lines.push('theme: ' + currentThemeName() + ' · scheme: ' + (document.body.classList.contains('theme-dark') ? 'dark' : 'light') + ' · ' + new Date().toISOString());
  lines.push('');
  lines.push('## Path');
  lines.push('```');
  lines.push(pathOf(el));
  lines.push('```');
  lines.push('');
  lines.push('## Element (children pruned)');
  lines.push('```html');
  lines.push(prunedHtml(el));
  lines.push('```');
  lines.push('');
  lines.push('## Computed');
  lines.push('```');
  const r = el.getBoundingClientRect();
  lines.push(`rect: ${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}×${Math.round(r.height)}`);
  for (const p of INSPECT_PROPS) { const v = cs.getPropertyValue(p); if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'static' && v !== 'visible') lines.push(`${p}: ${v}`); }
  for (const ps of ['::before', '::after']) {
    const pc = getComputedStyle(el, ps);
    if (pc.content && pc.content !== 'none' && pc.content !== 'normal') lines.push(`${ps}: content ${pc.content}; display ${pc.display}; color ${pc.color}; position ${pc.position}`);
  }
  lines.push('```');
  lines.push('');
  // rules and cascade winners
  const rules = matchedRules(el);
  const winners = {};
  for (const ru of rules) {
    if (ru.pseudo) continue;
    for (let i = 0; i < ru.style.length; i++) {
      const prop = ru.style[i];
      const imp = ru.style.getPropertyPriority(prop) === 'important';
      const cand = { ru, imp };
      const cur = winners[prop];
      if (!cur || (imp && !cur.imp) || (imp === cur.imp && specCmp(ru.spec, cur.ru.spec) >= 0)) winners[prop] = cand;
    }
  }
  lines.push(`## Matched rules (${rules.length}, document order; ★ = winning declaration)`);
  const vars = new Set();
  for (const ru of rules) {
    lines.push('');
    lines.push(`### [${specStr(ru.spec)}] ${ru.selector}   — ${ru.origin}`);
    lines.push('```css');
    for (let i = 0; i < ru.style.length; i++) {
      const prop = ru.style[i]; const val = ru.style.getPropertyValue(prop); const imp = ru.style.getPropertyPriority(prop) === 'important';
      const win = !ru.pseudo && winners[prop] && winners[prop].ru === ru;
      lines.push(`${win ? '★ ' : '  '}${prop}: ${val}${imp ? ' !important' : ''};`);
      for (const m of val.matchAll(/var\((--[\w-]+)/g)) vars.add(m[1]);
    }
    lines.push('```');
  }
  if (vars.size) {
    lines.push('');
    lines.push('## Variables referenced (computed on this element)');
    lines.push('```');
    for (const v of [...vars].sort()) lines.push(`${v}: ${cs.getPropertyValue(v).trim() || '(unset)'}`);
    lines.push('```');
  }
  return lines.join('\n');
}

let _app;
const isElement = (t) => !!t && typeof t.instanceOf === 'function' && t.instanceOf(Element);
function currentThemeName() {
  try { return (_app && _app.customCss && _app.customCss.theme) || 'Default'; } catch (e) { return 'unknown'; }
}

// ---------- colour + contrast ----------
let _ctx;
function parseColor(str) {
  if (!str) return null;
  if (!_ctx) { const c = createEl('canvas'); c.width = c.height = 1; _ctx = c.getContext('2d', { willReadFrequently: true }); }
  _ctx.clearRect(0, 0, 1, 1);
  _ctx.fillStyle = '#000'; _ctx.fillStyle = str.trim();
  if (_ctx.fillStyle === '#000000' && !/^(#000|black|rgb\(0,\s*0,\s*0)/.test(str.trim())) { /* maybe unparsable */ }
  _ctx.fillRect(0, 0, 1, 1);
  const d = _ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2], d[3] / 255];
}
function over(fg, bg) { const a = fg[3]; return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1]; }
function lum(c) { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); }
function contrast(fg, bg) { const a = lum(fg) + 0.05, b = lum(bg) + 0.05; return a > b ? a / b : b / a; }

// Accessibility checks the CSS can answer on its own. Each returns findings with a line number.
function a11yCss(css) {
  const out = [];
  if (!css) return out;
  const src = css.replace(/url\(data:[^)]*\)/g, 'url(…)');   // embedded fonts would drown the line numbers
  const lineAt = (i) => src.slice(0, i).split('\n').length;
  const add = (rule, level, text, i, detail) => out.push({ rule, level, text, line: i === null ? null : lineAt(i), detail: detail || '' });

  // Motion that a reader could be sensitive to: keyframe animations, anything that moves, and slow fades.
  // A 120 ms colour transition on hover is not that, so it is not counted.
  const keyframes = [...src.matchAll(/@keyframes\s+[\w-]+/g)];
  const anims = [...src.matchAll(/(?:^|[;{\s])animation\s*:\s*([^;}]+)/g)];
  const moving = [...src.matchAll(/(?:^|[;{\s])transition\s*:\s*([^;}]+)/g)].filter((m) => /transform|all\b/.test(m[1]) || (Number((m[1].match(/([\d.]+)s/) || [])[1]) >= 0.4) || (Number((m[1].match(/(\d+)ms/) || [])[1]) >= 400));
  const motion = [...keyframes, ...anims, ...moving];
  const guard = /@media[^{]*prefers-reduced-motion[^{]*\{/i.test(src);
  if (motion.length && !guard) add('a11y/reduced-motion', keyframes.length || anims.length ? 'Error' : 'Warning', `${keyframes.length} keyframe animation${keyframes.length === 1 ? '' : 's'}, ${anims.length} \`animation\` declaration${anims.length === 1 ? '' : 's'} and ${moving.length} moving or slow transition${moving.length === 1 ? '' : 's'}, with no \`@media (prefers-reduced-motion: reduce)\` block. WCAG 2.3.3.`, motion[0].index);
  else if (motion.length) add('a11y/reduced-motion', 'Pass', `${motion.length} animated declaration${motion.length === 1 ? '' : 's'}, guarded by a reduced-motion block.`, null);
  else add('a11y/reduced-motion', 'Pass', 'Nothing animates beyond short colour fades.', null);

  // focus rings
  const killed = [...src.matchAll(/outline\s*:\s*(none|0)\b/g)];
  const replaced = /:focus-visible[^{]*\{[^}]*(outline|box-shadow)\s*:/.test(src);
  for (const m of killed.slice(0, 6)) add('a11y/focus-ring', replaced ? 'Warning' : 'Error', replaced ? 'Removes the focus outline; a `:focus-visible` rule replaces it elsewhere — check this selector is covered.' : 'Removes the focus outline with no `:focus-visible` replacement anywhere; keyboard users lose their place.', m.index);
  if (!killed.length) add('a11y/focus-ring', 'Pass', 'No `outline: none`.', null);

  // type size
  const small = [...src.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/g)].filter((m) => Number(m[1]) > 0 && Number(m[1]) < 11);
  for (const m of small.slice(0, 6)) add('a11y/small-text', 'Warning', `Text at ${m[1]}px; below about 11px is hard to read and cannot be scaled by the reader.`, m.index);
  // only the content root itself, not its descendants: `.markdown-rendered code { font-size: 10px }` is fine
  const body = [...src.matchAll(/(\.markdown-preview-view|\.markdown-rendered|\.cm-content|\.markdown-source-view)(\s*,[^{}]*)?\s*\{[^}]*font-size\s*:\s*\d+(?:\.\d+)?px/g)];
  for (const m of body.slice(0, 4)) add('a11y/fixed-body-size', 'Warning', 'Body text is pinned to a pixel size, so the reader\'s font-size setting does nothing. Use `var(--font-text-size)` or `em`.', m.index);

  // selection and glow
  const noSelect = [...src.matchAll(/user-select\s*:\s*none/g)];
  for (const m of noSelect.slice(0, 4)) {
    const around = src.slice(Math.max(0, m.index - 220), m.index);
    const onText = /(markdown-preview|markdown-rendered|cm-content|cm-line|markdown-source)/.test(around);
    if (onText) add('a11y/user-select', 'Warning', 'Note text cannot be selected; that breaks copying and screen-reader selection.', m.index);
  }
  const glow = [...src.matchAll(/(\.markdown-preview-view|\.markdown-rendered|\.cm-line|\.cm-content)[^{}]*\{[^}]*text-shadow\s*:\s*[^;}]+/g)];
  for (const m of glow.slice(0, 3)) add('a11y/text-shadow', 'Info', 'Body text carries a text-shadow. A glow is fine as flavour, but it lowers effective contrast — check the contrast table below.', m.index);

  return out;
}

const CONTRAST_PAIRS = [
  ['--text-normal', '--background-primary', 'Body text on note'],
  ['--text-muted', '--background-primary', 'Muted text on note'],
  ['--text-faint', '--background-primary', 'Faint text on note'],
  ['--text-accent', '--background-primary', 'Links on note'],
  ['--text-normal', '--background-secondary', 'Text on sidebar'],
  ['--nav-item-color', '--background-secondary', 'Explorer file names'],
  ['--text-on-accent', '--interactive-accent', 'Text on accent buttons'],
  ['--tag-color', '--tag-background', 'Tag text on tag'],
  ['--code-normal', '--code-background', 'Code text on code block'],
  ['--status-bar-text-color', '--status-bar-background', 'Status bar'],
  ['--tab-text-color-active', '--tab-background-active', 'Active tab'],
  ['--text-highlight-bg', '--background-primary', 'Highlight vs note (should differ)'],
  ['--background-modifier-border-focus', '--background-primary', 'Focus ring on note (3:1)'],
  ['--text-error', '--background-primary', 'Error text on note'],
  ['--text-success', '--background-primary', 'Success text on note'],
];

// ---------- the plugin ----------
class ThemeLabPlugin extends Plugin {
  async onload() {
    _app = this.app;
    await this.loadSettings();
    this.inspecting = false;
    this.addSettingTab(new ThemeLabSettingTab(this.app, this));
    this.ribbon = this.addRibbonIcon('flask-conical', 'Theme Lab: inspect element', () => this.toggleInspect());
    this.statusEl = this.addStatusBarItem();
    this.statusEl.addClass('theme-lab-status');
    this.statusEl.hide();

    this.registerView(VIEW_TYPE, (leaf) => new ThemeLabView(leaf, this));
    this.addCommand({ id: 'panel', name: 'Open panel', callback: () => this.openPanel() });
    this.applyScratch();
    this.addCommand({ id: 'inspect', name: 'Inspect element (click to copy CSS report)', callback: () => this.toggleInspect() });
    this.addCommand({ id: 'showcase', name: 'Create or open the showcase note', callback: () => this.openShowcase() });
    this.addCommand({ id: 'matrix', name: 'Capture screenshot matrix', callback: () => new MatrixModal(this.app, this).open() });
    this.addCommand({ id: 'capture-one', name: 'Capture one screenshot now', callback: () => this.captureOne() });
    this.addCommand({ id: 'compare', name: 'Compare latest matrix run with the previous one', callback: () => this.compareWithPrevious() });
    this.addCommand({ id: 'report', name: 'Write theme report (variables, contrast, lint)', callback: () => this.writeReport() });
    this.addCommand({ id: 'toggle-scheme', name: 'Toggle dark/light scheme', callback: () => this.toggleScheme() });
  }

  onunload() { this.stopInspect(); if (this._scratchSheet) { document.adoptedStyleSheets = document.adoptedStyleSheets.filter((x) => x !== this._scratchSheet); this._scratchSheet = null; } }
  async openPanel() {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) { leaf = this.app.workspace.getRightLeaf(false); await leaf.setViewState({ type: VIEW_TYPE, active: true }); }
    this.app.workspace.revealLeaf(leaf);
  }
  applyScratch() {
    if (!this._scratchSheet) { this._scratchSheet = new CSSStyleSheet(); document.adoptedStyleSheets = [...document.adoptedStyleSheets, this._scratchSheet]; }
    this.setScratchText(this.settings.scratchEnabled ? `/* Theme Lab scratch */\n${this.settings.scratchCss}` : '');
  }
  setScratchText(css) { this._scratchText = css; try { this._scratchSheet.replaceSync(css); } catch (e) { this._scratchSheet.replaceSync(''); } }
  scratchText() { return this._scratchText || ''; }
  hasScratchSheet() { return !!this._scratchSheet;
  }
  panel() { const l = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]; return l && l.view instanceof ThemeLabView ? l.view : null; }
  async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); for (const k of ['schemes', 'views', 'sidebars', 'extras']) this.settings[k] = Object.assign({}, DEFAULT_SETTINGS[k], this.settings[k]); }
  async saveSettings() { await this.saveData(this.settings); }

  // ----- inspect -----
  toggleInspect() { this.inspecting ? this.stopInspect() : this.startInspect(); }
  startInspect() {
    this.inspecting = true;
    document.body.addClass('theme-lab-inspecting');
    this.statusEl.setText('Inspect · click an element · Esc to stop'); this.statusEl.show();
    this.overlay = document.body.createDiv({ cls: 'theme-lab-overlay' });
    this._move = (e) => { const t = e.target; if (!isElement(t) || t === this.overlay || t.closest('.theme-lab-panel')) return; const r = t.getBoundingClientRect(); this.overlay.setCssProps({ '--theme-lab-x': r.left + 'px', '--theme-lab-y': r.top + 'px', '--theme-lab-w': r.width + 'px', '--theme-lab-h': r.height + 'px' }); this.overlay.dataset.label = t.tagName.toLowerCase() + (t.classList.length ? '.' + t.classList[0] : ''); };
    this._click = async (e) => {
      const t = e.target; if (!isElement(t) || t === this.overlay) return;
      if (t.closest('.theme-lab-panel')) return;
      e.preventDefault(); e.stopPropagation();
      const report = inspectReport(t);
      this.lastInspected = t; const pnl = this.panel(); if (pnl) pnl.showElement(t);
      await navigator.clipboard.writeText(report);
      new Notice('Theme Lab: report copied (' + Math.round(report.length / 1024) + ' KB)');
      if (this.settings.inspectWriteNote) await this.writeNote('Inspect ' + stamp(), report);
      if (!e.shiftKey) this.stopInspect();
    };
    this._key = (e) => { if (e.key === 'Escape') this.stopInspect(); };
    document.addEventListener('mousemove', this._move, true);
    document.addEventListener('click', this._click, true);
    document.addEventListener('keydown', this._key, true);
    new Notice('Theme Lab: click any element. Shift-click to keep inspecting. Esc to stop.');
  }
  stopInspect() {
    if (!this.inspecting) return;
    this.inspecting = false;
    document.body.removeClass('theme-lab-inspecting');
    this.statusEl.hide();
    document.removeEventListener('mousemove', this._move, true);
    document.removeEventListener('click', this._click, true);
    document.removeEventListener('keydown', this._key, true);
    if (this.overlay) { this.overlay.remove(); this.overlay = null; }
  }

  // ----- files -----
  async ensureFolder(path) {
    const p = normalizePath(path);
    const parts = p.split('/'); let cur = '';
    for (const part of parts) { cur = cur ? `${cur}/${part}` : part; if (!(await this.app.vault.adapter.exists(cur))) await this.app.vault.createFolder(cur); }
    return p;
  }
  themeDir() { return `${this.settings.outputFolder}/${currentThemeName()}`; }
  async writeNote(name, text, dir) {
    const folder = await this.ensureFolder(dir || this.themeDir());
    const path = normalizePath(`${folder}/${name}.md`);
    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof TFile) await this.app.vault.modify(existing, text); else await this.app.vault.create(path, text);
    return path;
  }
  showcasePath() { return normalizePath(this.settings.showcaseName + '.md'); }
  findNoteLeaf() {
    const path = this.showcasePath(); let found = null;
    this.app.workspace.iterateRootLeaves((l) => { try { if (!found && l.view && l.view.getViewType() === 'markdown' && l.view.file && l.view.file.path === path) found = l; } catch (e) { /* ignore */ } });
    return found;
  }
  noteRoot() { const l = this._noteLeaf || this.findNoteLeaf(); return l && l.view && l.view.containerEl ? l.view.containerEl : null; }
  async openShowcase() {
    const path = this.showcasePath();
    let f = this.app.vault.getAbstractFileByPath(path);
    if (!(f instanceof TFile)) f = await this.app.vault.create(path, SHOWCASE.replace(/Theme Lab Showcase/g, this.settings.showcaseName));
    let leaf = this.findNoteLeaf();
    if (!leaf) { leaf = this.app.workspace.getLeaf('tab'); await leaf.openFile(f); }
    this.app.workspace.setActiveLeaf(leaf, { focus: false });
    this._noteLeaf = leaf;
    return f;
  }

  // ----- scheme / view / sidebars -----
  isDark() { return document.body.classList.contains('theme-dark'); }
  async toggleScheme() { await this.setScheme(!this.isDark()); }
  async setScheme(dark) {
    if (this.isDark() === dark) return true;
    try { if (typeof this.app.changeTheme === 'function') this.app.changeTheme(dark ? 'obsidian' : 'moonstone'); } catch (e) { /* fall through */ }
    await sleep(150);
    if (this.isDark() !== dark) { try { this.app.commands.executeCommandById('theme:switch'); } catch (e) { /* ignore */ } await sleep(150); }
    await sleep(this.settings.settleMs);
    if (this.isDark() !== dark) { new Notice('Theme Lab: could not switch colour scheme'); return false; }
    return true;
  }
  async setView(leaf, mode) {
    // mode: 'reading' | 'live' | 'source'
    const vs = leaf.getViewState();
    const state = Object.assign({}, vs.state, mode === 'reading' ? { mode: 'preview' } : { mode: 'source', source: mode === 'source' });
    await leaf.setViewState({ type: 'markdown', state });
    await sleep(this.settings.settleMs);
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    try { window.getSelection().removeAllRanges(); } catch (e) { /* ignore */ }
  }
  // "open" = left sidebar open (explorer, showcase revealed), right closed. "closed" = both closed.
  async setSidebars(open) {
    const ws = this.app.workspace;
    if (ws.leftSplit) { if (open && ws.leftSplit.collapsed) ws.leftSplit.expand(); if (!open && !ws.leftSplit.collapsed) ws.leftSplit.collapse(); }
    if (ws.rightSplit && !ws.rightSplit.collapsed) ws.rightSplit.collapse();
    if (open) { try { this.app.commands.executeCommandById(this.settings.leftTab === 'search' ? 'global-search:open' : 'file-explorer:open'); this.app.commands.executeCommandById('file-explorer:reveal-active-file'); } catch (e) { /* ignore */ } }
    if (this._noteLeaf) { try { this.app.workspace.setActiveLeaf(this._noteLeaf, { focus: false }); } catch (e) { /* ignore */ } }
    await sleep(this.settings.settleMs);
  }

  // ----- scene -----
  async prepareScene(leaf) {
    // 1. left sidebar shows the file explorer with the showcase revealed; 2. no caret, no selection, no hover;
    // 3. readable line length on (optional); 4. no lingering notices, tooltips, popovers or menus
    try { this.app.commands.executeCommandById(this.settings.leftTab === 'search' ? 'global-search:open' : 'file-explorer:open'); } catch (e) { /* ignore */ }
    try { this.app.commands.executeCommandById('file-explorer:reveal-active-file'); } catch (e) { /* ignore */ }
    if (leaf) { try { this.app.workspace.setActiveLeaf(leaf, { focus: false }); } catch (e) { /* ignore */ } }
    if (this.settings.forceReadable) { try { if (this.app.vault.getConfig && this.app.vault.getConfig('readableLineLength') === false) { this.app.vault.setConfig('readableLineLength', true); this._restoreReadable = true; } } catch (e) { /* ignore */ } }
    document.querySelectorAll('.notice').forEach((n) => n.remove());
    document.querySelectorAll('.tooltip, .popover.hover-popover, .menu, .suggestion-container').forEach((n) => n.remove());
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    try { window.getSelection().removeAllRanges(); } catch (e) { /* ignore */ }
    try { const ed = leaf && leaf.view && leaf.view.editor; if (ed) ed.blur(); } catch (e) { /* ignore */ }
    await this.pointerPark();
    await sleep(this.settings.settleMs);
  }
  restoreScene() {
    const ws = this.app.workspace, st = this._sidebarState;
    if (st && ws.leftSplit) { if (st.left && !ws.leftSplit.collapsed) ws.leftSplit.collapse(); if (!st.left && ws.leftSplit.collapsed) ws.leftSplit.expand(); }
    if (st && ws.rightSplit) { if (st.right && !ws.rightSplit.collapsed) ws.rightSplit.collapse(); if (!st.right && ws.rightSplit.collapsed) ws.rightSplit.expand(); }
    if (this._restoreReadable) { try { this.app.vault.setConfig('readableLineLength', false); } catch (e) { /* ignore */ } this._restoreReadable = false; }
    if (this._rightLeaf) { try { this.app.workspace.revealLeaf(this._rightLeaf); } catch (e) { /* ignore */ } }
    try { this.app.commands.executeCommandById('file-explorer:open'); } catch (e) { /* ignore */ }
  }

  // ----- capture -----
  electronWebContents() {
    try {
      const el = window.require ? window.require('electron') : window.electron;
      if (el && el.remote && el.remote.getCurrentWebContents) return el.remote.getCurrentWebContents();
      if (window.electron && window.electron.remote) return window.electron.remote.getCurrentWebContents();
    } catch (e) { /* fall through */ }
    return null;
  }
  async capture(name, opts = {}) {
    const wc = this.electronWebContents();
    if (!wc) { new Notice('Theme Lab: screenshots need Obsidian desktop (Electron).'); throw new Error('no webContents'); }
    const statusWasShown = this.statusEl && this.statusEl.isShown(); if (statusWasShown) this.statusEl.hide();
    if (!opts.keepFocus && document.activeElement && document.activeElement.blur && !document.activeElement.closest('.modal, .prompt')) document.activeElement.blur();
    document.querySelectorAll('.is-flashing').forEach((e) => e.classList.remove('is-flashing'));
    if (!opts.keepNotices) document.querySelectorAll('.notice').forEach((n) => n.remove());
    if (!opts.keepTooltip) document.querySelectorAll('.tooltip').forEach((n) => n.remove());
    await sleep(60);
    const img = await wc.capturePage();
    if (statusWasShown) this.statusEl.show();
    const png = img.toPNG();
    const dpr = window.devicePixelRatio || 1;
    const noteRoot = this.noteRoot();
    const paneEl = noteRoot ? noteRoot.querySelector('.view-content') : document.querySelector('.workspace-split.mod-root');
    const pr = paneEl ? paneEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    const sizer = noteRoot ? [...noteRoot.querySelectorAll('.markdown-preview-sizer, .cm-sizer')].find((el) => el.getBoundingClientRect().width > 50) : null;
    let px = pr.left, pw = pr.width;
    if (sizer) { const sr = sizer.getBoundingClientRect(); const padX = 28; px = Math.max(pr.left, sr.left - padX); pw = Math.min(pr.right, sr.right + padX) - px; }
    if (!(pw > 50)) { px = pr.left; pw = pr.width; }
    this.lastPane = { x: Math.round(px * dpr), y: Math.round(pr.top * dpr), w: Math.round(pw * dpr), h: Math.round(pr.height * dpr) };
    const dbg = { target: this._lastTarget, name, img: img.getSize(), dpr, root: noteRoot ? (noteRoot.tagName + '.' + [...noteRoot.classList].join('.')) : 'NONE', pane: paneEl ? paneEl.className : 'NONE', paneRect: { l: Math.round(pr.left), t: Math.round(pr.top), w: Math.round(pr.width), h: Math.round(pr.height) }, sizer: sizer ? sizer.className : 'NONE', lastPane: this.lastPane };
    (this._debug = this._debug || []).push(dbg);
    this.lastFocus = null;
    if (opts.focus) {
      const fel = typeof opts.focus === 'string' ? document.querySelector(opts.focus) : opts.focus;
      if (fel) {
        const fr = fel.getBoundingClientRect(); const padPx = (opts.focusPad == null ? 60 : opts.focusPad);
        const x0 = Math.max(0, Math.round((fr.left - padPx) * dpr)), y0 = Math.max(0, Math.round((fr.top - padPx) * dpr));
        const x1 = Math.min(img.getSize().width, Math.round((fr.right + padPx) * dpr)), y1 = Math.min(img.getSize().height, Math.round((fr.bottom + padPx) * dpr));
        if (x1 - x0 > 40 && y1 - y0 > 20) this.lastFocus = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
      }
    }
    const folder = await this.ensureFolder(opts.dir || `${this.themeDir()}/captures`);
    const base = normalizePath(`${folder}/${name}`);
    await this.app.vault.adapter.writeBinary(base + '.png', png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength));
    if (opts.crops !== false && (this.settings.cropListing || this.settings.cropHero)) await this.writeCrops(img, base);
    return base + '.png';
  }
  async captureShot(name, dir, ab) {
    if (!ab) { const path = await this.capture(name, { dir }); return { path, pane: this.lastPane }; }
    // A = scratch off, B = scratch on; the B image is the canonical capture
    const hasSheet = this.hasScratchSheet(); const saved = this.scratchText();
    if (hasSheet) this.setScratchText(''); await sleep(120);
    const a = await this.capture(name + '-a', { dir, crops: false });
    if (hasSheet) this.setScratchText(saved); await sleep(120);
    const path = await this.capture(name, { dir }); const pane = this.lastPane;
    const r = await this.diffImages(a, path, normalizePath(`${dir}/${name}-diff.png`));
    this._abRows && this._abRows.push({ name, changed: r.changed, out: r.out });
    return { path, pane };
  }
  async writeCrops(img, base) {
    const size = img.getSize(); const dpr = window.devicePixelRatio || 1;
    if (this.settings.cropHero) {
      const hero = img.resize({ width: 1920 });
      const b = hero.toPNG(); await this.app.vault.adapter.writeBinary(base + '-hero.png', b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
    }
    if (this.settings.cropListing) {
      const root = this.noteRoot() || document;
      const sizer = [...root.querySelectorAll('.markdown-preview-sizer, .cm-sizer')].find((el) => el.getBoundingClientRect().width > 50) || root.querySelector('.view-content');
      const header = root.querySelector('.view-header');
      const top = Math.round(((header ? header.getBoundingClientRect().bottom : 0)) * dpr);
      const h = size.height - top; const w = Math.round(h * 1.5);
      let cx = size.width / 2;
      if (sizer) { const r = sizer.getBoundingClientRect(); cx = Math.round((r.left + r.width / 2) * dpr); }
      let x = Math.round(cx - w / 2); x = Math.max(0, Math.min(x, size.width - w));
      const crop = img.crop({ x, y: top, width: Math.min(w, size.width), height: h }).resize({ width: 1200, height: 800 });
      const b = crop.toPNG(); await this.app.vault.adapter.writeBinary(base + '-3x2.png', b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
    }
  }
  scroller() { const root = this.noteRoot() || document; return [...root.querySelectorAll('.cm-scroller, .markdown-preview-view')].find((e) => e.getBoundingClientRect().width > 50) || null; }
  headingEl(text) {
    const root = this.noteRoot() || document; const want = text.trim().toLowerCase();
    return [...root.querySelectorAll('.markdown-preview-view h2, .cm-line.HyperMD-header-2')].find((e) => e.getBoundingClientRect().width > 0 && e.textContent.replace(/^#+\s*/, '').trim().toLowerCase() === want) || null;
  }
  // scroll so the heading sits at the top of the pane; two passes because CM6 re-measures after the first scroll
  async alignHeading(text) {
    const sc = this.scroller(); if (!sc) return;
    for (let i = 0; i < 2; i++) { const el = this.headingEl(text); if (!el) return; const d = el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 12; if (Math.abs(d) < 3) return; sc.scrollTop += d; await sleep(180); }
  }
  // headings whose element is on screen; 'covered' = in the top 60% (most of its section is showing)
  headingsOnScreen(headings) {
    const sc = this.scroller(); if (!sc) return { visible: [], covered: [] }; const r = sc.getBoundingClientRect(); const visible = [], covered = [];
    for (const h of headings) { const el = this.headingEl(h); if (!el) continue; const t = el.getBoundingClientRect().top; if (t >= r.top && t < r.bottom - 20) { visible.push(h); if (t < r.top + r.height * 0.6) covered.push(h); } }
    return { visible, covered };
  }
  async scrollPage() { const sc = this.scroller(); if (!sc) return false; const before = sc.scrollTop; sc.scrollTop += Math.max(200, sc.clientHeight - 100); await sleep(this.settings.settleMs); return Math.abs(sc.scrollTop - before) > 20; }
  scrollTop() { const root = this.noteRoot() || document; const el = [...root.querySelectorAll('.cm-scroller, .markdown-preview-view')].find((e) => e.getBoundingClientRect().width > 50); return el ? el.scrollTop : 0; }
  async captureOne() {
    const name = `${slug(currentThemeName())}-${this.isDark() ? 'night' : 'day'}-${stamp()}`;
    try { const p = await this.capture(name); new Notice('Theme Lab: saved ' + p); } catch (e) { console.error(e); }
  }

  // ----- matrix -----
  async runMatrix(cfg) {
    const file = await this.openShowcase();
    const leaf = this.findNoteLeaf() || this._noteLeaf;
    this._noteLeaf = leaf;
    if (!leaf) { new Notice('Theme Lab: could not find the showcase note in a tab'); return; }
    const startDark = this.isDark();
    const theme = slug(currentThemeName());
    this._sidebarState = { left: !!(this.app.workspace.leftSplit && this.app.workspace.leftSplit.collapsed), right: !!(this.app.workspace.rightSplit && this.app.workspace.rightSplit.collapsed) };
    this._rightLeaf = null;
    this.app.workspace.iterateAllLeaves((l) => { try { if (l.getRoot() === this.app.workspace.rightSplit && l.view && l.view.containerEl && l.view.containerEl.isShown()) this._rightLeaf = l; } catch (e) { /* ignore */ } });
    await this.prepareScene(leaf);
    const headings = cfg.topOnly ? [] : cfg.targets.length ? cfg.targets : (this.app.metadataCache.getFileCache(file)?.headings || []).filter((h) => h.level === 2).map((h) => h.heading);
    const runId = stamp(); this._runId = runId;
    const runDir = await this.ensureFolder(`${this.themeDir()}/${runId}`);
    const shotDir = `${runDir}/shots`;
    const ab = !!(cfg.abScratch && this.settings.scratchCss.trim());
    const abRows = [];
    const shots = []; let n = 0;
    const total = cfg.schemes.length * cfg.views.length * cfg.sidebars.length * (1 + headings.length) + cfg.schemes.length * cfg.extras.length;
    const progress = { setMessage: (m) => { this.statusEl.setText(m); this.statusEl.show(); }, hide: () => this.statusEl.hide() };
    progress.setMessage('Theme Lab: capturing…');
    try {
      for (const dark of cfg.schemes) {
        await this.setScheme(dark);
        const sch = dark ? 'night' : 'day';
        for (const sb of cfg.sidebars) {
          await this.setSidebars(sb);
          for (const view of cfg.views) {
            await this.setView(leaf, view);
            // top of note
            this.app.workspace.setActiveLeaf(leaf, { focus: false });
            await this.app.workspace.openLinkText(file.basename, '', false); await sleep(this.settings.settleMs);
            leaf.view.setEphemeralState && leaf.view.setEphemeralState({ scroll: 0 }); await sleep(200);
            this._abRows = abRows;
            const prefix = `${theme}-${sch}-${view}-${sb ? 'sidebars' : 'nosidebars'}`;
            const covered = new Set();
            shots.push(await this.captureShot(`${prefix}-top`, shotDir, ab)); progress.setMessage(`Theme Lab: ${++n}/${total}`);
            this.headingsOnScreen(headings).covered.forEach((x) => covered.add(x));
            for (let hi = 0; hi < headings.length; hi++) {
              const h = headings[hi];
              if (covered.has(h)) { progress.setMessage(`Theme Lab: ${++n}/${total} (skipped ${h}: already on screen)`); continue; }
              this.app.workspace.setActiveLeaf(leaf, { focus: false });
              await this.app.workspace.openLinkText(`${file.basename}#${h}`, '', false); await sleep(this.settings.settleMs);
              await this.alignHeading(h);
              shots.push(await this.captureShot(`${prefix}-${slug(h)}`, shotDir, ab)); progress.setMessage(`Theme Lab: ${++n}/${total}`);
              this.headingsOnScreen(headings).covered.forEach((x) => covered.add(x));
              // section taller than the pane: keep paging until the next uncovered heading shows up (or the note ends)
              for (let page = 2; page <= 5; page++) {
                const next = headings.slice(hi + 1).find((x) => !covered.has(x));
                if (next && this.headingsOnScreen([next]).visible.length) break;
                if (!(await this.scrollPage())) break;
                // name the page after the first heading it newly brings into view, else <heading>-<page>
                const fresh = this.headingsOnScreen(headings).covered.filter((x) => !covered.has(x));
                const pageName = fresh.length ? slug(fresh[0]) : `${slug(h)}-${page}`;
                shots.push(await this.captureShot(`${prefix}-${pageName}`, shotDir, ab)); progress.setMessage(`Theme Lab: ${n}/${total} (+${pageName})`);
                this.headingsOnScreen(headings).covered.forEach((x) => covered.add(x));
              }
            }
          }
        }
      }
      // chrome pass, after all note captures so its side effects can't leak into them
      this._extraShots = []; this._skipped = [];
      if (cfg.extras.length) {
        for (const dark of cfg.schemes) {
          await this.setScheme(dark); const sch = dark ? 'night' : 'day';
          await this.setSidebars(true); await this.setView(leaf, 'reading');
          await this.app.workspace.openLinkText(file.basename, '', false); await sleep(this.settings.settleMs); const sc0 = this.scroller(); if (sc0) sc0.scrollTop = 0; await sleep(200); await this.pointerPark();
          for (const ex of cfg.extras) { try { await this.captureExtra(ex, `${theme}-${sch}-${ex}`, shotDir); } catch (e) { console.error('Theme Lab extra failed', ex, e); } progress.setMessage(`Theme Lab: ${++n}/${total}`); }
        }
      }
    } finally {
      await this.setScheme(startDark);
      this.restoreScene();
    }
    progress.setMessage('Theme Lab: building contact sheets…');
    const sheets = [];
    try { sheets.push(...await this.buildSheets(shots, theme, cfg, runDir, shotDir)); } catch (e) { console.error('Theme Lab sheets failed', e); }
    progress.hide();
    let abSection = '';
    if (ab) {
      const changed = abRows.filter((r) => r.out);
      if (changed.length) { const sh = await this.makeSheet(changed.slice(0, 24).map((r) => r.out), changed.slice(0, 24).map((r) => `${r.name.replace(/^.+?-/, '')} — ${(r.changed * 100).toFixed(2)}%`), `${currentThemeName()} — Scratch A/B, what changed`, normalizePath(`${runDir}/sheets/${theme}-scratch-diff.png`), 2, 960); sheets.push(sh); }
      abSection = `\n\n## Scratch A/B\n\n${changed.length} of ${abRows.length} captures changed with the scratch CSS on.\n\n\`\`\`css\n${this.settings.scratchCss.trim()}\n\`\`\`\n\n| Capture | Changed |\n|---|---|\n${abRows.sort((x, y) => y.changed - x.changed).map((r) => `| ${r.name} | ${r.out ? (r.changed * 100).toFixed(2) + '%' : '—'} |`).join('\n')}\n`;
    }
    const sheetTitle = (p) => {
      const b = p.split('/').pop().replace(/\.png$/, '').replace(/^.+?-/, '');
      const fixed = { overview: 'Overview — full window, top of note', chrome: 'Chrome — settings, menus, popovers', 'scratch-diff': 'Scratch A/B — what changed' };
      return fixed[b] || this.sheetTitle(b);
    };
    const sheetSections = sheets.map((sh) => `## ${sheetTitle(sh)}\n\n![[${sh}]]`).join('\n\n');
    const skippedSection = (this._skipped && this._skipped.length) ? `\n\n## Skipped\n\n${this._skipped.map((x) => '- ' + x).join('\n')}` : '';
    const scratchNote = this.settings.scratchEnabled && this.settings.scratchCss.trim() && !ab ? '\n\n> [!warning] Scratch CSS was active during this run\n> These captures include the panel\'s scratch rules, not theme.css alone.' : '';
    const when = new Date();
    this._debug = [];
    await this.writeNote('Matrix', `---\ntheme: ${currentThemeName()}\ndate: ${when.toISOString().slice(0, 10)}\ncaptures: ${shots.length}\nsheets: ${sheets.length}\ntags: [theme-lab, matrix]\n---\n\n# ${currentThemeName()} — screenshot matrix\n\n${when.toLocaleString()} · ${shots.length} captures · ${sheets.length} contact sheets${scratchNote}\n\n> [!tip] Review from the sheets\n> Send the sheets in \`${runDir}/sheets\`; individual captures are in \`shots/\` (\`-3x2\` = listing crop, \`-hero\` = 1920-wide).${skippedSection}${abSection}\n\n${sheetSections}\n`, runDir);
    new Notice(`Theme Lab: ${shots.length} screenshots, ${sheets.length} contact sheets`);
  }
  async loadImage(path) {
    const buf = await this.app.vault.adapter.readBinary(path);
    const url = URL.createObjectURL(new Blob([buf], { type: 'image/png' }));
    try { return await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = url; }); } finally { window.setTimeout(() => URL.revokeObjectURL(url), 1000); }
  }
  // shared chrome for contact sheets: header band, numbered tile labels, framed cells, footer
  sheetCanvas(n, cols, cellW, cellH) {
    const pad = 20, lab = 34, head = 84, foot = 40;
    cols = Math.max(1, Math.min(cols, n));
    const rows = Math.ceil(n / cols);
    const c = createEl('canvas'); c.width = pad + cols * (cellW + pad); c.height = head + rows * (cellH + lab + pad) + foot;
    const g = c.getContext('2d');
    return { c, g, pad, lab, head, rows, cell: (i) => ({ x: pad + (i % cols) * (cellW + pad), y: head + Math.floor(i / cols) * (cellH + lab + pad) }) };
  }
  sheetChrome(sh, title, subtitle, n) {
    const { c, g, pad } = sh;
    g.fillStyle = '#0f1013'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#16181d'; g.fillRect(0, 0, c.width, sh.head - 16);
    g.fillStyle = '#2a2d35'; g.fillRect(0, sh.head - 16, c.width, 1);
    g.fillStyle = '#f2f3f5'; g.font = '600 24px ui-sans-serif, system-ui, sans-serif'; g.textBaseline = 'alphabetic'; g.fillText(title, pad, 42);
    g.fillStyle = '#8b909b'; g.font = '14px ui-sans-serif, system-ui, sans-serif';
    g.textAlign = 'right'; g.fillText(subtitle, c.width - pad, 42); g.textAlign = 'left';
    g.fillStyle = '#6b6f78'; g.font = '12px ui-sans-serif, system-ui, sans-serif';
    g.fillText(`Theme Lab · ${n} capture${n === 1 ? '' : 's'} · ${new Date().toLocaleString()}`, pad, c.height - 14);
  }
  sheetLabel(sh, i, label, x, y, cellW) {
    const { g } = sh;
    g.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace'; g.fillStyle = '#6b6f78';
    const idx = String(i + 1).padStart(2, '0'); g.fillText(idx, x, y + 21);
    g.font = '14px ui-sans-serif, system-ui, sans-serif'; g.fillStyle = '#c9ccd3';
    let t = label; while (g.measureText(t).width > cellW - 34 && t.length > 4) t = t.slice(0, -2) + '…';
    g.fillText(t, x + 26, y + 21);
  }
  sheetCell(sh, x, y, w, h) { const { g } = sh; g.fillStyle = '#1a1c22'; g.fillRect(x - 1, y - 1, w + 2, h + 2); g.fillStyle = '#23262e'; g.fillRect(x, y, w, h); }
  sheetSubtitle() { return this._runId ? `${currentThemeName()} · run ${this._runId}` : currentThemeName(); }
  async saveCanvas(c, outPath) { const blob = await new Promise((r) => c.toBlob(r, 'image/png')); await this.app.vault.adapter.writeBinary(outPath, await blob.arrayBuffer()); return outPath; }

  async makeSheet(paths, labels, title, outPath, cols = 2, cellW = 960, rects = null) {
    const imgs = []; for (const p of paths) { try { imgs.push(await this.loadImage(p)); } catch (e) { imgs.push(null); } }
    const first = imgs.findIndex(Boolean);
    const srcW = (i) => (rects && rects[i] ? rects[i].w : imgs[i].width), srcH = (i) => (rects && rects[i] ? rects[i].h : imgs[i].height);
    const ratio = first >= 0 ? srcH(first) / srcW(first) : 0.56;
    const cellH = Math.round(cellW * ratio);
    const sh = this.sheetCanvas(imgs.length, cols, cellW, cellH); const { g, lab } = sh;
    this.sheetChrome(sh, title, this.sheetSubtitle(), imgs.length);
    imgs.forEach((im, i) => {
      const { x, y } = sh.cell(i);
      this.sheetLabel(sh, i, labels[i], x, y, cellW);
      this.sheetCell(sh, x, y + lab, cellW, cellH);
      if (im && rects && rects[i]) g.drawImage(im, rects[i].x, rects[i].y, rects[i].w, rects[i].h, x, y + lab, cellW, cellH);
      else if (im) g.drawImage(im, x, y + lab, cellW, cellH);
    });
    return this.saveCanvas(sh.c, outPath);
  }
  async makeSheetFit(paths, labels, rects, title, outPath, cols = 3, cellW = 760) {
    const imgs = []; for (const p of paths) { try { imgs.push(await this.loadImage(p)); } catch (e) { imgs.push(null); } }
    const cellH = Math.round(cellW * 0.75);
    const sh = this.sheetCanvas(imgs.length, cols, cellW, cellH); const { g, lab } = sh;
    this.sheetChrome(sh, title, this.sheetSubtitle(), imgs.length);
    imgs.forEach((im, i) => {
      const { x, y } = sh.cell(i);
      this.sheetLabel(sh, i, labels[i], x, y, cellW);
      this.sheetCell(sh, x, y + lab, cellW, cellH);
      if (!im) return;
      const r = rects[i] || { x: 0, y: 0, w: im.width, h: im.height };
      const sc = Math.min(cellW / r.w, cellH / r.h); const dw = Math.round(r.w * sc), dh = Math.round(r.h * sc);
      g.drawImage(im, r.x, r.y, r.w, r.h, x + Math.round((cellW - dw) / 2), y + lab + Math.round((cellH - dh) / 2), dw, dh);
    });
    return this.saveCanvas(sh.c, outPath);
  }
  sheetTitle(key) {
    const words = { night: 'Night', day: 'Day', reading: 'Reading', live: 'Live Preview', source: 'Source', sidebars: 'sidebars open', nosidebars: 'sidebars closed' };
    return key.split('-').map((w) => words[w] || w).join(' · ').replace(' · sidebars', ', sidebars');
  }
  async buildSheets(shots, theme, cfg, runDir, shotDir) {
    const folder = await this.ensureFolder(`${runDir}/sheets`);
    const out = [];
    const groups = {};
    for (const sh of shots) {
      const base = sh.path.split('/').pop().replace(/\.png$/, '');
      const m = base.match(/^(.+?)-(night|day)-(reading|live|source)-(sidebars|nosidebars)-(.+)$/);
      if (!m) continue;
      const key = `${m[2]}-${m[3]}-${m[4]}`; (groups[key] = groups[key] || []).push({ path: sh.path, target: m[5], pane: sh.pane });
    }
    for (const key of Object.keys(groups)) {
      const g = groups[key];
      out.push(await this.makeSheet(g.map((x) => x.path), g.map((x) => x.target), `${currentThemeName()} — ${this.sheetTitle(key)}`, normalizePath(`${folder}/${theme}-${key}.png`), 2, 960, g.map((x) => x.pane)));
    }
    const tops = shots.filter((sh) => /-top\.png$/.test(sh.path));
    if (tops.length) out.push(await this.makeSheet(tops.map((t) => t.path), tops.map((t) => t.path.split('/').pop().replace(/^.+?-/, '').replace(/-top\.png$/, '')), `${currentThemeName()} — Overview, full window`, normalizePath(`${folder}/${theme}-overview.png`), 2, 960));
    const extras = this._extraShots || [];
    if (extras.length) {
      // cells of mixed aspect: make each cell square-ish by fitting the focus rect
      out.push(await this.makeSheetFit(extras.map((e) => e.path), extras.map((e) => e.path.split('/').pop().replace(/^.+?-/, '').replace(/\.png$/, '')), extras.map((e) => e.focus), `${currentThemeName()} — Chrome`, normalizePath(`${folder}/${theme}-chrome.png`), 3, 760));
    }
    return out;
  }
  // real pointer input via Electron when available; falls back to dispatched events
  async pointerMove(el) {
    const r = el.getBoundingClientRect(); const x = Math.round(r.left + Math.min(r.width / 2, 40)), y = Math.round(r.top + r.height / 2);
    const wc = this.electronWebContents();
    if (wc && wc.sendInputEvent) { wc.sendInputEvent({ type: 'mouseMove', x, y }); return true; }
    el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: x, clientY: y })); el.dispatchEvent(new MouseEvent('mouseenter', { clientX: x, clientY: y })); return false;
  }
  async pointerPark() { const wc = this.electronWebContents(); const nr = this.noteRoot(); const pane = (nr && nr.querySelector('.view-content')) || document.querySelector('.workspace-split.mod-root .view-content'); const r = pane ? pane.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }; const x = Math.round(r.left + 12), y = Math.round(r.top + r.height * 0.6); if (wc && wc.sendInputEvent) wc.sendInputEvent({ type: 'mouseMove', x, y }); }
  async rightClick(el) {
    const r = el.getBoundingClientRect(); const x = Math.round(r.left + Math.min(r.width / 2, 60)), y = Math.round(r.top + r.height / 2);
    const wc = this.electronWebContents();
    if (wc && wc.sendInputEvent) { wc.sendInputEvent({ type: 'mouseDown', x, y, button: 'right', clickCount: 1 }); wc.sendInputEvent({ type: 'mouseUp', x, y, button: 'right', clickCount: 1 }); return; }
    el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: x, clientY: y }));
  }
  esc() { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true })); }
  closeModals() { document.querySelectorAll('.modal-container .modal-bg').forEach((bg) => bg.click()); this.esc(); }
  waitFor(selector, ms) { return new Promise((resolve) => { const t0 = Date.now(); const tick = () => { const el = document.querySelector(selector); if (el && el.getBoundingClientRect().width > 0) return resolve(el); if (Date.now() - t0 > ms) return resolve(null); window.setTimeout(tick, 60); }; tick(); }); }
  async closeLeavesOfType(type) { this.app.workspace.getLeavesOfType(type).forEach((l) => l.detach()); await sleep(200); }

  async captureExtra(kind, name, dir) {
    const wait = this.settings.settleMs; const extras = this._extraShots || (this._extraShots = []);
    const shot = async (focus, focusPad) => { const path = await this.capture(name, { crops: false, dir, focus, focusPad }); extras.push({ path, focus: this.lastFocus }); return path; };
    const noteRoot = this.noteRoot() || document;
    if (kind === 'settings' || kind === 'settings-editor' || kind === 'settings-plugins') {
      const tab = kind === 'settings' ? 'appearance' : kind === 'settings-editor' ? 'editor' : 'community-plugins';
      this.app.setting.open(); this.app.setting.openTabById(tab); await sleep(wait + 300);
      await shot('.modal-container .modal', 24); this.app.setting.close(); await sleep(300);
    } else if (kind === 'palette' || kind === 'switcher') {
      const id = kind === 'palette' ? 'command-palette:open' : 'switcher:open';
      if (document.querySelector('.modal-container')) { this.closeModals(); await sleep(300); }
      let prompt = null;
      for (let attempt = 0; attempt < 2 && !prompt; attempt++) { this.app.commands.executeCommandById(id); prompt = await this.waitFor('.prompt', wait + 800); if (!prompt) await sleep(300); }
      this._lastTarget = prompt ? 'prompt found' : 'NONE (command ' + id + (this.app.commands.findCommand && this.app.commands.findCommand(id) ? ' exists' : ' NOT registered') + ')';
      if (!prompt) { (this._skipped = this._skipped || []).push(`${name}: ${kind === 'switcher' ? 'enable the **Quick switcher** core plugin' : 'the command palette did not open'} (${this._lastTarget})`); this._lastTarget = null; this.closeModals(); await sleep(300); return; }
      const input = document.querySelector('.prompt input'); if (input) { input.value = kind === 'palette' ? 'theme' : (this.settings.showcaseName || 'Showcase').trim().split(/\s+/).pop(); input.dispatchEvent(new Event('input', { bubbles: true })); await sleep(400); }
      await shot('.prompt', 40); this._lastTarget = null; this.closeModals(); await sleep(300);
    } else if (kind === 'menu') {
      const target = document.querySelector('.nav-file-title.is-active') || document.querySelector('.nav-file-title');
      if (target) { await this.rightClick(target); await sleep(wait); }
      await shot('.menu', 120); this.esc(); await this.pointerPark(); await sleep(300);
    } else if (kind === 'editor-menu') {
      // the editor menu is the Live Preview context menu; Reading view right-click is a different, smaller menu
      const leaf = this._noteLeaf; let restore = null;
      if (leaf) { const st = leaf.getViewState().state || {}; if (st.mode !== 'source') { restore = 'reading'; await this.setView(leaf, 'live'); } }
      { const sc = this.scroller(); if (sc) { sc.scrollTop = 0; await sleep(250); } }
      const root = this.noteRoot() || document;
      const target = [...root.querySelectorAll('.cm-line')].find((e) => e.getBoundingClientRect().width > 0 && e.textContent.trim().length > 20) || [...root.querySelectorAll('.cm-line, .markdown-preview-view p')].find((e) => e.getBoundingClientRect().width > 0);
      const rect = target ? target.getBoundingClientRect() : null;
      this._lastTarget = target ? (target.tagName + '.' + target.className + ' @' + JSON.stringify({ l: Math.round(rect.left), t: Math.round(rect.top), w: Math.round(rect.width) })) : 'NONE (root=' + (root === document ? 'document' : root.className) + ')';
      let menu = null;
      if (target) { await this.rightClick(target); menu = await this.waitFor('.menu', wait + 500); }
      if (target && !menu) { target.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: Math.round(rect.left + 60), clientY: Math.round(rect.top + rect.height / 2) })); menu = await this.waitFor('.menu', wait + 500); this._lastTarget += menu ? ' (via dispatched contextmenu)' : ' (no .menu after real + dispatched right-click)'; }
      if (menu) await shot('.menu', 120); else (this._skipped = this._skipped || []).push(`${name}: no editor menu appeared (${this._lastTarget})`);
      this._lastTarget = null; this.esc(); await this.pointerPark(); await sleep(300);
      if (restore && leaf) await this.setView(leaf, restore);
    } else if (kind === 'tooltip') {
      const target = document.querySelector('.side-dock-ribbon-action');
      if (target) { await this.pointerMove(target); await sleep(wait + 700); }
      await this.capture(name, { crops: false, dir, focus: '.tooltip', focusPad: 160, keepTooltip: true }); extras.push({ path: normalizePath(`${dir}/${name}.png`), focus: this.lastFocus }); await this.pointerPark(); await sleep(300);
    } else if (kind === 'hover') {
      // one shot with the pointer over an internal link; hover states on nav/tabs come from the pointer path
      const link = [...noteRoot.querySelectorAll('a.internal-link, .cm-hmd-internal-link')].find((e) => e.getBoundingClientRect().width > 0);
      const nav = document.querySelector('.nav-file-title:not(.is-active)');
      if (nav) { await this.pointerMove(nav); await sleep(250); await this.capture(name + '-nav', { crops: false, dir, focus: nav, focusPad: 140 }); extras.push({ path: normalizePath(`${dir}/${name}-nav.png`), focus: this.lastFocus }); }
      if (link) { await this.pointerMove(link); await sleep(250); await this.capture(name + '-link', { crops: false, dir, focus: link, focusPad: 140 }); extras.push({ path: normalizePath(`${dir}/${name}-link.png`), focus: this.lastFocus }); }
      await this.pointerPark(); await sleep(300);
    } else if (kind === 'preview') {
      const link = [...noteRoot.querySelectorAll('a.internal-link, .cm-hmd-internal-link')].find((e) => e.getBoundingClientRect().width > 0);
      let pop = null;
      if (link) {
        const wc = this.electronWebContents(); const r = link.getBoundingClientRect(); const x = Math.round(r.left + 10), y = Math.round(r.top + r.height / 2);
        if (wc && wc.sendInputEvent) { wc.sendInputEvent({ type: 'mouseMove', x, y, modifiers: ['control'] }); }
        else { link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: x, clientY: y, ctrlKey: true })); }
        pop = await this.waitFor('.popover.hover-popover', wait + 900);
        this._lastTarget = 'link ' + (link.dataset.href || link.textContent) + (pop ? ' (real pointer)' : '');
        if (!pop) {
          // fall back to the page-preview event every hover plugin uses
          const file = this._noteLeaf && this._noteLeaf.view && this._noteLeaf.view.file; const linktext = link.dataset.href || link.getAttribute('href') || link.textContent;
          this.app.workspace.trigger('hover-link', { event: new MouseEvent('mouseover', { clientX: x, clientY: y, ctrlKey: true }), source: 'theme-lab', hoverParent: { hoverPopover: null }, targetEl: link, linktext, sourcePath: file ? file.path : '' });
          pop = await this.waitFor('.popover.hover-popover', wait + 900);
          this._lastTarget += pop ? ' (via hover-link event)' : ' (no popover after pointer + hover-link; is Page preview enabled?)';
        }
      } else { this._lastTarget = 'NONE (no visible internal link)'; }
      if (!pop) { (this._skipped = this._skipped || []).push(`${name}: enable the **Page preview** core plugin (${this._lastTarget})`); this._lastTarget = null; await this.pointerPark(); await sleep(300); return; }
      await shot('.popover.hover-popover', 120); this._lastTarget = null; await this.pointerPark(); this.esc(); await sleep(400);
    } else if (kind === 'search') {
      this.app.commands.executeCommandById('global-search:open'); await sleep(wait);
      const input = document.querySelector('.workspace-leaf-content[data-type="search"] input'); if (input) { input.value = 'the'; input.dispatchEvent(new Event('input', { bubbles: true })); await sleep(wait + 400); }
      await shot('.workspace-split.mod-left-split', 8);
      this.app.commands.executeCommandById('file-explorer:open'); this.app.commands.executeCommandById('file-explorer:reveal-active-file'); if (this._noteLeaf) this.app.workspace.setActiveLeaf(this._noteLeaf, { focus: false }); await sleep(300);
    } else if (kind === 'right-sidebar') {
      if (this.app.workspace.rightSplit && this.app.workspace.rightSplit.collapsed) this.app.workspace.rightSplit.expand();
      for (const id of ['backlink:open', 'outline:open', 'tag-pane:open']) { try { this.app.commands.executeCommandById(id); } catch (e) { /* plugin off */ } await sleep(250); }
      await sleep(wait); await shot('.workspace-split.mod-right-split', 8);
      if (this._rightLeaf) { try { this.app.workspace.revealLeaf(this._rightLeaf); } catch (e) { /* ignore */ } }
      if (this.app.workspace.rightSplit) this.app.workspace.rightSplit.collapse(); await sleep(300);
    } else if (kind === 'graph') {
      const gl = this.app.workspace.getLeaf('tab'); await gl.setViewState({ type: 'graph', active: true }); await sleep(wait + 1200);
      await shot('.workspace-split.mod-root', 0); gl.detach(); await sleep(200);
      if (this._noteLeaf) this.app.workspace.setActiveLeaf(this._noteLeaf, { focus: false }); await sleep(wait);
    } else if (kind === 'notice') {
      const notice = new Notice('Theme Lab: this is what a notice looks like.', 10000); await sleep(400);
      await this.capture(name, { crops: false, dir, focus: '.notice-container', focusPad: 80, keepNotices: true }); extras.push({ path: normalizePath(`${dir}/${name}.png`), focus: this.lastFocus }); notice.hide(); await sleep(200);
    }
  }

  // ----- diffs -----
  imageData(im) { const c = createEl('canvas'); c.width = im.width; c.height = im.height; const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0); return { canvas: c, ctx: g, data: g.getImageData(0, 0, c.width, c.height) }; }
  async diffImages(pathA, pathB, outPath) {
    const [a, b] = await Promise.all([this.loadImage(pathA), this.loadImage(pathB)]);
    if (a.width !== b.width || a.height !== b.height) return { changed: 1, note: 'size differs', out: null };
    const A = this.imageData(a), B = this.imageData(b); const da = A.data.data, db = B.data.data;
    const out = B.ctx.createImageData(a.width, a.height); const o = out.data; let changed = 0; const n = a.width * a.height;
    for (let i = 0; i < da.length; i += 4) {
      const d = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
      if (d > 24) { changed++; o[i] = 255; o[i + 1] = 40; o[i + 2] = 60; o[i + 3] = 255; }
      else { o[i] = db[i] * 0.35 + 20; o[i + 1] = db[i + 1] * 0.35 + 20; o[i + 2] = db[i + 2] * 0.35 + 20; o[i + 3] = 255; }
    }
    const frac = changed / n;
    if (outPath && frac > 0) { B.ctx.putImageData(out, 0, 0); const blob = await new Promise((r) => B.canvas.toBlob(r, 'image/png')); await this.app.vault.adapter.writeBinary(outPath, await blob.arrayBuffer()); }
    return { changed: frac, out: frac > 0 ? outPath : null };
  }
  async listRuns() {
    const dir = this.themeDir(); if (!(await this.app.vault.adapter.exists(dir))) return [];
    const { folders } = await this.app.vault.adapter.list(dir);
    const runs = folders.filter((f) => /\d{4}-\d{2}-\d{2} \d{6}$/.test(f)).sort();
    return runs;
  }
  async compareRuns(runA, runB) {
    // runA = older, runB = newer; diff same-named full captures
    const la = (await this.app.vault.adapter.list(`${runA}/shots`)).files.filter((f) => /\.png$/.test(f) && !/-(3x2|hero|a|b|diff)\.png$/.test(f));
    const namesA = new Set(la.map((f) => f.split('/').pop()));
    const lb = (await this.app.vault.adapter.list(`${runB}/shots`)).files.filter((f) => /\.png$/.test(f) && !/-(3x2|hero|a|b|diff)\.png$/.test(f) && namesA.has(f.split('/').pop()));
    const outDir = await this.ensureFolder(`${runB}/diff-vs-previous`);
    const rows = []; const sheetPaths = [], sheetLabels = [];
    for (const fb of lb.sort()) {
      const name = fb.split('/').pop(); const fa = `${runA}/shots/${name}`;
      const r = await this.diffImages(fa, fb, `${outDir}/${name.replace(/\.png$/, '-diff.png')}`);
      rows.push({ name: name.replace(/\.png$/, ''), changed: r.changed, out: r.out });
      if (r.out) { sheetPaths.push(r.out); sheetLabels.push(`${name.replace(/\.png$/, '')} — ${(r.changed * 100).toFixed(2)}%`); }
    }
    let sheet = null;
    if (sheetPaths.length) sheet = await this.makeSheet(sheetPaths.slice(0, 24), sheetLabels.slice(0, 24), `${currentThemeName()} — changed since ${runA.split('/').pop()}`, normalizePath(`${outDir}/diff-sheet.png`), 2, 960);
    const md = [`# Theme Lab — compare runs`, '', `older: \`${runA}\`  ·  newer: \`${runB}\``, '', `${rows.filter((r) => r.out).length} of ${rows.length} captures changed.`, '', sheet ? `![[${sheet}]]` : '', '', '| Capture | Changed |', '|---|---|', ...rows.sort((x, y) => y.changed - x.changed).map((r) => `| ${r.name} | ${r.out ? (r.changed * 100).toFixed(2) + '%' : '—'} |`), ''].join('\n');
    const notePath = await this.writeNote('Diff', md, runB);
    const f = this.app.vault.getAbstractFileByPath(notePath); if (f instanceof TFile) await this.app.workspace.getLeaf(true).openFile(f);
    new Notice(`Theme Lab: ${rows.filter((r) => r.out).length} changed captures`);
  }
  async compareWithPrevious() {
    const runs = await this.listRuns(); if (runs.length < 2) { new Notice('Theme Lab: need two runs for this theme'); return; }
    await this.compareRuns(runs[runs.length - 2], runs[runs.length - 1]);
  }

  // ----- report -----
  async themeCss() {
    const name = currentThemeName();
    const p = `${this.app.vault.configDir}/themes/${name}/theme.css`;
    try { if (await this.app.vault.adapter.exists(p)) return { path: p, css: await this.app.vault.adapter.read(p) }; } catch (e) { /* ignore */ }
    return { path: p, css: '' };
  }
  collectVarNames(css) {
    const names = new Set();
    const src = (css || '').replace(/url\(data:[^)]*\)/g, 'url(…)');
    for (const m of src.matchAll(/(^|[\s;{])(--[\w-]+)\s*:/g)) names.add(m[2]);
    return [...names].sort();
  }
  async writeReport() {
    const startDark = this.isDark();
    const { path, css } = await this.themeCss();
    const out = [];
    out.push('# Theme Lab — report'); out.push('');
    out.push(`theme: **${currentThemeName()}** · ${new Date().toLocaleString()} · \`${path}\` · ${css ? Math.round(css.length / 1024) + ' KB' : 'theme.css not found'}`); out.push('');

    // lint
    // lint
    const lint = []; let issues = 0; let lineCount = 0;
    if (!css) lint.push('- theme.css not readable — lint skipped.');
    else {
      lineCount = css.split('\n').length;
      const fontFree = css.replace(/url\(data:[^)]*\)/g, 'url(…)');
      for (const [needle, label] of BANNED) {
        const idx = fontFree.indexOf(needle);
        if (idx >= 0) { const ln = fontFree.slice(0, idx).split('\n').length; lint.push(`- ⚠ \`${label}\` — first at line ~${ln}`); issues++; }
      }
      const blockRe = /\{([^{}]*)\}/g; let m; let dup = 0;
      while ((m = blockRe.exec(fontFree)) && dup < 20) {
        const seen = new Set();
        for (const decl of m[1].split(';')) { const prop = decl.split(':')[0].trim(); if (!prop || prop.startsWith('--')) continue; if (seen.has(prop)) { const ln = fontFree.slice(0, m.index).split('\n').length; lint.push(`- ⚠ duplicate \`${prop}\` in block at line ~${ln}`); issues++; dup++; break; } seen.add(prop); }
      }
      if (css.length > 200 * 1024) lint.push(`- ℹ file is ${Math.round(css.length / 1024)} KB (the review warns above ~200 KB; embedded fonts are the usual reason)`);
      if (!issues) lint.push('- ✓ No banned properties, no duplicate declarations');
    }

    const a11y = a11yCss(css);
    const a11yBad = a11y.filter((f) => f.level === 'Error' || f.level === 'Warning');

    // contrast + variables, collected per scheme then written side by side
    const varNames = this.collectVarNames(css);
    const data = {};
    for (const dark of [true, false]) {
      const key = dark ? 'dark' : 'light';
      const switched = await this.setScheme(dark);
      if (!switched) { data[key] = null; continue; }
      const cs = getComputedStyle(document.body);
      const get = (v) => cs.getPropertyValue(v).trim();
      const base = parseColor(get('--background-primary')) || [0, 0, 0, 1];
      const pairs = CONTRAST_PAIRS.map(([fgv, bgv, label]) => {
        const fgS = get(fgv), bgS = get(bgv); const fg = parseColor(fgS), bgRaw = parseColor(bgS);
        if (!fg || !bgRaw || !fgS || !bgS) return { label, text: 'unset', ratio: null, mark: '—', fail: false };
        const bg = over(bgRaw, base); const f = over(fg, bg); const ratio = contrast(f, bg);
        const isHl = fgv === '--text-highlight-bg';
        const isUi = fgv === '--background-modifier-border-focus';   // non-text contrast: 3:1 is the bar
        const mark = isHl ? (ratio >= 1.5 ? '✓' : '⚠') : isUi ? (ratio >= 3 ? '✓' : '✗') : ratio >= 4.5 ? '✓' : ratio >= 3 ? '△' : '✗';
        return { label, text: `\`${fgS}\` on \`${bgS}\``, ratio, mark, fail: isHl ? ratio < 1.5 : isUi ? ratio < 3 : ratio < 4.5 };
      });
      data[key] = { pairs, vars: Object.fromEntries(varNames.map((v) => [v, get(v)])) };
    }
    await this.setScheme(startDark);
    const fails = (k) => (data[k] ? data[k].pairs.filter((p) => p.fail).length : 0);

    // unreferenced classes
    let missing = [], presentCount = 0;
    if (css) {
      const present = new Set();
      document.querySelectorAll('*').forEach((el) => { for (const c of el.classList) if (OBS_PREFIXES.some((p) => c.startsWith(p)) && !c.startsWith('is-') && !c.startsWith('mod-') && !c.startsWith('cm-')) present.add(c); });
      presentCount = present.size; missing = [...present].filter((c) => !css.includes(c)).sort();
    }

    // ---- write ----
    const when = new Date();
    out.length = 0;
    out.push('---', `theme: ${currentThemeName()}`, `date: ${when.toISOString().slice(0, 10)}`, `lint: ${issues}`, `aa_fails_dark: ${fails('dark')}`, `aa_fails_light: ${fails('light')}`, `a11y_issues: ${a11yBad.length}`, 'tags: [theme-lab, report]', '---', '');
    out.push(`# ${currentThemeName()} — theme report`, '');
    out.push(`\`${path}\` · ${css ? Math.round(css.length / 1024) + ' KB, ' + lineCount + ' lines' : 'theme.css not found'} · ${when.toLocaleString()}`, '');
    const summary = [];
    summary.push(issues ? `**Lint:** ${issues} issue${issues === 1 ? '' : 's'} the community review will flag.` : '**Lint:** clean.');
    summary.push(`**Contrast:** ${fails('dark')} below AA in dark, ${fails('light')} in light.`);
    summary.push(`**Accessibility:** ${a11yBad.length ? `${a11yBad.filter((f) => f.level === 'Error').length} error${a11yBad.filter((f) => f.level === 'Error').length === 1 ? '' : 's'}, ${a11yBad.filter((f) => f.level === 'Warning').length} warning${a11yBad.filter((f) => f.level === 'Warning').length === 1 ? '' : 's'}.` : 'nothing flagged.'}`);
    summary.push(`**Variables:** ${varNames.length} declared. **Unreferenced classes on screen:** ${missing.length} of ${presentCount}.`);
    out.push(`> [!${issues || fails('dark') || fails('light') || a11yBad.length ? 'warning' : 'success'}] Summary`, ...summary.map((l) => '> ' + l), '');

    out.push('## Lint', '', ...lint, '');

    out.push('## Contrast', '', 'Ratios are WCAG 2 contrast against the resolved background. ✓ ≥ 4.5 (AA) · △ 3–4.5 (large text only) · ✗ < 3 · highlight rows check that the highlight differs from the page (≥ 1.5).', '');
    out.push('| Pair | Dark | | Light | |', '|---|---|:--:|---|:--:|');
    CONTRAST_PAIRS.forEach((_, i) => {
      const d = data.dark ? data.dark.pairs[i] : null, l = data.light ? data.light.pairs[i] : null;
      const cell = (p) => p ? `${p.text} — ${p.ratio === null ? '—' : p.ratio.toFixed(2)} | ${p.mark}` : 'skipped | —';
      out.push(`| ${(d || l || {}).label || CONTRAST_PAIRS[i][2]} | ${cell(d)} | ${cell(l)} |`);
    });
    out.push('');

    out.push('## Accessibility', '', 'Checks the stylesheet can answer on its own. The contrast table above covers the rest; the focus-ring row is judged at 3:1, the bar for non-text.', '');
    if (!a11y.length) out.push('- theme.css not readable — skipped.', '');
    else {
      const order = { Error: 0, Warning: 1, Info: 2, Pass: 3 };
      for (const f of [...a11y].sort((x, y) => order[x.level] - order[y.level])) {
        const mark = f.level === 'Error' ? '✗' : f.level === 'Warning' ? '⚠' : f.level === 'Info' ? 'ℹ' : '✓';
        out.push(`- ${mark} **${f.rule}** — ${f.text}${f.line ? ` <small>line ~${f.line}</small>` : ''}`);
      }
      out.push('');
    }

    out.push(`## Variables`, '', `> [!info]- ${varNames.length} variables the theme declares, with computed values`, '> ', '> | Variable | Dark | Light |', '> |---|---|---|');
    for (const v of varNames) {
      const dv = data.dark ? data.dark.vars[v] : '', lv = data.light ? data.light.vars[v] : '';
      const fmt = (x) => x ? `\`${x.replace(/\|/g, '\\|')}\`` : '_unset_';
      out.push(`> | \`${v}\` | ${fmt(dv)} | ${fmt(lv)} |`);
    }
    out.push('');
    const unsetLight = varNames.filter((v) => data.dark && data.light && data.dark.vars[v] && !data.light.vars[v]);
    const unsetDark = varNames.filter((v) => data.dark && data.light && data.light.vars[v] && !data.dark.vars[v]);
    if (unsetLight.length || unsetDark.length) {
      out.push('Declared in one scheme only:', '');
      if (unsetLight.length) out.push(`- Missing in light: ${unsetLight.map((v) => '`' + v + '`').join(', ')}`);
      if (unsetDark.length) out.push(`- Missing in dark: ${unsetDark.map((v) => '`' + v + '`').join(', ')}`);
      out.push('');
    }

    if (css) {
      out.push('## Unreferenced classes', '', `${missing.length} of ${presentCount} Obsidian classes currently on screen never appear in theme.css. Not all need styling — a checklist, not a to-do list. Open more panes (search, backlinks, graph, settings) before running to widen it.`, '');
      out.push(`> [!info]- ${missing.length} classes`, '> ' + (missing.map((c) => '`' + c + '`').join(' · ') || '_none_'), '');
    }

    const p = await this.writeNote('Report ' + stamp(), out.join('\n'));
    const f = this.app.vault.getAbstractFileByPath(p); if (f instanceof TFile) await this.app.workspace.getLeaf(true).openFile(f);
    new Notice('Theme Lab: report written');
  }
}

function stamp() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`; }

// ---------- right-sidebar panel ----------
class ThemeLabView extends ItemView {
  constructor(leaf, plugin) { super(leaf); this.plugin = plugin; }
  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return 'Theme Lab'; }
  getIcon() { return 'flask-conical'; }

  async onOpen() {
    const root = this.contentEl; root.empty(); root.addClass('theme-lab-panel');
    const p = this.plugin, s = p.settings;

    // ----- header: theme + scheme -----
    const head = root.createDiv({ cls: 'theme-lab-head' });
    this.themeEl = head.createDiv({ cls: 'theme-lab-theme' });
    this.schemeEl = head.createDiv({ cls: 'theme-lab-badge' });

    // ----- toolbar -----
    const tools = root.createDiv({ cls: 'theme-lab-tools' });
    const tool = (parent, label, icon, fn, tip) => {
      const b = parent.createEl('button', { cls: 'theme-lab-tool' });
      const ic = b.createSpan({ cls: 'theme-lab-tool-icon' }); setIcon(ic, icon);
      b.createSpan({ text: label, cls: 'theme-lab-tool-label' });
      b.setAttribute('aria-label', tip || label); b.onclick = () => { b.blur(); fn(); }; return b;
    };
    const withLeaf = (fn) => { const l = p.app.workspace.getMostRecentLeaf(); if (l && l.view.getViewType() === 'markdown') fn(l); else new Notice('Theme Lab: open a note first'); };
    this.viewBtns = {};
    const seg = tools.createDiv({ cls: 'theme-lab-seg theme-lab-seg-views' });
    this.viewBtns.reading = tool(seg, 'Reading', 'book-open', () => withLeaf((l) => p.setView(l, 'reading').then(() => this.refreshState())), 'Reading view');
    this.viewBtns.live = tool(seg, 'Live', 'pencil', () => withLeaf((l) => p.setView(l, 'live').then(() => this.refreshState())), 'Live Preview');
    this.viewBtns.source = tool(seg, 'Source', 'code', () => withLeaf((l) => p.setView(l, 'source').then(() => this.refreshState())), 'Source mode');
    seg.createDiv({ cls: 'theme-lab-seg-divider' });
    const seg2 = seg;
    this.schemeBtn = tool(seg2, 'Scheme', 'sun-moon', () => p.toggleScheme().then(() => this.refreshState()), 'Toggle dark / light scheme');
    this.leftBtn = tool(seg2, 'Sidebar', 'panel-left', () => { const ws = p.app.workspace; ws.leftSplit.collapsed ? ws.leftSplit.expand() : ws.leftSplit.collapse(); this.refreshState(); }, 'Toggle left sidebar');
    const acts = tools.createDiv({ cls: 'theme-lab-seg' });
    tool(acts, 'Pick', 'crosshair', () => p.startInspect(), 'Inspect an element (Esc to stop)');
    tool(acts, 'Capture', 'camera', () => p.captureOne(), 'Capture one screenshot now');
    tool(acts, 'Matrix', 'layout-grid', () => new MatrixModal(p.app, p).open(), 'Capture screenshot matrix');
    tool(acts, 'Report', 'file-text', () => p.writeReport(), 'Write theme report (lint, contrast, variables)');
    tool(acts, 'Showcase', 'book', () => p.openShowcase(), 'Create or open the showcase note');

    // ----- collapsible sections -----
    s.panelOpen = s.panelOpen || {};
    const section = (key, title, buildHeaderRight) => {
      const d = root.createDiv({ cls: 'theme-lab-section' });
      const h = d.createDiv({ cls: 'theme-lab-section-head' });
      const chev = h.createSpan({ cls: 'theme-lab-chevron' }); setIcon(chev, 'chevron-down');
      h.createSpan({ text: title, cls: 'theme-lab-section-title' });
      const right = h.createDiv({ cls: 'theme-lab-section-right' });
      const body = d.createDiv({ cls: 'theme-lab-section-body' });
      const apply = () => { const open = s.panelOpen[key] !== false; d.toggleClass('is-collapsed', !open); };
      h.onclick = (e) => { if (right.contains(e.target)) return; s.panelOpen[key] = s.panelOpen[key] === false; p.saveSettings(); apply(); };
      if (buildHeaderRight) buildHeaderRight(right);
      apply();
      return body;
    };

    // Inspector
    this.inspBody = section('inspector', 'Inspector', (r) => { const b = r.createEl('button', { cls: 'theme-lab-mini' }); setIcon(b, 'crosshair'); b.setAttribute('aria-label', 'Pick an element'); b.onclick = () => p.startInspect(); });
    this.showEmptyInspector();

    // Scratch CSS
    let scratchToggle;
    const sc = section('scratch', 'Scratch CSS', (r) => {
      r.createSpan({ text: 'Enabled', cls: 'theme-lab-mini-label' });
      scratchToggle = new obsidian.ToggleComponent(r).setValue(s.scratchEnabled).setTooltip('Apply the scratch stylesheet').onChange((v) => { s.scratchEnabled = v; p.applyScratch(); p.saveSettings(); this.refreshScratchStatus(); });
    });
    sc.createEl('p', { text: 'Applied live as a temporary stylesheet on top of the theme. Nothing is written until you append it.', cls: 'theme-lab-hint' });
    const ta = sc.createEl('textarea', { cls: 'theme-lab-scratch' }); ta.value = s.scratchCss; ta.rows = 9; ta.spellcheck = false; ta.placeholder = '.theme-light { --link-color: #3D5CE6; }';
    ta.addEventListener('input', () => { s.scratchCss = ta.value; p.applyScratch(); p.saveSettings(); this.refreshScratchStatus(); });
    ta.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); const st = ta.selectionStart; ta.setRangeText('  ', st, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); } });
    this.scratchTa = ta;
    const foot = sc.createDiv({ cls: 'theme-lab-foot' });
    this.scratchStatus = foot.createSpan({ cls: 'theme-lab-status-text' });
    const fb = foot.createDiv({ cls: 'theme-lab-foot-buttons' });
    new obsidian.ButtonComponent(fb).setButtonText('Clear').onClick(() => { s.scratchCss = ''; ta.value = ''; p.applyScratch(); p.saveSettings(); this.refreshScratchStatus(); });
    new obsidian.ButtonComponent(fb).setButtonText('Append to theme.css').setCta().onClick(async () => {
      if (!s.scratchCss.trim()) { new Notice('Theme Lab: scratch is empty'); return; }
      const { path, css } = await p.themeCss(); if (!css) { new Notice('Theme Lab: theme.css not found'); return; }
      await p.app.vault.adapter.write(path, css.replace(/\s*$/, '\n') + `\n/* Theme Lab scratch — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} */\n${s.scratchCss.trim()}\n`);
      s.scratchCss = ''; ta.value = ''; p.applyScratch(); await p.saveSettings(); this.refreshScratchStatus(); new Notice('Theme Lab: appended to ' + path);
    });
    this.refreshScratchStatus();

    // Variables
    const vw = section('vars', 'Variables');
    vw.createEl('p', { text: 'Computed values on <body> for the current scheme. Comma-separated.', cls: 'theme-lab-hint' });
    const vin = vw.createEl('input', { type: 'text', cls: 'theme-lab-input' }); vin.value = s.watchVars; vin.placeholder = '--text-normal, --background-primary'; vin.spellcheck = false;
    vin.addEventListener('change', () => { s.watchVars = vin.value; p.saveSettings(); this.refreshWatch(); });
    this.watchEl = vw.createDiv({ cls: 'theme-lab-vars' });

    // Runs
    const rs = section('runs', 'Runs', (r) => { const b = r.createEl('button', { cls: 'theme-lab-mini' }); setIcon(b, 'refresh-cw'); b.setAttribute('aria-label', 'Refresh'); b.onclick = () => this.refreshRuns(); });
    this.runsEl = rs.createDiv({ cls: 'theme-lab-runs' });
    const rfoot = rs.createDiv({ cls: 'theme-lab-foot' });
    rfoot.createSpan();
    const rb = rfoot.createDiv({ cls: 'theme-lab-foot-buttons' });
    iconButton(rb, 'Compare latest with previous', 'git-compare', () => p.compareWithPrevious().then(() => this.refreshRuns()));

    // live state
    this.registerEvent(p.app.workspace.on('css-change', () => { this.refreshState(); this.refreshWatch(); this.refreshRuns(); }));
    this.registerEvent(p.app.workspace.on('active-leaf-change', () => this.refreshState()));
    this.registerEvent(p.app.workspace.on('layout-change', () => this.refreshState()));
    this.refreshState(); this.refreshWatch(); this.refreshRuns();
    if (p.lastInspected && document.contains(p.lastInspected)) this.showElement(p.lastInspected);
  }

  refreshState() {
    if (!this.themeEl) return;
    const p = this.plugin; const dark = p.isDark();
    this.themeEl.setText(currentThemeName());
    this.schemeEl.setText(dark ? 'Dark' : 'Light'); this.schemeEl.toggleClass('is-dark', dark); this.schemeEl.toggleClass('is-light', !dark);
    let mode = null; const l = p.app.workspace.getMostRecentLeaf();
    if (l && l.view.getViewType() === 'markdown') { const st = l.getViewState().state || {}; mode = st.mode === 'preview' ? 'reading' : st.source ? 'source' : 'live'; }
    for (const k of Object.keys(this.viewBtns)) this.viewBtns[k].toggleClass('is-active', mode === k);
    const ws = p.app.workspace; if (this.leftBtn) this.leftBtn.toggleClass('is-active', !!(ws.leftSplit && !ws.leftSplit.collapsed));
  }
  refreshScratchStatus() {
    if (!this.scratchStatus) return; const s = this.plugin.settings;
    const css = s.scratchCss || ''; const rules = (css.match(/\{/g) || []).length; const lines = css.trim() ? css.trim().split('\n').length : 0;
    this.scratchStatus.setText(!css.trim() ? 'Empty' : (s.scratchEnabled ? `Active · ${rules} rule${rules === 1 ? '' : 's'}, ${lines} line${lines === 1 ? '' : 's'}` : `Disabled · ${rules} rule${rules === 1 ? '' : 's'}`));
    this.scratchStatus.toggleClass('is-active', !!css.trim() && s.scratchEnabled);
    if (this.scratchTa) this.scratchTa.toggleClass('is-disabled', !s.scratchEnabled);
  }
  refreshWatch() {
    if (!this.watchEl) return; this.watchEl.empty();
    const cs = getComputedStyle(document.body);
    const names = this.plugin.settings.watchVars.split(/[,\s]+/).map((x) => x.trim()).filter((x) => x.startsWith('--'));
    if (!names.length) { this.watchEl.createEl('p', { text: 'Add variable names above to watch them.', cls: 'theme-lab-hint' }); return; }
    const t = this.watchEl.createEl('table', { cls: 'theme-lab-table' });
    for (const n of names) {
      const v = cs.getPropertyValue(n).trim(); const tr = t.createEl('tr');
      tr.createEl('td', { text: n, cls: 'theme-lab-prop' });
      const td = tr.createEl('td', { cls: 'theme-lab-val' });
      if (v && looksLikeColor(v)) { const sw = td.createSpan({ cls: 'theme-lab-swatch' }); sw.setCssProps({ '--theme-lab-swatch': v }); }
      td.createEl('code', { text: v || '(unset)', cls: v ? '' : 'theme-lab-unset' });
    }
  }
  async refreshRuns() {
    if (!this.runsEl) return; this.runsEl.empty();
    const p = this.plugin; const runs = (await p.listRuns()).slice(-8).reverse();
    if (!runs.length) { this.runsEl.createEl('p', { text: `No matrix runs for ${currentThemeName()} yet.`, cls: 'theme-lab-hint' }); return; }
    for (const r of runs) {
      const id = r.split('/').pop(); const m = id.match(/^(\d{4}-\d{2}-\d{2}) (\d{2})(\d{2})(\d{2})$/);
      const row = this.runsEl.createDiv({ cls: 'theme-lab-run' });
      const main = row.createDiv({ cls: 'theme-lab-run-main' });
      main.createSpan({ text: m ? `${m[1]}  ${m[2]}:${m[3]}` : id, cls: 'theme-lab-run-name' });
      let count = 0; try { count = (await p.app.vault.adapter.list(`${r}/sheets`)).files.filter((f) => /\.png$/.test(f)).length; } catch (e) { /* no sheets */ }
      main.createSpan({ text: count ? `${count} sheet${count === 1 ? '' : 's'}` : 'no sheets', cls: 'theme-lab-run-meta' });
      const links = row.createDiv({ cls: 'theme-lab-run-links' });
      const open = async (name) => { const f = p.app.vault.getAbstractFileByPath(`${r}/${name}`); if (f instanceof TFile) await p.app.workspace.getLeaf(true).openFile(f); else new Notice(`Theme Lab: ${name} not found in this run`); };
      const mk = (text, icon, fn) => { const a = links.createEl('button', { cls: 'theme-lab-mini theme-lab-mini-text' }); setIcon(a, icon); a.createSpan({ text }); a.onclick = fn; return a; };
      mk('Matrix', 'image', () => open('Matrix.md'));
      if (p.app.vault.getAbstractFileByPath(`${r}/Diff.md`) instanceof TFile) mk('Diff', 'git-compare', () => open('Diff.md'));
    }
  }
  showEmptyInspector() {
    const body = this.inspBody; body.empty();
    const e = body.createDiv({ cls: 'theme-lab-empty' });
    const ic = e.createSpan({ cls: 'theme-lab-empty-icon' }); setIcon(ic, 'crosshair');
    e.createDiv({ text: 'Pick an element to see which rule wins each property.', cls: 'theme-lab-hint' });
    e.createDiv({ text: 'Shift-click to inspect several in a row · Esc to stop', cls: 'theme-lab-hint theme-lab-hint-faint' });
  }
  showElement(el) {
    const body = this.inspBody; body.empty();
    const { rules, winners } = inspectData(el);
    const full = pathOf(el); const segs = full.split(' > ');
    const pathEl = body.createEl('div', { cls: 'theme-lab-path' });
    if (segs.length > 3) pathEl.createSpan({ text: '… > ', cls: 'theme-lab-path-more' });
    pathEl.createSpan({ text: segs.slice(-3).join(' > ') }); pathEl.setAttribute('aria-label', full); pathEl.setAttribute('data-tooltip-position', 'top');
    let expanded = false; pathEl.onclick = () => { expanded = !expanded; pathEl.empty(); if (!expanded && segs.length > 3) pathEl.createSpan({ text: '… > ', cls: 'theme-lab-path-more' }); pathEl.createSpan({ text: expanded ? full : segs.slice(-3).join(' > ') }); };
    const props = Object.keys(winners).filter((k) => !k.startsWith('--')).sort();
    const varCount = Object.keys(winners).length - props.length;
    const head = body.createDiv({ cls: 'theme-lab-foot' });
    head.createSpan({ text: `${rules.length} matching rule${rules.length === 1 ? '' : 's'} · ${props.length} properties${varCount ? ` · ${varCount} variables in the report` : ''}`, cls: 'theme-lab-status-text' });
    const hb = head.createDiv({ cls: 'theme-lab-foot-buttons' });
    new obsidian.ButtonComponent(hb).setButtonText('Pick again').onClick(() => this.plugin.startInspect());
    iconButton(hb, 'Copy report', 'copy', async () => { await navigator.clipboard.writeText(inspectReport(el)); new Notice('Theme Lab: report copied'); });
    const table = body.createEl('table', { cls: 'theme-lab-table' });
    for (const prop of props) {
      const w = winners[prop]; const tr = table.createEl('tr');
      tr.createEl('td', { text: prop, cls: 'theme-lab-prop' });
      const td = tr.createEl('td', { cls: 'theme-lab-val' });
      if (looksLikeColor(w.value)) { const sw = td.createSpan({ cls: 'theme-lab-swatch' }); sw.setCssProps({ '--theme-lab-swatch': w.value }); }
      td.createEl('code', { text: w.value + (w.imp ? ' !important' : '') });
      const sel = td.createEl('div', { cls: 'theme-lab-sel' });
      sel.createSpan({ text: w.ru.selector });
      sel.createSpan({ text: `${specStr(w.ru.spec)} · ${w.ru.origin}`, cls: 'theme-lab-sel-meta' });
    }
    if (!props.length) body.createEl('p', { text: 'No author rules match this element; everything is inherited or default.', cls: 'theme-lab-hint' });
  }
  async onClose() { this.contentEl.empty(); }
}

function iconButton(parent, label, icon, fn, cta) {
  const b = parent.createEl('button', { cls: 'theme-lab-iconbtn' + (cta ? ' mod-cta' : '') });
  const ic = b.createSpan({ cls: 'theme-lab-iconbtn-icon' }); setIcon(ic, icon);
  b.createSpan({ text: label }); b.onclick = fn; return b;
}
function looksLikeColor(v) { return /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|color-mix\(|oklch\(|transparent$)/i.test(v.trim()); }

// ---------- matrix modal ----------
class MatrixModal extends Modal {
  constructor(app, plugin) { super(app); this.plugin = plugin; }
  onOpen() { this.modalEl.addClass('theme-lab-modal'); this.render(); }
  render() {
    const s = this.plugin.settings; const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText('Capture screenshot matrix');
    contentEl.createEl('p', { text: 'Opens the showcase note and captures every combination below, then tiles the results into contact sheets. Keep the mouse still and the window in front.', cls: 'theme-lab-modal-intro' });

    // preset
    const presetRow = new Setting(contentEl).setName('Preset').setDesc(s.preset && PRESETS[s.preset] ? PRESETS[s.preset].desc : 'Custom — pick a preset to reset the options below.');
    presetRow.addDropdown((d) => {
      d.addOption('', 'Custom');
      for (const k of Object.keys(PRESETS)) d.addOption(k, PRESETS[k].label);
      d.setValue(s.preset || '');
      d.onChange((k) => { s.preset = k; if (k) { const P = PRESETS[k]; s.schemes = Object.assign({}, P.schemes); s.views = Object.assign({}, P.views); s.sidebars = Object.assign({}, P.sidebars); s.extras = Object.assign({}, P.extras); s.targets = P.targets; } this.render(); });
    });
    const custom = () => { if (s.preset) { s.preset = ''; presetRow.setDesc('Custom — pick a preset to reset the options below.'); } this.refreshEstimate(); };

    // option groups
    const group = (title, obj, labels, opts = {}) => {
      const g = contentEl.createDiv({ cls: 'theme-lab-group' });
      const gh = g.createDiv({ cls: 'theme-lab-group-head' });
      gh.createSpan({ text: title, cls: 'theme-lab-group-title' });
      if (opts.desc) gh.createSpan({ text: opts.desc, cls: 'theme-lab-group-desc' });
      const toggles = [];
      if (opts.allNone) {
        const an = gh.createDiv({ cls: 'theme-lab-group-links' });
        const setAll = (v) => { for (const k of Object.keys(labels)) obj[k] = v; toggles.forEach((t) => t.setValue(v)); custom(); };
        an.createEl('a', { text: 'All' }).onclick = () => setAll(true);
        an.createEl('a', { text: 'None' }).onclick = () => setAll(false);
      }
      const grid = g.createDiv({ cls: 'theme-lab-grid' + (opts.cols ? ` theme-lab-grid-${opts.cols}` : '') });
      for (const k of Object.keys(labels)) {
        const item = grid.createDiv({ cls: 'theme-lab-grid-item' });
        item.createSpan({ text: labels[k], cls: 'theme-lab-grid-label' });
        const t = new obsidian.ToggleComponent(item).setValue(!!obj[k]).onChange((v) => { obj[k] = v; custom(); });
        toggles.push(t);
        item.onclick = (e) => { if (e.target.closest('.checkbox-container')) return; t.setValue(!t.getValue()); obj[k] = t.getValue(); custom(); };
      }
    };
    group('Schemes', s.schemes, { dark: 'Dark', light: 'Light' }, { cols: 2 });
    group('Views', s.views, { reading: 'Reading', live: 'Live Preview', source: 'Source' }, { cols: 3 });
    group('Sidebars', s.sidebars, { open: 'Left open, right closed', closed: 'Both closed' }, { cols: 2 });
    group('Chrome', s.extras, { settings: 'Settings: Appearance', 'settings-editor': 'Settings: Editor', 'settings-plugins': 'Settings: Community plugins', palette: 'Command palette', switcher: 'Quick switcher', menu: 'File menu', 'editor-menu': 'Editor menu', tooltip: 'Tooltip', hover: 'Hover states', preview: 'Hover preview', search: 'Search pane', 'right-sidebar': 'Backlinks, outline, tags', graph: 'Graph view', notice: 'Notice' }, { cols: 2, allNone: true, desc: 'Captured once per scheme, after the note passes.' });

    // scratch a/b
    const hasScratch = !!s.scratchCss.trim();
    const abRow = new Setting(contentEl).setName('Scratch A/B').setDesc(hasScratch ? 'Capture every shot with the panel\'s scratch CSS off and on, then diff the pairs into a change sheet.' : 'Needs scratch CSS in the panel.');
    abRow.addToggle((t) => { t.setValue(hasScratch && s.abScratch).setDisabled(!hasScratch).onChange((v) => { s.abScratch = v; this.refreshEstimate(); }); });
    if (!hasScratch) { s.abScratch = false; abRow.settingEl.addClass('is-disabled'); }

    // targets
    new Setting(contentEl).setName('Scroll targets').setDesc('One heading per line. Leave empty for the top of the note plus every H2; enter a single "-" for the top only.').addTextArea((t) => { t.setValue(s.targets); t.inputEl.rows = 3; t.inputEl.placeholder = 'Callouts\nCode'; t.onChange((v) => { s.targets = v; custom(); }); });

    // footer
    const foot = contentEl.createDiv({ cls: 'theme-lab-modal-foot' });
    this.estimateEl = foot.createDiv({ cls: 'theme-lab-estimate' });
    const fb = foot.createDiv({ cls: 'theme-lab-foot-buttons' });
    new obsidian.ButtonComponent(fb).setButtonText('Cancel').onClick(() => this.close());
    new obsidian.ButtonComponent(fb).setButtonText('Capture').setCta().onClick(() => this.start());
    this.refreshEstimate();
  }
  buildConfig() {
    const s = this.plugin.settings;
    const cfg = {
      schemes: [],
      views: Object.keys(s.views).filter((k) => s.views[k]),
      sidebars: [s.sidebars.open ? true : null, s.sidebars.closed ? false : null].filter((v) => v !== null),
      extras: Object.keys(s.extras).filter((k) => s.extras[k]),
      targets: s.targets.split('\n').map((x) => x.trim()).filter((x) => x && x !== '-'),
      topOnly: s.targets.trim() === '-',
      abScratch: s.abScratch,
    };
    if (s.schemes.dark) cfg.schemes.push(true); if (s.schemes.light) cfg.schemes.push(false);
    return cfg;
  }
  refreshEstimate() {
    if (!this.estimateEl) return; const s = this.plugin.settings; const cfg = this.buildConfig();
    let headings = 0;
    if (!cfg.topOnly) {
      if (cfg.targets.length) headings = cfg.targets.length;
      else { const f = this.app.vault.getAbstractFileByPath(normalizePath(s.showcaseName + '.md')); const c = f instanceof TFile ? this.app.metadataCache.getFileCache(f) : null; headings = c && c.headings ? c.headings.filter((h) => h.level === 2).length : 8; }
    }
    const combos = cfg.schemes.length * cfg.views.length * cfg.sidebars.length;
    const notes = combos * (1 + headings); const chrome = cfg.schemes.length * cfg.extras.length;
    const shots = (notes + chrome) * (cfg.abScratch ? 2 : 1);
    const sheets = combos + (combos ? 1 : 0) + (chrome ? 1 : 0) + (cfg.abScratch ? 1 : 0);
    const ok = cfg.schemes.length && cfg.views.length && cfg.sidebars.length;
    this.estimateEl.setText(ok ? `≈ ${shots} captures · ${sheets} contact sheets · ~${Math.max(1, Math.round(shots * (s.settleMs + 900) / 60000))} min` : 'Pick at least one scheme, view and sidebar state.');
    this.estimateEl.toggleClass('is-warning', !ok);
  }
  async start() {
    const cfg = this.buildConfig();
    if (!cfg.schemes.length || !cfg.views.length || !cfg.sidebars.length) { new Notice('Theme Lab: pick at least one scheme, view and sidebar state.'); return; }
    await this.plugin.saveSettings();
    this.close();
    try { await this.plugin.runMatrix(cfg); } catch (e) { console.error(e); new Notice('Theme Lab: capture failed — see console'); }
  }
  onClose() { this.contentEl.empty(); }
}

// ---------- settings tab ----------
class ThemeLabSettingTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
  display() {
    const { containerEl } = this; const s = this.plugin.settings; const p = this.plugin; containerEl.empty(); containerEl.addClass('theme-lab-settings');
    const save = () => p.saveSettings();

    // actions
    const actions = containerEl.createDiv({ cls: 'theme-lab-actions' });
    const act = (label, icon, cta, fn) => iconButton(actions, label, icon, async () => { this.app.setting.close(); await fn(); }, cta);
    act('Open panel', 'flask-conical', true, () => p.openPanel());
    act('Showcase note', 'book', false, () => p.openShowcase());
    act('Capture matrix', 'layout-grid', false, () => new MatrixModal(this.app, p).open());
    act('Write report', 'file-text', false, () => p.writeReport());
    act('Inspect', 'crosshair', false, () => p.startInspect());

    new Setting(containerEl).setName('Showcase').setHeading();
    new Setting(containerEl).setName('Note name').setDesc('Created at the vault root. An existing note with this name is opened, never overwritten.').addText((t) => t.setValue(s.showcaseName).onChange(async (v) => { s.showcaseName = v.trim() || 'Theme Lab Showcase'; await save(); }));
    new Setting(containerEl).setName('Reset to the current template').setDesc('Overwrites the showcase note. Use after a plugin update that changed the template.').addButton((b) => b.setButtonText('Reset').setWarning().onClick(async () => {
      const path = normalizePath(s.showcaseName + '.md'); const f = this.app.vault.getAbstractFileByPath(path);
      const text = SHOWCASE.replace(/Theme Lab Showcase/g, s.showcaseName);
      if (f instanceof TFile) await this.app.vault.modify(f, text); else await this.app.vault.create(path, text);
      new Notice('Theme Lab: showcase note reset');
    }));

    new Setting(containerEl).setName('Capture').setHeading();
    new Setting(containerEl).setName('Settle time (ms)').setDesc('Wait after each scheme, view or scroll change before capturing. Raise it if shots catch a transition.').addSlider((sl) => sl.setLimits(200, 2000, 100).setValue(s.settleMs).setDynamicTooltip().onChange(async (v) => { s.settleMs = v; await save(); }));
    new Setting(containerEl).setName('Force readable line length').setDesc('Turned on for the run and restored afterwards. Listing screenshots are expected to use it.').addToggle((t) => t.setValue(s.forceReadable).onChange(async (v) => { s.forceReadable = v; await save(); }));
    new Setting(containerEl).setName('Left sidebar content').setDesc('Which pane the left sidebar shows in "sidebars open" captures.').addDropdown((d) => d.addOption('file-explorer', 'File explorer').addOption('search', 'Search').setValue(s.leftTab).onChange(async (v) => { s.leftTab = v; await save(); }));

    new Setting(containerEl).setName('Output').setHeading();
    new Setting(containerEl).setName('Folder').setDesc('Everything is filed under this folder, then the theme name. Each matrix run gets a timestamped subfolder with shots/ and sheets/.').addText((t) => t.setValue(s.outputFolder).setPlaceholder('Theme Lab').onChange(async (v) => { s.outputFolder = v.trim() || 'Theme Lab'; await save(); }));
    new Setting(containerEl).setName('Listing crop').setDesc('Also write a 1200×800 crop centred on the note, below the view header — the community listing format.').addToggle((t) => t.setValue(s.cropListing).onChange(async (v) => { s.cropListing = v; await save(); }));
    new Setting(containerEl).setName('Hero image').setDesc('Also write the full window resized to 1920 px wide, for README and site heroes.').addToggle((t) => t.setValue(s.cropHero).onChange(async (v) => { s.cropHero = v; await save(); }));
    new Setting(containerEl).setName('Save inspect reports as notes').setDesc('Reports are always copied to the clipboard. Turn this on to keep a copy in the output folder as well.').addToggle((t) => t.setValue(s.inspectWriteNote).onChange(async (v) => { s.inspectWriteNote = v; await save(); }));
  }
}

module.exports = ThemeLabPlugin;
