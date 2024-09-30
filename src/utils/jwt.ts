import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import env from '../config/env';
import { AuthenticationError } from '../errors/authentication';
import { User } from '../interfaces/user';

export class JwtHandler {
  static generateAccessToken(user: Partial<User>) {
    try {
      const expiresIn = 30 * 60 * 1000;
      const token = sign(user, env.jwtAccessSecret!, {
        expiresIn,
      });

      return { token, expiresIn };
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  static generateRefreshToken(user: Partial<User>) {
    try {
      return sign(user, env.jwtRefreshSecret!, {
        expiresIn: 60 * 60 * 1000 * 24 * 7,
      });
    } catch (error) {
      throw new Error('Failed to generate refresh token');
    }
  }

  static verify(token: string, type: 'access' | 'refresh' = 'access') {
    try {
      const secret = type === 'access' ? env.jwtAccessSecret! : env.jwtRefreshSecret!;
      return verify(token, secret);
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new AuthenticationError('Token has expired');
      }
      throw new AuthenticationError('Failed to verify token', error);
    }
  }
}
