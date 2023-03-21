import MainBody from '@/components/common/MainBody';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '@/components/common/TabContainer';
import AboutProfile from '@/components/VendorComps/AboutProfile';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import ProfileMarketYardHero from '@/components/VendorComps/ProfileMarketYardHero';
import { allProfileAtom } from '@/state/atoms/vendor.atoms';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ProfileExperience from '@/components/VendorComps/ProfileExperience';

const ViewProfile = () => {
  const vendorProfiles = useRecoilValue(allProfileAtom);

  const { getAllProfileInfo } = useHandleVendor();

  useEffect(() => {
    if (!vendorProfiles?.length) getAllProfileInfo();
  }, [vendorProfiles?.length]);

  const tabData = [
    {
      name: 'About',
      component: <AboutProfile />
    },
    {
      name: 'Experience',
      component: <ProfileExperience />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <div>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ padding: '0px' }}>
        <ProfileMarketYardHero />
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false
          }}
          customStyles={{ height: 'fit-content', overflow: 'unset' }}
        />
      </MainBody>
    </div>
  );
};

export default ViewProfile;
