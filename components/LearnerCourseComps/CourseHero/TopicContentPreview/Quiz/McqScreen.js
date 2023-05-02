// components\CustomVideoPlayer\UiComponents\Quiz\QuizQuestion.js

import { OPTION_LABEL } from '@/helper/constants.helper';
import { useState } from 'react';
import styles from '../../../learnerCourseComps.module.scss';

export default function McqScreen({
  question = {},
  options = [],
  displayHint = true,
  handleSelect = () => {},
  selectedOptionId = null,
  children,
}) {
  const [showHint, setShowHint] = useState(false);
  const hasAttachment = !!question?.attachment;

  return (
    <div className={`${styles.mcqScreen}`}>
      <div className={`${styles.questionContainer}`}>
        <div className={`${styles.question}`}>
          {question?.description && <p>{question?.description}</p>}

          {hasAttachment && (
            <div className={`${styles.attachment}`}>
              {question?.attachmentType.includes('image') && (
                <img src={question.attachment} alt="image" />
              )}

              {question?.attachmentType.includes('video') && (
                <video controls src={question.attachment} alt="video" />
              )}
              {question?.attachmentType.includes('audio') && (
                <audio controls src={question.attachment} alt="audio" />
              )}
            </div>
          )}
        </div>

        {!!question?.hint && displayHint && (
          <span className={styles.hintBtn} onClick={() => setShowHint(!showHint)}>
            <span>Show Hint </span>: {showHint && question?.hint}
          </span>
        )}
      </div>

      <div className={`${styles.optionsContainer}`}>
        <div className={`${styles.options}`}>
          {options?.slice(0, 4)?.map((op, i) => {
            const isAttachmentPresent = !!op?.attachment;
            const type = op?.attachmentType;
            return (
              <section key={op?.id || i}>
                <p>{OPTION_LABEL?.[i]}. </p>

                <div
                  className={`${styles.option} ${selectedOptionId === op?.id ? styles.active : ''}`}
                  onClick={() => handleSelect(op)}>
                  <p>{op?.description}</p>

                  {isAttachmentPresent && (
                    <div className={`${styles.attachment}`}>
                      {type.includes('image') && <img src={op.attachment} alt="image" />}
                      {type.includes('video') && <video controls src={op.attachment} alt="video" />}
                      {type.includes('audio') && <audio controls src={op.attachment} alt="audio" />}
                    </div>
                  )}
                </div>

                <div>{/* add correct, wrong, selected img */}</div>
              </section>
            );
          })}
        </div>
      </div>

      <div className={`${styles.footerBtn}`}>{children}</div>
    </div>
  );
}
