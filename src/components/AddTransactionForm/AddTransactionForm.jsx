import React, { useState } from 'react';
import { expensesCategories } from '../../constants/expensesCategories';
import styles from './AddTransactionForm.module.css';
import { useDispatch } from 'react-redux';
import { addTransactionThunk } from '../../redux/transactions/operations';
import FormButton from 'components/common/FormButton/FormButton';

const AddTransactionForm = () => {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split('T')[0];
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Logica de trimitere a datelor la server folosind Redux Thunk:
    const transactionData = {
      transactionDate: date,
      type: transactionType.toUpperCase(),
      categoryId: category,
      comment: comment,
      amount: parseFloat(amount),
    };

    try {
      // Dispatch către acțiunea addTransactionThunk și așteptarea rezultatului
      await dispatch(addTransactionThunk(transactionData));

      // Dacă nu sunt erori, resetează formularul:
      setAmount('');
      setDate('');
      setComment('');
      setCategory('');

      // Afiseaza un mesaj de succes
      console.log('Transaction created successfully');
    } catch (error) {
      // Dacă apare o eroare, afișează mesajul de eroare corespunzător
      console.error('Error creating transaction:', error.message);
    }
  };

  const handleToggleTransactionType = () => {
    setTransactionType(prevType =>
      prevType === 'income' ? 'expense' : 'income'
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles['transaction-form']}>
      <button
        type="button"
        onClick={handleToggleTransactionType}
        className={styles['toggle-button']}
      >
        Toggle transaction type
      </button>
      <div>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className={`${styles['select']} ${
            transactionType === 'income' ? styles['hidden'] : ''
          }`}
          placeholder="Category"
        >
          <option value="">Select a category</option> {/* Placeholder */}
          {expensesCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['form-row']}>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
          className={`${styles['input']} ${styles['amount-style']}`}
          placeholder="0.00"
        />
        <input
          type="date"
          id="date"
          value={date || currentDate} // Folosește data curentă sau valoarea din state
          onChange={handleDateChange}
          required
          className={styles['input']}
          placeholder="Date"
        />
      </div>
      <div>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className={styles['textarea']}
          placeholder="Comment"
        />
      </div>

      <div className={styles['submitButton']}>
        <FormButton
          type={'submit'}
          text={transactionType === 'income' ? 'Add Income' : 'Add Expense'}
          variant={'multiColorButtton'}
          handlerFunction={handleSubmit}
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
