export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly description?: string | object;
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
