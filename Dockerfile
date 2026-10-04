# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS dependencies
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
# Runtime migration and knowledge commands need the installed TypeScript runner.
COPY --from=build --chown=node:node /app /app
RUN mkdir -p /app/.data /app/Volt /app/.next/cache \
    && chown -R node:node /app/.data /app/Volt /app/.next/cache \
    && chmod 700 /app/.data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=8s --start-period=120s --retries=3 \
    CMD ["node", "scripts/deployment/healthcheck.mjs"]
ENTRYPOINT ["sh", "scripts/deployment/entrypoint.sh"]
