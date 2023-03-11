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
import VendorUsers from '@/components/VendorComps/VendorUsers';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useState } from 'react';
import useHandleVendorMaster from '@/components/VendorComps/Logic/useHandleVendorMaster';
import useHandleVendorServices from '@/components/VendorComps/Logic/useHandleVendorServices';
import ManageVendorTabs from '@/components/VendorComps/ManageVendorTabs';

export default function VendorInfo() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="Add Vendor" />

        <MainBodyBox>
          <ManageVendorTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
