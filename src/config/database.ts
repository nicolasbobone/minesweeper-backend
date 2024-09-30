import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/database';

const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL');
  } catch (error: any) {
    throw new DatabaseError('Failed to connect to PostgreSQL', error);
  }
};

export { prisma };
