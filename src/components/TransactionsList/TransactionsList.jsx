import { useState } from 'react';
import TransactionItem from 'components/TransactionItem/TransactionItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = () => {
    // Simulating fetching data from the server
    const newTransaction = {
      id: transactions.length + 1,
      description: 'New Transaction',
      amount: 100,
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <ul className={styles.TransactionList}>
      {data.map(item => (
        <TransactionItem key={item.id} transaction={item} />
      ))}
    </ul>
  );
};

export default TransactionsList;
