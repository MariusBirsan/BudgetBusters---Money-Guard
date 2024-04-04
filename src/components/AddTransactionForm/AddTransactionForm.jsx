import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../redux/axiosConfig';
import styles from './AddTransactionForm.module.css';
import FormButton from 'components/common/FormButton/FormButton';

const AddTransactionForm = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        axiosConfig.setAxiosBaseURL();
        axiosConfig.setAxiosHeader();
        const response = await axios.get('/api/transaction-categories');
        setExpenseCategories(response.data);
      } catch (error) {
        console.error('Error fetching expense categories:', error);
      } finally {
        axiosConfig.clearAxiosHeader();
      }
    };

    fetchExpenseCategories();
  }, []);

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

  const resetForm = () => {
    setAmount('');
    setDate('');
    setComment('');
    setCategory('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Verificați dacă data este goală sau nedefinită și setați-o la currentDate dacă este cazul
    let adjustedDate = date || currentDate;

    // Verificăm dacă date este o valoare validă de tip data ISO 8601
    if (!isIso8601Date(adjustedDate)) {
      console.error('Invalid ISO 8601 date format:', adjustedDate);
      return; // Ieșiți din funcție sau tratați eroarea în alt mod
    }

    // Continuați cu logica existentă pentru trimiterea cererii către server
    let transactionAmount = parseFloat(amount);
    if (transactionType === 'expense') {
      transactionAmount = -Math.abs(transactionAmount);
    }

    const transactionData = {
      transactionDate: adjustedDate,
      type: transactionType.toUpperCase(),
      categoryId: category,
      comment: comment,
      amount: transactionAmount,
    };

    try {
      setLoading(true);
      axiosConfig.setAxiosBaseURL();
      axiosConfig.setAxiosHeader();
      await axios.post('/api/transactions', transactionData);
      setLoading(false);
      resetForm();
      console.log('Transaction created successfully');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error('Error creating transaction:', error.message);
    } finally {
      axiosConfig.clearAxiosHeader();
    }
  };

  // Funcție pentru a verifica dacă o valoare este în formatul corect de tip data ISO 8601
  const isIso8601Date = date => {
    return /\d{4}-\d{2}-\d{2}/.test(date);
  };

  const handleToggleTransactionType = () => {
    setTransactionType(prevType =>
      prevType === 'income' ? 'expense' : 'income'
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.transactionForm}>
      {/* TOGGLE BUTTON */}
      <button
        type="button"
        onClick={handleToggleTransactionType}
        className={styles.toggleButton}
      >
        Toggle transaction type
      </button>

      {/* SELECT A CATEGORY */}
      <div>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className={`${styles.select} ${
            transactionType === 'income' && styles.hidden
          }`}
          placeholder="Category"
        >
          <option value="">Select a category</option> {/* Placeholder */}
          {expenseCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* AMOUNT */}
      <div className={styles.formRow}>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
          className={`${styles.input} ${styles.amountStyle}`}
          placeholder="0.00"
        />

        {/* DATE */}
        <input
          type="date"
          id="date"
          value={date || currentDate} // Folosește data curentă sau valoarea din state
          onChange={handleDateChange}
          required
          className={styles.input}
          placeholder="Date"
        />
      </div>

      {/* COMMENT */}
      <div>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className={styles.textarea}
          placeholder="Comment"
        />
      </div>

      {/* ADD BUTTON */}
      <div className={styles.submitButton}>
        <FormButton
          type={'submit'}
          text={transactionType === 'income' ? 'Add Income' : 'Add Expense'}
          variant={'multiColorButtton'}
        />
      </div>

      {/* Afiseaza mesajul de loading */}
      {loading && <p>Loading...</p>}
      {/* Afiseaza mesajul de eroare, daca exista */}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AddTransactionForm;
