import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import { LEARNING_SPACE_ID, VENDOR_MASTER_STATUS } from '@/helper/constants.helper';

export default function MarketYardData({ vendorType, displayRows = {} }) {
  const skeletonCardCount = 6;
  const { vendorDetails, getLspVendors, loading, getLspSpeakers, speakerDetails } =
    useHandleMarketYard();
  const [orgVendors, setOrgVendors] = useState([...Array(skeletonCardCount)]);
  const [lspVendors, setLspVendors] = useState([...Array(skeletonCardCount)]);
  const [smeVendors, setSmeVendors] = useState([...Array(skeletonCardCount)]);
  const [crtVendors, setCrtVendors] = useState([...Array(skeletonCardCount)]);
  const [cdVendors, setCdVendors] = useState([...Array(skeletonCardCount)]);
  const [speakerVendors, setSpeakerVendors] = useState([...Array(skeletonCardCount)]);

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendorList1 = await getLspVendors(lspId, {}, true);
    setLspVendors(vendorList1);

    const smeVendorList = await getLspVendors(lspId, { service: 'sme' }, true);
    setSmeVendors(smeVendorList);

    const crtVendorList = await getLspVendors(lspId, { service: 'crt' }, true);
    setCrtVendors(crtVendorList);

    const cdVendorList = await getLspVendors(lspId, { service: 'cd' }, true);
    setCdVendors(cdVendorList);

    const orgLspId = LEARNING_SPACE_ID;
    const vendorList2 = await getLspVendors(orgLspId, {}, true);
    setOrgVendors(vendorList2);

    const speakerList = await getLspSpeakers(lspId, true);
    setSpeakerVendors(speakerList);
  }, []);
  return (
    <>
      <ZicopsCarousel title="My Vendors" data={lspVendors} type="vendor" />
      {displayRows?.isSmeDisplayed && (
        <ZicopsCarousel
          title="Subject Matter Experts Marketplace"
          data={smeVendors}
          type="vendor"
        />
      )}
      {displayRows?.isCdDisplayed && (
        <ZicopsCarousel title="Content Development Marketplace" data={crtVendors} type="vendor" />
      )}
      {displayRows?.isCrtDisplayed && (
        <ZicopsCarousel title="Training Fulfiller Marketplace" data={cdVendors} type="vendor" />
      )}
      {/* {displayRows?.isSpeakerDisplayed && ( */}
      <ZicopsCarousel title="Speakers Marketplace" data={speakerVendors} type="vendor" />
      {/* )} */}
    </>
  );
}
