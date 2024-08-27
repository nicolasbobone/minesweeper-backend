import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { CartService } from '../services/cart';

export class CartController {
  static async getAll(req: RequestAuth, res: Response) {
    const carts = await CartService.getAll();
    response(res, carts);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const cart = await CartService.getById({ id });
    response(res, cart);
  }

  static async create(req: RequestAuth, res: Response) {
    const { body } = req;
    body.userId = req.user!.id;
    const newCart = await CartService.create(body);
    response(res, newCart, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const cart = await CartService.update({ id }, body);
    response(res, cart);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const cart = await CartService.delete({ id });
    response(res, cart);
  }

  static async getPending(req: RequestAuth, res: Response) {
    const cart = await CartService.getPending({ userId: req.user!.id! });
    response(res, cart);
  }
}
