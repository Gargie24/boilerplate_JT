// types.ts

import AppError from '../error/app-error';

export class Todo {
  id: string;
  account: string;
  description: string;
}

export type GetAllTodoParams = {
  accountId: string;
  page?: number;
  size?: number;
};

export type GetTodoParams = {
  accountId: string;
  todoId: string;
};
export type updateTodoParams = {
  accountId: string;
  todoId: string;
  newDesc : string;
};
export type CreateTodoParams = {
  accountId: string;
  description: string;
};

export type DeleteTodoParams = {
  accountId: string;
  todoId: string;
};

export type PaginationParams = {
  page: number;
  size: number;
};

export enum TodoErrorCode {
  NOT_FOUND = 'TODO_ERR_01',
  TODO_ALREADY_EXISTS = 'TODO_ERR_02',
  UNAUTHORIZED_TODO_ACCESS = 'TODO_ERR_03',
}

export class TodoWithDescriptionExistsError extends AppError {
  code: TodoErrorCode;

  constructor(description: string) {
    super(`Todo with description "${description}" already exists.`);
    this.code = TodoErrorCode.TODO_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class TodoNotFoundError extends AppError {
  code: TodoErrorCode;

  constructor(todoId: string) {
    super(`Todo with ID "${todoId}" not found.`);
    this.code = TodoErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}
