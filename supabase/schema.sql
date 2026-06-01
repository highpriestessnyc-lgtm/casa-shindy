-- profiles テーブル
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_member boolean default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  membership_start timestamptz,
  created_at timestamptz default now()
);

-- purchases テーブル（単品購入）
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  product_key text not null,
  stripe_session_id text,
  purchased_at timestamptz default now()
);

-- posts テーブル（独り言）
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text default 'soliloquy', -- soliloquy / market / culture / movies / books
  is_published boolean default false,
  created_at timestamptz default now()
);

-- lessons テーブル（ダンス動画）
create table if not exists lessons (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  video_url text,
  thumbnail_url text,
  is_published boolean default false,
  created_at timestamptz default now()
);

-- RLS ポリシー
alter table profiles enable row level security;
alter table purchases enable row level security;
alter table posts enable row level security;
alter table lessons enable row level security;

-- profiles: 本人のみ読み書き
create policy "profiles_self" on profiles for all using (auth.uid() = id);

-- purchases: 本人のみ読み
create policy "purchases_self" on purchases for select using (auth.uid() = user_id);

-- posts: 公開のみ誰でも / 全部は会員のみ
create policy "posts_published" on posts for select using (is_published = true);

-- lessons: 公開のみ誰でも / 全部は会員のみ
create policy "lessons_published" on lessons for select using (is_published = true);

-- auth後に自動でprofileを作成するトリガー
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
