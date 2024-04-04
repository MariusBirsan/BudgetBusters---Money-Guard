import icons from '../../images/icons/sprite.svg';
import React, { useState } from 'react';
import styles from './TransactionTableRow.module.css';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import ModalDeleteTransaction from '../ModalDeleteTransaction/ModalDeleteTransaction';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount } = transaction;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Stare pentru modalul de editare
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Stare pentru modalul de ștergere

  let textClass = '';

  // Determine class based on data
  if (type === 'INCOME') {
    textClass = styles.incomeText; // Access class from CSS module
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
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
        {/* Butonul pentru deschiderea modalului de editare */}
        <button
          className={styles.editButton}
          type="button"
          onClick={handleOpenEditModal}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>

        {/* Modalul pentru editarea tranzacției */}
        {isEditModalOpen && (
          <ModalEditTransaction
            transaction={transaction}
            closeModal={() => setIsEditModalOpen(false)} // Proprietate pentru închiderea modalului
          />
        )}
      </td>
      <td className={styles.TransactionTableRow}>
        {/* Butonul pentru deschiderea modalului de ștergere */}
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleOpenDeleteModal}
        >
          Delete
        </button>

        {/* Modalul pentru ștergerea tranzacției */}
        {isDeleteModalOpen && (
          <ModalDeleteTransaction
            transaction={transaction}
            closeModal={() => setIsDeleteModalOpen(false)} // Proprietate pentru închiderea modalului
          />
        )}
      </td>
    </tr>
  );
};

export default TransactionTableRow;
