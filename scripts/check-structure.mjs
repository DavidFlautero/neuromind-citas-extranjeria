import {existsSync,readFileSync} from 'node:fs';
const required=['app/layout.tsx','app/login/page.tsx','app/dashboard/page.tsx','app/api/cases/route.ts','app/api/appointments/route.ts','lib/crypto.ts','lib/security.ts','lib/db.ts','sql/001_init.sql','scripts/migrate.mjs'];
for(const file of required)if(!existsSync(file))throw Error(`Missing: ${file}`);
const env=readFileSync('.env.example','utf8');for(const key of ['DATABASE_URL','AUTH_SECRET','DATA_ENCRYPTION_KEY','ADMIN_EMAIL','ADMIN_PASSWORD_HASH'])if(!env.includes(key+'='))throw Error(`Missing env key: ${key}`);
console.log(`Structure OK (${required.length} required files)`);
