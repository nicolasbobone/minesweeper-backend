import { z } from '../config/zod';

export class CellSchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id de la celda',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }

  static getAll() {
    return {
      body: z
        .object({
          gameId: z.number().min(1).optional().openapi({
            description: 'Id de la partida',
            example: 1,
          }),
          row: z.number().min(1).optional().openapi({
            description: 'Posición de la fila de la celda',
            example: 5,
          }),
          column: z.number().min(1).optional().openapi({
            description: 'Posición de la columna de la celda',
            example: 5,
          }),
          isMine: z.boolean().optional().openapi({
            description: 'Si la celda tiene mina',
            example: true,
          }),
          isRevealed: z.boolean().optional().openapi({
            description: 'Si la celda tiene mina y esta fue revelada',
            example: true,
          }),
          adjacentMines: z.number().min(0).optional().openapi({
            description: 'La cantidad de minas adyacentes a la celda',
            example: 0,
          }),
        })
        .strict(),
    };
  }

  static update() {
    return {
      body: z.array(
        z
          .object({
            id: z.number().min(1).openapi({
              description: 'Id de la celda',
              example: 1,
            }),
            gameId: z.number().min(1).openapi({
              description: 'Id de la partida',
              example: 1,
            }),
            row: z.number().min(0).openapi({
              description: 'Posición de la fila de la celda',
              example: 5,
            }),
            column: z.number().min(0).openapi({
              description: 'Posición de la columna de la celda',
              example: 5,
            }),
            isRevealed: z.boolean().openapi({
              description: 'Si la celda tiene mina y esta fue revelada',
              example: true,
            }),
            isMine: z.boolean().openapi({
              description: 'Si la celda tiene mina',
              example: true,
            }),
            adjacentMines: z.number().min(0).openapi({
              description: 'La cantidad de minas adyacentes a la celda',
              example: 0,
            }),
            isFlag: z.boolean().openapi({
              description: 'Si la celda tiene bandera',
              example: false,
            }),
          })
          .strict(),
      ),
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
              description: 'Id de la celda',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
