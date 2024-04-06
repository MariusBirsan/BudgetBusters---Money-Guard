import styles from './ModalDeleteTransaction.module.css';
import { useMediaQuery } from 'react-responsive';
import FormButton from 'components/common/FormButton/FormButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '../../redux/transactions/operations';
import { changeBalanceValue } from '../../redux/auth/slice';

const ModalDeleteTransaction = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };

    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  });

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && closeModal();
  };

  const handleDelete = () => {
    const { id, amount } = transaction; // Destructurarea obiectului transaction pentru a accesa id-ul și amount-ul
    dispatch(deleteTransactionThunk(id))
      .unwrap()
      .then(() => {
        dispatch(changeBalanceValue(amount));
        closeModal();
      });
  };

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  // Opreste derularea in background
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className={`${styles.test} ${styles.deleteModal}`}
      onClick={closeOnClickOutside}
    >
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && (
            <p>Are you sure you want to DELETE this transaction?</p>
          )}

          <div className={styles.buttonsWrapper}>
            <FormButton
              type={'button'}
              text={'DELETE'}
              variant={'multiColorButtton'}
              handlerFunction={handleDelete} // Utilizează funcția handleDelete pentru a gestiona ștergerea
            />
            <FormButton
              type={'button'}
              text={'cancel'}
              variant={'whiteButtton'}
              handlerFunction={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTransaction;
