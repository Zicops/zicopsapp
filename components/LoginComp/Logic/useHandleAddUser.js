import {
  ADD_USER_LANGUAGE_MAP,
  ADD_USER_LEARNINGSPACE_MAP,
  ADD_USER_ORGANIZATION_MAP,
  ADD_USER_PREFERENCE,
  ADD_USER_ROLE,
  UPDATE_USER,
  UPDATE_USER_LEARNINGSPACE_MAP,
  UPDATE_USER_ORGANIZATION_MAP,
  userClient,
  USER_LOGIN
} from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS,
  GET_USER_LATEST_COHORTS,
  GET_USER_LEARNINGSPACES_DETAILS,
  GET_USER_ORGANIZATIONS,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync, sendNotificationWithLink } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import {
  COURSE_MAP_STATUS,
  CUSTOM_ERROR_MESSAGE,
  NOTIFICATION_MSG_LINKS,
  NOTIFICATION_TITLES,
  USER_STATUS
} from '@/helper/constants.helper';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { parseJson } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  getUserObject,
  getUserOrgObject,
  UsersOrganizationAtom,
  UserStateAtom
} from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength
} from 'libphonenumber-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleAddUserDetails() {
  const router = useRouter();
  //have to delete updateAbout later
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
    client: userClient
  });
  const [updateOrg, { error: updateOrgErr }] = useMutation(UPDATE_USER_ORGANIZATION_MAP, {
    client: userClient
  });
  const [updateLsp, { error: updateLspError }] = useMutation(UPDATE_USER_LEARNINGSPACE_MAP, {
    client: userClient
  });

  const [addOrg, { error: createOrgError }] = useMutation(ADD_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  const [addLsp, { error: createLspError }] = useMutation(ADD_USER_LEARNINGSPACE_MAP, {
    client: userClient
  });

  const [addLanguage, { error: createLangError }] = useMutation(ADD_USER_LANGUAGE_MAP, {
    client: userClient
  });

  const [addPreference, { error: createPreferenceError }] = useMutation(ADD_USER_PREFERENCE, {
    client: userClient
  });

  const [addRole, { error: createRoleError }] = useMutation(ADD_USER_ROLE, {
    client: userClient
  });
  const [userLogin] = useMutation(USER_LOGIN, { client: userClient });

  //recoil states
  const [userDataAbout, setUserDataAbout] = useRecoilState(UserStateAtom);
  const [userDataOrgLsp, setUserDataOrgLsp] = useRecoilState(UsersOrganizationAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
  const [userOrgData, setUserOrgData] = useState(getUserOrgObject());
  const [isOrganizationSetupReady, setIsOrganizationSetupReady] = useState(false);
  const [isAccountSetupReady, setIsAccountSetupReady] = useState(false);
  const [isSubmitDisable, setSubmitDisable] = useState(false);
  const [phCountryCode, setPhCountryCode] = useState('IN');
  const fcmToken = useRecoilValue(FcmTokenAtom);

  // setting up local states
  useEffect(() => {
    console.info('recoil: ', userDataAbout, 'local: ', userAboutData);
    setUserAboutData(getUserObject(userDataAbout));
    setUserOrgData(getUserOrgObject(userDataOrgLsp));
  }, [userDataAbout, userDataOrgLsp]);

  useEffect(() => {
    if (userDataAbout?.email) return;
    if (!auth?.currentUser?.accessToken) return;

    loginUser();

    async function loginUser() {
      for (let i = 0; i < 4; i++) {
        let isError = false;
        if (!auth?.currentUser?.accessToken) return;

        const res = await userLogin({
          context: {
            headers: {
              Authorization: auth?.currentUser?.accessToken
                ? `Bearer ${auth?.currentUser?.accessToken}`
                : ''
            }
          }
        }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Login Error' });
        });

        if (isError) continue;
        if (res?.data?.login?.status === USER_STATUS.disable) break;

        setUserDataAbout(getUserObject(res?.data?.login));
        sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));
      }
    }
  }, [userDataAbout?.email]);

  useEffect(() => {
    let isPhValid = false;

    if (userAboutData?.phone?.length > 10) {
      isPhValid =
        isPossiblePhoneNumber(`${userAboutData?.phone || 123456}`, phCountryCode) &&
        isValidPhoneNumber(`${userAboutData?.phone || 123456}`, phCountryCode) &&
        !validatePhoneNumberLength(`${userAboutData?.phone || 123456}`, phCountryCode);
    }

    setIsAccountSetupReady(
      userAboutData?.first_name.length > 0 &&
        userAboutData?.last_name.length > 0 &&
        userAboutData?.email.length > 0 &&
        isPhValid &&
        userOrgData?.language.length > 0 &&
        userAboutData?.gender?.length > 0
    );
    setIsOrganizationSetupReady(
      //   userDataAbout?.id &&
      userOrgData?.employee_id?.length > 0 &&
        userOrgData?.organization_role?.length > 0 &&
        userOrgData?.user_lsp_role?.length > 0 &&
        userOrgData?.learningSpace_name?.length > 0 &&
        userOrgData?.organization_name?.length > 0
    );
  }, [userOrgData, userAboutData]);

  async function getUserOrgMapId(userLspId = '') {
    if (!userLspId?.length) return false;
    const res = await loadQueryDataAsync(
      GET_USER_ORGANIZATIONS,
      { user_id: userDataAbout?.id },
      {},
      userQueryClient
    );
    if (res?.error) return setToastMsg({ type: 'Error', message: 'Error while loading user org' });
    const userOrgMap = res?.getUserOrganizations?.filter((org) => org?.user_lsp_id === userLspId);
    console.log(res);
    if (!userOrgMap?.length) return false;
    return userOrgMap[0]?.user_organization_id;
  }

  async function addUserLearningSpaceDetails(sub_categories = [], base_sub_category) {
    // console.log(userDataOrgLsp, 'data at start of addUserLearningDetails');
    const lspId = sessionStorage.getItem('lsp_id');
    let userLspId = sessionStorage.getItem('user_lsp_id');
    setSubmitDisable(true);

    //load user_lsp_id

    if (!userLspId) {
      const resLearning = await loadQueryDataAsync(
        GET_USER_LEARNINGSPACES_DETAILS,
        { user_id: userDataAbout?.id, lsp_id: lspId },
        {},
        userQueryClient
      );
      if (resLearning?.error)
        return setToastMsg({
          type: 'danger',
          message: 'Error while loading learning space details!'
        });
      // let userLspId = null ;

      if (resLearning?.getUserLspByLspId) {
        userLspId = resLearning?.getUserLspByLspId?.user_lsp_id;
      }
    }

    const userOrgId = await getUserOrgMapId(userLspId);

    // console.log(userOrgId,'user org id');
    // return true;

    let isError = false;
    const sendLspData = {
      user_id: userDataAbout?.id,
      lsp_id: userOrgData?.lsp_id || lspId,
      status: 'Active'
    };
    if (!userLspId) {
      // console.log(sendLspData, 'addUserLearningSpaceDetails');

      const resLsp = await addLsp({ variables: sendLspData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
      });

      if (isError) {
        setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
        return;
        // return router.push('/account-setup');
      }

      //updating atom after first mutation call
      const dataLsp = resLsp?.data?.addUserLspMap[0];

      setUserDataOrgLsp((prevValue) => ({ ...prevValue, user_lsp_id: dataLsp?.user_lsp_id }));

      userLspId = dataLsp?.user_lsp_id;
    } else {
      sendLspData.user_lsp_id = userLspId;

      const resLsp = await updateLsp({ variables: sendLspData }).catch((err) => {
        console.log(err);
        isError = !!err;
      });

      if (isError)
        return setToastMsg({
          type: 'danger',
          message: 'Error while filling the form please try again!'
        });

      setUserDataOrgLsp((prevValue) => ({ ...prevValue, user_lsp_id: userLspId }));
    }
    // ORGANIZATION DATA MUTATION

    // console.log(userDataOrgLsp, 'data at start of addUserOrganizationDetails');

    const sendOrgData = {
      user_id: userDataAbout?.id,
      employee_id: userOrgData?.employee_id,

      user_lsp_id: userLspId,
      organization_id: userOrgData?.organization_id,
      organization_role: userOrgData?.organization_role,

      is_active: userOrgData?.org_is_active || true
    };

    let _updateOrg = false;
    let dataOrg;
    if (!!userOrgId) {
      _updateOrg = true;
      sendOrgData.user_organization_id = userOrgId;
    }

    isError = false;
    if (!userOrgId) {
      const resOrg = await addOrg({ variables: sendOrgData }).catch((err) => {
        // console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add User Org Error' });
      });
      if (!isError) dataOrg = resOrg?.data?.addUserOrganizationMap[0];
    }

    if (_updateOrg) {
      const resOrg = await updateOrg({ variables: sendOrgData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add User Org Error' });
      });
      if (!isError) dataOrg = resOrg?.data?.updateUserOrganizationMap;
    }

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return;
    }

    // const dataOrg = resOrg?.data?.addUserOrganizationMap[0];

    //updating atom after first mutation call
    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_organization_id: dataOrg?.user_organization_id
    }));

    // LANGUAGE DATA MUTATION
    // console.log(userDataOrgLsp, 'data at start of addUserLanguageDetails');
    const sendLangData = {
      user_id: userDataAbout?.id,
      user_lsp_id: userLspId,
      language: userOrgData?.language,
      is_base_language: userOrgData?.is_base_language || true,
      is_active: userOrgData?.lang_is_active || true
    };

    // console.log(sendLangData, 'addUserLanguageDetails');
    isError = false;
    const resLang = await addLanguage({ variables: sendLangData }).catch((err) => {
      // console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User language Error' });
    });
    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return;
    }

    const dataLang = resLang?.data?.addUserLanguageMap[0];
    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_language_id: dataLang?.user_language_id
    }));

    //ORGANIZATION PREFERANCE MUTATION CALL

    // console.log(userDataOrgLsp, 'data at start of addUserPreferenceDetails');
    // const sendPreferenceData = {
    //   user_id: userDataAbout?.id,
    //   user_lsp_id: dataLsp?.user_lsp_id,
    //   sub_category: sub_category,
    //   is_base: userOrgData?.is_base,
    //   is_active: userOrgData?.preferences_is_active
    // };

    if (sub_categories?.length && !!base_sub_category) {
      const sendPreferenceData = sub_categories.map((item) => {
        let is_base = item === base_sub_category ? true : false;
        return {
          user_id: userDataAbout?.id,
          user_lsp_id: userLspId,
          sub_category: item,
          is_base: is_base,
          is_active: userOrgData?.preferences_is_active
        };
      });

      // console.log(sendPreferenceData);

      isError = false;
      const resPref = await addPreference({ variables: { input: sendPreferenceData } }).catch(
        (err) => {
          // console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Update User Preferance Error' });
        }
      );

      if (isError) {
        setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
        return;
      }

      const dataPref = resPref?.data?.addUserPreference[0];
      // console.log(dataPref);

      setUserDataOrgLsp((prevValue) => ({
        ...prevValue,
        user_preference_id: dataPref?.user_preference_id,
        sub_category: dataPref?.sub_category,
        preferences_is_active: dataPref?.is_active
      }));
    }

    setSubmitDisable(false);
    return isError;

    // commented user role map because not needed to add new map here

    // ORGANIZATION USER ROLE MUTATION
    // console.log(userDataOrgLsp, 'data at start of addUserRoleDetails');
    // const sendRoleData = {
    //   user_id: userDataAbout?.id,
    //   user_lsp_id: userLspId,
    //   role: userOrgData?.user_role || 'Learner',
    //   is_active: true
    // };
    // // console.log(sendRoleData);

    // isError = false;
    // const resRole = await addRole({ variables: sendRoleData }).catch((err) => {
    //   // console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'Update User role Error' });
    // });

    // if (isError) {
    //   setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
    //   return;
    //   return router.push('/account-setup');
    // }

    // const dataRole = resRole?.data?.addUserRoles[0];

    // setUserDataOrgLsp((prevValue) => ({
    //   ...prevValue,
    //   user_role: dataRole?.role,
    //   user_role_id: dataRole?.user_role_id
    // }));

    // setSubmitDisable(false);
    // return isError;
  }

  async function notficationOnFirstLogin(userData = null, userLspId = null) {
    const sendData = {
      user_id: userData?.id,
      publish_time: getCurrentEpochTime(),
      pageCursor: '',
      pageSize: 1000
    };
    const userCoursesMaps = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      sendData,
      {},
      userQueryClient
    );

    //filtering the courses based on user_lsp_id
    const courses = userCoursesMaps?.getUserCourseMaps?.user_courses?.filter(
      (item) =>
        item?.user_lsp_id === userLspId &&
        item?.course_status.toLowerCase() !== COURSE_MAP_STATUS.disable.toLowerCase()
    );
    if (!!courses?.length) {
      sendNotificationWithLink(
        {
          title: NOTIFICATION_TITLES?.signIn?.course,
          body: NOTIFICATION_MSG_LINKS?.firstSigin?.coursesAssigned?.msg,
          user_id: [userData?.id],
          link: ''
        },
        { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
      );
    }

    sendData.user_lsp_id = userLspId;
    const resCohorts = await loadQueryDataAsync(
      GET_USER_LATEST_COHORTS,
      { ...sendData },
      {},
      userQueryClient
    );

    const cohorts = resCohorts?.getLatestCohorts?.cohorts;
    console.log(cohorts);

    if (!!cohorts?.length) {
      sendNotificationWithLink(
        {
          title: NOTIFICATION_TITLES?.cohortAssign,
          body: NOTIFICATION_MSG_LINKS?.firstSigin?.cohortAssigned?.msg,
          user_id: [userData?.id],
          link: ''
        },
        { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
      );
    }
    sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.lspWelcome,
        body: `Hey ${userAboutData?.first_name} ${userAboutData?.last_name}, Welcome to ${userDataOrgLsp?.learningSpace_name} learning space. We wish you the best on your journey towards growth and empowerment.`,
        user_id: [userData?.id],
        link: ''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );

    // const origin = window?.location?.origin || '';
    // const bodyData = {
    //   user_name: userData?.first_name || '',
    //   lsp_name: sessionStorage?.getItem('lsp_name'),
    //   // course_name: courseName || '',
    //   // end_date: moment(courseAssignData?.endDate?.valueOf()).format('D MMM YYYY'),
    //   link: `${origin}/`
    // };

    // let emailBody = {
    //   to: [userData?.email],
    //   sender_name: sessionStorage?.getItem('lsp_name'),
    //   user_name: userData?.first_name || '',
    //   body: JSON.stringify(bodyData),
    //   template_id: ''
    // }
    // sendEmail(emailBody,{ context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } })
    sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.courseUnssigned,
        body: NOTIFICATION_MSG_LINKS?.firstSigin?.addCourses?.msg,
        user_id: [userData?.id],
        link: ''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
    return true;
  }

  async function updateAboutUser(
    newImage = null,
    isVerified = true,
    isFirst = false,
    isVendor = false
  ) {
    let userLspId = sessionStorage.getItem('user_lsp_id');
    const sendUserData = {
      id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: USER_STATUS.activate,
      role: userAboutData?.role || 'Learner',
      email: userAboutData?.email,
      phone: userAboutData?.phone?.includes('+')
        ? userAboutData?.phone
        : `+${userAboutData?.phone}`,

      gender: userAboutData?.gender,
      photo_url: userAboutData?.photo_url,

      is_verified: isVerified,
      is_active: userAboutData?.is_active,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops'
    };
    let isError = false;
    if (isVendor) {
      let sendLspData = {
        user_lsp_id: userDataOrgLsp?.user_lsp_id,
        user_id: userAboutData?.id,
        lsp_id: userDataOrgLsp?.lsp_id,
        status: USER_STATUS.activate
      };
      console.log(sendLspData, 'error at update user');
      const res = await updateLsp({ variables: sendLspData }).catch((err) => {
        errorMsg = err.message;
        isError = true;
        return setToastMsg({ type: 'danger', message: 'Update Lsp  Error' });
      });
    }
    if (userAboutData?.Photo) sendUserData.Photo = userAboutData?.Photo;
    if (newImage && newImage?.type?.includes('image')) sendUserData.Photo = newImage;
    // if (userAboutData?.photo_url) sendUserData.photo_url = userAboutData?.photo_url;

    // console.log(sendUserData, 'updateAboutUser');

    let errorMsg = null;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      // console.log(err,'error at update user');
      errorMsg = err.message;
      isError = true;
      return setToastMsg({ type: 'danger', message: 'Update User about Error' });
    });

    if (isError) {
      const message = parseJson(errorMsg.split('body:')[1]);
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.phoneError) {
        setToastMsg({ type: 'info', message: `Phone Number already exists!` });
        return !!errorMsg;
      }
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.shortNumber) {
        setToastMsg({ type: 'info', message: `Invalid Phone Number. Too short.` });
        return !!errorMsg;
      }
      return setToastMsg({ type: 'danger', message: `Update User about Error!` });
    }

    const data = res?.data?.updateUser;
    const _userData = { ...userAboutData, ...data };

    if (isVerified && isFirst && !isVendor) {
      await notficationOnFirstLogin(userAboutData?.id, userLspId);
    }

    // if (data?.photo_url.length > 0) data.photo_url = userAboutData?.photo_url;
    if (!data?.photo_url?.length) _userData.photo_url = userAboutData?.photo_url;
    setUserDataAbout({ ..._userData, isUserUpdated: true });
    sessionStorage.setItem('loggedUser', JSON.stringify(_userData));
    // console.log(isError,'iserror')

    return !!errorMsg;
  }

  // async function addUserOrganizationDetails() {
  //   console.log(userDataOrgLsp, 'data at start of addUserOrganizationDetails');
  //   const sendOrgData = {
  //     user_id: userDataAbout?.id,
  //     employee_id: userOrgData?.employee_id,

  //     user_lsp_id: userOrgData?.user_lsp_id,
  //     organization_id: userOrgData?.organization_id || 'Zicops',
  //     organization_role: userOrgData?.organization_role,

  //     is_active: userOrgData?.org_is_active || true
  //   };

  //   let isError = false;
  //   const res = await addOrg({ variables: sendOrgData }).catch((err) => {
  //     console.log(err);
  //     isError = !!err;
  //     return setToastMsg({ type: 'danger', message: 'Update User Org Error' });
  //   });

  //   const data = res?.data?.addUserOrganizationMap[0];
  //   //updating atom after first mutation call
  //   setUserDataOrgLsp((prevValue) => ({
  //     ...prevValue,
  //     user_organization_id: data?.user_organization_id
  //   }));

  //   console.log(res, userDataOrgLsp);
  // }

  // async function addUserLanguageDetails() {
  //   console.log(userDataOrgLsp, 'data at start of addUserLanguageDetails');
  //   const sendLangData = {
  //     user_id: userDataAbout?.id,
  //     user_lsp_id: userOrgData?.user_lsp_id,
  //     language: userOrgData?.language,
  //     is_base_language: userOrgData?.is_base_language || true,
  //     is_active: userOrgData?.lang_is_active || true
  //   };

  //   console.log(sendLangData, 'addUserLanguageDetails');
  //   let isError = false;
  //   const res = await addLanguage({ variables: sendLangData }).catch((err) => {
  //     console.log(err);
  //     isError = !!err;
  //     return setToastMsg({ type: 'danger', message: 'Update User language Error' });
  //   });

  //   const data = res?.data?.addUserLanguageMap[0];
  //   setUserDataOrgLsp((prevValue) => ({
  //     ...prevValue,
  //     user_language_id: data?.user_language_id
  //   }));

  //   console.log(userDataOrgLsp);
  // }

  // async function addUserPreferenceDetails() {
  //   console.log(userDataOrgLsp, 'data at start of addUserPreferenceDetails');
  //   const sendPreferenceData = {
  //     user_id: userDataAbout?.id,
  //     user_lsp_id: userOrgData?.user_lsp_id,
  //     sub_category: userOrgData?.sub_category,
  //     is_base: userOrgData?.is_base,
  //     is_active: userOrgData?.preferences_is_active
  //   };

  //   console.log(sendLangData, 'addUserLanguageDetails');
  //   let isError = false;
  //   const res = await addPreference({ variables: sendPreferenceData }).catch((err) => {
  //     console.log(err);
  //     isError = !!err;
  //     return setToastMsg({ type: 'danger', message: 'Update User Preferance Error' });
  //   });

  //   const data = res?.data?.addUserPreference[0];

  //   setUserDataOrgLsp((prevValue) => ({
  //     ...prevValue,
  //     user_preference_id: data?.user_preference_id,
  //     sub_category: data?.sub_category,
  //     preferences_is_active: data.is_active
  //   }));
  //   console.log(userDataOrgLsp);
  // }

  // async function addUserRoleDetails() {}

  return {
    updateAboutUser,
    addUserLearningSpaceDetails,
    isOrganizationSetupReady,
    isAccountSetupReady,
    setPhCountryCode,
    isSubmitDisable
    // addUserOrganizationDetails,
    // addUserLanguageDetails,
    // addUserPreferenceDetails,
    // addUserRoleDetails
  };
}
