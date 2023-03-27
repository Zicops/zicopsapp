import IconButton from '@/components/common/IconButton';
import styles from '../vendorComps.module.scss';
import SingleProfile from './SingleProfile';
import { useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddVendorProfile from '../AddVendorProfile';
import useHandleVendor from '../Logic/useHandleVendor';
import {
  allProfileAtom,
  getProfileObject,
  VendorProfileAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import useHandleVendorProfile from '../Logic/useHandleVendorProfile';
import { useRouter } from 'next/router';
import { VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import Loader from '@/components/common/Loader';

const ProfileManageVendor = () => {
  const vendorData = useRecoilValue(VendorStateAtom);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [showCompleteProfile, setCompleteProfile] = useState(false);

  const { addUpdateExperience, getAllProfileInfo } = useHandleVendor();
  const { addUpdateProfile } = useHandleVendorProfile();

  const router = useRouter();
  const isViewPage = router.asPath?.includes('view-vendor');
  const vendorId = router.query.vendorId || null;

  const addProfileHandler = () => {
    setProfileData(getProfileObject());
    setIsOpenProfile(true);
  };

  const completeProfileHandler = async (e) => {
    e.target.disabled = true;
    await addUpdateExperience();
    const isSaved = await addUpdateProfile();
    if (!isSaved) {
      e.target.disabled = false;
      return;
    }

    await getAllProfileInfo();
    setCompleteProfile(true);
    setIsOpenProfile(false);
    setProfileData(getProfileObject());
    e.target.disabled = false;
  };

  useEffect(() => {
    getAllProfileInfo();
  }, []);

  const isProfileBtnDisabled =
    vendorData?.type?.toLowerCase() === VENDOR_MASTER_TYPE?.individual?.toLowerCase() &&
    profileDetails?.length
      ? true
      : false;

  if (vendorId && profileDetails?.every((profile) => profile.vendorId !== vendorId))
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

  return (
    <div className={`${styles.manageVendorProfileContainer}`}>
      <div className={`${styles.manageVendorProfileMain}`}>
        {profileDetails?.map((data, index) => (
          <div key={index}>
            <SingleProfile data={data} />
          </div>
        ))}
        {vendorData?.type?.toLowerCase() === VENDOR_MASTER_TYPE?.company?.toLowerCase() && (
          <div className={`${styles.addAnotherProfile}`} onClick={addProfileHandler}>
            <IconButton
              text={`Add ${profileDetails?.length ? 'another' : ''} profile`}
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              isDisabled={isViewPage || isProfileBtnDisabled}
            />
          </div>
        )}
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
