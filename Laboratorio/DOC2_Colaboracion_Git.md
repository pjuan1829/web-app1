# Documento 2 — Protocolo de Colaboración con Git

## 1. Objetivo

Este documento establece las reglas de trabajo en equipo con Git que **todos los integrantes deben seguir**. El cumplimiento será verificado por el docente revisando el historial del repositorio. Un proyecto funcional con commits solo de un integrante **no aprueba el criterio de colaboración**.

---

## 2. Estructura de Repositorio

Cada equipo trabaja en **un único repositorio** en GitHub/GitLab. El repositorio debe ser una copia (fork o nuevo repo) del proyecto base.

### 2.1 Ramas Requeridas

```
main                    ← rama de producción (solo merge vía PR aprobado)
├── develop             ← rama de integración (base para features)
│   ├── feature/INT-001-nombre-estudiante-1   ← tarea del estudiante 1
│   ├── feature/INT-002-nombre-estudiante-2   ← tarea del estudiante 2
│   ├── feature/INT-003-nombre-estudiante-3   ← tarea del estudiante 3
│   ├── feature/INT-004-nombre-estudiante-4   ← (si aplica)
│   └── feature/INT-005-nombre-estudiante-5   ← (si aplica)
└── hotfix/descripcion  ← solo para correcciones urgentes en producción
```

**Reglas:**
- `main` tiene protección de rama activada (require pull request antes de merge).
- Nadie hace `push` directo a `main` ni a `develop`.
- Cada feature branch corresponde a una tarea específica del backlog.

---

## 3. Convención de Nombres de Ramas

```
feature/<numero>-<descripcion-corta>
fix/<numero>-<descripcion-corta>
hotfix/<descripcion-corta>
```

**Ejemplos válidos:**
```
feature/001-api-crear-producto
feature/002-vista-detalle-producto
fix/003-precio-negativo
```

---

## 4. Convención de Commits (Conventional Commits)

Formato obligatorio:
```
<tipo>(<alcance>): <descripción en español, imperativo>

[cuerpo opcional — explica el QUÉ y POR QUÉ, no el CÓMO]

[pie opcional — referencias: Closes #12, Reviewed-by: ...]
```

### Tipos permitidos

| Tipo       | Cuándo usarlo                                            |
|------------|----------------------------------------------------------|
| `feat`     | Nueva funcionalidad                                      |
| `fix`      | Corrección de bug                                        |
| `refactor` | Cambio que no agrega funcionalidad ni corrige bug        |
| `style`    | Formato, espacios, comas (sin cambio de lógica)          |
| `test`     | Agregar o corregir pruebas                               |
| `docs`     | Solo documentación                                       |
| `chore`    | Actualización de dependencias, configuración, scripts    |
| `build`    | Cambios en Dockerfile, docker-compose, tsconfig, etc.   |

**Ejemplos:**
```
feat(api): agregar endpoint POST /api/productos
fix(web): corregir precio que se mostraba en negativo
docs(readme): actualizar instrucciones de instalación
chore(deps): actualizar express a 4.19.0
```

**Evitar:**
```
❌ "cambios"
❌ "fix"
❌ "actualizaciones varios archivos"
❌ "work in progress"
```

---

## 5. Flujo de Trabajo Paso a Paso

### 5.1 Configuración Inicial (una sola vez por integrante)

```bash
# 1. Clonar el repositorio del equipo
git clone https://github.com/<org>/<nombre-repo>.git
cd <nombre-repo>

# 2. Configurar identidad (IMPORTANTE: usar nombre real)
git config user.name "Nombre Apellido"
git config user.email "correo@universidad.edu"

# 3. Posicionarse en develop
git checkout develop
git pull origin develop
```

### 5.2 Iniciar una Nueva Tarea

```bash
# Siempre partir desde develop actualizado
git checkout develop
git pull origin develop

# Crear la feature branch
git checkout -b feature/001-api-listar-usuarios

# Trabajar, realizar commits frecuentes
git add api/src/domain/entities/usuario.ts
git commit -m "feat(domain): agregar entidad Usuario con campos básicos"

git add api/src/usecases/getUsuariosUseCase.ts
git commit -m "feat(usecases): agregar caso de uso GetUsuariosUseCase"
```

### 5.3 Mantener la Rama Actualizada

```bash
# Antes de abrir un PR, sincronizar con develop
git fetch origin
git rebase origin/develop

# Resolver conflictos si los hay, luego:
git rebase --continue
```

### 5.4 Abrir un Pull Request

1. Hacer push de la branch:
   ```bash
   git push origin feature/001-api-listar-usuarios
   ```
2. En GitHub/GitLab → **New Pull Request** → `feature/001-...` → `develop`.
3. El PR **debe incluir**:
   - Título descriptivo siguiendo Conventional Commits.
   - Descripción: qué se implementó, cómo probarlo.
   - Asignado a: el autor.
   - Revisores: al menos **un compañero del equipo**.
4. El revisor deja comentarios. El autor responde y hace commits de corrección.
5. Una vez aprobado (mínimo 1 aprobación), el autor hace merge con **Squash and Merge** o **Merge Commit**.

---

## 6. Merge Final a main

Al finalizar el sprint o cuando `develop` esté estable:

```bash
# El líder técnico abre un PR: develop → main
# Todos los integrantes deben haber tenido al menos 1 PR mergeado
# El docente revisará que la autoría de commits esté distribuida
```

---

## 7. Criterios de Verificación de Colaboración

El docente ejecutará los siguientes comandos para evaluar participación:

```bash
# Ver contribuciones por autor
git shortlog -sn --all

# Ver historial detallado con autores
git log --all --oneline --graph --decorate

# Ver commits por persona en rama develop
git log develop --pretty=format:"%an — %s" | sort

# Verificar ramas remotas creadas
git branch -r
```

**Requisitos mínimos por integrante:**

| Criterio                                  | Mínimo |
|-------------------------------------------|--------|
| Commits con nombre real en el historial   | 5      |
| Pull Requests abiertos                    | 1      |
| Pull Requests revisados (como revisor)    | 1      |
| Feature branch propia                     | 1      |

---

## 8. Errores Comunes a Evitar

| Error                              | Consecuencia                            | Solución                          |
|------------------------------------|-----------------------------------------|-----------------------------------|
| Commit como "root" o email falso   | No cuenta como contribución individual  | `git config user.name` correcto   |
| Push directo a `main`              | Viola política de rama protegida        | Siempre usar PR                   |
| Un integrante hace todo el código  | Penalización en criterio colaboración   | Dividir tareas antes de empezar   |
| Ramas sin mergearse al final       | Trabajo no integrado, no evaluable      | Completar PRs antes de la entrega |
| Merge sin revisión                 | No evidencia revisión entre pares       | Asignar reviewer antes del merge  |

---

## 9. Configuración del Repositorio (Checklist para el Líder)

- [ ] Crear repositorio en GitHub/GitLab (público o con acceso al docente).
- [ ] Crear rama `develop` a partir de `main`.
- [ ] Activar protección en `main`: requerir PR + 1 aprobación.
- [ ] Invitar a todos los integrantes como colaboradores.
- [ ] Agregar al docente como colaborador con rol *Reporter/Read* o invitarlo al repo.
- [ ] Crear el primer archivo `README.md` con nombres del equipo, temática y tecnologías.
- [ ] Hacer el primer commit entre todos (cada quien modifica una sección del README).
