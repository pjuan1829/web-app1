# Flujo de Peticiones

Este diagrama describe el recorrido de una solicitud en el proyecto desplegado con Docker.

1. El navegador carga la página Django en `http://localhost:8000`.
2. Django ejecuta la vista `web/core/views.py`.
3. La vista usa `CatalogApiClient` y `CatalogService` para hacer una petición `GET` a `http://api:3000/api/catalogo`.
4. El servidor Express en `api/src/app.ts` enruta la petición a `catalogoRoutes`.
5. El manejador consulta la base de datos MySQL y devuelve la respuesta JSON.
6. Django recibe la respuesta y renderiza la plantilla HTML.

> El sistema ahora incluye un backend funcional, un frontend Django funcional y una base de datos MySQL inicializada por Docker.

