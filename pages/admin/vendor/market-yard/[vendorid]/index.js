import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import {
  myVendors,
  coursesVendor,
  vendorProfiles
} from '@/components/VendorComps/Logic/vendorComps.helper.js';
import TabContainer from '@/common/TabContainer';
import { useState } from 'react';
import AboutVendor from '@/components/VendorComps/AboutVendor';
import { useRouter } from 'next/router';
import CoursesVendor from '@/components/VendorComps/CoursesVendor';
import ProfileVendor from '@/components/VendorComps/ProfileVendor';
import MarketYardHero from '@/components/VendorComps/MarketYardHero';
import MainBody from '@/components/common/MainBody';
import VendorPopUp from '@/components/VendorComps/VendorPopUp';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from '../marketYard.module.scss';
import AddLineItem from '@/components/VendorComps/AddLineItem';
import CompleteOrder from '@/components/VendorComps/CompleteOrder';
import ReviewOrderTop from '@/components/VendorComps/ReviewOrderTop';
import ReviewOrderBottom from '@/components/VendorComps/ReviewOrderBottom';
export default function VendorInfo() {
  const [isShowPopup, setShowPopup] = useState(false);
  const [addOrder, setAddOrder] = useState(false);
  const [addRate, setAddRate] = useState(false);
  const [addTax, setAddTax] = useState(false);
  const [confirmTax , setConfirmTax] = useState(false)
 const [completeOrder , setCompleteOrder ] = useState(false)
  const onOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClick = () => {
    setAddOrder(true);
    setShowPopup(false);
    // router.push('/admin/vendor/manage-vendor/addVendor');
  };

  const addOrderHandler = () => {
    setAddRate(true);
    setAddOrder(false);
  };

  const addRateHandler = () => {
    setAddTax(true)
    setAddRate(false);
  }
  const confirmTaxHandler = () => {
    setConfirmTax(true);
    setAddTax(false)
  }

  const onOrderCompleteHandler = () => {
    setCompleteOrder(true);
    setConfirmTax(false)
  }
  const router = useRouter();
  const vendorId = router.query.vendorId || '0'; //Change the 1 to null
  console.log('vendorId', vendorId);
  const vendorProfileData = vendorProfiles?.filter((data) => data?.vendorId === vendorId);
  const tabData = [
    {
      name: 'About',
      component: <AboutVendor data={myVendors[vendorId]} />
    },
    {
      name: 'Courses',
      component: <CoursesVendor coursesData={coursesVendor[vendorId]} />
    },
    {
      name: 'Profile',
      component: <ProfileVendor profileData={vendorProfileData} />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      {/* <div style={{ height: '30vh', marginTop: '70px' }}> */}
      <MainBody customStyles={{ padding: '0px' }}>
        <MarketYardHero showPopup={isShowPopup} onHandlePopup={onOpenPopup} />
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false
          }}
          customStyles={{ height: '100%' }}
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
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Next', handleClick: addOrderHandler }}>
        <p>Choose Service Type</p>
        <LabeledRadioCheckbox label={'Subject Matter Expertise'} type="checkbox" />
        <div>
          <LabeledRadioCheckbox label={'Training'} type="checkbox" />
        </div>
        <div>
          <LabeledRadioCheckbox label={'Content Development'} type="checkbox" />
        </div>
        <LabeledRadioCheckbox label={'Speakers'} type="checkbox" />
      </VendorPopUp>
      <VendorPopUp
        open={addRate}
        popUpState={[addRate, setAddRate]}
        title="Add Order"
        size="large"
        isMarketYard={true}
        closeBtn={{ name: 'Back' }}
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
        closeBtn={{ name: 'Back' }}
        submitBtn={{ name: 'Next', handleClick: confirmTaxHandler }}>
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
        closeBtn={{ name: 'Back' }}
        submitBtn={{ name: 'Confirm', handleClick: onOrderCompleteHandler }}>
        <p className={`${styles.addLineText}`}>Confirm</p>
        <div className={`${styles.hr}`}></div>
        <ReviewOrderTop isConfirm={true} />
        <div className={`${styles.hr}`}></div>
        <ReviewOrderBottom isTax={false}/>
         <div className={`${styles.hr}`}></div>
      </VendorPopUp>
      <VendorPopUp
        open={completeOrder}
        popUpState={[completeOrder, setCompleteOrder]}
        size="small"
        isMarketYard={true}
        closeBtn={{ name: 'Back to Market Yard' }}
        submitBtn={{ name: 'Go to Marketplace', handleClick: handleClick }}>
        <CompleteOrder />
        <div className={`${styles.hr}`}></div>
      </VendorPopUp>
    </>
  );
}
