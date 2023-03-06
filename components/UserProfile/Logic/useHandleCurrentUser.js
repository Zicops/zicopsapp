import {
    GET_USER_DETAIL,
    GET_USER_LEARNINGSPACES_DETAILS,
    GET_USER_ORGANIZATION_DETAIL,
    GET_USER_PREFERENCES,
    userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleCurrentUser() {
  const [isLoading, setIsLoading] = useState(false);
  const adminData = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const { getUserLspRoleLatest } = useUserCourseData();
  const [currentUserDetails, setCurrentUserDetails] = useState(null);

  async function loadCurrentUserData(userId = null) {
    if (!userId) return {};
    const _lspId = sessionStorage?.getItem('lsp_id');
    const lspId = _lspId ? _lspId : adminData?.lsp_id;
    const currentUserId = userId;

    if (!lspId) return {};

    const detailsRes = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: [currentUserId] },
      {},
      userQueryClient
    );
    if (detailsRes?.error)
      return setToastMsg({ type: 'danger', message: 'User Details Load Error' });

    //user basic info
    const userDetails = detailsRes?.getUserDetails?.[0];

    // loading user lspMap info
    const userLearningSpaceData = await loadQueryDataAsync(
      GET_USER_LEARNINGSPACES_DETAILS,
      { user_id: currentUserId, lsp_id: lspId },
      {},
      userQueryClient
    );
    if (userLearningSpaceData?.error)
      return setToastMsg({ type: 'danger', message: 'User Load Error' });

    const user_lsp_id = userLearningSpaceData?.getUserLspByLspId?.user_lsp_id;

    if (!user_lsp_id) return { ...userDetails, isLspDataPresent: false };

    // getting user role in the particular lsp
    const role = await getUserLspRoleLatest(currentUserId, user_lsp_id);

    // getting user org details
    const detailOrg = await loadQueryDataAsync(
      GET_USER_ORGANIZATION_DETAIL,
      { user_id: currentUserId, user_lsp_id: user_lsp_id },
      {},
      userQueryClient
    );
    if (detailOrg?.error) return setToastMsg({ type: 'danger', message: 'User Org Load Error' });
    const userOrg = detailOrg?.getUserOrgDetails;


    // get users preferences in that particular lsp
    const detailPref = await loadQueryDataAsync(
      GET_USER_PREFERENCES,
      { user_id: currentUserId },
      {},
      userQueryClient
    );
    if (detailPref?.error) return setToastMsg({ type: 'danger', message: 'User Pref Load Error' });
    const userPref = detailPref?.getUserPreferences;
    const prefArr = userPref?.filter(
      (item) => item?.user_lsp_id === user_lsp_id && item?.is_active
    );

    const base = prefArr?.filter((item) => item?.is_base);

    const orgData = !!userOrg ? userOrg : {};
    setCurrentUserDetails({
      ...userDetails,
      ...orgData,
      userLspId: user_lsp_id,
      role: role,
      sub_categories: [...prefArr],
      sub_category: base?.[0]?.sub_category
    });
  }

  return { loadCurrentUserData, isLoading , currentUserDetails , setCurrentUserDetails };
}
