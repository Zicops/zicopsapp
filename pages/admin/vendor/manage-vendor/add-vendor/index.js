import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import AddVendorCourses from '@/components/VendorComps/AddVendor/AddVendorCourses';
import AddVendorServices from '@/components/VendorComps/AddVendor/AddVendorServices';
import VendorMaster from '@/components/VendorComps/AddVendor/VendorMaster';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import ProfileManageVendor from '@/components/VendorComps/ProfileMangeVendor';
import VendorOrders from '@/components/VendorComps/VendorOrders';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useState } from 'react';

export default function VendorInfo() {
  const { addUpdateVendor } = useHandleVendor();
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
              handleSubmit: () => {
                addUpdateVendor();
              },
              status: VENDOR_MASTER_STATUS.draft.toUpperCase()
            }}
            customStyles={
              ['Courses', 'Orders'].includes(tab) ? { padding: '0px' } : {}
            }></TabContainer>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
