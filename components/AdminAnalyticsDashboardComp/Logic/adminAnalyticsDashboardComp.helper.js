import { GET_BASIC_COURSES_STATS, GET_COURSES_COUNT_STATS, queryClient } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS, COURSE_TYPES, LANGUAGES } from '@/helper/constants.helper';
import { useEffect } from 'react';

export async function getAllCourseCountInLsp(lspId = null, queryVariables = {}, queryOptions = {}) {
  if (!lspId) return null;

  const _queryVariables = {
    lsp_id: lspId,
    course_type: COURSE_TYPES[0],
    languages: LANGUAGES,
    course_status: COURSE_STATUS.publish,
    ...queryVariables,
  };
  const courseStats = loadQueryDataAsync(
    GET_BASIC_COURSES_STATS,
    { input: _queryVariables },
    queryOptions,
  );

  let totalCount = 0;
  (await courseStats)?.getBasicCourseStats?.languages?.forEach((lang) => {
    if (lang?.count) totalCount += lang?.count;
  });
  return totalCount;
}

export async function getAllCourseCountBasedOnExpertises(
  lspId = null,
  type = COURSE_TYPES[0],
  expertises = [],
) {
  if (!lspId) return null;

  const queryVariables = {
    lsp_id: lspId,
    course_type: type,
    expertise_level: expertises,
    course_status: COURSE_STATUS.publish,
  };
  const courseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
    input: queryVariables,
  });

  let totalCount = 0;
  (await courseStats)?.getBasicCourseStats?.expertise_level?.forEach((expertise) => {
    if (expertise?.count) totalCount += expertise?.count;
  });
  return totalCount;
}

export async function getAllCourseCount(lspId, status, type) {
  if (!lspId) return;

  const courseStats = loadQueryDataAsync(
    GET_COURSES_COUNT_STATS,
    { lsp_id: lspId, status: status, type: type },
    // {},
    // queryClient
  );
  console.info(lspId, status, type, '1536uyb');

  return courseStats;
}
