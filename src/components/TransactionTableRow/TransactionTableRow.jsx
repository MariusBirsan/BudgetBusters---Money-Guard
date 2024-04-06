import {
  formatData,
  getTransactionCategory,
} from 'constants/TransactionCategories';
import icons from '../../images/icons/sprite.svg';
import React, { useState } from 'react';
import styles from './TransactionTableRow.module.css';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import ModalDeleteTransaction from '../ModalDeleteTransaction/ModalDeleteTransaction';

const TransactionTableRow = ({ transaction }) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;
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
      <td className={styles.TransactionDateColumn}>
        {formatData(transactionDate)}
      </td>
      <td className={styles.TransactionTypeColumn}>
        {type === 'INCOME' ? '+' : '-'}
      </td>
      <td className={styles.TransactionCategoryColumn}>
        {getTransactionCategory(categoryId)}
      </td>
      <td className={styles.TransactionCommentColumn}>{comment}</td>
      <td className={`${styles.TransactionAmountColumn} ${textClass}`}>
        {amount}
      </td>
      <td className={styles.TransactionEditColumn}>
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
      <td className={styles.TransactionDeleteColumn}>
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
