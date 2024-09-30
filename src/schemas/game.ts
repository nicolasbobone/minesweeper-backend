import { GameDifficulty, GameResult, GameStatus } from '@prisma/client';
import { z } from '../config/zod';
import { CellSchema } from './cell';

export class GameSchema {
  static get() {
    return {
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id de la partida',
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
          userId: z.number().min(1).optional().openapi({
            description: 'Id de la partida',
            example: 1,
          }),
          startDate: z
            .preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional())
            .openapi({
              description: 'Fecha de inicio de la partida',
              example: new Date('2024-10-21T12:00:00'),
            }),
          endDate: z
            .preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional())
            .openapi({
              description: 'Fecha de fin de la partida',
              example: new Date('2024-10-21T12:00:00'),
            }),
          totalTime: z.number().min(0).optional().openapi({
            description: 'Tiempo total de la partida',
            example: 36000,
          }),
          result: z.enum([GameResult.WIN, GameResult.LOSE]).optional().openapi({
            description: 'Descripción del producto',
            example: 'WIN',
          }),
          status: z.enum([GameStatus.IN_PROGRESS, GameStatus.FINISHED]).optional().openapi({
            description: 'Estado de la partida',
            example: 'FINISHED',
          }),
          rows: z.number().min(1).optional().openapi({
            description: 'Cantidad de filas del tablero de juego',
            example: 10,
          }),
          columns: z.number().min(1).optional().openapi({
            description: 'Cantidad de columnas del tablero de juego',
            example: 10,
          }),
          minesCount: z.number().min(1).optional().openapi({
            description: 'Cantidad de minas del tablero de juego',
            example: 10,
          }),
          difficulty: z.enum([GameDifficulty.EASY, GameDifficulty.MEDIUM, GameDifficulty.HARD]).optional().openapi({
            description: 'Dificultad de la partida',
            example: 'MEDIUM',
          }),
        })
        .strict(),
    };
  }

  static update() {
    return {
      body: z
        .object({
          endDate: z
            .preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional())
            .openapi({
              description: 'Fecha de fin de la partida',
              example: new Date('2024-10-21T12:00:00'),
            }),
          totalTime: z.number().min(0).optional().openapi({
            description: 'Tiempo total de la partida',
            example: 100,
          }),
          result: z.enum([GameResult.WIN, GameResult.LOSE]).optional().openapi({
            description: 'Descripción del producto',
            example: 'WIN',
          }),
          status: z.enum([GameStatus.IN_PROGRESS, GameStatus.FINISHED]).optional().openapi({
            description: 'Estado de la partida',
            example: 'FINISHED',
          }),
          cells: CellSchema.update().body.optional().openapi({
            description: 'Lista de celdas del juego',
            example: [],
          }),
        })
        .strict(),
      params: z
        .object({
          id: z
            .string()
            .min(1)
            .openapi({
              description: 'Id de la partida',
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
              description: 'Id de la partida',
              example: '1',
              param: { in: 'path', name: 'id' },
            }),
        })
        .strict(),
    };
  }
}
