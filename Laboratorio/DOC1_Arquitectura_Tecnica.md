# Documento 1 — Arquitectura Técnica del Proyecto Base

## 1. Visión General

Este proyecto implementa una solución **full-stack** usando una arquitectura de tres capas desacopladas, orquestadas con Docker Compose:

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENTE (navegador)                   │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / puerto 8000
┌──────────────────────────▼──────────────────────────────┐
│         WEB (Django / Python)   — puerto 8000           │
│         Renderiza HTML consumiendo la API REST          │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP interno / puerto 3000
┌──────────────────────────▼──────────────────────────────┐
│         API (Node.js / TypeScript)  — puerto 3000       │
│         Expone endpoints REST y aplica lógica           │
└──────────────────────────┬──────────────────────────────┘
                           │ TCP / puerto 3306
┌──────────────────────────▼──────────────────────────────┐
│         DB  (MySQL 8)   — puerto 3306                   │
│         Persistencia relacional                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

| Capa       | Tecnología          | Versión mínima | Propósito                          |
|------------|---------------------|----------------|------------------------------------|
| API        | Node.js             | 20 LTS         | Runtime del backend                |
| API        | TypeScript          | 5.x            | Tipado estático                    |
| API        | Express.js          | 4.18.x         | Framework HTTP                     |
| API        | mysql2              | 3.9.x          | Driver MySQL con Promises          |
| Web        | Python              | 3.12+          | Runtime del frontend               |
| Web        | Django              | 5.x            | Framework web MVC                  |
| Web        | requests            | 2.x            | Cliente HTTP para consumir la API  |
| BD         | MySQL               | 8.x            | Motor de base de datos relacional  |
| DevOps     | Docker              | 25+            | Contenedorización                  |
| DevOps     | Docker Compose      | 2.x            | Orquestación de servicios          |

---

## 3. Arquitectura Clean Architecture en la API

La carpeta `api/src/` sigue los principios de **Clean Architecture** (Robert C. Martin). Las dependencias apuntan **siempre hacia adentro** — las capas internas no conocen a las capas externas.

```
api/src/
├── domain/                    ← Capa de Dominio (núcleo)
│   ├── entities/              │   Modelos de negocio puros (sin framework)
│   │   └── catalogItem.ts     │   interface CatalogItem { id, name, description, price }
│   └── repositories/          │   Contratos (interfaces) de acceso a datos
│       └── catalogRepository.ts
│
├── usecases/                  ← Capa de Aplicación
│   └── getCatalogListUseCase.ts  Orquesta dominio + repositorio; no sabe de HTTP
│
├── infra/                     ← Capa de Infraestructura
│   ├── database/              │   Conexión real a MySQL
│   │   └── mysqlConnection.ts │   Implementa reintentos y manejo de errores
│   └── repositories/          │   Implementación concreta del repositorio
│       └── databaseCatalogRepository.ts
│
└── presentation/              ← Capa de Presentación (HTTP)
    ├── controllers/           │   Traduce HTTP → Use Case → HTTP
    │   └── catalogoController.ts
    └── routes/                │   Mapeo de rutas Express
        └── catalogoRoutes.ts
```

### 3.1 Regla de Dependencias

```
Presentation → UseCases → Domain ← Infrastructure
                   ↑                    ↑
           (usa interfaces)    (implementa interfaces)
```

- `CatalogoController` llama a `GetCatalogListUseCase`.
- `GetCatalogListUseCase` recibe un `CatalogRepository` (interfaz, no implementación).
- `DatabaseCatalogRepository` implementa esa interfaz usando MySQL.
- El dominio (`CatalogItem`, `CatalogRepository`) **no importa ningún framework**.

### 3.2 Flujo de una Petición GET /api/catalogo

```
Cliente HTTP
    │
    ▼
catalogoRoutes.ts       → registra GET /api/catalogo
    │
    ▼
CatalogoController.ts   → maneja Request/Response de Express
    │
    ▼
GetCatalogListUseCase   → execute() llama repository.getAll()
    │
    ▼
DatabaseCatalogRepository → SELECT * FROM catalog (MySQL)
    │
    ▼  JSON []
Cliente HTTP
```

---

## 4. Frontend Django (web/)

```
web/
├── config/
│   ├── settings.py    ← Configuración global (SECRET_KEY, INSTALLED_APPS, etc.)
│   └── urls.py        ← Router raíz de Django
│
└── core/              ← Aplicación principal
    ├── domain/
    │   └── catalog_item.py     ← Dataclass CatalogItem (espejo del dominio API)
    ├── infra/
    │   └── api_client.py       ← HTTP client que llama a la API Node
    ├── services/
    │   └── catalog_service.py  ← Lógica de transformación de respuesta
    ├── views.py                ← Vista Django: obtiene datos y renderiza
    ├── urls.py                 ← Rutas de la app core
    └── templates/
        └── index.html          ← Template HTML (Jinja/Django template)
```

El frontend **no accede directamente** a la base de datos. Solo consume la API REST mediante `CatalogApiClient`, lo que lo hace reemplazable por cualquier otro frontend (React, Vue, etc.).

---

## 5. Base de Datos

```sql
-- api/db/init.sql (ejecutado automáticamente por MySQL en el primer arranque)
CREATE TABLE catalog (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL DEFAULT 0.00
);
```

El archivo `init.sql` se monta como volumen en Docker Compose y MySQL lo ejecuta automáticamente en el primer arranque del contenedor.

---

## 6. Docker Compose — Orquestación

```yaml
# Resumen de servicios
db:   MySQL 8  → puerto 3306  (volumen persistente db_data)
api:  Node.js  → puerto 3000  (depends_on: db)
web:  Django   → puerto 8000  (depends_on: api)
```

Variables de entorno clave:

| Variable        | Servicio | Valor en Docker    | Descripción                        |
|-----------------|----------|--------------------|------------------------------------|
| `DB_HOST`       | api      | `db`               | Nombre del servicio MySQL          |
| `DB_PORT`       | api      | `3306`             | Puerto MySQL                       |
| `API_BASE_URL`  | web      | `http://api:3000`  | URL interna de la API desde Django |

---

## 7. Puntos de Extensión para Estudiantes

Al agregar una nueva entidad (ej: `Product`, `Order`, `User`) se debe:

1. **Domain** — Crear `src/domain/entities/producto.ts` con la interfaz.
2. **Repository Interface** — Crear `src/domain/repositories/productoRepository.ts`.
3. **Use Case** — Crear `src/usecases/createProductoUseCase.ts`.
4. **Infrastructure** — Crear `src/infra/repositories/databaseProductoRepository.ts`.
5. **Presentation** — Crear controller y registrar rutas en `app.ts`.
6. **SQL** — Agregar la tabla en `api/db/init.sql`.
7. **Frontend** — Agregar vista en Django, actualizar `api_client.py` y template.

Cada capa puede modificarse **independientemente** sin afectar a las demás, siempre que se respete la interfaz del repositorio.
