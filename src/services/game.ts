import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Game } from '../interfaces/game';

const table = prisma.game;

export class GameService {
  static async getAll(game: Partial<Game>): Promise<Game[]> {
    try {
      return await table.findMany({
        where: game,
        include: {
          cells: {
            select: {
              id: true,
              gameId: true,
              row: true,
              column: true,
              isMine: true,
              isRevealed: true,
              adjacentMines: true,
              isFlag: true,
            },
            orderBy: [{ column: 'asc' }, { row: 'asc' }],
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all games', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<Game | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          cells: {
            select: {
              id: true,
              gameId: true,
              row: true,
              column: true,
              isMine: true,
              isRevealed: true,
              adjacentMines: true,
              isFlag: true,
            },
            orderBy: [{ column: 'asc' }, { row: 'asc' }],
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one game', error);
    }
  }

  static async create(game: Game): Promise<Game> {
    try {
      return await table.create({
        data: game,
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create game', error);
      }
    }
  }

  static async update({ id }: { id: string }, data: Partial<Game>): Promise<Game | null> {
    try {
      return await table.update({
        where: {
          id: parseInt(id),
        },
        data,
        include: {
          cells: {
            select: {
              id: true,
              gameId: true,
              row: true,
              column: true,
              isMine: true,
              isRevealed: true,
              adjacentMines: true,
              isFlag: true,
            },
            orderBy: [{ column: 'asc' }, { row: 'asc' }],
          },
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create game', error);
      }
    }
  }

  static async delete({ id }: { id: string }): Promise<Game | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          cells: {
            select: {
              id: true,
              gameId: true,
              row: true,
              column: true,
              isMine: true,
              isRevealed: true,
              adjacentMines: true,
              isFlag: true,
            },
            orderBy: [{ column: 'asc' }, { row: 'asc' }],
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete game', error);
    }
  }
}
