# Wedding wishes setup

The invitation's Visitors counter has been replaced with a gold **Leave a Wish** link. The wishes page is public and stores messages in Supabase.

1. Create a Supabase project at https://supabase.com/dashboard.
2. Open SQL Editor and run the contents of `wishes-schema.sql`.
3. Open Project Settings > API (or Connect) and copy the **Project URL** and **publishable/anon key** into `wishes-config.js`. Do **not** use a secret or service_role key.
4. Commit the configuration change to GitHub; Vercel will redeploy the static site.
5. Test sending a wish and viewing it from another browser.

**Privacy:** All names and messages are publicly visible. Do not post sensitive information.
**Abuse:** The public write policy allows spam. Add CAPTCHA, moderation and server-side rate limits before sharing widely. Avoid deploying public submissions at scale without abuse protection.
