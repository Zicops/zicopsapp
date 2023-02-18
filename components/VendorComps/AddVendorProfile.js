import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import React, { useState } from 'react';
import styles from './vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import AddExpriences from './AddExpriences';
import { VENDOR_LANGUAGES, VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import {
  VendorAllExperiencesAtom,
  VendorAllExpertise,
  VendorAllLanguages,
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
  const [isOpenExpertise, setOpenExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const [allExperiences, setAllExperiences] = useRecoilState(VendorAllExperiencesAtom);
  const [allLanguages, setAllLanguages] = useRecoilState(VendorAllLanguages);
  const [allExpertise, setAllExpertise] = useRecoilState(VendorAllExpertise);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const { handleProfilePhoto, addUpdateExperience } = useHandleVendor();
  const completeExperienceHandler = () => {
    // const exprienceData = await addUpdateExperience();
    const StartDate = experiencesData?.startMonth?.concat('-', experiencesData?.startYear);
    const start_date = new Date(StartDate);
    const start_timestamp = start_date.getTime() / 1000;
    const EndDate = experiencesData?.endMonth?.concat('-', experiencesData?.endYear);
    const end_date = new Date(EndDate);
    const end_timestamp = end_date.getTime() / 1000;
    setAllExperiences([
      ...allExperiences,
      experiencesData?.title?.trim() + ' @ ' + experiencesData?.companyName?.trim()
    ]);
    setExperiencesData(null);
    setIsOpenExpriences(false);
  };
  console.info('allExperiences', allExperiences);
  const handleLanguageSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== value));
    }
  };

  const addLanguagesHandler = () => {
    setAllLanguages([...selectedLanguages]);
    setIsOpenLanguage(false);
  };

  const handleAddExpertise = () => {
    setAllExpertise([...selectedExpertise]);
    setOpenExpertise(false);
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
              value: data?.firstName || profileData.firstName
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
              value: data?.lastName || profileData.lastName
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
              value: data?.email || profileData.email
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
              value: data?.contact || profileData.contactNumber
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
              value: data?.description || profileData.description
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
                label: data?.experience || profileData.experienceYear,
                value: data?.experience || profileData.experienceYear
              },
              options: optionYearArray
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData, 'experienceYear')}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Experience: </label>
          {!allExperiences?.length ? (
            <IconButton
              text="Add experiences"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenExpriences(true)}
            />
          ) : (
            <>
              {allExperiences?.map((data) => (
                <IconButton
                  text={data}
                  styleClasses={`${styles.exButton}`}
                  imgUrl="/images/svg/business_center.svg"
                  handleClick={() => setIsOpenExpriences(true)}
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
          {!allLanguages?.length ? (
            <IconButton
              text="Add language"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenLanguage(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {allLanguages?.map((data, index) => (
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
          {!allExpertise?.length ? (
            <IconButton
              text="Add subject matter expertise"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setOpenExpertise(true)}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {allExpertise?.map((data, index) => (
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
                handleClick={() => setOpenExpertise(true)}
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
        <div className={`${styles.addProfile}`}>
          <IconButton
            text="Add the profile"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
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
        open={isOpenExpertise}
        title="Add Subject matter expertise"
        popUpState={[isOpenExpertise, setOpenExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedExpertise}
          setSelectedExpertise={setSelectedExpertise}
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
        {VENDOR_LANGUAGES.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`} key={index}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={data}
                value={data}
                isChecked={selectedLanguages.includes(data)}
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
