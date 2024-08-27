import { z } from '../config/zod';

export class ProductCartSchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del registro del carrito con los productos',
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
          productId: z.number().min(1).openapi({
            description: 'Id del producto en el carrito',
            example: 1,
          }),
          quantity: z.number().min(1).openapi({
            description: 'Cantidad del producto en el carrito',
            example: 1,
          }),
        })
        .strict(),
    };
  }

  static update() {
    return {
      body: z
        .object({
          quantity: z.number().min(1).optional().openapi({
            description: 'Cantidad del producto en el carrito',
            example: 1,
          }),
        })
        .strict(),
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id del registro del carrito con los productos',
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
              description: 'Id del registro del carrito con los productos',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
