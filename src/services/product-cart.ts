import { prisma } from '../config/database';
import { DatabaseError } from '../errors/database';
import { ProductCart } from '../interfaces/product-cart';

const table = prisma.productCart;

export class ProductCartService {
  static async getAll(): Promise<ProductCart[]> {
    try {
      return await table.findMany({
        include: {
          product: true,
          cart: {
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
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch all product carts', error);
    }
  }

  static async getById({ id }: { id: string }): Promise<ProductCart | null> {
    try {
      return await table.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          cart: {
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
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to fetch one product cart', error);
    }
  }

  static async create(productCart: ProductCart): Promise<ProductCart> {
    try {
      const { cartId, productId } = productCart;
      const existingProductInCart = await prisma.productCart.findFirst({
        where: {
          cartId,
          productId,
        },
      });

      if (existingProductInCart) {
        return await prisma.productCart.update({
          where: {
            id: existingProductInCart.id,
          },
          data: {
            quantity: existingProductInCart.quantity + 1,
          },
          include: {
            cart: {
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
            },
          },
        });
      } else {
        return await table.create({
          data: productCart,
          include: {
            cart: {
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
            },
          },
        });
      }
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to create product cart', error);
      }
    }
  }

  static async update({ id }: { id: string }, data: ProductCart): Promise<ProductCart | null> {
    try {
      return await table.update({
        where: {
          id: parseInt(id),
        },
        data,
        include: {
          cart: {
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
          },
        },
      });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw error;
      } else {
        throw new DatabaseError('Failed to update product cart', error);
      }
    }
  }

  static async delete({ id }: { id: string }): Promise<ProductCart | null> {
    try {
      return await table.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          cart: {
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
          },
        },
      });
    } catch (error: any) {
      throw new DatabaseError('Failed to delete product cart', error);
    }
  }
}
