import { GET_COHORT_COURSES, GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
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
  if (!managerList?.length)
    return {error:'No user is verified'}
    // setToastMsg({ type: 'danger', message: 'None of the user is verified' });
  if (managerList?.length) return managerList;
}

export async function getCohortCourses(cohortId = null) {
  if (!cohortId) return { error: 'Add Cohort Master First!' };
  // const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
  //   client: queryClient
  // });

  const sendData = {
    publish_time: getCurrentEpochTime(),
    pageCursor: '',
    pageSize: 100
  };

  const res = await loadQueryDataAsync(GET_LATEST_COURSES, { ...sendData }, {}, queryClient);
  // const res = await loadLastestCourseData({ variables: sendData }).catch((err) => {
  //   console.log(err);
  //   return setToastMsg({ type: 'danger', message: `${err}` });
  // });
  if (res?.error) return { error: 'Error while loading courses!' };
  const courseData = res?.latestCourses?.courses?.filter((c) => c?.is_active && c?.is_display);

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
    cohortCourses.push({ ...data?.getCourse, IsActive: coursesArr[i]?.IsActive });
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
