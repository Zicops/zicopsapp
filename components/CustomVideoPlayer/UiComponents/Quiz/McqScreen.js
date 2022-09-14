// components\CustomVideoPlayer\UiComponents\Quiz\QuizQuestion.js

import { useState } from 'react';
import styles from '../../customVideoPlayer.module.scss';

export default function McqScreen({
  count = null,
  question = {},
  options = [],
  displayHint = true
}) {
  const [showHint, setShowHint] = useState(false);
  const hasAttachment = !!question?.attachment;
  console.log(options);

  return (
    <div className={`${styles.mcqScreen}`}>
      <div className={`${styles.questionContainer}`}>
        <div className={`${styles.count}`}>{count ? `${count}.` : ''}</div>

        <div className={`${styles.question}`}>
          {question?.descriptions && <p>{question?.description}</p>}

          <div className={`${styles.attachment}`}>
            <img src="/images/galaxy.jpg" alt="image" />
          </div>

          {hasAttachment && (
            <div>
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
            <span>Hint </span>: {showHint && question?.hint}
          </span>
        )}
      </div>

      <div className={`${styles.optionsContainer}`}>
        {options?.map((op) => {
          const isAttachmentPresent = !!op?.attachment;
          const type = op?.attachmentType;
          return (
            <div className={`${styles.option}`}>
              <p>{op?.description}</p>

              <img src="/images/logo.png" alt="image" />

              {isAttachmentPresent && (
                <div>
                  {type.includes('image') && <img src={op.attachment} alt="image" />}
                  {type.includes('video') && <video controls src={op.attachment} alt="video" />}
                  {type.includes('audio') && <audio controls src={op.attachment} alt="audio" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
