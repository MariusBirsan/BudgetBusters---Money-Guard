import React, { useEffect } from 'react';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import styles from './ModalAddTransaction.module.css'; // Import styles

const ModalAddTransaction = ({ closeModal }) => {
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close the modal if the click is made on the modal background
    }
  };

  // Function that closes the modal when the Esc key is pressed
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    // Add event listener for the keydown event
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // [] to ensure that the effect is only called once on mount

  return (
    <div className={styles['modal-overlay']} onClick={onBackdropClick}>
      <div className={styles['modal-content']}>
        <button className={styles['close-button']} onClick={closeModal}>
          X
        </button>
        <h2>Add transaction</h2>
        <AddTransactionForm />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
