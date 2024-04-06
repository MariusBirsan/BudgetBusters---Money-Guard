import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';

const StatisticsTable = ({ selectedMonth, selectedYear }) => {
  const [categoriesSummary, setCategoriesSummary] = useState([]);
  const [incomeSummary, setIncomeSummary] = useState(0);
  const [expenseSummary, setExpenseSummary] = useState(0);
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

        const filteredCategories = data.categoriesSummary.filter(
          category => category.name !== 'Income'
        );
        const backgroundColors = filteredCategories.map(
          (category, index) =>
            `hsl(${(index * 360) / filteredCategories.length}, 70%, 50%)`
        );

        const categoriesWithColors = filteredCategories.map(
          (category, index) => ({
            ...category,
            color: backgroundColors[index],
          })
        );

        setCategoriesSummary(categoriesWithColors);
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
          <tr className={styles.headTable}>
            <th>Category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody className={styles.contentTable}>
          {categoriesSummary.map((category, index) => (
            <tr className={styles.objectTable} key={index}>
              <td>
                <span
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '2px',
                    backgroundColor: category.color,
                    marginRight: '16px',
                    verticalAlign: 'middle',
                  }}
                ></span>
                {category.name}
              </td>
              <td>{category.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.summary}>
        <p className={styles.type}>
          <span className={styles.label}>Expense:</span>
          <span className={styles.totalExpense}>{expenseSummary}</span>
        </p>
        <p className={styles.type}>
          <span className={styles.label}>Income:</span>
          <span className={styles.totalIncome}>{incomeSummary}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;
