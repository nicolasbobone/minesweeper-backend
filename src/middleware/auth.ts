import { Request as ExpressRequest, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Request extends ExpressRequest {
  user?: any;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
