import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ first_name, last_name, email, password })).then((res) => {
      if (res.type === 'auth/registerUser/fulfilled') {
        navigate('/profile');
      }
    });
  };

  const { status, error } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          placeholder="Last Name"
          required
        />
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
        <button type="submit">Register</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Ошибка</p>}
    </div>
  );
};

export default Register;
