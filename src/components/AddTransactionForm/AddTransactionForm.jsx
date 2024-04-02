import React, { useState } from 'react';
import { expensesCategories } from '../../constants/expensesCategories';
import styles from './AddTransactionForm.module.css';

const AddTransactionForm = () => {
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

    // Logica de trimitere a datelor la server:
    const transactionData = {
      transactionDate: date,
      type: transactionType.toUpperCase(),
      categoryId: category, // Use the category id
      comment: comment,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header here if needed
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        // Transaction created successfully:
        console.log('Transaction created successfully');
        // Reset form fields:
        setAmount('');
        setDate('');
        setComment('');
        setCategory(''); // Reset to empty value
      } else {
        // Error creating transaction
        console.error('Error creating transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleToggleTransactionType = () => {
    setTransactionType(prevType =>
      prevType === 'income' ? 'expense' : 'income'
    );
  };

  // const handleCancel = () => {
  //   setAmount('');
  //   setDate('');
  //   setComment('');
  //   setCategory('');
  // };

  return (
    <form onSubmit={handleSubmit} className={styles['transaction-form']}>
      <button
        type="button"
        onClick={handleToggleTransactionType}
        className={styles['toggle-button']}
      >
        Toggle transaction type
      </button>
      {transactionType === 'expense' && (
        <div>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={styles['select']}
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
      )}
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

      <div className={styles['button-row']}>
        <button type="submit" className={styles['submit-button']}>
          {transactionType === 'income' ? 'Add Income' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
