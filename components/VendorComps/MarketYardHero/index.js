import styles from '../vendorComps.module.scss';
const MarketYardHero = ({onHandlePopup}) => {
 
  return (
    <div className={`${styles.marketHeroContainer}`}>
      <div className={`${styles.marketHeroDetails}`}>
        <div className={`${styles.courseImage}`}>
          <img src="/images/discord_logo.png" alt="" />
        </div>
        <p className={`${styles.companyName}`}>ABC Learning Technology Pvt. Ltd.</p>
        <div className={`${styles.expartContainer}`}>
          <div className={`${styles.expart}`}>
            <img src="/images/svg/rightIcon.svg" alt="" />
            <p>SME</p>
          </div>
          <div className={`${styles.expart}`}>
            <img src="/images/svg/rightIcon.svg" alt="" />
            <p>Classroom Training</p>
          </div>
          <div className={`${styles.expart}`}>
            <img src="/images/svg/rightIcon.svg" alt="" />
            <p>Content Development</p>
          </div>
        </div>
        <button onClick={onHandlePopup}>Add to my Vendors</button>
      </div>
    </div>
  );
};

export default MarketYardHero;
