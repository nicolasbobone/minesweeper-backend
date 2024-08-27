import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { Cart } from '../interfaces/cart';

const table = prisma.cart;

export class CartService {
  static async getAll(): Promise<Cart[]> {
    try {
      return await table.findMany({
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all carts', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<Cart | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one cart', error);
    }
  }

  static async create(userId: number): Promise<Cart> {
    try {
      return await table.create({
        data: { userId, status: 'pending' },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create cart', error);
      }
    }
  }

  static async update({ id }: { id: string }, data: Cart): Promise<Cart | null> {
    try {
      return await table.update({
        where: {
          id: parseInt(id),
        },
        data,
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create cart', error);
      }
    }
  }

  static async delete({ id }: { id: string }): Promise<Cart | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete cart', error);
    }
  }

  static async getPending({ userId }: { userId: number }): Promise<Cart | null> {
    try {
      return await table.findFirst({
        where: {
          userId,
          status: 'pending',
        },
        include: {
          products: {
            include: {
              product: true,
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch pending cart', error);
    }
  }
}
