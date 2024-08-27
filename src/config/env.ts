import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'your_jwt_secret',
};
