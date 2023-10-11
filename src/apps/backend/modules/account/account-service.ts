import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import { Account, CreateAccountParams, AccountSearchParams} from './types'; // Update import path for types

export default class AccountService {
  public static async createAccount(params: CreateAccountParams): Promise<Account> {
    return AccountWriter.createAccount(params);
  }

  public static async AuhenticateAccount(params: AccountSearchParams): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }


  public static async getAccountByUsernamePassword(params: AccountSearchParams): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }
}
