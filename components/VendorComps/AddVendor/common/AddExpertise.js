import { useState } from 'react';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { VendorAllExpertise } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { cat, subCat } from '../../Logic/vendorComps.helper';
import styles from '../../vendorComps.module.scss';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import Loader from '@/components/common/Loader';
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

  const { catSubCat } = useHandleCatSubCat();

  // const handleQuery = (event) => {
  //   const query = event.target.value;
  //   // setSearchQuery(query)
  //   if (query.length > 0) {
  //     setSearched(true);
  //     setSearchedData([]);
  //     const temp = subCat.filter((obj) => {
  //       return obj.Name.toLowerCase().includes(query.toLowerCase());
  //     });
  //     setSearchedData(temp);
  //   } else setSearched(false);
  // };

  if (!catSubCat.isDataLoaded)
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

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
      {catSubCat?.cat?.map((data, index) => {
        if (!catSubCat.subCatGrp?.[data.id]?.subCat?.length) return;
        return (
          <div className={`${styles.expertise1}`}>
            <h3>{data.Name}</h3>
            {catSubCat?.subCat?.map((value) => {
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
