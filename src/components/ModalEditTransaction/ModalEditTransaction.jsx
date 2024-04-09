import { useEffect, useRef } from 'react';
import styles from './ModalEditTransaction.module.css';
import ModifyTransactionForm from 'components/ModifyTransactionForm/ModifyTransactionForm';

const ModalEditTransactionNew = ({ closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // setTimeout(() => {
    //   modalRef.current.classList.add(styles.isOpen);
    // }, 0);

    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', addCloseEvent);
    };
  });

  const closeOnClickOutside = event => {
    event.target === event.currentTarget && closeModal();
  };

  return (
    <>
      <div
        ref={modalRef}
        className={styles.editModal}
        onClick={closeOnClickOutside}
      >
        <div className={styles.modalBg}>
          <ModifyTransactionForm closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default ModalEditTransactionNew;
