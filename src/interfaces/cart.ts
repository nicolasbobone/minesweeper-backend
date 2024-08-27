import { StatusCart } from '@prisma/client';

export interface Cart {
  id?: number;
  userId: number;
  status: StatusCart;
  createdAt?: Date;
  updatedAt?: Date;
}
