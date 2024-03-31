import icons from '../../images/icons/sprite.svg';
import styles from './TransactionTableRow.module.css';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount } = transaction;
  return (
    <tr>
      <td className={styles.TransactionTableRow}>
        {transaction.transactionDate}
      </td>
      <td className={styles.TransactionTableRow}>{type}</td>
      <td className={styles.TransactionTableRow}>{categoryId}</td>
      <td className={styles.TransactionTableRow}>{comment}</td>
      <td className={styles.TransactionTableRow}>{amount}</td>
      <td className={styles.TransactionTableRow}>
        <button className={styles.editButton} type="button">
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
      </td>
      <td className={styles.TransactionTableRow}>
        <button type="button">Delete</button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
