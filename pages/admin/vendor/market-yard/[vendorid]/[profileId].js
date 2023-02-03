import ViewVendorProfile from '@/components/VendorComps/ViewVendorProfile';
import React from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MainBody from '@/components/common/MainBody';
import { vendorProfiles } from '@/components/VendorComps/Logic/vendorComps.helper';
const ViewProfile = () => {
  const router = useRouter();
  const profileId = router.query.profileId || '0';
  const viewProfileData = vendorProfiles?.filter((data) => data?.id === profileId);
  return (
    <div>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <ViewVendorProfile data={viewProfileData} />
      </MainBody>
    </div>
  );
};

export default ViewProfile;
