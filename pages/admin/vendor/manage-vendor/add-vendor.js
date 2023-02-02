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
import AdminHeader from '@/components/common/AdminHeader';
import MainBodyBox from '@/components/common/MainBodyBox';
import MainBody from '@/components/common/MainBody';
import Button from '@/common/Button';

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
      <MainBody>
        <AdminHeader title="Add Vendor" />

        <MainBodyBox>
          <TabContainer
            tabData={tabData}
            tab={tab}
            setTab={setTab}
            footerObj={{
              showFooter: true,
              status: 'DRAFT'
            }}
            customStyles={['Courses', 'Orders'].includes(tab) ? { padding: '0px' } : {}}>
            <div className={`${styles.previewButtonContainer}`}>
              <Button
                clickHandler={async () => {
                  await saveCourseData(false, 0, false);
                  router.push(`/preview?courseId=${fullCourse.id}`);
                }}
                text="View Page"
              />
            </div>
          </TabContainer>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
