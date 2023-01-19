import styles from '../../vendorComps.module.scss';
import { DownArrowIcon } from '@/components/common/ZicopsIcons';

export default function VendorIndividualProfiles() {
  return (
    <div className={`${styles.vendorIndividualProfilesContainer}`}>
      <div className={`${styles.leftSide}`}>
        <div className={`${styles.profileImage}`}>
          <img src="/images/profile-sample-picture.png" />
        </div>
        <div className={`${styles.profileDetails}`}>
          <p className={`${styles.profileName}`}>Ritika Gupta</p>
          <p className={`${styles.profileServices}`}>SME|Trainer|Speaker</p>
          <p className={`${styles.profileExperience}`}>10+ years of experience</p>
        </div>
      </div>
      <div className={`${styles.leftSide}`}>
        <div className={`${styles.servicesPillContainer}`}>
          <div className={`${styles.servicesPill}`}>
            <p>Motion Design</p>
            <p>Motion Design</p>
            <p>Motion Design</p>
          </div>
        </div>
        <div>
          <DownArrowIcon turns={0.75} />
        </div>
      </div>
    </div>
  );
}
