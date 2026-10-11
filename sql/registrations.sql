create table registrations (id bigint generated always as identity primary key, name text, phone text, email text, program text, city text, msg text, created_at timestamptz default now());
alter table registrations enable row level security;
create policy "public can insert" on registrations for insert to anon with check (true);
create policy "admin can read" on registrations for select to authenticated using (true);
