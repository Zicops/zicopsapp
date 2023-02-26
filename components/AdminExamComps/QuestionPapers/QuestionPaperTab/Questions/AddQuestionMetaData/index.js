import ToolTip from '@/components/common/ToolTip';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_FIXED_QUESTION,
  GET_QUESTION_BANK_QUESTIONS,
  queryClient
} from '../../../../../../API/Queries';
import { DIFFICULTY } from '../../../../../../helper/utils.helper';
import {
  getFixedQuestionObject,
  getQuestionMetaDataObject,
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
  const { isDemo, isDev } = useRecoilValue(FeatureFlagsAtom);

  const [qbQuestions, setQbQuestions] = useState(null);
  const [qbFilteredQuestions, setQbFilteredQuestions] = useState(null);
  const [usedQuestionsCount, setUsedQuestionsCount] = useState(0);
  const [isUploadSelected, setIsUploadSelected] = useState(false);
  const [originalQbId, setOriginalQbId] = useState(null);

  // set inital qbid
  useEffect(() => {
    if (!originalQbId) return setOriginalQbId(metaData.qbId);
  }, [metaData.qbId]);

  // reset on first load
  useEffect(() => {
    setMetaData(getQuestionMetaDataObject({ sectionId }));
  }, []);

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

      const questionsArr = data.getQuestionBankQuestions?.filter((q) => q?.Status === 'Y') || [];
      if (questionsArr?.length)
        setQbQuestions(sortArrByKeyInOrder(questionsArr, 'CreatedAt', false));
    });
  }, [metaData.qbId]);

  // set available question length
  useEffect(() => {
    if (!qbQuestions) return;

    // questionPaperTabData.mappedQb.some(qb);
    const totalQuestions = questionPaperTabData.mappedQb.reduce((total, mapping, index) => {
      if (
        mapping?.qbId === metaData?.qbId &&
        metaData?.difficulty_level === mapping?.difficulty_level
      ) {
        total += mapping?.total_questions || 0;
      }

      return total;
    }, 0);
    const alreadyUsedQuestions = !metaData?.difficulty_level
      ? questionPaperTabData?.mappedQb?.find((qbMap) => qbMap?.qbId === metaData?.qbId)
          ?.total_questions || 0
      : 0;

    setUsedQuestionsCount(totalQuestions + alreadyUsedQuestions);

    setQbFilteredQuestions(
      qbQuestions.filter((q) => {
        if (!metaData?.difficulty_level) return true;

        return DIFFICULTY[metaData?.difficulty_level]?.includes(q.Difficulty);
      })
    );
  }, [qbQuestions, metaData?.difficulty_level, metaData?.qbId]);

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
              label={
                <ToolTip title="Select questions from existing question bank" placement="bottom">
                  <span>Existing Question Bank</span>
                </ToolTip>
              }
              name="selection"
              isDisabled={!!editData?.id}
              isChecked={!isUploadSelected}
              changeHandler={() => setIsUploadSelected(false)}
            />
            <LabeledRadioCheckbox
              type="radio"
              label={
                <ToolTip
                  title="Create new question bank and then select questions for this paper"
                  placement="right">
                  <span>Upload New</span>
                </ToolTip>
              }
              name="selection"
              // isDisabled={!!editData?.id}
              isDisabled={isDev || isDemo ? false : true}
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
              totalQuestions={
                qbFilteredQuestions?.length > usedQuestionsCount
                  ? qbFilteredQuestions?.length - usedQuestionsCount
                  : 0
              }
              setMetaData={setMetaData}
              isEdit={!!editData?.id}
            />
          )}
        </>
      )}

      {!!showQuestionTable && (
        <QuestionTable
          metaData={metaData}
          qbQuestions={qbFilteredQuestions}
          selectedQb={questionBankOptions.filter((qb) => qb?.id === metaData?.qbId)[0]}
          selectedQuestionIds={selectedQuestionIds}
          setSelectedQuestionIds={setSelectedQuestionIds}
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
            styleClass={isFixedDataReady ? 'bg-primary' : ''}
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
            styleClass={isMetaDataReady ? 'bg-primary' : ''}
            isDisabled={!isMetaDataReady}
          />
        )}
      </section>
    </>
  );
}
