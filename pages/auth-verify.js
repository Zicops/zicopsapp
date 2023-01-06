// pages\auth-verify.js

import { userClient, USER_LOGIN } from '@/api/UserMutations';
import { GET_LSP_DETAILS } from '@/api/UserQueries';
import Loader from '@/components/common/Loader';
import { GIBBERISH_VALUE_FOR_LOGIN_STATE, USER_STATUS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserObject, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

let timer = null;
export default function AuthVerify() {
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [userOrg, setUserOrg] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const token = router.query?.token || null;
  const lspId = router.query?.lspId || null;
  const userLspId = router.query?.userLspId || null;
  const role = router.query?.role || 'learner';

  useEffect(() => {
    if (!token) return;
    if (!lspId) return;

    timer = setTimeout(loginFailed, 3000);

    loginUserInSubDomain(token, lspId)
      .then((res) => {
        clearTimeout(timer);
        if (!res) return loginFailed();

        setUserProfileData(getUserObject(res?.userDetails));
        setUserOrg((prevValue) => ({
          ...prevValue,
          lsp_id: lspId,
          logo_url: res?.lspDetails?.logo_url
        }));

        window.location.href = '/';
      })
      .catch((err) => {
        console.error('Error', err);
        clearTimeout(timer);
        loginFailed();
      });

    return () => clearTimeout(timer);
  }, [token, lspId]);

  function loginFailed() {
    setToastMsg({ type: 'danger', message: 'Something went wrong! Please Login Again' });
    router.push('/login');
  }

  async function loginUserInSubDomain(token, lspId) {
    if (!token) throw 'No Token Found';
    if (!lspId) throw 'No lspId Found';

    let isError = false;
    const userLoginDataRes = await userClient
      .mutate({
        mutation: USER_LOGIN,
        variables: {},
        context: { headers: { Authorization: `Bearer ${token}` } }
      })
      .catch((err) => {
        console.error(`Login User error:`, err);
        isError = !!err;
      });

    const lspDataRes = await userClient
      .query({
        query: GET_LSP_DETAILS,
        variables: { lsp_ids: [lspId] },
        context: { headers: { Authorization: `Bearer ${token}`, tenant: lspId } }
      })
      .catch((err) => {
        console.error(`Login User error:`, err);
        isError = !!err;
      });

    const userDetails = userLoginDataRes?.data?.login || {};
    const lspDetails = lspDataRes?.data?.getLearningSpaceDetails?.[0] || {};

    if (isError || userDetails?.status === USER_STATUS.disable) return;

    const userSessionData = { userDetails, lspDetails };

    const lspData = userSessionData?.lspDetails;
    localStorage.setItem(GIBBERISH_VALUE_FOR_LOGIN_STATE, GIBBERISH_VALUE_FOR_LOGIN_STATE);

    sessionStorage.setItem('tokenF', token);
    sessionStorage.setItem('loggedUser', JSON.stringify(userSessionData?.userDetails));
    sessionStorage.setItem('lsp_id', lspId);

    sessionStorage.setItem('lsp_name', lspData?.name);
    sessionStorage.setItem('org_id', lspData?.org_id);
    sessionStorage.setItem('ou_id', lspData?.ou_id);
    sessionStorage.setItem('user_lsp_id', userLspId);
    sessionStorage.setItem('user_lsp_role', role);

    return userSessionData;
  }

  return (
    <div>
      <Loader />
    </div>
  );
}
