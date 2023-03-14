import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';
import { MarketYardHeroData } from './Logic/vendorComps.helper';
import styles from './vendorComps.module.scss';
const MarketYardHero = ({ onHandlePopup }) => {
  const vendorData = useRecoilValue(VendorStateAtom);

  return (
    <div className={`${styles.marketHeroContainer}`}>
      <div className={`${styles.marketHeroDetails}`}>
        <div className={`${styles.courseImage}`}>
          <img src={vendorData?.vendorProfileImage || '/images/discord_logo.png'} alt="" />
        </div>
        <p className={`${styles.companyName}`}>{vendorData?.name}</p>
        <div className={`${styles.expartContainer}`}>
          {MarketYardHeroData?.expart?.map((data, index) => (
            <div className={`${styles.expart}`} key={index}>
              <img src="/images/svg/rightIcon.svg" alt="" />
              <p>{data}</p>
            </div>
          ))}
        </div>
        <button onClick={onHandlePopup}>Add to my Vendors</button>
      </div>
    </div>
  );
};

export default MarketYardHero;
