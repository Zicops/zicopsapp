import BarChart from '@/components/common/Charts/BarChart';
import SwitchButton from '@/components/DashboardComponents/SwitchButton';
import styles from '../adminAnalyticsDashboard.module.scss';

export default function CategoryAvailability() {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        // borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Courses',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: styles.primary
      }
    ]
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category availability</div>
      <div className={`${styles.wrapperSubHeading}`}>
        Showing data for:
        <SwitchButton text={'Sub-categories'} isTextLeft={true} />
      </div>

      <BarChart options={options} chartData={data} />
    </div>
  );
}
