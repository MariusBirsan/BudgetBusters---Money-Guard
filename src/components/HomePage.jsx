// HomePage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/auth/authSlice';
import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';

import ModalAddTransaction from '../components/ModalAddTransaction/ModalAddTransaction';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <ButtonAddTransactions onClick={openModal} />
      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </div>
  );
};

export default HomePage;
