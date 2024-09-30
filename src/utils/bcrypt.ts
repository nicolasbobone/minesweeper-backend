import { compare, hash } from 'bcryptjs';

export class PasswordHandler {
  static async encrypt(password: string) {
    return await hash(password, 10);
  }

  static async verify(password: string, passwordHash: string) {
    return await compare(password, passwordHash);
  }
}
