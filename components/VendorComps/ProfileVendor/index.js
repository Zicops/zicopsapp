import styles from '../vendorComps.module.scss';
import VendorIndividualProfiles from './VendorIndividualProfiles';
export default function ProfileVendor({profileData}) {
  console.log("profileData " , profileData);
  return (
    <div className={`${styles.profileVendorContainer}`}>
      <div className={`${styles.profileSearch}`}>
        <input type="text" placeholder="Search Vendors..." />
      </div>
      {profileData?.map((data) => (
        <VendorIndividualProfiles data={data} />
        
      ))}
      <div></div>
    </div>
  );
}
