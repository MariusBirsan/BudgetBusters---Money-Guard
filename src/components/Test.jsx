import React, { useEffect, useState } from 'react';
import axiosConfig from '../redux/axiosConfig';
import axios from 'axios';

const Test = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Setăm URL-ul de bază pentru Axios
    axiosConfig.setAxiosBaseURL();

    // Setăm antetul pentru autorizare folosind datele salvate în localStorage
    axiosConfig.setAxiosHeader();

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/transaction-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchTransactions();
    fetchCategories();

    // Curățăm antetul pentru autorizare după ce am terminat solicitarea API
    return () => {
      axiosConfig.clearAxiosHeader();
    };
  }, []);

  // Funcție pentru a obține numele categoriei bazat pe categoryId
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div>
      <h2>Transactions:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.transactionDate} - {transaction.type} -
              {getCategoryName(transaction.categoryId)} - {transaction.comment}-
              {transaction.amount}
            </li>
          ))}
        </ul>
      )}

      <h2>Categories:</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
