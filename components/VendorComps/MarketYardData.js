import ZicopsCarousel from '@/components/ZicopsCarousel';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';

export default function MarketYardData({ vendorType = null, displayRows = {} }) {
  const skeletonCardCount = 6;
  const { vendorDetails, getLspVendors, loading, getLspSpeakers, speakerDetails } =
    useHandleMarketYard();
  const [lspVendors, setLspVendors] = useState([...Array(skeletonCardCount)]);
  const [smeVendors, setSmeVendors] = useState([...Array(skeletonCardCount)]);
  const [crtVendors, setCrtVendors] = useState([...Array(skeletonCardCount)]);
  const [cdVendors, setCdVendors] = useState([...Array(skeletonCardCount)]);
  const [speakerVendors, setSpeakerVendors] = useState([...Array(skeletonCardCount)]);

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const zicopsLsp = COMMON_LSPS.zicops;

    const myVendors = await getLspVendors(lspId, {}, true);
    setLspVendors(myVendors);

    const filters = { service: 'sme' };
    if (vendorType) filters.type = vendorType;

    const smeVendorList = await getLspVendors(zicopsLsp, filters, true);
    setSmeVendors(smeVendorList);

    filters.service = 'crt';
    const crtVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCrtVendors(crtVendorList);

    filters.service = 'cd';
    const cdVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCdVendors(cdVendorList);

    const speakerList = await getLspSpeakers(zicopsLsp, filters, true);
    setSpeakerVendors(speakerList);
  }, [vendorType]);

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
      {displayRows?.isSpeakerDisplayed && (
        <ZicopsCarousel title="Speakers Marketplace" data={speakerVendors} type="vendor" />
      )}
    </>
  );
}
