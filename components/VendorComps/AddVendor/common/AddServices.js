import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useRecoilState } from 'recoil';
import { VendorServicesAtom } from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import IconBtn from '@/components/common/IconBtn';
import IconButton from '@/components/common/IconButton';
import { useState } from 'react';
import VendorPopUp from '../../VendorPopUp';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import Search from '@/components/Search';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import { VENDOR_LANGUAGES, VENDOR_FILE_FORMATS } from '@/helper/constants.helper';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';

export default function AddServices({ data, setData = () => {}, inputName }) {
  const [expertisePopupState, setExpertisePopupState] = useState(false);
  const [languagePopupState, setLanguagePopupState] = useState(false);
  const [opdeliverablePopupState, setOPDeliverablePopupState] = useState(false);
  const [samplePopupState, setSamplePopupState] = useState(false);

  const [expertiseSearch, setExpertiseSearch] = useState('');

  const fileFormatArray = [
    { value: 'PDF', label: 'PDF' },
    { value: 'PPT', label: 'PPT' },
    { value: 'Consultancy', label: 'Consultancy' }
  ];

  const currency = [
    { value: 'INR', label: 'INR' },
    { value: 'USD', label: 'USD' },
    { value: 'Euros', label: 'Euros' },
    { value: 'Pound', label: 'Pound' }
  ];

  const unit = [
    { value: 'Per hour', label: 'Per hour' },
    { value: 'Per day', label: 'Per day' },
    { value: 'Per month', label: 'Per month' },
    { value: 'Per module', label: 'Per module' }
  ];

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
        open={languagePopupState}
        popUpState={[languagePopupState, setLanguagePopupState]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <p>Add Language/s</p>
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
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add' }}>
        <h2>Add O/P deliverable formats</h2>
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
        <div>
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
            <BrowseAndUpload styleClass={`${styles.uploadSampleFile}`} />
          </div>
        </div>
        <div>
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
