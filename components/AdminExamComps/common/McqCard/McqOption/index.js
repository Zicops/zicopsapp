import { acceptedFileTypes } from '../../../QuestionBanks/Logic/questionBank.helper';
import styles from '../mcqCard.module.scss';
import McqCheckBox from '../McqCheckBox';

export default function McqOption({ option, index }) {
  const bullets = ['a', 'b', 'c', 'd'];
  const isCorrect = option?.isCorrect;

  let fileSrc = null;

  if (option?.file) fileSrc = URL.createObjectURL(option?.file);
  if (option?.attachment) fileSrc = option?.attachment;

  return (
    <>
      <div className={`${styles.options}`}>
        {`${bullets[index]}.  `}

        <div className={`${styles.option}`}>
          <b>{option?.description}</b>

          {acceptedFileTypes?.includes(option?.attachmentType) && fileSrc && (
            <div>
              {option?.attachmentType?.includes('image') && <img src={fileSrc} alt="" />}
              {option?.attachmentType?.includes('video') && <video controls src={fileSrc} />}
              {option?.attachmentType?.includes('audio') && <audio controls src={fileSrc} />}
            </div>
          )}
          <McqCheckBox checked={isCorrect} />
        </div>
      </div>
    </>
  );
}
