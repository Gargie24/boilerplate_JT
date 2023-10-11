// todo-util.ts

import { Todo } from '../types';
import { TodoDB } from './store/todo-db';

export default class TodoUtil {
  public static convertTodoDBToTodo(todoDb: TodoDB): Todo {
if (!todoDb) {
      throw new Error("Todo not found"); // You can handle the error as needed
    }
    const todo: Todo = new Todo();
    todo.id = todoDb._id.toString();
    todo.account = todoDb.account.toString();
    todo.description = todoDb.description;
    return todo;
  }
}
