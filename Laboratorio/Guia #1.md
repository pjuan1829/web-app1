**Markdown limpio (.md)**

---

````md
# Guía de Laboratorio
## Desarrollo Avanzado de Aplicaciones Web

**Tema:** Consumo de API en TypeScript desde Django usando Docker 

---

## Distribución del tiempo

- Introducción: 10 min  
- Levantar API: 15 min  
- Django + consumo API: 45 min  
- Docker integración: 30 min  
- Prueba y cierre: 20 min  

---

## Objetivo

El estudiante será capaz de:

- Consumir una API REST en TypeScript
- Integrarla en una aplicación Django (MTV)
- Ejecutar ambos servicios con Docker

---

## Alcance

Incluye:
- Visualización de datos desde la API

No incluye:
- CRUD completo
- Autenticación
- JWT
- Seguridad avanzada

---

## Requisitos previos

- API TypeScript ya funcionando en Docker
- Proyecto Django base (opcional)
- Docker instalado y funcionando

---

## Parte 1: Levantar API

```bash
docker-compose up -d api
````

Verificar:

```bash
curl http://localhost:3000/api/usuarios
```

Resultado esperado: JSON

---

## Parte 2: Django básico

### Crear app (si no existe)

```bash
python manage.py startapp core
```

---

### Vista

Archivo: core/views.py

```python
import requests
from django.shortcuts import render

def usuarios(request):
    response = requests.get("http://api:3000/api/usuarios")
    data = response.json()
    return render(request, "usuarios.html", {"usuarios": data})
```

---

### Template

Archivo: templates/usuarios.html

```html
<h2>Usuarios</h2>
<ul>
  {% for u in usuarios %}
    <li>{{ u.nombre }} - {{ u.email }}</li>
  {% endfor %}
</ul>
```

---

### Rutas

Archivo: core/urls.py

```python
from django.urls import path
from .views import usuarios

urlpatterns = [
    path('usuarios/', usuarios),
]
```

Archivo principal urls.py

```python
from django.urls import path, include

urlpatterns = [
    path('', include('core.urls')),
]
```

---

## Parte 3: Docker

### Dockerfile

```dockerfile
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install django requests
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

---

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "3000:3000"

  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - api
```

---

### Levantar servicios

```bash
docker-compose up --build
```

---

## Parte 4: Prueba final

Abrir en navegador:

[http://localhost:8000/usuarios/](http://localhost:8000/usuarios/)

Resultado esperado: lista de usuarios proveniente de la API

---

## Actividad adicional (opcional)

Modificar el template:

```html
<strong>{{ u.nombre }}</strong>
```

Agregar contador:

```html
Total usuarios: {{ usuarios|length }}
```

---

## Preguntas de cierre

* ¿Por qué Django no accede directamente a la base de datos?
* ¿Qué ventajas tiene usar una API?
* ¿Qué sucede si la API no responde?

---

## Evaluación

* API funcionando: 25 puntos
* Django consume API correctamente: 40 puntos
* Docker ejecuta ambos servicios: 35 puntos

---

## Recomendación para el profesor

Para asegurar el éxito:

* Entregar API ya desarrollada
* Proveer base del proyecto Django: https://github.com/anghelo09/web-avg-app
* Verificar Docker antes de la clase

