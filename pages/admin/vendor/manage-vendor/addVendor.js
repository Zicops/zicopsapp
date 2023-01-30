import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors, coursesVendor } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import VendorMaster from '@/components/VendorComps/AddVendor/VendorMaster';
import AddVendorServices from '@/components/VendorComps/AddVendor/AddVendorServices';
import AddVendorProfile from '@/components/VendorComps/AddVendorProfile';

export default function VendorInfo() {
  const router = useRouter();
  const vendorId = router.query.vendorId || '0'; //Change the 0 to null

  const tabData = [
    {
      name: 'Master',
      component: <VendorMaster />
    },
    {
      name: 'Services',
      component: <AddVendorServices />
    },
    {
      name: 'Profiles',
      component: <AddVendorProfile />
    },
    {
      name: 'Courses',
      component: <div></div>
    },
    {
      name: 'Orders',
      component: <div></div>
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <div style={{ height: '10vh', marginTop: '70px' }}>
        <p style={{ color: 'white', marginTop: '70px', fontSize: '30px' }}>
          Add Vendor . Organisation
        </p>
      </div>
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
