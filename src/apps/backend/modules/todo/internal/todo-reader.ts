// todo-reader.ts

import {
  GetTodoParams,
  Todo,
  TodoNotFoundError,
  GetAllTodoParams,
  PaginationParams,
} from '../types';
import TodoRepository from './store/todo-repository';
import TodoUtil from './todo-util';

export default class TodoReader {
  public static async getTodoForAccount(params: GetTodoParams): Promise<Todo> {
    const todo = await TodoRepository.TodoDB.findOne({
      _id: params.todoId,
      account: params.accountId,
      active: true,
    });
    if (!todo) {
      throw new TodoNotFoundError(params.todoId);
    }
    return TodoUtil.convertTodoDBToTodo(todo);
  }

  public static async getTodosForAccount(params: GetAllTodoParams): Promise<Todo[]> {
    const totalTodosCount = await TodoRepository.TodoDB.countDocuments({
      account: params.accountId,
      active: true,
    });
    const paginationParams: PaginationParams = {
      page: params.page || 1,
      size: params.size || totalTodosCount,
    };
    const startIndex = (paginationParams.page - 1) * paginationParams.size;
    const todos = await TodoRepository.TodoDB
      .find({ account: params.accountId, active: true })
      .limit(paginationParams.size)
      .skip(startIndex);
    return todos.map((todo) => TodoUtil.convertTodoDBToTodo(todo));
  }
}
