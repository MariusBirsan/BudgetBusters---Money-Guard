// StatisticsPage.jsx
import React from 'react';
import StatisticsChart from '../../components/Statistics/StatisticsChart';
import StatisticsDashboard from '../../components/Statistics/StatisticsDashboard';
import StatisticsTable from '../../components/Statistics/StatisticsTable';
import styles from './StatisticsPage.module.css';

const StatisticsPage = () => {
  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.titleandchart}>
        <h1 className={styles.title}>Statistics</h1>
        <div className={styles.chartContainer}>
          <StatisticsChart />
        </div>
      </div>

      <div className={styles.chartDashboardContainer}>
        <div>
          <StatisticsDashboard />
          <div className={styles.tableContainer}>
            <StatisticsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
