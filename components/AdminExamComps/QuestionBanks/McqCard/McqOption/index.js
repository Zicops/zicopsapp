import { imageTypes } from '../../Logic/questionBank.helper';
import styles from '../mcqCard.module.scss';
import McqCheckBox from '../McqCheckBox';

export default function McqOption({ option, index }) {
  const bullets = ['a', 'b', 'c', 'd'];
  const isCorrect = option.isCorrect;

  return (
    <>
      <div className={`${styles.options}`}>
        {`${bullets[index]}.  `}

        <div className={`${styles.option}`}>
          <b>{option.description}</b>

          {imageTypes?.includes(option?.attachmentType) && (
            <div className={`${styles.img_container}`}>
              {option?.attachment && <img src={option.attachment} alt="" />}
              {option?.file && <img src={URL.createObjectURL(option.file)} alt="" />}
            </div>
          )}
          <McqCheckBox checked={isCorrect} />
        </div>
      </div>
    </>
  );
}
