import { GET_CATS_AND_SUB_CAT_MAIN, GET_COURSE } from '@/api/Queries';
import { UPDATE_USER, UPDATE_USER_ORGANIZATION_MAP, userClient } from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS,
  GET_USER_COURSE_PROGRESS,
  GET_USER_LEARNINGSPACES_DETAILS,
  GET_USER_PREFERENCES,
  userQueryClient
} from '@/api/UserQueries';
import { subCategories } from '@/components/LoginComp/ProfilePreferences/Logic/profilePreferencesHelper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserOrgObject, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength
} from 'libphonenumber-js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loadQueryDataAsync } from './api.helper';
import { getCurrentEpochTime } from './common.helper';
import { LEARNING_SPACE_ID } from './constants.helper';
import { getUserData } from './loggeduser.helper';

export function useHandleCatSubCat(selectedCategory) {
  const [catSubCat, setCatSubCat] = useState({
    cat: [],
    subCat: [],
    allSubCat: [],
    isFiltered: false
  });
  const [activeCatId, setActiveCatId] = useState(null);

  useEffect(async () => {
    const catAndSubCatRes = await loadQueryDataAsync(GET_CATS_AND_SUB_CAT_MAIN);
    const allSubCat = catAndSubCatRes?.allSubCatMain?.map((subCat) => ({
      ...subCat,
      value: subCat?.Name,
      label: subCat?.Name
    }));
    let _subCat = allSubCat;

    if (selectedCategory) {
      const cat = catAndSubCatRes?.allCatMain?.find((cat) => cat?.Name === selectedCategory);
      _subCat = catAndSubCatRes?.allSubCatMain
        ?.filter((subCat) => subCat?.CatId === cat?.id)
        ?.map((subCat) => ({ ...subCat, value: subCat?.Name, label: subCat?.Name }));
    }

    setCatSubCat({
      ...catSubCat,
      cat: catAndSubCatRes?.allCatMain?.map((cat) => ({
        ...cat,
        value: cat?.Name,
        label: cat?.Name
      })),
      subCat: _subCat,
      allSubCat: allSubCat,
      isFiltered: allSubCat?.length === _subCat?.length
    });
  }, []);

  useEffect(() => {
    if (catSubCat?.isFiltered) return;
    let allSubCat = catSubCat?.allSubCat;
    let _subCat = catSubCat?.allSubCat;
    if (selectedCategory) {
      const cat = catSubCat?.cat?.find((cat) => cat?.Name === selectedCategory);
      _subCat = catSubCat?.subCat?.filter((subCat) => subCat?.CatId === cat?.id);
    }

    setCatSubCat({
      ...catSubCat,
      subCat: _subCat,
      isFiltered: allSubCat?.length === _subCat?.length
    });
  }, [selectedCategory, catSubCat?.isFiltered]);

  useEffect(() => {
    const allSubCat = catSubCat?.allSubCat;
    let _subCat = allSubCat;

    if (activeCatId?.id) {
      _subCat = allSubCat?.filter((subCat) => subCat?.CatId === activeCatId?.id);
    }

    setCatSubCat({ ...catSubCat, subCat: _subCat });
  }, [activeCatId]);

  return { catSubCat, activeCatId, setActiveCatId };
}

// export default function useHandleUserDetails() {
//   const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
//     client: userClient
//   });

//   //recoil states
//   const userDataAbout = useRecoilValue(UserStateAtom);

// const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

//   // local state
//   const [userAboutData, setUserAboutData] = useState(getUserObject());

//   // setting up local states
//   useEffect(() => {
//     setUserAboutData(getUserObject(userDataAbout));

//   }, [userData]);

//   async function updateAboutUser() {
//     const sendUserData = {
//     id: userAboutData?.id,
//       first_name: userAboutData?.first_name,
//       last_name: userAboutData?.last_name,

//       status: userAboutData?.status,
//       role: userAboutData?.role || 'Learner',
//       email: userAboutData?.email,
//       phone: userAboutData?.phone,
//       photo_url: userAboutData?.photo_url || null,
//       Photo: userAboutData?.photo || null,
//       gender: userAboutData?.gender,

//       is_verified: true,
//       is_active: true,

//       created_by: userAboutData?.created_by || 'Zicops',
//       updated_by: userAboutData?.updated_by || 'Zicops'
//     };

//     console.log(sendUserData, 'updateAboutUser');

//     let isError = false;
//     const res = await updateAbout({ variables: sendUserData }).catch((err) => {
//       console.log(err);
//       isError = !!err;
//       return setToastMsg({ type: 'danger', message: 'Update User Error' });
//     });

//     console.log(res);
//   }

//   return { updateAboutUser };
// }

//added common hook for userCourse progress
export default function useUserCourseData() {
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function getUserCourseData(currentUserId = null) {
    if (!currentUserId)
      return setToastMsg({
        type: 'danger',
        message: 'Need to provide user id for course progress!'
      });

    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: getCurrentEpochTime(),
        pageCursor: '',
        pageSize: 999999999
      },
      {},
      userClient
    );

    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const assignedCoursesToUser = assignedCoursesRes?.getUserCourseMaps?.user_courses;

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      const mapId = courseMap?.user_course_id;
      const course_id = courseMap?.course_id;

      const courseProgressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS,
        { userId: currentUserId, userCourseId: mapId },
        {},
        userClient
      );

      if (courseProgressRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
        continue;
      }
      const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

      // if (!userProgressArr?.length) continue;

      let topicsStarted = 0;
      userProgressArr?.map((topic) => {
        if (topic?.status !== 'not-started') ++topicsStarted;
      });
      // console.log(topicsStarted);
      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      const courseRes = await loadQueryDataAsync(GET_COURSE, { course_id: course_id });
      if (courseRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Load Error' });
        continue;
      }

      const added_by = JSON.parse(assignedCoursesToUser[i]?.added_by);
      const courseDuraton = +courseRes?.getCourse?.duration * 60;
      allAssignedCourses.push({
        ...courseRes?.getCourse,
        completedPercentage: userProgressArr?.length ? courseProgress : '0',
        added_by: added_by?.role,
        created_at: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
        expected_completion: moment.unix(assignedCoursesToUser[i]?.end_date).format('DD/MM/YYYY'),
        timeLeft: courseDuraton - (courseDuraton * (courseDuraton || 0)) / 100
      });
    }

    const userCourses = allAssignedCourses.filter(
      (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
    );

    if (!userCourses?.length) return setToastMsg({ type: 'info', message: 'No courses found!' });

    return userCourses;
  }

  async function getUserPreferences() {
    // if(!userLspId) setToastMsg({type:'danger' , message:'Need to provide user lsp id^!'});
    const userData = getUserData();
    const userLspData = JSON.parse(sessionStorage?.getItem('lspData'));
    if (userData === 'User Data Not Found') return;
    const { id } = getUserData();
    if (!userLspData?.user_lsp_id) {
      const userLearningSpaceData = await loadQueryDataAsync(
        GET_USER_LEARNINGSPACES_DETAILS,
        { user_id: id, lsp_id: LEARNING_SPACE_ID },
        {},
        userQueryClient
      );
      if (userLearningSpaceData?.error)
        return setToastMsg({ type: 'danger', message: 'Error while loading user preferences^!' });
      //temporary solution only valid for one lsp...need to change later!
      sessionStorage?.setItem('lspData', JSON.stringify(userLearningSpaceData?.getUserLspByLspId));
      // console.log(userLearningSpaceData?.getUserLspByLspId?.user_lsp_id,'lsp')
      setUserOrgData(
        getUserOrgObject({ user_lsp_id: userLearningSpaceData?.getUserLspByLspId?.user_lsp_id })
      );
    }
    const { user_lsp_id } = JSON.parse(sessionStorage?.getItem('lspData'));

    if (!user_lsp_id) setToastMsg({ type: 'danger', message: 'Need to provide user lsp id^!' });

    const resPref = await loadQueryDataAsync(
      GET_USER_PREFERENCES,
      { user_id: id },
      {},
      userQueryClient
    );
    // console.log(resPref,'prefdata');

    if (resPref?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user preferences^!' });

    const data = resPref?.getUserPreferences;

    // let uLspId = user_lsp_id ? user_lsp_id : userLspId;
    // console.log(user_lsp_id, uLspId);
    // console.log(data);
    const prefData = data?.filter((item) => {
      return item?.user_lsp_id === user_lsp_id;
    });
    // console.log(prefData);
    const prefArr = [];
    for (let i = 0; i < prefData?.length; i++) {
      for (let j = 0; j < subCategories?.length; j++) {
        if (prefData[i].sub_category === subCategories[j].name) {
          prefArr.push({
            ...subCategories[j],
            user_preference_id: prefData[i]?.user_preference_id,
            sub_category: subCategories[j].name,
            user_id: prefData[i]?.user_id,
            user_lsp_id: prefData[i]?.user_lsp_id,
            is_base: prefData[i]?.is_base,
            is_active: prefData[i]?.is_active
          });
        }
      }
    }

    const basePreference = prefData?.filter((item) => item?.is_base && item?.is_active);
    // console.log(basePreference,'base');
    const preferences = prefData?.filter((item) => item?.is_active && !item?.is_base);
    setUserOrgData((prevValue) => ({
      ...prevValue,
      sub_category: basePreference[0]?.sub_category,
      sub_categories: preferences
    }));
    return prefArr;
  }

  return { getUserCourseData, getUserPreferences };
}

export function getUserAboutObject(data = {}) {
  return {
    id: data?.id || null,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    status: data?.status || null,
    role: data?.role || 'Learner',

    //for now dont update email
    email: data?.email || '',
    phone: data?.phone || '',
    phoneCode: data?.phoneCode || 'IN',
    photo_url: data?.photo_url || null,
    Photo: data?.Photo || null,
    gender: data?.gender || null,

    //only do isVerified true when users do its basic account setup
    is_verified: data?.is_verified || false,
    is_active: data?.is_active || false,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || null,
    updated_at: data?.updated_at || null
  };
}

export function useUpdateUserAboutData() {
  //have to delete updateAbout later
  const [updateAbout, { error: updateAboutErr }] = useMutation(UPDATE_USER, {
    client: userClient
  });

  // recoil
  const [userDataAbout, setUserDataAbout] = useRecoilState(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [newUserAboutData, setNewUserAboutData] = useState(getUserAboutObject({ is_active: true }));
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    let isPhValid = false;

    if (newUserAboutData?.phone?.length > 10) {
      isPhValid =
        isPossiblePhoneNumber(
          `${newUserAboutData?.phone || 123456}`,
          newUserAboutData?.phoneCode
        ) &&
        isValidPhoneNumber(`${newUserAboutData?.phone || 123456}`, newUserAboutData?.phoneCode) &&
        !validatePhoneNumberLength(
          `${newUserAboutData?.phone || 123456}`,
          newUserAboutData?.phoneCode
        );
    }

    setIsFormCompleted(
      newUserAboutData?.first_name &&
        newUserAboutData?.last_name &&
        newUserAboutData?.role &&
        newUserAboutData?.email &&
        isPhValid &&
        newUserAboutData?.gender
    );
  }, [newUserAboutData]);

  async function updateAboutUser() {
    const sendUserData = {
      id: newUserAboutData?.id,
      first_name: newUserAboutData?.first_name,
      last_name: newUserAboutData?.last_name,

      status: newUserAboutData?.status || 'Active',
      role: newUserAboutData?.role || 'Learner',
      email: newUserAboutData?.email,
      phone: newUserAboutData?.phone,

      gender: newUserAboutData?.gender,
      photo_url: newUserAboutData?.photo_url,

      is_verified: true,
      is_active: newUserAboutData?.is_active,

      created_by: newUserAboutData?.created_by || 'Zicops',
      updated_by: newUserAboutData?.updated_by || 'Zicops'
    };

    if (newUserAboutData?.Photo) sendUserData.Photo = newUserAboutData?.Photo;
    // if (userAboutData?.photo_url) sendUserData.photo_url = userAboutData?.photo_url;

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });

    if (isError || updateAboutErr)
      return setToastMsg({ type: 'danger', message: 'Update User about Error' });

    const data = res?.data?.updateUser;
    const _userData = { ...newUserAboutData, ...data };
    // if (data?.photo_url.length > 0) data.photo_url = userAboutData?.photo_url;
    setUserDataAbout(_userData);
    sessionStorage.setItem('loggedUser', JSON.stringify(_userData));
  }

  return {
    newUserAboutData,
    setNewUserAboutData,
    updateAboutUser,
    isFormCompleted
  };
}

export function getUserOrgMapObject(data = {}) {
  return {
    user_organization_id: data?.user_organization_id || null,
    user_id: data?.user_id || null,
    user_lsp_id: data?.user_lsp_id || null,

    organization_id: data?.organization_id || null,
    organization_role: data?.organization_role || '',
    employee_id: data?.employee_id || '',

    is_active: data?.is_active || false,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || '',
    updated_at: data?.updated_at || ''
  };
}

export function useUpdateUserOrgData() {
  //have to delete updateAbout later
  const [updateOrg, { error: updateOrgErr }] = useMutation(UPDATE_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  // recoil
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [newUserOrgData, setNewUserOrgData] = useState(getUserOrgMapObject({ is_active: true }));
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    setIsFormCompleted(newUserOrgData?.organization_role && newUserOrgData?.employee_id);
  }, [newUserOrgData]);

  async function updateUserOrg() {
    const sendUserData = {
      user_organization_id: newUserOrgData?.user_organization_id || null,
      user_id: newUserOrgData?.user_id || null,
      user_lsp_id: newUserOrgData?.user_lsp_id || null,

      organization_id: newUserOrgData?.organization_id || null,
      organization_role: newUserOrgData?.organization_role || '',
      employee_id: newUserOrgData?.employee_id || '',

      is_active: newUserOrgData?.is_active || false
    };

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateOrg({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });

    if (isError || updateOrgErr)
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });

    const data = res?.data?.updateUser;
    const _userData = { ...newUserOrgData, ...data };
    setUserOrgData(_userData);
    sessionStorage.setItem('userAccountSetupData', JSON.stringify(_userData));
    return _userData;
  }

  return {
    newUserOrgData,
    setNewUserOrgData,
    updateUserOrg,
    isFormCompleted
  };
}
