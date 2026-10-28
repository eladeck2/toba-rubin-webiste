/**
 * Play the garden — synthesized with the Web Audio API.
 *
 * No recordings ship yet (the build environment can't fetch CC0 libraries), so
 * every sound is modelled on how the real thing is produced, then softened
 * through a small room reverb and a gentle low-pass:
 *
 *  - Birds: short sine "syllables" with fast pitch glides and a little FM
 *    flutter, grouped into phrases by three loosely different species.
 *  - Simmer: a low brown-noise rumble plus bubbles — each a tiny sine whose
 *    pitch rises as it decays (how a real bubble rings as it collapses).
 *  - Crickets: steady tones near 4.5 kHz gated into pulses of three or four,
 *    each insect at its own rhythm and position.
 *  - Singing bowl: inharmonic partials, each a pair of slightly detuned sines
 *    so they beat slowly, with long decays and a soft mallet thump.
 *
 * Nothing here runs until the visitor taps: the AudioContext is created inside
 * start(), which is only ever called from a click handler.
 */

export type Mix = { birds: number; simmer: number; crickets: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

export class Garden {
  private ctx!: AudioContext;
  private master!: GainNode;
  private reverbIn!: GainNode;
  private layers!: Record<keyof Mix, GainNode>;
  private timers: number[] = [];
  private cricketTimer = 0;
  private crickets: { osc: OscillatorNode; gate: GainNode; next: number; period: number; pulses: number; level: number }[] = [];
  private bowlTimer = 0;
  private mix: Mix = { birds: 1, simmer: 0.6, crickets: 0 };
  running = false;

  static readonly MASTER = 0.35;

  async start(initial?: Mix) {
    if (initial) this.mix = initial;
    if (!this.ctx) this.build();
    if (this.ctx.state !== 'running') await this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(Garden.MASTER, now + 2.5);
    this.running = true;
    this.applyMix(0.8);
    this.loopBirds();
    this.loopBubbles();
    this.loopCrickets();
    this.scheduleBowl(rand(6, 12));
  }

  async stop() {
    if (!this.ctx) return;
    this.running = false;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.9);
    this.clearTimers();
    await new Promise((r) => setTimeout(r, 1000));
    if (!this.running) await this.ctx.suspend();
  }

  /** Pause/resume with the tab, without changing the visitor's choice. */
  async hide(hidden: boolean) {
    if (!this.ctx || !this.running) return;
    if (hidden) { this.clearTimers(); await this.ctx.suspend(); }
    else { await this.ctx.resume(); this.loopBirds(); this.loopBubbles(); this.loopCrickets(); this.scheduleBowl(rand(20, 45)); }
  }

  setMix(mix: Mix) {
    this.mix = mix;
    if (this.ctx && this.running) this.applyMix(1.5);
  }

  /** Crossfade loops; ~95% of the way there after `seconds`. */
  private applyMix(seconds: number) {
    const now = this.ctx.currentTime;
    (Object.keys(this.layers) as (keyof Mix)[]).forEach((k) => {
      const g = this.layers[k].gain;
      g.cancelScheduledValues(now);
      g.setTargetAtTime(this.mix[k], now, seconds / 3);
    });
  }

  ringBowl() {
    if (!this.ctx) this.build();
    if (this.ctx.state !== 'running') this.ctx.resume();
    if (!this.running) {
      // A single ring on demand still respects the master level.
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(Garden.MASTER, now);
    }
    this.bowl(this.ctx.currentTime + 0.03);
  }

  /* ── Graph ─────────────────────────────────────────────────── */
  private build() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = (this.ctx = new AC({ latencyHint: 'playback' }));

    const soften = ctx.createBiquadFilter();
    soften.type = 'lowpass';
    soften.frequency.value = 7200;
    soften.Q.value = 0.5;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.ratio.value = 3;
    comp.attack.value = 0.02;
    comp.release.value = 0.4;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    soften.connect(comp).connect(this.master).connect(ctx.destination);

    // Small garden-room reverb from decaying stereo noise.
    const verb = ctx.createConvolver();
    verb.buffer = this.impulse(2.8, 3.2);
    const verbOut = ctx.createGain();
    verbOut.gain.value = 0.32;
    this.reverbIn = ctx.createGain();
    this.reverbIn.connect(verb).connect(verbOut).connect(soften);

    const dry = ctx.createGain();
    dry.connect(soften);

    const layer = () => {
      const g = ctx.createGain();
      g.gain.value = 0;
      g.connect(dry);
      const send = ctx.createGain();
      send.gain.value = 0.55;
      g.connect(send).connect(this.reverbIn);
      return g;
    };
    this.layers = { birds: layer(), simmer: layer(), crickets: layer() };

    this.buildBeds();
    this.buildCrickets();
    // The bowl bypasses the layer mix so it can ring in any scene.
    this.bowlBus = ctx.createGain();
    this.bowlBus.gain.value = 0.2;
    this.bowlBus.connect(dry);
    const bowlSend = ctx.createGain();
    bowlSend.gain.value = 0.7;
    this.bowlBus.connect(bowlSend).connect(this.reverbIn);
  }
  private bowlBus!: GainNode;

  private impulse(seconds: number, decay: number) {
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  private noise(kind: 'pink' | 'brown', seconds = 6) {
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = this.ctx.createBuffer(1, len, rate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (kind === 'pink') {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
        b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      } else {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      }
    }
    // Fade the loop seam.
    const f = Math.floor(rate * 0.05);
    for (let i = 0; i < f; i++) { d[i] *= i / f; d[len - 1 - i] *= i / f; }
    return buf;
  }

  private loopSource(buf: AudioBuffer) {
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    s.loop = true;
    s.start(0, Math.random() * buf.duration);
    return s;
  }

  /** Slow, irregular swells so beds never sound static. */
  private breathe(param: AudioParam, base: number, depth: number, rate: number) {
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = rate;
    const amt = this.ctx.createGain();
    amt.gain.value = depth;
    param.value = base;
    lfo.connect(amt).connect(param);
    lfo.start();
  }

  private buildBeds() {
    const ctx = this.ctx;
    const pink = this.noise('pink');
    const brown = this.noise('brown');

    // Air through leaves under the birds.
    const air = this.loopSource(pink);
    const airBand = ctx.createBiquadFilter();
    airBand.type = 'bandpass';
    airBand.frequency.value = 900;
    airBand.Q.value = 0.4;
    const airGain = ctx.createGain();
    this.breathe(airGain.gain, 0.05, 0.025, 0.06);
    air.connect(airBand).connect(airGain).connect(this.layers.birds);

    // The pot: a low, rounded rumble that rises and falls a little.
    const rumble = this.loopSource(brown);
    const rumbleLp = ctx.createBiquadFilter();
    rumbleLp.type = 'lowpass';
    rumbleLp.frequency.value = 280;
    const rumbleGain = ctx.createGain();
    this.breathe(rumbleGain.gain, 0.18, 0.05, 0.11);
    rumble.connect(rumbleLp).connect(rumbleGain).connect(this.layers.simmer);

    // A faint steam hiss.
    const hiss = this.loopSource(pink);
    const hissHp = ctx.createBiquadFilter();
    hissHp.type = 'bandpass';
    hissHp.frequency.value = 3800;
    hissHp.Q.value = 0.7;
    const hissGain = ctx.createGain();
    this.breathe(hissGain.gain, 0.012, 0.006, 0.17);
    hiss.connect(hissHp).connect(hissGain).connect(this.layers.simmer);

    // Night air: very soft, darker.
    const night = this.loopSource(pink);
    const nightLp = ctx.createBiquadFilter();
    nightLp.type = 'lowpass';
    nightLp.frequency.value = 700;
    const nightGain = ctx.createGain();
    this.breathe(nightGain.gain, 0.04, 0.015, 0.05);
    night.connect(nightLp).connect(nightGain).connect(this.layers.crickets);
  }

  /* ── Birds ─────────────────────────────────────────────────── */
  private clearTimers() {
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
    clearInterval(this.cricketTimer);
    clearTimeout(this.bowlTimer);
  }

  private later(fn: () => void, ms: number) {
    this.timers.push(window.setTimeout(fn, ms));
  }

  private loopBirds() {
    const tick = () => {
      if (!this.running) return;
      if (this.mix.birds > 0.02) this.birdPhrase(this.ctx.currentTime + 0.05);
      // Busier at full dawn chorus, sparser when birds are in the background.
      const gap = this.mix.birds > 0.7 ? rand(0.7, 3.2) : rand(2.5, 7);
      this.later(tick, gap * 1000);
    };
    this.later(tick, rand(200, 900));
  }

  private syllable(t: number, f0: number, f1: number, dur: number, level: number, out: AudioNode, flutter = 0) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    if (flutter) {
      const fm = ctx.createOscillator();
      fm.frequency.value = rand(28, 55);
      const fmAmt = ctx.createGain();
      fmAmt.gain.value = flutter;
      fm.connect(fmAmt).connect(osc.frequency);
      fm.start(t);
      fm.stop(t + dur + 0.05);
    }
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(level, t + Math.min(0.018, dur * 0.3));
    env.gain.setValueAtTime(level, t + dur * 0.55);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(env).connect(out);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private birdPhrase(t: number) {
    const ctx = this.ctx;
    const pan = ctx.createStereoPanner();
    pan.pan.value = rand(-0.8, 0.8);
    const dist = ctx.createBiquadFilter();
    dist.type = 'lowpass';
    dist.frequency.value = rand(4200, 8000);
    const near = rand(0.35, 1);
    dist.connect(pan).connect(this.layers.birds);
    const lvl = 0.05 * near;

    const species = pick(['warbler', 'caller', 'trill', 'warbler']);
    if (species === 'warbler') {
      // A robin-like run of rising and falling syllables.
      const base = rand(2100, 3100);
      const notes = Math.floor(rand(3, 7));
      let at = t;
      for (let i = 0; i < notes; i++) {
        const up = Math.random() < 0.5;
        const f0 = base * rand(0.9, 1.25);
        const f1 = f0 * (up ? rand(1.15, 1.45) : rand(0.65, 0.88));
        const d = rand(0.07, 0.16);
        this.syllable(at, f0, f1, d, lvl * rand(0.7, 1), dist, rand(40, 140));
        at += d + rand(0.04, 0.1);
      }
    } else if (species === 'caller') {
      // A clear two-note call, like a chickadee's "fee-bee".
      const f = rand(3300, 3900);
      this.syllable(t, f * 1.02, f, 0.26, lvl * 0.8, dist);
      this.syllable(t + 0.36, f * 0.86, f * 0.84, 0.3, lvl * 0.75, dist);
    } else {
      // A quick descending trill.
      const count = Math.floor(rand(8, 13));
      const top = rand(4400, 5400);
      for (let i = 0; i < count; i++) {
        const f = top * (1 - i * 0.025);
        this.syllable(t + i * 0.055, f * 1.08, f * 0.86, 0.035, lvl * 0.55, dist);
      }
    }
  }

  /* ── Simmer ────────────────────────────────────────────────── */
  private loopBubbles() {
    const tick = () => {
      if (!this.running) return;
      if (this.mix.simmer > 0.02) {
        const t = this.ctx.currentTime + 0.03;
        const burst = Math.random() < 0.25 ? Math.floor(rand(2, 5)) : 1;
        for (let i = 0; i < burst; i++) this.bubble(t + i * rand(0.02, 0.07));
      }
      this.later(tick, rand(60, 340));
    };
    this.later(tick, 100);
  }

  private bubble(t: number) {
    const ctx = this.ctx;
    const f = rand(260, 820);
    const d = rand(0.025, 0.06);
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.exponentialRampToValueAtTime(f * rand(1.6, 2.4), t + d);
    const env = ctx.createGain();
    const lvl = rand(0.012, 0.04);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(lvl, t + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0001, t + d);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    const pan = ctx.createStereoPanner();
    pan.pan.value = rand(-0.25, 0.25);
    osc.connect(env).connect(lp).connect(pan).connect(this.layers.simmer);
    osc.start(t);
    osc.stop(t + d + 0.02);
  }

  /* ── Crickets ──────────────────────────────────────────────── */
  private buildCrickets() {
    const ctx = this.ctx;
    const voices = [
      { f: 4480, pan: -0.55, period: 0.82, pulses: 3, level: 0.016 },
      { f: 4720, pan: 0.45, period: 0.95, pulses: 4, level: 0.012 },
      { f: 4300, pan: 0.05, period: 1.21, pulses: 3, level: 0.007 },
    ];
    for (const v of voices) {
      const osc = ctx.createOscillator();
      osc.frequency.value = v.f;
      const gate = ctx.createGain();
      gate.gain.value = 0;
      const pan = ctx.createStereoPanner();
      pan.pan.value = v.pan;
      osc.connect(gate).connect(pan).connect(this.layers.crickets);
      osc.start();
      this.crickets.push({ osc, gate, next: 0, period: v.period, pulses: v.pulses, level: v.level });
    }
  }

  private loopCrickets() {
    clearInterval(this.cricketTimer);
    const ahead = 0.4;
    this.cricketTimer = window.setInterval(() => {
      if (!this.running) return;
      const now = this.ctx.currentTime;
      for (const c of this.crickets) {
        if (c.next < now) c.next = now + rand(0.05, 0.6);
        while (c.next < now + ahead) {
          for (let p = 0; p < c.pulses; p++) {
            const t = c.next + p * 0.042;
            const a = c.level * rand(0.75, 1);
            c.gate.gain.setValueAtTime(0, t);
            c.gate.gain.linearRampToValueAtTime(a, t + 0.005);
            c.gate.gain.linearRampToValueAtTime(0, t + 0.02);
          }
          // Small drift keeps each cricket from sounding like a metronome.
          c.next += c.period * rand(0.94, 1.08);
        }
      }
    }, 150);
  }

  /* ── Singing bowl ──────────────────────────────────────────── */
  private scheduleBowl(seconds: number) {
    clearTimeout(this.bowlTimer);
    this.bowlTimer = window.setTimeout(() => {
      if (!this.running) return;
      this.bowl(this.ctx.currentTime + 0.05);
      this.scheduleBowl(rand(45, 90));
    }, seconds * 1000);
  }

  private bowl(t: number) {
    const ctx = this.ctx;
    const base = rand(205, 222);
    const partials = [
      { r: 1, g: 1, d: 13, beat: 0.7 },
      { r: 2.76, g: 0.5, d: 9, beat: 1.6 },
      { r: 5.4, g: 0.2, d: 5.5, beat: 2.4 },
      { r: 8.93, g: 0.07, d: 3, beat: 3.1 },
    ];
    for (const p of partials) {
      for (const detune of [-p.beat / 2, p.beat / 2]) {
        const osc = ctx.createOscillator();
        osc.frequency.value = base * p.r + detune;
        const env = ctx.createGain();
        env.gain.setValueAtTime(0.0001, t);
        env.gain.exponentialRampToValueAtTime(p.g * 0.5, t + 0.012);
        env.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
        osc.connect(env).connect(this.bowlBus);
        osc.start(t);
        osc.stop(t + p.d + 0.1);
      }
    }
    // Soft mallet: a short, dark thump of noise.
    const n = ctx.createBufferSource();
    n.buffer = this.noise('pink', 0.2);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 650;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.35, t + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    n.connect(lp).connect(env).connect(this.bowlBus);
    n.start(t);
    n.stop(t + 0.15);
  }
}
