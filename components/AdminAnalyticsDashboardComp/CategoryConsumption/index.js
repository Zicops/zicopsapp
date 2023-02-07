import BarChart from '@/components/common/Charts/BarChart';
import { CategoryConsumptionData } from '@/components/DashboardComponents/Logic/dashboardData.helper';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';

export default function CategoryConsumption() {
  const [categoryConsumptionData, setCategoryConsumptionData] = useState({
    labels: CategoryConsumptionData.map((data) => data.skill),
    datasets: [
      {
        label: ['Courses'],
        data: CategoryConsumptionData.map((data) => data.complete),
        backgroundColor: ['rgba(32,161,161,1)'],
        borderRadius: ['1'],
        barThickness: 20,
        minBarLength: 2,
        barPercentage: 0.2,
        height: 500,
        borderColor: '#20A1A1',
        fill: true,
        category: ''
      }
    ]
  });

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category consumption</div>
      <div className={`${styles.wrapperSubHeading}`}>All categories</div>

      <BarChart chartData={categoryConsumptionData} />
    </div>
  );
}
