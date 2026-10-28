import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The moments of A day in a life. One Markdown file per moment, ordered by
 * `order`. Editable in Decap CMS (Phase 2).
 *
 * `approved` tracks Tova's sign-off on the wisdom line. Every line ships as
 * `approved: false` (PENDING TOVA'S APPROVAL) and is shown exactly as written
 * in the design doc until she approves or rewrites it.
 */
const moments = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/moments' }),
  schema: z.object({
    order: z.number(),
    kind: z.enum(['opening', 'moment', 'closing']).default('moment'),
    /** Scene name from the doc, e.g. "Morning kitchen" */
    title: z.string(),
    /** 360 area, e.g. "Food". Opening/closing use "Welcome"/"Invitation". */
    area: z.string(),
    /** Which drawn scene to show (src/components/scenes). */
    scene: z.enum(['window', 'kitchen', 'walk', 'desk', 'tea', 'table', 'night', 'chair']),
    sky: z.enum(['dawn', 'morning', 'day', 'golden', 'dusk', 'night']),
    /** The wisdom line, verbatim. */
    wisdom: z.string(),
    /** When the line is a direct quote (rendered with quotation marks). */
    quote: z.boolean().default(false),
    /** Who said it, when the line itself doesn't name them. */
    attribution: z.string().optional(),
    /** Where it comes from. Shown small under the line. Needs Tova's check. */
    source: z.string().optional(),
    tryToday: z.string(),
    /** Garden sound mix for this moment (0..1 per loop). */
    sound: z.object({
      birds: z.number().min(0).max(1).default(0),
      simmer: z.number().min(0).max(1).default(0),
      crickets: z.number().min(0).max(1).default(0),
    }),
    approved: z.boolean().default(false),
  }),
});

export const collections = { moments };
