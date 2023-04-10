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
import { AllServicesAtom, ServicesAtom, VendorServicesListAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';

export default function EditOrderInfo() {
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const { getSingleVendorInfo } = useHandleVendor();
  const {
    orderDetails,
    services,
    getAllOrders,
    getOrderServices,
    getVendorServices,
    addUpdateOrderServices,
    getOrders,
    addUpdateOrder
  } = useHandleMarketYard();

  const router = useRouter();
  const orderId = router.query.orderId || null;
  const orderInfo = orderDetails?.filter((data) => data?.id === orderId);
  let sme = false;
  let crt = false;
  let cd = false;
  let smeArr = [];
  let crtArr = [];
  let cdArr = [];

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
    await getOrderServices(orderInfo[0]?.id);
    await getSingleVendorInfo(orderInfo[0]?.vendor_id);
    await getVendorServices(orderInfo[0]?.vendor_id);
    await getOrders(orderId);
  }, [orderInfo[0]?.vendor_id, orderInfo[0]?.id]);

  useEffect(() => {
    if (allServicesData?.length) {
      allServicesData?.map((data) => {
        if (data?.service_type === VENDOR_SERVICES_TYPE?.sme.type) {
          sme = true;
          smeArr?.push({ ...data, isActive: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.crt?.type) {
          crt = true;
          crtArr?.push({ ...data, isActive: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.cd?.type) {
          cd = true;
          cdArr?.push({ ...data, isActive: true });
        }
      });
      setSelectedServicesForOrder({ ...selectedServicesForOrder, sme: sme, crt: crt, cd: cd });
      setServicesData({ ...servicesData, sme: smeArr, crt: crtArr, cd: cdArr });
    }
  }, [allServicesData]);

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
              submitDisplay: 'Update',
              cancelDisplay: 'Cancel',
              handleSubmit: async () => {
                await addUpdateOrderServices(orderId);
                await addUpdateOrder(orderInfo[0]?.vendor_id, orderId);
              },
              status: orderInfo[0]?.status.toUpperCase()
            }}
          />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
