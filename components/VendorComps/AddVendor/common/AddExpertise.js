import { useEffect, useState } from 'react';
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
      setSelectedExpertise(selectedExpertise?.filter((lang) => lang !== value));
    }
  };

  const { catSubCat } = useHandleCatSubCat();

  const [catSubCatFiltered, setCatSubCatFiltered] = useState(null);
  useEffect(() => {
    setCatSubCatFiltered(catSubCat);
  }, []);

  if (!catSubCat.isDataLoaded) {
    return (
      <div className={`${styles.flexCenter}`} style={{ minHeight: '65vh' }}>
        <Loader customStyles={{ height: '100%', background: 'transparent', overflow: 'hidden' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '65vh' }}>
      <SearchBar
        inputDataObj={{
          inputOptions: {
            inputName: 'filter',
            placeholder: 'Search...',
            value: expertiseValue
          },
          changeHandler: (e) => {
            const query = e.target.value;
            setExpertise(query);
            const tempSubCat = catSubCat?.subCat?.filter((obj) => {
              return obj.Name.toLowerCase().includes(query.toLowerCase());
            });
            // const tempCat = catSubCat?.cat?.filter((obj) => {
            //   return obj.Name.toLowerCase().includes(query.toLowerCase());
            // });
            setCatSubCatFiltered({
              // cat: tempCat,
              ...catSubCatFiltered,
              subCat: tempSubCat
            });
          }
        }}
        styleClass={`${styles.expertiseSearchBar}`}
      />
      {catSubCatFiltered?.cat?.map((data, index) => {
        // Change this condition to hide category names on search too.
        if (!catSubCatFiltered.subCatGrp?.[data.id]?.subCat?.length) return;
        return (
          <div className={`${styles.expertise1}`} key={data.Name}>
            <h3>{data.Name}</h3>
            {catSubCatFiltered?.subCat?.map((value) => {
              if (value.CatId === data.id) {
                return (
                  <div className={`${styles.expertiseCheckbox}`} key={value.Name}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={value.Name}
                      value={value.Name}
                      isChecked={selectedExpertise?.includes(value.Name)}
                      changeHandler={handleExpretiseSelection}
                    />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AddExpertise;
