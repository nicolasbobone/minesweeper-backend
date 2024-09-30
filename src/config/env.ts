import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  urlApi: process.env.URL_API,
};
