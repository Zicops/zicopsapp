import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../../helper/common.helper';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import Button from '../../../../../common/Button';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../common/FormComponents/LabeledInput';
import useAddCustomSection from '../../Logic/useAddCustomSection';
import styles from '../../questionPaperTab.module.scss';

export default function AddCustomSection({ editData }) {
  const [addSectionPopUp, udpateSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [editSectionPopUp, udpateEditSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editCustomSection')
  );
  const { customSection, setCustomSection, isCustomSectionReady, addNewSection, updateSection } =
    useAddCustomSection();

  useEffect(() => {
    if (editData) setCustomSection(editData);
  }, [editData]);

  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' }
  ];

  return (
    <div className={`${styles.popUpFormContainer}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Section Name',
          placeholder: 'Enter section name in less than 60 characters',
          value: customSection.name,
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, customSection, setCustomSection)}
      />
      <LabeledInput
        inputOptions={{
          inputName: 'description',
          label: 'Description',
          placeholder: 'Enter description in less than 160 characters',
          value: customSection.description,
          maxLength: 160
        }}
        changeHandler={(e) => changeHandler(e, customSection, setCustomSection)}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'difficulty_level',
          label: 'Difficulty Level:',
          placeholder: 'Select Difficulty Level',
          value: { label: customSection.difficulty_level, value: customSection.difficulty_level },
          options: difficultyOptions
        }}
        changeHandler={(e) => changeHandler(e, customSection, setCustomSection, 'difficulty_level')}
      />

      <section className={`${styles.footerBtns}`}>
        <Button
          text="Cancel"
          clickHandler={() => {
            udpateSectionPopUp(false);
            udpateEditSectionPopUp(false);
          }}
        />
        <Button
          text={customSection.id ? 'Update' : 'Add'}
          clickHandler={customSection.id ? updateSection : addNewSection}
          isDisabled={!isCustomSectionReady}
          styleClass={isCustomSectionReady ? 'bg-primary' : ''}
        />
      </section>
    </div>
  );
}
