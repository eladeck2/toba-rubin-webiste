/**
 * A day in a life — scroll engine.
 *
 * One progress value (0..1 across the track) drives every layer: sky and hill
 * colours, star visibility, the sun and moon arc, scene crossfades and a little
 * parallax. Nothing hijacks scrolling: we only read scroll position.
 *
 * Reduced motion: the engine works in whole moments instead of fractions, so
 * scenes and colours change by a short crossfade and nothing drifts.
 */

import type { Sky, SkyKey } from '../config/sky';

interface EngineData {
  moments: { id: string; sky: SkyKey; sound: Record<'birds' | 'simmer' | 'crickets', number> }[];
  skies: Record<'light' | 'dark', Record<SkyKey, Sky>>;
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

let teardown: (() => void) | null = null;

export function initDay() {
  teardown?.();
  teardown = null;

  const root = document.querySelector<HTMLElement>('[data-day]');
  if (!root) return;
  const track = root.querySelector<HTMLElement>('.day__track')!;
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const dataEl = root.querySelector('[data-day-data]');
  if (!dataEl) return;
  const data: EngineData = JSON.parse(dataEl.textContent || '{}');

  const scenes = Array.from(root.querySelectorAll<HTMLElement>('[data-scene]'));
  const moments = Array.from(root.querySelectorAll<HTMLElement>('[data-moment]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const list = root.querySelector<HTMLElement>('[data-moments]')!;
  const sun = root.querySelector<HTMLElement>('[data-sun]')!;
  const moon = root.querySelector<HTMLElement>('[data-moon]')!;
  const land = root.querySelector<HTMLElement>('[data-land]')!;
  const fg = root.querySelector<HTMLElement>('[data-fg]');
  const art = root.querySelector<HTMLElement>('.day__art')!;
  const n = data.moments.length;

  const mqDark = matchMedia('(prefers-color-scheme: dark)');
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqWide = matchMedia('(min-width: 960px)');

  let active = -1;
  let tone: 'light' | 'dark' | '' = '';
  let raf = 0;
  let stageH = 0;
  let stageW = 0;
  let horizon = 0;
  let inView = false;
  let lastCelestialKey = '';

  /* ── Card height: tallest card sets the zone so nothing jumps ── */
  function measure() {
    stageH = stage.clientHeight;
    stageW = stage.clientWidth;
    let max = 0;
    for (const m of moments) max = Math.max(max, m.offsetHeight);
    root!.style.setProperty('--card-h', `${Math.ceil(max)}px`);
    horizon = land.offsetTop + land.offsetHeight * 0.3;
  }

  /* ── Try-today ticks remembered for today only ─────────────── */
  const todayKey = `tova:tried:${new Date().toISOString().slice(0, 10)}`;
  let tried: string[] = [];
  try { tried = JSON.parse(localStorage.getItem(todayKey) || '[]'); } catch { /* storage unavailable */ }
  const tryButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-try]'));
  for (const b of tryButtons) {
    if (tried.includes(b.dataset.try!)) b.setAttribute('aria-pressed', 'true');
  }
  function onTry(e: Event) {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-try]');
    if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(on));
    tried = on ? [...new Set([...tried, b.dataset.try!])] : tried.filter((t) => t !== b.dataset.try);
    try { localStorage.setItem(todayKey, JSON.stringify(tried)); } catch { /* ignore */ }
  }
  list.addEventListener('click', onTry);

  /* ── Progress ──────────────────────────────────────────────── */
  function progress() {
    const rect = track.getBoundingClientRect();
    const span = rect.height - stageH;
    return { p: clamp(-rect.top / Math.max(1, span)), top: rect.top, bottom: rect.bottom };
  }

  function scrollToMoment(k: number) {
    const rect = track.getBoundingClientRect();
    const span = rect.height - stageH;
    const y = window.scrollY + rect.top + (span * k) / (n - 1) + 1;
    window.scrollTo({ top: y, behavior: mqReduce.matches ? 'auto' : 'smooth' });
  }
  function onDot(e: Event) {
    const b = (e.currentTarget as HTMLElement);
    scrollToMoment(Number(b.dataset.dot));
  }
  dots.forEach((d) => d.addEventListener('click', onDot));

  // Keyboard path: focusing anything inside a moment brings that moment on stage.
  function onFocusIn(e: FocusEvent) {
    const li = (e.target as HTMLElement).closest<HTMLElement>('[data-moment]');
    if (li && Number(li.dataset.moment) !== active) scrollToMoment(Number(li.dataset.moment));
  }
  list.addEventListener('focusin', onFocusIn);

  /* ── Celestial arc ─────────────────────────────────────────── */
  function arcPoint(theta: number) {
    const wide = mqWide.matches;
    const cx = stageW * (wide ? 0.66 : 0.5);
    const rx = stageW * (wide ? 0.27 : 0.4);
    const top = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.25 + (wide ? 70 : 34);
    const ry = Math.max(80, horizon - top);
    return { x: cx + Math.cos(theta) * rx, y: horizon - Math.sin(theta) * ry };
  }

  function placeBody(el: HTMLElement, theta: number, vis: number) {
    const { x, y } = arcPoint(theta);
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    el.style.opacity = vis.toFixed(3);
  }

  /* ── Render ────────────────────────────────────────────────── */
  function render() {
    raf = 0;
    const { p, top, bottom } = progress();
    const reduce = mqReduce.matches;
    const exact = p * (n - 1);
    const i = reduce ? Math.round(exact) : exact;
    const k = Math.min(n - 1, Math.round(exact));

    const nowInView = top <= 1 && bottom >= stageH - 1;
    if (nowInView !== inView) {
      inView = nowInView;
      document.documentElement.toggleAttribute('data-story-active', inView);
      document.dispatchEvent(new CustomEvent('story:active'));
    }

    // Sky: hold each moment's palette for the middle half, blend at the edges.
    const palette = data.skies[mqDark.matches ? 'dark' : 'light'];
    const a = Math.floor(i);
    const b = Math.min(n - 1, a + 1);
    const t = smooth(clamp((i - a - 0.2) / 0.6));
    const sa = palette[data.moments[a].sky];
    const sb = palette[data.moments[b].sky];
    const s = root!.style;
    s.setProperty('--sky-top', mix(sa.top, sb.top, t));
    s.setProperty('--sky-bottom', mix(sa.bottom, sb.bottom, t));
    s.setProperty('--hill-far', mix(sa.hillFar, sb.hillFar, t));
    s.setProperty('--hill-near', mix(sa.hillNear, sb.hillNear, t));
    s.setProperty('--stars', (sa.stars + (sb.stars - sa.stars) * t).toFixed(3));

    const near = t < 0.5 ? a : b;
    const nextTone = palette[data.moments[near].sky].tone;
    stage.dataset.sky = data.moments[near].sky;
    if (nextTone !== tone) {
      tone = nextTone;
      stage.dataset.tone = tone;
      document.dispatchEvent(new CustomEvent('story:active'));
    }

    // Scenes: crossfade with a short plateau; rise gently into place.
    const wide = mqWide.matches;
    const drift = wide ? 80 : 40;
    scenes.forEach((el, j) => {
      const d = i - j;
      const o = reduce ? (j === k ? 1 : 0) : clamp(1 - (Math.abs(d) - 0.22) / 0.34);
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o === 0 ? 'hidden' : 'visible';
      if (!reduce) el.style.transform = `translate3d(0, ${(-d * drift * 0.35).toFixed(1)}px, 0)`;
      else el.style.transform = '';
    });

    if (!reduce) {
      land.style.transform = `translate3d(0, ${((0.5 - p) * drift * 0.3).toFixed(1)}px, 0)`;
      if (fg) fg.style.transform = `translate3d(0, ${((0.5 - p) * drift).toFixed(1)}px, 0)`;
    } else {
      land.style.transform = '';
      if (fg) fg.style.transform = '';
    }

    // Sun: rises at dawn (0), peaks at midday (3), sets after the evening table (5).
    // Moon: rises at dusk and sits high over the night garden.
    const sunAt = (x: number) => Math.PI * (1 - clamp((x + 0.25) / 5.6));
    const moonAt = (x: number) => Math.PI * (1 - 0.62 * clamp((x - 4.4) / 1.6));
    const sunVis = clamp((5.2 - i) / 0.5) * clamp((i + 0.6) / 0.4);
    const moonVis = clamp((i - 4.5) / 0.6);
    if (reduce) {
      const key = `${k}`;
      if (key !== lastCelestialKey) {
        lastCelestialKey = key;
        sun.style.opacity = '0';
        moon.style.opacity = '0';
        window.setTimeout(() => {
          placeBody(sun, sunAt(k), k <= 4 ? 1 : 0);
          placeBody(moon, moonAt(k), k >= 5 ? 1 : 0);
        }, 260);
      }
    } else {
      lastCelestialKey = '';
      placeBody(sun, sunAt(i), sunVis);
      placeBody(moon, moonAt(i), moonVis);
    }

    // Cards, dots and the garden sound follow the nearest moment.
    if (k !== active) {
      active = k;
      moments.forEach((m, j) => m.toggleAttribute('data-active', j === k));
      dots.forEach((d) => {
        if (Number(d.dataset.dot) === k) d.setAttribute('aria-current', 'step');
        else d.removeAttribute('aria-current');
      });
      if (inView) document.dispatchEvent(new CustomEvent('garden:mix', { detail: data.moments[k].sound }));
    }

    art.classList.toggle('paused', !inView);
  }

  const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
  const onResize = () => { measure(); lastCelestialKey = ''; schedule(); };
  const onScheme = () => { tone = ''; lastCelestialKey = ''; schedule(); };

  measure();
  render();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize);
  mqDark.addEventListener('change', onScheme);
  mqReduce.addEventListener('change', onScheme);
  document.fonts?.ready.then(onResize);

  teardown = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', onResize);
    mqDark.removeEventListener('change', onScheme);
    mqReduce.removeEventListener('change', onScheme);
    list.removeEventListener('click', onTry);
    list.removeEventListener('focusin', onFocusIn);
    dots.forEach((d) => d.removeEventListener('click', onDot));
    document.documentElement.removeAttribute('data-story-active');
  };
  document.addEventListener('astro:before-swap', () => { teardown?.(); teardown = null; }, { once: true });
}
