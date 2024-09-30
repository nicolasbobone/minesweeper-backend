import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Cell } from '../interfaces/cell';

const table = prisma.cell;

export class CellService {
  static async getAll(cell: Partial<Cell>): Promise<Cell[]> {
    try {
      return await table.findMany({
        where: cell,
        orderBy: [{ column: 'asc' }, { row: 'asc' }],
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
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all cells', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<Cell | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one cell', error);
    }
  }

  static async create(cell: Cell[]): Promise<any> {
    try {
      return await table.createMany({
        data: cell,
        skipDuplicates: true,
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create cell', error);
      }
    }
  }

  static async update(data: Cell[]): Promise<any> {
    try {
      const updatePromises = data.map((cell: Cell) => {
        const { id, ...data } = cell;
        return prisma.cell.update({
          where: { id },
          data,
        });
      });

      const updatedCells = await Promise.all(updatePromises);

      return updatedCells.sort((a, b) => a.row - b.row || a.column - b.column);
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create cell', error);
      }
    }
  }

  static async delete({ id }: { id: string }): Promise<Cell | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete cell', error);
    }
  }
}
