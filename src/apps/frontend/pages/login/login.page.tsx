import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './login.page.scss';
import { AccessService } from '../../services';

export default function Login(): React.ReactElement {
 const  accessService = new AccessService();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState(''); // State variable for username error
  const [passwordError, setPasswordError] = useState(''); // State variable for password error
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      return navigation('/');
    }
  }, []);

  const login = useCallback(async () => {
    setSuccess(false);
    setError(false);
    setUsernameError(''); // Reset username error
    setPasswordError(''); // Reset password error

    try {
      const loginresult = await accessService.login(username, password);

      const response = await accessService.generateAccessToken(
        username,
        password,
      );

      localStorage.setItem('accountId', `${loginresult.data.id}`);
      localStorage.setItem('token', `${response.data.token}`);

      alert('Your login is successful');
      navigation(`/${loginresult.data.id}/todos`);
      setSuccess(true);
    } catch (err) {
      setError(true);

      if (err.response) {
        if (err.response.status === 401) {
          // Set password error message for incorrect password
          setPasswordError('Incorrect password. Please try again.');
        } else if (err.response.status === 404) {
          // Set username error message for non-existing username
          setUsernameError('User does not exist. Enter a valid username.');
        }
      }
    }
  }, [accessService, username, password, navigation]);

  return (
    <form className="form-container">
      <h2>Login</h2>
      {success ? <h2 id="success">SUCCESS!</h2> : null}
      {error ? <h2 id="error">Login Error Please Try again!</h2> : null}

      <div className="input-group">
        <label htmlFor="username">Enter your username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          value={username}
          type="text"
          placeholder="Username"
        />
        {/* Render the username error message */}
        {usernameError && <div className="error-message">{usernameError}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
          type="password"
          placeholder="Password"
        />
        {/* Render the password error message */}
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>

      <button type="button" onClick={login}>
        LOGIN
      </button>

      <p> don't have a account register here
        {''}
      <Link to="/register">Register here</Link>

      </p>
            </form>);

}
