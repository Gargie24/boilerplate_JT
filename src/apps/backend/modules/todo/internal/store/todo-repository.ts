

import ConfigService from '../../../config/config-service';

import { TodoDB ,todoDbSchema} from './todo-db';
import mongoose, { CallbackError, Connection } from 'mongoose';

export default class TodoRepository {
  public static TodoDB: mongoose.Model<TodoDB>;

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const mongoURI = ConfigService.getStringValue('mongoDb.uri');
      mongoose.createConnection(
        mongoURI,
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            reject(error);
          } else {
            TodoRepository.TodoDB = result.model(
              'Todo',
              todoDbSchema,
            ) as unknown as mongoose.Model<TodoDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
