import { GameDifficulty } from '@prisma/client';

export interface Setup {
  id?: number;
  rows: number;
  columns: number;
  minesCount: number;
  difficulty: GameDifficulty;
  createdAt?: Date;
  updatedAt?: Date;
}
