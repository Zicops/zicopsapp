import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ViewOrder from '@/components/VendorComps/ViewOrder';

export default function ViewOrderInfo() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="My orders" isAddShown={true} isProductTooltip={false} />
        <MainBodyBox>
          <ViewOrder />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
