import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import React, { useState } from 'react';
import styles from './vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import AddExpriences from './AddExpriences';
import { VENDOR_LANGUAGES } from '@/helper/constants.helper';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { cat, subCat } from './Logic/vendorComps.helper';
import { useRecoilState } from 'recoil';
import { VendorProfileAtom } from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';
import VendorPopUp from './common/VendorPopUp';

const optionYearArray = ['1', '1+', '2', '2+', '3', '3+', '4', '4+'].map((val) => ({
  label: val,
  value: val
}));

const AddVendorProfile = ({ data = {} }) => {
  const [isOpenExpriences, setIsOpenExpriences] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenExpertise, setOpenExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [experienceYear, setExpericeYear] = useState(null);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const handleClick = () => {};

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
          <label for="vendorName">Upload photo: </label>
          <BrowseAndUpload
            styleClass={`${styles.uploadImage}`}
            styleClassBtn={`${styles.uploadButton}`}
            title="Drag and drop"
            handleFileUpload={() => {}}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Years of experience: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'Select Years',
              value: data?.experience || experienceYear,
              options: optionYearArray
            }}
            changeHandler={(val) => setExpericeYear(val)}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Experience: </label>
          <IconButton
            text="Add experiences"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={() => setIsOpenExpriences(true)}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Language: </label>
          <IconButton
            text="Add language"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={() => setIsOpenLanguage(true)}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Subject matter expertise:</label>
          <IconButton
            text="Add subject matter expertise"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={() => setOpenExpertise(true)}
          />
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
        submitBtn={{ name: 'Done', handleClick: handleClick }}
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
        submitBtn={{ name: 'Add', handleClick: handleClick }}
        isFooterVisible={true}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search...',
              value: expertiseSearch
            },
            changeHandler: (e) => setExpertiseSearch(e.target.value)
          }}
          styleClass={`${styles.expertiseSearchBar}`}
        />
        {cat.map((data, index) => {
          return (
            <div className={`${styles.expertise1}`}>
              <h3>{data.Name}</h3>
              {subCat.map((value, index) => {
                if (value.CatId === data.id)
                  return (
                    <div className={`${styles.expertiseCheckbox}`}>
                      <LabeledRadioCheckbox type="checkbox" label={value.Name} />
                    </div>
                  );
              })}
            </div>
          );
        })}
      </VendorPopUp>
      <VendorPopUp
        open={isOpenLanguage}
        title="Add language"
        popUpState={[isOpenLanguage, setIsOpenLanguage]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleClick }}
        isFooterVisible={true}>
        <p>Add Language/s</p>
        {VENDOR_LANGUAGES.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`}>
              <LabeledRadioCheckbox type="checkbox" label={data} />
            </div>
          );
        })}
      </VendorPopUp>
    </div>
  );
};

export default AddVendorProfile;
