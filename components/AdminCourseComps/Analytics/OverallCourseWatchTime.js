import LineChart from '@/components/common/Charts/LineChart';
import { DownSortTriangleIcon } from '@/components/common/ZicopsIcons';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { displayMinToHMS } from '@/helper/utils.helper';
import moment from 'moment';
import styles from '../adminCourse.module.scss';
import SectionTitle from '@/components/AdminAnalyticsDashboardComp/common/SectionTitle';
import { useState } from 'react';
import useHandleCourseAnalyticsDashboard from '../Logic/useHandleCourseAnalyticsDashboard';
import useHandleIndividualCourseAnalytics from '../Logic/useHandleIndividualCourseAnalytics';
export const UserData = [
  {
    id: 1,
    skill: 'UI/UX Design',
    complete: 5,
    days: '01',
    time1: 30,
  },
  {
    id: 2,
    skill: 'Project Management',
    complete: 8,
    days: '03',
    time1: 60,
  },
  {
    id: 3,
    skill: 'JAVA fundamentls',
    complete: 6,
    days: '06',
    time1: 50,
  },
  {
    id: 4,
    skill: 'Product Design',
    complete: 2,
    days: '09',
    time1: 75,
  },
  {
    id: 5,
    skill: 'Bussiness Management',
    complete: 5,
    days: '12',
    time1: 20,
  },
  {
    id: 6,
    skill: 'Finance',
    complete: 7,
    days: '15',
    time1: 45,
  },
  {
    id: 7,
    skill: 'UI Developer',
    complete: 8,
    days: '18',
    time1: 50,
  },
  {
    id: 8,
    skill: 'Animation',
    complete: 3.5,
    days: '21',
    time1: 60,
  },
  {
    id: 9,
    skill: 'Motion Graphics',
    complete: 4.5,
    days: '27',
    time1: 45,
  },
  {
    id: 10,
    skill: 'Illustrator',
    complete: 6.5,
    days: '30',
    time1: 80,
  },
];

export default function OverallCourseWatchTime() {
  const {
    courseWatchTime,
    selectedDate,
    setSelectedDate,
    filterBy,
    setFilterBy,
  } = useHandleIndividualCourseAnalytics();
  const labels = moment.weekdays()?.map((day) => day?.slice(0, 3));
  if (filterBy === 'Month') {
    labels.length = 0;
    labels.push(...[...Array(selectedDate?.end?.get('D'))].map((v, i) => i + 1));
  }

  if (!courseWatchTime?.length) return <></>;

  // console.info(courseViews);

  const data = {
    labels,
    datasets: [
      {
        label: 'Overall Course Watch time',
        data: courseWatchTime?.map((obj) => ({ ...obj, minutes: obj?.seconds / 60 })),
        fill: true,
        tension: 0,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(0, 'rgba(32, 162, 162, 0.3)');
          gradient.addColorStop(1, 'rgba(4, 4, 4, 1) ');
          return gradient;
        },
        borderColor: '#20A1A1',
      },
    ],
  };

  const options = {
    parsing: {
      xAxisKey: 'index',
      yAxisKey: 'minutes',
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  function tooltipUI(tooltipData) {
    const parentNode = document.createElement('div');

    const timeConsumedNode = document.createElement('div');
    const time = document.createTextNode(displayMinToHMS(tooltipData?.seconds / 60));
    timeConsumedNode.appendChild(time);

    const dateNode = document.createElement('span');
    const dateText = document.createTextNode(
      moment(tooltipData?.date_string).format('MMM DD, YYYY'),
    );
    dateNode.appendChild(dateText);
    dateNode.style.fontSize = '13px';
    dateNode.style.color = styles.darkThree;

    const learnerCountNode = document.createElement('div');
    const learnerCount = document.createTextNode(`Learners: ${tooltipData?.user_ids?.length || 0}`);
    learnerCountNode.appendChild(learnerCount);
    learnerCountNode.style.fontSize = '13px';
    learnerCountNode.style.color = styles.darkThree;

    parentNode.appendChild(timeConsumedNode);
    parentNode.appendChild(dateNode);
    parentNode.appendChild(learnerCountNode);
    return parentNode;
  }

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle
        title="Overall Course Watch time"
        extraCompAtEnd={
          <Dropdown
            placeholder={'Sub-category'}
            options={['Month', 'Week'].map((d) => ({ value: d, label: d }))}
            value={{ value: filterBy, label: filterBy }}
            changeHandler={(e) => setFilterBy(e.value)}
          />
        }
      />
      <div className={`${styles.wrapperSubHeading}`}>Overall course views last week</div>
      <div className={`${styles.displayMonth}`}>
        <span
          onClick={() => {
            if (filterBy === 'Month') {
              const _selected = new Date(selectedDate?.start?.valueOf());
              const _updatedDate = _selected.setMonth(_selected.getMonth() - 1);

              setSelectedDate({
                start: moment(_updatedDate).startOf('month'),
                end: moment(_updatedDate).endOf('month'),
              });
            } else {
              const _selected = new Date(selectedDate?.start?.valueOf());
              const _updatedDate = _selected.setDate(_selected.getDate() - 7);

              setSelectedDate({
                start: moment(_updatedDate).startOf('week'),
                end: moment(_updatedDate).endOf('week'),
              });
            }
          }}>
          <DownSortTriangleIcon turns="0.25" />
        </span>
        <div>
          <p>
            {filterBy === 'Month' ? (
              <>{selectedDate?.start?.format('MMMM')}</>
            ) : (
              <>
                {selectedDate?.start?.format('D MMMM')} - {selectedDate?.end?.format('D MMMM')}
              </>
            )}
          </p>
          <p className={`${styles.year}`}>{selectedDate?.start?.format('YYYY')}</p>
        </div>
        <span
          onClick={() => {
            if (filterBy === 'Month') {
              const _selected = new Date(selectedDate?.start?.valueOf());
              const _updatedDate = _selected.setMonth(_selected.getMonth() + 1);

              setSelectedDate({
                start: moment(_updatedDate).startOf('month'),
                end: moment(_updatedDate).endOf('month'),
              });
            } else {
              const _selected = new Date(selectedDate?.start?.valueOf());
              const _updatedDate = _selected.setDate(_selected.getDate() + 7);

              setSelectedDate({
                start: moment(_updatedDate).startOf('week'),
                end: moment(_updatedDate).endOf('week'),
              });
            }
          }}>
          <DownSortTriangleIcon turns="0.75" />
        </span>
      </div>

      {/*<LineChart chartData={data} options={options} tooltipBody={tooltipUI} />*/}
    </div>
  );
}
