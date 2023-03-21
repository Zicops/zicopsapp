import ZicopsCarousel from '@/components/ZicopsCarousel';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import styles from './vendorComps.module.scss';

export default function MarketYardData({ vendorType = null, displayRows = {}, searchText = null }) {
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

    const myVendorFilter = {};
    if (searchText) myVendorFilter.name = searchText;
    const myVendors = await getLspVendors(lspId, myVendorFilter, true);
    setLspVendors(myVendors || []);

    const filters = { service: 'sme' };
    if (searchText) filters.name = searchText;
    if (vendorType) filters.type = vendorType;

    const smeVendorList = await getLspVendors(zicopsLsp, filters, true);
    setSmeVendors(smeVendorList || []);

    filters.service = 'crt';
    const crtVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCrtVendors(crtVendorList || []);

    filters.service = 'cd';
    const cdVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCdVendors(cdVendorList || []);

    const speakerList = await getLspSpeakers(zicopsLsp, filters, true);
    setSpeakerVendors(speakerList || []);
  }, [vendorType, searchText]);

  return (
    <>
      {!!(
        !lspVendors?.length &&
        !smeVendors?.length &&
        !crtVendors?.length &&
        !cdVendors?.length &&
        !speakerDetails?.length
      ) && <div className={styles.fallback}>No Vendors Found</div>}

      {!!lspVendors?.length && (
        <ZicopsCarousel title="My Vendors" data={lspVendors} type="vendor" />
      )}

      {displayRows?.isSmeDisplayed && !!smeVendors?.length && (
        <ZicopsCarousel
          title="Subject Matter Experts Marketplace"
          data={smeVendors}
          type="vendor"
        />
      )}
      {displayRows?.isCdDisplayed && !!crtVendors?.length && (
        <ZicopsCarousel title="Content Development Marketplace" data={crtVendors} type="vendor" />
      )}

      {displayRows?.isCrtDisplayed && !!cdVendors?.length && (
        <ZicopsCarousel title="Training Fulfiller Marketplace" data={cdVendors} type="vendor" />
      )}

      {displayRows?.isSpeakerDisplayed && !!speakerDetails?.length && (
        <ZicopsCarousel title="Speakers Marketplace" data={speakerVendors} type="vendor" />
      )}
    </>
  );
}
