import { allProfileAtom, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleVendor from './Logic/useHandleVendor';
import styles from './vendorComps.module.scss';

const ProfileMarketYardHero = ({ onHandlePopup }) => {
  const router = useRouter();
  const profileId = router.query.profileId || null;
  const vendorId = router.query.vendorId || null;

  const vendorProfiles = useRecoilValue(allProfileAtom);
  const viewProfileData = vendorProfiles?.filter((data) => data?.pf_id === profileId);
  const data = viewProfileData?.[0];

  const { getSingleVendorInfo } = useHandleVendor();
  const vendorData = useRecoilValue(VendorStateAtom);

  useEffect(() => {
    getSingleVendorInfo();
  }, []);

  const onHandleClick = () => {
    router.push(`/admin/vendor/market-yard/vendor-details/${vendorId}`);
  };

  console.info(vendorData);

  return (
    <div className={`${styles.marketHeroContainer}`}>
      <div className={`${styles.marketHeroDetails}`}>
        <div className={`${styles.courseImage}`}>
          <img src={data?.photo_url || '/images/discord_logo.png'} alt="" />
        </div>
        <p className={`${styles.companyName}`}>
          {data?.first_name} {data?.last_name}
        </p>
        <p className={`${styles.company}`}>{vendorData?.name}</p>
        <div className={`${styles.expartContainer}`}></div>
        <button onClick={onHandleClick}>View Company</button>
      </div>
    </div>
  );
};

export default ProfileMarketYardHero;
