# Dynamex

Sitio corporativo B2B para fabricante y distribuidor de convertidores catalíticos y sistemas de escape. Hub de captación de distribuidores mayoristas (Costa Rica, Colombia, Ecuador).

## Stack

- pnpm workspaces, TypeScript, React + Vite, Express, PostgreSQL + Drizzle

## Desarrollo

Requiere Node.js, pnpm y `DATABASE_URL` (PostgreSQL).

```bash
pnpm install
pnpm --filter @workspace/db run push
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/catalytic-hub run dev
```

Ver `replit.md` para más detalle del proyecto.
