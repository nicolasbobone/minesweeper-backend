import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { CellService } from '../services/cell';

export class CellController {
  static async getAll(req: RequestAuth, res: Response) {
    const { body } = req;
    const cells = await CellService.getAll(body);
    response(res, cells);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const cell = await CellService.getById({ id });
    response(res, cell);
  }

  static async create(req: RequestAuth, res: Response) {
    const { body } = req;
    const newCell = await CellService.create(body);
    response(res, newCell, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { body } = req;
    const cell = await CellService.update(body);
    response(res, cell);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const cell = await CellService.delete({ id });
    response(res, cell);
  }
}
