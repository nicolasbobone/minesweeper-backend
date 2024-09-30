import { Response } from 'express';

export const response = <T>(res: Response, data: T, statusCode: number = 200) => {
  res.status(statusCode).json({
    error: false,
    data,
  });
};
