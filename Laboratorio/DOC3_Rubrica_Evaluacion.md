# Documento 3 — Rúbrica de Evaluación del Proyecto Grupal

**Asignatura:** Desarrollo de Software / Programación Web  
**Modalidad:** Proyecto grupal (3 a 5 integrantes)  
**Puntaje total:** 100 puntos  
**Entrega:** Repositorio Git + demostración en vivo

---

## Tabla de Criterios

### I. Funcionalidad de la Aplicación (35 pts)

| Criterio | Excelente (100%) | Aceptable (70%) | Deficiente (40%) | No entregado (0%) | Pts |
|---|---|---|---|---|---|
| **1.1 API REST operativa** | Todos los endpoints responden correctamente con status HTTP apropiados (200, 201, 400, 404, 500) | La mayoría de endpoints funciona; algunos errores menores | Solo funciona GET básico; no hay manejo de errores | La API no inicia o no responde | 10 |
| **1.2 Frontend funcional** | Las vistas muestran datos reales de la API, con mensajes de error al fallar la conexión | Las vistas muestran datos pero sin manejo de errores | La página carga pero con datos estáticos/hardcoded | El frontend no carga | 8 |
| **1.3 Base de datos** | SQL normalizado, relaciones correctas, datos de prueba insertados, sin errores al iniciar | BD funciona pero sin normalización o sin datos de prueba | BD creada pero con errores de diseño | No existe la BD o no conecta | 8 |
| **1.4 Docker Compose** | `docker-compose up` levanta los 3 servicios sin intervención manual | Levanta con pasos manuales adicionales | Solo levanta parcialmente | No existe o no funciona | 5 |
| **1.5 Temática implementada** | Todas las entidades de la temática elegida están implementadas (CRUD completo) | Al menos 2 entidades implementadas con operaciones básicas | Solo 1 entidad, operación de lectura | Solo el proyecto base sin cambios | 4 |

---

### II. Calidad del Código (20 pts)

| Criterio | Excelente (100%) | Aceptable (70%) | Deficiente (40%) | No entregado (0%) | Pts |
|---|---|---|---|---|---|
| **2.1 Arquitectura en capas** | Se respeta Clean Architecture: Domain/UseCases/Infra/Presentation sin dependencias inversas | Capas presentes pero con 1-2 violaciones de dependencia | Capas mezcladas; lógica de negocio en controladores | Código monolítico en un solo archivo | 8 |
| **2.2 Nombres y legibilidad** | Variables, funciones y clases con nombres descriptivos; sin abreviaturas ambiguas | La mayoría de nombres son descriptivos | Muchos nombres crípticos (`var a`, `tmp`, etc.) | Código ilegible | 5 |
| **2.3 TypeScript tipado** | Todos los tipos explícitos; sin `any` injustificado; interfaces para entidades | Tipos en la mayoría del código; algunos `any` | Uso extensivo de `any`; sin interfaces | Sin TypeScript; JavaScript puro | 4 |
| **2.4 Manejo de errores** | Try/catch en cada operación asíncrona; mensajes de error claros; logs útiles | Manejo de errores parcial | Solo manejo básico; algunos crashes sin capturar | Sin manejo de errores | 3 |

---

### III. Colaboración y Git (30 pts)

| Criterio | Excelente (100%) | Aceptable (70%) | Deficiente (40%) | No entregado (0%) | Pts |
|---|---|---|---|---|---|
| **3.1 Distribución de commits** | Todos los integrantes tienen ≥5 commits con nombre real; contribuciones equilibradas | Todos contribuyeron pero con desequilibrio (1 hace 80%) | 1 o 2 integrantes sin commits | Solo 1 persona cometió todo | 10 |
| **3.2 Uso de ramas** | Cada integrante tiene su feature branch; ramas nombradas con convención correcta | La mayoría tiene branches propias; algunas sin convención | Pocas ramas; trabajo directo en develop/main | Todo en una sola rama | 8 |
| **3.3 Pull Requests y revisión** | Cada integrante abrió ≥1 PR y revisó ≥1 PR de otro; comentarios constructivos evidentes | PRs existentes pero sin revisión entre pares | Solo algunos PRs; sin revisiones | Sin Pull Requests | 7 |
| **3.4 Mensajes de commit** | Siguen Conventional Commits (`feat`, `fix`, `docs`, etc.); descriptivos en español | La mayoría sigue la convención | Mensajes poco descriptivos pero no vacíos | Mensajes vacíos o genéricos (`fix`, `changes`) | 5 |

---

### IV. Documentación (15 pts)

| Criterio | Excelente (100%) | Aceptable (70%) | Deficiente (40%) | No entregado (0%) | Pts |
|---|---|---|---|---|---|
| **4.1 README del proyecto** | Incluye: descripción, integrantes, instrucciones de instalación, endpoints documentados, capturas | Instrucciones básicas y descripción | Solo título y nombres | Sin README o copiado sin modificar | 5 |
| **4.2 Documentación de API** | Todos los endpoints documentados (URL, método, request, response, errores posibles) | Endpoints listados sin ejemplos | Solo menciona que existe una API | Sin documentación de API | 5 |
| **4.3 Diagrama de BD** | Diagrama entidad-relación correcto con PKs, FKs y tipos de dato | Diagrama presente con errores menores | Tabla simple sin relaciones | Sin diagrama | 3 |
| **4.4 Guía de contribución** | Explica cómo agregar un nuevo colaborador, crear branches y abrir PRs | Instrucciones parciales | Solo menciona que se usa Git | Sin guía | 2 |

---

## Escala de Calificación Final

| Puntaje Total | Calificación |
|---------------|--------------|
| 90 – 100      | Excelente    |
| 75 – 89       | Bueno        |
| 60 – 74       | Aceptable    |
| 40 – 59       | Deficiente   |
| 0 – 39        | Insuficiente |

---

## Checklist de Entrega

El equipo debe verificar **todos** los ítems antes de enviar el link del repositorio:

### Repositorio
- [ ] URL del repositorio enviada al docente con acceso habilitado.
- [ ] Rama `main` contiene el código final funcional.
- [ ] Rama `develop` existe y tiene el historial de integración.
- [ ] Cada integrante tiene al menos una feature branch propia (puede estar mergeada).

### Funcionalidad
- [ ] `docker-compose up --build` levanta la solución completa sin errores.
- [ ] La API responde en `http://localhost:3000/api/<recurso>`.
- [ ] El frontend carga en `http://localhost:8000` y muestra datos reales.
- [ ] Los datos iniciales están en `init.sql` y se cargan automáticamente.

### Colaboración
- [ ] `git shortlog -sn` muestra contribuciones de TODOS los integrantes.
- [ ] Hay al menos tantos PRs mergeados como integrantes en el equipo.
- [ ] Los commits siguen Conventional Commits.

### Documentación
- [ ] README actualizado con el nombre del equipo, temática e instrucciones.
- [ ] Endpoints de la API documentados en README o archivo separado.
- [ ] Diagrama de base de datos incluido (imagen o archivo `.sql` comentado).

---

## Nota sobre Evaluación Individual

Aunque el proyecto es grupal, el docente puede solicitar a cualquier integrante que **explique en vivo** cualquier parte del código que lleva su firma en el historial de Git. No poder explicar el propio trabajo reduce la nota individual hasta un 50%, independientemente de la nota grupal.

---

## Fecha de Entrega y Demo

| Hito                          | Fecha            | Modalidad           |
|-------------------------------|------------------|---------------------|
| Repositorio inicializado      | Semana 1         | Link en plataforma  |
| Avance 50% (al menos 1 PR c/u) | Semana 3        | Revisión de commits |
| Entrega final                 | Semana 5         | Link + demo en vivo |
| Demo y defensa                | Semana 6         | Presencial/virtual  |
