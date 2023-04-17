import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import styles from '../vctoolMain.module.scss';
import { useRecoilValue } from 'recoil';
import { TopicQuizAtom } from '@/state/atoms/courses.atom';
const CreateQuiz = ({ addQuiz }) => {
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const topicQuiz = useRecoilValue(TopicQuizAtom);

  return (
    <div className={`${styles.moderatorQuize}`}>
      <div className={`${styles.quizModeratorScreen}`}>
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
