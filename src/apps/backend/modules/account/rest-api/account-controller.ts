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

      res.status(201).send({message: 'Registration successful',account:AccountController.serializeAccountAsJSON(account)});
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
      const isAuthenticated = await AccountService.AuhenticateAccount(params);

      if (isAuthenticated) {
        // Authentication successful, you can generate a token or session here if needed
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Authentication failed
        res.status(401).json({ message: 'Login failed. Invalid credentials.' });
      }
    } catch (e) {
      console.error('[ERROR] An error occurred during login:', e);
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
