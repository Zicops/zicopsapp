import React from 'react';
import styles from './vendorComps.module.scss';
const ViewVendorProfile = ({ data }) => {
  return (
    <div className={`${styles.viewProfilesContainer}`}>
      <div className={`${styles.viewProfileTop}`}>
        <div className={`${styles.viewProfileImage}`}>
          <img src={data[0]?.image} alt="" />
        </div>
        <div className={`${styles.profileDetails}`}>
          <p className={`${styles.profileName}`}>{data[0]?.name}</p>
          {data[0]?.expertise?.map((expert, index) => (
            <span>
              {expert} {index + 1 !== data[0]?.expertise?.length ? ' | ' : ''}
            </span>
          ))}

          <div className={`${styles.hr1}`}></div>
          <div className={`${styles.profileEmail}`}>
            <img src="/images/svg/mark_email_read.svg" alt="" />
            <p>{data[0]?.email}</p>
          </div>
          <div className={`${styles.profileWebsite}`}>
            <img src="/images/svg/open_in_new.svg" alt="" />
            <p>{data[0]?.website}</p>
          </div>
          <button>Add to my Vendors</button>
        </div>
      </div>
      <div className={`${styles.hr}`}></div>
      <div className={`${styles.viewProfileButtom}`}>
        <div className={`${styles.vendorAddressType}`}>
          <div className={`${styles.vendorAddress}`}>
            <p>Vendor Address</p>
            <span>{data[0]?.address}</span>
          </div>
          <div className={`${styles.vendorType}`}>
            <p>Vendor Type</p>
            <span>{data[0]?.type}</span>
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
            {data[0]?.services?.map((expert) => (
              <span className={`${styles.vendorExpertise}`}>{expert}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVendorProfile;
