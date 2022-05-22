import Image from 'next/image';
import styles from './examQuestions.module.scss';

const ExamQuestions = ({data}) => {
  return (
    <div>
      <div className={`${styles.exam_question_number}`}>
        <p>{data.id}.</p>
      </div>
      <div className={`${styles.all_questions}`}>
        <p>{data.question?.text}</p>

          {
              data.question?.image && (
                  <div className={`${styles.all_questions_img_container}`}>
                      <Image src={data.question?.image} width="250px" height="150px" />
                  </div>
              )
          }
      </div>
    </div>
  );
};

export default ExamQuestions;
