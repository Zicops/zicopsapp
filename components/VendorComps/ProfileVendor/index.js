import styles from '../vendorComps.module.scss';
import VendorIndividualProfiles from './VendorIndividualProfiles';

export default function ProfileVendor() {
  return (
    <div className={`${styles.profileVendorContainer}`}>
      <div className={`${styles.profileSearch}`}>
        <input type="text" placeholder="Search Vendors..." />
      </div>
      <VendorIndividualProfiles />
      <VendorIndividualProfiles />
      <VendorIndividualProfiles />
      <div></div>
    </div>
  );
}
