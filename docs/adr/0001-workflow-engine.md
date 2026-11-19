# ADR 0001: motor de workflows

Estado: propuesto.

Iniciar con BullMQ/Redis para colas y PostgreSQL para la fuente de verdad. Diseñar interfaces para evolucionar a Temporal si se requieren procesos duraderos más complejos. Nunca ejecutar dos motores para la misma operación. Confirmaciones oficiales requieren verificación humana o evidencia verificable.
