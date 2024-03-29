import React, { useState } from 'react';
import { expensesCategories } from '../../constants/expensesCategories'; // Importăm lista de categorii de cheltuieli

const AddTransactionForm = () => {
  const [transactionType, setTransactionType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState(expensesCategories[0]); // Starea pentru categoria de cheltuială, inițializată cu prima categorie din listă

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

  const handleSubmit = event => {
    event.preventDefault();
    // Aici vom trimite datele la un API
    console.log('Tip tranzacție:', transactionType);
    console.log('Sumă:', amount);
    console.log('Dată:', date);
    console.log('Comentariu:', comment);
    console.log('Categorie:', category);
    // După trimiterea datelor resetam formularul:
    setAmount('');
    setDate('');
    setComment('');
    setCategory(expensesCategories[0]); // Se resetează categoria la prima din listă
  };

  const handleToggleTransactionType = () => {
    setTransactionType(prevType =>
      prevType === 'income' ? 'expense' : 'income'
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Sumă:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Dată:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comentariu:</label>
        <textarea id="comment" value={comment} onChange={handleCommentChange} />
      </div>
      {transactionType === 'expense' && ( // Afișăm dropdown-ul doar dacă tipul de tranzacție este cheltuială
        <div>
          <label htmlFor="category">Categorie:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            {expensesCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
      <button type="submit">
        {transactionType === 'income' ? 'Adaugă venit' : 'Adaugă cheltuială'}
      </button>
      <button type="button" onClick={handleToggleTransactionType}>
        Comută tip tranzacție
      </button>
    </form>
  );
};

export default AddTransactionForm;
