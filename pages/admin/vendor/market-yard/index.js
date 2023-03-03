import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MainBody from '@/components/common/MainBody';
import MarketYardHeroSection from '@/components/VendorComps/MarketYardHeroSection';
import MarketYardData from '@/components/VendorComps/MarketYardData';

export default function MarketYard() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ overflowX: 'clip', padding: '0' }}>
        <MarketYardHeroSection />
        <MarketYardData />
      </MainBody>
    </>
  );
}
