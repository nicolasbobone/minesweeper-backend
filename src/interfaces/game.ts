import { GameDifficulty, GameResult, GameStatus } from '@prisma/client';

export interface Game {
  id?: number;
  userId: number;
  startDate: Date;
  endDate?: Date | null;
  totalTime: number;
  result?: GameResult | null;
  status: GameStatus;
  rows: number;
  columns: number;
  minesCount: number;
  difficulty: GameDifficulty;
  createdAt?: Date;
  updatedAt?: Date;
}
