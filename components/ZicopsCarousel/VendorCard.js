import styles from './zicopsCarousel.module.scss';

const VendorCard = ({ data }) => {
  return (
    <>
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.cardInnerContainer}`}>
          <div className={`${styles.cardFrontSide}`}>
            <img src={data.image || '/images/discord_logo.png'} alt="not found" />
          </div>
          <div className={`${styles.cardBackSide}`}>
            <div className={`${styles.cbTitle}`}>ABC Organisation Pvt.ltd</div>
            <div className={`${styles.cbType}`}>Organisation</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCard;
