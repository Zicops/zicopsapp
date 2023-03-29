import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import styles from './vendorComps.module.scss';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';

const MarketYardHero = ({ onHandlePopup }) => {
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const vendorData = useRecoilValue(VendorStateAtom);
  const { getVendorServices, services } = useHandleMarketYard();
  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  useEffect(() => {
    getVendorServices(vendorId);
  }, []);

  return (
    <div className={`${styles.marketHeroContainer}`}>
      <div className={`${styles.marketHeroDetails}`}>
        <div className={`${styles.courseImage}`}>
          <img src={vendorData?.photoUrl || '/images/discord_logo.png'} alt="" />
        </div>
        <p className={`${styles.companyName}`}>{vendorData?.name}</p>
        <div className={`${styles.expartContainer}`}>
          {services?.map((data, index) => (
            <div className={`${styles.expart}`} key={index}>
              <img src="/images/svg/rightIcon.svg" alt="" />
              <p>{VENDOR_SERVICES_TYPE?.[data]?.label || ''}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onHandlePopup}
          disabled={!isDev}
          style={!isDev ? { cursor: 'no-drop' } : {}}>
          Add to my Vendors
        </button>
      </div>
    </div>
  );
};

export default MarketYardHero;
