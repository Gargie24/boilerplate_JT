// todo-service-manager.ts

import { Application } from 'express';
import TodoRESTApiServer from './rest-api/todo-rest-api-server';

export default class TodoServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return TodoRESTApiServer.create();
  }
}
