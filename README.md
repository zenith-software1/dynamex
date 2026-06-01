# Dynamex

Sitio corporativo B2B para fabricante y distribuidor de convertidores catalíticos y sistemas de escape. Hub de captación de distribuidores mayoristas en Costa Rica, Colombia y Ecuador.

## Sitio en línea

| Entorno | URL |
|---------|-----|
| GitHub Pages (demo) | https://zenith-software1.github.io/dynamex/ |
| Producción (API + sitio) | Despliega en [Render](https://render.com) con el `Dockerfile` o `render.yaml` de este repo |

## Desarrollo local

Requisitos: Node.js 20+, pnpm.

```bash
pnpm install
# API + sitio (memoria, sin Postgres):
pnpm run build
set PORT=5000
pnpm start
# Abre http://localhost:5000
```

Con PostgreSQL, define `DATABASE_URL` antes de `pnpm start`.

```bash
pnpm --filter @workspace/catalytic-hub run dev   # solo frontend (puerto 5173)
pnpm --filter @workspace/api-server run dev      # API en 5000
```

## Stack

pnpm workspaces · React · Vite · Express · Drizzle · PostgreSQL (opcional)
