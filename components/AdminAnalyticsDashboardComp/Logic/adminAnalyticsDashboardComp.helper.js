import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_TYPES, LANGUAGES } from '@/helper/constants.helper';

export async function getAllCourseCountInLsp(
  lspId = null,
  type = COURSE_TYPES[0],
  status = null,
  languages = LANGUAGES
) {
  if (!lspId) return null;

  const queryVariables = { lsp_id: lspId, course_type: type, languages };
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
