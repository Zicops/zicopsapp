import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import VendorOrders from '@/components/VendorComps/VendorOrders';

const Orders = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="My orders" isAddShown={true} isProductTooltip={false} />
        <MainBodyBox>
          <VendorOrders />
        </MainBodyBox>
      </MainBody>
    </div>
  );
};

export default Orders;
