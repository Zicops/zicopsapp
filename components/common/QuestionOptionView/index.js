import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTION_OPTIONS, queryClient } from 'API/Queries';
import { array, object, oneOf } from 'prop-types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Option from './Option';
import styles from './questionOptionView.module.scss';

export default function QuestionOptionView({
  questionData,
  optionData,
  showType = 'difficulty',
  questionCount = null,
  showHints = true,
  compareCorrect = false,
  selectedAnswerId = '',
  style = {}
}) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [options, setOptions] = useState([]);
  const [isMarksObtained, setIsMarksObtained] = useState(null);

  useEffect(() => {
    if (optionData?.length) return setOptions(optionData);

    loadOptions({
      variables: { question_id: questionData?.id },
      fetchPolicy: 'no-cache'
    }).then(({ data }) => {
      if (errorOptionsData) return setToastMsg({ type: 'danger', message: 'options load error' });

      const optionsArr = [];

      data?.getOptionsForQuestions[0].options.forEach((option) => {
        if (compareCorrect && option.id === selectedAnswerId && isMarksObtained == null)
          setIsMarksObtained(option.IsCorrect);

        optionsArr.push({
          id: option.id,
          description: option.Description,
          attachment: option.Attachment,
          attachmentType: option.AttachmentType,
          isCorrect: option.IsCorrect
        });
      });
      setOptions(optionsArr);
    });
  }, []);

  let fileSrc = null;

  if (questionData?.file) fileSrc = URL.createObjectURL(questionData?.file);
  if (questionData?.attachment) fileSrc = questionData?.attachment;

  return (
    <div className={`${styles.container}`} style={style}>
      <div className={`${styles.questionContainer}`}>
        <section>
          <span className={`${styles.highlight}`}>Q{questionCount ? questionCount : null}. </span>
          <p>{questionData?.description}</p>
        </section>

        <section className={`${styles.questionData}`}>
          {showType === 'difficulty' && (
            <span>Difficulty Score: {questionData?.difficulty || 0}</span>
          )}

          {showType === 'marks' && <span>Marks: {questionData?.question_marks || 0}</span>}
          {showType === 'marksObtained' && (
            <div>
              <p>
                {isMarksObtained ? (
                  <span className={`${styles.correct}`}>Correct</span>
                ) : (
                  <span className={`${styles.inCorrect}`}>Incorrect</span>
                )}
                <span className={`${styles.highlight}`}>Marks Obtained:</span>
                {isMarksObtained ? questionData?.question_marks : 0}/
                {questionData?.question_marks || 0}
              </p>
            </div>
          )}
        </section>
      </div>

      <div className={`${styles.imgContainer} ${styles.questionImg}`}>
        {acceptedFileTypes.includes(questionData?.attachmentType) && fileSrc && (
          <div className={`${styles.quesImg}`}>
            {questionData?.attachmentType?.includes('image') && <img src={fileSrc} alt="" />}
            {questionData?.attachmentType?.includes('video') && <video controls src={fileSrc} />}
            {questionData?.attachmentType?.includes('audio') && <audio controls src={fileSrc} />}
          </div>
        )}
      </div>

      <div className={`${styles.optionsContainer}`}>
        <span className={`${styles.highlight}`}>Options </span>
        <section>
          {options.map((option, i) => (
            <Option
              key={i}
              option={option}
              count={i}
              selectedAnswerId={selectedAnswerId}
              compareCorrect={compareCorrect}
            />
          ))}
        </section>
      </div>

      {showHints && questionData?.hint && (
        <div className={`${styles.hintContainer}`}>
          <span className={`${styles.highlight}`}>Hint:</span>
          <p>{questionData?.hint}</p>
        </div>
      )}
    </div>
  );
}

QuestionOptionView.propTypes = {
  questionData: object,
  optionData: array,
  showType: oneOf(['difficulty', 'marks'])
};
