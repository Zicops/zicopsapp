import AssignedCourses from '../../../components/AssignedCourses';
import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { userSideBarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import Accordian from '../../../components/UserProfile/Accordian';
import CoursesCard from '../../../components/UserProfile/CoursesCard';
import UserProfile from '../../../components/UserProfile';
import CoursesAccordian from '../../../components/UserProfile/CoursesAccordian';
import CohortAccordian from '../../../components/UserProfile/CohortAccordian';
import LearningDashboardAccordian from '../../../components/UserProfile/LearningDashboardAccordian';

export default function User() {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title="Profile" pageRoute="/admin/user" isAddShown={true} />
        <MainBodyBox customClass={`a`}>
          <UserProfile />
        </MainBodyBox>

        <MainBodyBox customStyle={{ padding: '20px' }}>
          <CoursesAccordian />
          <CohortAccordian />
          <LearningDashboardAccordian />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
