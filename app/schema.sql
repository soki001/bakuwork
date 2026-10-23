create table dprs (
  id uuid primary key default gen_random_uuid(),
  project text not null, report_date date not null, contractor text, weather text,
  workforce jsonb, materials jsonb, work_done text, progress_pct int,
  photos jsonb, signature text, signer text,
  status text not null default 'pending' check (status in ('pending','approved')),
  created_by uuid default auth.uid(), created_at timestamptz default now()
);
create table punch_items (
  id text primary key, location text, issue text,
  severity text check (severity in ('Low','Medium','High')),
  status text default 'Pending' check (status in ('Pending','In Progress','Resolved')),
  assignee text, created_at timestamptz default now()
);
alter table dprs enable row level security;
alter table punch_items enable row level security;
create policy "team read/write dprs" on dprs for all to authenticated using (true) with check (true);
create policy "team read/write punch" on punch_items for all to authenticated using (true) with check (true);
insert into storage.buckets (id, name, public) values ('dpr-photos', 'dpr-photos', false);
alter publication supabase_realtime add table dprs, punch_items;
