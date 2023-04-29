import { GET_TOPIC_QUIZ } from '@/api/Queries';
import Spinner from '@/components/common/Spinner';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { TopicQuizAtom } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  CurrentParticipantDataAtom,
  activequizArr,
  particiapntQuiz,
  quizArray,
} from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import CreateQuiz from './CreateQuiz';
import QuizQA from './QuizQA';
import ShowQuiz from './ShowQuiz';

const QuizPage = ({ hide = false }) => {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);

  const quizArr = useRecoilValue(quizArray);
  const [activeQuiz, setActiveQuiz] = useRecoilState(activequizArr);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [participantQuizAtom, setParticiapntQuizAtom] = useRecoilState(particiapntQuiz);
  const [objTitle, setObjTitle] = useState('');
  function showQuiz(title) {
    if (title === '')
      return (
        <>
          {quizArr.length > 1 || activeQuiz.length >= 1
            ? quizComponent[2].component
            : quizComponent[0].component}
        </>
      );
    const obj = quizComponent.find((obTitle) => obTitle.title === title);
    return obj?.component;
  }
  const quizComponent = [
    {
      title: 'CreateQuiz',
      component: (
        <CreateQuiz
          addQuiz={() => {
            setObjTitle('QuizQA');
          }}
        />
      ),
    },
    {
      title: 'QuizQA',
      component: (
        <QuizQA
          cancelRoom={() => {
            setObjTitle('CreateQuiz');
            {
              quizArr.length > 1 ? setObjTitle('showQuiz') : setObjTitle('CreateQuiz');
            }
          }}
          showQuiz={() => {
            setObjTitle('showQuiz');
          }}
        />
      ),
    },
    {
      title: 'showQuiz',
      component: (
        <ShowQuiz
          addQuiz={() => {
            setObjTitle('QuizQA');
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!activeClassroomTopicId) return setTopicQuiz([]);

    // load resources
    loadQueryDataAsync(GET_TOPIC_QUIZ, { topic_id: activeClassroomTopicId })
      .then((res) => setTopicQuiz(res?.getTopicQuizes?.map((quiz) => quiz) || []))
      .catch(() => {
        setToastMessage('Topic Quiz Load Error');
        setTopicQuiz([]);
      });
  }, [activeClassroomTopicId]);

  if (topicQuiz == null) return <Spinner />;

  return (
    <div className={`${styles.quiz}`}>
      <div className={`${styles.quizHead}`}>
        <div>Quiz</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.quizScreen}`}>
        {!!currentParticipantData.isModerator ? (
          <>{showQuiz(objTitle)}</>
        ) : participantQuizAtom.unAttemptedQuiz.length < 1 &&
          participantQuizAtom.attemtedQuiz.length < 1 ? (
          <CreateQuiz />
        ) : (
          <ShowQuiz />
        )}
      </div>
    </div>
  );
};
export default QuizPage;
