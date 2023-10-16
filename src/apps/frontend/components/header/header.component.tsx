import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const updateUserFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    setUser(token);
  };

  useEffect(() => {
    updateUserFromLocalStorage();
  }, [user]);

  const handleLogout = () => {
    alert('logout');
    localStorage.clear();
    setUser(null);

    navigate('/login');
  };

  return (
    <div className="container">
      <nav>
        <div className="navbar">
          <div className="brand">
            <a href="#">TodoApp</a>
          </div>
          <div className="nav-buttons">
            {!user && (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
            {!user && (
              <Link className="nav-link" to="/register">
                Registration
              </Link>
            )}
            {user && (
              <Link className="nav-link" onClick={handleLogout} to="/login">
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
