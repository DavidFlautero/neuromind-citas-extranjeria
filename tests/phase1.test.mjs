import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('data key independent from auth key',()=>{const x=readFileSync('lib/crypto.ts','utf8');assert.match(x,/DATA_ENCRYPTION_KEY/);assert.doesNotMatch(x,/AUTH_SECRET/)});
test('migration runner verifies checksums',()=>assert.match(readFileSync('scripts/migrate.mjs','utf8'),/Migration modified/));
test('session tokens validate audience and issuer',()=>assert.match(readFileSync('lib/security.ts','utf8'),/audience:'neuromind-citas-web'/));
