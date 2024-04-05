import styles from './TransactionItem.module.css';
import icons from '../../images/icons/sprite.svg';
import {
  formatData,
  getTransactionCategory,
} from 'constants/TransactionCategories';

const TransactionItem = ({ transaction }) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;

  let textClass = '';

  // Determine class based on data
  if (type === 'INCOME') {
    textClass = styles.incomeText; // Access class from CSS module
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  return (
    <li className={`${styles.TransactionItem} ${textClass}`}>
      <div className={`${styles.row} ${styles.firstRow}`}>
        <span className={styles.fixData}>Date</span>
        <span className={styles.dynamicData}>
          {formatData(transactionDate)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.secondRow}`}>
        <span className={styles.fixData}>{type === 'INCOME' ? '+' : '-'}</span>
        <span className={styles.dynamicData}>{type}</span>
      </div>
      <div className={`${styles.row} ${styles.thirdRow}`}>
        <span className={styles.fixData}>Category</span>
        <span className={styles.dynamicData}>
          {getTransactionCategory(categoryId)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.forthRow}`}>
        <span className={styles.fixData}>Comment</span>
        <span className={styles.dynamicData}>{comment}</span>
      </div>
      <div className={`${styles.row} ${styles.fifthRow}`}>
        <span className={styles.fixData}>Sum</span>
        <span className={styles.dynamicData}>{amount}</span>
      </div>
      <div className={`${styles.row} ${styles.sixthRow}`}>
        <button type="button" className={styles.deleteButton}>
          Delete
        </button>
        <button className={styles.editButton} type="button">
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
          <span className={styles.editText}>Edit</span>
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
