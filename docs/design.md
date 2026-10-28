# Tova's website: design doc v2

Oct 28, 2026 · Elad

> **v2.1 changes (Oct 28, 2026, Elad):** the home page becomes a real home page, not a landing page; Tova's questionnaire answers win where they differ from this doc. Changes are marked *v2.1* below and logged in `docs/decisions.md`.

> Retrieved via the Google Drive connector on 2026-10-28 (the direct `export?format=md` URL is blocked by this build environment's network policy). Google's `\#` escapes have been normalised to plain `#`.

## Overview and goals

tovarubin.com becomes the home of Tova's second career: a whole-person (360) wellbeing practice that starts at the kitchen table, backed by her PhD and 20 years as a clinical psychologist. It replaces both old therapy-era sites.

The site has four jobs, in priority order:

1. Grow Tova's mailing list. This is the main action on every page.
2. Hear what visitors want, so Tova shapes the 360 Assessment and future offers around real demand.
3. Fill Tova's Table classes and the 24-hour Restoration retreat in Maryland at the end of February.
4. Later, take bookings for the 360 Assessment and its free 20-minute Zoom chat, once Tova has it ready.

Success in the first three months means steady mailing list sign-ups, a stream of visitor answers and interest votes, and a full February retreat. Working targets are in Provisional decisions.

## Positioning and key message

The brand is simply "Tova": a warm personal brand whose credentials are the proof, not the product. Tova no longer offers psychotherapy, so the site never sells therapy; it uses the doctorate and 20 years of practice to answer "why should I trust her with my life and my plate?"

**What a visitor should leave thinking** (Tova's words): she is very well qualified to help me figure out what to eat and how to improve my life in lots of areas.

**The 360 view.** Six areas, in Tova's order, run through the whole site: Food, Movement, Mental wellness, Sleep, Purpose, Relationships. Food leads because it is her way in.

**The promise** (from her dream line): more balance, more joy, more capacity to handle stress, more energy, a more whole life.

**The organizing idea: the table.** Asked what the site would be with no rules, Tova said cooking together, a festive meal and deep conversation. The table becomes the site's metaphor: the 360 view is drawn as a plate with six portions, the mailing list is "a seat at the table", and every page feels like an invitation in.

**Proof line** shown near the top of the home page and on About: Dr. Tova Rubin, PhD (Vanderbilt, with distinction) · 20 years as a clinical psychologist · Certified plant-based chef · Author of *Wisdom from the Couch*.

**Headline candidates** for Tova to choose from:

- Come to the table. Leave more whole.
- A better life, starting in the kitchen.
- Twenty years of listening. Now I cook, too.

## Audience

The site is in English for English speakers anywhere, who mostly join online. A second, local group joins in person for Tova's Table and the Maryland retreat, so each in-person offer states its location clearly.

The people below are working assumptions, drawn from Tova's past work, for her to confirm or correct:

| Who | What they're carrying | What brings them in |
| :-: | :-: | :-: |
| Adults in midlife feeling stretched | Stress, low energy, poor sleep, too little time for themselves | The 360 view, the retreat |
| People curious about plant-based eating | Want to eat better but don't know where to start | Recipes, Tova's Table, the free gift |
| Caregivers | Looking after others, neglecting themselves | Reflections, Ask Tova, the retreat |
| Groups and organizations | Want a speaker on wellbeing, mindfulness or caregiving | Talks and workshops |

## Look and feel

The direction is "Garden kitchen", Tova's pick: warm, light and full of real life, like being invited into her home. Her two signature colors from the old logo, deep orange-red and turquoise, carry the brand.

| Element | Decision |
| :-: | :-: |
| Base | Warm cream background, deep charcoal text |
| Brand colors | Deep orange-red for buttons and key words; turquoise for links, highlights and the 360 plate. Exact shades sampled from the logo file |
| Accent | Fresh leaf green, used sparingly on illustrations only |
| Dark mode | Deep warm brown background, same orange-red and turquoise lightened for contrast |
| Headings | A warm, characterful serif (candidate: Fraunces) |
| Body text | A soft, readable sans-serif (candidate: Nunito Sans) |
| Photos | Tova's own: her at the table, hands cooking, food, people sharing a meal, India. No stock photos |
| Illustration | Hand-drawn line art: leaves, spices, bowls, a table. Used for the 360 plate and section dividers |
| Motion | Small and natural: steam rising from a bowl in the hero, leaves swaying gently, soft fade-ins on scroll. Everything stops when the visitor's device asks for reduced motion |
| Sound | Off until the visitor taps. Soft garden sounds and a singing bowl are available on request (see The signature experience) |

Every color pair is checked for readable contrast, especially orange-red on cream, before it is used for text.

## Design principles

The first build felt crowded: about ten sections and nine competing calls to action on the home page, three forms, and draft labels everywhere. These five rules keep the site calm and welcoming.

1. **One page, one job.** Each page has a single main action. On the home page it is "Join the table". *v2.1:* one main action does not mean one topic. The home page must still say plainly who Tova is, what she offers and how to take part, so nobody lands confused.
2. **Calm by default.** Generous space, short sentences, at most one button per screen.
3. **Finished, not in progress.** No draft labels on the public site. A feature that isn't ready stays hidden until it is.
4. **Trust, quietly.** One short privacy line under each form; the full details live on the Privacy page.
5. **Wisdom with sources.** Every quote is attributed, every research finding is real, and Tova approves each line.

## The home page: a day in a life

The home page tells one story in one scroll: a single day, from first light to a starry night. The six areas of the 360 appear as six moments of that day, and the light, colors and sounds shift as the day moves on. Each moment holds one piece of wisdom and one small thing to try today. The day ends at night with the only button on the page: there's a seat for you at the table.

*Chosen by Claude, not Tova.* It was picked over a turnable 3D figure and a growing tree because it carries her table theme, puts food first, scrolls naturally on a phone, and avoids a figure that can look like a toy. Tova can switch it or drop it (see Provisional decisions).

| Moment | Scene | Area | Example wisdom (Tova approves the final text) | Try today |
| :-: | :-: | :-: | :-: | :-: |
| Opening | Dawn over a garden, a window opening | Welcome | Tova: "Twenty years of listening. Now I cook, too." | Scroll on |
| Morning kitchen | Steam rising from a pot, light on the counter | Food | Thich Nhat Hanh taught eating slowly enough to taste every bite | Eat one meal today without a screen |
| A walk outside | A path through trees, leaves moving | Movement | Research links even short daily walks to better mood | Take a 10-minute walk after lunch |
| Midday work | A desk by a window, a notebook | Purpose | Viktor Frankl wrote that meaning can be found in what we give to the world | Name one thing you did today that mattered to someone |
| Afternoon pause | A cup of tea, a cushion, slowing light | Mental wellness | The Buddhist teaching of the second arrow: pain comes, but the worry we add is optional | Take three slow breaths before your next task |
| Evening table | Friends around Tova's table, candles | Relationships | The Harvard Study of Adult Development found close relationships are among the strongest predictors of a long, happy life | Invite someone to share a meal this week |
| Night | Stars, a dark garden, a soft moon | Sleep | Research links writing down a few things you're grateful for with better sleep | Write down three good things before bed |
| Closing | An empty chair at the table under the stars | Invitation | "There's a seat for you." | Join the table (email only) |

On the way down, a small greeting follows the visitor's real clock ("Good morning" or "Good evening"), and the Play the garden sound changes with the scene: birds at dawn, a simmering pot in the kitchen, crickets at night.

## The signature experience

**Tova in one line:** a psychologist who listened for 20 years and now nourishes people, body and soul, at her table. The site should feel like walking into her kitchen on a good morning: warm light, something simmering, and someone glad you came.

These features set the site apart from other wellness sites. All are proposals, and Tova can remove any of them.

| Feature | What the visitor experiences |
| :-: | :-: |
| Play the garden | A small round button in the corner. One tap plays soft morning birdsong and a pot simmering, with a gentle singing bowl ring every minute or so. The icon is a little bowl that ripples while sound plays; tap again to stop. Always off until tapped |
| Ring the bowl | A drawn singing bowl on The 360 page and at the end of the self-check. Tap it and it rings once while circles ripple outward: a short pause in the middle of the page |
| A day in a life | The home page story, from dawn to night, described in its own section above |
| The 360 plate | On The 360 page, the six areas drawn as portions of one plate. Tap a portion: it lifts, steam rises, and a short reflection with the matching offering appears |
| Morning or evening light | The greeting follows the visitor's clock: "Good morning" in bright daylight tones, "Good evening" in warm candlelight tones |
| Pull a card | A button that draws one short lesson from *Wisdom from the Couch*, like drawing from a deck. A new card on every tap, easy to share |
| Let's talk | A friendly floating button on every page. It opens a small panel: book the free 20-minute Zoom chat, send a message, or text Tova if she agrees |
| Tova's voice | A 30-second voice note on the home page: "Hi, I'm Tova..." Hearing her warmth builds trust faster than reading |
| Recipe cards | Each recipe has a "Save the card" button that downloads a printable card with Tova's note on why it's good for you |
| Handwritten touches | A few phrases in Tova's own scanned handwriting, such as her signature under the About story and notes on recipe cards |

## Mobile and desktop

The site is designed for phones first, because most visitors will arrive from Instagram, WhatsApp or email; desktop gets more room, not a different site.

- On phones: one column, large tap targets, the menu in a sheet that slides up, and "Let's talk" and "Play the garden" as small round buttons in the bottom corners.
- The 360 plate works by tap on phones and by hover or click on desktop.
- The day-story animation is lighter on small screens so scrolling stays smooth.
- Animations are slow and soft, measured in seconds. They switch off when the visitor's device asks for reduced motion, and sound never plays without a tap.
- Every page is checked on a small phone, a tablet and a wide desktop before launch.

## Site structure

The menu holds five items plus one always-visible button: The 360 · Tova's Table · Retreats · Journal · About, and "Join the table" (the mailing list). Talks, Contact and the book sit in the footer and on About. The order of offerings is provisional until Tova ranks them.

| Page | Purpose | What's on it |
| :-: | :-: | :-: |
| Home | Say who Tova is and what she offers, and get the sign-up | *v2.1:* 1) Welcome: photo, headline, one plain sentence ("I'm Tova Rubin, a psychologist and plant-based chef..."), proof line, links to About and the offerings. 2) Ways to join me: Tova's Table, the Restoration retreat, talks and workshops, the book, each with a photo or drawing, one line, and a link to its page. 3) Meet Tova: a short bio, photo, credentials, link to About. 4) The 360 view: the six areas in Tova's order, one line each. 5) A day in a life, walking through the six areas. 6) The one sign-up. Still one form and one button per screen |
| The 360 | Explain the six areas and build interest in the Assessment | One short section per area; "Coming soon: be the first to hear" sign-up; request a free 20-minute Zoom chat |
| Tova's Table | Fill cooking classes | How a class works, where it happens, photos, class testimonials, next dates or an interest sign-up |
| Retreats | Fill the February Restoration | 24-hour Restoration in Maryland, end of February, with a link to its own site; interest sign-up for future retreats |
| Journal | Bring visitors back and feed the newsletter | Recipes, poems and reflections from Tova; Ask Tova answers |
| About | Earn trust | Her story from psychologist to chef; the 360 view; training and experience (PhD Vanderbilt with distinction; residency and postdoc in San Antonio; 20 years in private practice in the Washington, DC area; adjunct faculty at George Washington University; hospice volunteer; certified plant-based chef); the book; what she does and doesn't offer; speaking testimonials. *v2.1:* built first, so the menu has somewhere real to go |
| Talks and workshops | Book speaking engagements | Updated talk topics from the old site, speaker testimonials, an invite form |
| Contact | Catch everything else | Short form, email address, a note not to send private health details |

The old therapy pages, fees and the clientsecure booking link are retired. Any old address redirects to the closest new page.

## Calls to action and listening

The one action every page pushes is "Join the table": an email sign-up that sends a free gift right away. Tova wants to hear from people a lot, so the site also includes all three listening ideas from the questionnaire.

**Actions, by priority:**

1. Join the table (mailing list + free gift). The launch gift is "A Seat at the Table": three favorite recipes, each with a short reflection from Tova, as a printable PDF. The 360 self-check below replaces it in v2.
2. Hear first about the 360 Assessment (an interest sign-up until it launches).
3. Request a free 20-minute Zoom chat.
4. Sign up for a Tova's Table class or the retreat.

**Listening features:**

| Feature | How it works | Where |
| :-: | :-: | :-: |
| "What would help you?" | One open question: "What would help you live a little better right now?" Visitors answer in their own words, email optional | Journal (v1.1) |
| "I'm interested" votes | Cards for ideas Tova is considering (an online cooking series, a meditation circle, the next retreat). One tap plus an email; Tova only commits once enough people raise a hand | The 360, Retreats, Tova's Table |
| Ask Tova | Visitors send a question or a story, with an option to stay anonymous. Tova answers chosen ones in the newsletter and Journal | Journal, footer |

**Proposal: the 360 self-check.** A two-minute interactive: the visitor rates each of the six areas from 1 to 5 and sees their own plate fill in, with a gentle suggestion for the area that needs care. It doubles as the free gift and as a preview of the paid Assessment. It must be framed as a reflection, not a test or a diagnosis. Needs Tova's approval.

All answers, votes and questions land in one place Tova can read: an email to her plus a simple list she can browse. No form asks for health details, and each one says so.

## Content plan

Elad drafts all launch copy from Tova's answers and her old sites; Tova reviews and approves every page before launch. After launch, Tova adds recipes, poems and reflections herself if she wants to, which decides the editing setup in the Technical approach.

| Content | Status | Source |
| :-: | :-: | :-: |
| Speaking testimonials (4) | Have | Old tovarubin.com, approved for reuse |
| Talk topics | Have, to update | Old tovarubin.com |
| Bio and credentials | Have, to rewrite | Old sites and the 2018 CV |
| Book link | Have | Amazon listing on the old site |
| Photos | Have, not yet sent | Tova's collection |
| Logo file | Have, not yet sent | Tova |
| Tova's Table testimonials | To collect | Tova's class participants |
| Recipes and poems | To write | Tova |
| Free gift | To create | Tova, once chosen |
| 360 Assessment description | To write | Tova, once defined |

A monthly newsletter is a realistic starting pace; Tova confirms what she can keep up.

## Technical approach

The recommendation is a fast static site on Netlify, where the draft already lives, with a simple browser editor so Tova can post to the Journal without touching code. Running costs stay near zero on free tiers.

| Need | Proposed choice | Why |
| :-: | :-: | :-: |
| Site framework | Astro | Fast pages, easy to build the interactive pieces as islands |
| Hosting | Netlify | Draft is already there; free tier fits this traffic |
| Tova's editor | Decap CMS (or Sanity if she wants a nicer editor) | Tova writes recipes and poems in a web form; no code |
| Forms | Netlify Forms | Listening features and contact, emailed to Tova; free up to 100 submissions a month |
| Mailing list | MailerLite or Kit, unless Tova already uses a tool | Free tier, sends the gift automatically, sign-up form embeds in the site |
| Zoom chat booking | Calendly free tier | Tova sets her hours; links to Zoom |
| Analytics | Plausible or Netlify Analytics | Simple numbers without cookie banners |

**Domains.** tovarubin.com points to the new site; drtovarubin.com (currently on Wix) redirects to it permanently. tovarubin.com currently runs WordPress built by marstudio, so the switch needs access to the domain's registrar account. Old page addresses redirect so existing links and search results keep working.

**Quality bar.** Readable color contrast, alt text on every photo, reduced motion respected, fast on a phone, and proper titles and share images on every page.

## Milestones

The proposed target is v1 live by mid-December, so January and February can go to promoting the Maryland retreat. Each phase ships only after Tova approves it.

1. **v1: launch.** Home with A day in a life and the one sign-up; Play the garden and Let's talk; The 360 with the plate, the Assessment interest sign-up and the free Zoom chat; Tova's Table; Retreats; Journal with three finished starter posts and Tova's editor; About with Pull a card; Contact; Privacy. Domain switch.
2. **v1.1: more listening.** "What would help you?", Ask Tova, "I'm interested" votes, the Talks and workshops page, recipe cards, and the voice hello and handwriting once Tova records and scans them.
3. **v2: the 360 Assessment.** The interactive 360 self-check, Assessment booking and payment, and online classes if the votes show demand.

## Provisional decisions

These working answers let the build start now. Each one stands until Tova answers Round 2; her answer replaces the row.

| Topic | Working answer for the build |
| :-: | :-: |
| Offerings order | 360 Assessment, Tova's Table, Retreats, Journal, Talks and workshops, the book. The menu follows this order |
| 360 Assessment | Online: a short questionnaire across the six areas, a 60-minute Zoom session, and a written plan for the next month. No price shown. Launches as "coming soon" with an interest sign-up; the free 20-minute Zoom chat is bookable from day one |
| February retreat | "Restoration", a 24-hour retreat in Maryland, late February. The Retreats page shows a short summary and links to its own website (placeholder link until it is live), with an interest sign-up for future retreats |
| Tova's Table | In-person small-group classes; the page states the location. Visitors request a place with preferred dates and Tova confirms by email. An "online classes" interest vote tests demand |
| Mailing list | MailerLite free plan, double opt-in; the welcome email delivers the gift |
| Free gift | "A Seat at the Table" recipe PDF, with placeholder recipes until Tova sends hers |
| Journal | Tova posts herself through the browser editor; Elad seeds three starter posts from her material |
| Three words | Welcomed, nourished, whole |
| Headline | "Come to the table. Leave more whole." |
| What not to claim | No therapy, diagnosis, or medical, dietetic or exercise treatment; no promised outcomes. Footer note: Tova is a psychologist by training and does not offer psychotherapy or medical advice through this site |
| Signature features | All included. The voice hello and handwriting use placeholders until recorded and scanned |
| Let's talk | Zoom chat booking (Calendly) and a message form. No phone or WhatsApp at launch |
| 360 self-check | Approved in principle, built in v2 |
| First 3 months | Placeholder targets: 150 mailing list sign-ups and a full February retreat |
| Photos and colors | Placeholder images at final sizes. Working colors: orange-red #C8452B, turquoise #1A9A9A, cream #FBF5EC, charcoal #2B2622, until sampled from the logo |
| Language | English only |
| Domains | Build on the Netlify address; switch tovarubin.com and redirect drtovarubin.com once Elad has registrar access |
| Home centerpiece (Claude's pick, not Tova's) | A day in a life. Alternatives Tova can switch to: a turnable 3D seated figure with six glowing points, or a drawn tree whose six branches open as you explore |
| Wisdom lines (Claude's drafts) | The examples in A day in a life stay as drafts until Tova approves or rewrites each one |
| Listening forms at launch | *v2.1:* all three ship at launch (Tova: "all of these sound amazing"), each on its own page, so the home page still has one form |
| Photos | *v2.1:* Tova's own photos wherever we have them (from her Instagram for now; originals needed). Home uses a food photo until she sends a portrait |

## Notes for the builder

Tova can skip this section. It gives the coding agent concrete direction.

### Foundations

- **Stack:** Astro with TypeScript on Netlify. Interactive pieces (A day in a life, the 360 plate, Pull a card, the sound button, the Let's talk panel) are small client-side islands; everything else ships as static HTML.
- **Page transitions:** Astro's view transitions with a 300 ms crossfade, so moving between pages feels like turning a page, not reloading.
- **Content:** Journal entries, recipes, testimonials, offerings and the six moments live as Markdown content collections, editable by Tova through Decap CMS.

### Design tokens

All values are CSS custom properties on :root, redefined for dark mode under prefers-color-scheme: dark.

| Token | Light | Dark | Use |
| :-: | :-: | :-: | :-: |
| --bg | #FBF5EC | #1E1814 | Page background (cream / warm night) |
| --surface | #FFFDF8 | #2A221D | Cards, panels |
| --ink | #2B2622 | #F3EADF | Body text |
| --ink-soft | #6B5F55 | #BFB2A4 | Secondary text |
| --terracotta | #C8452B | #E5684D | Button fills (white text passes contrast) |
| --terracotta-text | #A9361F | #F08A6F | Terracotta text at body size (#C8452B on cream falls just short of AA) |
| --teal | #1A9A9A | #4FC2BE | Illustration, highlights |
| --teal-text | #137373 | #7FD6D1 | Links |
| --leaf | #7A9A5B | #9DBE7C | Illustration accent only |

- **Sky for A day in a life:** dawn #F6D8C4, day #FBF5EC, golden hour #F3C99B, dusk #C97B63 fading to #3E3550, night #1B2033. Stored as --sky-top and --sky-bottom, interpolated by scroll progress.
- **Type:** Fraunces variable for headings (optical size on, SOFT around 50 for rounder letters), Nunito Sans for body. Fluid sizes with clamp(): body clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), page title clamp(2.5rem, 1.6rem + 4vw, 4.75rem). Body line height 1.6, display 1.05, line length at most 62 characters.
- **Space and shape:** 4 px base unit; section padding clamp(4rem, 8vw, 9rem); cards 20 px radius; buttons fully rounded.
- **Depth:** soft warm shadows only, for example 0 1px 2px rgb(60 40 20 / .06), 0 12px 32px rgb(60 40 20 / .08).
- **Texture:** a faint paper-grain SVG noise over the background at about 4% opacity, so the cream feels like paper, not a screen.

### Motion system

| Kind | Duration | Easing |
| :-: | :-: | :-: |
| Hover and press | 200 ms | ease-out |
| Elements entering | 600 to 800 ms | cubic-bezier(.22, 1, .36, 1) |
| Elements leaving | 300 ms | cubic-bezier(.4, 0, 1, 1) |
| Ambient (steam, leaves, stars) | 3 to 8 s loops | ease-in-out |
| Story scenes | tied to scroll position | linear on progress |

- Animate only transform, opacity and color variables. Text never moves while someone is reading it.
- Parallax stays subtle: at most 40 px of drift on phones, 80 px on desktop.
- With prefers-reduced-motion, every scene becomes a still illustration and changes by a simple crossfade.

### Building A day in a life

- **Structure:** a sticky full-screen stage (position: sticky; height: 100svh) inside a tall scroll track, about one screen height per moment. One progress value from 0 to 1 drives every layer.
- **Scroll engine:** CSS scroll-driven animations (animation-timeline: view()) where the browser supports them, GSAP ScrollTrigger as the fallback. Never hijack scrolling: no scroll-jacking libraries and no snapping that traps the visitor.
- **Layers, back to front:** sky gradient; sun and moon travelling on an arc (offset-path); hills; the garden; the scene's main objects (pot, path, desk, tea, table, chair); foreground leaves. Phones get two to three layers, desktop five.
- **Illustration style:** hand-drawn single-weight line art as inline SVG, 1.5 px strokes in terracotta, teal and leaf on cream. Steam drawn by animating stroke-dashoffset; stars twinkle by fading three random groups at different speeds.
- **The words:** one card per moment, entering as its scene arrives: the area name small, the wisdom line in Fraunces italic, "Try today" below with a small circle the visitor can tap to tick. Six dots on the side show progress and jump between moments.
- **Accessible by design:** every moment is real HTML in order (a heading, the wisdom, the tip), fully readable with no JavaScript. Decorative layers are aria-hidden; the dots are keyboard-focusable buttons with aria-current.

### Sound

- Web Audio API. The AudioContext starts only on the visitor's tap.
- Three loops follow the story: dawn birds, a kitchen simmer, night crickets, crossfading over 1.5 s as the scroll moves.
- The singing bowl rings every 45 to 90 seconds, and on demand when the visitor taps the drawn bowl: three circles ripple outward (scale 1 to 2.4, fading out over 1.8 s).
- Master volume around 0.35; sound pauses when the tab is hidden; the on/off choice is remembered in localStorage.
- Files in Opus with an AAC fallback, under 300 KB each, all royalty-free (CC0 or licensed).

### Components

- **Buttons:** pills 48 px tall, terracotta fill with white text. Hover lifts 1 px with a soft shadow; keyboard focus shows a 3 px teal ring with a 2 px gap.
- **Floating buttons:** Play the garden bottom left, Let's talk bottom right, 52 px round, clear of the phone's safe areas, hidden while a form field is focused on phones.
- **Forms:** start with one field (email). More fields appear only when needed. Validation happens gently when the visitor leaves a field, and success is a warm illustrated thank-you, not a pop-up.
- **Photos:** one consistent warm color grade; fixed aspect ratios so nothing jumps while loading; a slow 2% zoom on hover on desktop only.
- **Copy:** second person, sentences under 20 words, no exclamation marks except in greetings.

### Forms, data and domains

- Netlify Forms with honeypot spam protection; each submission emailed to Tova.
- MailerLite with double opt-in; its welcome email delivers the gift.
- A Netlify _redirects file maps old tovarubin.com and drtovarubin.com paths to new pages with permanent (301) redirects.

### Quality gates before launch

- **Speed:** home page JavaScript at most 120 KB compressed; on a mid-range Android phone over 4G, main content visible within 2.5 s, no layout jumps (CLS under 0.1), taps answered within 200 ms. Lighthouse mobile score of 90 or more.
- **Accessibility:** WCAG 2.2 AA, a complete keyboard path through the day story, and a VoiceOver pass on iPhone.
- **Visual checks:** Playwright screenshots at 375, 768 and 1440 px wide, in light and dark mode, with reduced motion on and off.
- **Browsers:** the latest two versions of Safari on iPhone, Chrome on Android, and Chrome, Safari, Firefox and Edge on desktop.
