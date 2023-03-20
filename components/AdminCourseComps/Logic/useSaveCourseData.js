import { ADD_NEW_COURSE, UPDATE_COURSE_DATA } from '@/api/Mutations';
import { GET_LATEST_COURSES } from '@/api/Queries';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { COURSE_STATUS, DEFAULT_VALUES, USER_LSP_ROLE } from '@/helper/constants.helper';
import { getUnixFromDate, isWordSame } from '@/helper/utils.helper';
import {
  ActiveCourseTabNameAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getCourseMetaDataObj
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from './adminCourseComps.helper';
import useHandleCourseData from './useHandleCourseData';

export default function useSaveCourseData() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const router = useRouter();

  const { isDataPresent } = useHandleCourseData();

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

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
    if (!isDataPresent([courseTabs.courseMaster.name]))
      return setToastMessage('Complete Course Master Data to create new course');

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
    setToastMessage('Course Created Successfully');
    router.push(`/admin/course/my-courses/edit/${addCourseData?.id}`);
  }

  async function updateCourse() {
    if (!courseCurrentState?.isUpdating)
      setCourseCurrentState({ ...courseCurrentState, isUpdating: true });

    const _courseMetaData = structuredClone(courseMetaData);

    const { duration, status, approvers, ..._sendData } = _courseMetaData;
    const sendData = sanitizeFormData({ ..._sendData, status: COURSE_STATUS.save, approvers: [] });

    // if course freezed then update status to publish
    if (_sendData?.qaRequired) sendData.status = COURSE_STATUS.publish;
    if (_sendData?.qaRequired && isVendor) sendData.status = COURSE_STATUS.approvalPending;

    if (sendData?.status === COURSE_STATUS.publish) {
      sendData.publish_date = getUnixFromDate();
      sendData.approvers = [userData?.email];
    }
    let isError = false;
    const updatedCourseRes = await mutateData(UPDATE_COURSE_DATA, sendData, {}).catch((err) => {
      console.log('Update Course Error: ', err);
      isError = true;
    });
    if (isError || updateCourse?.error || !updatedCourseRes?.updateCourse) {
      setCourseCurrentState({ ...courseCurrentState, isUpdating: false });
      setToastMsg({ type: 'danger', message: 'Course Update Error' });
      return null;
    }

    const _updatedCourseData = structuredClone(updatedCourseRes?.updateCourse || {});
    if (_updatedCourseData?.image?.includes(DEFAULT_VALUES.image)) _updatedCourseData.image = '';
    if (_updatedCourseData?.tileImage?.includes(DEFAULT_VALUES.tileImage))
      _updatedCourseData.tileImage = '';
    if (_updatedCourseData?.previewVideo?.includes(DEFAULT_VALUES.previewVideo))
      _updatedCourseData.previewVideo = '';

    const updatedCourseData = getCourseMetaDataObj({
      ..._courseMetaData,
      ..._updatedCourseData,
      isActive: _updatedCourseData?.is_active,
      isDisplay: _updatedCourseData?.is_display,
      subCategory: _updatedCourseData?.sub_category,
      subCategories: _updatedCourseData?.sub_categories,
      expertiseLevel: _updatedCourseData?.expertise_level,
      previewVideo: _updatedCourseData?.preview_video,
      tileImage: _updatedCourseData?.tile_image,
      relatedSkills: _updatedCourseData?.related_skills,
      publishDate: _updatedCourseData?.publish_date,
      expiryDate: _updatedCourseData?.expiry_date,
      qaRequired: _updatedCourseData?.qa_required,
      status: _updatedCourseData?.status || sendData?.status,

      createdAt: _updatedCourseData?.created_at,
      updatedAt: _updatedCourseData?.updated_at,
      createdBy: _updatedCourseData?.created_by,
      updatedBy: _updatedCourseData?.updated_by
    });

    setCourseMetaData(updatedCourseData);

    return updatedCourseData;
  }

  async function saveCourseMeta(
    configObj = {
      validateCurrentForm: false,
      displayUpdateSuccessToaster: true,
      switchTabName: null
    }
  ) {
    const _configObj = {
      validateCurrentForm: false,
      displayUpdateSuccessToaster: true,
      switchTabName: null,
      ...configObj
    };

    console.info(_configObj, 2, _configObj?.validateCurrentForm, isDataPresent([activeCourseTab]));
    if (_configObj?.validateCurrentForm && !isDataPresent([activeCourseTab])) return;

    // update current state
    setCourseCurrentState({ ...courseCurrentState, isUpdating: true });

    // check for duplicate course name
    const isDuplicate = await isCourseNameDuplicate();
    if (isDuplicate) return setCourseCurrentState({ ...courseCurrentState, isUpdating: false });

    // add course if no id is present
    if (!courseMetaData.id) return addNewCourse();

    // update course
    updateCourse().then((res) => {
      setCourseCurrentState({ ...courseCurrentState, isUpdating: false, isSaved: true });
      if (!res?.id) return;

      setToastMessage('Course Updated', 'success');
      if (!!_configObj?.switchTabName) setActiveCourseTab(_configObj?.switchTabName);
    });
  }

  return { saveCourseMeta };
}
