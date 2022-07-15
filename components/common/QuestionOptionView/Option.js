import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import styles from './questionOptionView.module.scss';

export default function Option({ option, count }) {
  const optionCount = ['a', 'b', 'c', 'd'];
  const isCorrect = option?.isCorrect;

  let fileSrc = null;

  if (option?.file) fileSrc = URL.createObjectURL(option?.file);
  if (option?.attachment) fileSrc = option?.attachment;

  if (!option?.description && !fileSrc) return null;

  return (
    <>
      <div className={`${styles.option}`}>
        <span className={`${styles.highlight}`}>{optionCount[count]}.</span>

        <div className={`${styles.optionWithImg}`}>
          <p>{option?.description}</p>

          {acceptedFileTypes?.includes(option?.attachmentType) && fileSrc && (
            <div className={`${styles.imgContainer}`}>
              {option?.attachmentType?.includes('image') && <img src={fileSrc} alt="" />}
              {option?.attachmentType?.includes('video') && <video controls src={fileSrc} />}
              {option?.attachmentType?.includes('audio') && <audio controls src={fileSrc} />}
            </div>
          )}
        </div>

        <div className={`${styles.correctImgContainer}`}>
          {isCorrect && <img src="/images/svg/green-tick.svg" />}
        </div>
      </div>
    </>
  );
}
