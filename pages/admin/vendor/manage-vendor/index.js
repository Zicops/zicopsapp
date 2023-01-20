import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';


import MyVendor from '@/components/VendorComps/MyVendor';

export default function ManageVendor() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="Vendor List" isAddShown={true} />
        <MyVendor />
      </MainBody>
    </>
  );
}
