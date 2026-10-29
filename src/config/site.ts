/**
 * Site-wide settings. Every "Provisional decision" from docs/design.md that
 * affects the build lives here, so Tova's Round 2 answers are one-line swaps.
 */

import type { ImageMetadata } from 'astro';
import acaiBowl from '../assets/photos/acai-bowl-orange.jpg';

export const site = {
  name: 'Tova Rubin',
  shortName: 'Tova',
  url: 'https://tova-rubin-review.netlify.app',
  description:
    'Dr. Tova Rubin, PhD: twenty years as a clinical psychologist, now a plant-based chef. Whole-person wellbeing that starts at the kitchen table.',
  locale: 'en',
};

/**
 * Round 2: the three words visitors should feel are curiosity, trust and hopefulness.
 * Headline is still provisional: Tova picks from the candidates in the design doc.
 */
export const home = {
  headline: 'Come to the table. Leave more whole.',
  headlineCandidates: [
    'Come to the table. Leave more whole.',
    'A better life, starting in the kitchen.',
    'Twenty years of listening. Now I cook, too.',
  ],
  /** Says plainly who Tova is and what the site is for. */
  intro: 'I’m Tova Rubin, a psychologist and plant-based chef. I help you eat well and live more fully, from your plate to your sleep.',
  proof: [
    'Dr. Tova Rubin, PhD (Vanderbilt, with distinction)',
    '20 years as a clinical psychologist',
    'Certified plant-based chef',
    'Author of <em>Wisdom from the Couch</em>',
  ],
  /**
   * Hero photo. Provisional: one of Tova's own food photos until she sends a
   * portrait of herself at the table (the doc's first choice). Set to null to
   * show the line-art still life instead.
   */
  portrait: {
    src: acaiBowl,
    alt: 'A smoothie bowl topped with strawberries, banana, pumpkin seeds, hemp and granola, on an orange tray',
  } as null | { src: ImageMetadata; alt: string },
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
  { label: 'About', href: '/about/', ready: true },
];

/** True once the page at `href` is finished and may be linked. */
export function isReady(href?: string) {
  if (!href) return false;
  return [...nav, ...footerLinks].some((l) => l.href === href && l.ready);
}

export const footerLinks: { label: string; href: string; ready: boolean }[] = [
  { label: 'Talks and workshops', href: '/talks/', ready: false },
  { label: 'Contact', href: '/contact/', ready: false },
  { label: 'Privacy', href: '/privacy/', ready: false },
];

/** Provisional: MailerLite (double opt-in) is the destination; Netlify Forms catches sign-ups until it's connected. */
export const signup = {
  provider: 'netlify' as 'netlify' | 'mailerlite',
  formName: 'join-the-table',
  /** Round 2: a recipe and a meditation recording (Tova records it; no tool chosen yet, MailerLite recommended). */
  gift: 'a favorite recipe and a short guided meditation I recorded for you',
  privacyLine: 'One letter a month. Unsubscribe anytime. Your address stays with me.',
};

/** Provisional legal line from "What not to claim". */
export const disclaimer =
  'Tova is a psychologist by training and does not offer psychotherapy or medical advice through this site.';

/**
 * Tova asked for all three listening ideas ("all of these sound amazing"), so
 * they ship at launch rather than v1.1 (see docs/decisions.md). Each lives on
 * its own page, so the home page keeps its single sign-up.
 */
export const listening = {
  whatWouldHelp: { enabled: true, page: '/journal/' },
  interestVotes: { enabled: true, pages: ['/the-360/', '/retreats/', '/tovas-table/'] },
  askTova: { enabled: true, page: '/journal/' },
};

export const features = {
  /** Play the garden: synthesized Web Audio until CC0/licensed recordings are chosen. */
  gardenSound: true,
  /** Let's talk floating panel (Phase 2). */
  letsTalk: false,
};
