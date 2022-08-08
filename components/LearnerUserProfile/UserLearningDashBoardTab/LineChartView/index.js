import styles from '../userLearningDashboardTab.module.scss';
import LineChart from '@/components/common/Charts/LineChart';
import { UserData } from '../../../common/Charts/chartData.helper';
import { useState } from 'react';
import DayWeekMonth from '@/components/common/DayWeekMonth';

const LineChartView = () => {
  const [userEngageData, setUserEngageData] = useState({
    labels: ['01', '03', '06', '09', '12', '15', '18', '21', '27', '30'],

    datasets: [
      {
        label: 'User Skills',
        data: UserData.map((data) => data.time1),
        fill: true,
        tension: 0.2,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(32,161,161,1)');
          gradient.addColorStop(1, 'rgba(41,239,180,0.2) ');
          return gradient;
        },
        borderColor: '#20A1A1'
      }
    ]
  });
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0px 15px',
          borderBottom: '1px solid white'
        }}>
        <div className={`${styles.headingText}`}>Engagement in Zicops</div>
        <DayWeekMonth />
      </div>
      <LineChart chartData={userEngageData} />
    </>
  );
};

export default LineChartView;
