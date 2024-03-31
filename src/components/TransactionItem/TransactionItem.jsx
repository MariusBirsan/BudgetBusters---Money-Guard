import styles from './TransactionItem.module.css';
import icons from '../../images/icons/sprite.svg';

const TransactionItem = ({ transaction }) => {
  return (
    <li className={styles.TransactionItem}>
      <div className={styles.row}>
        <span>Date</span>
        <span>Type</span>
        <span>Category</span>
        <span>Comment</span>
        <span>Sum</span>
        <button type="button">Delete</button>
      </div>
      <div className={styles.row}>
        <span>{transaction.transactionDate}</span>
        <span>{transaction.type}</span>
        <span>{transaction.categoryId}</span>
        <span>{transaction.comment}</span>
        <span>{transaction.amount}</span>
        <button className={styles.editButton} type="button">
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
          <span>Edit</span>
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
