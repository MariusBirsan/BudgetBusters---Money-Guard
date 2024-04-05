// StatisticsChart.jsx
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './StatisticsChart.module.css';

const totalTextPlugin = {
  id: 'totalTextPlugin',
  beforeDraw: chart => {
    let total = 0;
    chart.data.datasets.forEach(dataset => {
      total += dataset.data.reduce((sum, value) => sum + value, 0);
    });

    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    ctx.restore();
    ctx.font = '18px Poppins, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';

    const text = `₴ ${total}`,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const options = {
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    totalTextPlugin,
  },
};

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

  // Extrag tokenul din starea Redux
  const token = useSelector(state => state.auth.token);

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

        const labels = response.data.categoriesSummary.map(
          category => category.name
        );
        const data = response.data.categoriesSummary.map(
          category => category.total
        );
        const backgroundColors = response.data.categoriesSummary.map(
          (category, index) =>
            `hsl(${
              (index * 360) / response.data.categoriesSummary.length
            }, 70%, 50%)`
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

  return (
    <div className={styles.chartContainer}>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[totalTextPlugin]}
      />
    </div>
  );
};

export default StatisticsChart;
