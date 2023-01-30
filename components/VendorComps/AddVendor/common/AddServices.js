import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useRecoilState } from 'recoil';
import { VendorServicesAtom } from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import IconBtn from '@/components/common/IconBtn';
import IconButton from '@/components/common/IconButton';
import AddVendorPopUp from './AddVendorPopUp';
import { useState } from 'react';
import VendorPopUp from '../../VendorPopUp';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import Search from '@/components/Search';
import { cat, subCat } from '../../Logic/vendorComps.helper';

export default function AddServices({ data, setData = () => {}, inputName }) {
  const [popupState, setPopupState] = useState(false);

  const [expertiseSearch, setExpertiseSearch] = useState('');

  const clickHandler = () => {
    setPopupState(true);
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
              handleClick={clickHandler}
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
            />
          </div>
          <div className={`${styles.addOPFormat}`}>
            <label for="serviceDescription">O/P deliverable formats: </label>
            <IconButton
              text="Add O/P deliverable formats"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
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
            />
          </div>
          <div className={`${styles.addProfiles}`}>
            <label for="profiles">O/P deliverable formats: </label>
            <IconButton
              text="Add profiles"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
            />
          </div>
        </div>
      </div>
      <VendorPopUp
        open={popupState}
        popUpState={[popupState, setPopupState]}
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
            <div>
              <h3>{data.Name}</h3>
              {subCat.filter((value, index) => {
                value.CatId === data.id;
                return <p>{value.Name}</p>;
              })}
            </div>
          );
        })}
      </VendorPopUp>
    </>
  );
}
