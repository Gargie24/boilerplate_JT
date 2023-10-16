import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { AccessService } from '../../services';

export default function Registration(): React.ReactElement {
  const accessService = new AccessService();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Validation state
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (password) => {
    // Password validation logic
    // Example: Password must contain at least one uppercase, one lowercase, one special symbol, and be at least 6 characters long.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    return passwordRegex.test(password);
  };

  const register = useCallback(async () => {
    setSuccess(false);
    setError(false);
    setUsernameError('');
    setPasswordError('');
    setEmailError('');

    // Validate username
    if (!username.match(/^[0-9a-zA-Z]+$/)) {
      setUsernameError('Username must be alphanumeric');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one special symbol, and be at least 6 characters long.',
      );
      return;
    }

    // Validate email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      setEmailError('Enter a valid email address');
      return;
    }

    try {
      const result = await accessService.register(
        username,
        password,
        name,
        email,
      );
      console.log(result);

      alert('Registration Sucessful');
      navigate('/login');
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  }, [accessService, username, password, name, email]);

  return (
    <form className="form-container">
      <h2>Registration</h2>
      {success ? <h2 id="success">Registration Successful!</h2> : null}
      {error ? <h2 id="error">Registration Error!</h2> : null}

      <div className="input-group">
        <label htmlFor="username">Enter your username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          value={username}
          type="text"
          placeholder="Username"
        />
        {usernameError && <div className="error-message">{usernameError}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="name">Enter your name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          value={name}
          type="text"
          placeholder="Name"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Enter your password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
          type="password"
          placeholder="Password"
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="email">Enter your email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          value={email}
          type="email"
          placeholder="Email"
        />
        {emailError && <div className="error-message">{emailError}</div>}
      </div>

      <button type="button" onClick={register}>
        REGISTER
      </button>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}
