import { Response } from 'express';
import { Cell } from '../interfaces/cell';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { CellService } from '../services/cell';
import { GameService } from '../services/game';
import { SetupService } from '../services/setup';

const generateCells = (values: { rows: number; columns: number; minesCount: number; gameId: number }): Cell[] => {
  const { rows, columns, minesCount, gameId } = values;
  const cells: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cells.push({
        gameId,
        row,
        column,
        isMine: false,
        isRevealed: false,
        adjacentMines: 0,
        isFlag: false,
      });
    }
  }

  let placedMines = 0;
  while (placedMines < minesCount) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    if (!cells[randomIndex].isMine) {
      cells[randomIndex].isMine = true;
      placedMines++;
    }
  }

  cells.forEach((cell) => {
    if (!cell.isMine) {
      cell.adjacentMines = countAdjacentMines({ cells, cell, rows, columns });
    }
  });

  return cells;
};

const countAdjacentMines = (values: { cells: Cell[]; cell: Cell; rows: number; columns: number }): number => {
  const { cells, cell, rows, columns } = values;
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let mineCount = 0;
  directions.forEach(([rowOffset, colOffset]) => {
    const newRow = cell.row + rowOffset;
    const newCol = cell.column + colOffset;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
      const adjacentCell = cells.find((c) => c.row === newRow && c.column === newCol);
      if (adjacentCell && adjacentCell.isMine) {
        mineCount++;
      }
    }
  });

  return mineCount;
};

export class GameController {
  static async getAll(req: RequestAuth, res: Response) {
    const { body } = req;
    body.userId = req.user!.id;
    const games = await GameService.getAll(body);
    response(res, games);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const game = await GameService.getById({ id });
    response(res, game);
  }

  static async create(req: RequestAuth, res: Response) {
    const existingGame = await GameService.getAll({ status: 'IN_PROGRESS' });
    if (existingGame.length > 0) {
      return response(res, existingGame[0], 200);
    }
    const { body } = req;
    body.userId = req.user!.id;
    const { rows, columns, minesCount, difficulty } = await SetupService.getUnique();
    body.rows = rows;
    body.columns = columns;
    body.minesCount = minesCount;
    body.difficulty = difficulty;
    const newGame = await GameService.create(body);
    const newCells = generateCells({ rows, columns, minesCount, gameId: newGame.id! });
    await CellService.create(newCells);
    const cells = await CellService.getAll({ gameId: newGame.id });
    response(res, { ...newGame, cells }, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const { cells, ...gameValues } = req.body;
    if (cells) {
      await CellService.update(cells);
    }
    const game = await GameService.update({ id }, gameValues);
    response(res, game);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const game = await GameService.delete({ id });
    response(res, game);
  }
}
