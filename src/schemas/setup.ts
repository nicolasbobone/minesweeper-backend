import { z } from '../config/zod';

export class SetupSchema {
  static createOrUpdate() {
    return {
      body: z
        .object({
          rows: z.number().min(8).max(24).optional().openapi({
            description: 'Cantidad de filas del tablero de juego',
            example: 10,
          }),
          columns: z.number().min(8).max(24).optional().openapi({
            description: 'Cantidad de columnas del tablero de juego',
            example: 10,
          }),
          minesCount: z.number().min(1).max(99).optional().openapi({
            description: 'Cantidad de minas del tablero de juego',
            example: 10,
          }),
        })
        .strict(),
    };
  }
}
