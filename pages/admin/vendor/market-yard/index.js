import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import MainBody from '@/components/common/MainBody';
import styles from './marketYard.module.scss';
import VendorDropdown from '@/components/VendorComps/common/VendorDropdown';
import MarketYardHeroSection from '@/components/VendorComps/MarketYardHeroSection';

export default function MarketYard() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ overflowX: 'clip', padding: '0' }}>
        <MarketYardHeroSection />

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
