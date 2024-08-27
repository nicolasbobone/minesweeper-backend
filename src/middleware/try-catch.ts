import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ValidationError } from '../errors/validation';
import { verifySession } from './session';
import { validation } from './validation';

export const tryCatch = (controller: Function, schema?: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      verifySession(req);

      if (schema) {
        validation(req, schema);
      }

      await controller(req, res);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError('Validations error', error));
      }
      next(error);
    }
  };
};
