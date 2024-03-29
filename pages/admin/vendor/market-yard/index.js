import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MainBody from '@/components/common/MainBody';
import MarketYardHeroSection from '@/components/VendorComps/MarketYardHeroSection';
import MarketYardData from '@/components/VendorComps/MarketYardData';
import { useState } from 'react';
import { serviceOptions } from '@/components/VendorComps/Logic/vendorComps.helper';
import { useDebounce } from '@/helper/hooks.helper';

export default function MarketYard() {
  const [vendorType, setVendorType] = useState(null);
  const [vendorService, setVendorService] = useState(null);
  const [searchText, setSearchText] = useState('');

  const searchQuery = useDebounce(searchText, 1000);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody customStyles={{ overflowX: 'clip', padding: '0' }}>
        <MarketYardHeroSection
          vendorType={vendorType}
          setVendorType={setVendorType}
          vendorService={vendorService}
          setVendorService={setVendorService}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <MarketYardData
          vendorType={vendorType?.value}
          vendorService={vendorService?.value}
          displayRows={{
            isSmeDisplayed: vendorService?.value ? 'sme' === vendorService?.value : true,
            isCdDisplayed: vendorService?.value ? 'cd' === vendorService?.value : true,
            isCrtDisplayed: vendorService?.value ? 'crt' === vendorService?.value : true,
            speakerType: vendorService?.value
          }}
          searchText={searchQuery}
        />
      </MainBody>
    </>
  );
}
