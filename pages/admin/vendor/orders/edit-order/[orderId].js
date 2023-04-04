import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { VENDOR_MASTER_STATUS, VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import OrderMaster from '@/components/VendorComps/EditOrder/OrderMaster';
import OrderDetails from '@/components/VendorComps/EditOrder/OrderDetails';
import useHandleMarketYard from '@/components/VendorComps/Logic/useHandleMarketYard';
import { useRouter } from 'next/router';
import { AllServicesAtom, VendorServicesListAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';

export default function VendorInfo() {
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const { getSingleVendorInfo } = useHandleVendor();
  const {
    orderDetails,
    services,
    servicesDetails,
    getAllOrders,
    getOrderServices,
    getVendorServices
  } = useHandleMarketYard();

  const router = useRouter();
  const orderId = router.query.orderId || null;
  const orderInfo = orderDetails?.filter((data) => data?.id === orderId);

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
    await getOrderServices(orderInfo[0]?.id);
    await getSingleVendorInfo(orderInfo[0]?.vendor_id);
    await getVendorServices(orderInfo[0]?.vendor_id);
  }, [orderInfo[0]?.vendor_id, orderInfo[0]?.id]);

  useEffect(() => {
    if (allServicesData?.length) {
      allServicesData?.map((data) => {
        if (data?.service_type === VENDOR_SERVICES_TYPE?.sme?.type) {
          setSelectedServicesForOrder({ ...selectedServicesForOrder, sme: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.crt?.type) {
          setSelectedServicesForOrder({ ...selectedServicesForOrder, crt: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.cd?.type) {
          setSelectedServicesForOrder({ ...selectedServicesForOrder, cd: true });
        }
      });
    }
  }, [allServicesData]);

  console.info('selectedServicesForOrder', selectedServicesForOrder);
  const tabData = [
    {
      name: 'Master',
      component: <OrderMaster orderData={orderInfo[0]} services={services} />
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
