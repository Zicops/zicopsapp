import { GET_QUESTION_BY_ID, GET_QUESTION_OPTIONS_WITHOUT_ANSWER } from '@/api/Queries';
import AlertBox from '@/components/common/AlertBox';
import Spinner from '@/components/common/Spinner';
import { CrossIcon, TickIcon } from '@/components/common/ZicopsIcons';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../learnerCourseComps.module.scss';
import McqScreen from './McqScreen';

export default function Quiz({
  questionId = {},
  handleSubmit = () => {},
  handleSkip = () => {},
  onAttemptSuccess = () => {},
}) {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqData, setMcqData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const isPreview = router.asPath?.includes('preview');

  // load question and option
  useEffect(() => {
    loadMcqData();

    async function loadMcqData() {
      setIsLoading(true);

      const questionRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [questionId],
      });
      if (!questionRes?.getQuestionsById) {
        setIsLoading(false);
        return setToastMsg({ type: 'danger', message: 'Question Load Error' });
      }

      const _question = questionRes?.getQuestionsById[0];
      const questionData = {
        id: _question?.id,
        name: _question?.Name,
        description: _question?.Description,
        type: _question?.Type,
        difficulty: _question?.Difficulty,
        attachment: _question?.Attachment,
        attachmentType: _question?.AttachmentType,
        hint: _question?.Hint,
        qbId: _question?.QbmId,
        status: _question?.Status,
      };

      const optionRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS_WITHOUT_ANSWER, {
        question_id: questionId,
      });
      if (!optionRes?.getOptionsForQuestions) {
        setIsLoading(false);
        return setToastMsg({ type: 'danger', message: 'Question Load Error' });
      }

      const _option = optionRes?.getOptionsForQuestions[0]?.options;
      const optionData = _option?.map((op) => ({
        id: op?.id,
        qmId: op?.QmId,
        description: op?.Description,
        attachmentType: op?.AttachmentType,
        attachment: op?.Attachment,
        isActive: op?.IsActive,
      }));

      const _mcqData = { question: questionData, options: optionData };

      setMcqData(_mcqData);
      setIsLoading(false);
      return _mcqData;
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className={`${styles.quizContainer}`}>
      <McqScreen
        {...mcqData}
        handleSelect={(op) => setSelectedOption(op)}
        selectedOptionId={selectedOption?.id}>
        <button className={`${styles.mcqBtns} ${styles.skipBtn}`} onClick={handleSkip}>
          Skip
        </button>
        <button
          className={`${styles.mcqBtns}`}
          disabled={!!isPreview || !selectedOption}
          onClick={(e) =>
            handleSubmit(e, selectedOption)
              ?.then((isCorrect) => {
                setShowAlert(
                  <>
                    Your answer is {isCorrect ? 'correct ' : 'incorrect '}
                    {isCorrect ? <TickIcon /> : <CrossIcon />}
                  </>,
                );

                setTimeout(() => setShowAlert(false), 3000);
              })
              ?.catch((err) => console.log(`Error :`, err))
          }>
          Submit
        </button>
      </McqScreen>

      {showAlert && (
        <AlertBox
          title="Quiz Attemptted"
          description={
            <div>
              <p>Quiz is completed!!</p>
              <p
                style={{
                  margin: '5px auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                {showAlert}
              </p>
            </div>
          }
          handleClose={() => {
            setShowAlert(false);
            onAttemptSuccess();
          }}
        />
      )}
    </div>
  );
}
