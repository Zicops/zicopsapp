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
import VendorOrders from '@/components/VendorComps/VendorOrders';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import ReviewAndTaxConfirm from '@/components/VendorComps/ReviewAndTaxConfirm';

export default function ViewOrderInfo() {
  const [viewOrder, setViewOrder] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const { getSingleVendorInfo } = useHandleVendor();
  const { orderDetails, getAllOrders, getOrderServices, getVendorServices } = useHandleMarketYard();

  const router = useRouter();
  const orderId = router.query.orderId || null;
  const orderInfo = orderDetails?.filter((data) => data?.id === orderId);

  // useEffect(async () => {
  //   const lspId = sessionStorage?.getItem('lsp_id');
  //   await getAllOrders(lspId);
  //   await getOrderServices(orderInfo[0]?.id);
  //   await getSingleVendorInfo(orderInfo[0]?.vendor_id);
  //   await getVendorServices(orderInfo[0]?.vendor_id);
  // }, [orderInfo[0]?.vendor_id, orderInfo[0]?.id]);

  // useEffect(() => {
  //   if (allServicesData?.length) {
  //     allServicesData?.map((data) => {
  //       if (data?.service_type === VENDOR_SERVICES_TYPE?.sme?.type) {
  //         setSelectedServicesForOrder({ ...selectedServicesForOrder, sme: true });
  //       }
  //       if (data?.service_type === VENDOR_SERVICES_TYPE?.crt?.type) {
  //         setSelectedServicesForOrder({ ...selectedServicesForOrder, crt: true });
  //       }
  //       if (data?.service_type === VENDOR_SERVICES_TYPE?.cd?.type) {
  //         setSelectedServicesForOrder({ ...selectedServicesForOrder, cd: true });
  //       }
  //     });
  //   }
  // }, [allServicesData]);
  const confirmOrderHandler = async () => {
    setCurrentComponent(currentComponent + 1);

    if (currentComponent === 2) {
      // setAddRate(false);
      // setCompleteOrder(true);
      // const orderDetails = await addUpdateOrder();
      // setOrderData(orderDetails);
      // await addUpdateOrderServices(orderDetails?.id);
      setViewOrder(false);
      router.push(`/admin/vendor/orders`);
    }
  };
  const rejectOrderHandler = async () => {
    setViewOrder(false);
    router.push(`/admin/vendor/orders`);
  };

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="My orders" isAddShown={true} isProductTooltip={false} />
        <VendorPopUp
          open={viewOrder}
          popUpState={[viewOrder, setViewOrder]}
          title="View Order"
          size="large"
          closeBtn={{ name: 'Reject', handleClick: rejectOrderHandler }}
          isCloseButton={currentComponent === 0}
          submitBtn={{
            name: currentComponent === 0 ? 'Confirm' : 'OK',
            handleClick: confirmOrderHandler
          }}>
          {currentComponent === 0 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Added"
              setCurrentComponent={setCurrentComponent}
            />
          )}
          {currentComponent === 1 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Confirmed"
              setCurrentComponent={setCurrentComponent}
            />
          )}
          {currentComponent === 2 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Completed"
              setCurrentComponent={setCurrentComponent}
            />
          )}
        </VendorPopUp>
      </MainBody>
    </>
  );
}
