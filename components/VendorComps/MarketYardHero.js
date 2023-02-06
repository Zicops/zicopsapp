import styles from './vendorComps.module.scss';
import { MarketYardHeroData } from './Logic/vendorComps.helper';
const MarketYardHero = ({ onHandlePopup }) => {
  return (
    <div className={`${styles.marketHeroContainer}`}>
      <div className={`${styles.marketHeroDetails}`}>
        <div className={`${styles.courseImage}`}>
          <img src="/images/discord_logo.png" alt="" />
        </div>
        <p className={`${styles.companyName}`}>{MarketYardHeroData?.companyName}</p>
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
