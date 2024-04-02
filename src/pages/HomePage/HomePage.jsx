import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';
import { logOut } from '../../redux/auth/authSlice';

import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';

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

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });
  const data = [
    {
      id: '1',
      transactionDate: 'string',
      type: 'INCOME',
      categoryId: 'string',
      userId: 'string',
      comment: 'string',
      amount: 0,
      balanceAfter: 0,
    },
    {
      id: '2',
      transactionDate: 'string',
      type: 'EXPENSE',
      categoryId: 'string',
      userId: 'string',
      comment: 'string',
      amount: 0,
      balanceAfter: 0,
    },
    {
      id: '3',
      transactionDate: 'string',
      type: 'INCOME',
      categoryId: 'string',
      userId: 'string',
      comment: 'string',
      amount: 0,
      balanceAfter: 0,
    },
  ];

  return (
    <div className={styles.HomePage}>
      {screenCondition ? (
        <TransactionsTable data={data} />
      ) : (
        <TransactionsList data={data} />
      )}
      <button onClick={handleLogout}>Logout</button>

      <ButtonAddTransactions onClick={openModal} />
      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </div>
  );
};

export default HomePage;
