import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../../helper/common.helper';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import Button from '../../../../../common/Button';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../../common/FormComponents/LabeledInput';
import FooterBtns from '../../../../common/FooterBtns';
import useAddCustomSection from '../../Logic/useAddCustomSection';
import styles from '../../questionPaperTab.module.scss';

export default function AddCustomSection({ handleCancel }) {
  const [customSectionPopUp, udpateCustomSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const {
    newCustomSection,
    setNewCustomSection,
    isNewCustomSectionReady,
    handleSaveCustomSection
  } = useAddCustomSection();

  return (
    <div className={`${styles.popUpFormContainer}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Section Name',
          placeholder: 'Enter section name in less than 60 characters',
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection)}
      />
      <LabeledInput
        inputOptions={{
          inputName: 'description',
          label: 'Description',
          placeholder: 'Enter description in less than 160 characters',
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection)}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'difficulty_level',
          label: 'Difficulty Level:',
          placeholder: 'Select Difficulty Level',
          options: [
            { value: '1', label: 'easy' },
            { value: '2', label: 'hard' }
          ]
        }}
        changeHandler={(e) =>
          changeHandler(e, newCustomSection, setNewCustomSection, 'difficulty_level')
        }
      />

      <section className={`${styles.footerBtns}`}>
        <Button
          text="Add"
          clickHandler={handleSaveCustomSection}
          isDisabled={!isNewCustomSectionReady}
        />
        <Button text="Cancel" clickHandler={() => udpateCustomSectionPopUp(false)} />
      </section>
    </div>
  );
}
