FROM node:22-bookworm-slim

RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json .npmrc ./
COPY artifacts ./artifacts
COPY lib ./lib
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=5000
ENV BASE_PATH=/

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "start"]
