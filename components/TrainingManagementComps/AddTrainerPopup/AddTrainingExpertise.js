import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import Loader from '@/components/common/Loader';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { isWordIncluded } from '@/helper/utils.helper';
import { useEffect } from 'react';
import styles from './../trainingComps.module.scss';

const AddTrainingExpertise = ({
  expertiseValue,
  setExpertise,
  selectedExpertise,
  setSelectedExpertise
}) => {
  //   useEffect(() => {
  //     setExpertise('');
  //   }, []);

  //   const handleExpretiseSelection = (e) => {
  //     const { value, checked } = e.target;
  //     if (checked) {
  //       setSelectedExpertise([...(selectedExpertise || []), value]);
  //     } else {
  //       setSelectedExpertise(selectedExpertise?.filter((lang) => lang !== value));
  //     }
  //   };

  const { catSubCat } = useHandleCatSubCat();

  if (!catSubCat.isDataLoaded) {
    return (
      <Loader customStyles={{ background: 'transparent', overflow: 'hidden', height: '40vh' }} />
    );
  }

  return (
    <div>
      <div className={`${styles.headingContainer}`}>
        <p className={`${styles.heading}`}>Add Training Expertise</p>
        <p className={`${styles.subheading}`}>Add expertise of the selected trainer to proceed</p>
      </div>
      <SearchBar
        inputDataObj={{
          inputOptions: {
            inputName: 'filter',
            placeholder: 'Search...',
            value: expertiseValue
          }
          //   changeHandler: (e) => setExpertise(e.target.value)
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
                    // isChecked={selectedExpertise?.includes(subCat.Name)}
                    // changeHandler={handleExpretiseSelection}
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

export default AddTrainingExpertise;
