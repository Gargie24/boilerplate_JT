import APIService from './api.service';

export default class AccessService extends APIService {
  register(username:String,password:String,email:String,name:String):Promise<any>{
    return this.apiClient.post('./register',{
      username,
      password,
      name,
      email
    })
  }
  login(username: string, password: string): Promise<any> {
    return this.apiClient.post('/access-tokens', {
      username,
      password,
    });

   


  }
}
