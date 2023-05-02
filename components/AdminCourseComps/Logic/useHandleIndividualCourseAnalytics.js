import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  GET_COURSE_ANALYTICS_BY_ID,
  userQueryClient,
  GET_PAGINATED_LEARNER_DETAILS,
  GET_COURSE_TOTAL_WATCH_TIME,
  GET_COURSE_WATCH_TIME_GRAPH_DATA,
} from '@/api/UserQueries';

export default function useHandleIndividualCourseAnalytics() {
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

    console.info(getCourseTotalWatchTime);

    return getCourseTotalWatchTime;
  }

  async function getCourseWatchTimeGraphData(course_id, start_date, end_date) {
    const getCourseWatchTime = loadQueryDataAsync(
      GET_COURSE_WATCH_TIME_GRAPH_DATA,
      { course_id: course_id, start_data: start_date, end_date: end_date },
      {},
      userQueryClient,
    );
  }

  return {
    getCourseAnalyticsById,
    getPaginatedLearner,
    getCourseTotalWatchTime,
    getCourseWatchTimeGraphData,
  };
}
