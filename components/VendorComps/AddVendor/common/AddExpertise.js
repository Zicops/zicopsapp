import { useEffect, useState } from 'react';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { VendorAllExpertise } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import styles from '../../vendorComps.module.scss';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import Loader from '@/components/common/Loader';
import { isWordIncluded } from '@/helper/utils.helper';
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
      setSelectedExpertise(selectedExpertise?.filter((lang) => lang !== value));
    }
  };

  const { catSubCat } = useHandleCatSubCat();

  if (!catSubCat.isDataLoaded) {
    return (
      <div className={`${styles.flexCenter}`} style={{ minHeight: '66vh' }}>
        <Loader customStyles={{ height: '100%', background: 'transparent', overflow: 'hidden' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '66vh' }}>
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
      {Object.values(catSubCat?.subCatGrp)?.map((obj) => {
        const filteredSubcat = obj?.subCat?.filter((sc) =>
          isWordIncluded(sc?.Name, expertiseValue)
        );
        if (!filteredSubcat.length) return;
        return (
          <div className={`${styles.expertise1}`} key={obj?.cat?.Name}>
            <h3>{obj?.cat?.Name}</h3>
            {filteredSubcat?.map((subCat) => {
              return (
                <div className={`${styles.expertiseCheckbox}`} key={subCat.Name}>
                  <LabeledRadioCheckbox
                    type="checkbox"
                    label={subCat.Name}
                    value={subCat.Name}
                    isChecked={selectedExpertise?.includes(subCat.Name)}
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
