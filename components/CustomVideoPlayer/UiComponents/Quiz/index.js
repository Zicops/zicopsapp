import { GET_QUESTION_BY_ID, GET_QUESTION_OPTIONS_WITHOUT_ANSWER } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { questions } from '../../../examComps/QuickQuiz/Logic/QuickQuiz.helper';
import QuizOptions from '../../../examComps/QuickQuiz/QuizOptions';
// import QuizQuestion from '../../../examComps/QuickQuiz/QuizQuestion';
import styles from '../../customVideoPlayer.module.scss';
import McqScreen from './McqScreen';

export default function Quiz({ quizData = {}, handleSkip, handleSubmit }) {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqData, setMcqData] = useState({});

  useEffect(() => {
    console.log(quizData);

    async function loadMcqData() {
      const questionRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [quizData?.questionId]
      });
      if (!questionRes?.getQuestionsById)
        return setToastMsg({ type: 'danger', message: 'Question Load Error' });

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
        status: _question?.Status
      };

      const optionRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS_WITHOUT_ANSWER, {
        question_id: quizData?.questionId
      });
      if (!optionRes?.getOptionsForQuestions)
        return setToastMsg({ type: 'danger', message: 'Question Load Error' });

      console.log(optionRes?.getOptionsForQuestions);
      const _option = optionRes?.getOptionsForQuestions[0]?.options;
      const optionData = _option?.map((op) => ({
        id: op?.id,
        qmId: op?.QmId,
        description: op?.Description,
        attachmentType: op?.AttachmentType,
        attachment: op?.Attachment,
        isActive: op?.IsActive
      }));
      console.log(optionData, _option);

      setMcqData({ question: questionData, options: optionData });
    }

    loadMcqData();
  }, []);

  return (
    <div className={`${styles.quizContainer}`}>
      <div className={`${styles.firstIcon} ${styles.backBtn}`} onClick={handleSkip}>
        <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
      </div>

      <McqScreen
        {...mcqData}
        handleSelect={(op) => setSelectedOption(op)}
        selectedOptionId={selectedOption?.id}>
        <button className={`${styles.mcqBtns} ${styles.skipBtn}`} onClick={handleSkip}>
          Skip
        </button>
        <button className={`${styles.mcqBtns}`} onClick={handleSubmit}>
          Submit
        </button>
      </McqScreen>

      <div>
        <QuizOptions answerOptions={questions[1].answerOptions} />
      </div>

      <div className={`${styles.footerBtns}`}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
}
