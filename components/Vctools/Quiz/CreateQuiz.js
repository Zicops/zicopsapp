import { TopicQuizAtom } from '@/state/atoms/courses.atom';
import { ClassRoomFlagsInput, CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import { useRecoilValue } from 'recoil';
import QuizQuestion from '../QuizQuestion';
import styles from '../vctoolMain.module.scss';

const CreateQuiz = ({ addQuiz }) => {
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const topicQuiz = useRecoilValue(TopicQuizAtom);
  const controls = useRecoilValue(ClassRoomFlagsInput);

  const savedQuiz = [];
  const publishedQuiz = [];
  topicQuiz?.forEach((quiz) => {
    const isActive = controls?.quiz?.includes(quiz?.id);
    if (isActive) return publishedQuiz.push(quiz);

    savedQuiz.push(quiz);
  });

  return (
    <div className={`${styles.moderatorQuize}`}>
      <div className={`${styles.quizModeratorScreen}`}>
        {!topicQuiz?.length ? (
          <div className={`${styles.moderatorAddQuiz}`}>
            <div className={styles.quizIcon}>
              <img src="/images/svg/vctool/quiz.svg" />
            </div>
            <div className={`${styles.quizAvailableHead}`}>No quizzes available!</div>
            <p className={`${styles.quizAvailablesubHead}`}>
              {!!currentParticipantData?.isModerator
                ? 'Click bellow to add quizzes'
                : 'Moderator has not added quizzes'}
            </p>
          </div>
        ) : (
          <section>
            <div className={`${styles.manageAccountScreenHeading}`}>Saved</div>
            {savedQuiz?.map((quiz, index) => (
              <QuizQuestion quizData={quiz} quizIndex={index + 1} />
            ))}

            <div className={`${styles.manageAccountScreenHeading}`}>Active</div>
            {publishedQuiz?.map((quiz, index) => (
              <QuizQuestion quizData={quiz} quizIndex={index + 1} />
            ))}
          </section>
        )}
      </div>

      {!!currentParticipantData?.isModerator && (
        <button
          className={`${styles.addQuizBtn}`}
          onClick={() => {
            addQuiz();
          }}>
          <div>+</div>Add Quiz
        </button>
      )}
    </div>
  );
};
export default CreateQuiz;
