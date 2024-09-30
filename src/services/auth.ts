import { prisma } from '../config/database';
import { AuthenticationError } from '../errors/authentication';
import { DatabaseError } from '../errors/database';
import { Auth } from '../interfaces/auth';
import { User } from '../interfaces/user';
import { PasswordHandler } from '../utils/bcrypt';
import { JwtHandler } from '../utils/jwt';

const table = prisma.user;

export class AuthService {
  static async register(user: User): Promise<Partial<User>> {
    try {
      const userExist = await table.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExist) {
        throw new AuthenticationError('User already exist');
      }

      user.password = await PasswordHandler.encrypt(user.password);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = (await table.create({ data: user })) as Partial<User>;

      return newUser;
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      } else {
        throw new DatabaseError('Failed register user', error);
      }
    }
  }

  static async login(
    credentials: Auth,
  ): Promise<{ accessToken: { token: string; expiresIn: number }; refreshToken: string }> {
    try {
      const userExist = await table.findUnique({
        where: {
          email: credentials.email,
        },
      });
      if (!userExist) {
        throw new AuthenticationError('User not exist');
      }

      const checkLogin = await PasswordHandler.verify(credentials.password, userExist.password);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = userExist as Partial<User>;

      if (!checkLogin) {
        throw new AuthenticationError('Password incorrect');
      }

      const { token, expiresIn } = JwtHandler.generateAccessToken(user);

      const refreshToken = JwtHandler.generateRefreshToken(user);

      const result = {
        accessToken: {
          token,
          expiresIn: Date.now() + expiresIn * 1000,
        },
        refreshToken,
      };

      return result;
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      } else {
        throw new DatabaseError('Failed login user', error);
      }
    }
  }

  static async refreshToken(id: number): Promise<{ token: string; expiresIn: number }> {
    try {
      const userExist = await table.findUnique({
        where: {
          id,
        },
      });

      if (!userExist) {
        throw new AuthenticationError('User not exist');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = userExist as Partial<User>;

      const { token, expiresIn } = JwtHandler.generateAccessToken(user);

      return { token, expiresIn: Date.now() + expiresIn * 1000 };
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      } else {
        throw new DatabaseError('Failed login user', error);
      }
    }
  }
}
