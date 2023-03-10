import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import React, { useState, useEffect } from 'react';
import styles from './vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import AddExpriences from './AddExpriences';
import { VENDOR_LANGUAGES, VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import {
  getExperiencesObject,
  VendorAllExperiencesAtom,
  VendorExperiencesAtom,
  VendorProfileAtom
} from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';
import VendorPopUp from './common/VendorPopUp';
import AddExpertise from './AddVendor/common/AddExpertise';
import useHandleVendor from './Logic/useHandleVendor';

const optionYearArray = ['1', '1+', '2', '2+', '3', '3+', '4', '4+'].map((val) => ({
  label: val,
  value: val
}));

const AddVendorProfile = ({ data = {} }) => {
  const [isOpenExpriences, setIsOpenExpriences] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenSmeExpertise, setOpenSmeExpertise] = useState(false);
  const [isOpenCrtExpertise, setOpenCrtExpertise] = useState(false);
  const [isOpenCdExpertise, setOpenCdExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const [profileExperience, setProfileExperience] = useRecoilState(VendorAllExperiencesAtom);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const { handleProfilePhoto, getSingleExperience, getProfileExperience } = useHandleVendor();
  const [selectedSmeExpertise, setSelectedSmeExpertise] = useState([]);
  const [selectedCrtExpertise, setSelectedCrtExpertise] = useState([]);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';
  console.info('experiencesData', profileData?.experience);

  const completeExperienceHandler = () => {
    const StartDate = experiencesData?.startMonth?.concat('-', experiencesData?.startYear);
    const start_date = new Date(StartDate);
    const start_timestamp = start_date.getTime() / 1000;
    const EndDate = experiencesData?.endMonth?.concat('-', experiencesData?.endYear);
    const end_date = new Date(EndDate);
    const end_timestamp = end_date.getTime() / 1000;
    const experienceData = {
      vendor_id: vendorId || '',
      title: experiencesData?.title || '',
      email: profileData?.email || '',
      company_name: experiencesData?.companyName || '',
      employement_type: experiencesData?.employeeType || '',
      location: experiencesData?.location || '',
      location_type: experiencesData?.locationType || '',
      start_date: start_timestamp || null,
      end_date: end_timestamp || null,
      status: VENDOR_MASTER_STATUS.active
    };
    setProfileData((prev) => ({ ...prev, experience: [...prev?.experience, experienceData] }));
    setIsOpenExpriences(false);
    setExperiencesData(getExperiencesObject());
  };

  const handleLanguageSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages?.filter((lang) => lang !== value));
    }
  };

  console.info('ayush123', profileExperience);

  const addLanguagesHandler = () => {
    setProfileData({ ...profileData, languages: [...selectedLanguages] });
    setIsOpenLanguage(false);
  };

  const handleAddSmeExpertise = () => {
    setProfileData({ ...profileData, sme_expertises: [...selectedSmeExpertise] });
    setOpenSmeExpertise(false);
  };
  const handleAddCrtExpertise = () => {
    setProfileData({ ...profileData, crt_expertises: [...selectedCrtExpertise] });
    setOpenCrtExpertise(false);
  };
  const handleAddCdExpertise = () => {
    setProfileData({ ...profileData, content_development: [...selectedCdExpertise] });
    setOpenCdExpertise(false);
  };

  return (
    <div className={`${styles.inputMain}`}>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">First name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'firstName',
              placeholder: 'Enter First Name',
              value: profileData.firstName
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Last name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'lastName',
              placeholder: 'Enter Last Name',
              value: profileData.lastName
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Email id: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'email',
              placeholder: 'Enter email address',
              type: 'email',
              value: profileData.email
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Contact number: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'contactNumber',
              placeholder: 'Enter contact number',
              value: profileData.contactNumber
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Description: </label>

          <LabeledTextarea
            inputOptions={{
              inputName: 'description',
              placeholder: 'Describe your service on 160 characters',
              rows: 5,
              maxLength: 160,
              value: profileData.description
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="profileImage">Upload photo: </label>
          <BrowseAndUpload
            styleClass={`${styles.uploadImage}`}
            styleClassBtn={`${styles.uploadButton}`}
            title="Drag and drop"
            handleFileUpload={handleProfilePhoto}
            handleRemove={() => setProfileData({ ...profileData, profileImage: null })}
            previewData={{
              fileName: profileData?.profileImage?.name,
              filePath: profileData?.profileImage
            }}
            inputName="profileImage"
            // hideRemoveBtn={true}
            isActive={profileData?.profileImage}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="expriences">Years of experience: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'experienceYear',
              placeholder: 'Select Years',
              value: {
                label: profileData.experienceYear,
                value: profileData.experienceYear
              },
              options: optionYearArray
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData, 'experienceYear')}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Experience: </label>
          {!profileData?.experience?.length ? (
            <IconButton
              text="Add experiences"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenExpriences(true)}
            />
          ) : (
            <>
              {profileExperience?.map((exp) => (
                <IconButton
                  text={
                    typeof exp === 'string' ? exp : exp?.title + ' ' + '@' + ' ' + exp?.company_name
                  }
                  styleClasses={`${styles.exButton}`}
                  imgUrl="/images/svg/business_center.svg"
                  handleClick={() => {
                    setIsOpenExpriences(true);
                    getProfileExperience(profileData.profileId);
                    getSingleExperience(exp.PfId, exp.ExpId);
                  }}
                />
              ))}
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setIsOpenExpriences(true)}
              />
            </>
          )}
        </div>

        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Language: </label>
          {!profileData?.languages?.length ? (
            <IconButton
              text="Add language"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenLanguage(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {profileData?.languages?.map((data, index) => (
                  <div className={`${styles.singleLanguage}`} key={index}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={data}
                      value={data}
                      isChecked={true}
                    />
                  </div>
                ))}
              </div>
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setIsOpenLanguage(true)}
              />
            </>
          )}
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Subject matter expertise:</label>
          {!profileData?.sme_expertises?.length ? (
            <IconButton
              text="Add subject matter expertise"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setOpenSmeExpertise(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {profileData?.sme_expertises?.map((data, index) => (
                  <div className={`${styles.singleLanguage}`} key={index}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={data}
                      value={data}
                      isChecked={true}
                    />
                  </div>
                ))}
              </div>
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setOpenSmeExpertise(true)}
              />
            </>
          )}
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Classroom Training Expertise:</label>
          {!profileData?.crt_expertises?.length ? (
            <IconButton
              text="Add classroom training expertise"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setOpenCrtExpertise(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {profileData?.crt_expertises?.map((data, index) => (
                  <div className={`${styles.singleLanguage}`} key={index}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={data}
                      value={data}
                      isChecked={true}
                    />
                  </div>
                ))}
              </div>
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setOpenCrtExpertise(true)}
              />
            </>
          )}
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Content Development Expertise:</label>
          {!profileData?.content_development?.length ? (
            <IconButton
              text="Add content development expertise"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setOpenCdExpertise(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {profileData?.content_development?.map((data, index) => (
                  <div className={`${styles.singleLanguage}`} key={index}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={data}
                      value={data}
                      isChecked={true}
                    />
                  </div>
                ))}
              </div>
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setOpenCdExpertise(true)}
              />
            </>
          )}
        </div>
      </div>
      <div className={`${styles.addProfileContainer}`}>
        <LabeledRadioCheckbox
          label="is Speaker"
          type="checkbox"
          name="isSpeaker"
          isChecked={profileData?.isSpeaker}
          changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
        />
      </div>

      <VendorPopUp
        open={isOpenExpriences}
        title="Add experience"
        popUpState={[isOpenExpriences, setIsOpenExpriences]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeExperienceHandler }}
        isFooterVisible={true}>
        <AddExpriences />
      </VendorPopUp>
      <div className={`${styles.hr}`}></div>
      <VendorPopUp
        open={isOpenSmeExpertise}
        title="Add Subject matter expertise"
        popUpState={[isOpenSmeExpertise, setOpenSmeExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddSmeExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedSmeExpertise}
          setSelectedExpertise={setSelectedSmeExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenCrtExpertise}
        title="Add Classroom Training Expertise"
        popUpState={[isOpenCrtExpertise, setOpenCrtExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddCrtExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedCrtExpertise}
          setSelectedExpertise={setSelectedCrtExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenCdExpertise}
        title="Add Content Development Expertise"
        popUpState={[isOpenCdExpertise, setOpenCdExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddCdExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedCdExpertise}
          setSelectedExpertise={setSelectedCdExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenLanguage}
        title="Add language"
        popUpState={[isOpenLanguage, setIsOpenLanguage]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: addLanguagesHandler }}
        isFooterVisible={true}>
        {VENDOR_LANGUAGES?.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`} key={index}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={data}
                value={data}
                isChecked={
                  selectedLanguages?.includes(data) || profileData?.languages?.includes(data)
                }
                changeHandler={handleLanguageSelection}
              />
            </div>
          );
        })}
      </VendorPopUp>
    </div>
  );
};

export default AddVendorProfile;
