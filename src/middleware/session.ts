import { AuthenticationError } from '../errors/authentication';
import { RequestAuth } from '../interfaces/request-auth';
import { User } from '../interfaces/user';
import { JwtHandler } from '../utils/jwt';

const unsafeRoutes = ['/auth/register', '/auth/login', '/auth/logout'];

const verifyToken = (token: string, type: 'access' | 'refresh') => {
  const validToken = JwtHandler.verify(token, type);
  if (!validToken) {
    throw new AuthenticationError(`Invalid ${type} token`);
  }
  return validToken;
};

export const verifySession = (req: RequestAuth) => {
  if (unsafeRoutes.includes(req.originalUrl)) return;

  if (req.originalUrl === '/auth/refresh-token') {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new AuthenticationError('No refresh token provided');
    }

    req.user = verifyToken(refreshToken, 'refresh') as Partial<User>;
    return;
  }

  const authorizationHeader = req.headers.authorization || '';
  const accessToken = authorizationHeader.split(' ').pop();
  if (!accessToken) {
    throw new AuthenticationError('No access token provided');
  }

  req.user = verifyToken(accessToken, 'access') as Partial<User>;
};
