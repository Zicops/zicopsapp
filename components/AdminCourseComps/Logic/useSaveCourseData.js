import {
  ADD_COURSE,
  ADD_NEW_COURSE,
  UPDATE_COURSE,
  UPLOAD_COURSE_IMAGE,
  UPLOAD_COURSE_PREVIEW,
  UPLOAD_COURSE_TILE_IMAGE
} from '@/api/Mutations';
import { GET_LATEST_COURSES } from '@/api/Queries';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { COURSE_STATUS, USER_LSP_ROLE } from '@/helper/constants.helper';
import { createCourseAndUpdateContext } from '@/helper/data.helper';
import { getUnixFromDate, isWordSame } from '@/helper/utils.helper';
import {
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getCourseMetaDataObj
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs, tabData } from './adminCourseComps.helper';
import useHandleCourseData from './useHandleCourseData';

export default function useSaveCourseData() {
  // mutation
  const [createCourse, { loading: addCourseLoading }] = useMutation(ADD_COURSE);
  const [uploadImage, { loading: uploadImageLoading }] = useMutation(UPLOAD_COURSE_IMAGE);
  const [uploadTileImage, { loading: uploadTileLoading }] = useMutation(UPLOAD_COURSE_TILE_IMAGE);
  const [uploadPreview, { loading: uploadPreviewLoading }] = useMutation(UPLOAD_COURSE_PREVIEW);
  const [updateCourse, { loading: udpateCourseLoading }] = useMutation(UPDATE_COURSE);

  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const [activeCourseTab, setActiveCourseTab] = useState(courseTabs.courseMaster.name);
  const router = useRouter();

  const { isDataPresent } = useHandleCourseData();

  async function isCourseNameDuplicate() {
    if (!userOrgData?.lsp_id) {
      setToastMessage('Something Went Wrong');
      return true;
    }

    let isDuplicate = false;
    const queryVariables = {
      publish_time: getUnixFromDate(),
      pageSize: 1,
      pageCursor: '',
      filters: { SearchText: courseMetaData?.name?.trim(), LspId: userOrgData?.lsp_id },
      status: COURSE_STATUS.publish
    };

    // querying data from backend every time amd not using in memory cache as we want live data
    const publishedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, queryVariables);
    queryVariables.status = COURSE_STATUS.save;
    const savedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, queryVariables);

    const allCourses = [
      ...((await savedCourseRes)?.latestCourses?.courses || []),
      ...((await publishedCourseRes)?.latestCourses?.courses || [])
    ];

    if (
      allCourses &&
      allCourses
        ?.filter((c) => isWordSame(c?.name, courseMetaData?.name))
        ?.filter((c) => c?.id !== courseMetaData?.id)?.length > 0
    ) {
      isDuplicate = true;
      setToastMessage('Course with smae name Already Exist');
    }

    return isDuplicate;
  }

  async function addNewCourse() {
    const _courseCurrentState = structuredClone(courseCurrentState);
    const _courseMetaData = structuredClone(courseMetaData);

    const { id, duration, status, ..._sendData } = _courseMetaData;

    const sendData = sanitizeFormData({ ..._sendData, status: COURSE_STATUS.save });
    const courseRes = await mutateData(ADD_NEW_COURSE, sendData, {});

    const addCourseData = courseRes?.addCourse;
    _courseCurrentState.isUpdating = false;
    if (courseRes?.error || !addCourseData?.id) {
      setCourseCurrentState(_courseCurrentState);
      setToastMessage('Add Course Error');
      return;
    }

    _courseCurrentState.isSaved = true;
    setCourseCurrentState(_courseCurrentState);
    setCourseMetaData(getCourseMetaDataObj({ ..._courseMetaData, ...addCourseData }));
    router.push(`/admin/course/my-courses/edit/${addCourseData?.id}`);
  }

  async function saveCourseMeta() {
    const _courseCurrentState = structuredClone(courseCurrentState);
    if (isDataPresent([courseTabs.courseMaster.name]).length)
      return setToastMessage('Complete Course Master Data to create new course');

    // update current state
    _courseCurrentState.isUpdating = true;
    setCourseCurrentState(_courseCurrentState);

    // check for duplicate values
    const isDuplicate = await isCourseNameDuplicate();
    if (isDuplicate) {
      _courseCurrentState.isUpdating = false;
      setCourseCurrentState(_courseCurrentState);
      return;
    }

    const _courseMetaData = structuredClone(courseMetaData);

    // add course if no id is present
    if (!_courseMetaData.id) return addNewCourse();

    // update course
    const { id, duration, name, status, approvers, ..._sendData } = _courseMetaData;
    // const sendData = sanitizeFormData({ _sendData });
  }

  // async function saveCourseData(isNextButton, tabIndex, showToastMsg = true, isPublishing = false) {
  //   if (
  //     !isPublishCourseEditable &&
  //     [COURSE_STATUS.publish, COURSE_STATUS.reject]?.includes(fullCourse?.status)
  //   ) {
  //     if (isNextButton) setActiveCourseTab(tabData[tabIndex || 0].name);

  //     return;
  //   }

  //   const currentLspId = sessionStorage.getItem('lsp_id');

  //   setIsLoading(!fullCourse.id ? 'SAVING...' : 'UPDATING...');
  //   // check for duplicate course name
  //   const queryVariables = {
  //     publish_time: Date.now(),
  //     pageSize: 1,
  //     pageCursor: '',
  //     filters: { SearchText: fullCourse?.name?.trim(), LspId: currentLspId }
  //   };
  //   const publishedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, {
  //     ...queryVariables,
  //     status: COURSE_STATUS.publish
  //   });
  //   const savedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, {
  //     ...queryVariables,
  //     status: COURSE_STATUS.save
  //   });
  //   const allCourses = [
  //     ...((await savedCourseRes)?.latestCourses?.courses || []),
  //     ...((await publishedCourseRes)?.latestCourses?.courses || [])
  //   ];

  //   if (
  //     allCourses &&
  //     allCourses
  //       ?.filter((c) => c?.name?.trim()?.toLowerCase() === fullCourse?.name?.trim()?.toLowerCase())
  //       ?.filter((c) => c?.id !== fullCourse?.id)?.length > 0
  //   ) {
  //     setIsLoading(null);
  //     return setToastMsg({ type: 'danger', message: 'Course with smae name already Exist' });
  //   }

  //   if (!fullCourse.id) {
  //     if (!isDataPresent()) return setIsLoading(null);
  //     const resObj = await createCourseAndUpdateContext(courseContextData, createCourse);
  //     setToastMsg({ type: resObj.type, message: resObj.message });
  //     setIsLoading(addCourseLoading ? 'SAVING...' : null);
  //     setIsCourseSaved(true);

  //     if (isNextButton && resObj.type === 'success') {
  //       setActiveCourseTab(tabData[tabIndex || 0].name);
  //     }

  //     router.push(router.asPath + `/${resObj?.courseId}`);
  //     return;
  //   }

  //   if (isNextButton && !isDataPresent()) return setIsLoading(null);
  //   if (!isNextButton && !fullCourse?.name) {
  //     setToastMsg({ type: 'danger', message: 'Course Name should not be empty' });
  //     setIsLoading(null);
  //     return;
  //   }
  //   // alert('course update started');

  //   await uploadFile(courseImage, uploadImage, 'image', 'uploadCourseImage');
  //   await uploadFile(courseTileImage, uploadTileImage, 'tileImage', 'uploadCourseTileImage');
  //   await uploadFile(courseVideo, uploadPreview, 'previewVideo', 'uploadCoursePreviewVideo');

  //   const { duration, name, status, approvers, ...fullCourseData } = fullCourse;
  //   const sendData = {
  //     ...fullCourseData,
  //     name: fullCourse?.name?.trim(),
  //     status: isPublishing ? COURSE_STATUS.publish : COURSE_STATUS.save,
  //     approvers: []
  //   };
  //   if (isPublishing) {
  //     sendData.publish_date = getUnixFromDate();
  //     sendData.approvers = [userData?.email];
  //   }

  //   if (
  //     fullCourse?.qa_required &&
  //     userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor)
  //   ) {
  //     sendData.status = COURSE_STATUS.approvalPending;
  //   }

  //   const courseUpdateResponse = await updateCourse({ variables: sendData })?.catch((err) => {
  //     console.log(err);
  //     showToastMsg = false;
  //     setToastMsg({ type: 'danger', message: 'Course Update Error' });
  //   });

  //   const _course = structuredClone(courseUpdateResponse?.data?.updateCourse || {});
  //   if (_course?.image?.includes(DEFAULT_VALUES.image)) _course.image = '';
  //   if (_course?.tileImage?.includes(DEFAULT_VALUES.tileImage)) _course.tileImage = '';
  //   if (_course?.previewVideo?.includes(DEFAULT_VALUES.previewVideo)) _course.previewVideo = '';
  //   if (_course) {
  //     console.log('s', _course?.status || sendData.status);
  //     updateCourseMaster({ ..._course, status: _course?.status || sendData.status });
  //     // set recoil state for course data
  //     setFullCourseData(
  //       getFullCourseDataObj({
  //         ...fullCourseData,
  //         ..._course,
  //         status: _course?.status || sendData.status
  //       })
  //     );
  //   }

  //   setIsLoading(
  //     udpateCourseLoading && uploadImageLoading && uploadTileLoading && uploadPreviewLoading
  //       ? 'UPDATING...'
  //       : null
  //   );

  //   if (showToastMsg) setToastMsg({ type: 'success', message: 'Course Updated' });
  //   console.log('course updated', fullCourse, _course);

  //   setIsCourseSaved(true);
  //   if (isNextButton) setActiveCourseTab(tabData[tabIndex || 0].name);
  // }

  return { activeCourseTab, setActiveCourseTab, saveCourseMeta };
}
