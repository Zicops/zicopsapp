import CohortListCard from '@/components/common/CohortListCard';
import Dropdown from '@/components/common/Dropdown';
import DatePicker from '@/components/common/FormComponents/DatePicker';
import InputTimePicker from '@/components/common/FormComponents/InputTimePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import InputDatePicker from '@/components/common/InputDatePicker';
import { getCurrentEpochTime } from '@/helper/common.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ScheduleTabData } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';

const UserScheduleTab = () => {
  const { getUserCourseData, getScheduleExams } = useUserCourseData();
  const [filterType, setFilterType] = useState('All');
  const [scheduleData, setSchduleData] = useState([]);
  const [scheduleDataAtom, setSchduleDataAtom] = useRecoilState(ScheduleTabData);
  const [filterDate, setFilterDate] = useState({
    from: new Date(),
    to: new Date()
  });

  // function getSortedDateObject(courseArr = []) {
  //   while (i < courseArr?.length) {
  //     let j = ++i;
  //     while (j < courseArr?.length) {}
  //   }
  // }

  function filterData(filterType = '') {
    if (filterType === '') return;
    let sData = [];
    if (filterType?.toLowerCase() === 'all') sData = scheduleDataAtom;
    else
      sData = scheduleData?.filter(
        (course) => course?.dataType?.toLowerCase() === filterType?.toLowerCase()
      );

    console.log(sData,'sda')
    const courses = sData?.filter(
      (course) =>
        course?.scheduleDate > getUnixFromDate(filterDate?.from) &&
        course?.scheduleDate < getUnixFromDate(filterDate?.to)
    );
    setSchduleData([...courses]);
  }

  useEffect(() => {
    loadScheduleData();
  }, []);

  useEffect(() => {
    filterData(filterType);
  }, [filterDate, filterType]);

  useEffect(() => {
    if (!scheduleDataAtom?.length) return;
    setSchduleData(scheduleDataAtom);
  }, [scheduleDataAtom]);

  async function loadScheduleData() {
    // if(!scheduleDataAtom?.length) return ;
    const courseData = await getUserCourseData(35);
    const examData = await getScheduleExams(courseData);
    const scheduleData = [...courseData, ...examData];
    const sortedArray = scheduleData?.sort((a, b) => {
      return a?.scheduleDate - b?.scheduleDate;
    });

    //tells the schedule upto five min
    const currentEpochTime = getCurrentEpochTime() + 5 * 60;
    const futureScheduleData = sortedArray?.filter(
      (course) => course?.scheduleDate > currentEpochTime
    );
    setSchduleDataAtom([...futureScheduleData]);
  }

  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Course', value: 'Course' },
    { label: 'Exam', value: 'Exam' }
  ];

  let date = '';
  return (
    <div className={`${styles.userTabContainer}`}>
      <div className={`${styles.filterRow}`}>
        <p className={`${styles.text}`}>
          Your Schedule
          <img className="" src="/images/svg/event_available.svg" alt="" />
        </p>
        <div className={`${styles.filterRowLeft}`}>
          <div>
            From:{' '}
            <InputDatePicker
              selectedDate={filterDate?.from}
              minDate={new Date()}
              changeHandler={(date) => {
                setSchduleData(scheduleDataAtom);
                setFilterDate((prevValue) => ({ ...prevValue, from: date }));
              }}
            />
          </div>
          <div>
            To:{' '}
            <InputDatePicker
              selectedDate={filterDate?.to}
              minDate={filterDate?.from}
              changeHandler={(date) => {
                setSchduleData(scheduleDataAtom);
                setFilterDate((prevValue) => ({ ...prevValue, to: date }));
              }}
            />
          </div>
          <LabeledDropdown
            dropdownOptions={{
              options: filterOptions,
              value: { value: filterType, label: filterType }
            }}
            changeHandler={(e) =>
              {setFilterType(e.value);
              setSchduleData(scheduleDataAtom);}
            }
          />
        </div>
      </div>
      {scheduleData?.map((course) => {
        let newDate = moment.unix(course?.scheduleDate).format('D MMM YYYY');
        let compare = newDate !== date;
        if (compare) {
          date = moment.unix(course?.scheduleDate).format('D MMM YYYY');
        }
        return (
          <div key={course?.id} className={`${styles.scheduleBox}`}>
            {compare && (
              <div className={`${styles.scheduleBoxTitle}`}>{moment.unix(course?.scheduleDate).format('D MMM YYYY')}</div>
            )}
            <CohortListCard isSchedule={true} type={'cohort'} scheduleData={course} />
          </div>
        );
      })}
    </div>
  );
};

export default UserScheduleTab;
