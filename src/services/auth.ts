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

      const result = (await table.create({ data: user })) as Partial<User>;

      delete result.password;

      return result;
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      } else {
        throw new DatabaseError('Failed register user', error);
      }
    }
  }

  static async login(credentials: Auth): Promise<{ user: Partial<User>; token: string }> {
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

      const user = userExist as Partial<User>;

      delete user.password;
      if (!checkLogin) {
        throw new AuthenticationError('Password incorrect');
      }

      const token = JwtHandler.generate(user);

      return {
        user,
        token,
      };
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      } else {
        throw new DatabaseError('Failed login user', error);
      }
    }
  }
}
