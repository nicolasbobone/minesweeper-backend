import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Setup } from '../interfaces/setup';

const table = prisma.setup;

export class SetupService {
  static async getUnique(): Promise<Setup> {
    try {
      const setupExists = await table.findFirst();

      if (setupExists) {
        return setupExists;
      }

      return await table.create({});
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch setup', error);
    }
  }

  static async createOrUpdate(data: Setup): Promise<Setup> {
    try {
      const setupExists = await table.findFirst();

      if (setupExists) {
        return await table.update({
          where: {
            id: setupExists.id,
          },
          data,
        });
      }
      return await table.create({
        data,
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create or update setup', error);
      }
    }
  }

  static async delete(): Promise<Setup | null> {
    try {
      const setupExists = await table.findFirst();

      if (setupExists) {
        return await table.delete({
          where: {
            id: setupExists.id,
          },
        });
      }
      return null;
    } catch (error: any) {
      throw new DatabaseError('Failed to delete setup', error);
    }
  }
}
