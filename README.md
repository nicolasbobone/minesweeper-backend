# Minesweeper Backend

## Tabla de Contenidos

- [Configuración de Base de Datos](#configuración-de-base-de-datos)
  - [Paso 1: Migraciones](#paso-1-migraciones)
  - [Paso 2: Creación de Triggers](#paso-2-creación-de-triggers)
- [Generar Documentación con Swagger](#generar-documentación-con-swagger)
- [Correr el Proyecto](#correr-el-proyecto)

## Configuración de Base de Datos

### Paso 1: Migraciones

Primero, aplica las migraciones de la base de datos para crear las tablas necesarias:

```bash
npm run migrate:dev

```

### Paso 2: Creación de Triggers

Es necesario crear un trigger en la base de datos para asegurar la correcta funcionalidad de la aplicación. Este trigger maneja la actualización automática del campo `updated_at`.

#### Archivos SQL de Triggers

El archivo SQL que define el trigger se encuentran en la carpeta `prisma/triggers`:

- `prisma/triggers/update_timestamp.sql`: Actualiza automáticamente el campo `updated_at` en las tablas relevantes.

#### Aplicar el Trigger a la Base de Datos

Para aplicar el trigger a tu base de datos, ejecuta el archivo SQL utilizando un cliente de base de datos o un script de migración manual. Por ejemplo, usando `psql`:

```bash
psql -U <username> -d <database> -f prisma/triggers/update_timestamp.sql

```

## Generar Documentación con Swagger

Después de crear o actualizar un esquema en tu API, ejecuta el siguiente comando para generar la documentación de Swagger utilizando los esquemas de Zod:

```bash
npm run generate-docs

```

## Correr el Proyecto

Para iniciar el servidor en desarrollo, usa el siguiente comando:

```bash
npm install
npm run dev

```
