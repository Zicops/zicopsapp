import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import React, { useState } from 'react';
import VendorPopUp from '../VendorPopUp';
import styles from '../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import AddExpriences from '../AddExpriences';
import { VENDOR_LANGUAGES } from '@/helper/constants.helper';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { cat, subCat } from '../Logic/vendorComps.helper';
const AddVendorProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenExpriences, setIsOpenExpriences] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenExpertise, setOpenExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');

  const showExperienceHandler = () => {
    setIsOpenExpriences(true);
    // setIsOpen(false);
  };
  const showLanguageHandler = () => {
    setIsOpenLanguage(true);
  };

  const showExpertiseHandler = () => {
    setOpenExpertise(true);
  };
  const handleClick = () => {};

  return (
    <div className={`${styles.inputMain}`}>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">First name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorName',
              placeholder: 'Enter First Name'
              // value: vendorData.vendorName
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Last name: </label>
          {/*<input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor address" />*/}
          <LabeledInput
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Enter Last Name'
              // value: vendorData.vendorAddress
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Email id: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorName',
              placeholder: 'Enter email address'
              // value: vendorData.vendorName
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Contact number: </label>
          {/*<input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor address" />*/}
          <LabeledInput
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Enter contact number'
              // value: vendorData.vendorAddress
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Description: </label>
          {/*<input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor address" />*/}
          <LabeledTextarea
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Describe your service on 160 characters',
              rows: 5,
              maxLength: 160
              //   value: vendorData.vendorAddress
            }}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Upload photo: </label>
          <BrowseAndUpload
            styleClass={`${styles.uploadImage}`}
            styleClassBtn={`${styles.uploadButton}`}
            title="Drag and drop"
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Years of experience: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'Select Years'
            }}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Experience: </label>
          <IconButton
            text="Add experiences"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={showExperienceHandler}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Language: </label>
          <IconButton
            text="Add language"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={showLanguageHandler}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Subject matter expertise:</label>
          <IconButton
            text="Add subject matter expertise"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
            handleClick={showExpertiseHandler}
          />
        </div>
      </div>
      <div className={`${styles.addProfileContainer}`}>
        <LabeledRadioCheckbox
          label="is speaker"
          type="checkbox"
          name="speaker"
          //   isChecked={data[`${inputName}`]}
          //   changeHandler={(e) => changeHandler(e, data, setData)}
        />
        <div className={`${styles.addProfile}`}>
          <IconButton
            text="Add the profile"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
      <div className={`${styles.hr}`}></div>
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
