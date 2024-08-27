import { Response } from 'express';
import { RequestAuth } from '../interfaces/request-auth';
import { response } from '../middleware/response';
import { AuthService } from '../services/auth';

export class AuthController {
  static async register(req: RequestAuth, res: Response) {
    const { body } = req;
    const user = await AuthService.register(body);
    response(res, user, 201);
  }

  static async login(req: RequestAuth, res: Response) {
    const { body } = req;
    const user = await AuthService.login(body);
    response(res, user);
  }
}
