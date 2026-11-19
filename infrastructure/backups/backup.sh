#!/usr/bin/env bash
set -euo pipefail
: "${DATABASE_URL:?required}"
: "${BACKUP_DIR:?required}"
mkdir -p "$BACKUP_DIR"
file="$BACKUP_DIR/neuromind-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --format=custom --dbname="$DATABASE_URL" --file="$file"
chmod 600 "$file"
echo "Backup written: $file (encrypt and copy off-host)"
