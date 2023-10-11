// todo-rest-api-server.ts

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import TodoRouter from './todo-router';
import TodoRepository from '../internal/store/todo-repository';

import ErrorHandler from '../../error/error-handler';

export default class TodoRESTApiServer {
  // public static async create(): Promise<Application> {
  //   const app: Application = express();
  //   app.use(bodyParser.urlencoded({ extended: true }));
  //   app.use(bodyParser.json());

  //   app.use(ErrorHandler.AppErrorHandler);

  //   // Middleware

  //   app.use(cors());

  //   // Define API routes for todos
  //   app.use('/:accountId/todos', TodoRouter.getRoutes());

  //   return app;
  // }

  public static async create(): Promise<Application> {
    await TodoRepository.createDBConnection();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/:accountId/todos', TodoRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }

}
