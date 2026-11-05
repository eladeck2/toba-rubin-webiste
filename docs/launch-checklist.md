# Launch checklist (target: November 12, 2026)

## Elad (technical)

1. **Hosting.** Push this repo to GitHub and connect it to the Netlify site (build `npm run build`, publish `dist`). The build environment used so far could not reach GitHub or Netlify.
2. **Forms.** In Netlify > Forms, turn on email notifications for `contact` and `join-the-table` and send them to btovarubin@gmail.com.
3. **Tova's editor (/admin).** In Netlify: Site configuration > Identity > Enable. Set registration to *Invite only*, then Services > Git Gateway > Enable. Invite btovarubin@gmail.com. She clicks the email link, sets a password, and lands in the editor. (If Netlify Identity isn't available on the account, switch the backend in `public/admin/config.yml` to DecapBridge, which also offers email sign-in.)
4. **Domain.** With Tova's registrar login, point tovarubin.com to Netlify; add drtovarubin.com in Netlify as a domain alias or forward it from Wix. Then set `site` in `astro.config.mjs` and `site.url` in `src/config/site.ts` to https://tovarubin.com.
5. **Redirects.** Add `public/_redirects` mapping the old WordPress and Wix page addresses to the new pages (301).
6. **Mailing list.** Optional for launch: sign-ups collect in Netlify Forms. Later, create a MailerLite account and switch `signup.provider`.

## Tova (see Round 4 in her questions doc)

Photos of herself, original photo files, logo, testimonials, talk topics, consent for the class photo, the fee wording, the headline, a read-through of the copy, the garden sound, the monthly letter, and her registrar and Wix logins.
