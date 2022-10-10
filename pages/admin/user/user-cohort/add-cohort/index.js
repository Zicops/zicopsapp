import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import { userSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';

import Sidebar from '@/components/common/Sidebar';
import ChortMasterTab from '@/components/UserComps/UserCohorts/ChortMasterTab';

const AddCohort = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title="Add New Cohort" />
        <MainBodyBox>
          <ChortMasterTab />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default AddCohort;
