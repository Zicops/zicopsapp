import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors, coursesVendor } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import VendorMaster from '@/components/VendorComps/AddVendor/VendorMaster';
import AddVendorServices from '@/components/VendorComps/AddVendor/AddVendorServices';
import AddVendorCourses from '@/components/VendorComps/AddVendor/AddVendorCourses';
import AddVendorProfile from '@/components/VendorComps/AddVendorProfile';
import ProfileManageVendor from '@/components/VendorComps/ProfileMangeVendor';
import VendorOrders from '@/components/VendorComps/VendorOrders';
import styles from './manageVendor.module.scss';
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
      component: <ProfileManageVendor />
    },
    {
      name: 'Courses',
      component: <AddVendorCourses />
    },
    {
      name: 'Orders',
      component: <VendorOrders />
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
      <div className={`${styles.manageVendorBody}`}>
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false
          }}
          customStyles={{ height: '100%' }}
        />
        <div className={`${styles.manageVendorButton}`}>
          <button>View Page</button>
          <button>Update Vendor</button>
          <button className={`${styles.cancelButton}`}>Cancel</button>
        </div>
      </div>
    </>
  );
}
