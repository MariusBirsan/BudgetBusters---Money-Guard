import React, { useState } from 'react';
import { expensesCategories } from '../../constants/expensesCategories'; // Import the list of expense categories

const AddTransactionForm = ({ closeModal }) => {
  const [transactionType, setTransactionType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState(expensesCategories[0].id); // Initialize with the id of the first category from the list

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
        setCategory(expensesCategories[0].id); // Reset to the id of the first category from the list
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

  const handleCancel = () => {
    // Reset form fields:
    setAmount('');
    setDate('');
    setComment('');
    setCategory(expensesCategories[0].id); // Reset to the id of the first category from the list
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={handleToggleTransactionType}>
        Toggle transaction type
      </button>
      {transactionType === 'expense' && (
        <div>
          <label htmlFor="category">Category:</label>
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
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={comment} onChange={handleCommentChange} />
      </div>

      <div>
        <button type="submit">
          {transactionType === 'income' ? 'Add Income' : 'Add Expense'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
