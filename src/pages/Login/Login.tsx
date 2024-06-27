import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.type === 'auth/loginUser/fulfilled') {
        navigate('/profile');
      }
    });
  };

  const { status, error } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default Login;
