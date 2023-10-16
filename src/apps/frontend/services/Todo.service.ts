import APIService from './api.service';

export default class AccessService extends APIService {
  CreateTodo(description: String): Promise<any> {
    const token = localStorage.getItem('token');

    const accountId = localStorage.getItem('accountId');

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
    const token = localStorage.getItem('token');

    const accountID = localStorage.getItem('accountId');

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
    const token = localStorage.getItem('token');

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

  //mark todo
  MarkTodo(todoId: string) {
    const token = localStorage.getItem('token');

    const accountId = localStorage.getItem('accountId');

    const headers = {
      // Adjust headers as needed
      authorization: `Bearer ${token}`, // Example: Bearer token for authentication
    };

    return this.apiClient.patch(`${accountId}/todos/mark/${todoId}`, null, {
      headers,
    });
  }

  //delete todo

  deleteTodo(todoId: string) {
    const token = localStorage.getItem('token');

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
