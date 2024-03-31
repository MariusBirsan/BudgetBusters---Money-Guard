import TransactionTableRow from 'components/TransactionTableRow/TransactionTableRow';
import styles from './TransactionsTable.module.css';

const TransactionsTable = ({ data }) => {
  return (
    <div className={styles.TransactionsTable}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map(item => (
            <TransactionTableRow key={item.id} transaction={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
