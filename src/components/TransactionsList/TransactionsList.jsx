import TransactionItem from 'components/TransactionItem/TransactionItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data, openDeleteModal }) => {
  return (
    <ul className={styles.TransactionList}>
      {data.map(item => (
        <TransactionItem
          key={item.id}
          transaction={item}
          openDeleteModal={openDeleteModal}
        />
      ))}
    </ul>
  );
};

export default TransactionsList;
