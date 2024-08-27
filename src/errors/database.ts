import { CustomError } from './custom';

export class DatabaseError extends CustomError {
  readonly statusCode = 400;
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

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
