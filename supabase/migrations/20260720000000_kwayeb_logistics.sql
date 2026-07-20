-- KWAYEB LOGISTICS schema
-- Prefixed tables to coexist safely with other apps on the same Supabase project

create extension if not exists "pgcrypto";

-- ─── Sourcing / quote requests ───────────────────────────────────────────────

create table if not exists public.kwayeb_sourcing_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  destination_country text not null,
  request_type text not null check (request_type in ('sourcing', 'shipping', 'both')),
  category text,
  product_description text not null,
  quantity text,
  budget text,
  additional_notes text,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'quoted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists kwayeb_sourcing_requests_email_idx
  on public.kwayeb_sourcing_requests (email);

create index if not exists kwayeb_sourcing_requests_status_idx
  on public.kwayeb_sourcing_requests (status);

-- ─── Shipments ───────────────────────────────────────────────────────────────

create table if not exists public.kwayeb_shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_id text not null unique,
  status text not null default 'processing' check (
    status in ('processing', 'consolidated', 'in_transit', 'customs', 'out_for_delivery', 'delivered', 'delayed')
  ),
  origin text not null default 'Guangzhou, China',
  destination text not null,
  destination_country text not null,
  freight_type text check (freight_type in ('air', 'sea', 'express')),
  estimated_delivery date,
  customer_name text,
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists kwayeb_shipments_tracking_id_idx
  on public.kwayeb_shipments (tracking_id);

-- ─── Shipment timeline events ────────────────────────────────────────────────

create table if not exists public.kwayeb_shipment_events (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.kwayeb_shipments (id) on delete cascade,
  status_label text not null,
  location text not null,
  event_at timestamptz not null default now(),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists kwayeb_shipment_events_shipment_id_idx
  on public.kwayeb_shipment_events (shipment_id, sort_order);

-- ─── Updated-at trigger ──────────────────────────────────────────────────────

create or replace function public.kwayeb_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists kwayeb_sourcing_requests_updated_at on public.kwayeb_sourcing_requests;
create trigger kwayeb_sourcing_requests_updated_at
  before update on public.kwayeb_sourcing_requests
  for each row execute function public.kwayeb_set_updated_at();

drop trigger if exists kwayeb_shipments_updated_at on public.kwayeb_shipments;
create trigger kwayeb_shipments_updated_at
  before update on public.kwayeb_shipments
  for each row execute function public.kwayeb_set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────

alter table public.kwayeb_sourcing_requests enable row level security;
alter table public.kwayeb_shipments enable row level security;
alter table public.kwayeb_shipment_events enable row level security;

-- Public can submit sourcing requests
drop policy if exists "kwayeb_public_insert_sourcing" on public.kwayeb_sourcing_requests;
create policy "kwayeb_public_insert_sourcing"
  on public.kwayeb_sourcing_requests
  for insert
  to anon, authenticated
  with check (true);

-- Public can read shipments (filtered by tracking_id in app layer)
drop policy if exists "kwayeb_public_read_shipments" on public.kwayeb_shipments;
create policy "kwayeb_public_read_shipments"
  on public.kwayeb_shipments
  for select
  to anon, authenticated
  using (true);

-- Public can read shipment events
drop policy if exists "kwayeb_public_read_events" on public.kwayeb_shipment_events;
create policy "kwayeb_public_read_events"
  on public.kwayeb_shipment_events
  for select
  to anon, authenticated
  using (true);

-- ─── Demo seed data ──────────────────────────────────────────────────────────

insert into public.kwayeb_shipments (
  tracking_id, status, origin, destination, destination_country,
  freight_type, estimated_delivery, customer_name
) values (
  'KWY-2026-001', 'in_transit', 'Guangzhou, China', 'Accra, Ghana', 'Ghana',
  'sea', '2026-07-28', 'Demo Customer'
) on conflict (tracking_id) do nothing;

insert into public.kwayeb_shipment_events (shipment_id, status_label, location, event_at, sort_order)
select s.id, e.status_label, e.location, e.event_at, e.sort_order
from public.kwayeb_shipments s
cross join (
  values
    ('Order received & consolidated', 'Guangzhou Warehouse', '2026-07-15 08:00:00+00'::timestamptz, 1),
    ('Departed via sea freight', 'Guangzhou Port', '2026-07-17 14:30:00+00'::timestamptz, 2),
    ('In transit', 'Indian Ocean', '2026-07-19 09:00:00+00'::timestamptz, 3)
) as e(status_label, location, event_at, sort_order)
where s.tracking_id = 'KWY-2026-001'
  and not exists (
    select 1 from public.kwayeb_shipment_events ev
    where ev.shipment_id = s.id
  );
