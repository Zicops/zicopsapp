import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTION_OPTIONS, queryClient } from 'API/Queries';
import { array, object, oneOf } from 'prop-types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Option from './Option';
import styles from './questionOptionView.module.scss';

// update this comp later
export default function QuestionOptionView({
  questionData,
  optionData,
  showType = 'difficulty',
  style = {}
}) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (optionData?.length) return setOptions(optionData);

    loadOptions({
      variables: { question_id: questionData?.id },
      fetchPolicy: 'no-cache'
    }).then(({ data }) => {
      if (errorOptionsData) return setToastMsg({ type: 'danger', message: 'options load error' });

      const optionsArr = [];

      data?.getOptionsForQuestions[0].options.forEach((option) => {
        optionsArr.push({
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

  console.log(options);

  return (
    <div className={`${styles.container}`} style={style}>
      <div className={`${styles.questionContainer}`}>
        <section>
          <div>
            <span className={`${styles.highlight}`}>Q. </span>
            <p>
              {questionData?.description} caiewvbareiv breiovbaeoilv bioaebkvnreoavhniaeokvbi
              orekbvioenvoeiavi reovbkeiorlk
            </p>
          </div>
        </section>

        <section>
          {showType === 'difficulty' && (
            <span>Difficulty Level: {questionData?.difficulty || 0}</span>
          )}

          {showType === 'marks' && <span>Marks: {questionData?.question_marks || 0}</span>}
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
            <Option option={option} count={i} />
          ))}
        </section>
      </div>

      <div className={`${styles.hintContainer}`}>
        <span className={`${styles.span_element}`}>Hint:</span>
        <div className={`${styles.hint}`}>{questionData?.hint}</div>
      </div>
    </div>
  );
}

QuestionOptionView.propTypes = {
  questionData: object,
  optionData: array,
  showType: oneOf(['difficulty', 'marks'])
};
