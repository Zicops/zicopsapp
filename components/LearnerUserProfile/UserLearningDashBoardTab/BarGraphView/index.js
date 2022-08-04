import styles from '../userLearningDashboardTab.module.scss';
import BarChart from '@/components/common/Charts/BarChart';
import { UserData } from '../../../common/Charts/chartData.helper';
import { useState } from 'react';

const BarGraphView = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.skill),
    datasets: [
      {
        label: 'User Skills',
        data: UserData.map((data) => data.complete),
        backgroundColor: ['rgba(32,161,161,1)'],
        borderRadius: ['5'],
        barThickness: 20,
        minBarLength: 2,
        barPercentage: 0.2,
        height: 500,
        borderColor: '#20A1A1',
        fill: true
      }
    ]
  });
  return (
    <>
      <div className={`${styles.headingText}`} style={{ borderBottom: '1px solid white' }}>
        Skill matrix dashboard
      </div>
      <BarChart chartData={userData} />
    </>
  );
};

export default BarGraphView;
