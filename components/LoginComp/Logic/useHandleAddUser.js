import {
  ADD_USER_LANGUAGE_MAP,
  ADD_USER_LEARNINGSPACE_MAP,
  ADD_USER_ORGANIZATION_MAP,
  ADD_USER_PREFERENCE,
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
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleAddUserDetails() {
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

  //recoil states
  const userDataAbout = useRecoilValue(UserStateAtom);
  const [userDataOrgLsp, setUserDataOrgLsp] = useRecoilState(UsersOrganizationAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
  const [userOrgData, setUserOrgData] = useState(getUserOrgObject());
  const [isOrganizationSetupReady, setIsOrgnizationSetupReady] = useState(false);
  const [isAccountSetupReady, setIsAccountSetupReady] = useState(false);

  // setting up local states
  useEffect(() => {
    setUserAboutData(getUserObject(userDataAbout));
    setUserOrgData(getUserOrgObject(userDataOrgLsp));
  }, [userDataAbout, userDataOrgLsp]);

  useEffect(() => {
    setIsAccountSetupReady(
      userAboutData?.first_name.length > 0 &&
        userAboutData?.last_name.length > 0 &&
        userAboutData?.phone.length > 0 &&
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

  async function addUserLearningSpaceDetails() {
    const sendLspData = {
      user_id: userDataAbout?.id,
      lsp_id: userOrgData?.lsp_id || 'Zicops Learning Space',
      status: 'Active'
    };

    console.log(sendLspData, 'addUserLearningSpaceDetails');

    let isError = false;
    const res = await addLsp({ variables: sendLspData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
    });

    //updating atom after first mutation call
    const data = res?.data?.addUserLspMap[0];
    console.log(data);
    setUserDataOrgLsp((prevValue) => ({ ...prevValue, user_lsp_id: data?.user_lsp_id }));

    const sendLangData = {
      user_id: userDataAbout?.id,
      user_lsp_id: data?.user_lsp_id,
      language: userOrgData?.language,
      is_base_language: userOrgData?.is_base_language || true,
      is_active: userOrgData?.lang_is_active || true
    };

    console.log(sendLangData, 'addUserLanguageDetails');
    isError = false;
    const res2 = await addLanguage({ variables: sendLangData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User language Error' });
    });
    const data2 = res2?.data?.addUserLanguageMap[0];
    console.log(data2);
    setUserDataOrgLsp((prevValue) => ({
      ...prevValue,
      ...data2
    }));
    console.log(userDataOrgLsp);
  }

  async function addUserOrganizationDetails() {
    const sendOrgData = {
      user_id: userDataAbout?.id,
      employee_id: userOrgData?.employee_id,

      user_lsp_id: userOrgData?.user_lsp_id,
      organization_id: userOrgData?.organization_id || 'Zicops',
      organization_role: userOrgData?.organization_role,

      is_active: userOrgData?.org_is_active || true
    };

    console.log(sendOrgData, 'addUserOrganizationDetails');

    let isError = false;
    const res = await addOrg({ variables: sendOrgData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });
    });

    //updating atom after first mutation call
    setUserDataOrgLsp(
      getUserOrgObject({
        ...res?.data?.addUserOrganizationMap,
        org_is_active: res?.data?.addUserOrganizationMap?.is_active
      })
    );

    console.log(res, userDataOrgLsp);
  }

  async function updateAboutUser() {
    const sendUserData = {
      id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: userAboutData?.status,
      role: userAboutData?.role || 'Learner',
      email: userAboutData?.email,
      phone: userAboutData?.phone,
      photo_url: userAboutData?.photo_url || null,
      Photo: userAboutData?.photo || null,
      gender: userAboutData?.gender,

      is_verified: true,
      is_active: true,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops'
    };

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User about Error' });
    });

    console.log(res);
  }

  //   async function addUserLanguageDetails() {
  //     const sendLangData = {
  //       user_id: userDataAbout?.id,
  //       user_lsp_id: userOrgData?.user_lsp_id,
  //       language: userOrgData?.language,
  //       is_base_language: userOrgData?.is_base_language || true,
  //       is_active: userOrgData?.lang_is_active || true
  //     };

  //     console.log(sendLangData, 'addUserLanguageDetails');
  //     let isError = false;
  //     const res = await addLanguage({ variables: sendLangData }).catch((err) => {
  //       console.log(err);
  //       isError = !!err;
  //       return setToastMsg({ type: 'danger', message: 'Update User language Error' });
  //     });

  //     const data2 = res?.data;
  //     console.log(data2);
  //     setUserDataOrgLsp({
  //       ...data2
  //     });
  //     console.log(res, userDataOrgLsp);
  //   }

  async function addUserPreferenceDetails() {
    const sendPreferenceData = {
      user_id: userDataAbout?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      sub_category: userOrgData?.sub_category,
      is_base: userOrgData?.is_base,
      is_active: userOrgData?.preferences_is_active
    };

    console.log(sendLangData, 'addUserLanguageDetails');
    let isError = false;
    const res = await addPreference({ variables: sendPreferenceData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Preferance Error' });
    });

    setUserDataOrgLsp(
      getUserOrgObject({
        ...res?.data?.addUserPreference,
        preferences_is_active: res?.data?.addUserPreference?.is_active
      })
    );
    console.log(res, userDataOrgLsp);
  }

  return {
    updateAboutUser,
    addUserOrganizationDetails,
    isOrganizationSetupReady,
    addUserLearningSpaceDetails,

    isAccountSetupReady,
    addUserPreferenceDetails
  };
}
