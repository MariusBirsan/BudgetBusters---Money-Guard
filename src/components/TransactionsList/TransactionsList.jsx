import TransactionItem from 'components/TransactionItem/TransactionItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data }) => {
  return (
    <ul className={styles.TransactionList}>
      {data.map(item => (
        <TransactionItem key={item.id} transaction={item} />
      ))}
    </ul>
  );
};

export default TransactionsList;
