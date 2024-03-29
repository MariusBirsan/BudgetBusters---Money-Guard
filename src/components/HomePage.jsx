// HomePage.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/auth/authSlice';
import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>This is your homepage.</p>
      <button onClick={handleLogout}>Logout</button>
      <ButtonAddTransactions />
    </div>
  );
};

export default HomePage;
