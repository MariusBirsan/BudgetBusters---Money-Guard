import styles from './TransactionTableRow.module.css';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount } = transaction;
  return (
    <>
      <tr className={styles.TransactionTableRow}>
        {transaction.transactionDate}
      </tr>
      <tr className={styles.TransactionTableRow}>{type}</tr>
      <tr className={styles.TransactionTableRow}>{categoryId}</tr>
      <tr className={styles.TransactionTableRow}>{comment}</tr>
      <tr className={styles.TransactionTableRow}>{amount}</tr>
      <tr className={styles.TransactionTableRow}>
        <button type="button">Edit</button>
      </tr>
      <tr className={styles.TransactionTableRow}>
        <button type="button">Delete</button>
      </tr>
    </>
  );
};

export default TransactionTableRow;
