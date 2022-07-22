import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { OPTION_LABEL } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import styles from './questionOptionView.module.scss';

export default function Option({ option, count, compareCorrect, selectedAnswerId }) {
  const isCorrect = option?.isCorrect == null ? selectedAnswerId === option.id : option.isCorrect;
  const [isCorrectSelected, setIsCorrectSelected] = useState(null);

  let fileSrc = null;

  if (option?.file) fileSrc = URL.createObjectURL(option?.file);
  if (option?.attachment) fileSrc = option?.attachment;

  if (!option?.description && !fileSrc) return null;

  useEffect(() => {
    if (!compareCorrect) return;
    if (selectedAnswerId !== option.id) return;

    setIsCorrectSelected(option.isCorrect);
  }, []);

  let imgSrc = null;
  if (isCorrect && isCorrectSelected == null) imgSrc = '/images/svg/green-tick.svg';
  if (isCorrectSelected === true) imgSrc = '/images/svg/green-tick.svg';
  if (isCorrectSelected === false) imgSrc = '/images/svg/red-cross.svg';

  return (
    <>
      <div className={`${styles.option}`}>
        <span className={`${styles.highlight}`}>{OPTION_LABEL[count]}.</span>

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

        <div className={`${styles.correctImgContainer}`}>{imgSrc && <img src={imgSrc} />}</div>
      </div>
    </>
  );
}
