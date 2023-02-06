import IconButton from '@/components/common/IconButton';
import styles from '../vendorComps.module.scss';
import SingleProfile from './SingleProfile';
import { manageVendorProfiles } from '../Logic/vendorComps.helper';
import { useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddVendorProfile from '../AddVendorProfile';
const ProfileManageVendor = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [showCompleteProfile, setCompleteProfile] = useState(false);
  const addProfileHandler = () => {
    setIsOpenProfile(true);
  };

  const completeProfileHandler = () => {
    setCompleteProfile(true);
  };

  return (
    <div className={`${styles.manageVendorProfileContainer}`}>
      <div className={`${styles.manageVendorProfileMain}`}>
        {manageVendorProfiles?.map((data, index) => (
          <div key={index}>
            <SingleProfile data={data} />
          </div>
        ))}
        <div className={`${styles.addAnotherProfile}`} onClick={addProfileHandler}>
          <IconButton
            text="Add another profile"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>

      {}
      <VendorPopUp
        open={isOpenProfile}
        title="Add profile"
        popUpState={[isOpenProfile, setIsOpenProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeProfileHandler }}
        isFooterVisible={true}>
        <AddVendorProfile />
      </VendorPopUp>
      <VendorPopUp
        open={showCompleteProfile}
        title="Add sample"
        popUpState={[showCompleteProfile, setCompleteProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <ProfileManageVendor />
      </VendorPopUp>
    </div>
  );
};

export default ProfileManageVendor;
