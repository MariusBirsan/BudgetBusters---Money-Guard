import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';
// import { selectIsLoading } from '../../redux/auth/selectors';

const HomePage = () => {
  // const isLoading = useSelector(selectIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  // if (isLoading) {
  //   return <div>Aici vine loading screen ul</div>;
  // }

  return (
    <div className={styles.HomePage}>
      {screenCondition ? (
        <TransactionsTable data={data} />
      ) : (
        <TransactionsList data={data} />
      )}

      <ButtonAddTransactions onClick={openModal} />
      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </div>
  );
};

export default HomePage;
