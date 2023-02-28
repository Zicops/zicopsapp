import { useState } from 'react';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { VendorAllExpertise } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import styles from '../../vendorComps.module.scss';
const AddExpertise = ({
  expertiseValue,
  setExpertise,
  selectedExpertise,
  setSelectedExpertise
}) => {
  const handleExpretiseSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedExpertise([...selectedExpertise, value]);
    } else {
      setSelectedExpertise(selectedExpertise.filter((lang) => lang !== value));
    }
  };
  console.info('selectedExpertise', selectedExpertise);
  return (
    <div>
      <SearchBar
        inputDataObj={{
          inputOptions: {
            inputName: 'filter',
            placeholder: 'Search...',
            value: expertiseValue
          },
          changeHandler: (e) => setExpertise(e.target.value)
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
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={value.Name}
                      value={value.Name}
                      isChecked={selectedExpertise.includes(value.Name)}
                      changeHandler={handleExpretiseSelection}
                    />
                  </div>
                );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AddExpertise;
