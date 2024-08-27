import { z } from '../config/zod';

export class CategorySchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id de la categoría',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }

  static create() {
    return {
      body: z
        .object({
          name: z.string().min(3).openapi({
            description: 'Nombre de la categoría',
            example: 'Libros',
          }),
          description: z.string().optional().openapi({
            description: 'Descripción de la categoría',
            example: 'Recomendación de libros',
          }),
        })
        .strict(),
    };
  }

  static update() {
    return {
      body: z
        .object({
          name: z.string().min(3).optional().openapi({
            description: 'Descripción de la categoría',
            example: 'Recomendación de libros',
          }),
          description: z.string().optional().openapi({
            description: 'Descripción de la categoría',
            example: 'Recomendación de libros',
          }),
        })
        .strict(),
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del cliente',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }

  static delete() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id de la categoría',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
