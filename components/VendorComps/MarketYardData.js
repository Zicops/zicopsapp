import ZicopsCarousel from '@/components/ZicopsCarousel';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import styles from './vendorComps.module.scss';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { useRecoilValue } from 'recoil';

export default function MarketYardData({
  vendorType = null,
  vendorService = null,
  displayRows = {},
  searchText = null
}) {
  const skeletonCardCount = 6;
  const { vendorDetails, getLspVendors, loading, getLspSpeakers, speakerDetails } =
    useHandleMarketYard();
  const [lspVendors, setLspVendors] = useState([...Array(skeletonCardCount)]);
  const [smeVendors, setSmeVendors] = useState([...Array(skeletonCardCount)]);
  const [crtVendors, setCrtVendors] = useState([...Array(skeletonCardCount)]);
  const [cdVendors, setCdVendors] = useState([...Array(skeletonCardCount)]);
  const { isDemo } = useRecoilValue(FeatureFlagsAtom);
  // const [speakerVendors, setSpeakerVendors] = useState([...Array(skeletonCardCount)]);

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const zicopsLsp = COMMON_LSPS.zicops;

    const filters = {};
    if (searchText) filters.name = searchText;
    if (vendorType) filters.type = vendorType;
    if (vendorService) filters.service = vendorService;
    const myVendors = await getLspVendors(lspId, filters, true);
    setLspVendors(myVendors || []);

    filters.service = 'sme';
    const smeVendorList = await getLspVendors(zicopsLsp, filters, true);
    setSmeVendors(smeVendorList || []);

    filters.service = 'crt';
    const crtVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCrtVendors(crtVendorList || []);

    filters.service = 'cd';
    const cdVendorList = await getLspVendors(zicopsLsp, filters, true);
    setCdVendors(cdVendorList || []);

    await getLspSpeakers(zicopsLsp, displayRows?.speakerType || null, searchText || '', false);
  }, [vendorType, vendorService, searchText, displayRows?.speakerType]);

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

      {!isDemo && displayRows?.isSmeDisplayed && !!smeVendors?.length && (
        <ZicopsCarousel
          title="Subject Matter Experts Marketplace"
          data={smeVendors}
          type="vendor"
        />
      )}
      {displayRows?.isCrtDisplayed && !!crtVendors?.length && (
        <ZicopsCarousel title="Training Fulfiller Marketplace" data={crtVendors} type="vendor" />
      )}

      {!isDemo && displayRows?.isCdDisplayed && !!cdVendors?.length && (
        <ZicopsCarousel title="Content Development Marketplace" data={cdVendors} type="vendor" />
      )}
      {!!speakerDetails?.length && (
        <ZicopsCarousel title="Speakers Marketplace" data={speakerDetails} type="vendor" />
      )}
    </>
  );
}
