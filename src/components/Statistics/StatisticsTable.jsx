// StatisticsTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';

const StatisticsTable = ({ selectedMonth, selectedYear }) => {
  const [categoriesSummary, setCategoriesSummary] = useState([]);
  const [incomeSummary, setIncomeSummary] = useState(0);
  const [expenseSummary, setExpenseSummary] = useState(0);

  // Extrag tokenul din starea Redux
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/transactions-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            month: selectedMonth || new Date().getMonth() + 1,
            year: selectedYear || new Date().getFullYear(),
          },
        });

        setCategoriesSummary(data.categoriesSummary || []);
        setIncomeSummary(data.incomeSummary || 0);
        setExpenseSummary(data.expenseSummary || 0);
      } catch (error) {
        console.error('Eroare la preluarea datelor:', error);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear, token]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Categorie</th>
            <th>Sumă</th>
          </tr>
        </thead>
        <tbody>
          {categoriesSummary.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.summary}>
        <p>
          <strong>Total Venituri:</strong> {incomeSummary}
        </p>
        <p>
          <strong>Total Cheltuieli:</strong> {expenseSummary}
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;
