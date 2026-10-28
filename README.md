# tovarubin.com

Tova Rubin's website. Astro + TypeScript, static output on Netlify. The source of truth is [`docs/design.md`](docs/design.md).

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/
npm run screenshots  # build first; writes docs/screenshots/phase-1
```

Node 22.12+ is required. Astro is pinned to 7.3 because 7.4 needs Node 22.23+.

## Where things live

| What | Where |
| --- | --- |
| Provisional decisions (headline, proof line, nav readiness, sign-up provider, disclaimer, feature flags) | `src/config/site.ts` |
| Sky palettes for the day story (light and dark) | `src/config/sky.ts` |
| The moments of *A day in a life* (wisdom, try-today, scene, sky, sound mix) | `src/content/moments/*.md` |
| Line-art scenes | `src/components/scenes/*.astro` |
| Day story stage and layers | `src/components/day/` |
| Scroll engine | `src/scripts/day-engine.ts` |
| Garden sound (Web Audio synthesis) | `src/scripts/garden-audio.ts`, `src/components/GardenSound.astro` |
| Tokens, type, motion, art styles | `src/styles/global.css` |

## Rules this build follows

- **Hide what isn't finished.** A nav or footer link renders only when its entry in `src/config/site.ts` is `ready: true`.
- **Wisdom lines are verbatim and pending approval.** Every moment has `approved: false` and a `PENDING TOVA'S APPROVAL` comment. Two research lines (walks, gratitude) still need a specific citation.
- **One button per screen.** On the home page, the header's "Join the table" steps aside while the sign-up is on screen.
- **Sound never starts on its own.** The AudioContext is created inside the button's click handler. The audio module is fetched on first tap.
