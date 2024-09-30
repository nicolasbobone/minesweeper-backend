import cors from 'cors';
import { env } from 'process';
const urlApi = env.URL_API;
const ACCEPTED_ORIGINS = [`${urlApi}:3000`, `${urlApi}:4200`];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (origin && acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
