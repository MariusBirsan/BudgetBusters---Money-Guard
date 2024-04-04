import React, { useState } from 'react';

import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';
import Test from 'components/Test';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Test />

      <ButtonAddTransactions onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <ModalAddTransaction closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
