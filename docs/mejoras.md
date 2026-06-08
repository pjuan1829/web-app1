# Mejoras recomendadas para el sistema

## 1. Completar la implementación del backend

- Crear `api/src/routes.ts` y/o carpeta `api/src/routes/`.
- Añadir endpoints REST claros, por ejemplo:
  - `GET /api/catalogo`
  - `POST /api/auth/login`
  - `GET /api/items`
- Implementar la conexión con MySQL en `api/src/database/connection.ts`.
- Añadir validación de datos y manejo de errores.

## 2. Terminar el proyecto Django

- Agregar `manage.py` y la configuración estándar de Django.
- Incluir `settings.py`, `wsgi.py`, `asgi.py` y archivos de configuración necesarios.
- Crear una plantilla `index.html` funcional dentro de `web/core/templates/`.
- Ajustar las URL del proyecto para servicios locales.

## 3. Añadir documentación técnica y navegación interna

- Crear un `docs/README.md` con índice completo de documentación.
- Normalizar las rutas de los documentos y evitar referencias rotas.
- Añadir un esquema de API (`Swagger`/OpenAPI) para los endpoints existentes.

## 4. Mejorar la calidad del proyecto

- Añadir `tsconfig.json` completo para compilación TypeScript.
- Añadir `eslint` / `prettier` para mantener consistencia de código.
- Generar scripts de pruebas unitarias e integración.
- Implementar CI/CD con GitHub Actions o similar.

## 5. Seguridad y despliegue

- Configurar CORS en el backend.
- Proteger la API con autenticación JWT o similar.
- Externalizar las credenciales sensibles y no subirlas al repositorio.
- Ajustar `docker-compose.yml` para un entorno de producción con redes y volúmenes seguros.

## 6. Experiencia de usuario

- Añadir mensajes claros de error al frontend cuando el servicio de la API no esté disponible.
- Mostrar el estado de conexión al catálogo.
- Crear formatos JSON consistentes y documentación de respuesta.

## 7. Migraciones y base de datos

- Añadir scripts SQL o migraciones para crear las tablas necesarias.
- Usar un ORM ligero o modelo de datos en el backend para gestionar el catálogo.
- Implementar manejo de inicialización de datos de prueba.

