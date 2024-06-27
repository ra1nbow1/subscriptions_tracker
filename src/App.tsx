import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div>
        <h1>My App</h1>
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
