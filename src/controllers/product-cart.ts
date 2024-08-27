import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { CartService } from '../services/cart';
import { ProductCartService } from '../services/product-cart';

export class ProductCartController {
  static async getAll(req: RequestAuth, res: Response) {
    const productCarts = await ProductCartService.getAll();
    response(res, productCarts);
  }

  static async getById(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const productCart = await ProductCartService.getById({ id });
    response(res, productCart);
  }

  static async create(req: RequestAuth, res: Response) {
    const userId = req.user!.id!;
    let cart = await CartService.getPending({ userId });
    if (!cart) {
      cart = await CartService.create(userId);
    }
    const { body } = req;
    body.cartId = cart.id;
    const newProductCart = await ProductCartService.create(body);
    response(res, newProductCart, 201);
  }

  static async update(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const productCart = await ProductCartService.update({ id }, body);
    response(res, productCart);
  }

  static async delete(req: RequestAuth, res: Response) {
    const { id } = req.params;
    const productCart = await ProductCartService.delete({ id });
    response(res, productCart);
  }
}
