import {
  formatData,
  getTransactionCategory,
} from 'constants/TransactionCategories';
import icons from '../../images/icons/sprite.svg';
import styles from './TransactionTableRow.module.css';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;

  let textClass = '';

  // Determine class based on data
  if (type === 'INCOME') {
    textClass = styles.incomeText; // Access class from CSS module
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  return (
    <tr className={styles.dataRow}>
      <td className={styles.TransactionTableRow}>
        {formatData(transactionDate)}
      </td>
      <td className={styles.TransactionTableRow}>
        {type === 'INCOME' ? '+' : '-'}
      </td>
      <td className={styles.TransactionTableRow}>
        {getTransactionCategory(categoryId)}
      </td>
      <td className={styles.TransactionTableRow}>{comment}</td>
      <td className={`${styles.TransactionTableRow} ${textClass}`}>{amount}</td>
      <td className={styles.TransactionTableRow}>
        <button className={styles.editButton} type="button">
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
      </td>
      <td className={styles.TransactionTableRow}>
        <button type="button" className={styles.deleteButton}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
