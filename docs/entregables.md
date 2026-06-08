# Entregables del Proyecto Web AVG App

Este documento describe los 5 entregables principales del proyecto y cómo se relacionan entre sí.

## 1. Backend API REST con Node.js / TypeScript

- Servicio ubicado en `api/`.
- Expone el endpoint `GET /api/catalogo`.
- Conecta con MySQL usando `mysql2/promise`.
- Implementa un patrón limpio de dominio, repositorio y caso de uso.
- Maneja reintentos de conexión a la base de datos para el arranque en Docker.

## 2. Base de datos MySQL con datos iniciales

- Servicio `db` orquestado por Docker Compose.
- Base de datos `app_db` creada automáticamente.
- Script de inicialización en `api/db/init.sql`.
- La configuración de Docker monta el script en `/docker-entrypoint-initdb.d/`.

## 3. Frontend Django en Python consumiendo la API

- Aplicación Django ubicada en `web/`.
- Vista principal usa `CatalogApiClient` y `CatalogService`.
- Consume el endpoint `http://api:3000/api/catalogo` dentro de Docker.
- Renderiza datos en una tabla HTML amigable.

## 4. Orquestación Docker Compose y script de arranque

- Archivo principal: `docker-compose.yml`.
- Servicios: `db`, `api`, `web`.
- Variables de entorno definidas para cada servicio.
- Script de arranque: `run.sh`.
- Ejecutar con:
  - `chmod +x run.sh`
  - `./run.sh`

## 5. Documentación y flujo de entrega

- Documentación principal en `README.md`.
- Flujo de peticiones descrito en `docs/flujo_peticiones.md`.
- Entregables resumidos en `docs/entregables.md`.
- Mejora continua del proyecto con archivos de arquitectura y buenas prácticas.

## Cómo verificar cada entregable

1. Abrir `http://localhost:3000` para comprobar que la API está disponible.
2. Abrir `http://localhost:8000` para ver el frontend Django que muestra los datos del catálogo.
3. Confirmar que MySQL usa la base `app_db` y carga los datos de `api/db/init.sql`.
4. Revisar que la aplicación arranca correctamente con `./run.sh`.
5. Consultar la documentación para comprender el flujo de integración entre servicios.
