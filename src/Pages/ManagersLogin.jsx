import React, { useState } from 'react';
import './ManagerLogin.css';
import axios from 'axios';

const ManagerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:8080/all', {
        username,
        password
      });

      
      console.log('Login successful');
      setError('');
      setUsername('jamila');
      setPassword('1234567');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Managers Login</h2>
      <form onSubmit={handleSubmit}>
        <label>USERNAME:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label>PASSWORD:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default ManagerLogin;
