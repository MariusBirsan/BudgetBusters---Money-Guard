import React, { useState } from 'react';
import styles from './EditTransactionForm.module.css';
import FormButton from 'components/common/FormButton/FormButton';

const EditTransactionForm = () => {
  // Date fictive pentru a testa funcționalitatea formularului:
  const initialTransactionData = {
    date: '2024-03-31',
    transactionType: 'expense',
    amount: 100,
    comment: 'Cheltuială pentru cumpărături',
  };

  const [date, setDate] = useState(initialTransactionData.date);
  const [transactionType, setTransactionType] = useState(
    initialTransactionData.transactionType
  );
  const [amount, setAmount] = useState(
    initialTransactionData.amount.toString()
  );
  const [comment, setComment] = useState(initialTransactionData.comment);

  const handleSubmit = event => {
    event.preventDefault();
    // Trimite datele către server sau efectuează operațiile necesare aici
    console.log('Datele tranzacției editate:', {
      date,
      transactionType,
      amount,
      comment,
    });
    // Resetează valorile câmpurilor după trimiterea formularului
    setDate('');
    setTransactionType('');
    setAmount('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.transactionForm}>
      {/* TIPUL TRANZACTIEI: */}
      <div className={styles.transactionInfo}>
        <p>
          <strong> </strong>{' '}
          {transactionType === 'INCOME' ? 'Income' : 'Expense'}
        </p>
      </div>

      <div className={styles.formRow}>
        {/* SUMA: */}
        <div>
          <label htmlFor="amount"></label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={`${styles.input} ${styles.amountStyle}`}
            required
          />
        </div>

        {/* DATA TRANZACTIEI: */}
        <div>
          <label htmlFor="date"></label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>
      </div>

      {/* COMENTARIUL: */}
      <div>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className={styles.textarea}
        />
      </div>

      {/* BUTONUL SAVE: */}
      <div className={styles['submitButton']}>
        <FormButton
          type={'submit'}
          text={'save'}
          variant={'multiColorButtton'}
          handlerFunction={handleSubmit}
        />
      </div>
    </form>
  );
};

export default EditTransactionForm;
