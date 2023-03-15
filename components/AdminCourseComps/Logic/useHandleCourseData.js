import { GET_USER_VENDORS, GET_VENDORS_BY_LSP_FOR_TABLE, userQueryClient } from '@/api/UserQueries';
import { COURSE_TYPES } from '@/constants/course.constants';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from './adminCourseComps.helper';

export default function useHandleCourseData() {
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [ownerList, setOwnerList] = useState(null);

  const isVendor = userOrgData?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  useEffect(() => {
    if (isVendor && !userData?.id) return;
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
  }, [isVendor ? userData?.id : '']);

  function isDataPresent(tabsToValidate = []) {
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

    const lists = {
      [courseTabs.courseMaster.name]: courseMasterList,
      [courseTabs.about.name]: [],
      [courseTabs.details.name]: []
    };

    tabsToValidate?.forEach((tab) => {
      const tabDataList = lists?.[tab];
      if (!tabDataList?.length) return;

      tabDataList.forEach((key) => !courseMetaData?.[key]?.length && errorList.push(key));
    });

    return errorList;
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

  function handlePreviewVideo(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];
    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setCourseMetaData({
        ...courseMetaData,
        previewVideo: e.target.files[0]
      });
    }
    e.target.value = '';
  }
  function handleImage(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];
    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setCourseMetaData({
        ...courseMetaData,
        image: e.target.files[0]
      })
    }
    e.target.value = '';
  }

  function handleTileImage(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];
    if (e.target.value && acceptedType.includes(e.target.files[0]?.type)) {
      setCourseMetaData({
        ...courseMetaData,
        tileImage: e.target.files[0]
      })
    }
    e.target.value = '';
  }
  return { ownerList, handleChange, handleExpertise, isDataPresent, handlePreviewVideo ,handleImage,handleTileImage};
}
