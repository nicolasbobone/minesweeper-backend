import { GameDifficulty } from '@prisma/client';
import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { SetupService } from '../services/setup';

const defineDifficulty = ({
  rows,
  columns,
  minesCount,
}: {
  rows: number;
  columns: number;
  minesCount: number;
}): GameDifficulty => {
  const totalCells = rows * columns;
  const minePercentage = (minesCount / totalCells) * 100;

  if (totalCells < 64 && minePercentage <= 10) {
    return 'EASY';
  } else if (totalCells >= 64 && totalCells <= 144 && minePercentage > 10 && minePercentage <= 15) {
    return 'MEDIUM';
  } else {
    return 'HARD';
  }
};

export class SetupController {
  static async getUnique(req: RequestAuth, res: Response) {
    const setup = await SetupService.getUnique();
    response(res, setup);
  }

  static async createOrUpdate(req: RequestAuth, res: Response) {
    const { body } = req;
    const difficulty = defineDifficulty({ ...body });
    body.difficulty = difficulty;
    const newSetup = await SetupService.createOrUpdate(body);
    response(res, newSetup, 201);
  }

  static async delete(req: RequestAuth, res: Response) {
    const setup = await SetupService.delete();
    response(res, setup);
  }
}
