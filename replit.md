# CataMex Hub

Sitio corporativo B2B de nivel internacional para fabricante y distribuidor mexicano de convertidores catalíticos y sistemas de escape. Hub de captación de distribuidores mayoristas para Costa Rica, Colombia y Ecuador.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/catalytic-hub run dev` — run the frontend (port auto)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Wouter

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle ORM table definitions (distributors, products, regions)
- `artifacts/api-server/src/routes/` — Express route handlers (distributors, catalog, regions)
- `artifacts/catalytic-hub/src/pages/` — React pages (Home, Catalog, Distributor, Regions, About)
- `artifacts/catalytic-hub/src/components/` — Navbar, Footer, PageLayout

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → typed React Query hooks + Zod server validators
- Dark steel + amber theme: dark background (220 15% 10%), primary orange (32 98% 50%), Space Grotesk display font
- Multi-step B2B form on /distribuidor using react-hook-form + zod for full validation
- Catalog filtering is client-side (search/brand) + server-side (category/brand via query params)
- Country selector on homepage pulls from live /api/regions endpoint

## Product

- `/` — Landing corporativa con hero factory, country selector multiregión, productos destacados
- `/catalogo` — Catálogo técnico filtrable con specs, compatibilidades y certificaciones
- `/distribuidor` — Portal B2B con formulario de 3 pasos para aplicar como distribuidor mayorista
- `/regiones` — Cobertura regional CR / CO / EC con contactos locales y WhatsApp directo
- `/nosotros` — Historia de la empresa, capacidades de planta y certificaciones vigentes

## User preferences

- Código nivel senior/profesional — validación de entradas, sanitización, manejo de errores
- Sitio en español latinoamericano
- Sin emojis en la UI
- Animaciones premium con Framer Motion

## Gotchas

- The `lib/db` package must be rebuilt (`pnpm run typecheck:libs`) after adding new schema files, before the api-server typecheck will pass
- Seeded data: 3 regions (CR, CO, EC), 6 products (3 featured), 3 distributor samples

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
