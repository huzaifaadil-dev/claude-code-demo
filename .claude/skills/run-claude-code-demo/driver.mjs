// REPL driver for claude-code-demo (Laravel + Inertia/React), driven via
// headless Chromium (Playwright). Requires `php artisan serve` and
// `npm run dev` (Vite) already running — see SKILL.md.
// Designed for agents: wrap in tmux, send-keys commands, capture-pane output.
import { chromium } from 'playwright';
import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BASE_URL = process.env.APP_URL || 'http://localhost:8000';
const SHOT_DIR = process.env.SCREENSHOT_DIR || '/tmp/claude-code-demo-shots';
fs.mkdirSync(SHOT_DIR, { recursive: true });

let browser = null;
let page = null;

const COMMANDS = {
  async launch() {
    if (browser) return console.log('already launched');
    browser = await chromium.launch({ args: ['--no-sandbox'] });
    page = await (await browser.newContext()).newPage();
    console.log('launched.');
  },

  async nav(url) {
    if (!page) return console.log('ERROR: launch first');
    const target = url?.startsWith('http') ? url : BASE_URL + (url || '/');
    await page.goto(target, { waitUntil: 'domcontentloaded' });
    console.log('nav ->', target);
  },

  // Logs in via the real form (Inertia app doesn't expose a token
  // endpoint) then waits for the post-login redirect.
  async login(rest) {
    if (!page) return console.log('ERROR: launch first');
    const [email, password] = (rest || 'test@example.com password').split(' ');
    await page.goto(BASE_URL + '/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[type="email"], input[name="email"]', email);
    await page.fill('input[type="password"], input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    console.log('login ->', page.url());
  },

  async ss(name) {
    if (!page) return console.log('ERROR: launch first');
    const f = path.join(SHOT_DIR, (name || `ss-${Date.now()}`) + '.png');
    await page.screenshot({ path: f, fullPage: true });
    console.log('screenshot:', f);
  },

  async click(sel) {
    if (!page) return console.log('ERROR: launch first');
    try { await page.click(sel, { timeout: 10_000 }); console.log('click', sel, '-> OK'); }
    catch (e) { console.log('click', sel, '-> ERROR:', e.message); }
  },

  async 'click-text'(text) {
    if (!page) return console.log('ERROR: launch first');
    try {
      await page.getByText(text, { exact: false }).first().click({ timeout: 10_000 });
      console.log('click-text', JSON.stringify(text), '-> OK');
    } catch (e) { console.log('click-text -> ERROR:', e.message); }
  },

  // Use fill for React controlled inputs — page.evaluate(el.value=...)
  // does not fire React's onChange and the form won't see the value.
  async fill(rest) {
    if (!page) return console.log('ERROR: launch first');
    const [sel, ...valueParts] = rest.split(' ');
    const value = valueParts.join(' ');
    try { await page.fill(sel, value); console.log('fill', sel, '->', value); }
    catch (e) { console.log('fill -> ERROR:', e.message); }
  },

  async press(key) { if (page) await page.keyboard.press(key); console.log('press', key); },

  async wait(sel) {
    if (!page) return console.log('ERROR: launch first');
    try { await page.waitForSelector(sel, { timeout: 10_000 }); console.log('found:', sel); }
    catch { console.log('TIMEOUT:', sel); }
  },

  async 'wait-text'(text) {
    if (!page) return console.log('ERROR: launch first');
    try { await page.getByText(text, { exact: false }).first().waitFor({ timeout: 10_000 }); console.log('found text:', text); }
    catch { console.log('TIMEOUT waiting for text:', text); }
  },

  async eval(expr) {
    if (!page) return console.log('ERROR: launch first');
    try { console.log(JSON.stringify(await page.evaluate(expr))); }
    catch (e) { console.log('ERROR:', e.message); }
  },

  async text(sel) {
    if (!page) return console.log('ERROR: launch first');
    console.log(await page.evaluate(
      s => (s ? document.querySelector(s) : document.body)?.innerText ?? '(null)',
      sel || null));
  },

  async url() { console.log(page ? page.url() : '(no page)'); },

  async quit() { if (browser) await browser.close().catch(() => {}); browser = null; page = null; },
  help() { console.log('commands:', Object.keys(COMMANDS).join(', ')); },
};

const stdin = fs.createReadStream(null, { fd: fs.openSync('/dev/stdin', 'r') });
const rl = readline.createInterface({ input: stdin, output: process.stdout, prompt: 'driver> ' });

// readline emits 'line' events as fast as input arrives, without waiting
// for the previous async handler to finish — serialize with a queue or
// piped multi-line scripts race (e.g. "login" starts before "launch" ends).
let queue = Promise.resolve();
rl.on('line', line => {
  queue = queue.then(async () => {
    const [cmd, ...rest] = line.trim().split(/\s+/);
    if (!cmd) return rl.prompt();
    const fn = COMMANDS[cmd];
    if (!fn) { console.log('unknown:', cmd, '— try: help'); return rl.prompt(); }
    try { await fn(rest.join(' ')); } catch (e) { console.log('ERROR:', e.message); }
    if (cmd === 'quit') { rl.close(); process.exit(0); }
    rl.prompt();
  });
});
rl.on('close', async () => { await COMMANDS.quit(); process.exit(0); });

console.log('claude-code-demo driver — "help" for commands, "launch" to start');
rl.prompt();
