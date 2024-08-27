import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/database';

const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  try {
    // Intentar conectarse a la base de datos PostgreSQL
    await prisma.$connect();
    console.log('Connected to PostgreSQL');
  } catch (error: any) {
    throw new DatabaseError('Failed to connect to PostgreSQL', error);
  }
};

// Exportar la instancia de Prisma para usarla en otros archivos
export { prisma };
