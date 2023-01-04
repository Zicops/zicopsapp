import { GET_COHORT_COURSES, GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useLazyQuery } from '@apollo/client';

export async function getUsersForCohort(isTable = false) {
  const sendData = {
    publish_time: getCurrentEpochTime(),
    pageCursor: '',
    pageSize: 99999
  };
  const resUserData = await loadQueryDataAsync(
    GET_USERS_FOR_ADMIN,
    { ...sendData },
    {},
    userQueryClient
  );
  const users = resUserData?.getUsersForAdmin?.users;
  if (isTable) {
    const verifiedUsers = users?.filter((item) => item?.is_verified);
    return verifiedUsers;
  }
  // console.log(users);
  const managerList = [];
  users?.forEach((item) => {
    if (!item?.is_verified) return;
    managerList?.push({
      value: `${item?.first_name} ${item?.last_name}`,
      label: `${item?.first_name} ${item?.last_name}`,
      id: item?.id
    });
  });
  if (!managerList?.length) return { error: 'No user is verified' };
  // setToastMsg({ type: 'danger', message: 'None of the user is verified' });
  if (managerList?.length) return managerList;
}

export async function getCohortCourses(cohortId = null) {
  if (!cohortId) return { error: 'Add Cohort Master First!' };
  // const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
  //   client: queryClient
  // });

  const currentLspId = sessionStorage?.getItem('lsp_id');
  const zicopsLspId = COMMON_LSPS.zicops;
  const sendData = {
    publish_time: getCurrentEpochTime(),
    pageCursor: '',
    pageSize: 100,
    filters: { LspId: currentLspId }
  };

  const currentLspCourseRes = await loadQueryDataAsync(
    GET_LATEST_COURSES,
    { ...sendData },
    {},
    queryClient
  );
  sendData.filters.LspId = zicopsLspId;
  const zicopsLspCourseRes = await loadQueryDataAsync(
    GET_LATEST_COURSES,
    { ...sendData },
    {},
    queryClient
  );
  // const res = await loadLastestCourseData({ variables: sendData }).catch((err) => {
  //   console.log(err);
  //   return setToastMsg({ type: 'danger', message: `${err}` });
  // });
  if (currentLspCourseRes?.error || zicopsLspCourseRes?.error)
    return { error: 'Error while loading courses!' };

  // const courseData = res?.latestCourses?.courses?.filter((c) => c?.is_active && c?.is_display);
  // const courseData = res?.latestCourses?.courses?.filter((c) => c?.is_active);
  const courseData = [];
  if (currentLspCourseRes?.latestCourses?.courses?.length) {
    courseData.push(...currentLspCourseRes?.latestCourses?.courses?.filter((c) => c?.is_active));
  }
  if (zicopsLspCourseRes?.latestCourses?.courses?.length) {
    courseData.push(...zicopsLspCourseRes?.latestCourses?.courses?.filter((c) => c?.is_active));
  }

  console.log(courseData);
  if (!courseData) return { error: 'Error while loading courses!v' };

  const cohortCoursesRes = await loadQueryDataAsync(
    GET_COHORT_COURSES,
    { cohort_id: cohortId },
    {},
    queryClient
  );
  if (cohortCoursesRes?.error) return { error: 'Error while loading cohort courses!' };
  const coursesArr = cohortCoursesRes?.getCohortCourseMaps;
  if (!cohortCoursesRes?.getCohortCourseMaps?.length) return { allCourses: [...courseData] };

  const cohortCourses = [];
  for (let i = 0; i < coursesArr?.length; i++) {
    coursesArr[i];
    const data = await loadQueryDataAsync(GET_COURSE, { course_id: coursesArr[i]?.CourseId });
    if (!data?.getCourse) return { error: 'Error while loading courses!' };
    cohortCourses.push({
      ...data?.getCourse,
      IsActive: coursesArr[i]?.IsActive,
      cohortCourseId: coursesArr[i]?.id
    });
  }

  const activeCohortCourses = cohortCourses?.filter((item) => item?.IsActive);

  const results = courseData.filter(
    ({ id: id1 }) => !activeCohortCourses.some(({ id: id2 }) => id2 === id1)
  );

  const courseObject = {
    allCourses: [...results],
    assignedCourses: [...activeCohortCourses]
  };
  return courseObject;
}
