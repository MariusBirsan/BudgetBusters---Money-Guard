import { useEffect, useState } from 'react';

import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';

import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';

import ModalAddTransactionNew from 'components/ModalAddTransactionNew/ModalAddTransactionNew';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import { fetchAllTransactions } from '../../redux/transactions/operations';
import ModalDeleteTransaction from 'components/ModalDeleteTransaction/ModalDeleteTransaction';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const data = useSelector(selectAllTransactions);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setisEditModalOpen] = useState(false);

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      <div className={styles.HomePage}>
        {screenCondition ? (
          <TransactionsTable
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
          />
        ) : (
          <TransactionsList
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
          />
        )}

        <ButtonAddTransactions onClick={() => setIsAddModalOpen(true)} />
      </div>

      <>
        {isAddModalOpen && (
          <ModalAddTransactionNew closeModal={() => setIsAddModalOpen(false)} />
        )}

        {isDeleteModalOpen && (
          <ModalDeleteTransaction
            closeModal={() => setIsDeleteModalOpen(false)}
          />
        )}
      </>
    </>
  );
};

export default HomePage;
