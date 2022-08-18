import {
  ADD_USER_LANGUAGE_MAP,
  ADD_USER_LEARNINGSPACE_MAP,
  ADD_USER_ORGANIZATION_MAP,
  ADD_USER_PREFERENCE,
  ADD_USER_ROLE,
  UPDATE_USER,
  userClient
} from '@/api/UserMutations';
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
import { useRecoilState } from 'recoil';

export default function useHandleAddUserDetails() {
  const router = useRouter();
  //have to delete updateAbout later
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
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

  //recoil states
  const [userDataAbout, setUserDataAbout] = useRecoilState(UserStateAtom);
  const [userDataOrgLsp, setUserDataOrgLsp] = useRecoilState(UsersOrganizationAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
  const [userOrgData, setUserOrgData] = useState(getUserOrgObject());
  const [isOrganizationSetupReady, setIsOrgnizationSetupReady] = useState(false);
  const [isAccountSetupReady, setIsAccountSetupReady] = useState(false);
  const [phCountryCode, setPhCountryCode] = useState('IN');

  // setting up local states
  useEffect(() => {
    setUserAboutData(getUserObject(userDataAbout));
    setUserOrgData(getUserOrgObject(userDataOrgLsp));
  }, [userDataAbout, userDataOrgLsp]);

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
        isPhValid &&
        userOrgData?.language.length > 0
    );
    setIsOrgnizationSetupReady(
      //   userDataAbout?.id &&
      userOrgData?.employee_id.length > 0 &&
        userOrgData?.organization_role.length > 0 &&
        userOrgData?.user_role.length > 0 &&
        userOrgData?.organization_unit.length > 0 &&
        userOrgData?.organization_name.length > 0
    );
  }, [userOrgData]);

  async function addUserLearningSpaceDetails(sub_categories = [], base_sub_category) {
    console.log(userDataOrgLsp, 'data at start of addUserLearningDetails');
    const sendLspData = {
      user_id: userDataAbout?.id,
      lsp_id: userOrgData?.lsp_id || 'Zicops Learning Space',
      status: 'Active'
    };

    console.log(sendLspData, 'addUserLearningSpaceDetails');

    let isError = false;
    const resLsp = await addLsp({ variables: sendLspData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
    });

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    //updating atom after first mutation call
    const dataLsp = resLsp?.data?.addUserLspMap[0];

    setUserDataOrgLsp((prevValue) => ({ ...prevValue, user_lsp_id: dataLsp?.user_lsp_id }));

    // ORGANIZATION DATA MUTATION

    console.log(userDataOrgLsp, 'data at start of addUserOrganizationDetails');
    const sendOrgData = {
      user_id: userDataAbout?.id,
      employee_id: userOrgData?.employee_id,

      user_lsp_id: dataLsp?.user_lsp_id,
      organization_id: userOrgData?.organization_id || 'Zicops',
      organization_role: userOrgData?.organization_role,

      is_active: userOrgData?.org_is_active || true
    };

    isError = false;
    const resOrg = await addOrg({ variables: sendOrgData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });
    });

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    const dataOrg = resOrg?.data?.addUserOrganizationMap[0];

    //updating atom after first mutation call
    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_organization_id: dataOrg?.user_organization_id
    }));

    // LANGUAGE DATA MUTATION
    console.log(userDataOrgLsp, 'data at start of addUserLanguageDetails');
    const sendLangData = {
      user_id: userDataAbout?.id,
      user_lsp_id: dataLsp?.user_lsp_id,
      language: userOrgData?.language,
      is_base_language: userOrgData?.is_base_language || true,
      is_active: userOrgData?.lang_is_active || true
    };

    console.log(sendLangData, 'addUserLanguageDetails');
    isError = false;
    const resLang = await addLanguage({ variables: sendLangData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User language Error' });
    });
    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    const dataLang = resLang?.data?.addUserLanguageMap[0];
    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_language_id: dataLang?.user_language_id
    }));

    //ORGANIZATION PREFERANCE MUTATION CALL

    console.log(userDataOrgLsp, 'data at start of addUserPreferenceDetails');
    // const sendPreferenceData = {
    //   user_id: userDataAbout?.id,
    //   user_lsp_id: dataLsp?.user_lsp_id,
    //   sub_category: sub_category,
    //   is_base: userOrgData?.is_base,
    //   is_active: userOrgData?.preferences_is_active
    // };

    const sendPreferenceData = sub_categories.map((item) => {
      let is_base = item === base_sub_category ? true : false;
      return {
        user_id: userDataAbout?.id,
        user_lsp_id: dataLsp?.user_lsp_id,
        sub_category: item,
        is_base: is_base,
        is_active: userOrgData?.preferences_is_active
      };
    });

    console.log(sendPreferenceData);

    isError = false;
    const resPref = await addPreference({ variables: { input: sendPreferenceData } }).catch(
      (err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update User Preferance Error' });
      }
    );

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    const dataPref = resPref?.data?.addUserPreference[0];
    console.log(dataPref);

    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_preference_id: dataPref?.user_preference_id,
      sub_category: dataPref?.sub_category,
      preferences_is_active: dataPref?.is_active
    }));

    // ORGANIZATION USER ROLE MUTATION
    console.log(userDataOrgLsp, 'data at start of addUserRoleDetails');
    const sendRoleData = {
      user_id: userDataAbout?.id,
      user_lsp_id: dataLsp?.user_lsp_id,
      role: userOrgData?.user_role || 'Learner',
      is_active: true
    };
    console.log(sendRoleData);

    isError = false;
    const resRole = await addRole({ variables: sendRoleData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User role Error' });
    });

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    const dataRole = resRole?.data?.addUserRoles[0];

    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      user_role: dataRole?.role,
      user_role_id: dataRole?.user_role_id
    }));

    return isError;
  }

  async function updateAboutUser(newImage = null) {
    const sendUserData = {
      id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: userAboutData?.status || 'Active',
      role: userAboutData?.role || 'Learner',
      email: userAboutData?.email,
      phone: `+${userAboutData?.phone}`,

      gender: userAboutData?.gender,
      photo_url: userAboutData?.photo_url,

      is_verified: true,
      is_active: true,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops'
    };

    if (userAboutData?.Photo) sendUserData.Photo = userAboutData?.Photo;
    if (newImage) sendUserData.Photo = newImage;
    // if (userAboutData?.photo_url) sendUserData.photo_url = userAboutData?.photo_url;

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User about Error' });
    });

    if (isError) {
      setToastMsg({ type: 'danger', message: 'Error while filling the form please try again!' });
      return router.push('/account-setup');
    }

    const data = res?.data?.updateUser;
    console.log(data);
    if (!data.photo_url.length > 0) data.photo_url = userAboutData?.photo_url;
    setUserDataAbout((prevValue) => ({ ...prevValue, ...data }));

    setTimeout(sessionStorage.setItem('loggedUser', JSON.stringify(userAboutData)), 500);

    return isError;
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
    setPhCountryCode
    // addUserOrganizationDetails,
    // addUserLanguageDetails,
    // addUserPreferenceDetails,
    // addUserRoleDetails
  };
}
