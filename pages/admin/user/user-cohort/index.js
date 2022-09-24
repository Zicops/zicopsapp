import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import { userSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';

import Sidebar from '@/components/common/Sidebar';
import UserCohorts from '@/components/UserComps/UserCohorts';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';

const UserCohort = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title="User Cohorts"
          isAddShown={true}
          pageRoute="/admin/users/user-cohort"
          tooltipTitle={ADMIN_USERS.userCohort.addBtn}
        />
        <MainBodyBox>
          <UserCohorts />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default UserCohort;
