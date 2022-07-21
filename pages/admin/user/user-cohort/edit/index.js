import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import { userSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import Sidebar from '@/components/common/Sidebar';

const UserCohort = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title="User Cohorts Edit"
          isAddShown={true}
          pageRoute="/admin/users/user-cohort/edit"
        />
        <MainBodyBox>
          {/* <MyUser getUser={(list) => setUserIds(list)} /> */}
          <ChortMasterTab />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default UserCohort;
