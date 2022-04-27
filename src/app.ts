import express from 'express';
import { handleErrors, initSwagger, jsonParsing } from './app-helpers';
import { RegisterRoutes } from './routes';

const app = express();

initSwagger(app);
jsonParsing(app);

RegisterRoutes(app);

handleErrors(app);

export default app;
