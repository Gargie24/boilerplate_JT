// todo-service.ts

import TodoReader from './internal/todo-reader';
import TodoWriter from './internal/todo-writer';
import {
  CreateTodoParams,
  DeleteTodoParams,
  GetAllTodoParams,
  GetTodoParams,
  Todo,updateTodoParams
} from './types';

export default class TodoService {
  public static async createTodo(params: CreateTodoParams): Promise<Todo> {
    return TodoWriter.createTodo(params);
  }

   public static async deleteTodo(params: DeleteTodoParams): Promise<void> {
    return TodoWriter.deleteTodo(params);
  }


  public static async updateTodo(params: updateTodoParams): Promise<Todo> {

    return TodoWriter.updateTodo(params);
  }

  public static async getTodoForAccount(params: GetTodoParams): Promise<Todo> {
    return TodoReader.getTodoForAccount(params);
  }

  public static async getTodosForAccount(params: GetAllTodoParams): Promise<Todo[]> {
    return TodoReader.getTodosForAccount(params);
  }





}
