import React, { useCallback, useState } from 'react';
import { useDeps } from '../../contexts';
import './register.css';

export default function Registration(): React.ReactElement {
  const { accessService } = useDeps();
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
        'Password must contain at least one uppercase letter, one lowercase letter, one special symbol, and be at least 6 characters long.'
      );
      return;
    }

    // Validate email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      setEmailError('Enter a valid email address');
      return;
    }

    try {
      const Object = await accessService.register(username, name, password, email);
      console.log(Object.data.token + ' this is token');
      localStorage.setItem('token', Object.data.token);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  }, [accessService, username, name, password, email]);

  return (
    <form>
      {success ? <h2 id='success'>Registration Successful!</h2> : null}
      {error ? <h2 id='error'>Registration Error!</h2> : null}
      <input
        onChange={(e) => setUsername(e.target.value)}
        id='username'
        value={username}
        type='text'
        placeholder='Username'
      />
      {usernameError && <div className='error-message'>{usernameError}</div>}
      <input
        onChange={(e) => setName(e.target.value)}
        id='name'
        value={name}
        type='text'
        placeholder='Name'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        id='password'
        value={password}
        type='password'
        placeholder='Password'
      />
      {passwordError && <div className='error-message'>{passwordError}</div>}
      <input
        onChange={(e) => setEmail(e.target.value)}
        id='email'
        value={email}
        type='email'
        placeholder='Email'
      />
      {emailError && <div className='error-message'>{emailError}</div>}
      <button type='button' onClick={register}>
        REGISTER
      </button>
    </form>
  );
}
