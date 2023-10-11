// todo-writer.ts

import { CreateTodoParams, DeleteTodoParams,updateTodoParams, Todo } from '../types';
import TodoRepository  from './store/todo-repository';
import TodoUtil from './todo-util';


export default class TodoWriter {
  public static async createTodo(params: CreateTodoParams): Promise<Todo> {
    const createdTodo = await TodoRepository.TodoDB.create({
      account: params.accountId,
      description: params.description,
      active: true,
    });
    return TodoUtil.convertTodoDBToTodo(createdTodo);
  }

  public static async deleteTodo(params: DeleteTodoParams): Promise<void> {
    await TodoRepository.TodoDB.findOneAndUpdate(
      {
        _id: params.todoId,
        account: params.accountId,
        active: true,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }

  public static async updateTodo(params: updateTodoParams): Promise<Todo> {
    const UpdatedTodo = await TodoRepository.TodoDB.findOneAndUpdate(
      {
        _id: params.todoId,
        account: params.accountId,
       
      },
      {
        $set: {
          // Update the fields you want here, for example:
          description: params.newDesc, // Replace 'newName' with the actual field you want to update
        },
      },
      {
        new: true, // To return the updated document
      }
    );
    if(!UpdatedTodo){
     console.log("todo is not found");
    }
    console.log("before the update todo log")
    console.log(UpdatedTodo);
    return TodoUtil.convertTodoDBToTodo(UpdatedTodo);
  }



}
