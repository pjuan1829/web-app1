# Proyecto Final — Desarrollo de Sistema Web Full-Stack en Equipo

**Modalidad:** Grupos de 3 a 5 estudiantes  
**Base tecnológica:** Proyecto `web-avg-app` (Node.js + TypeScript + Django + MySQL + Docker)  
**Duración:** 5 semanas  
**Repositorio:** Un repositorio por equipo, bifurcado o creado a partir del proyecto base

---

## Descripción General

Cada equipo debe **extender el proyecto base** para construir un sistema web funcional, aplicando los mismos patrones de arquitectura (Clean Architecture), tecnologías y orquestación con Docker Compose, pero adaptado a una temática de negocio real.

El sistema debe incluir al menos:
- **3 entidades** de dominio relacionadas entre sí.
- **CRUD completo** para al menos 2 de las 3 entidades (Create, Read, Update, Delete).
- **2 consultas de negocio** adicionales al simple listar (búsqueda, filtros, totales, estadísticas).
- **Frontend Django** que muestre, cree y modifique datos mediante formularios HTML.
- **Persistencia real** en MySQL con relaciones (FK).
- **Colaboración Git verificable** según el Documento 2.

---

## Temáticas Disponibles

Cada equipo elige **una** temática. No puede haber dos equipos con la misma.

---

### Temática A — Tienda en Línea

**Descripción:** Sistema de gestión de una tienda con catálogo de productos, carrito de compras y registro de pedidos.

**Entidades principales:**
```
Producto  (id, nombre, descripción, precio, stock, categoría_id)
Categoría (id, nombre, descripción)
Pedido    (id, fecha, total, estado, lista de items)
ItemPedido(id, pedido_id, producto_id, cantidad, precio_unitario)
```

**Endpoints requeridos en la API:**

| Método | URL                        | Descripción                          |
|--------|----------------------------|--------------------------------------|
| GET    | /api/productos             | Listar productos con stock > 0       |
| GET    | /api/productos/:id         | Detalle de un producto               |
| POST   | /api/productos             | Crear producto                       |
| PUT    | /api/productos/:id         | Actualizar stock/precio              |
| DELETE | /api/productos/:id         | Eliminar producto                    |
| GET    | /api/categorias            | Listar categorías                    |
| POST   | /api/pedidos               | Crear pedido (descuenta stock)       |
| GET    | /api/pedidos               | Listar pedidos                       |
| GET    | /api/pedidos/:id           | Detalle del pedido con items         |

**Vistas Django requeridas:**

- Catálogo de productos con filtro por categoría.
- Formulario para agregar productos al carrito.
- Resumen del pedido antes de confirmar.
- Historial de pedidos con estado (pendiente / completado / cancelado).

**Consultas de negocio:**
1. Productos con stock menor a N (alerta de inventario bajo).
2. Total de ventas agrupado por categoría.

---

### Temática B — Sistema de Inventario y Bodegas

**Descripción:** Control de entradas y salidas de insumos en múltiples bodegas de una empresa.

**Entidades principales:**
```
Insumo      (id, nombre, unidad_medida, stock_total, stock_minimo)
Bodega      (id, nombre, ubicación, responsable)
Movimiento  (id, tipo[entrada/salida], fecha, cantidad, insumo_id, bodega_id, motivo)
```

**Endpoints requeridos en la API:**

| Método | URL                           | Descripción                            |
|--------|-------------------------------|----------------------------------------|
| GET    | /api/insumos                  | Listar insumos                         |
| GET    | /api/insumos/bajos-stock      | Insumos por debajo del stock mínimo    |
| POST   | /api/insumos                  | Registrar nuevo insumo                 |
| PUT    | /api/insumos/:id              | Actualizar datos del insumo            |
| GET    | /api/bodegas                  | Listar bodegas                         |
| POST   | /api/movimientos              | Registrar entrada o salida             |
| GET    | /api/movimientos              | Historial de movimientos               |
| GET    | /api/movimientos?insumo_id=X  | Movimientos de un insumo específico    |

**Vistas Django requeridas:**

- Dashboard con tarjetas: total insumos, insumos bajo mínimo, movimientos hoy.
- Tabla de insumos con alerta visual en rojo si stock < mínimo.
- Formulario para registrar entrada/salida con selección de bodega.
- Historial de movimientos con filtro por fecha e insumo.

**Consultas de negocio:**
1. Insumos con stock por debajo del mínimo (reporte de alerta).
2. Movimientos del último mes agrupados por tipo (entradas vs salidas).

---

### Temática C — Sistema de Reservas para Restaurante

**Descripción:** Plataforma para gestionar mesas, reservas de clientes y menú del día.

**Entidades principales:**
```
Mesa     (id, numero, capacidad, ubicacion[interior/exterior/terraza])
Cliente  (id, nombre, telefono, email)
Reserva  (id, fecha, hora, num_personas, estado, mesa_id, cliente_id, notas)
Plato    (id, nombre, descripcion, precio, categoria[entrada/principal/postre])
```

**Endpoints requeridos en la API:**

| Método | URL                             | Descripción                               |
|--------|---------------------------------|-------------------------------------------|
| GET    | /api/mesas/disponibles?fecha=X  | Mesas disponibles para una fecha          |
| GET    | /api/mesas                      | Listar todas las mesas                    |
| POST   | /api/reservas                   | Crear reserva (valida disponibilidad)     |
| GET    | /api/reservas                   | Listar reservas                           |
| PUT    | /api/reservas/:id               | Actualizar estado (confirmar/cancelar)    |
| GET    | /api/clientes                   | Listar clientes                           |
| POST   | /api/clientes                   | Registrar cliente                         |
| GET    | /api/platos                     | Listar menú del día                       |

**Vistas Django requeridas:**

- Vista de calendario/tabla semanal con reservas del día.
- Formulario de nueva reserva con selección de mesa disponible.
- Panel de gestión: confirmar / cancelar reservas pendientes.
- Menú del restaurante organizado por categoría.

**Consultas de negocio:**
1. Disponibilidad de mesas para una fecha y hora específica.
2. Reservas del día actual agrupadas por turno (mediodía / noche).

---

### Temática D — Biblioteca Digital

**Descripción:** Sistema de gestión de libros, socios y préstamos de una biblioteca.

**Entidades principales:**
```
Libro      (id, titulo, autor, isbn, editorial, año, stock_disponible, genero_id)
Genero     (id, nombre)
Socio      (id, nombre, carnet, email, fecha_registro, estado[activo/suspendido])
Prestamo   (id, fecha_prestamo, fecha_devolucion, fecha_real_devolucion, libro_id, socio_id, estado)
```

**Endpoints requeridos en la API:**

| Método | URL                          | Descripción                              |
|--------|------------------------------|------------------------------------------|
| GET    | /api/libros                  | Buscar/listar libros disponibles         |
| GET    | /api/libros?genero=X         | Filtrar por género                       |
| POST   | /api/libros                  | Agregar libro al catálogo                |
| PUT    | /api/libros/:id              | Actualizar información                   |
| GET    | /api/socios                  | Listar socios activos                    |
| POST   | /api/socios                  | Registrar nuevo socio                    |
| POST   | /api/prestamos               | Crear préstamo (descuenta stock)         |
| PUT    | /api/prestamos/:id/devolver  | Registrar devolución (incrementa stock)  |
| GET    | /api/prestamos/vencidos      | Préstamos con fecha vencida              |

**Vistas Django requeridas:**

- Catálogo de libros con buscador por título o autor.
- Formulario de préstamo: seleccionar socio y libro.
- Lista de préstamos activos con días restantes.
- Reporte de préstamos vencidos con datos de contacto del socio.

**Consultas de negocio:**
1. Libros más prestados en los últimos 30 días.
2. Socios con préstamos vencidos (mora).

---

### Temática E — Clínica / Consultorio Médico

**Descripción:** Sistema de gestión de pacientes, médicos y citas médicas.

**Entidades principales:**
```
Medico    (id, nombre, especialidad, telefono, email, activo)
Paciente  (id, nombre, fecha_nacimiento, telefono, email, tipo_sangre)
Cita      (id, fecha, hora, motivo, estado[pendiente/realizada/cancelada], medico_id, paciente_id)
Nota      (id, cita_id, diagnostico, tratamiento, observaciones)
```

**Endpoints requeridos en la API:**

| Método | URL                               | Descripción                              |
|--------|-----------------------------------|------------------------------------------|
| GET    | /api/medicos                      | Listar médicos activos                   |
| GET    | /api/medicos/:id/agenda?fecha=X   | Citas del médico en una fecha            |
| GET    | /api/pacientes                    | Listar pacientes                         |
| GET    | /api/pacientes/:id                | Detalle del paciente con historial       |
| POST   | /api/pacientes                    | Registrar paciente                       |
| POST   | /api/citas                        | Agendar cita (valida disponibilidad)     |
| PUT    | /api/citas/:id                    | Actualizar estado de la cita             |
| POST   | /api/notas                        | Agregar nota/diagnóstico a una cita      |

**Vistas Django requeridas:**

- Agenda del día: citas por médico con estado visual.
- Formulario para agendar nueva cita.
- Historial clínico del paciente (citas + notas).
- Panel de citas pendientes para hoy.

**Consultas de negocio:**
1. Disponibilidad de un médico para una fecha específica.
2. Citas atendidas por médico en el mes actual (productividad).

---

## Distribución Sugerida de Tareas por Integrante

### Equipo de 3 personas

| Integrante | Área de responsabilidad                                   |
|------------|-----------------------------------------------------------|
| Dev 1      | Dominio + Use Cases + SQL (entidades y lógica de negocio) |
| Dev 2      | API REST (infraestructura + controladores + rutas)        |
| Dev 3      | Frontend Django (vistas, templates, formularios)          |

### Equipo de 5 personas

| Integrante | Área de responsabilidad                                           |
|------------|-------------------------------------------------------------------|
| Dev 1      | Dominio (entities + repository interfaces) + SQL                 |
| Dev 2      | Use Cases (lógica de negocio para entidades principales)         |
| Dev 3      | API Infrastructure (implementación de repositorios + conexión BD) |
| Dev 4      | API Presentation (controllers + routes + validaciones HTTP)      |
| Dev 5      | Frontend Django completo (vistas + templates + formularios CSS)  |

---

## Entregables por Semana

| Semana | Entregable                                           | Verificación                           |
|--------|------------------------------------------------------|----------------------------------------|
| 1      | Repositorio creado, ramas configuradas, README base  | URL del repo + `git branch -r`         |
| 2      | SQL con todas las tablas + datos de prueba           | `init.sql` funcional                   |
| 3      | Al menos 1 endpoint por integrante funcionando       | `git shortlog` + Pull Requests         |
| 4      | CRUD completo de 2 entidades + frontend básico       | Demo rápida + PRs mergeados            |
| 5      | Sistema completo + documentación + Docker funcional  | `docker-compose up` + repositorio      |
| 6      | Defensa: demo en vivo + preguntas individuales       | Demostración presencial/virtual        |

---

## Estructura de Archivos Esperada al Final

```
<nombre-del-proyecto>/
├── api/
│   ├── db/
│   │   └── init.sql                  ← Tablas de la temática elegida
│   └── src/
│       ├── domain/
│       │   ├── entities/             ← Entidades de la temática
│       │   └── repositories/         ← Interfaces de repositorio
│       ├── usecases/                 ← Un archivo por caso de uso
│       ├── infra/
│       │   ├── database/
│       │   └── repositories/         ← Implementaciones MySQL
│       └── presentation/
│           ├── controllers/
│           └── routes/
│
├── web/
│   └── core/
│       ├── domain/                   ← Dataclasses equivalentes
│       ├── infra/
│       │   └── api_client.py         ← Extendido con nuevos endpoints
│       ├── services/                 ← Lógica de presentación
│       ├── templates/                ← Al menos 3 templates HTML
│       ├── views.py                  ← Vistas para cada sección
│       └── urls.py
│
├── docker-compose.yml
├── README.md                         ← Actualizado con la temática
└── docs/
    ├── api.md                        ← Documentación de endpoints
    └── er-diagram.png                ← Diagrama entidad-relación
```

---

## Preguntas Frecuentes

**¿Puedo usar React o Vue en lugar de Django?**  
No para este proyecto. El frontend en Django es un requisito de la asignatura para practicar arquitectura de servicios separados. Si terminas antes, puedes agregar un frontend adicional como mejora opcional.

**¿Debo implementar autenticación de usuarios?**  
No es obligatorio. Si lo incluyes se evalúa como trabajo extra positivo, pero no es parte de la rúbrica base.

**¿Puedo cambiar las entidades de la temática?**  
Sí, con aprobación del docente. Las entidades listadas son un mínimo; puedes agregar más.

**¿Qué pasa si un compañero no contribuye?**  
El docente evaluará a cada integrante individualmente en base a su historial Git. No hacer commits = no aprobar la rúbrica de colaboración, independientemente del resultado grupal.

**¿Se puede usar un ORM como Sequelize o Prisma?**  
Se puede proponer al docente. Por defecto, el proyecto base usa `mysql2` directamente para entender SQL. Si se cambia el driver, se debe documentar la decisión.
