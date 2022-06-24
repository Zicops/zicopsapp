import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { userSideBarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import UserProfile from '../../../components/UserProfile';
import CohortAccordian from '../../../components/UserProfile/CohortAccordian';
import CoursesAccordian from '../../../components/UserProfile/CoursesAccordian';
import LearningDashboardAccordian from '../../../components/UserProfile/LearningDashboardAccordian';
import styles from './user.module.scss';

export default function User() {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title="Profile" pageRoute="/admin/user" isAddShown={true} />
        <MainBodyBox>
          <UserProfile />
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
