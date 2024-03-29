import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import { userSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import { useState } from 'react';
import ChortMasterTab from '@/components/UserComps/UserCohorts/ChortMasterTab';
import Sidebar from '@/components/common/Sidebar';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CohortMasterData } from '@/state/atoms/users.atom';

const UserCohort = () => {
  const router = useRouter();
  const [cohortData , setCohortData] = useRecoilState(CohortMasterData);
  //get course details right here
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title={cohortData?.cohort_name?`${cohortData?.cohort_name}`:''} isAddShown={false} />
        <MainBodyBox>
          {/* <MyUser getUser={(list) => setUserIds(list)} /> */}
          <ChortMasterTab isEdit={true} />
          {/* <UserCohorts /> */}
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default UserCohort;
