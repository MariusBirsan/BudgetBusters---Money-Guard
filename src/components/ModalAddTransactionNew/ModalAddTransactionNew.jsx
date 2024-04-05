import { useEffect } from 'react';
import styles from './ModalAddTransactionNew.module.css';
import AddTransactionFormNew from 'components/AddTransactionFormNew/AddTransactionFormNew';

const ModalAddTransactionNew = ({ closeModal }) => {
  useEffect(() => {
    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);
    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  const closeOnClickOutside = event => {
    event.target === event.currentTarget && closeModal();
  };

  return (
    <>
      <div className={styles.addModal} onClick={closeOnClickOutside}>
        <div className={styles.modalBg}>
          <AddTransactionFormNew closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default ModalAddTransactionNew;
