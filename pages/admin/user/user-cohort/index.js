import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import { userSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import { useState } from 'react';
import ChortMasterTab from '@/components/UserComps/UserCohorts/ChortMasterTab';
import Sidebar from '@/components/common/Sidebar';
import UserCohorts from '@/components/UserComps/UserCohorts';

const UserCohort = () => {
  const [userIds, setUserIds] = useState([]);
  const [userType, setUserType] = useState('Internal');
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title="User Cohorts" isAddShown={true} pageRoute="/admin/users/user-cohort" />
        <MainBodyBox>
          {/* <MyUser getUser={(list) => setUserIds(list)} /> */}
          {/* <ChortMasterTab /> */}
          <UserCohorts />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default UserCohort;
