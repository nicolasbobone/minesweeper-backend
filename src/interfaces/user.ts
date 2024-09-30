import { Auth } from './auth';

export interface User extends Auth {
  id?: number;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
