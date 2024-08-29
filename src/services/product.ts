import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Product } from '../interfaces/product';
import { CategoryService } from './category';

const table = prisma.product;

export class ProductService {
  static async getAll(product: Partial<Product>): Promise<Product[]> {
    try {
      return await table.findMany({
        where: product,
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all products', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<Product | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one product', error);
    }
  }

  private static async validateCategory(categoryId: number): Promise<boolean> {
    const category = await CategoryService.getById({ id: `${categoryId}` });
    return !!category;
  }

  static async create(product: Product): Promise<Product> {
    try {
      if (!(await this.validateCategory(product.categoryId))) {
        throw new DatabaseError(`Category with ID ${product.categoryId} does not exist. Cannot create product.`);
      }

      product.sku = crypto.randomUUID();
      return await table.create({
        data: product,
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create product', error);
      }
    }
  }

  static async update({ id }: { id: string }, data: Product): Promise<Product | null> {
    try {
      if (data.categoryId) {
        if (!this.validateCategory(data.categoryId)) {
          throw new DatabaseError(`Category with ID ${data.categoryId} does not exist. Cannot create product.`);
        }
      }
      return await table.update({
        where: {
          id: parseInt(id),
        },
        data,
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create product', error);
      }
    }
  }

  static async delete({ id }: { id: string }): Promise<Product | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          category: true,
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete product', error);
    }
  }
}
