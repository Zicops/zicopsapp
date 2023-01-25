import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors, coursesVendor } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState } from 'react';
import AboutVendor from '@/components/VendorComps/AboutVendor';
import { useRouter } from 'next/router';
import CoursesVendor from '@/components/VendorComps/CoursesVendor';
import ProfileVendor from '@/components/VendorComps/ProfileVendor';

export default function VendorInfo() {
  const router = useRouter();
  const vendorId = router.query.vendorId || '0'; //Change the 0 to null

  const tabData = [
    {
      name: 'About',
      component: <AboutVendor data={myVendors[vendorId]} />
    },
    {
      name: 'Courses',
      component: <CoursesVendor coursesData={coursesVendor[vendorId]} />
    },
    {
      name: 'Profile',
      component: <ProfileVendor />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <div style={{ height: '30vh', marginTop: '70px' }}>Frame in Progress</div>

      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          showFooter: false
        }}
        customStyles={{ height: '100%' }}
      />
    </>
  );
}
