// Home.tsx
import React, { useState, useEffect } from 'react';
import { Header, Todo } from '../../components';
import { TodoService } from '../../services';
import './home.css';
interface TodoItem {
  id: string;
  description: string;
  isCompleted:boolean;
}

export default function Home() {
  const todoService = new TodoService();
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);


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

    todoService
      .updateTodo(todoId, newDescription)
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, description: newDescription } : todo,
        );
        setTodos(updatedTodos);
        alert("todo updated")
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
        alert("todo deleted");
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };


  const handleMarkCompleted = (todoId: string) => {
    todoService
      .MarkTodo(todoId)
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, isCompleted: true } : todo
        );
        setTodos(updatedTodos);
        alert('Hurray!! Todo Completed');
      })
      .catch((error) => {
        console.error('Error marking todo as completed:', error);
      });
  };
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div>
      <Header />
      <div className="container">
        {
          !loggedIn && <h1>Welcome to Todo Application</h1>
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

            <button
              className="btn toggle-button"
              onClick={() => setShowCompleted(!showCompleted)} // Toggle completed todos visibility
            >
              {showCompleted ? 'Hide Completed' : 'Show Completed'}
            </button>

            <div className="todo-list">
              <h2>Todos</h2>
              {incompleteTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todoId={todo.id}
                  description={todo.description}
                  isCompleted={todo.isCompleted}
                  onUpdate={handleUpdateTodo}
                  onMarkCompleted={handleMarkCompleted}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>

            {showCompleted && (
              <div className="todo-list">
                <h2> Well done!!! Your Completed Todos</h2>
                {completedTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todoId={todo.id}
                    description={todo.description}
                    isCompleted={todo.isCompleted}
                    onUpdate={handleUpdateTodo}
                    onMarkCompleted={handleMarkCompleted}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
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






