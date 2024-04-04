import React, { useEffect } from 'react';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';
import styles from './ModalEditTransaction.module.css';
import { GrClose } from 'react-icons/gr';
import FormButton from 'components/common/FormButton/FormButton';

const ModalEditTransaction = ({ closeModal }) => {
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

  // Opreste derularea in background:
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Add event listener for the keydown event
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] to ensure that the effect is only called once on mount
  // Nu elimina comentariile de mai sus! Don't delete the comments above!

  return (
    <div className={styles['modal-overlay']} onClick={onBackdropClick}>
      <div className={styles['modal-content']}>
        <div className={styles['gradient-background']} />{' '}
        <button className={styles['close-button']} onClick={closeModal}>
          <GrClose />
        </button>
        <h2 className={styles['title']}>Edit transaction</h2>
        <EditTransactionForm />
        {/* CANCEL BUTTON */}
        <FormButton
          type={'button'}
          text={'cancel'}
          variant={'whiteButtton'}
          handlerFunction={closeModal}
        />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
