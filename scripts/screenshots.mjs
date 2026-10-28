// Visual check from the design doc's quality gates: 375 / 768 / 1440 px,
// light and dark, reduced motion on and off. Serves ./dist with `astro preview`.
//
//   npm run build && npm run screenshots [-- --out docs/screenshots/phase-1]

import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

// Uses the project's playwright if installed, else the machine's global one.
const { chromium } = await import('playwright').catch(() => createRequire(import.meta.url)('playwright'));

const outArg = process.argv.indexOf('--out');
const OUT = outArg > -1 ? process.argv[outArg + 1] : 'docs/screenshots/phase-1';
const PORT = 4329;

const viewports = [
  { name: '375', width: 375, height: 812, mobile: true },
  { name: '768', width: 768, height: 1024, mobile: true },
  { name: '1440', width: 1440, height: 900, mobile: false },
];
const schemes = ['light', 'dark'];
const motions = [
  { name: 'motion', value: 'no-preference' },
  { name: 'reduced', value: 'reduce' },
];

// `astro preview` may already be running as a background daemon; use whatever URL it reports.
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
const BASE = await new Promise((resolve, reject) => {
  const t = setTimeout(() => reject(new Error('preview did not start')), 20000);
  const onData = (d) => {
    const m = String(d).match(/http:\/\/localhost:\d+/);
    if (m) { clearTimeout(t); resolve(m[0] + '/'); }
  };
  server.stdout.on('data', onData);
  server.stderr.on('data', onData);
});

const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    for (const scheme of schemes) {
      for (const motion of motions) {
        const dir = path.join(OUT, `${vp.name}-${scheme}-${motion.name}`);
        await mkdir(dir, { recursive: true });
        const ctx = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.mobile ? 2 : 1,
          isMobile: vp.mobile,
          hasTouch: vp.mobile,
          colorScheme: scheme,
          reducedMotion: motion.value,
        });
        const page = await ctx.newPage();
        // Fixed clock (8:30 am) so the greeting is stable between runs.
        await page.addInitScript(() => {
          const Real = Date;
          const fixed = new Real(2026, 9, 28, 8, 30).getTime();
          // @ts-ignore
          globalThis.Date = class extends Real { constructor(...a) { super(...(a.length ? a : [fixed])); } static now() { return fixed; } };
        });
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(600);

        const shot = (name) => page.screenshot({ path: path.join(dir, `${name}.jpg`), type: 'jpeg', quality: 78 });
        await shot('00-hero');

        const n = await page.evaluate(() => document.querySelectorAll('[data-moment]').length);
        for (let k = 0; k < n; k++) {
          await page.evaluate((k) => {
            const track = document.querySelector('.day__track');
            const n = document.querySelectorAll('[data-moment]').length;
            const span = track.offsetHeight - window.innerHeight;
            const top = track.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top + (span * k) / (n - 1) + 1, behavior: 'instant' });
          }, k);
          await page.waitForTimeout(1100);
          const id = await page.evaluate((k) => document.querySelector(`[data-moment="${k}"]`).id.replace('moment-', ''), k);
          await shot(`${String(k + 1).padStart(2, '0')}-${id}`);
        }
        await page.evaluate(() => document.getElementById('join').scrollIntoView({ behavior: 'instant' }));
        await page.waitForTimeout(900);
        await shot(`${String(n + 1).padStart(2, '0')}-join`);
        await ctx.close();
        console.log('✓', dir);
      }
    }
  }
} finally {
  await browser.close();
  server.kill();
  spawn('npx', ['astro', 'preview', 'stop'], { stdio: 'ignore' });
}
