import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import Loader from '@/components/common/Loader';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { isWordIncluded } from '@/helper/utils.helper';
import { useEffect, useState } from 'react';
import styles from './../trainingComps.module.scss';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState } from 'recoil';
import { TrainerExpertiseListAtom, TrainerDataAtom } from '@/state/atoms/trainingManagement.atoms';

const AddTrainingExpertise = ({ individualTrainerData, isView }) => {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);
  const [expertiseSearchValue, setExpertiseSearchValue] = useState('');

  const handleExpertiseSelection = (e) => {
    const { value, checked } = e.target;
    const expertiseArr = trainerData?.expertise?.filter((exp) => exp);
    if (checked) {
      expertiseArr?.push(value);
      setTrainerData((prev) => ({ ...prev, expertise: expertiseArr }));
    } else {
      setTrainerData((prev) => ({
        ...prev,
        expertise: prev?.expertise?.filter((expertise) => expertise !== value),
      }));
    }
  };

  useEffect(() => {
    if (individualTrainerData != null)
      setTrainerData((prev) => ({ ...prev, expertise: individualTrainerData?.expertise }));
  }, [individualTrainerData]);

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
            placeholder: 'Search Training Expertise...',
            value: expertiseSearchValue,
            isDisabled: isView,
          },
          changeHandler: (e) => setExpertiseSearchValue(e.target.value),
        }}
        styleClass={`${styles.expertiseSearchBar}`}
      />
      {Object.values(catSubCat?.subCatGrp)?.map((obj) => {
        const filteredSubcat = obj?.subCat?.filter((sc) =>
          isWordIncluded(sc?.Name, expertiseSearchValue),
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
                    isChecked={trainerData?.expertise?.includes(subCat.Name)}
                    changeHandler={handleExpertiseSelection}
                    isDisabled={isView}
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
