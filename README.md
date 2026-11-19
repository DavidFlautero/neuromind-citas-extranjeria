# Neuromind Citas Extranjería

Sistema de asistencia a operadores para trámites de toma de huellas (TIE) en España.

## Objetivo
Gestionar expedientes de clientes autorizados, ayudar en la navegación por canales oficiales, pausar para verificaciones humanas y registrar resultados. No garantiza citas ni consulta disponibilidad real hasta validar una integración permitida.

## Arquitectura prevista
- Next.js + TypeScript: panel de operadores
- PostgreSQL: expedientes, oficinas, eventos y auditoría
- Playwright: navegación asistida cuando esté autorizada
- Redis + BullMQ: cola de tareas
- Telegram: notificaciones
- Ubuntu 24.04: despliegue aislado de otros proyectos

## Flujo de estados
`PENDIENTE -> EN_PROCESO -> ESPERANDO_OPERADOR -> REANUDANDO -> RESULTADO -> CERRADO`

Los CAPTCHA, controles de acceso, límites de consulta y confirmaciones oficiales requieren intervención humana. No se implementan técnicas de evasión, acaparamiento o reventa de citas.

## Seguridad
- No guardar contraseñas, cookies ni tokens en Git
- Cifrar datos personales y limitar accesos
- Obtener consentimiento del cliente y definir plazos de conservación
- No publicar un navegador remoto sin autenticación fuerte y HTTPS

## Estado
Repositorio inicial. **No hay aún buscador funcional ni integración comprobada con ICPPlus.**
