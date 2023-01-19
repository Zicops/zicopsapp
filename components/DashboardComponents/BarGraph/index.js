import React from 'react'
// import styles from '../dashboardComponents.module.scss';
// import BarChart from '@/components/common/Charts/BarChart';
import { CategoryConsumptionData } from '../Logic/dashboardData.helper';
import { useState } from 'react';
import BarChart from '@/components/common/Charts/BarChart';

const BarGraph = () => {
  console.log(CategoryConsumptionData);

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
        fill: true
      }
    ]
  });
  return (
    <>
      <BarChart chartData={categoryConsumptionData} />
    </>
  );
};

export default BarGraph;
