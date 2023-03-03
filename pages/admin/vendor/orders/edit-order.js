import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import ProfileManageVendor from '@/components/VendorComps/ProfileMangeVendor';
import VendorOrders from '@/components/VendorComps/VendorOrders';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useState } from 'react';
import OrderMaster from '@/components/VendorComps/EditOrder/OrderMaster';
import OrderDetails from '@/components/VendorComps/EditOrder/OrderDetails';

export default function VendorInfo() {
  const { addUpdateVendor } = useHandleVendor();
  const tabData = [
    {
      name: 'Master',
      component: <OrderMaster />
    },
    {
      name: 'Order Details',
      component: <OrderDetails />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="Edit Order" />

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
          />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
