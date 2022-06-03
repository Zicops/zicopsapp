import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import Button from '../../../../../common/Button';
import LabeledRadioCheckbox from '../../../../../common/FormComponents/LabeledRadioCheckbox';
import useHandleQuestions from '../../Logic/useHandleQuestions';
import styles from './addQuestionMetaData.module.scss';
import ExistingQuestion from './existingQuestion';
import QuestionTable from './QuestionTable';
import UploadNewQuestionBank from './uploadNew';

export default function AddQuestionMetaData({ sectionId, editData }) {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editQuestionMetaData')
  );
  const [isUploadSelected, setIsUploadSelected] = useState(false);

  const {
    metaData,
    setMetaData,
    questionBankOptions,
    isMetaDataReady,
    handleSelectedQuestions,
    showQuestionTable,
    setShowQuestionTable,
    isFixedDataReady,
    addMetaData,
    updateMetaData
  } = useHandleQuestions(sectionId);

  useEffect(() => {
    if (editData?.id) setMetaData(editData);
  }, [editData]);

  return (
    <>
      {!showQuestionTable && (
        <>
          <div className={`${styles.radioContainer} ${styles.inputField}`}>
            <label>Question Selection:</label>
            <LabeledRadioCheckbox
              type="radio"
              label="Existing Question Bank"
              name="selection"
              isDisabled={!!editData?.id}
              isChecked={!isUploadSelected}
              changeHandler={() => setIsUploadSelected(false)}
            />
            <LabeledRadioCheckbox
              type="radio"
              label="Upload New"
              name="selection"
              isDisabled={!!editData?.id}
              isChecked={isUploadSelected}
              changeHandler={() => setIsUploadSelected(true)}
            />
          </div>

          {isUploadSelected ? (
            <UploadNewQuestionBank />
          ) : (
            <ExistingQuestion
              questionBankOptions={questionBankOptions}
              metaData={metaData}
              setMetaData={setMetaData}
            />
          )}
        </>
      )}

      {!!showQuestionTable && (
        <QuestionTable
          questionBankId={metaData.qbId}
          handleSelectedQuestions={handleSelectedQuestions}
        />
      )}

      <section className={`${styles.footerBtns}`}>
        {showQuestionTable ? (
          <Button
            text="Save"
            clickHandler={() => (metaData.id ? updateMetaData() : addMetaData())}
            isDisabled={!isFixedDataReady}
          />
        ) : (
          <Button
            text={
              metaData?.retrieve_type === 'random' ? (metaData?.id ? 'Update' : 'Save') : 'Next'
            }
            clickHandler={() => {
              if (metaData?.retrieve_type === 'random') {
                if (metaData?.id) return updateMetaData();
                return addMetaData();
              }

              setShowQuestionTable(true);
            }}
            isDisabled={!isMetaDataReady}
          />
        )}
        <Button
          text="Cancel"
          clickHandler={() => {
            udpateAddQuestionMetaDataPopUp(false);
            udpateEditQuestionMetaDataPopUp(false);
          }}
        />
      </section>
    </>
  );
}
