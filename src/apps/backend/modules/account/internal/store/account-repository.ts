import mongoose, { CallbackError, Connection } from 'mongoose';
import ConfigService from '../../../config/config-service';
import { AccountDB, accountDbSchema } from './account-db';

export default class AccountRepository {
  public static accountDB: mongoose.Model<AccountDB>;

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const mongoURI = ConfigService.getStringValue('mongoDb.uri');
      console.log('Connecting to MongoDB at', mongoURI); // Log the connection attempt
      mongoose.createConnection(
        mongoURI,
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            console.error('MongoDB connection error:', error); // Log the connection error
            reject(error);
          } else {
            console.log('MongoDB connected successfully'); // Log the successful connection
            AccountRepository.accountDB = result.model(
              'Account',
              accountDbSchema,
            ) as unknown as mongoose.Model<AccountDB>;
            resolve(result);
            console.log("schema created");
          }
        },
      );
     
    });
  }
}
