import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  GET_COURSE_ANALYTICS_BY_ID,
  userQueryClient,
  GET_PAGINATED_LEARNER_DETAILS,
  GET_COURSE_TOTAL_WATCH_TIME,
  GET_COURSE_WATCH_TIME_GRAPH_DATA,
} from '@/api/UserQueries';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { userClient } from '@/api/UserMutations';

export default function useHandleIndividualCourseAnalytics() {
  const [courseWatchTime, setCourseWatchTime] = useState([]);
  const [filterBy, setFilterBy] = useState('Month');
  const [selectedDate, setSelectedDate] = useState({
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  });

  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetData();

    async function loadAndSetData() {
      const dateFormat = 'YYYY-MM-DD';
      const queryVariables = {
        course_id: courseMetaData?.id,
        start_date: new Date(selectedDate?.start).getTime() / 1000,
        end_date: new Date(selectedDate?.end).getTime() / 1000,
      };

      const courseStats = await loadQueryDataAsync(
        GET_COURSE_WATCH_TIME_GRAPH_DATA,
        queryVariables,
        {},
        userClient,
      );

      const times = courseStats?.getCourseWatchTime?.map((obj) => obj.time);
      console.info(courseStats?.getCourseWatchTime, times);

      // const allDates = [];
      // for (
      //   let i = 0;
      //   allDates[allDates?.length - 1]?.date_string !== selectedDate?.end.format(dateFormat);
      //   i++
      // ) {
      //   const startDate = new Date(selectedDate.start.valueOf());
      //   const currentDate = startDate.setDate(startDate.getDate() + i);
      //   const dateString = moment(currentDate).format(dateFormat);

      //   const dataFromBackend =
      //     courseStats?.getCourseWatchTime?.find((obj) => obj?.date === dateString) || {};
      //   allDates.push({
      //     seconds: 0,
      //     lsp_id: _lspId,
      //     user_ids: [],
      //     date_string: dateString,
      //     index: i + 1,
      //     ...dataFromBackend,
      //   });
      // }
      setCourseWatchTime(times);
    }
  }, [selectedDate?.start, selectedDate.end]);

  async function getCourseAnalyticsById(course_id, status) {
    const getCourseAnalytics = loadQueryDataAsync(
      GET_COURSE_ANALYTICS_BY_ID,
      { course_id: course_id, status: status },
      {},
      userQueryClient,
    );

    return getCourseAnalytics;
  }

  async function getPaginatedLearner(courseId) {
    const paginatedLearners = loadQueryDataAsync(
      GET_PAGINATED_LEARNER_DETAILS,
      { course_id: courseId, pageCursor: '', direction: '', pageSize: 100 },
      {},
      userQueryClient,
    );

    return paginatedLearners;
  }

  async function getCourseTotalWatchTime(course_id) {
    const getCourseTotalWatchTime = loadQueryDataAsync(
      GET_COURSE_TOTAL_WATCH_TIME,
      { course_id: course_id },
      {},
      userQueryClient,
    );

    return getCourseTotalWatchTime;
  }

  // async function getCourseWatchTimeGraphData() {
  //   const queryVariables = {
  //     course_id: courseMetaData?.id,
  //     start_date: new Date(selectedDate?.start).getTime() / 1000,
  //     end_date: new Date(selectedDate?.end).getTime() / 1000,
  //   };
  //   const getCourseWatchTime = loadQueryDataAsync(
  //     GET_COURSE_WATCH_TIME_GRAPH_DATA,
  //     queryVariables,
  //     {},
  //     userQueryClient,
  //   );

  //   console.info(getCourseWatchTime);
  // }

  return {
    getCourseAnalyticsById,
    getPaginatedLearner,
    getCourseTotalWatchTime,
    // getCourseWatchTimeGraphData,
    courseWatchTime,
    selectedDate,
    setSelectedDate,
    filterBy,
    setFilterBy,
  };
}
