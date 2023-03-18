import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';
import styles from './vendorComps.module.scss';
const ViewVendorProfile = ({ data }) => {
  const vendorData = useRecoilValue(VendorStateAtom);
  return (
    <div className={`${styles.viewProfilesContainer}`}>
      <div className={`${styles.viewProfileTop}`}>
        <div className={`${styles.viewProfileImage}`}>
          <img src={data?.photo_url || '/images/Avatars/Profile.png'} alt="" />
        </div>
        <div className={`${styles.profileDetails}`}>
          <p className={`${styles.profileName}`}>{data?.first_name + ' ' + data?.last_name}</p>
          {data?.sme_expertise?.map((expert, index) => (
            <span>
              {expert} {index + 1 !== data?.expertise?.length ? ' | ' : ''}
            </span>
          ))}

          <div className={`${styles.hr1}`}></div>
          <div className={`${styles.profileEmail}`}>
            <img src="/images/svg/mark_email_read.svg" alt="" />
            <p>{data?.email || 'NA'}</p>
          </div>
          <div className={`${styles.profileWebsite}`}>
            <img src="/images/svg/open_in_new.svg" alt="" />
            <p>{data?.website || 'NA'}</p>
          </div>
          <button>Add to my Vendors</button>
        </div>
      </div>
      <div className={`${styles.hr}`}></div>
      <div className={`${styles.viewProfileButtom}`}>
        <div className={`${styles.vendorAddressType}`}>
          <div className={`${styles.vendorAddress}`}>
            <p>Vendor Address</p>
            <span>{vendorData?.address}</span>
          </div>
          <div className={`${styles.vendorType}`}>
            <p>Vendor Type</p>
            <span>{vendorData?.type}</span>
          </div>
          <div className={`${styles.vendorSocialMedia}`}>
            <p>Social Media</p>
            <div className={`${styles.socialMediaImage}`}>
              <img src="/images/svg/Facebook.svg" alt="" />
              <img src="/images/svg/Instagram.svg" alt="" />
              <img src="/images/svg/Linkedin.svg" alt="" />
              <img src="/images/svg/Twitter.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={`${styles.vendorExpertiseContainer}`}>
          <p>Expertise :</p>
          <div className={`${styles.vendorExpertiseMain}`}>
            {data?.sme_expertise?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
            {data?.classroom_expertise?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
            {data?.content_development?.map((expert) => (
              <p className={`${styles.vendorExpertise}`}>{expert}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVendorProfile;
