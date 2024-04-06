// StatisticsPage.jsx
import React, { useRef } from 'react';
import StatisticsChart from '../../components/Statistics/StatisticsChart';
import StatisticsDashboard from '../../components/Statistics/StatisticsDashboard';
import StatisticsTable from '../../components/Statistics/StatisticsTable';
import styles from './StatisticsPage.module.css';
import { fetchTransactionsSummary } from '../../redux/transactions/operations';

import { Months_OPTIONS, YEARS_OPTIONS } from 'constants/TransactionConstants';
import { useDispatch } from 'react-redux';

const StatisticsPage = () => {
  const dispatch = useDispatch();

  const mounthRef = useRef();
  const yearRef = useRef();

  const handleChange = event => {
    debugger;

    const mounth = mounthRef.current.value;
    const year = yearRef.current.value;

    dispatch(fetchTransactionsSummary({ mounth, year }));
  };

  return (
    // <div className={styles.statisticsContainer}>
    //   <div className={styles.titleandchart}>
    //     <h1 className={styles.title}>Statistics</h1>
    //     <div className={styles.chartContainer}>
    //       <StatisticsChart />
    //     </div>
    //   </div>

    //   <div className={styles.chartDashboardContainer}>
    //     <div>
    //       <StatisticsDashboard />
    //       <div className={styles.tableContainer}>
    //         <StatisticsTable />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className={styles.dropdownsWrapper}>
      <select onChange={handleChange} ref={mounthRef}>
        {Months_OPTIONS.map(item => (
          <option
            key={item.value}
            value={item.value}
            label={item.label}
          ></option>
        ))}
      </select>

      <select onChange={handleChange} ref={yearRef}>
        {YEARS_OPTIONS.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsPage;
// ------------------------------------
