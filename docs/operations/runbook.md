# Runbook operativo

1. Comprobar health y logs.
2. Verificar PostgreSQL y Redis.
3. Si cae un worker, detener la reanudación automática de acciones no idempotentes.
4. Revisar `human_tasks` y confirmar si la sesión oficial sigue válida.
5. Ante confirmación ambigua, marcar `NEEDS_RECONCILIATION`, nunca repetir reserva a ciegas.
6. Restaurar backups solo en entorno aislado hasta verificar integridad.
7. Registrar incidente y causa raíz.
