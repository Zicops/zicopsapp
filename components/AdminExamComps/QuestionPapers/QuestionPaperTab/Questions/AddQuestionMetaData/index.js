import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import Button from '../../../../../common/Button';
import LabeledRadioCheckbox from '../../../../../common/FormComponents/LabeledRadioCheckbox';
import FooterBtns from '../../../../common/FooterBtns';
import useAddQuestionMetaData from '../../Logic/useAddQuestionMetaData';
import styles from './addQuestionMetaData.module.scss';
import ExistingQuestion from './existingQuestion';
import UploadNewQuestionBank from './uploadNew';

export default function AddQuestionMetaData() {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [isUploadSelected, setIsUploadSelected] = useState(false);

  const { newMetaData, setNewMetaData, isNewMetaDataReady, handleSaveMetaData } =
    useAddQuestionMetaData();
  return (
    <>
      <div className={`${styles.radioContainer} ${styles.inputField}`}>
        <label>Question Selection:</label>
        <LabeledRadioCheckbox
          type="radio"
          label="Existing Question Bank"
          name="selection"
          isChecked={!isUploadSelected}
          changeHandler={() => setIsUploadSelected(false)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Upload New"
          name="selection"
          isChecked={isUploadSelected}
          changeHandler={() => setIsUploadSelected(true)}
        />
      </div>

      {isUploadSelected ? <UploadNewQuestionBank /> : <ExistingQuestion />}

      <section className={`${styles.footerBtns}`}>
        <Button text="Add" clickHandler={handleSaveMetaData} isDisabled={!isNewMetaDataReady} />
        <Button text="Cancel" clickHandler={() => udpateAddQuestionMetaDataPopUp(false)} />
      </section>
    </>
  );
}
