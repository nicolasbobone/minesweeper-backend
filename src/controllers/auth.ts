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
    const { accessToken, refreshToken } = await AuthService.login(body);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 * 7 * 24,
    });
    response(res, { ...accessToken });
  }

  static async refreshToken(req: RequestAuth, res: Response) {
    const id = req.user!.id!;
    const access = await AuthService.refreshToken(id);
    response(res, access);
  }

  static async logout(req: RequestAuth, res: Response) {
    res.clearCookie('refresh_token');
    response(res, { message: 'Logout success' });
  }
}
