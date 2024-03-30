import TransactionTableRow from 'components/TransactionTableRow/TransactionTableRow';
import styles from './TransactionsTable.module.css';

const TransactionsTable = ({ data }) => {
  return (
    <div className={styles.TransactionsTable}>
      TransactionsTable
      {data.map(item => (
        <TransactionTableRow key={item.id} transaction={item} />
      ))}
    </div>
  );
  //Table
};

export default TransactionsTable;
