import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';

export default function MarketYardData() {
  const { vendorDetails, getLspVendors, loading } = useHandleMarketYard();

  const [orgVendors, setOrgVendors] = useState([]);
  const [lspVendors, setLspVendors] = useState([]);

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendorList1 = await getLspVendors(lspId, true);
    setLspVendors(vendorList1);

    const orgLspId = LEARNING_SPACE_ID;
    const vendorList2 = await getLspVendors(orgLspId, true);
    setOrgVendors(vendorList2);
  }, []);
  return (
    <>
      <ZicopsCarousel
        title="My Vendors"
        data={lspVendors}
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
        data={orgVendors}
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
    </>
  );
}
