import { NextFunction, Request, Response } from 'express';
import AccountService from '../account-service';
import { Account, CreateAccountParams,AccountSearchParams } from '../types';

export default class AccountController {
  public static async createAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log('[INFO] Received a POST request to create an account.');

      const { username, password, name, email }: CreateAccountParams = req.body as CreateAccountParams;
      console.log('[INFO] Request body:', req.body);

      const params: CreateAccountParams = { username, password, name, email };
      const account = await AccountService.createAccount(params);
      console.log('[INFO] Account created:', account);

      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      console.error('[ERROR] An error occurred during account creation:', e);
      next(e);
    }
  }


  //login function

  public static async loginAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      console.log('[INFO] Received a POST request to login.');

      // Extract login credentials from the request body
      const { username, password }: { username: string; password: string } = req.body;
      const params: AccountSearchParams  = { username, password};


      // Perform authentication, e.g., check credentials against a database
      const account = await AccountService.getAccountByUsernamePassword(params);

      res.status(200).send(AccountController.serializeAccountAsJSON(account));

    } catch (e) {

      next(e);
    }
  }
///login function ends
  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
      name: account.name,
      email: account.email,
    };
  }
}
