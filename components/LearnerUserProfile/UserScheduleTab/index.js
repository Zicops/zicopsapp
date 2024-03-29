import CohortListCard from '@/components/common/CohortListCard';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import InputDatePicker from '@/components/common/InputDatePicker';
import ListCardLoader from '@/components/common/ListCardLoader';
import { getCurrentEpochTime } from '@/helper/common.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ScheduleTabData } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
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

  const router = useRouter();

  function filterData(filterType = '') {
    if (filterType === '') return;
    let data = scheduleDataAtom;
    let sData = [];
    sData =
      filterType?.toLowerCase() === 'all'
        ? data
        : data?.filter((course) => course?.dataType?.toLowerCase() === filterType?.toLowerCase());
    if (!filterDate?.from || !filterDate?.to) return setSchduleData(sData);

    const courses = sData?.filter(
      (course) =>
        course?.scheduleDate > getUnixFromDate(filterDate?.from)/1000 &&
        course?.scheduleDate < getUnixFromDate(filterDate?.to)/1000
    )
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
    const courseData = await getUserCourseData(50);
    const _courseData = courseData?.filter((course) => !!course?.id);
    const examData = await getScheduleExams(_courseData);
    if (!_courseData?.length && !examData?.length) return setLoading(false);
    const scheduleData = [..._courseData, ...examData];
    const sortedArray = scheduleData?.sort((a, b) => {
      return a?.scheduleDate - b?.scheduleDate;
    });

    //tells the schedule upto five min
    const currentEpochTime = getCurrentEpochTime() + 5 * 60;
    const futureScheduleData = sortedArray?.filter((course) => {
      if (course?.dataType?.toLowerCase() === 'exam') {
        if (course?.scheduleDate > currentEpochTime) return course;
        if (course?.endTime > currentEpochTime) return course;
        return false;
      }
      return course?.scheduleDate > currentEpochTime;
    });

    // removing exams which comes from another course
    const sData = futureScheduleData?.filter(
      (course, i, a) => a?.findIndex((v2) => v2?.id === course?.id) === i
    );
    setSchduleDataAtom([...sData], setLoading(false));
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
                setFilterDate((prevValue) => ({ ...prevValue, from: date?.setHours(0, 0, 0, 0) }));
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
                setFilterDate((prevValue) => ({ ...prevValue, to: date?.setHours(23, 59, 0, 0) }));
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
                if (e.value?.toLowerCase() === filterType?.toLowerCase()) return;
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
            onClick={(e) => {
              e.stopPropagation();
              if (filterType?.toLowerCase() === 'all' && !filterDate?.from && !filterDate?.to)
                return;
              setFilterDate({ from: null, to: null });
              setFilterType('All');
              setSchduleData(scheduleDataAtom);
              return;
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
        let link = {
          course: { url: `/course/${course?.id}`, asUrl: `/course/${course?.id}` },
          exam: {
            url: `/course/${course?.courseId}?activateExam=${course?.examId}`,
            asUrl: `/course/${course?.courseId}`
          }
        };
        return (
          <div key={course?.id} className={`${styles.scheduleBox}`}>
            {compare && (
              <div className={`${styles.scheduleBoxTitle}`}>
                {moment.unix(course?.scheduleDate).format('D MMM YYYY')}
              </div>
            )}
            <CohortListCard
              isSchedule={true}
              type={'cohort'}
              scheduleData={course}
              handleClick={() => {
                router?.push(link?.[course?.dataType]?.url, link?.[course?.dataType]?.asUrl);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserScheduleTab;
