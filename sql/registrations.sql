-- Run once in Supabase > SQL Editor. Safe to run again.
create table if not exists registrations (id bigint generated always as identity primary key, name text, phone text, email text, program text, city text, msg text, created_at timestamptz default now());
alter table registrations add column if not exists status text default 'new';
alter table registrations enable row level security;
drop policy if exists "public can insert" on registrations;
create policy "public can insert" on registrations for insert to anon with check (true);
drop policy if exists "admin can read" on registrations;
create policy "admin can read" on registrations for select to authenticated using (true);
drop policy if exists "admin can update" on registrations;
create policy "admin can update" on registrations for update to authenticated using (true) with check (true);
