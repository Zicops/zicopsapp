import { UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';

export function getMinCourseAssignDate(suggestedCompletionDays = 1) {
  const date = new Date();
  date.setDate(date.getDate() + (+suggestedCompletionDays || 1));

  return date;
}

export function getCourseAssignDataObj(data = {}) {
  return {
    endDate: data?.endDate || getMinCourseAssignDate(),
    isMandatory: data?.isMandatory || false,
    courseId: data?.courseId || null,
    courseType: data?.courseType || null,
  };
}

export async function unassignSelfAssignedCourse(userCourseMap = null) {
  if (!userCourseMap?.userCourseId) return null;

  const sendData = {
    userCourseId: userCourseMap?.userCourseId,
    userId: userCourseMap?.userId,
    userLspId: userCourseMap?.userLspId,
    courseId: userCourseMap?.courseId,
    addedBy: JSON.stringify({ userId: userCourseMap?.userId, role: 'self' }),
    courseType: userCourseMap?.courseType,
    isMandatory: userCourseMap?.isMandatory,
    courseStatus: COURSE_MAP_STATUS?.disable,
    endDate: userCourseMap?.endDate,
  };

  let isError = false;
  const res = await userClient
    .mutate({
      mutation: UPDATE_USER_COURSE,
      variables: sendData,
      // update: (_, { data }) => {
      // handleCacheUpdate(
      //   GET_USER_COURSE_MAPS_BY_COURSE_ID,
      //   { userId: userCourseMap?.userId, courseId: userCourseMap?.courseId },
      //   (cachedData) => {
      //     const resData = data?.updateUserCourse || null;
      //     const _cachedData = structuredClone(cachedData);
      //     const assignedData = _cachedData?.getUserCourseMapByCourseID?.[0];
      //     console.info(resData, _cachedData);
      //     assignedData.course_status = resData?.course_status || sendData?.courseStatus;
      //     assignedData.added_by = resData?.added_by || sendData?.addedBy;
      //     return _cachedData;
      //   },
      //   userQueryClient,
      // );
      // },
    })
    ?.catch((err) => (isError = !!err));

  if (isError) return null;

  return res?.data?.updateUserCourse;
}
