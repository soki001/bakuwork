# buildsync
Construction management and daily progress reports.

    npm install
    npm run dev          # runs on dummy data, no setup needed

To connect Supabase: copy `.env.example` to `.env.local`, fill in the keys, and run `supabase/schema.sql` in the SQL editor.
Routes: `/` dashboard, `/dpr` multi-step form, `/punch-list`, `/dpr/print` (print or save as PDF).
