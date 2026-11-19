# Arquitectura

## Objetivo
Plataforma multi-expediente de asistencia a toma de huellas TIE para clientes autorizados.

## Componentes
- `apps/web`: Next.js, panel privado y operaciones.
- `apps/api`: API Fastify con contratos y validación.
- `apps/worker`: trabajos duraderos, idempotencia y recuperación.
- `apps/browser-operator`: Playwright en entorno de pruebas y navegación asistida autorizada.
- `apps/notifier`: notificaciones Telegram/email con transactional outbox.
- `packages/database`: PostgreSQL y migraciones.
- `packages/contracts`: estados y esquemas compartidos.
- `infrastructure`: contenedores, proxy, backups y observabilidad.

## Restricciones
No se automatizan CAPTCHA, elusión de controles, acaparamiento ni reservas sin autorización. La disponibilidad de citas reales depende de mecanismos oficiales permitidos. No se garantiza disponibilidad.
