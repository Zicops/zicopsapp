import styles from '../userProfile.module.scss';
import { profileOrganizationData } from '../Logic/userProfile.helper';

const ProfileOrganizationDetail = () => {
  return (
    <>
      <div className={`${styles.organizationDetailsContainer}`}>
        <span>
          <div className={`${styles.label}`}>Organization:</div>
          <div className={`${styles.value}`}>
            <span>{profileOrganizationData.organization}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Organization Unit:</div>
          <div className={`${styles.value}`}>
            <span>{profileOrganizationData.organization_Unit}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Learning Space Role:</div>
          <div className={`${styles.value}`}>
            <span>{profileOrganizationData.learning_Space_Role}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Role in the Organization:</div>
          <div className={`${styles.value}`}>
            <span>{profileOrganizationData.role_In_Organization}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Other Role Name:</div>
          <div className={`${styles.value}`}>
            <span>{profileOrganizationData.other_Role_Name}</span>
          </div>
        </span>
      </div>
    </>
  );
};

export default ProfileOrganizationDetail;
