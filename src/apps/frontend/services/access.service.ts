import APIService from './api.service';

export default class TodoService extends APIService {
  register(
    username: String,
    password: String,
    email: String,
    name: String,
  ): Promise<any> {
    return this.apiClient.post('/register', {
      username,
      password,
      name,
      email,
    });
  }
  login(username: string, password: string): Promise<any> {
    console.log('login api called');
    return this.apiClient.post('/login', {
      username,
      password,
    });
  }
  generateAccessToken(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });
  }

}
