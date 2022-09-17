import {
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS_WITHOUT_ANSWER,
  GET_QUESTION_OPTIONS_WITH_ANSWER
} from '@/api/Queries';
import {
  ADD_USER_QUIZ_ATTEMPT,
  UPDATE_USER_COURSE_PROGRESS,
  userClient
} from '@/api/UserMutations';
import AlertBox from '@/components/common/AlertBox';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { QuizAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { QuizProgressDataAtom, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questions } from '../../../examComps/QuickQuiz/Logic/QuickQuiz.helper';
import QuizOptions from '../../../examComps/QuickQuiz/QuizOptions';
// import QuizQuestion from '../../../examComps/QuickQuiz/QuizQuestion';
import styles from '../../customVideoPlayer.module.scss';
import McqScreen from './McqScreen';

export default function Quiz({
  currentQuizData = {},
  handleSkip = () => {},
  afterSubmit = () => {},
  isTopBarHidden
}) {
  const [addQuizAttempt] = useMutation(ADD_USER_QUIZ_ATTEMPT, {
    client: userClient
  });
  const [updateUserCourseProgress] = useMutation(UPDATE_USER_COURSE_PROGRESS, {
    client: userClient
  });

  const quizData = useRecoilValue(QuizAtom);
  const userData = useRecoilValue(UserStateAtom);
  const videoData = useRecoilValue(VideoAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [quizProgressData, setQuizProgressData] = useRecoilState(QuizProgressDataAtom);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [mcqData, setMcqData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // console.log(quizData);

    async function loadMcqData() {
      const questionRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [currentQuizData?.questionId]
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
        question_id: currentQuizData?.questionId
      });
      if (!optionRes?.getOptionsForQuestions)
        return setToastMsg({ type: 'danger', message: 'Question Load Error' });

      // console.log(optionRes?.getOptionsForQuestions);
      const _option = optionRes?.getOptionsForQuestions[0]?.options;
      const optionData = _option?.map((op) => ({
        id: op?.id,
        qmId: op?.QmId,
        description: op?.Description,
        attachmentType: op?.AttachmentType,
        attachment: op?.Attachment,
        isActive: op?.IsActive
      }));
      // console.log(optionData, _option);

      const _mcqData = { question: questionData, options: optionData };
      setMcqData(_mcqData);
      return _mcqData;
    }

    // const isQuizPassed = quizProgressData?.find(
    //   (qp) => qp?.quiz_id === quizData?.id && qp?.result === 'passed'
    // );
    // console.log(isQuizPassed);

    // setIsSubmitDisabled(!!isQuizPassed);
    loadMcqData();
  }, []);

  useEffect(() => {
    if (isSubmitDisabled) {
      setIsSubmitDisabled(false);
      afterSubmit();
    }
  }, [toastMsg]);

  function isTopicQuizCompleted(topicId, quizProgress) {
    const isCompleted = !quizData
      ?.filter((quiz) => quiz?.topicId === topicId)
      ?.some((quiz) => {
        const isPassed = quizProgress?.find(
          (qp) => qp?.quiz_id === quiz?.id && qp?.result === 'passed'
        );
        return !isPassed;
      });

    return isCompleted;
  }

  async function handleSubmit() {
    setIsSubmitDisabled(true);
    if (!selectedOption) return setToastMsg({ type: 'danger', message: 'Select option first' });
    if (!currentQuizData?.id) return setToastMsg({ type: 'danger', message: 'No Quiz Id present' });

    const optionRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS_WITH_ANSWER, {
      question_id: currentQuizData?.questionId
    });
    if (!optionRes?.getOptionsForQuestions)
      return setToastMsg({ type: 'danger', message: 'Question Load Error' });

    const _option = optionRes?.getOptionsForQuestions[0]?.options;

    const topicId = videoData?.topicContent?.[0]?.topicId;
    const _userCourseData = structuredClone(userCourseData);
    const userCP = userCourseData?.userCourseProgress?.find((cp) => cp?.topic_id === topicId);

    const sendData = {
      user_id: userData?.id,
      user_cp_id: userCP?.user_cp_id,
      user_course_id: userCourseData?.userCourseMapping?.user_course_id,
      quiz_id: currentQuizData?.id,
      quiz_attempt:
        quizProgressData?.filter((quiz) => quiz?.quiz_id === currentQuizData?.id)?.length || 1,
      topic_id: topicId,
      result: _option?.find((op) => op?.id === selectedOption?.id)?.IsCorrect ? 'passed' : 'failed',
      is_active: true
    };

    if (!sendData?.user_cp_id)
      return setToastMsg({ type: 'danger', message: 'No Course Progress Id Present' });

    // console.log(sendData, _option, selectedOption);
    let isError = false;
    const quizAttemptRes = await addQuizAttempt({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      if (err) setToastMsg({ type: 'danger', message: 'Quiz Attempt Add Error' });
    });

    const _quizProgress = [...quizProgressData, quizAttemptRes?.data?.addUserQuizAttempt[0]];
    setQuizProgressData(_quizProgress);
    if (isError) return;

    if (+userCP?.video_progress > 98 && isTopicQuizCompleted(topicId, _quizProgress)) {
      const sendCpData = {
        userCpId: userCP?.user_cp_id,
        userId: userCP?.user_id,
        userCourseId: userCP?.user_course_id,
        topicId: userCP?.topic_id,
        topicType: userCP?.topic_type,
        videoProgress: userCP?.video_progress,
        timestamp: userCP?.time_stamp,
        status: 'completed'
      };

      // console.log('course progress', sendData);
      const progressRes = await updateUserCourseProgress({ variables: sendCpData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });
      const userCourseProgressData = progressRes?.data?.updateUserCourseProgress;
      const currentProgressIndex = _userCourseData?.userCourseProgress?.findIndex(
        (obj) => obj?.user_cp_id === userCP?.user_cp_id
      );

      _userCourseData.userCourseProgress[currentProgressIndex] = userCourseProgressData;
      setUserCourseData(_userCourseData);
    }

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      afterSubmit();
    }, 3000);
  }

  return (
    <div className={`${styles.quizContainer}`}>
      <div
        className={`${styles.firstIcon} ${styles.backBtn} ${isTopBarHidden ? styles.hideBtn : ''}`}
        onClick={handleSkip}>
        <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
      </div>

      <McqScreen
        {...mcqData}
        handleSelect={(op) => setSelectedOption(op)}
        selectedOptionId={selectedOption?.id}>
        <button className={`${styles.mcqBtns} ${styles.skipBtn}`} onClick={handleSkip}>
          Skip
        </button>
        <button
          className={`${styles.mcqBtns}`}
          disabled={!!isSubmitDisabled}
          onClick={handleSubmit}>
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

      {showAlert && (
        <AlertBox
          title="Quiz Attemptted"
          description="Quiz was completed!!"
          handleClose={() => {
            setShowAlert(false);
            afterSubmit();
          }}
        />
      )}
    </div>
  );
}
