import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';

const HomePage = () => {
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
      type: 'INCOME',
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
    <div className={`container ${styles.HomePage}`}>
      {screenCondition ? (
        <TransactionsTable data={data} />
      ) : (
        <TransactionsList data={data} />
      )}
    </div>
  );
};

export default HomePage;
