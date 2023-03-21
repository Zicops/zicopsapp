import { GET_USER_VENDORS, GET_VENDORS_BY_LSP_FOR_TABLE, userQueryClient } from '@/api/UserQueries';
import { COURSE_TYPES } from '@/constants/course.constants';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { LIMITS, ONE_MB_IN_BYTES, USER_LSP_ROLE } from '@/helper/constants.helper';
import {
  ActiveCourseTabNameAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom
} from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from './adminCourseComps.helper';

export default function useHandleCourseData() {
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });

  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const userData = useRecoilValue(UserStateAtom);

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
    if (courseMetaData?.type === COURSE_TYPES.classroom) courseMasterList.push('noOfLearner');

    // add list for details, about
    const courseDetailsList = ['subCategories', 'summary', 'previewVideo', 'image', 'tileImage'];

    const lists = {
      [courseTabs.courseMaster.name]: courseMasterList,
      [courseTabs.about.name]: [],
      [courseTabs.details.name]: courseDetailsList
    };

    tabsToValidate?.forEach((tab) => {
      const tabDataList = lists?.[tab];
      if (!tabDataList?.length) return;

      tabDataList.forEach((key) => !courseMetaData?.[key]?.length && errorList.push(key));
    });

    if (isUpdateState) setCourseCurrentState({ ...courseCurrentState, error: errorList });
    return !errorList?.length;
  }

  function handleChange(toBeUpdatedKeyValue = {}) {
    setCourseCurrentState((prev) => ({ ...prev, isSaved: false }));
    setCourseMetaData((prev) => ({ ...prev, ...(toBeUpdatedKeyValue || {}) }));
  }

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

  return {
    ownerList,
    handleChange,
    handleExpertise,
    isDataPresent,
    handleFileInput
  };
}
