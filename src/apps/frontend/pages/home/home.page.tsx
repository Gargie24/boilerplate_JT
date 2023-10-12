import React, { useState, useEffect } from 'react';



export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>

      <div className="container">
        <h1>Welcome to Todo Application</h1>
        {loggedIn ? (
          // User is logged in, display the "Add Todo" button
          <button
            className="add-todo-button"
            onClick={() => {
              // Add your logic for adding a todo here
              console.log('Add todo button clicked');
            }}
          >
            Add Todo
          </button>
        ) : (
          // User is not logged in, show the login form
          <form>
            {/* Your login form content */}
          </form>
        )}
      </div>
    </div>
  );
}
