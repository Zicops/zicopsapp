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
  }, [catSubCat]);

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

  if (!catSubCat.isDataLoaded) {
    return (
      <div className={`${styles.flexCenter}`} style={{ minHeight: '65vh' }}>
        <Loader customStyles={{ height: '100%', background: 'transparent', overflow: 'hidden' }} />
      </div>
    );
  }

  return (
    <div>
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
            if (query.length > 0) {
              const tempSubCat = catSubCatFiltered?.subCat?.filter((obj) => {
                return obj.Name.toLowerCase().includes(query.toLowerCase());
              });
              const tempCat = catSubCatFiltered?.cat?.filter((obj) => {
                return obj.Name.toLowerCase().includes(query.toLowerCase());
              });
              console.log(tempCat, tempSubCat);
              // setCatSubCatFiltered({
              //   cat: tempCat,
              //   subCat: tempSubCat
              // });
            }
          }
        }}
        styleClass={`${styles.expertiseSearchBar}`}
      />
      {catSubCatFiltered?.cat?.map((data, index) => {
        if (!catSubCatFiltered.subCatGrp?.[data.id]?.subCat?.length) return;
        return (
          <div className={`${styles.expertise1}`}>
            <h3>{data.Name}</h3>
            {catSubCatFiltered?.subCat?.map((value) => {
              if (value.CatId === data.id)
                return (
                  <div className={`${styles.expertiseCheckbox}`}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={value.Name}
                      value={value.Name}
                      isChecked={selectedExpertise?.includes(value.Name)}
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
