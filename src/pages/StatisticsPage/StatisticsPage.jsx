// StatisticsPage.jsx
import styles from './StatisticsPage.module.css';

import StatisticsDashboard from '../../components/Statistics/StatisticsDashboard';
import StatisticsTable from '../../components/Statistics/StatisticsTable';
import StatisticsChart from 'components/Statistics/StatisticsChart';

const StatisticsPage = () => {
  return (
    <div className={styles.statisticsPage}>
      <div className={styles.titleAndChart}>
        <h1 className={styles.title}>Statistics</h1>
        <StatisticsChart />
      </div>

      <div className={styles.dashboardAndTable}>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsPage;
// ------------------------------------
