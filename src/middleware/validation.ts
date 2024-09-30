import { Request } from 'express';
import { ValidationError } from '../errors/validation';
import { ValidationSchema } from '../interfaces/validation';

export const validation = (req: Request, schema: ValidationSchema) => {
  try {
    if (schema.body) {
      schema.body.parse(req.body);
    }
    if (schema.params) {
      schema.params.parse(req.params);
    }
    if (schema.query) {
      schema.query.parse(req.query);
    }
  } catch (error) {
    throw new ValidationError('Validations error', error);
  }
};
