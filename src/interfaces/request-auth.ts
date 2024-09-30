import { Request } from 'express';
import { User } from '../interfaces/user';

export interface RequestAuth extends Request {
  user?: Partial<User>;
}
