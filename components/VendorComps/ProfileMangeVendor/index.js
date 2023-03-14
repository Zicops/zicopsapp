import IconButton from '@/components/common/IconButton';
import styles from '../vendorComps.module.scss';
import SingleProfile from './SingleProfile';
import { useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddVendorProfile from '../AddVendorProfile';
import useHandleVendor from '../Logic/useHandleVendor';
import { allProfileAtom, getProfileObject, VendorProfileAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import useHandleVendorProfile from '../Logic/useHandleVendorProfile';
const ProfileManageVendor = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [showCompleteProfile, setCompleteProfile] = useState(false);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const { addUpdateExperience, getAllProfileInfo } = useHandleVendor();
  const { addUpdateProfile } = useHandleVendorProfile();
  const addProfileHandler = () => {
    setProfileData(getProfileObject());
    setIsOpenProfile(true);
  };

  const completeProfileHandler = async () => {
    await addUpdateExperience();
    await addUpdateProfile();
    await getAllProfileInfo();
    setCompleteProfile(true);
    setIsOpenProfile(false);
    setProfileData(getProfileObject());
  };

  useEffect(() => {
    getAllProfileInfo();
  }, []);

  return (
    <div className={`${styles.manageVendorProfileContainer}`}>
      <div className={`${styles.manageVendorProfileMain}`}>
        {profileDetails?.map((data, index) => (
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
        submitBtn={{ name: 'Done', handleClick: () => setCompleteProfile(false) }}
        isFooterVisible={true}>
        <ProfileManageVendor />
      </VendorPopUp>
    </div>
  );
};

export default ProfileManageVendor;
