#!/bin/sh
set -eu
umask 077
# Public deployments fail closed before touching storage if configuration is missing.
node scripts/check-deployment.mjs
if node -e 'const fs = require("node:fs"); process.exit(fs.existsSync(process.env.DATABASE_URL || ".data/learning.sqlite") ? 0 : 1)'; then
  npm run db:migrate:backup
else
  npm run db:setup
fi
# An edited public note may block projection; preserve it and keep learning operational.
npm run vault:sync || printf '%s\n' 'Public Vault projection needs operator attention; existing notes were preserved.' >&2
exec node node_modules/next/dist/bin/next start --hostname 0.0.0.0 --port "${PORT:-3000}"
