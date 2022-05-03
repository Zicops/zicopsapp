import Image from 'next/image';
import styles from './examQuestions.module.scss';

const ExamQuestions = ({ question, questionimage, questionnumber }) => {
  return (
    <div >
      <div className={`${styles.exam_question_number}`}>
        <p>{questionnumber}.</p>
      </div>
      <div className={`${styles.all_questions}`}>
        <p>{question}</p>
        <div className={`${styles.all_questions_img_container}`}>
        <Image src={questionimage} width="250px" height="150px" />
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;
