import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';

export default function ManageVendor() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />

      <div>
        <p>Manage Vendor</p>
      </div>
    </>
  );
}
