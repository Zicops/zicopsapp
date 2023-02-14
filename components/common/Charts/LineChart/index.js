import React from 'react';
import styles from '../../Charts/charts.module.scss';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartData }) => {
  const options = {
    layout: {
      padding: {
        top: 5
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugin: {
      legend: {
        display: false
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  return (
    <div className={`${styles.userInfoWraper}`}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
