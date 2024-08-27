import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Category } from '../interfaces/category';

const table = prisma.category;

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    try {
      return await table.findMany();
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all categories', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<Category | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one category', error);
    }
  }

  static async create(category: Category): Promise<Category> {
    try {
      category.name = category.name.trim().toLocaleUpperCase();
      return await table.create({ data: category });
    } catch (error: any) {
      throw new DatabaseError('Failed to create category', error);
    }
  }

  static async update({ id }: { id: string }, data: Category): Promise<Category | null> {
    try {
      if (data.name) {
        data.name = data.name.trim().toLocaleUpperCase();
      }
      return await table.update({
        where: {
          id: parseInt(id),
        },
        data,
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to update category', error);
    }
  }

  static async delete({ id }: { id: string }): Promise<Category | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete category', error);
    }
  }
}
