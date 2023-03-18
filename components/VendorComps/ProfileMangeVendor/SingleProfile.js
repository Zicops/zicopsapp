import {
  allProfileAtom,
  getExperiencesObject,
  getProfileObject,
  VendorProfileAtom
} from '@/state/atoms/vendor.atoms';
import moment from 'moment';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddVendorProfile from '../AddVendorProfile';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import useHandleVendorProfile from '../Logic/useHandleVendorProfile';
import styles from '../vendorComps.module.scss';

const SingleProfile = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const { addUpdateExperience, getAllProfileInfo, getProfileExperience } = useHandleVendor();
  const { addUpdateProfile } = useHandleVendorProfile();
  const editProfileData = profileDetails?.filter((e) => e?.pf_id === data?.pf_id);

  async function editProfilehandler() {
    if (!editProfileData?.[0]?.pf_id) return;

    getProfileExperience(editProfileData[0]?.pf_id).then((res) => {
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
        crt_expertises: editProfileData[0]?.classroom_expertise,
        content_development: editProfileData[0]?.content_development,
        experience: editProfileData[0]?.experience,
        experienceData: res?.map((exp) => {
          const startDate = moment(exp?.StartDate * 1000);
          const endDate = moment(exp?.EndDate * 1000);

          return getExperiencesObject({
            expId: exp?.ExpId,
            pfId: exp?.PfId,
            title: exp?.Title,
            companyName: exp?.CompanyName,
            location: exp?.Location,
            isWorking: exp?.IsWorking,
            employeeType: exp?.EmployementType,
            locationType: exp?.LocationType,
            startMonth: startDate?.format('MMMM'),
            startYear: startDate?.format('YYYY'),
            endMonth: endDate?.format('MMMM'),
            endYear: endDate?.format('YYYY')
          });
        }),
        experienceYear: editProfileData[0]?.experience_years,
        isSpeaker: editProfileData[0]?.is_speaker
      };

      console.info(profileInfo);
      setProfileData(profileInfo);
      setIsOpen(true);
    });
  }

  const completeProfileHandler = async () => {
    await addUpdateProfile();
    await addUpdateExperience();
    await getAllProfileInfo();
    setIsOpen(false);
    setProfileData(getProfileObject());
  };

  return (
    <div className={`${styles.singleProfileContainer}`}>
      <div className={`${styles.singleProfileMain}`}>
        <div className={`${styles.singleProfileImage}`}>
          <img src={data?.photo_url || '/images/Avatars/Profile.png'} alt="" />
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
