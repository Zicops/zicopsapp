import { userClient } from '@/api/UserMutations';
import {
  GET_USER_DETAIL,
  GET_USER_ORGANIZATION_DETAIL,
  GET_USER_PREFERENCES
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import UserProfile from '../../../../components/UserProfile';
import CohortAccordian from '../../../../components/UserProfile/CohortAccordian';
import CoursesAccordian from '../../../../components/UserProfile/CoursesAccordian';
import LearningDashboardAccordian from '../../../../components/UserProfile/LearningDashboardAccordian';
import styles from '../user.module.scss';

export default function UserProfilePage() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const currentUserId = router?.query?.userId;

  useEffect(async () => {
    if (!currentUserId) return;
    // const userIds = [];
    // userIds.push(currentUserId);

    const detailsRes = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: [currentUserId] },
      {},
      userClient
    );
    if (detailsRes?.error)
      return setToastMsg({ type: 'danger', message: 'User Details Load Error' });
    const userDetails = detailsRes?.getUserDetails[0];
    // console.log(userIds, userDetails, detailsRes);

    setCurrentUserData({ ...userDetails });

    const detailPref = await loadQueryDataAsync(
      GET_USER_PREFERENCES,
      { user_id: currentUserId },
      {},
      userClient
    );
    if (detailPref?.error) return setToastMsg({ type: 'danger', message: 'User Pref Load Error' });
    const userPref = detailPref?.getUserPreferences;
    if (userPref.length) setCurrentUserData((prev) => ({ ...prev, ...userPref[0] }));
    const prefArr = userPref?.filter(
      (item) => item?.user_lsp_id === userPref[0]?.user_lsp_id && item?.is_active
    );

    const base = prefArr?.filter((item) => item?.is_base);
    console.log(base);
    setCurrentUserData((prev) => ({
      ...prev,
      sub_categories: [...prefArr],
      sub_category: base[0]?.sub_category
    }));

    // console.log(currentUserData);

    const detailOrg = await loadQueryDataAsync(
      GET_USER_ORGANIZATION_DETAIL,
      { user_id: currentUserId, user_lsp_id: userPref[0]?.user_lsp_id },
      {},
      userClient
    );
    if (detailOrg?.error) return setToastMsg({ type: 'danger', message: 'User Org Load Error' });
    const userOrg = detailOrg?.getUserOrgDetails;
    // console.log(userOrg);
    if (userPref.length) setCurrentUserData((prev) => ({ ...prev, ...userOrg }));
  }, [currentUserId]);

  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title={
            <div>
              <img src="" alt="" />
              <div>
                <p>{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</p>
                {/* <p>Description</p> */}
              </div>
            </div>
          }
          //   subHeaderData={{
          //     leftBtnData: userIds.length ? btnData : [],
          //     dropdownData: {
          //       label: 'User Type:',
          //       value: userType,
          //       handleChange: (e) => setUserType(e.target.value)
          //     }
          //   }}
        />

        <MainBodyBox customStyle={{ minHeight: 'auto', maxHeight: 'none', height: 'min-content' }}>
          <UserProfile currentUserData={currentUserData} />
        </MainBodyBox>
        <div className={`${styles.accordianContainer}`}>
          <CoursesAccordian />
          <CohortAccordian />
          <LearningDashboardAccordian />
        </div>
      </MainBody>
    </>
  );
}
