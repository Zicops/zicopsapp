import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { OPTION_LABEL } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import ToolTip from '../ToolTip';
import styles from './questionOptionView.module.scss';

export default function Option({
  option,
  count,
  compareCorrect,
  showAnswer = false,
  selectedAnswerId
}) {
  const isCorrect = !!option.isCorrect;
  const isSelected = option?.id === selectedAnswerId;

  let fileSrc = null;

  if (option?.file) fileSrc = URL.createObjectURL(option?.file);
  if (option?.attachment) fileSrc = option?.attachment;
  if (!option?.description && !fileSrc) return null;

  let imgSrc = null;
  if (isCorrect === true) imgSrc = '/images/svg/green-tick.svg';
  if (isSelected && isCorrect === false) imgSrc = '/images/svg/red-cross.svg';
  if (!showAnswer) imgSrc = null;

  // console.log(isCorrectSelected, isCorrect, option?.description, selectedAnswerId);
  return (
    <>
      <div className={`${styles.option}`}>
        <ToolTip title="Selected Answer" placement="right">
          <div className={`${selectedAnswerId === option?.id ? styles.selectedAnswer : ''}`}></div>
        </ToolTip>

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

        <div className={`${styles.correctImgContainer}`}>
          {imgSrc && (
            <ToolTip title={`${isCorrect ? 'Correct' : 'Wrong'} Answer`} placement="right">
              <img src={imgSrc} />
            </ToolTip>
          )}
        </div>
      </div>
    </>
  );
}
