# Neuromind Citas Extranjería

Proyecto de asistencia a expedientes de toma de huellas TIE para clientes autorizados.

## Estado actual
- Next.js con pantalla de acceso, panel, API de expedientes y registro de citas.
- PostgreSQL con migración SQL, datos personales cifrados y auditoría básica.
- Contratos de workflow, navegador Playwright **solo para pruebas locales**, notificador Telegram inicial.
- Docker Compose, Nginx de ejemplo, backups y pruebas de humo.
- **No existe detección real de citas ni reserva automática en ICPPlus.** El portal puede exigir interacción humana y prohibir automatización. No hay garantía de disponibilidad.

## Requisitos
Node.js 22+, PostgreSQL 17, Docker opcional.

## Desarrollo
1. Copiar `.env.example` a `.env`.
2. Configurar `DATABASE_URL`, `AUTH_SECRET` (32 bytes hex), `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` y `POSTGRES_PASSWORD`.
3. Generar el hash con `node scripts/hash-password.mjs 'contraseña-larga'`.
4. `npm install`.
5. `npm run db:migrate`.
6. `npm test` y `npm run typecheck`.
7. `npm run dev`. Abrir `/login`.

## Producción
**No desplegar aún públicamente.** Falta limitación de intentos de login, MFA, endurecimiento de permisos, CSP, gestión de secretos separada, pruebas E2E, validación de consentimiento y restauración de backups. El compose y Dockerfile son bases de desarrollo.

## Arquitectura
- `app/`: Next.js, autenticación, expedientes y citas.
- `apps/worker/`: estados y recuperación futura.
- `apps/browser-operator/`: Playwright para fixture local.
- `apps/notifier/`: adaptador Telegram.
- `packages/contracts/`: tipos compartidos.
- `docs/`: decisiones, amenazas y runbooks.
- `infrastructure/`: Docker, Nginx y backup.

## Uso responsable
La cita oficial es gratuita. No automatizar evasión de CAPTCHA, restricciones, colas, acaparamiento o reventa de citas. Las consultas reales solo pueden implementarse mediante mecanismos autorizados.
