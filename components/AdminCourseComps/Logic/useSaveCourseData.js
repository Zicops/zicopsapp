import {
  ADD_NEW_COURSE,
  UPDATE_COURSE_DATA,
  UPLOAD_COURSE_IMAGE,
  UPLOAD_COURSE_PREVIEW,
  UPLOAD_COURSE_TILE_IMAGE,
} from '@/api/Mutations';
import { GET_LATEST_COURSES } from '@/api/Queries';
import { CREATE_VILT_DATA, UPDATE_VILT_DATA, viltMutationClient } from '@/api/ViltMutations';
import { CLASSROOM_MASTER_STATUS, COURSE_TYPES } from '@/constants/course.constants';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { COURSE_STATUS, DEFAULT_VALUES, USER_LSP_ROLE } from '@/helper/constants.helper';
import { getUnixFromDate, isWordSame } from '@/helper/utils.helper';
import {
  ActiveCourseTabNameAtom,
  ClassroomMasterAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getCourseMetaDataObj,
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from './adminCourseComps.helper';
import useHandleCourseData from './useHandleCourseData';

export default function useSaveCourseData() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

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
      status: COURSE_STATUS.publish,
    };

    // querying data from backend every time amd not using in memory cache as we want live data
    const publishedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, queryVariables);
    queryVariables.status = COURSE_STATUS.save;
    const savedCourseRes = loadQueryDataAsync(GET_LATEST_COURSES, queryVariables);

    const allCourses = [
      ...((await savedCourseRes)?.latestCourses?.courses || []),
      ...((await publishedCourseRes)?.latestCourses?.courses || []),
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

  async function addUpdateClassroomMaster(_courseMetaData = null) {
    if (!_courseMetaData) return null;
    if (_courseMetaData?.type !== COURSE_TYPES.classroom) return null;

    const trainers = classroomMaster?.trainers?.length
      ? classroomMaster?.trainers?.map((data) => data?.user_id || data)
      : [];
    const moderators = classroomMaster?.moderators?.length
      ? classroomMaster?.moderators?.map((data) => data?.user_id || data)
      : [];

    const _classRoomData = sanitizeFormData({
      lsp_id: _courseMetaData?.lspId || '',
      course_id: _courseMetaData?.id || '',
      no_of_learners: classroomMaster?.noOfLearners || '',
      // trainers: classroomMaster?.trainers || '',
      // moderators: classroomMaster?.moderators || '',
      course_start_date: getUnixFromDate(classroomMaster?.courseStartDate) || '',
      course_end_date: getUnixFromDate(classroomMaster?.courseEndDate) || '',
      curriculum: classroomMaster?.curriculum || '',
      status: CLASSROOM_MASTER_STATUS?.save,
      trainers: trainers,
      moderators: moderators,
      is_end_date_decided: !classroomMaster?.isEndDatedecided,
      is_start_date_decided: !classroomMaster?.isStartDatedecided,
      is_trainer_decided: !classroomMaster?.isTrainerdecided,
      is_moderator_decided: !classroomMaster?.isModeratordecided,
    });

    if (!!classroomMaster?.id) {
      _classRoomData.id = classroomMaster?.id;
      const resUpdate = await mutateData(
        UPDATE_VILT_DATA,
        { input: _classRoomData },
        {},
        viltMutationClient,
      ).catch(() => setToastMessage('Classroom Update Error!'));

      return resUpdate?.updateViltData || null;
    }

    const res = await mutateData(
      CREATE_VILT_DATA,
      { input: _classRoomData },
      {},
      viltMutationClient,
    ).catch(() => setToastMessage('Classroom Create Error!'));

    setClassroomMaster((prev) => ({ ...prev, isUpdate: true, id: res?.createViltData?.id }));

    return res?.createViltData || null;
  }

  async function addNewCourse(_courseMetaData = null) {
    if (!courseMetaData) return null;
    if (!isDataPresent([courseTabs.courseMaster.name])) {
      setToastMessage('Complete Course Master Data to create new course');
      return null;
    }

    const _courseCurrentState = structuredClone(courseCurrentState);

    const { id, duration, status, ..._sendData } = _courseMetaData;

    const sendData = sanitizeFormData({ ..._sendData, status: COURSE_STATUS.save });
    const courseRes = await mutateData(ADD_NEW_COURSE, sendData, {});

    const addCourseData = courseRes?.addCourse;
    _courseCurrentState.isUpdating = false;
    if (courseRes?.error || !addCourseData?.id) {
      setCourseCurrentState(_courseCurrentState);
      setToastMessage('Add Course Error');
      return null;
    }

    _courseCurrentState.isSaved = true;
    _courseCurrentState.error = [];
    setCourseCurrentState(_courseCurrentState);
    setCourseMetaData(getCourseMetaDataObj({ ..._courseMetaData, ...addCourseData }));
    setToastMessage('Course Created Successfully', 'success');
    router.push(`/admin/course/my-courses/edit/${addCourseData?.id}`);

    return addCourseData || null;
  }

  async function updateCourse(_courseMetaData = null) {
    if (!_courseMetaData) return null;
    if (!courseCurrentState?.isUpdating)
      setCourseCurrentState({ ...courseCurrentState, isUpdating: true });

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
      setToastMessage('Course Update Error');
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
      expectedCompletion: _updatedCourseData?.expected_completion,
      relatedSkills: _updatedCourseData?.related_skills,
      publishDate: _updatedCourseData?.publish_date,
      expiryDate: _updatedCourseData?.expiry_date,
      qaRequired: _updatedCourseData?.qa_required,
      status: _updatedCourseData?.status || sendData?.status,

      createdAt: _updatedCourseData?.created_at,
      updatedAt: _updatedCourseData?.updated_at,
    });

    setCourseMetaData(updatedCourseData);

    return updatedCourseData;
  }

  async function saveCourseMeta(
    configObj = {
      validateCurrentForm: false,
      displayUpdateSuccessToaster: true,
      switchTabName: null,
    },
  ) {
    const _configObj = {
      validateCurrentForm: false,
      displayUpdateSuccessToaster: true,
      switchTabName: null,
      ...configObj,
    };

    if (_configObj?.validateCurrentForm && !isDataPresent([activeCourseTab])) return;

    // update current state
    setCourseCurrentState({ ...courseCurrentState, isUpdating: true });

    // check for duplicate course name
    const isDuplicate = await isCourseNameDuplicate();
    if (isDuplicate) return setCourseCurrentState({ ...courseCurrentState, isUpdating: false });

    const _courseMetaData = structuredClone(courseMetaData);

    // add course if no id is present
    if (!courseMetaData.id)
      return addNewCourse(_courseMetaData)
        .then((courseDataRes) => addUpdateClassroomMaster(courseDataRes))
        .then(() => {
          if (!!_configObj?.switchTabName) setActiveCourseTab(_configObj?.switchTabName);
        })
        .catch((err) => console.log(err));

    await uploadCourseFiles(_courseMetaData);

    // update course
    updateCourse(_courseMetaData).then(async (res) => {
      setCourseCurrentState({ ...courseCurrentState, isUpdating: false, isSaved: true, error: [] });
      if (!res?.id) return;

      await addUpdateClassroomMaster(res);

      setToastMessage('Course Updated', 'success');
      if (!!_configObj?.switchTabName) setActiveCourseTab(_configObj?.switchTabName);
    });
  }

  async function uploadCourseFiles(_courseMetaData = null) {
    if (!_courseMetaData) return;

    // course preview video upload
    if (!!_courseMetaData?.previewVideo?.name) {
      const coursePreviewRes = await mutateData(UPLOAD_COURSE_PREVIEW, {
        file: _courseMetaData?.previewVideo,
        courseId: _courseMetaData?.id,
      });

      if (!!coursePreviewRes?.uploadCoursePreviewVideo?.url) {
        _courseMetaData.previewVideo = coursePreviewRes?.uploadCoursePreviewVideo?.url;
      } else {
        setToastMessage('Failed to Upload Preview Video');
      }
    }

    // course display image upload
    if (!!_courseMetaData?.image?.name) {
      const coursePreviewRes = await mutateData(UPLOAD_COURSE_IMAGE, {
        file: _courseMetaData?.image,
        courseId: _courseMetaData?.id,
      });

      if (!!coursePreviewRes?.uploadCourseImage?.url) {
        _courseMetaData.image = coursePreviewRes?.uploadCourseImage?.url;
      } else {
        setToastMessage('Failed to Upload Display Image');
      }
    }

    // course tile image upload
    if (!!_courseMetaData?.tileImage?.name) {
      const coursePreviewRes = await mutateData(UPLOAD_COURSE_TILE_IMAGE, {
        file: _courseMetaData?.tileImage,
        courseId: _courseMetaData?.id,
      });

      if (!!coursePreviewRes?.uploadCourseTileImage?.url) {
        _courseMetaData.tileImage = coursePreviewRes?.uploadCourseTileImage?.url;
      } else {
        setToastMessage('Failed to Upload Tile Image');
      }
    }
  }

  return { saveCourseMeta };
}
