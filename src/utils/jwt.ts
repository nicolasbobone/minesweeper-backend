import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import env from '../config/env';
import { AuthenticationError } from '../errors/authentication';
import { User } from '../interfaces/user';

export class JwtHandler {
  static generate(user: Partial<User>) {
    return sign(user, env.jwtSecret, {
      expiresIn: '2h',
    });
  }

  static verify(token: string) {
    try {
      return verify(token, env.jwtSecret);
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new AuthenticationError('Token has expired');
      }
      throw new AuthenticationError('Failed to verify token', error);
    }
  }
}
