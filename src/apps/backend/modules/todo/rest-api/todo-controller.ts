// todo-controller.ts

import { NextFunction, Request, Response } from 'express';
import TodoService from '../todo-service';
import {
  Todo,
  CreateTodoParams,
  GetAllTodoParams,
  DeleteTodoParams,
  updateTodoParams,
  GetTodoParams,
  
} from '../types';

export default class TodoController {
  public static async createTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: CreateTodoParams = {
        accountId: req.params.accountId,
        description: req.body.description as string,
      };

      const todo: Todo = await TodoService.createTodo(params);
      res.status(201).send(TodoController.serializeTodoAsJSON(todo));
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTodoParams = {
        accountId: req.params.accountId,
        todoId: req.params.id,
      };
      await TodoService.deleteTodo(params);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = +req.query.page;
      const size = +req.query.size;
      const params: GetAllTodoParams = {
        accountId: req.params.accountId,
        page,
        size,
      };
      const todos = await TodoService.getTodosForAccount(params);
      res
        .status(200)
        .send(todos.map((todo) => TodoController.serializeTodoAsJSON(todo)));
    } catch (e) {
      next(e);
    }
  }

  public static async getTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTodoParams = {
        accountId: req.params.accountId,
        todoId: req.params.id,
      };
      const todo = await TodoService.getTodoForAccount(params);
      res.status(200).send(TodoController.serializeTodoAsJSON(todo));
    } catch (e) {
      next(e);
    }
  }
  //update todo
  public static async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Extract the required parameters from the request

      const params: updateTodoParams = {
        todoId: req.params.id,
        newDesc: req.body.newDesc,
      };
      console.log(params.todoId);
      // const accountId: string = req.params.accountId;
      // const todoId: string = req.params.id;
      //const updateData: updateTodoParams = req.body as updateTodoParams; // Assuming UpdateTodoParams contains the fields to update

      // Call your TodoService to perform the update

      const updatedTodo: Todo = await TodoService.updateTodo(params);

      // Send a response with the updated todo
      res.status(200).send(TodoController.serializeTodoAsJSON(updatedTodo));
    } catch (e) {
      next(e);
    }
  }






  private static serializeTodoAsJSON(todo: Todo): unknown {
    return {
      id: todo.id,
      account: todo.account,
      description: todo.description,
      isCompleted:todo.isCompleted,
    };
  }
}
