import { useEffect, useState } from 'react';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import UploadQuestions from '../../../../examComps/ExamsTabs/AddQuestionMetaData/uploadNew/UploadQuestions';
import styles from '../questionMasterTab.module.scss';
import CreateQuestionForm from './CreateQuestionForm';

export default function QuestionMaster({ isEdit, data }) {
  const [visibleForm, setVisibleForm] = useState(null);

  useEffect(() => {
    setVisibleForm(isEdit ? 'create' : null);
  }, [isEdit]);

  return (
    <>
      {visibleForm === null && (
        <div className={`center-element-with-flex ${styles.questionMasterContainer}`}>
          <LabeledRadioCheckbox
            type="radio"
            label="Create Question"
            name="questionMaster"
            isChecked={visibleForm === 'create'}
            changeHandler={() => setVisibleForm('create')}
          />
          <LabeledRadioCheckbox
            type="radio"
            label="Upload Question"
            name="questionMaster"
            isChecked={visibleForm === 'upload'}
            changeHandler={() => setVisibleForm('upload')}
          />
        </div>
      )}

      <div className={`${styles.formContainer}`}>
        {visibleForm === 'create' && <CreateQuestionForm isEdit={isEdit} data={data} />}

        {visibleForm === 'upload' && <UploadQuestions />}
      </div>
    </>
  );
}
