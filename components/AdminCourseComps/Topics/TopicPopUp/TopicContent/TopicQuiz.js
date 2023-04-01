import { DELETE_TOPIC_QUIZ } from '@/api/Mutations';
import useHandleQuiz from '@/components/AdminCourseComps/Logic/useHandleQuiz';
import IconButton from '@/components/common/IconButton';
import Spinner from '@/components/common/Spinner';
import { TopicQuizAtom } from '@/state/atoms/courses.atom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import ContentBar from './ContentBar';
import QuizForm from './QuizForm';

export default function TopicQuiz({ topData = null, setIsAccordionDisabled = () => {} }) {
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);

  const {
    quizFormData,
    setQuizFormData,
    handleSubmit,
    isFormVisible,
    toggleForm,
    handleQuizInput,
    isQuizReady,
    handleEditQuiz
  } = useHandleQuiz(topData);

  useEffect(() => {
    setIsAccordionDisabled(isFormVisible);
  }, [isFormVisible]);

  return (
    <>
      {topicQuiz == null && <Spinner customStyles={{ margin: '2em auto' }} />}

      {topicQuiz?.map((quiz, index) => {
        if (quiz?.editIndex === index) return null;

        return (
          <ContentBar
            key={quiz?.name}
            type={index + 1}
            description={quiz?.name}
            details={quiz?.type}
            editHandler={() => handleEditQuiz(index)}
            deleteProps={{
              id: quiz?.id,
              resKey: 'deleteQuiz',
              mutation: DELETE_TOPIC_QUIZ,
              onDelete: () => {
                const _quiz = structuredClone(topicQuiz);
                _quiz.splice(index, 1);

                setTopicQuiz(_quiz);
              }
            }}
          />
        );
      })}

      {isFormVisible && (
        <QuizForm
          quizFormData={quizFormData}
          setQuizFormData={setQuizFormData}
          handleCancel={toggleForm}
          handleQuizInput={handleQuizInput}
          handleSubmit={handleSubmit}
          isQuizReady={isQuizReady}
        />
      )}

      <div className={`center-element-with-flex ${styles.marginBetweenInputs}`}>
        <IconButton
          styleClass="btnBlack"
          text="Add Quiz"
          isDisabled={isFormVisible}
          handleClick={toggleForm}
        />
      </div>
    </>
  );
}
