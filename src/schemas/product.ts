import { z } from '../config/zod';

export class ProductSchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del producto',
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
            description: 'Nombre del producto',
            example: 'Clean code JS',
          }),
          price: z.number().min(0).openapi({
            description: 'Precio del producto',
            example: 100,
          }),
          categoryId: z.number().min(1).openapi({
            description: 'Id de la categoría del producto',
            example: 1,
          }),
          description: z.string().openapi({
            description: 'Descripción del producto',
            example: 'Mejora tu código con este gran libro.',
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
            description: 'Nombre del producto',
            example: 'Clean code JS',
          }),
          price: z.number().min(0).optional().openapi({
            description: 'Precio del producto',
            example: 100,
          }),
          categoryId: z.number().min(1).optional().openapi({
            description: 'Id de la categoría del producto',
            example: 1,
          }),
          description: z.string().optional().openapi({
            description: 'Descripción del producto',
            example: 'Mejora tu código con este gran libro.',
          }),
        })
        .strict(),
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del producto',
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
              description: 'Id del producto',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
