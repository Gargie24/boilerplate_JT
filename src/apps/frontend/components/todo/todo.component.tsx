// Todo.tsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaCheckCircle } from 'react-icons/fa';


import './todo.css';

interface TodoProps {
  todoId: string;
  description: string;
  isCompleted:boolean;
  onUpdate: (todoId: string, newDescription: string) => void;
  onDelete: (todoId: string) => void;
  onMarkCompleted: (todoId: string) => void; // Add the new prop for marking completed
}

const Todo: React.FC<TodoProps> = ({
  todoId,
  description,
  isCompleted,
  onUpdate,
  onDelete,
  onMarkCompleted, // Add the new prop
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = () => {
    onUpdate(todoId, editedDescription);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todoId);
  };
  const handleMarkCompleted = () =>{
    onMarkCompleted(todoId);
  }

  const [isMarkCompletedActive, setIsMarkCompletedActive] = useState(false);

  return (
    <div className={`todo-item ${isMarkCompletedActive ? 'completed' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <p className="card-text"></p>
      )}

      <div className="todo-container">
        <p className="todo-description">{description}</p>
        <div className="todo-icons">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="icon-button update-icon"
          >
            <FaEdit />
          </button>

          <button onClick={handleDelete} className="icon-button delete-icon">
            <FaTrash />
          </button>

          <button
        onClick={() => {
          setIsMarkCompletedActive(!isMarkCompletedActive);
          handleMarkCompleted();
        }}
        className={`icon-button mark-completed-icon ${
          isCompleted ? 'active' : ''
        }`}
      >
        {isCompleted ? <FaCheckCircle /> : <FaCheck />}
      </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
