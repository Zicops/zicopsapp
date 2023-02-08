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
  const courseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
    input: queryVariables
  });

  let totalCount = 0;
  (await courseStats)?.getBasicCourseStats?.languages?.forEach((lang) => {
    if (lang?.count) totalCount += lang?.count;
  });
  return totalCount;
}

export async function getAllCourseCountBasedOnExpertises(
  lspId = null,
  type = COURSE_TYPES[0],
  expertises = []
) {
  if (!lspId) return null;

  const queryVariables = { lsp_id: lspId, course_type: type, expertise_level: expertises };
  const courseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
    input: queryVariables
  });

  let totalCount = 0;
  (await courseStats)?.getBasicCourseStats?.expertise_level?.forEach((expertise) => {
    if (expertise?.count) totalCount += expertise?.count;
  });
  return totalCount;
}
