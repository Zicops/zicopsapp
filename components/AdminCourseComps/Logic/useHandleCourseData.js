import {
  GET_USER_DETAIL,
  GET_USER_VENDORS,
  GET_VENDORS_BY_LSP_FOR_TABLE,
  userQueryClient
} from '@/api/UserQueries';
import { GET_VILT_DATA, viltQueryClient } from '@/api/ViltQueries';
import { getUsersForAdmin } from '@/components/UserComps/Logic/getUsersForAdmin';
import { COURSE_TYPES } from '@/constants/course.constants';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { LIMITS, ONE_MB_IN_BYTES, USER_LSP_ROLE, USER_MAP_STATUS } from '@/helper/constants.helper';
import {
  ActiveCourseTabNameAtom,
  ClassroomMasterAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getClassroomMasterDataObj
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from './adminCourseComps.helper';

export default function useHandleCourseData() {
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });

  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [trainerCandidates, setTrainerCandidates] = useState(null);
  const [moderatorCandidates, setModeratorCandidates] = useState(null);
  const [ownerList, setOwnerList] = useState(null);

  const isVendor = userOrgData?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  useEffect(() => {
    if (isVendor && !userData?.id) return;
    if (!isVendor && !userOrgData?.lsp_id) return;
    if (isVendor) return loadCurrentVendorName();

    loadLspVendorNames();

    function loadCurrentVendorName() {
      loadAndCacheDataAsync(GET_USER_VENDORS, { user_id: userData?.id }, {}, userQueryClient)
        .then((res) => {
          const _owners = ['Zicops', res?.getUserVendor?.[0]?.name];
          setOwnerList(_owners?.map((owner) => ({ value: owner, label: owner })));
        })
        .catch((err) => {
          console.log('Error while loading user vendor', err);
          setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
        });
    }

    function loadLspVendorNames() {
      loadAndCacheDataAsync(
        GET_VENDORS_BY_LSP_FOR_TABLE,
        { lsp_id: userOrgData?.lsp_id },
        {},
        userQueryClient
      )
        .then((res) => {
          const _owners = ['Zicops', ...(res?.getVendors?.map((vendor) => vendor?.name) || [])];
          setOwnerList(
            _owners?.filter((o) => !!o)?.map((owner) => ({ value: owner, label: owner }))
          );
        })
        .catch((err) => {
          console.log('Error while loading lsp vendors', err);
          setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
        });
    }
  }, [isVendor ? userData?.id : '', userOrgData?.lsp_id]);

  function isDataPresent(tabsToValidate = [], isUpdateState = true) {
    if (!tabsToValidate?.length) return false;

    const errorList = [];
    const courseMasterList = [
      'name',
      'category',
      'subCategory',
      'expertiseLevel',
      'owner',
      'publisher',
      'language',
      'lspId'
    ];
    if (courseMetaData?.type === COURSE_TYPES.classroom) courseMasterList.push('noOfLearners');

    // add list for details, about
    const courseDetailsList = [
      'expectedCompletion',
      'subCategories',
      'summary',
      'previewVideo',
      'image',
      'tileImage'
    ];
    const courseAboutList = [
      'description',
      'outcomes',
      'benefits',
      'prequisites',
      'relatedSkills',
      'goodFor',
      'mustFor'
    ];

    const lists = {
      [courseTabs.courseMaster.name]: courseMasterList,
      [courseTabs.details.name]: courseDetailsList,
      [courseTabs.about.name]: courseAboutList
    };

    tabsToValidate?.forEach((tab) => {
      const tabDataList = lists?.[tab];
      if (!tabDataList?.length) return;

      tabDataList.forEach(
        (key) => !(!!courseMetaData?.[key] || !!classroomMaster?.[key]) && errorList.push(key)
      );
    });

    if (isUpdateState) setCourseCurrentState({ ...courseCurrentState, error: errorList });
    return !errorList?.length;
  }

  function handleCourseMetaChange(toBeUpdatedKeyValue = {}) {
    setCourseCurrentState((prev) => ({ ...prev, isSaved: false }));
    setCourseMetaData((prev) => ({ ...prev, ...(toBeUpdatedKeyValue || {}) }));
  }

  function handleClassroomMasterChange(toBeUpdatedKeyValue = {}) {
    setCourseCurrentState((prev) => ({ ...prev, isSaved: false }));
    setClassroomMaster((prev) => ({ ...prev, ...(toBeUpdatedKeyValue || {}) }));
  }

  // expertise change for course master
  function handleExpertise(e) {
    const trimmedInput = e?.target?.value?.trim();
    const isChecked = e.target.checked;

    const _courseMetaData = structuredClone(courseMetaData);
    const expertiseLevelArr = _courseMetaData?.expertiseLevel?.split(',')?.filter((el) => el) || [];
    const index = expertiseLevelArr?.findIndex((el) => el === trimmedInput);

    if (isChecked && index === -1) expertiseLevelArr?.push(trimmedInput);
    if (!isChecked && index >= 0) expertiseLevelArr?.splice(index, 1);

    _courseMetaData.expertiseLevel = expertiseLevelArr?.join(',') || '';

    setCourseCurrentState((prev) => ({ ...prev, isSaved: false }));
    setCourseMetaData(_courseMetaData);
  }

  // file input for course master
  function handleFileInput(e) {
    if (!courseMetaData.id) {
      setActiveCourseTab(courseTabs?.courseMaster?.name);
      setToastMessage('Add Course Master First');
      return;
    }
    const inputName = e?.target?.name;
    const file = e?.target?.files?.[0];

    if (+LIMITS?.[inputName] && file?.size > LIMITS?.[inputName]) {
      return setToastMessage(
        `File Size limit is ${Math.ceil(LIMITS?.[inputName] / ONE_MB_IN_BYTES)} mb`
      );
    }

    setCourseMetaData({ ...courseMetaData, [inputName]: file });
  }

  async function getTrainersAndModerators() {
    const users = await getUsersForAdmin();
    // filtering users based on lsp status
    const filteredUsers =
      users?.filter((users) => users?.status?.toLowerCase() === USER_MAP_STATUS?.activate) || [];

    console.info(filteredUsers);
    setTrainerCandidates([...(filteredUsers || [])]);
    setModeratorCandidates([...(filteredUsers || [])]);
    return filteredUsers;
  }

  async function getViltData(courseId = null) {
    if (!courseId) return;
    const resVilt = await loadQueryDataAsync(
      GET_VILT_DATA,
      { courseId: courseId },
      {},
      viltQueryClient
    );

    const viltData = resVilt?.getViltData?.[0];
    if (!viltData) return setClassroomMaster(getClassroomMasterDataObj());
    const trainers = viltData?.trainers || [];
    const moderators = viltData?.moderators || [];

    if (trainers.length || moderators.length) {
      const resUsers = await loadQueryDataAsync(
        GET_USER_DETAIL,
        { user_id: [...trainers, ...moderators] },
        {},
        userQueryClient
      );
      const users = structuredClone(resUsers?.getUserDetails || []);
      const newTrainers = [];
      const newModerators = [];

      trainers.forEach((trainerId) => {
        const user = users.find((u) => u.id === trainerId);
        if (user) {
          newTrainers.push({
            value: `${user.first_name} ${user.last_name}`,
            email: user.email,
            user_id: user.id
          });
        }
      });

      moderators.forEach((moderatorId) => {
        const user = users.find((u) => u.id === moderatorId);
        if (user) {
          newModerators.push({
            value: `${user.first_name} ${user.last_name}`,
            email: user.email,
            user_id: user.id
          });
        }
      });

      // assign new arrays to trainers and moderators
      trainers.splice(0, trainers.length, ...newTrainers);
      moderators.splice(0, moderators.length, ...newModerators);
    }

    setClassroomMaster(
      getClassroomMasterDataObj({
        id: viltData?.id,
        lsp: viltData?.lsp_id,
        courseId: viltData?.course_id,
        noOfLearners: viltData?.no_of_learners,
        trainers: trainers || viltData?.trainers,
        moderators: moderators || viltData?.moderators,
        courseStartDate: parseInt(viltData?.course_start_date)
          ? moment.unix(viltData?.course_start_date).toDate()
          : null,
        courseEndDate: parseInt(viltData?.course_end_date)
          ? moment.unix(viltData?.course_end_date).toDate()
          : null,
        curriculum: viltData?.curriculum,
        createdAt: viltData?.created_at,
        createdBy: viltData?.created_by,
        updatedAt: viltData?.updated_at,
        updatedBy: viltData?.updated_by,
        status: viltData?.status,
        isUpdate: true,
        isEndDatedecided: !viltData?.is_end_date_decided,
        isStartDatedecided: !viltData?.is_start_date_decided,
        isTrainerdecided: !viltData?.is_trainer_decided,
        isModeratordecided: !viltData?.is_moderator_decided
      })
    );
  }

  return {
    ownerList,
    handleCourseMetaChange,
    handleClassroomMasterChange,
    handleExpertise,
    isDataPresent,
    handleFileInput,
    getTrainersAndModerators,
    trainerCandidates,
    moderatorCandidates,
    getViltData
  };
}
