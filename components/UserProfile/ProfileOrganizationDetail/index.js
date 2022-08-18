import styles from '../userProfile.module.scss';
import { profileOrganizationData } from '../Logic/userProfile.helper';

const ProfileOrganizationDetail = ({ currentUserData }) => {
  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img
            src={currentUserData?.photo_url || '/images/profile_picture.png'}
            alt="not found"
            width={200}
          />
        </div>
        <div className={`${styles.profileDetails}`}>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Organization</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profileOrganizationData.organization}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Organization Unit</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profileOrganizationData.organization_Unit}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Learning Space Role</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profileOrganizationData.learning_Space_Role}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Role in the Organization</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profileOrganizationData.role_In_Organization}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Other Role Name</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profileOrganizationData.other_Role_Name}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOrganizationDetail;
