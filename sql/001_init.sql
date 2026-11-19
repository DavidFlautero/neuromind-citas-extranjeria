BEGIN;
CREATE TABLE IF NOT EXISTS cases(id BIGSERIAL PRIMARY KEY,province TEXT NOT NULL,full_name_enc TEXT NOT NULL,document_enc TEXT NOT NULL,email_enc TEXT NOT NULL,notes_enc TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'preparacion' CHECK(status IN ('preparacion','pendiente','cita_confirmada','cerrado')),created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS appointments(id BIGSERIAL PRIMARY KEY,case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,office TEXT NOT NULL,starts_at TIMESTAMPTZ NOT NULL,reference_enc TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now(),UNIQUE(case_id,starts_at));
CREATE TABLE IF NOT EXISTS audit_log(id BIGSERIAL PRIMARY KEY,action TEXT NOT NULL,entity_id BIGINT,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
COMMIT;