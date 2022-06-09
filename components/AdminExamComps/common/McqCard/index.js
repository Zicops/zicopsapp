import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_OPTIONS, queryClient } from '../../../../API/Queries';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import Button from '../../../common/Button';
import { imageTypes } from '../../QuestionBanks/Logic/questionBank.helper';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';

// update this comp later
export default function McqCard({ questionData, optionData, handleCancel, handleEdit }) {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (optionData?.length) return setOptions(optionData);

    loadOptions({
      variables: { question_id: questionData?.id }
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

  return (
    <>
      <div className={`${styles.mcq_container}`}>
        <div className={`${styles.qcontent}`}>
          <p className={`${styles.span_element}`}>
            {/* TODO : Add difficulty lebel */}
            <span>Q.</span>
            {questionData?.description}

            <span>Difficulty Level: {questionData?.difficulty || 0}</span>
          </p>

          {imageTypes.includes(questionData?.attachmentType) && (
            <div className={`${styles.quesImg}`}>
              {questionData?.attachment && <img src={questionData?.attachment} alt="" />}
              {questionData?.file && <img src={URL.createObjectURL(questionData?.file)} alt="" />}
            </div>
          )}
        </div>

        <p className={`${styles.optionsTitle}`}>Options</p>

        <section className={`${styles.option_container}`}>
          {options.map((option, i) => (
            <McqOption option={option} index={i} />
          ))}
        </section>

        <span className={`${styles.span_element}`}>Hint:</span>
        <div className={`${styles.hint}`}>{questionData?.hint}</div>

        <div className={`${styles.btn}`}>
          {handleEdit && <Button text={'Edit'} clickHandler={handleEdit} />}
          {handleCancel && <Button text={'Cancel'} clickHandler={handleCancel} />}
        </div>
      </div>
    </>
  );
}
