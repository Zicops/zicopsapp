import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import React from 'react';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import styles from '../../vendorComps.module.scss';
const AddExpertise = ({ expertiseValue, setExpertise }) => {
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
                    <LabeledRadioCheckbox type="checkbox" label={value.Name} />
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
