# 🧾 API REST

## 📚 Índice

- [Catalogo de Procedimientos](#)
- [1. Instalación](#)
  - [1.1 Configuración de ecosystem](docs/ecosystem.example.md)
  - [1.2 Configuración de ecosystem para only developers](docs/ecosystem.example.dev.md)
- [3. Endpoints de Inicio de Sesión](docs/endpoints/endpoints_login.md)
- [Flujo de Peticiones](docs/flujo_peticiones.md)
- [Casos de Uso](docs/casos_uso.md)
- [Anexo](docs/anexos.md)

## 1. Información General

- **Nombre del API**: API de Aplicaciones (backend)
- **Versión**: v1.0.0
- **Responsable**: Angel R. Avila G.
- **Fecha**: 2025-06-12
- **Descripción**: API REST para peticiones mediante un API para diferentes proyectos e incluido la solicitud de información de la base de datos.

---

## 2. Autenticación

- **Tipo**: Bearer Token: JWT, CORS, OAuth2, Basic Auth.
- **Header requerido**:
  ```
  Authorization: Bearer {token}
  ```

---

## 3. Levantar el servicio

```
docker-compose up --build
```
