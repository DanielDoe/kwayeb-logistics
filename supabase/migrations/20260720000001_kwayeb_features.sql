-- KWAYEB LOGISTICS — Phase 2 feature tables

-- ─── User profiles & roles ───────────────────────────────────────────────────

create table if not exists public.kwayeb_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  phone text,
  whatsapp text,
  role text not null default 'customer' check (
    role in ('guest', 'customer', 'business', 'operations', 'warehouse', 'finance', 'support', 'admin')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Full quote requests (multi-step wizard) ─────────────────────────────────

create table if not exists public.kwayeb_quote_requests (
  id uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'SUBMITTED' check (
    status in (
      'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INFORMATION_REQUIRED',
      'PRICING_IN_PROGRESS', 'QUOTE_READY', 'CUSTOMER_ACCEPTED',
      'CUSTOMER_REJECTED', 'EXPIRED', 'CONVERTED_TO_SHIPMENT', 'CANCELLED'
    )
  ),
  -- Route
  origin_country text not null default 'China',
  origin_city text,
  destination_country text not null,
  destination_city text,
  destination_postal text,
  pickup_required boolean default false,
  door_delivery_required boolean default false,
  -- Freight
  freight_method text check (
    freight_method in ('recommend', 'air', 'sea', 'express', 'fcl', 'lcl', 'rail')
  ),
  -- Cargo
  cargo_category text,
  item_description text,
  package_count int,
  package_type text,
  actual_weight numeric,
  length_cm numeric,
  width_cm numeric,
  height_cm numeric,
  declared_value numeric,
  currency text default 'USD',
  cargo_flags jsonb default '{}',
  -- Supplier
  supplier_name text,
  supplier_contact text,
  supplier_phone text,
  supplier_address text,
  cargo_ready_date date,
  purchase_order text,
  pickup_instructions text,
  -- Services
  requested_services jsonb default '[]',
  -- Contact
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  contact_whatsapp text,
  preferred_contact text,
  company text,
  -- Meta
  additional_notes text,
  sourcing_type text check (sourcing_type in ('sourcing', 'shipping', 'both')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists kwayeb_quote_requests_user_idx on public.kwayeb_quote_requests (user_id);
create index if not exists kwayeb_quote_requests_status_idx on public.kwayeb_quote_requests (status);
create index if not exists kwayeb_quote_requests_email_idx on public.kwayeb_quote_requests (contact_email);

-- ─── Shipping estimates (calculator) ───────────────────────────────────────────

create table if not exists public.kwayeb_estimates (
  id uuid primary key default gen_random_uuid(),
  origin_city text not null,
  destination_country text not null,
  destination_city text,
  freight_method text not null,
  cargo_type text,
  actual_weight numeric not null,
  length_cm numeric,
  width_cm numeric,
  height_cm numeric,
  package_count int default 1,
  pickup_required boolean default false,
  door_delivery_required boolean default false,
  volumetric_weight numeric,
  chargeable_weight numeric,
  estimated_min numeric,
  estimated_max numeric,
  currency text default 'USD',
  breakdown jsonb,
  contact_email text,
  created_at timestamptz not null default now()
);

-- ─── Pickup requests ───────────────────────────────────────────────────────────

create table if not exists public.kwayeb_pickup_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  supplier_city text not null,
  pickup_address text not null,
  contact_name text not null,
  contact_phone text not null,
  preferred_date date,
  notes text,
  status text not null default 'SUBMITTED' check (
    status in ('SUBMITTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED')
  ),
  created_at timestamptz not null default now()
);

-- ─── Support tickets ─────────────────────────────────────────────────────────

create table if not exists public.kwayeb_support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  shipment_id uuid references public.kwayeb_shipments (id) on delete set null,
  quote_request_id uuid references public.kwayeb_quote_requests (id) on delete set null,
  category text not null check (
    category in ('quotation', 'tracking', 'payment', 'warehouse', 'damage', 'customs', 'delivery', 'account', 'technical', 'general')
  ),
  priority text not null default 'NORMAL' check (priority in ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
  status text not null default 'OPEN' check (
    status in ('OPEN', 'ASSIGNED', 'WAITING_FOR_CUSTOMER', 'WAITING_FOR_INTERNAL_TEAM', 'RESOLVED', 'CLOSED')
  ),
  subject text not null,
  message text not null,
  contact_email text not null,
  contact_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Invoices (shell) ────────────────────────────────────────────────────────

create table if not exists public.kwayeb_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  user_id uuid references auth.users (id) on delete set null,
  shipment_id uuid references public.kwayeb_shipments (id) on delete set null,
  quote_request_id uuid references public.kwayeb_quote_requests (id) on delete set null,
  status text not null default 'DRAFT' check (
    status in ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'VOID', 'REFUNDED', 'PARTIALLY_REFUNDED')
  ),
  currency text default 'USD',
  subtotal numeric not null default 0,
  tax numeric not null default 0,
  total numeric not null default 0,
  due_date date,
  issued_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Extend shipments ────────────────────────────────────────────────────────

alter table public.kwayeb_shipments
  add column if not exists user_id uuid references auth.users (id) on delete set null,
  add column if not exists quote_request_id uuid,
  add column if not exists milestone text,
  add column if not exists customer_reference text,
  add column if not exists container_number text,
  add column if not exists estimated_departure date,
  add column if not exists shipping_method text;

alter table public.kwayeb_shipment_events
  add column if not exists milestone_code text,
  add column if not exists description text,
  add column if not exists is_public boolean default true;

-- ─── Triggers ────────────────────────────────────────────────────────────────

drop trigger if exists kwayeb_profiles_updated_at on public.kwayeb_profiles;
create trigger kwayeb_profiles_updated_at
  before update on public.kwayeb_profiles
  for each row execute function public.kwayeb_set_updated_at();

drop trigger if exists kwayeb_quote_requests_updated_at on public.kwayeb_quote_requests;
create trigger kwayeb_quote_requests_updated_at
  before update on public.kwayeb_quote_requests
  for each row execute function public.kwayeb_set_updated_at();

drop trigger if exists kwayeb_support_tickets_updated_at on public.kwayeb_support_tickets;
create trigger kwayeb_support_tickets_updated_at
  before update on public.kwayeb_support_tickets
  for each row execute function public.kwayeb_set_updated_at();

drop trigger if exists kwayeb_invoices_updated_at on public.kwayeb_invoices;
create trigger kwayeb_invoices_updated_at
  before update on public.kwayeb_invoices
  for each row execute function public.kwayeb_set_updated_at();

-- Auto-create profile on signup
create or replace function public.kwayeb_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.kwayeb_profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_kwayeb on auth.users;
create trigger on_auth_user_created_kwayeb
  after insert on auth.users
  for each row execute function public.kwayeb_handle_new_user();

-- ─── RLS ─────────────────────────────────────────────────────────────────────

alter table public.kwayeb_profiles enable row level security;
alter table public.kwayeb_quote_requests enable row level security;
alter table public.kwayeb_estimates enable row level security;
alter table public.kwayeb_pickup_requests enable row level security;
alter table public.kwayeb_support_tickets enable row level security;
alter table public.kwayeb_invoices enable row level security;

-- Profiles: users read/update own
drop policy if exists "kwayeb_profiles_select_own" on public.kwayeb_profiles;
create policy "kwayeb_profiles_select_own" on public.kwayeb_profiles
  for select using (auth.uid() = id);

drop policy if exists "kwayeb_profiles_update_own" on public.kwayeb_profiles;
create policy "kwayeb_profiles_update_own" on public.kwayeb_profiles
  for update using (auth.uid() = id);

-- Quote requests: public insert, users read own
drop policy if exists "kwayeb_quotes_public_insert" on public.kwayeb_quote_requests;
create policy "kwayeb_quotes_public_insert" on public.kwayeb_quote_requests
  for insert to anon, authenticated with check (true);

drop policy if exists "kwayeb_quotes_select_own" on public.kwayeb_quote_requests;
create policy "kwayeb_quotes_select_own" on public.kwayeb_quote_requests
  for select using (user_id = auth.uid() or contact_email = auth.email());

-- Estimates: public insert
drop policy if exists "kwayeb_estimates_public_insert" on public.kwayeb_estimates;
create policy "kwayeb_estimates_public_insert" on public.kwayeb_estimates
  for insert to anon, authenticated with check (true);

-- Pickup: public insert
drop policy if exists "kwayeb_pickup_public_insert" on public.kwayeb_pickup_requests;
create policy "kwayeb_pickup_public_insert" on public.kwayeb_pickup_requests
  for insert to anon, authenticated with check (true);

drop policy if exists "kwayeb_pickup_select_own" on public.kwayeb_pickup_requests;
create policy "kwayeb_pickup_select_own" on public.kwayeb_pickup_requests
  for select using (user_id = auth.uid());

-- Support tickets: public insert, users read own
drop policy if exists "kwayeb_tickets_public_insert" on public.kwayeb_support_tickets;
create policy "kwayeb_tickets_public_insert" on public.kwayeb_support_tickets
  for insert to anon, authenticated with check (true);

drop policy if exists "kwayeb_tickets_select_own" on public.kwayeb_support_tickets;
create policy "kwayeb_tickets_select_own" on public.kwayeb_support_tickets
  for select using (user_id = auth.uid() or contact_email = auth.email());

-- Invoices: users read own
drop policy if exists "kwayeb_invoices_select_own" on public.kwayeb_invoices;
create policy "kwayeb_invoices_select_own" on public.kwayeb_invoices
  for select using (user_id = auth.uid());

-- Quote number generator helper
create or replace function public.kwayeb_generate_quote_number()
returns text language plpgsql as $$
declare
  seq int;
begin
  seq := (extract(epoch from now())::bigint % 100000)::int;
  return 'KWQ-' || to_char(now(), 'YYYY') || '-' || lpad(seq::text, 5, '0');
end;
$$;
