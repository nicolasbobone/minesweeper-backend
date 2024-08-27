/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom';

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    if (err.logging) console.log(err);
    res.status(err.statusCode).json({
      error: true,
      message: err.message,
      description: err.description,
    });
  } else {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};
