// https://stackoverflow.com/a/74943769/13419786
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import styles from '../charts.module.scss';

export default function BarChart({ chartData, options = null, containerStyles = {} }) {
  const _options = {
    layout: {
      padding: {
        top: 5
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            let sum = 0;

            tooltipItems.forEach(function (tooltipItem) {
              sum += tooltipItem.parsed.y;
            });
            return 'Sum: ' + sum;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // https://stackoverflow.com/questions/39473991/how-to-make-a-chart-js-bar-chart-scrollable
  return (
    <>
      <div className={`${styles.userInfoWraper}`}>
        <div className={`${styles.chartAreaWrapper}`} style={containerStyles}>
          <Bar data={chartData} options={options || _options} />
        </div>
      </div>
    </>
  );
}
