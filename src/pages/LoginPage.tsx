// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { loginUser } from '../reducer/userSlice';
const LoginPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);
  const sessionId = useSelector((state: RootState) => state.user.sessionId);
  const error = useSelector((state: RootState) => state.user.error);

  const [inputUsername, setInputUsername] = useState(username);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(loginUser({ username: inputUsername, password }));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {sessionId && <p>Session ID: {sessionId}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
