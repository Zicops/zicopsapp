import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import { coursesVendor, serviceType } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState, useEffect } from 'react';
import AboutVendor from '@/components/VendorComps/AboutVendor';
import { useRouter } from 'next/router';
import CoursesVendor from '@/components/VendorComps/CoursesVendor';
import MarketYardHero from '@/components/VendorComps/MarketYardHero';
import MainBody from '@/components/common/MainBody';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import AddLineItem from '@/components/VendorComps/AddLineItem';
import CompleteOrder from '@/components/VendorComps/CompleteOrder';
import ReviewOrderTop from '@/components/VendorComps/ReviewOrderTop';
import ReviewOrderBottom from '@/components/VendorComps/ReviewOrderBottom';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import ProfileVendor from '@/components/VendorComps/ProfileVendor';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allProfileAtom,
  SevicesAtom,
  VendorProfileAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import useHandleMarketYard from '@/components/VendorComps/Logic/useHandleMarketYard';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import ProfileExperience from '@/components/VendorComps/ProfileExperience';
export default function VendorInfo() {
  const vendorData = useRecoilValue(VendorStateAtom);
  const vendorProfiles = useRecoilValue(allProfileAtom);
  const vendorSingleProfiles = useRecoilValue(VendorProfileAtom);
  const [servicesData, setServicesData] = useRecoilState(SevicesAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const [isShowPopup, setShowPopup] = useState(false);
  const [addOrder, setAddOrder] = useState(false);
  const [addRate, setAddRate] = useState(false);
  const [addTax, setAddTax] = useState(false);
  const [confirmTax, setConfirmTax] = useState(false);
  const [completeOrder, setCompleteOrder] = useState(false);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  const { addUpdateServices } = useHandleMarketYard();
  const { getAllProfileInfo, getSingleVendorInfo, getSingleProfileInfo } = useHandleVendor();

  const vendorProfileData = vendorProfiles?.filter((data) => data?.vendor_id === vendorId);

  const isIndividual =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  useEffect(() => {
    if (!isIndividual) return;
    if (!vendorData?.users?.length) return;

    getSingleProfileInfo(vendorData?.users?.[0]);
  }, [vendorData?.users]);

  useEffect(() => {
    getAllProfileInfo();
    getSingleVendorInfo(vendorId);
  }, []);

  const onOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClick = () => {
    setAddOrder(true);
    setShowPopup(false);
  };

  const addOrderHandler = () => {
    setAddRate(true);
    setAddOrder(false);
  };

  const backFirstPopUpHandler = () => {
    setAddOrder(false);
    setShowPopup(true);
  };

  const addRateHandler = () => {
    setAddTax(true);
    setAddRate(false);
    addUpdateServices();
  };

  const backAddOrderHandler = () => {
    setAddRate(false);
    setAddOrder(true);
  };
  const addTaxHandler = () => {
    setConfirmTax(true);
    setAddTax(false);
  };

  const backAddRateHandler = () => {
    setAddTax(false);
    setAddRate(true);
  };

  const onConfirmTaxHandler = () => {
    setCompleteOrder(true);
    setConfirmTax(false);
  };

  const backAddTaxHandler = () => {
    setConfirmTax(false);
    setAddTax(true);
  };
  const onOrderCompleteHandler = () => router.push('/admin/vendor/manage-vendor');
  const backMarketYardHandler = () => router.push('/admin/vendor/market-yard');

  const tabData = [
    {
      name: 'About',
      component: <AboutVendor data={vendorData} />
    },
    {
      name: 'Courses',
      component: <CoursesVendor />
    },
    {
      name: 'Profile',
      component: <ProfileVendor profileData={vendorProfileData} />,
      isHidden: isIndividual
    },
    {
      name: 'Experience',
      component: <ProfileExperience pfId={vendorSingleProfiles?.profileId} />,
      isHidden: !isIndividual
    }
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
            showFooter: false
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
        submitBtn={{ name: 'Next', handleClick: addOrderHandler }}>
        <p>Choose Service Type</p>
        {serviceType?.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox1}`}>
              <LabeledRadioCheckbox type="checkbox" label={data} />
            </div>
          );
        })}
      </VendorPopUp>
      <VendorPopUp
        open={addRate}
        popUpState={[addRate, setAddRate]}
        title="Add Order"
        size="large"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backAddOrderHandler }}
        submitBtn={{ name: 'Next', handleClick: addRateHandler }}>
        <p className={`${styles.addLineText}`}>Add Line Item</p>
        <div className={`${styles.hr}`}></div>
        <AddLineItem />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
      <VendorPopUp
        open={addTax}
        popUpState={[addTax, setAddTax]}
        title="Add Order"
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backAddRateHandler }}
        submitBtn={{ name: 'Next', handleClick: addTaxHandler }}>
        <p className={`${styles.addLineText}`}>Review and Add Tax</p>
        <div className={`${styles.hr}`}></div>
        <ReviewOrderTop isConfirm={false} />
        <div className={`${styles.hr}`}></div>
        <ReviewOrderBottom isTax={true} />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
      <VendorPopUp
        open={confirmTax}
        popUpState={[confirmTax, setConfirmTax]}
        title="Add Order"
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back', handleClick: backAddTaxHandler }}
        submitBtn={{ name: 'Confirm', handleClick: onConfirmTaxHandler }}>
        <p className={`${styles.addLineText}`}>Confirm</p>
        <div className={`${styles.hr}`}></div>
        <ReviewOrderTop isConfirm={true} />
        <div className={`${styles.hr}`}></div>
        <ReviewOrderBottom isTax={false} />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
      <VendorPopUp
        open={completeOrder}
        popUpState={[completeOrder, setCompleteOrder]}
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back to Market Yard', handleClick: backMarketYardHandler }}
        submitBtn={{ name: 'Go to My Vendors', handleClick: onOrderCompleteHandler }}>
        <CompleteOrder />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
    </>
  );
}
