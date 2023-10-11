import bodyParser from 'body-parser';
import express, { Application } from 'express';

import ErrorHandler from '../../error/error-handler';
import AccountRepository from '../internal/store/account-repository';

import AccountRouter from './account-router';

export default class AccountRESTApiServer {
  public static async create(): Promise<Application> {
    try {
      console.log('[INFO] Creating Express Application...');

      await AccountRepository.createDBConnection();
      console.log('[INFO] .....MongoDB connected successfully.');

      const app = express();
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      app.use('/', AccountRouter.getRoutes());
      
      app.use(ErrorHandler.AppErrorHandler);

      console.log('[INFO] Express Application created successfully.');

      return Promise.resolve(app);
    } catch (error) {
      console.error('[ERROR] An error occurred during server creation:', error);
      throw error;
    }
  }
}
