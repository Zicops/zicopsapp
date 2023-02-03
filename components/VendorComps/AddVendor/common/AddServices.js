import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import IconButton from '@/components/common/IconButton';
import { changeHandler } from '@/helper/common.helper';
import { VENDOR_FILE_FORMATS, VENDOR_LANGUAGES } from '@/helper/constants.helper';
import { useState } from 'react';
import AddVendorProfile from '../../AddVendorProfile';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import ProfileManageVendor from '../../ProfileMangeVendor';
import styles from '../../vendorComps.module.scss';
import VendorPopUp from '../../common/VendorPopUp';
// export default function AddServices({ data, setData = () => {}, inputName }) {
//   const [popupState, setPopupState] = useState(false);
//   const [isOpenProflie, setIsOpenProfile] = useState(false);
//   const [expertiseSearch, setExpertiseSearch] = useState('');
//   const [showCompleteProfile, setCompleteProfile] = useState(false);

export default function AddServices({ data, setData = () => {}, inputName }) {
  const [popupState, setPopupState] = useState(false);
  const [isOpenProflie, setIsOpenProfile] = useState(false);
  const [expertisePopupState, setExpertisePopupState] = useState(false);
  const [languagePopupState, setLanguagePopupState] = useState(false);
  const [opdeliverablePopupState, setOPDeliverablePopupState] = useState(false);
  const [samplePopupState, setSamplePopupState] = useState(false);
  const [showCompleteProfile, setCompleteProfile] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');

  const fileFormatArray = ['PDF', 'PPT', 'Consultancy'].map((val) => ({
    label: val,
    value: val
  }));

  const currency = ['INR', 'USD', 'Euros', 'Pound'].map((val) => ({
    label: val,
    value: val
  }));

  const unit = ['Per hour', 'Per day', 'Per month', 'Per module'].map((val) => ({
    label: val,
    value: val
  }));

  const clickHandler = () => {
    setPopupState(true);
  };

  const clickHandlerExpertise = () => {
    setExpertisePopupState(true);
  };

  const clickHandlerLanguage = () => {
    setLanguagePopupState(true);
  };

  const clickHandlerOPDeliverable = () => {
    setOPDeliverablePopupState(true);
  };

  const clickHandlerSample = () => {
    setSamplePopupState(true);
  };

  const addProfileHandler = () => {
    setIsOpenProfile(true);
  };
  const completeProfileHandler = () => {
    setCompleteProfile(true);
  };

  return (
    <>
      <div className={`${styles.addServiceContainer}`}>
        <div>
          <LabeledRadioCheckbox
            label="Applicable"
            type="checkbox"
            name={inputName}
            isChecked={data[`${inputName}`]}
            changeHandler={(e) => changeHandler(e, data, setData)}
          />
        </div>
        <div className={`${styles.serviceDescriptionExpertise}`}>
          <div className={`${styles.serviceDescription}`}>
            <label for="serviceDescription">Description: </label>
            <LabeledTextarea
              inputOptions={{
                inputName: 'serviceDescription',
                placeholder: 'Describe your service in 160 characters',
                value: data.serviceDescription
              }}
              changeHandler={(e) => changeHandler(e, data, setData)}
            />
          </div>

          <div className={`${styles.addExpertise}`}>
            <label for="serviceDescription">Add Expertise: </label>
            <IconButton
              text="Add Expertise"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={clickHandlerExpertise}
            />
          </div>
        </div>
        <div className={`${styles.addLanguageOPFormat}`}>
          <div className={`${styles.addLanguages}`}>
            <label for="serviceDescription">Language: </label>
            <IconButton
              text="Add language"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={clickHandlerLanguage}
            />
          </div>
          <div className={`${styles.addOPFormat}`}>
            <label for="serviceDescription">O/P deliverable formats: </label>
            <IconButton
              text="Add O/P deliverable formats"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={clickHandlerOPDeliverable}
            />
          </div>
        </div>
        <div className={`${styles.addSampleFilesProfiles}`}>
          <div className={`${styles.addSampleFiles}`}>
            <label for="sampleFiles">Sample Files: </label>
            <IconButton
              text="Add sample files"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={clickHandlerSample}
            />
          </div>
          <div className={`${styles.addProfiles}`}>
            <label for="profiles">Add profiles: </label>
            <IconButton
              text="Add profiles"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={addProfileHandler}
            />
          </div>
        </div>
      </div>
      <VendorPopUp
        open={expertisePopupState}
        popUpState={[expertisePopupState, setExpertisePopupState]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <p>Add expertise/s</p>
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
        open={isOpenProflie}
        title="Add profile"
        popUpState={[isOpenProflie, setIsOpenProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeProfileHandler }}
        isFooterVisible={true}>
        <AddVendorProfile />
      </VendorPopUp>

      <VendorPopUp
        open={showCompleteProfile}
        title="Add Profile"
        popUpState={[showCompleteProfile, setCompleteProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <ProfileManageVendor />
      </VendorPopUp>
      <VendorPopUp
        open={languagePopupState}
        popUpState={[languagePopupState, setLanguagePopupState]}
        size="small"
        title="Add language"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        {VENDOR_LANGUAGES.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`}>
              <LabeledRadioCheckbox type="checkbox" label={data} />
            </div>
          );
        })}
      </VendorPopUp>
      <VendorPopUp
        open={opdeliverablePopupState}
        popUpState={[opdeliverablePopupState, setOPDeliverablePopupState]}
        size="medium"
        title="Add O/P deliverable formats"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <h4>Select Format</h4>
        {VENDOR_FILE_FORMATS.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`}>
              <LabeledRadioCheckbox type="checkbox" label={data} />
            </div>
          );
        })}
        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Or </h3>
        <label>Other:</label>
        <LabeledInput
          inputOptions={{
            inputName: 'fileFormat',
            placeholder: 'Enter O/P deliverable format name'
          }}
          styleClass={`${styles.opdInput}`}
        />
        <IconButton
          text="Create"
          imgUrl="/images/edit.png"
          styleClass="btnGrey"
          styleClasses={`${styles.opdCreateButton}`}
        />
      </VendorPopUp>
      <VendorPopUp
        open={samplePopupState}
        popUpState={[samplePopupState, setSamplePopupState]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <h1>Add Sample</h1>
        <div className={`${styles.sampleName}`}>
          <label>Sample name:</label>
          <LabeledInput inputOptions={{ inputName: 'sampleName' }} />
        </div>
        <div className={`${styles.descriptionSample}`}>
          <div className={`${styles.description}`}>
            <label>Description</label>
            <LabeledTextarea inputOptions={{ inputName: 'sampleDescription' }} />
          </div>
          <div className={`${styles.sample}`}>
            <label>Add sample file: </label>
            <BrowseAndUpload styleClassBtn={`${styles.button}`} title="Drag & Drop" />
          </div>
        </div>
        <div className={`${styles.file}`}>
          <label>File type:</label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'FileType',
              placeholder: 'Select File Type',
              options: fileFormatArray
            }}
            styleClass={`${styles.fileFormatDropDown}`}
          />
        </div>
        <div className={`${styles.rateCurrencyUnit}`}>
          <div className={`${styles.rate}`}>
            <label>Rate:</label>
            <LabeledInput inputOptions={{ inputName: 'rate', placeholder: 'Enter Rate' }} />
          </div>
          <div className={`${styles.currency}`}>
            <label>Currency:</label>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'Currency',
                placeholder: 'Select Currency',
                options: currency
              }}
              styleClass={`${styles.currencyDropDown}`}
            />
          </div>
          <div className={`${styles.unit}`}>
            <label>Unit:</label>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'Currency',
                placeholder: 'Select Unit',
                options: unit
              }}
              styleClass={`${styles.unitDropDown}`}
            />
          </div>
        </div>
      </VendorPopUp>
    </>
  );
}
