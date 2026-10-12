# Chishti Preparation Academy
1. Folder GitHub repo mein upload karein, Vercel par Deploy karein (koi setting nahi).
2. Admin panel ab sirf Supabase login se khulta hai (koi default password nahi). Supabase > Authentication > Users mein apna admin user banayein.
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

## Version 3 (new files)
- `data3.js` : all 210 VU campuses (from the official Virtual Campuses page), all Important Links (with real URLs), programs from the Student Handbook.
- `portal-ui.js` : new theme, grouped navigation, new Home, official-only LMS tab, Important Links, Contact, Campuses, Programs.
- `portal-tools.js` : Registration, Bookshop (cart), Study Tools (GPA/CGPA, marks and grade calculator, grading scheme, calendar, timer), Ticket Help, FAQ, Past Papers, plus extras for Test Center, Planner, Coding Lab and AI chips.
- Admin panel is the gold "Admin Panel" button at the top. Change the default admin password on first login.

## Version 4 (this zip)
**VU updates (auto)** - `github-data-repo/` ko data repo ke ROOT mein copy karein (purani `scripts/vu-watch.mjs` aur `.github/workflows/vu-updates.yml` replace karein). GitHub Actions ab har 15 minute VU ke official pages check karta hai (vu.edu.pk, datesheet.vu.edu.pk, admissions, announcements...) aur `updates.json` mein naye notices, date sheets, results, fee/admission khabrein likhta hai. Purani items sticky rehti hain: jab tak nayi update na aaye, site ke top bar (marquee), Home aur "VU Updates" tab mein dikhti rehti hain. Site khud har 3 minute mein feed dobara uthati hai. Actions tab > "VU updates" > "Run workflow" se pehli baar manually chalayein. Agar kisi VU page ka link badal jaye to `SOURCES` list `scripts/vu-watch.mjs` ke top par edit karein.
Note: GitHub 60 din bina activity ke scheduled workflows band kar deta hai; script har 6 ghante heartbeat commit karti hai, isliye ye band nahi hoga.

**Supabase** - `sql/registrations.sql` dobara run karein (status column + admin update policy add hui hai).

**Naye features** (`portal-pro.js`): PWA install + offline (`manifest.webmanifest`, `sw.js`, `icons/`), Deadline tracker + reminders + .ics, Student profile (forms auto-fill), Course pages (handouts, past papers, WhatsApp group, notes), Fee & voucher guide, Urdu button, Privacy & Terms, Global search, Report a problem, Accessibility (A+, Contrast), GPA target planner, Test Center (wrong-answer retest, weak topics, PDF result), Admin: registrations dashboard (status, CSV, chart), study-group links, campus "last verified" date, extra analytics.
Heavy libraries (PDF reader, code editor, Python) ab sirf zaroorat par load hoti hain, is liye Home tez khulta hai.
Admin se "Course study groups" add karne ke baad "Download portal-config.json" karke data repo mein upload karein.
