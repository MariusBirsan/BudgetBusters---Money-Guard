import { useEffect, useRef } from 'react';
import styles from './ModalAddTransactionNew.module.css';
import AddTransactionFormNew from 'components/AddTransactionFormNew/AddTransactionFormNew';

const ModalAddTransactionNew = ({ closeModal }) => {
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
        className={styles.addModal}
        onClick={closeOnClickOutside}
      >
        <div className={styles.modalBg}>
          <AddTransactionFormNew closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default ModalAddTransactionNew;
