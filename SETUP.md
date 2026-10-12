# Setup (3 steps)
1. Upload ALL files of this folder to your VU site GitHub repo (replace old ones). Vercel redeploys.
2. Vercel > your project > Settings > Environment Variables: add `DRIVE_API_KEY` = your Google Drive API key. Then Deployments > Redeploy.
3. Supabase > SQL Editor: paste and run `sql/registrations.sql`.
Check: open `https://YOUR-SITE/api/catalog` - it must show `"keyUsed":true` and a `count`. `skipped` lists sites that blocked bots or failed.
Do not touch the separate data repo (bubblevuofficial-ops/data); nothing here needs it, the VU updates folder `github-data-repo/` is unchanged from v4.

## v7 additions (14 features)
1. In Supabase > SQL Editor run `sql/student.sql` once. This enables student accounts (email, password, magic link, phone) with cross-device sync, and the shared Peer Q&A. Without it the portal still works; Q&A is then saved on the device only.
2. Phone login needs an SMS provider enabled in Supabase > Authentication > Providers. Email login works by default.
3. Date sheet: when VU publishes it, commit rows to `datesheet.json` in your data repo, for example `[{"code":"CS101","date":"2026-12-15","time":"09:00 AM","type":"Final"}]`. Students who selected CS101 get the date in their deadlines automatically. Students can also paste rows on the Date Sheet page.
4. Fee calculator: optionally add `"fee":{"perCredit":0,"other":0,"voucherLast":"YYYY-MM-DD","freezeRules":["..."]}` to portal-config.json to pre-fill current fee values.
5. Roadmap data (BS CS, BS IT, BBA) is in `v7-learn.js`, constant `ROAD`. Edit it to match the official scheme of study.
Voice and offline notes were intentionally not included.

## v8 check (2 minutes)
1. Upload everything, let Vercel redeploy, hard-refresh the site once.
2. Open `/api/catalog` in the browser: `keyUsed` must be true and `count` > 0. `skipped` lists any Drive error.
3. Admin > LMS Handling to add people. Already ran `sql/registrations.sql`? Nothing more to run.
