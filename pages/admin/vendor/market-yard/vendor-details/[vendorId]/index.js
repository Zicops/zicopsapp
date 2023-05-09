import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '@/common/TabContainer';
import { useState, useEffect } from 'react';
import AboutVendor from '@/components/VendorComps/AboutVendor';
import { useRouter } from 'next/router';
import CoursesVendor from '@/components/VendorComps/CoursesVendor';
import MarketYardHero from '@/components/VendorComps/MarketYardHero';
import MainBody from '@/components/common/MainBody';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import CompleteOrder from '@/components/VendorComps/CompleteOrder';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import ProfileVendor from '@/components/VendorComps/ProfileVendor';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allProfileAtom,
  ServicesAtom,
  VendorProfileAtom,
  VendorStateAtom,
  VendorServicesListAtom,
  getVendorServicesObject,
  getServicesObject,
  getVendorServicesList,
  OrderAtom,
  getVendorOrderObject,
} from '@/state/atoms/vendor.atoms';
import useHandleMarketYard from '@/components/VendorComps/Logic/useHandleMarketYard';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import ProfileExperience from '@/components/VendorComps/ProfileExperience';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import ReviewAndTaxConfirm from '@/components/VendorComps/ReviewAndTaxConfirm';
import ReviewAndTax from '@/components/VendorComps/ReviewAndTax';
import AddLineComp from '@/components/VendorComps/AddLineComp';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { changeHandler } from '@/helper/common.helper';

export default function VendorInfo() {
  const vendorData = useRecoilValue(VendorStateAtom);
  const vendorProfiles = useRecoilValue(allProfileAtom);
  const vendorSingleProfiles = useRecoilValue(VendorProfileAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const [isShowPopup, setShowPopup] = useState(false);
  const [isShowDesc, setShowDesc] = useState(false);
  const [addOrder, setAddOrder] = useState(false);
  const [addRate, setAddRate] = useState(false);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [isShowTax, setShowTax] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(0);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  const { addUpdateOrderServices, services, getVendorServices, addUpdateOrder } =
    useHandleMarketYard();
  const { getAllProfileInfo, getSingleVendorInfo, getSingleProfileInfo } = useHandleVendor();

  const vendorProfileData = vendorProfiles?.filter((data) => data?.vendor_id === vendorId);

  const isIndividual =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  let isTotalcheck = false;
  if (servicesData?.sme?.length && servicesData?.sme[0]?.total <= 0) {
    isTotalcheck = true;
  }
  if (servicesData?.crt?.length && servicesData?.crt[0]?.total <= 0) {
    isTotalcheck = true;
  }
  if (servicesData?.cd?.length && servicesData?.cd[0]?.total <= 0) {
    isTotalcheck = true;
  }

  const orderArray = [];
  if (servicesData?.sme?.length) {
    orderArray.push(...servicesData?.sme);
  }
  if (servicesData?.crt?.length) {
    orderArray.push(...servicesData?.crt);
  }
  if (servicesData?.cd?.length) {
    orderArray.push(...servicesData?.cd);
  }
  if (servicesData?.speakers?.length) {
    orderArray.push(...servicesData?.speakers);
  }

  const grossTotal = orderArray?.map((data) => {
    if (!data?.isActive) return null;
    return 1;
  });

  const filteredGrossTotal = grossTotal.filter((x) => x != null);
  let isGrosstotal = false;
  if (!filteredGrossTotal?.length) {
    isGrosstotal = true;
  }
  useEffect(() => {
    if (!isIndividual) return;
    if (!vendorData?.users?.length) return;

    getSingleProfileInfo(vendorData?.users?.[0]);
  }, [vendorData?.users]);

  useEffect(() => {
    getAllProfileInfo();
    getSingleVendorInfo(vendorId);
    getVendorServices(vendorId);
  }, []);

  const onOpenPopup = () => {
    setServicesData(getVendorServicesObject());
    setSelectedServicesForOrder(getVendorServicesList());
    setOrderData(getVendorOrderObject());
    setShowPopup(true);
  };

  const handleClick = () => {
    setAddOrder(true);
    setShowPopup(false);
  };

  const addOrderHandler = (e) => {
    setShowDesc(true);
    setAddOrder(false);
  };

  const backFirstPopUpHandler = () => {
    setAddOrder(false);
    setShowPopup(true);
  };

  const handleDescription = () => {
    setShowDesc(false);
    setAddRate(true);
    setCurrentComponent(0);
  };
  const backDescHandler = () => {
    setShowDesc(false);
    setAddOrder(true);
  };
  const addRateHandler = async () => {
    setCurrentComponent(currentComponent + 1);

    if (currentComponent === 2) {
      setAddRate(false);
      setCompleteOrder(true);
      const orderDetails = await addUpdateOrder(vendorId);
      setOrderData(orderDetails);
      await addUpdateOrderServices(orderDetails?.id);
    }
  };

  const backAddOrderHandler = () => {
    if (currentComponent === 0) {
      setAddRate(false);
      setShowDesc(true);
    }
    setCurrentComponent(currentComponent - 1);
  };

  const onOrderCompleteHandler = () => {
    router.push('/admin/vendor/manage-vendor');
    setServicesData(getVendorServicesObject());
    setSelectedServicesForOrder(getVendorServicesList());
    setOrderData(getVendorOrderObject());
  };
  const backMarketYardHandler = () => {
    router.push('/admin/vendor/market-yard');
    setServicesData(getVendorServicesObject());
    setSelectedServicesForOrder(getVendorServicesList());
    setOrderData(getVendorOrderObject());
  };

  const tabData = [
    {
      name: 'About',
      component: <AboutVendor data={vendorData} />,
    },
    {
      name: 'Courses',
      component: <CoursesVendor />,
    },
    {
      name: 'Profile',
      component: <ProfileVendor profileData={vendorProfileData || []} />,
      isHidden: isIndividual,
    },
    {
      name: 'Experience',
      component: <ProfileExperience pfId={vendorSingleProfiles?.profileId} />,
      isHidden: !isIndividual,
    },
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ padding: '0px' }}>
        <MarketYardHero showPopup={isShowPopup} onHandlePopup={onOpenPopup} />
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false,
          }}
          customStyles={{ height: 'fit-content', overflow: 'unset' }}
        />
      </MainBody>
      <VendorPopUp
        open={isShowPopup}
        popUpState={[isShowPopup, setShowPopup]}
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add Order', handleClick: handleClick }}>
        <p className={`${styles.addOrderText}`}>
          To add this Vendor from Market Yard to “My Vendors”, please add an Order.
        </p>
      </VendorPopUp>
      <VendorPopUp
        open={addOrder}
        title="Add Order"
        popUpState={[addOrder, setAddOrder]}
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backFirstPopUpHandler }}
        submitBtn={{
          name: 'Next',
          handleClick: addOrderHandler,
          disabled: Object.values(selectedServicesForOrder).some((v) => v) ? false : true,
        }}>
        <p>Choose Service Type</p>
        {services?.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox1}`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={VENDOR_SERVICES_TYPE?.[data]?.label || ''}
                value={VENDOR_SERVICES_TYPE?.[data]?.label || ''}
                isChecked={selectedServicesForOrder?.[data]}
                changeHandler={(e) => {
                  const { value, checked } = e.target;
                  const _orderList = structuredClone(selectedServicesForOrder);
                  _orderList[data] = checked;

                  const _serviceData = structuredClone(servicesData);
                  _serviceData[data] = checked
                    ? [getServicesObject({ serviceType: data, isActive: true })]
                    : [];
                  setServicesData(_serviceData);

                  setSelectedServicesForOrder(_orderList);
                }}
              />
            </div>
          );
        })}
      </VendorPopUp>
      <VendorPopUp
        open={isShowDesc}
        popUpState={[isShowDesc, setShowDesc]}
        title="Add Order"
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backDescHandler }}
        submitBtn={{ name: 'Next', handleClick: handleDescription }}>
        <p className={`${styles.addOrderText}`}>Order Description:</p>
        <LabeledTextarea
          inputOptions={{
            placeholder: 'Enter order discription',
            rows: 5,
            maxLength: 160,
            value: orderData?.description,
            // isDisabled: isDisabled
          }}
          changeHandler={(e) => {
            setOrderData({ ...orderData, description: e.target.value });
          }}
        />
      </VendorPopUp>
      <VendorPopUp
        open={addRate}
        popUpState={[addRate, setAddRate]}
        title="Add Order"
        size="large"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backAddOrderHandler }}
        submitBtn={{
          name: currentComponent === 2 ? 'Confirm' : 'Next',
          handleClick: addRateHandler,
          disabled:
            (currentComponent === 0 && isTotalcheck) ||
            (currentComponent === 1 && !isShowTax) ||
            (currentComponent === 1 && isGrosstotal) ||
            (currentComponent === 2 && isGrosstotal),
        }}>
        <div>
          {currentComponent === 0 && <AddLineComp setCurrentComponent={setCurrentComponent} />}
          {currentComponent === 1 && (
            <ReviewAndTax
              setCurrentComponent={setCurrentComponent}
              isShowTax={isShowTax}
              setShowTax={setShowTax}
            />
          )}
          {currentComponent === 2 && (
            <ReviewAndTaxConfirm setCurrentComponent={setCurrentComponent} />
          )}
        </div>
      </VendorPopUp>

      <VendorPopUp
        open={completeOrder}
        popUpState={[completeOrder, setCompleteOrder]}
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back to Market Yard', handleClick: backMarketYardHandler }}
        submitBtn={{ name: 'Go to My Vendors', handleClick: onOrderCompleteHandler }}>
        <CompleteOrder orderId={orderData?.id} />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
    </>
  );
}
