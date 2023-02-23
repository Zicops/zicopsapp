import React, { useState } from 'react';
import AddVendorProfile from '../AddVendorProfile';
import styles from '../vendorComps.module.scss';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import {
  allProfileAtom,
  getProfileObject,
  VendorAllExperiencesAtom,
  VendorProfileAtom
} from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
const SingleProfile = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const { addUpdateProfile, addUpdateExperience } = useHandleVendor();
  const editProfileData = profileDetails?.filter((e) => e?.pf_id === data?.pf_id);
  const editProfilehandler = () => {
    const profileInfo = {
      profileId: editProfileData[0]?.pf_id,
      firstName: editProfileData[0]?.first_name,
      lastName: editProfileData[0]?.last_name,
      email: editProfileData[0]?.email,
      description: editProfileData[0]?.description,
      contactNumber: editProfileData[0]?.phone,
      profileImage: editProfileData[0]?.photo_url,
      languages: editProfileData[0]?.language,
      sme_expertises: editProfileData[0]?.sme_expertise,
      crt_expertises: editProfileData[0]?.crt_expertise,
      experience: editProfileData[0]?.experience,
      experienceYear: editProfileData[0]?.experience_years,
      isSpeaker: editProfileData[0]?.is_speaker
    };
    setProfileData(profileInfo);
    setIsOpen(true);
  };

  const completeProfileHandler = () => {
    addUpdateProfile();
    addUpdateExperience();
    setIsOpen(false);
    setProfileData(getProfileObject());
  };

  return (
    <div className={`${styles.singleProfileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          <img src={data?.photo_url} alt="" />
        </div>
        <div className={`${styles.singleProfileDetails}`}>
          <div>
            <p className={`${styles.profileName}`}>
              {data?.first_name} {data?.last_name}
            </p>
            <p className={`${styles.profileExpriences}`}>
              {data?.experience_years} years of experience
            </p>
          </div>
          <div className={`${styles.profileExpertEdit}`}>
            <div className={`${styles.profileExpert}`}>
              {data?.type}
              {/* {data?.sme_expertise?.map((expert, index) => (
                <p>
                  {expert} {index + 1 !== data?.sme_expertise?.length ? ' , ' : ''}
                </p>
              ))} */}
            </div>
            <div className={`${styles.editIcon}`} onClick={editProfilehandler}>
              <img src="/images/svg/border_color.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <VendorPopUp
        open={isOpen}
        title="Add profile"
        popUpState={[isOpen, setIsOpen]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeProfileHandler }}
        isFooterVisible={true}>
        <AddVendorProfile />
      </VendorPopUp>
    </div>
  );
};

export default SingleProfile;
