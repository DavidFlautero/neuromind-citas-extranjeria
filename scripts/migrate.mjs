import pg from 'pg';import {readFile,readdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
if(!process.env.DATABASE_URL)throw Error('DATABASE_URL is required');
const db=new pg.Client({connectionString:process.env.DATABASE_URL});await db.connect();
try{
 await db.query('SELECT pg_advisory_lock($1)',[421888]);
 await db.query('CREATE TABLE IF NOT EXISTS schema_migrations(name TEXT PRIMARY KEY,sha256 TEXT NOT NULL,applied_at TIMESTAMPTZ NOT NULL DEFAULT now())');
 for(const name of (await readdir(new URL('../sql/',import.meta.url))).filter(x=>/^\d+_.*\.sql$/.test(x)).sort()){
  const sql=await readFile(new URL('../sql/'+name,import.meta.url),'utf8');const sha256=createHash('sha256').update(sql).digest('hex');
  const {rows}=await db.query('SELECT sha256 FROM schema_migrations WHERE name=$1',[name]);
  if(rows.length){if(rows[0].sha256!==sha256)throw Error(`Migration modified: ${name}`);continue}
  await db.query('BEGIN');try{await db.query(sql);await db.query('INSERT INTO schema_migrations(name,sha256) VALUES($1,$2)',[name,sha256]);await db.query('COMMIT');console.log('Applied',name)}catch(e){await db.query('ROLLBACK');throw e}
 }
}finally{await db.query('SELECT pg_advisory_unlock($1)',[421888]).catch(()=>{});await db.end()}
