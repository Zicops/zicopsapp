import styles from './zicopsCarousel.module.scss';
import { useRouter } from 'next/router';

const VendorCard = ({ data }) => {
  const router = useRouter();

  const handleclick = () => {
    if (!data.id) return;

    return router.push(`/admin/vendor/market-yard/${data.id}`);
  };

  return (
    <div className={`${styles.cardVendorContainer}`} onClick={handleclick}>
      <div className={`${styles.cardInnerVendorContainer}`}>
        <div className={`${styles.vendorImage}`}>
          <img src={data.image || '/images/discord_logo.png'} alt="not found" />
        </div>
        <div className={`${styles.vendorDetails}`}>
          <div className={`${styles.vendorTitle}`}>{data.name}</div>
          <div className={`${styles.vendorType}`}>{data.type}</div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
