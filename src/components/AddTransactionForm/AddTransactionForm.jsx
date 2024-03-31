import React, { useState } from 'react';
import { expensesCategories } from '../../constants/expensesCategories'; // Importăm lista de categorii de cheltuieli

const AddTransactionForm = () => {
  const [transactionType, setTransactionType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState(expensesCategories[0].id); // Inițializăm cu id-ul primei categorii din listă

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

    const transactionData = {
      transactionDate: date,
      type: transactionType.toUpperCase(),
      categoryId: category, // Utilizăm id-ul categoriei
      comment: comment,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adaugă header-ul de autorizare aici, dacă este necesar
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        // Tranzacția a fost creată cu succes:
        console.log('Tranzacția a fost creată cu succes');
        // Resetăm câmpurile formularului:
        setAmount('');
        setDate('');
        setComment('');
        setCategory(expensesCategories[0].id); // Resetăm la id-ul primei categorii din listă
      } else {
        // A apărut o eroare la crearea tranzacției
        console.error('Eroare la crearea tranzacției:', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la crearea tranzacției:', error);
    }
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
              <option key={category.id} value={category.id}>
                {category.name}
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
