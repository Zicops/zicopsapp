import styles from '@/components/VendorComps/vendorComps.module.scss';
const MarketYardExperience = () => {
  return (
    <div className={`${styles.merketExprienceContainer}`}>
      <div className={`${styles.experienceHeading}`}>Experience</div>
      <div className={`${styles.experienceLine}`}></div>
      <div className={`${styles.experienceMain}`}>
        <div className={`${styles.companyImage}`}>
          <img src="/images/Avatars/maleProfile.png" alt="" />
        </div>
        <div className={`${styles.companyExperienceDetails}`}>
          <p className={`${styles.companyPosition}`}>Manager</p>
          <p className={`${styles.companyName}`}>Google</p>
          <p className={`${styles.companyExperiencDate}`}>
            Aug 2015 - Present <span className={`${styles.dot}`}></span>Full time
          </p>
        </div>
      </div>
      <div className={`${styles.experienceLine}`}></div>
      <div className={`${styles.experienceMain}`}>
        <div className={`${styles.companyImage}`}>
          <img src="/images/Avatars/maleProfile.png" alt="" />
        </div>
        <div className={`${styles.companyExperienceDetails}`}>
          <p className={`${styles.companyPosition}`}>Manager</p>
          <p className={`${styles.companyName}`}>Google</p>
          <p className={`${styles.companyExperiencDate}`}>Aug 2015 - Present . Full time</p>
        </div>
      </div>
    </div>
  );
};

export default MarketYardExperience;
