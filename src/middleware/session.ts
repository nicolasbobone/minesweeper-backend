import { AuthenticationError } from '../errors/authentication';
import { RequestAuth } from '../interfaces/request-auth';
import { User } from '../interfaces/user';
import { JwtHandler } from '../utils/jwt';

const unsafeRoutes = ['/auth/register', '/auth/login'];

export const verifySession = (req: RequestAuth) => {
  if (!unsafeRoutes.includes(req.originalUrl)) {
    const tokenByUser = req.headers.authorization || '';
    const token = tokenByUser.split(' ').pop();
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const validToken = JwtHandler.verify(token);
    req.user = validToken as Partial<User>;
    if (!validToken) {
      throw new AuthenticationError('Invalid token', validToken);
    }
  }
};
