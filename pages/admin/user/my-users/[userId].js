import useHandleCurrentUser from '@/components/UserProfile/Logic/useHandleCurrentUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

  const { loadCurrentUserData, currentUserDetails, setCurrentUserDetails } = useHandleCurrentUser();

  const router = useRouter();
  const currentUserId = router?.query?.userId;

  useEffect(() => {
    if (!currentUserId) return;
    loadCurrentUserData(currentUserId);
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
                <p>
                  {!currentUserDetails
                    ? ''
                    : `${currentUserDetails?.first_name} ${currentUserDetails?.last_name}`}
                </p>
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
          <UserProfile
            currentUserData={currentUserDetails}
            setCurrentUserData={setCurrentUserDetails}
          />
        </MainBodyBox>
        <div className={`${styles.accordianContainer}`}>
          <CoursesAccordian currentUserData={currentUserDetails} />
          <CohortAccordian currentUserData={currentUserDetails} />
          <LearningDashboardAccordian />
        </div>
      </MainBody>
    </>
  );
}
