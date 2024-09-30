import { CustomError } from './custom';

export class AuthenticationError extends CustomError {
  readonly statusCode = 401;
  readonly description?: string | object;
  readonly logging = true;

  constructor(message: string, error?: any) {
    super(message);
    if (error) {
      this.description = error.errors;
    }

    if (this.logging) {
      console.log(`${message}: `, error);
    }

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
