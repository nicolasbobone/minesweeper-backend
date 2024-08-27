import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { CategoryService } from '../services/category';

export class CategoryController {
  static async getAll(req: RequestAuth, res: Response) {
    const categories = await CategoryService.getAll();
    response(res, categories);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const category = await CategoryService.getById({ id });
    response(res, category);
  }

  static async create(req: RequestAuth, res: Response) {
    const { body } = req;
    const newCategory = await CategoryService.create(body);
    response(res, newCategory, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const categories = await CategoryService.update({ id }, body);
    response(res, categories);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const categories = await CategoryService.delete({ id });
    response(res, categories);
  }
}
