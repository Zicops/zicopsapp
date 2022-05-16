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

  const { newMetaData, setNewMetaData, isNewMetaData, handleSaveMetaData } =
    useAddQuestionMetaData();

  return (
    <>
      <h2>Add Question Meta Data</h2>
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

      {isUploadSelected ? (
        <UploadNewQuestionBank />
      ) : (
        <ExistingQuestion newMetaData={newMetaData} setNewMetaData={setNewMetaData} />
      )}

      <section className={`${styles.footerBtns}`}>
        <Button
          text="Add"
          clickHandler={handleSaveMetaData}
          // isDisabled={!isNewCustomSectionReady}
        />
        <Button text="Cancel" clickHandler={() => udpateAddQuestionMetaDataPopUp(false)} />
      </section>
      {/* <Buttons
        handleCancel={() => udpateAddQuestionMetaDataPopUp(false)}
        handleSave={handleSaveMetaData}
        submitText="Save"
      /> */}
    </>
  );
}
