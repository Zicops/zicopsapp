import IconButton from '@/components/common/IconButton';
import styles from '../vendorComps.module.scss';
import SingleProfile from './SingleProfile';
import { manageVendorProfiles } from '../Logic/vendorComps.helper';
const ProfileManageVendor = () => {
  return (
    <div className={`${styles.manageVendorProfileContainer}`}>
      <div className={`${styles.manageVendorProfileMain}`}>
        {manageVendorProfiles?.map((data, index) => (
          <div key={index}>
            <SingleProfile data={data} />
          </div>
        ))}
        <div className={`${styles.addAnotherProfile}`}>
          <IconButton
            text="Add another profile"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileManageVendor;
