# Chishti Preparation Academy
1. Folder GitHub repo mein upload karein, Vercel par Deploy karein (koi setting nahi).
2. Admin panel: default user `admin`, password `admin123`. Pehli baar login karke foran badal dein.
3. Admin panel se links/announcements/reviews/courses badlein, phir "Download portal-config.json" dabayein
   aur wo file apni data repo (bubblevuofficial-ops/data) ke root mein upload kar dein. Sab visitors ko update dikhega.

## Analytics + admin dashboard
1. Keys are in `window.SUPA` at the top of index.html. Admin tab now asks for Supabase login first, then shows the config editor and the analytics dashboard.
2. Open the site, then check a new row in Supabase > Table Editor > events. Log into Admin to see the dashboard.

## VU updates ticker
Copy everything inside `github-data-repo/` into the ROOT of your data repo (bubblevuofficial-ops/data). GitHub Actions then checks vu.edu.pk every hour and writes updates.json; the site shows the newest items in a bar at the top. Run it once manually from the Actions tab.

## New sections
Run `sql/registrations.sql` once in Supabase (SQL Editor). Registrations then appear in Table Editor > registrations and are also sent to WhatsApp.
Admin panel now has editors for Bookshop books, Past papers, Exam calendar and Campuses. Press "Download portal-config.json" and upload it to the data repo to publish.
