# Moonshine Capital Funding Directory

Registry-driven funding product directory and marketplace for discovering, filtering, comparing, and reviewing business funding options from Moonshine Capital.

## Overview

The current production experience is built around static JSON registries in `lib/registry/`. Those registries are transformed into typed product, provider, family, tool, and page data at build/runtime and drive the main public directory surfaces.

The active product experience includes:

- Searchable and filterable funding product listings
- Product cards and detail views
- Side-by-side comparison for up to three products
- Funding family landing pages with qualification guidance
- Provider/partner directory and provider detail pages
- Funding tools directory with live and “Coming Soon” states
- Resource guides
- Redirect-based application CTAs

## Architecture

This is a Next.js 14 App Router project using React, TypeScript, and Tailwind CSS.

The current directory is registry-driven:

- `lib/registry/*.registry.json` is the canonical structured funding data layer.
- `lib/data/directory.ts` adapts registry data for the main `/`, `/products`, `/partners`, and `/tools` experiences.
- `lib/funding/data.ts` adapts the same registries for the structured `/funding` marketplace and detail routes.
- Client-side filtering, search, sorting, pagination, and comparison operate against registry-derived product data.
- Product application buttons route through `/r/[id]`, which performs a 302 redirect to the provider/application URL derived from registry data.

Legacy provider-submission/Supabase code is still present in the repository behind feature flags, but it is not required for the static registry-driven directory described here.

## Registry data

Canonical registries live in `lib/registry/`:

| Registry | Purpose |
| --- | --- |
| `funding-products.registry.json` | Funding product records used by product directories and detail pages |
| `funding-providers.registry.json` | Provider/partner profiles, eligibility guidance, industry appetite, affiliate/application data |
| `funding-product-families.registry.json` | Funding families, qualification signals, use cases, documents, and disqualifiers |
| `funding-tools.registry.json` | Calculators, estimators, scorecards, utilities, and future tool concepts |
| `funding-pages.registry.json` | Public funding landing-page content, SEO, CTA, navigation, and compliance copy |

Current registry-derived counts:

- 59 active funding products
- 31 providers
- 6 public, non-deprecated funding families
- 125 non-duplicate tool records
  - 6 currently live with a `live_url`
  - 119 currently represented as future/non-live concepts
- 7 public funding pages

## Products experience

### Main directory

`/` and `/products` expose the primary funding directory experience.

Users can filter by:

- Product family
- Funding type
- Amount needed
- Time to funding
- Minimum credit
- Monthly revenue
- Time in business
- Startup eligibility
- Provider

The directory also supports sorting, pagination, applied-filter chips, direct query-string state, provider-specific filtering, and product search behavior.

Product cards show provider, funding type/family, amount range, speed, minimum credit, revenue/time-in-business guidance, and CTAs.

### Product details and comparison

The main directory opens product details in a modal with:

- Amount and funding speed
- Term and payment structure
- Rate/cost range when present
- Credit, revenue, and time-in-business guidance
- Typical qualification profile
- Common use cases
- Provider industry appetite
- Typical documents
- Common disqualifiers

Users can select up to three products for side-by-side comparison.

The structured funding marketplace also exposes static product detail pages at `/funding/products/[slug]`.

### Application behavior

Main-directory product CTAs use:

```text
/r/[id]
```

The redirect route finds the registry-derived product and sends the visitor to the provider/application URL. If no product destination is available, it falls back to the primary funding CTA from `funding-pages.registry.json`.

The current redirect route does **not** persist click logs.

## Partners / providers

Two related provider experiences are present:

- `/partners` — partner-focused directory using providers with active affiliate status and their linked active products
- `/funding/providers` — broader provider directory derived from the provider registry

Provider data is linked to products by provider ID. Provider pages summarize financing products, funding families, typical borrower profile, eligibility guidance, geographic coverage, industry appetite, and active products associated with that provider.

`/funding/partners` redirects to `/funding/providers`.

## Tools

`/tools` is a searchable funding tools directory built from `funding-tools.registry.json`.

The UI separates tools into:

- **Available** — records whose `build_state` is `live` and that have a `live_url`
- **Coming Soon** — non-live concepts

Users can search tools and filter by asset/tool type. Live tools launch to their configured external URL.

The `/funding` experience also surfaces the count of registry tools that have a live URL.

## Routes

Current public product routes intended as part of the directory experience include:

- `/` — primary Moonshine Capital funding directory
- `/products` — same directory experience with filter/query support
- `/partners` — funding partner directory
- `/tools` — funding tools directory
- `/resources` — resource guides
- `/resources/[slug]` — individual resource guide
- `/funding` — structured funding marketplace landing page
- `/funding/working-capital`
- `/funding/business-line-of-credit`
- `/funding/startup-funding`
- `/funding/equipment-financing`
- `/funding/real-estate-capital`
- `/funding/ecommerce-seller-funding`
- `/funding/products` — structured product directory
- `/funding/products/[slug]` — product detail
- `/funding/providers` — provider directory
- `/funding/providers/[slug]` — provider detail
- `/funding/partners` — redirect to `/funding/providers`
- `/r/[id]` — outbound application redirect

Legacy `/portal`, `/portal/admin`, `/auth/sign-in`, and Supabase-backed submission APIs remain in the codebase but are not part of the registry-driven production directory documentation.

## Local development

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Useful scripts from `package.json`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

The project is intended for Vercel as a standard Next.js deployment.

Typical workflow:

1. Update registry JSON or application code locally.
2. Commit and push to GitHub.
3. Vercel builds the connected branch using `next build`.
4. Production deployment is published from the configured production branch, normally `main`.

No custom Vercel configuration file is required by the repository.

## Data maintenance

For normal directory maintenance, update the canonical registry JSON rather than hard-coding data into components.

- Add/update products: `lib/registry/funding-products.registry.json`
- Add/update providers or affiliate/application destinations: `lib/registry/funding-providers.registry.json`
- Add/update funding families and qualification guidance: `lib/registry/funding-product-families.registry.json`
- Add/update tools or tool build state: `lib/registry/funding-tools.registry.json`
- Add/update funding landing pages, CTAs, SEO, or compliance text: `lib/registry/funding-pages.registry.json`

The directory adapters in `lib/data/directory.ts` and `lib/funding/data.ts` should generally remain transformation logic rather than becoming duplicate data stores.

## Environment variables

The registry-driven directory does **not** require environment variables for its primary public product, partner, provider, tool, resource, funding-page, or redirect experiences.

The repository still contains optional legacy provider-submission/admin code that references:

- `SUBMISSIONS_ENABLED`
- `ADMIN_ENABLED`
- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASS`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Those variables are only relevant if the dormant submission/admin path is intentionally re-enabled. They are not required for the current static registry-driven directory.

## Funding and affiliate disclaimer

The registry encodes the following funding disclaimer:

> Funding availability, terms, speed, and eligibility vary by provider, applicant profile, documentation, and underwriting review. No approval or funding outcome is guaranteed.

Provider and product records may contain affiliate/application URLs. The public provider directory intentionally excludes internal affiliate economics and submission-route details.

## Future enhancements

Keep future work separate from the current production surface. Reasonable next steps include:

- Retiring or fully reworking the legacy portal/Supabase submission code
- Persisted saved products/accounts
- Analytics or outbound click tracking
- Richer product matching or eligibility workflows
- Additional live calculators and tools
