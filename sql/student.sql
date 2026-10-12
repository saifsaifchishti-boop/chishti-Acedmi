-- Run once in Supabase > SQL Editor. Enables student account sync and shared Peer Q&A.
create table if not exists student_data(user_id uuid primary key references auth.users on delete cascade, data jsonb not null default '{}', updated_at timestamptz default now());
alter table student_data enable row level security;
drop policy if exists "own data" on student_data;
create policy "own data" on student_data for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

create table if not exists qa_posts(id uuid primary key, user_id uuid not null default auth.uid(), name text, senior boolean default false, course text, title text not null, body text, created_at timestamptz default now());
create table if not exists qa_answers(id uuid primary key, post_id uuid not null references qa_posts on delete cascade, user_id uuid not null default auth.uid(), name text, senior boolean default false, body text not null, created_at timestamptz default now());
create table if not exists qa_votes(user_id uuid not null default auth.uid(), kind text not null check (kind in ('p','a')), target_id text not null, v int not null check (v in (-1,1)), primary key(user_id,kind,target_id));
alter table qa_posts enable row level security; alter table qa_answers enable row level security; alter table qa_votes enable row level security;
drop policy if exists "read posts" on qa_posts; create policy "read posts" on qa_posts for select using (true);
drop policy if exists "add posts" on qa_posts; create policy "add posts" on qa_posts for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists "del posts" on qa_posts; create policy "del posts" on qa_posts for delete to authenticated using (auth.uid()=user_id);
drop policy if exists "read answers" on qa_answers; create policy "read answers" on qa_answers for select using (true);
drop policy if exists "add answers" on qa_answers; create policy "add answers" on qa_answers for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists "del answers" on qa_answers; create policy "del answers" on qa_answers for delete to authenticated using (auth.uid()=user_id);
drop policy if exists "read votes" on qa_votes; create policy "read votes" on qa_votes for select using (true);
drop policy if exists "own votes" on qa_votes; create policy "own votes" on qa_votes for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
