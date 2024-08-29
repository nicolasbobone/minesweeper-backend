import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { ProductService } from '../services/product';

export class ProductController {
  static async getAll(req: RequestAuth, res: Response) {
    const { body } = req;
    const products = await ProductService.getAll(body);
    response(res, products);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const product = await ProductService.getById({ id });
    response(res, product);
  }

  static async create(req: RequestAuth, res: Response) {
    const { body } = req;
    const newProduct = await ProductService.create(body);
    response(res, newProduct, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const product = await ProductService.update({ id }, body);
    response(res, product);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const product = await ProductService.delete({ id });
    response(res, product);
  }
}
