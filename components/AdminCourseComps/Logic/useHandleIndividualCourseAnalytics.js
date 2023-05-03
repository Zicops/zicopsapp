import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  GET_COURSE_ANALYTICS_BY_ID,
  userQueryClient,
  GET_PAGINATED_LEARNER_DETAILS,
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

  return { getCourseAnalyticsById, getPaginatedLearner };
}
