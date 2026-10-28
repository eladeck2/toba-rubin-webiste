// @ts-check
import { defineConfig } from 'astro/config';

// Static output; Netlify serves /dist. Swap `site` to https://tovarubin.com at the domain switch.
export default defineConfig({
  site: 'https://tova-rubin-review.netlify.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
