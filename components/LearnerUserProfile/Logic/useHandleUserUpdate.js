import {
  UPDATE_USER,
  UPDATE_USER_LEARNINGSPACE_MAP,
  UPDATE_USER_ORGANIZATION_MAP,
  UPDATE_USER_ROLE,
  userClient
} from '@/api/UserMutations';
import {
  getUserObject,
  getUserOrgObject,
  UsersOrganizationAtom,
  UserStateAtom
} from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';

export default function useHandleUserUpdate() {
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
    client: userClient
  });

  const [updateOrg, { error: createOrgError }] = useMutation(UPDATE_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  const [updateLsp, { error: createLspError }] = useMutation(UPDATE_USER_LEARNINGSPACE_MAP, {
    client: userClient
  });

  const [updateRole, { error: createRoleError }] = useMutation(UPDATE_USER_ROLE, {
    client: userClient
  });

  //recoil states
  const userDataAbout = useRecoilValue(UserStateAtom);
  const [userDataOrgLsp, setUserDataOrgLsp] = useRecoilState(UsersOrganizationAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
  const [userOrgData, setUserOrgData] = useState(getUserOrgObject());

  useEffect(() => {
    setUserAboutData(getUserObject(userDataAbout));
    setUserOrgData(getUserOrgObject(userDataOrgLsp));
  }, [userDataAbout, userDataOrgLsp]);

  async function updateUserLearningSpaceDetails() {
    const sendLspData = {
      user_id: userDataAbout?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      lsp_id: userOrgData?.lsp_id || 'Zicops Learning Space',
      status: 'Active'
    };

    console.log(sendLspData, 'addUserLearningSpaceDetails');

    let isError = false;
    const res = await updateLsp({ variables: sendLspData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
    });

    //updating atom after first mutation call
    const data = res?.data?.addUserLspMap[0];

    setUserDataOrgLsp((prevValue) => ({ ...prevValue, ...data }));
  }

  async function updateUserOrganizationDetails() {
    const sendOrgData = {
      user_id: userDataAbout?.id,
      employee_id: userOrgData?.employee_id,

      user_organization_id: userOrgData?.user_organization_id,
      user_lsp_id: userOrgData?.user_lsp_id,
      organization_id: userOrgData?.organization_id || 'Zicops',
      organization_role: userOrgData?.organization_role,

      is_active: userOrgData?.org_is_active || true
    };

    let isError = false;
    const res = await updateOrg({ variables: sendOrgData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });
    });

    //updating atom after first mutation call
    const data = res?.data?.updateUserOrganizationMap[0];
    setUserDataOrgLsp((prevValue) => ({ ...prevValue, ...data }));

    setTimeout(sessionStorage.setItem('userAccountSetupData', JSON.stringify(userOrgData)), 200);

    console.log(res, userDataOrgLsp);
  }

  async function updateAboutUser(newImage = null) {
    const sendData = {
      id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: userAboutData?.status || 'Active',
      role: userAboutData?.role || 'Learner',
      email: userAboutData?.email,
      phone: userAboutData?.phone,

      gender: userAboutData?.gender,
      photo_url: userAboutData?.photo_url,

      is_verified: true,
      is_active: true,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops'
    };

    if (newImage) sendData.Photo = newImage;

    let isError = false;
    const res = await updateAbout({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Error' });
    });

    console.log(res);
  }

  return { updateAboutUser, updateUserLearningSpaceDetails, updateUserOrganizationDetails };
}
