import { ZodError } from 'zod';
import { CustomError } from './custom';

export class ValidationError extends CustomError {
  readonly statusCode = 400;
  readonly description: string | object;
  readonly logging = true;

  constructor(message: string, error: any) {
    super(message);
    if (error instanceof ZodError) {
      this.description = error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));
    } else {
      this.description = error.errors;
    }

    if (this.logging) {
      console.log(`${message}: `, error);
    }

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
