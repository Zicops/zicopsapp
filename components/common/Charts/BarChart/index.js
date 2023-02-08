// https://stackoverflow.com/a/74943769/13419786
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import styles from '../charts.module.scss';

export default function BarChart({ chartData }) {
  const options = {
    layout: {
      padding: {
        top: 5
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      maxWidth: 100,
      onClick: null
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  return (
    <>
      <div className={`${styles.userInfoWraper}`}>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
}
