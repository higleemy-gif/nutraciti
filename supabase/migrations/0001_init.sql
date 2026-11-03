-- Nutraciti schema: profiles, catalog, settings, auth trigger, RLS
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);
alter table public.categories enable row level security;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tag text,
  tagline text,
  active_ingredient text,
  description text,
  pills text[] not null default '{}',
  price_paise bigint not null check (price_paise > 0),
  mrp_paise bigint not null check (mrp_paise >= price_paise),
  gst_rate int not null default 18 check (gst_rate between 0 and 40),
  stock int not null default 0 check (stock >= 0),
  rating numeric(2,1) not null default 0,
  reviews_count int not null default 0,
  badge text,
  image_url text,
  category_id uuid references public.categories(id) on delete set null,
  featured boolean not null default false,
  active boolean not null default true,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  position int not null default 0
);
alter table public.product_images enable row level security;

create table if not exists public.store_settings (
  id int primary key default 1 check (id = 1),
  free_shipping_threshold_paise bigint not null default 49900,
  shipping_fee_paise bigint not null default 4900,
  cod_fee_paise bigint not null default 4000,
  cod_limit_paise bigint not null default 500000
);
alter table public.store_settings enable row level security;
insert into public.store_settings (id) values (1) on conflict (id) do nothing;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, phone, full_name)
  values (new.id, new.email, new.phone, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
