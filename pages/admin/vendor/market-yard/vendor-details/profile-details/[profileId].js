import ViewVendorProfile from '@/components/VendorComps/ViewVendorProfile';
import React from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MainBody from '@/components/common/MainBody';
import { allProfileAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';

const ViewProfile = () => {
  const router = useRouter();
  const profileId = router.query.profileId || null;
  const vendorProfiles = useRecoilValue(allProfileAtom);
  const viewProfileData = vendorProfiles?.filter((data) => data?.pf_id === profileId);
  return (
    <div>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <ViewVendorProfile data={viewProfileData[0]} />
      </MainBody>
    </div>
  );
};

export default ViewProfile;
