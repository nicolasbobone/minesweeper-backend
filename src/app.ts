import cookieParser from 'cookie-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database';
import openApiDocument from './docs/openapi.json';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/error';
import { router } from './routes';

const app = express();

app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
connectDatabase();
app.use(errorHandler);

export default app;
