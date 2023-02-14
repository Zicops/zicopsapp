import LineChart from '@/components/common/Charts/LineChart';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';
import useHandleCourseViews from '../Logic/useHandleCourseViews';
export const UserData = [
  {
    id: 1,
    skill: 'UI/UX Design',
    complete: 5,
    days: '01',
    time1: 30
  },
  {
    id: 2,
    skill: 'Project Management',
    complete: 8,
    days: '03',
    time1: 60
  },
  {
    id: 3,
    skill: 'JAVA fundamentls',
    complete: 6,
    days: '06',
    time1: 50
  },
  {
    id: 4,
    skill: 'Product Design',
    complete: 2,
    days: '09',
    time1: 75
  },
  {
    id: 5,
    skill: 'Bussiness Management',
    complete: 5,
    days: '12',
    time1: 20
  },
  {
    id: 6,
    skill: 'Finance',
    complete: 7,
    days: '15',
    time1: 45
  },
  {
    id: 7,
    skill: 'UI Developer',
    complete: 8,
    days: '18',
    time1: 50
  },
  {
    id: 8,
    skill: 'Animation',
    complete: 3.5,
    days: '21',
    time1: 60
  },
  {
    id: 9,
    skill: 'Motion Graphics',
    complete: 4.5,
    days: '27',
    time1: 45
  },
  {
    id: 10,
    skill: 'Illustrator',
    complete: 6.5,
    days: '30',
    time1: 80
  }
];

export default function CourseViewAnalytics() {
  const [filterBy, setFilterBy] = useState('Month');
  useHandleCourseViews();
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
          const gradient = ctx.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(0, 'rgba(32, 162, 162, 0.3)');
          gradient.addColorStop(1, 'rgba(4, 4, 4, 1) ');
          return gradient;
        },
        borderColor: '#20A1A1'
      }
    ]
  });
  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle title="Course view analytics" />

      <div className={`${styles.wrapperSubHeading}`}>
        Overall course views last week
        <Dropdown
          placeholder={'Sub-category'}
          options={['Month', 'Week'].map((d) => ({ value: d, label: d }))}
          value={{ value: filterBy, label: filterBy }}
          changeHandler={(e) => setFilterBy(e.value)}
        />
      </div>

      <LineChart chartData={userEngageData} />
    </div>
  );
}
