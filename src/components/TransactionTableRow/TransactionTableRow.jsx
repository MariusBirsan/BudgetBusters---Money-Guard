import icons from '../../images/icons/sprite.svg';
import React, { useState } from 'react';
import styles from './TransactionTableRow.module.css';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount } = transaction;
  const [isModalOpen, setIsModalOpen] = useState(false);

  let textClass = '';

  // Determine class based on data
  if (type === 'INCOME') {
    textClass = styles.incomeText; // Access class from CSS module
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <tr className={styles.dataRow}>
      <td className={styles.TransactionTableRow}>
        {transaction.transactionDate}
      </td>
      <td className={styles.TransactionTableRow}>{type}</td>
      <td className={styles.TransactionTableRow}>{categoryId}</td>
      <td className={styles.TransactionTableRow}>{comment}</td>
      <td className={`${styles.TransactionTableRow} ${textClass}`}>{amount}</td>
      <td className={styles.TransactionTableRow}>
        {/* Butonul pentru deschiderea modalului */}
        <button
          className={styles.editButton}
          type="button"
          onClick={handleOpenModal}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>

        {/* Modalul pentru editarea tranzacției */}
        {isModalOpen && (
          <ModalEditTransaction
            transaction={transaction}
            closeModal={() => setIsModalOpen(false)} // Proprietate pentru închiderea modalului
          />
        )}
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
