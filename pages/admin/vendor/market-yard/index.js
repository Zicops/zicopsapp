import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MainBody from '@/components/common/MainBody';
import MarketYardHeroSection from '@/components/VendorComps/MarketYardHeroSection';
import MarketYardData from '@/components/VendorComps/MarketYardData';
import { useState } from 'react';
import { serviceOptions } from '@/components/VendorComps/Logic/vendorComps.helper';

export default function MarketYard() {
  const [vendorType, setVendorType] = useState(null);
  const [vendorService, setVendorService] = useState(null);
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ overflowX: 'clip', padding: '0' }}>
        <MarketYardHeroSection
          vendorType={vendorType}
          setVendorType={setVendorType}
          vendorService={vendorService}
          setVendorService={setVendorService}
        />
        <MarketYardData
          vendorType={vendorType?.value}
          displayRows={{
            isSmeDisplayed: vendorService?.value ? 'sme' === vendorService?.value : true,
            isCdDisplayed: vendorService?.value ? 'cd' === vendorService?.value : true,
            isCrtDisplayed: vendorService?.value ? 'crt' === vendorService?.value : true,
            speakerType: vendorService?.value
          }}
        />
      </MainBody>
    </>
  );
}
