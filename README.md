# FlickBox Backend

Este es el backend de una aplicación de comercio electrónico desarrollado con Node.js, TypeScript y Prisma. Provee la API para la autenticación de usuarios, la gestión de productos, el carrito de compras y la documentación con Swagger.

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

Es necesario crear varios triggers en la base de datos para asegurar la correcta funcionalidad de la aplicación. Estos triggers manejan la actualización automática del campo `updated_at`, garantizan que un usuario no tenga más de un carrito en estado "pendiente" y aseguran que solo se puedan agregar productos a carritos en estado "pendiente".

#### Archivos SQL de Triggers

Los archivos SQL que definen los triggers se encuentran en la carpeta `prisma/triggers`:

- `prisma/triggers/update_timestamp.sql`: Actualiza automáticamente el campo `updated_at` en las tablas relevantes.
- `prisma/triggers/unique_pending_cart_per_user.sql`: Limita la creación de dos carritos en estado pendiente para el mismo usuario.
- `prisma/triggers/validate_cart_status.sql`: Limita la creación de productos en carritos solo si el carrito está en estado pendiente.

#### Aplicar los Triggers a la Base de Datos

Para aplicar los triggers a tu base de datos, ejecuta los archivos SQL utilizando un cliente de base de datos o un script de migración manual. Por ejemplo, usando `psql`:

```bash
psql -U <username> -d <database> -f prisma/triggers/update_timestamp.sql
psql -U <username> -d <database> -f prisma/triggers/unique_pending_cart_per_user.sql
psql -U <username> -d <database> -f prisma/triggers/validate_cart_status.sql

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
