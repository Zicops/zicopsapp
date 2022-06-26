import { ExamTabDataAtom } from '@/state/atoms/exams.atoms';
import { useRecoilValue } from 'recoil';

export default function useValidateScheduleDates() {
  const examTabData = useRecoilValue(ExamTabDataAtom);

  // for comparing just date, month and year in 2 dates
  function isDateSame(date1, date2) {
    // convert to date objects
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    // return false if date, month and year is not matched
    if (dateObj1.getDate() !== dateObj2.getDate()) return false;
    if (dateObj1.getMonth() !== dateObj2.getMonth()) return false;
    if (dateObj1.getFullYear() !== dateObj2.getFullYear()) return false;

    // return true if date, month and year matched
    return true;
  }

  // validation used for minimum end time calcuted with duration and start time
  function getMinExamEndTime(inputDate = examTabData?.exam_start) {
    // start and end date are different return null
    if (!isDateSame(examTabData?.exam_start, examTabData?.exam_end)) return null;

    // for same dates return time
    return getTimeWithDuration(inputDate);
  }

  // for getting time with duration added
  function getTimeWithDuration(dateObj = examTabData?.exam_start) {
    const startTime = new Date(dateObj);
    const duration = +examTabData?.duration || 0;

    // add duration as minutes
    startTime.setMinutes(startTime.getMinutes() + duration);

    return new Date(startTime);
  }

  // check if start time and end time differs with duration
  function isEndTimeBehind(inputDate) {
    // return if date are not same
    if (!isDateSame(examTabData?.exam_start, inputDate)) return null;

    const newDate = new Date(inputDate);
    const startTime = new Date(getTimeWithDuration(examTabData?.exam_start));

    if (startTime.getHours() > newDate.getHours()) return true;
    if (startTime.getMinutes() > newDate.getMinutes()) return true;

    return false;
  }

  // update date, month and year
  function updateDate(inputDate, prevDate) {
    const dateObj = new Date(inputDate);
    const newDate = new Date(prevDate);
    newDate.setDate(dateObj.getDate());
    newDate.setMonth(dateObj.getMonth());
    newDate.setFullYear(dateObj.getFullYear());

    return newDate;
  }

  // update seconds, minutes and hours
  function updateTime(inputDate, prevDate) {
    const dateObj = new Date(inputDate);
    const newDate = new Date(prevDate);
    newDate.setSeconds(0);
    newDate.setMinutes(dateObj.getMinutes());
    newDate.setHours(dateObj.getHours());

    return newDate;
  }

  return {
    isEndTimeBehind,
    updateDate,
    updateTime,
    getMinExamEndTime,
    getTimeWithDuration
  };
}
