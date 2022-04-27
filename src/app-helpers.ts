import express, { Application, NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { ValidateError } from 'tsoa';

const initSwagger = (app: Application): void => {
  app.use(express.static('public'));
  app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(undefined, { swaggerOptions: { url: '/swagger.json' } }),
  );
};

const jsonParsing = (app: Application): void => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
};

const handleErrors = (app: Application): void => {
  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof ValidateError) {
      console.warn(
        `Caught Validation Error for ${req.path}: `,
        err.fields,
        err.message,
      );
      return res
        .status(422)
        .json({ message: 'Validation Failed', details: err?.fields });
    }
    if (err instanceof Error) {
      return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }

    next();
  });
};

export { initSwagger, jsonParsing, handleErrors };
