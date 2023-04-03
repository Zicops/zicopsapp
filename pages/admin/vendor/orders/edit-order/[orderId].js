import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import OrderMaster from '@/components/VendorComps/EditOrder/OrderMaster';
import OrderDetails from '@/components/VendorComps/EditOrder/OrderDetails';
import useHandleMarketYard from '@/components/VendorComps/Logic/useHandleMarketYard';
import { useRouter } from 'next/router';

export default function VendorInfo() {
  const { getSingleVendorInfo } = useHandleVendor();
  const { orderDetails, servicesDetails, getAllOrders, getOrderServices } = useHandleMarketYard();

  const router = useRouter();
  const orderId = router.query.orderId || null;
  const vendorInfo = orderDetails?.filter((data) => data?.id === orderId);
  console.info(vendorInfo);
  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
    await getOrderServices(vendorInfo?.id);
  }, []);
  useEffect(() => {
    getSingleVendorInfo(vendorInfo?.vendor_id);
  }, []);
  const tabData = [
    {
      name: 'Master',
      component: <OrderMaster orderData={orderDetails} serviceData={servicesDetails} />
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
