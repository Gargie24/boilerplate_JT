// Home.tsx
import React, { useState, useEffect } from 'react';
import { Header, Todo } from '../../components';
import { TodoService } from '../../services';
import './home.css';
interface TodoItem {
  id: string;
  description: string;

}

export default function Home() {
  const todoService = new TodoService();
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      todoService
        .getAllTodos()
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTodos(response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });
    }
  }, [loggedIn]);

  const handleAddTodo = async (description: string) => {
    await todoService
      .CreateTodo(description)
      .then((result) => {
        setTodos((prevTodos) => [...prevTodos, result.data]);
      })
      .catch((error) => {
        console.error('Error creating todo:', error);
      });
  };

  const handleUpdateTodo = (todoId: string, newDescription: string) => {
    console.log(todoId);
    todoService
      .updateTodo(todoId, newDescription)
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, description: newDescription } : todo,
        );
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  const handleDeleteTodo = (todoId: string) => {
    todoService
      .deleteTodo(todoId)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        {
          !loggedIn &&
        <h1>Welcome to Todo Application</h1>
}
        {loggedIn ? (
          <div>
            <button
              className="btn btn-success add-todo-button"
              onClick={() => {
                const desc = prompt('Enter your todo');
                if (desc) {
                  handleAddTodo(desc);
                }
              }}
            >
              Add Todo
            </button>
            <div className="todo-list">
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todoId={todo.id}
                  description={todo.description}
                 
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: '10px' }}>
              Please Login or Register if you are new
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
