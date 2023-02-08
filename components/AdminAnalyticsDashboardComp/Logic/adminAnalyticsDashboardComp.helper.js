import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { LANGUAGES } from '@/helper/constants.helper';

export async function getAllCourseCountInLsp(lspId = null, status = null) {
  if (!lspId) return null;

  const queryVariables = { lsp_id: lspId, languages: LANGUAGES };
  if (status) queryVariables.course_status = status;
  const myCourseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
    input: queryVariables
  });

  let totalMyCourses = 0;
  (await myCourseStats)?.getBasicCourseStats?.languages?.forEach((lang) => {
    if (lang?.count) totalMyCourses += lang?.count;
  });
  return totalMyCourses;
}
