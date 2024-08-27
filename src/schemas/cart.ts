import { z } from '../config/zod';

export class CartSchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del carrito',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }

  static update() {
    return {
      body: z
        .object({
          status: z.enum(['pending', 'completed', 'canceled']).optional().openapi({
            description: 'Estado del carrito',
            example: 'pending',
          }),
        })
        .strict(),
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del carrito',
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
              description: 'Id del carrito',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
