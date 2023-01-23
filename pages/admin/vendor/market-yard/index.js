import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import MainBody from '@/components/common/MainBody';
import styles from './marketYard.module.scss';
import VendorDropdown from '@/components/VendorComps/common/VendorDropdown';

export default function MarketYard() {
  const optionVendorArray = [
    { value: 'Organisation', label: 'Organisation' },
    { value: 'Individual/Freelancer', label: 'Individual/Freelancer' }
  ];
  const optionServiceArray = [
    { value: 'Subject Matter Expertise', label: 'Subject Matter Expertise' },
    { value: 'Classroom Training', label: 'Classroom Training' },
    { value: 'Content Development', label: 'Content Development' }
  ];
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ overflowX: 'clip', padding: '0' }}>
        <div className={`${styles.marketYardFrameContainer}`}>
          <img src="/images/marketyardFrame.png" className={`${styles.frameImage}`} />
          <div className={`${styles.frameText}`}>
            <div className={`${styles.vendorDropDownContainer}`}>
              <VendorDropdown
                dropdownOptions={{
                  inputName: 'Vendor Type',
                  placeholder: 'Vendor Type',
                  value: { value: 'Vendor Type', label: 'Vendor Type' },
                  options: optionVendorArray
                }}
                styleClass={`${styles.vendorDropDown}`}
              />
              <VendorDropdown
                dropdownOptions={{
                  inputName: 'Service',
                  placeholder: 'Service',
                  value: { value: 'Service', label: 'Service' },
                  options: optionServiceArray
                }}
                styleClass={`${styles.vendorDropDown}`}
              />
              <input type="text" placeholder="Search" className={`${styles.vendorSearch}`} />
            </div>
            <div className={`${styles.vendorTextContainer}`}>
              <p className={`${styles.header}`}>Multi-Brand Learning Store</p>
              <p className={`${styles.body}`}>
                Find SME, Content Developer, Trainer and Speakers to build your own learning content
              </p>
            </div>
          </div>
        </div>

        <ZicopsCarousel
          title="My Vendors"
          data={myVendors}
          type="vendor"
          //   handleTitleClick={() =>
          //     router.push(
          //       `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
          //       '/search-page'
          //     )
          //   }
        />
        <ZicopsCarousel
          title="Subject Matter Experts Marketplace"
          data={myVendors}
          type="vendor"
          //   handleTitleClick={() =>
          //     router.push(
          //       `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
          //       '/search-page'
          //     )
          //   }
        />
        <ZicopsCarousel title="Content Development Marketplace" data={myVendors} type="vendor" />
        <ZicopsCarousel title="Training Fulfiller Marketplace" data={myVendors} type="vendor" />
        <ZicopsCarousel title="Speakers Marketplace" data={myVendors} type="vendor" />
      </MainBody>
    </>
  );
}
