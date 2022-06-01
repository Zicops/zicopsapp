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
          {option.attachment ? (
            <div className={`${styles.img_container}`}>
              {imageTypes?.includes(option?.attachmentType) && (
                <img src={`${option.attachment}`} alt="" />
              )}
              <McqCheckBox checked={isCorrect} />
            </div>
          ) : (
            <b>
              {option.description}
              <McqCheckBox checked={isCorrect} />
            </b>
          )}
        </div>
      </div>
    </>
  );
}
