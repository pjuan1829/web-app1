# Instalación y Ejecución

## Requisitos
- Docker y Docker Compose
- Node.js 20+
- Python 3.11+

## Levantar la solución

```bash
docker-compose up --build
```

## Inicializar la base de datos

Si necesita preparar la base de datos MySQL manualmente, use el script:

```bash
mysql -h 127.0.0.1 -P 3306 -u root -proot < api/db/init.sql
```

## Acceso
- API: `http://localhost:3000`
- Frontend: `http://localhost:8000`

## Notas
El frontend Django muestra el catálogo que consume desde la API.
