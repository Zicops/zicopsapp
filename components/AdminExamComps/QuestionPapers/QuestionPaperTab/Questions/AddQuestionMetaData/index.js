import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_FIXED_QUESTION,
  GET_QUESTION_BANK_QUESTIONS,
  queryClient
} from '../../../../../../API/Queries';
import {
  getFixedQuestionObject,
  QuestionPaperTabDataAtom
} from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../../state/atoms/toast.atom';
import Button from '../../../../../common/Button';
import LabeledRadioCheckbox from '../../../../../common/FormComponents/LabeledRadioCheckbox';
import useHandleQuestions from '../../Logic/useHandleQuestions';
import styles from './addQuestionMetaData.module.scss';
import ExistingQuestion from './existingQuestion';
import QuestionTable from './QuestionTable';
import UploadNewQuestionBank from './uploadNew';

export default function AddQuestionMetaData({ sectionId, editData }) {
  const [loadQBQuestions, { error: errorQBQuestionsData }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );
  const [loadFixedQuestions, { error: errorFixedQuestionsData }] = useLazyQuery(
    GET_FIXED_QUESTION,
    { client: queryClient }
  );

  // custom hook from logic
  const {
    metaData,
    setMetaData,
    questionBankOptions,
    selectedQuestionIds,
    setSelectedQuestionIds,
    isMetaDataReady,
    handleSelectedQuestions,
    showQuestionTable,
    setShowQuestionTable,
    isFixedDataReady,
    addMetaData,
    updateMetaData
  } = useHandleQuestions(sectionId);

  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editQuestionMetaData')
  );
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [qbQuestions, setQbQuestions] = useState(null);
  const [isUploadSelected, setIsUploadSelected] = useState(false);
  const [originalQbId, setOriginalQbId] = useState(null);

  // set inital qbid
  useEffect(() => {
    if (!originalQbId) return setOriginalQbId(metaData.qbId);
  }, [metaData.qbId]);

  // load fixed questions
  useEffect(() => {
    if (!metaData.id) return;
    if (originalQbId !== metaData.qbId) return setSelectedQuestionIds([]);

    loadFixedQuestions({ variables: { mapping_id: metaData.id }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        if (errorFixedQuestionsData)
          return setToastMsg({ type: 'danger', message: 'Fixed Questions load error' });

        if (!data?.getSectionFixedQuestions) return;

        const questionsData = data.getSectionFixedQuestions[0];
        if (!questionsData || metaData.id !== questionsData.SqbId) return;

        setQuestionPaperTabData({
          ...questionPaperTabData,
          currentFixedQuestion: getFixedQuestionObject({
            ...questionsData,
            mappingId: questionsData?.SqbId,
            questionId: questionsData?.QuestionId
          })
        });

        setSelectedQuestionIds(questionsData?.QuestionId?.split(','));
      }
    );
  }, [metaData, originalQbId]);

  // load questions data
  useEffect(() => {
    if (!metaData.qbId) return;

    loadQBQuestions({ variables: { question_bank_id: metaData.qbId } }).then(({ data }) => {
      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions load error' });

      if (data?.getQuestionBankQuestions) {
        const questions = data.getQuestionBankQuestions?.filter((q) => {
          // TODO: add some filter conditon based on difficulty
          // q.Difficulty, metaData.difficulty_level
          return q;
        });
        setQbQuestions(questions);
      }
    });
  }, [metaData.qbId]);

  // reset meta data
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
              totalQuestions={qbQuestions?.length}
              setMetaData={setMetaData}
              isEdit={!!editData?.id}
            />
          )}
        </>
      )}

      {!!showQuestionTable && (
        <QuestionTable
          qbQuestions={qbQuestions}
          selectedQuestionIds={selectedQuestionIds}
          handleSelectedQuestions={handleSelectedQuestions}
        />
      )}

      <section className={`${styles.footerBtns}`}>
        {/* cancel button */}
        <Button
          text="Cancel"
          clickHandler={() => {
            if (showQuestionTable) return setShowQuestionTable(false);

            udpateAddQuestionMetaDataPopUp(false);
            udpateEditQuestionMetaDataPopUp(false);
          }}
        />

        {/* next or save  button */}
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
      </section>
    </>
  );
}
