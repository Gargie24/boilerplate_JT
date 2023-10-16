// Todo.tsx
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './todo.css';
interface TodoProps {
  todoId: string;
  description: string;
  onUpdate: (todoId: string, newDescription: string) => void;
  onDelete: (todoId: string) => void;

}

const Todo: React.FC<TodoProps> = ({ todoId, description, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = () => {
    onUpdate(todoId, editedDescription);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todoId);
  };

  return (
    <div className="todo-item">
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
        <p>

        </p>

      )}
      <div className="todo-container">
  <p className="todo-description">{description}</p>
  <div className="todo-icons">
  <button onClick={() => setIsEditing(!isEditing)} className="icon-button update-icon">
    <FaEdit /> {/* Replace "Edit" with the Edit icon */}
  </button>
  <button onClick={handleDelete} className="icon-button delete-icon">
    <FaTrash /> {/* Replace "Delete" with the Trash icon */}
  </button>
</div>
</div>
</div>
  );
};

export default Todo;
