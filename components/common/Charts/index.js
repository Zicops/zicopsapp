import BarChart from './BarChart';
import LineChart from './LineChart';
import { UserData } from './chartData.helper';
import { useState } from 'react';

const Charts = () => {
  console.log(UserData);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.skill),
    datasets: [
      {
        label: 'User Skills',
        data: UserData.map((data) => data.complete),
        backgroundColor: ['rgba(32,161,161,1)'],
        // backgroundColor: '  linear-gradient( rgba(32,161,161,1) 0%, rgba(41,239,180,1) 30%)',

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
  console.log(userEngageData);

  return (
    <>
      <BarChart chartData={userData} />
      <LineChart chartData={userEngageData} />
    </>
  );
};

export default Charts;
