import React, { useState } from 'react';
import './ManagerLogin.css';

const ManagerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    
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
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default ManagerLogin;
