import APIService from './api.service';

export default class AccessService extends APIService {



CreateTodo(description: String): Promise<any> {
  const token = localStorage.getItem('token');
  console.log("add todo started");
  console.log("token ", token)

  const accountId = localStorage.getItem('accountId');
  console.log("accont id is this ", accountId);
  const headers = {
    // Adjust headers as needed
    authorization: `Bearer ${token}`,
  };

  return this.apiClient.post(
    `${accountId}/todos/create`,
    { description },
    { headers },
  );
}

getAllTodos(): Promise<any> {
  console.log('i am at getalltodos api call first line');
  const token = localStorage.getItem('token');
  console.log(token);

  const accountID = localStorage.getItem('accountId');
  console.log(accountID);
  const headers = {
    // Adjust headers as needed
    authorization: `Bearer ${token}`,
  };

  return this.apiClient.get(
    `${accountID}/todos/alltodos`,

    { headers },
  );
}
updateTodo(todoId: string, description: string) {
  console.log('updated todo started');
  const token = localStorage.getItem('token');
  console.log(token);
  const accountId = localStorage.getItem('accountId');
  const headers = {

    authorization: `Bearer ${token}`,
  };

  return this.apiClient.patch(
    `${accountId}/todos/update/${todoId}`,
    { description },
    { headers },
  );
}
markTodo(todoId: string) {
  console.log('updated todo started');
  const token = localStorage.getItem('token');
  console.log(token);
  const accountId = localStorage.getItem('accountId');
  const headers = {
    // Adjust headers as needed
    authorization: `Bearer ${token}`,
  };

  return this.apiClient.patch(
    `${accountId}/todos/mark/${todoId}`,

    { headers },
  );
}

//delete todo

deleteTodo(todoId: string) {
  console.log('updated todo started');
  const token = localStorage.getItem('token');
  console.log(token);
  const accountId = localStorage.getItem('accountId');
  const headers = {
    // Adjust headers as needed
    authorization: `Bearer ${token}`, // Example: Bearer token for authentication
  };

  return this.apiClient.delete(
    `${accountId}/todos/${todoId}`,

    { headers },
  );
}

}
