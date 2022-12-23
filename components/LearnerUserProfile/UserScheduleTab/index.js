import CohortListCard from '@/components/common/CohortListCard';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import InputDatePicker from '@/components/common/InputDatePicker';
import ListCardLoader from '@/components/common/ListCardLoader';
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
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [scheduleData, setSchduleData] = useState([]);
  const [scheduleDataAtom, setSchduleDataAtom] = useRecoilState(ScheduleTabData);
  const [filterDate, setFilterDate] = useState({
    from: null,
    to: null
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

    if (!filterDate?.from || !filterDate?.to) return setSchduleData(sData);

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
    setLoading(true);
    const courseData = await getUserCourseData(35);
    const examData = await getScheduleExams(courseData);
    if (!courseData?.length || !examData?.length) return setLoading(false);
    const scheduleData = [...courseData, ...examData];
    const sortedArray = scheduleData?.sort((a, b) => {
      return a?.scheduleDate - b?.scheduleDate;
    });

    //tells the schedule upto five min
    const currentEpochTime = getCurrentEpochTime() + 5 * 60;
    const futureScheduleData = sortedArray?.filter(
      (course) => course?.scheduleDate > currentEpochTime
    );
    setSchduleDataAtom([...futureScheduleData], setLoading(false));
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
          <div className={`${styles.datePickerContainer}`}>
            From:{' '}
            <InputDatePicker
              selectedDate={filterDate?.from}
              minDate={new Date().setHours(0, 0, 0, 0)}
              changeHandler={(date) => {
                setSchduleData(scheduleDataAtom);
                setFilterDate((prevValue) => ({ ...prevValue, from: date.setHours(0, 0, 0, 0) }));
              }}
            />
          </div>
          <div className={`${styles.datePickerContainer}`}>
            To:{' '}
            <InputDatePicker
              selectedDate={filterDate?.to}
              minDate={filterDate?.from || new Date().setHours(23, 59, 0, 0)}
              changeHandler={(date) => {
                setSchduleData(scheduleDataAtom);
                setFilterDate((prevValue) => ({ ...prevValue, to: date.setHours(23, 59, 0, 0) }));
              }}
              styleClass={styles?.calenderCustom}
            />
          </div>
          <div className={`${styles.dropDownContainer}`}>
            <LabeledDropdown
              dropdownOptions={{
                options: filterOptions,
                value: { value: filterType, label: filterType }
              }}
              changeHandler={(e) => {
                setFilterType(e.value);
                setSchduleData(scheduleDataAtom);
              }}
            />
          </div>
          <div
            className={`${styles.resetFilter} ${
              filterType?.toLowerCase() === 'all' && !filterDate?.from && !filterDate?.to
                ? ''
                : styles.isActive
            }`}
            onClick={() => {
              if (filterType?.toLowerCase() === 'all' && !filterDate?.from && !filterDate?.to)
                return;
              setFilterDate({ from: null, to: null });
              setSchduleData(scheduleDataAtom);
            }}>
            Reset
          </div>
        </div>
      </div>

      {loading ? (
        <ListCardLoader heroHeight={'75vh'} />
      ) : (
        !scheduleData?.length && (
          <strong className={`${styles.fallbackMsg}`}>No Schedules Found</strong>
        )
      )}
      {scheduleData?.map((course) => {
        let newDate = moment.unix(course?.scheduleDate).format('D MMM YYYY');
        let compare = newDate !== date;
        if (compare) {
          date = moment.unix(course?.scheduleDate).format('D MMM YYYY');
        }
        return (
          <div key={course?.id} className={`${styles.scheduleBox}`}>
            {compare && (
              <div className={`${styles.scheduleBoxTitle}`}>
                {moment.unix(course?.scheduleDate).format('D MMM YYYY')}
              </div>
            )}
            <CohortListCard isSchedule={true} type={'cohort'} scheduleData={course} />
          </div>
        );
      })}
    </div>
  );
};

export default UserScheduleTab;
