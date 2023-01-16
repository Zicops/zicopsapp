import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';

export default function MarketYard() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <div style={{ height: '30vh', marginTop: '70px' }}>Frame in Progress</div>

      <ZicopsCarousel
        title="Continue with your Courses"
        data={myVendors}
        type="vendor"
        //   handleTitleClick={() =>
        //     router.push(
        //       `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
        //       '/search-page'
        //     )
        //   }
      />
    </>
  );
}
