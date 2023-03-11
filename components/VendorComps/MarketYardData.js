import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';

export default function MarketYardData({ vendorType, displayRows = {} }) {
  const skeletonCardCount = 6;
  const { vendorDetails, getLspVendors, loading } = useHandleMarketYard();
  const [orgVendors, setOrgVendors] = useState([...Array(skeletonCardCount)]);
  const [lspVendors, setLspVendors] = useState([...Array(skeletonCardCount)]);
  const [isSmeRows, setSmeRows] = useState(false);

  // if (vendorService?.value === 'Subject Matter' || vendorService?.value === 'All') {
  //   setSmeRows(true);
  // }
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
      <ZicopsCarousel title="My Vendors" data={lspVendors} type="vendor" />
      {displayRows?.isSmeDisplayed && (
        <ZicopsCarousel
          title="Subject Matter Experts Marketplace"
          data={orgVendors}
          type="vendor"
        />
      )}
      {displayRows?.isCdDisplayed && (
        <ZicopsCarousel title="Content Development Marketplace" data={myVendors} type="vendor" />
      )}
      {displayRows?.isCrtDisplayed && (
        <ZicopsCarousel title="Training Fulfiller Marketplace" data={myVendors} type="vendor" />
      )}
      {displayRows?.isSpeakerDisplayed && (
        <ZicopsCarousel title="Speakers Marketplace" data={myVendors} type="vendor" />
      )}
    </>
  );
}
