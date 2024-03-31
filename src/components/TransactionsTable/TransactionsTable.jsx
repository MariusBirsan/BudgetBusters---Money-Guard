import { useState } from 'react';
import TransactionTableRow from 'components/TransactionTableRow/TransactionTableRow';
import styles from './TransactionsTable.module.css';

const TransactionsTable = ({ data }) => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRowData = TransactionTableRow(); // Fetch data for new row
    const newRow = {
      id: rows.length + 1,
      data: newRowData,
    };
    setRows([...rows, newRow]);
  };

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
        <tbody>
          {data.map(item => (
            <TransactionTableRow key={item.id} transaction={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
