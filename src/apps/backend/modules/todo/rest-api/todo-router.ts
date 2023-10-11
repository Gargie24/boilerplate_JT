// todo-router.ts

import { Router } from 'express';
import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';
import TodoController from './todo-controller';

export default class TodoRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.post('/', AccountAuthMiddleware.ensureAccess, TodoController.createTodo);
    router.get('/', AccountAuthMiddleware.ensureAccess, TodoController.getAllTodos);
    router.get('/:id', AccountAuthMiddleware.ensureAccess, TodoController.getTodo);
    router.delete('/:id', AccountAuthMiddleware.ensureAccess, TodoController.deleteTodo);
    router.patch('/:id/update', AccountAuthMiddleware.ensureAccess, TodoController.updateTodo);
    return router;
  }
}
