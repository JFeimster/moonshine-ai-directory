# Moonshine Capital — AI Funding Directory / Marketplace

Search-first directory for funding products with filters, comparison, and product detail modal.

## Quickstart
```bash
npm install
npm run dev
```

## Deploy to Vercel
- Push to GitHub
- Import in Vercel
- Build command: `next build`
- Output: Next.js

## Environment
Copy `.env.example` to `.env.local` and fill in when you add:
- Auth provider (NextAuth / Clerk)
- Database (Postgres / Supabase)
- Affiliate tracking + partner redirects

## Routes (v2)
- `/products` — directory (filters + compare)
- `/partners` — carousel + full partner list
- `/resources` — blog index
- `/resources/[slug]` — blog post
- `/portal` — provider submission form
- `/portal/admin` — admin review (approve/reject) **(no auth in demo)**

## Next Upgrades
- Server-side filtering + counts (already structured)
- Real autocomplete (vector search)
- User accounts + saved lists + alerts
- Partner dashboards + submission workflow (DB + roles)

## v3 Production Backing (Supabase + Redirect Tracking)

### Environment variables
Copy `.env.example` to `.env.local` and set:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUBMISSIONS_ENABLED=true` (turn on provider submissions)
- `ADMIN_ENABLED=true` (turn on admin route)
- `BASIC_AUTH_USER=...`
- `BASIC_AUTH_PASS=...`
- `REDIRECTS_ENABLED=true` (default on; set false to disable)

### Supabase SQL (run once)
Create these tables in Supabase SQL editor:

```sql
create table if not exists product_submissions (
  id text primary key,
  submitted_at timestamptz not null default now(),
  status text not null check (status in ('submitted','approved','rejected')),
  notes text null,

  provider_name text not null,
  provider_logo text null,
  name text not null,
  tagline text not null,
  product_type text not null,
  industries text[] not null default '{}'::text[],
  amount_min numeric not null,
  amount_max numeric not null,
  time_to_fund text not null,
  min_credit_score int not null,
  features text[] not null default '{}'::text[],
  apply_url text not null
);

create index if not exists product_submissions_status_idx on product_submissions(status);
create index if not exists product_submissions_submitted_at_idx on product_submissions(submitted_at desc);

create table if not exists apply_clicks (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  product_id text not null,
  apply_url text not null,
  referer text null,
  user_agent text null,
  ip text null
);

create index if not exists apply_clicks_created_at_idx on apply_clicks(created_at desc);
create index if not exists apply_clicks_product_id_idx on apply_clicks(product_id);
```

### Partner attribution redirects
All “Apply Now” links route through:
- `/r/[productId]`

This logs a click to `apply_clicks` (best-effort; never blocks redirect) and then redirects to the partner `apply_url`.
