import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './StatisticsChart.module.css';
import { selectUserData } from '../../redux/auth/selectors';

const totalTextPlugin = balance => ({
  id: 'totalTextPlugin',
  beforeDraw: chart => {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    ctx.restore();
    ctx.font = '18px Poppins, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';

    // Folosesc balance pentru a afișa soldul în mijlocul graficului
    const text = `₴ ${balance.toFixed(2)}`,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
});

const StatisticsChart = ({ month, year }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  const token = useSelector(state => state.auth.token);
  const user = useSelector(selectUserData);
  const balance = user?.balance || 0; // Extrag soldul utilizatorului

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/transactions-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            month: month || new Date().getMonth() + 1,
            year: year || new Date().getFullYear(),
          },
        });

        const filteredCategories = response.data.categoriesSummary.filter(
          category => category.name !== 'Income'
        );

        const labels = filteredCategories.map(category => category.name);
        const data = filteredCategories.map(category => category.total);
        const backgroundColors = filteredCategories.map(
          (category, index) =>
            `hsl(${(index * 360) / filteredCategories.length}, 70%, 50%)`
        );

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: backgroundColors,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Eroare la preluarea datelor pentru grafic:', error);
      }
    };

    fetchData();
  }, [month, year, token]);

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      totalTextPlugin: totalTextPlugin(balance),
    },
    elements: {
      arc: {
        hoverOffset: 4,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[totalTextPlugin(balance)]}
      />
    </div>
  );
};

export default StatisticsChart;
