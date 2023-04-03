import styles from './zicopsCarousel.module.scss';
import { useRouter } from 'next/router';

const VendorCard = ({ data }) => {
  const router = useRouter();

  const handleclick = () => {
    if (!data.vendorId) return;
    if (data.pf_id) {
      return router.push(
        `/admin/vendor/market-yard/vendor-details/${data.vendorId}/profile-details/${data.pf_id}`
      );
    }
    return router.push(`/admin/vendor/market-yard/vendor-details/${data.vendorId}`);
  };

  return (
    <div className={`${styles.cardVendorContainer}`} onClick={handleclick}>
        <div className={`${styles.vendorImage}`}>
          <img src={data.photo_url || '/images/Rectangle 55 (2).png'} alt={data.name || "Not found"} />
        </div>
        <div className={`${styles.vendorDetails}`}>
          <div className={`${styles.vendorTitle}`}>{data.name}</div>
          <div className={`${styles.vendorType}`}>{data.type}</div>
        </div>
    </div>
  );
};

export default VendorCard;
