/**
 * Site-wide settings. Every "Provisional decision" from docs/design.md that
 * affects the build lives here, so Tova's Round 2 answers are one-line swaps.
 */

export const site = {
  name: 'Tova Rubin',
  shortName: 'Tova',
  url: 'https://tova-rubin-review.netlify.app',
  description:
    'Dr. Tova Rubin, PhD: twenty years as a clinical psychologist, now a plant-based chef. Whole-person wellbeing that starts at the kitchen table.',
  locale: 'en',
};

/** Provisional: Tova picks from the candidates in the design doc. */
export const home = {
  headline: 'Come to the table. Leave more whole.',
  headlineCandidates: [
    'Come to the table. Leave more whole.',
    'A better life, starting in the kitchen.',
    'Twenty years of listening. Now I cook, too.',
  ],
  intro: 'Small, nourishing changes for your whole life, from what’s on your plate to how you sleep.',
  proof: [
    'Dr. Tova Rubin, PhD (Vanderbilt, with distinction)',
    '20 years as a clinical psychologist',
    'Certified plant-based chef',
    'Author of <em>Wisdom from the Couch</em>',
  ],
  /** Set to an image in /public (e.g. '/images/tova-at-the-table.jpg') once Tova sends photos. */
  portrait: null as null | { src: string; alt: string; width: number; height: number },
  /** Provisional: 'day' (A day in a life). Alternatives in the doc: 'figure', 'tree'. Only 'day' is built. */
  centerpiece: 'day' as const,
};

/**
 * Navigation. An item only renders once its page is finished (`ready: true`),
 * so the public site never links to something that isn't there yet.
 * Order follows the provisional offerings order.
 */
export const nav: { label: string; href: string; ready: boolean }[] = [
  { label: 'The 360', href: '/the-360/', ready: false },
  { label: 'Tova’s Table', href: '/tovas-table/', ready: false },
  { label: 'Retreats', href: '/retreats/', ready: false },
  { label: 'Journal', href: '/journal/', ready: false },
  { label: 'About', href: '/about/', ready: false },
];

export const footerLinks: { label: string; href: string; ready: boolean }[] = [
  { label: 'Talks and workshops', href: '/talks/', ready: false },
  { label: 'Contact', href: '/contact/', ready: false },
  { label: 'Privacy', href: '/privacy/', ready: false },
];

/** Provisional: MailerLite (double opt-in) is the destination; Netlify Forms catches sign-ups until it's connected. */
export const signup = {
  provider: 'netlify' as 'netlify' | 'mailerlite',
  formName: 'join-the-table',
  giftName: 'A Seat at the Table',
  privacyLine: 'One letter a month. Unsubscribe anytime. Your address stays with me.',
};

/** Provisional legal line from "What not to claim". */
export const disclaimer =
  'Tova is a psychologist by training and does not offer psychotherapy or medical advice through this site.';

export const features = {
  /** Play the garden: synthesized Web Audio until CC0/licensed recordings are chosen. */
  gardenSound: true,
  /** Let's talk floating panel (Phase 2). */
  letsTalk: false,
};
