import { useEffect, useState } from 'react';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import UploadQuestions from '../../../../examComps/ExamsTabs/AddQuestionMetaData/uploadNew/UploadQuestions';
import styles from '../questionMasterTab.module.scss';
import CreateQuestionForm from './CreateQuestionForm';

export default function QuestionMaster({ isEdit, data }) {
  const [visibleForm, setVisibleForm] = useState(data?.questionData?.type ? 'create' : null);

  useEffect(() => {
    if (visibleForm === 'create') return;
    setVisibleForm(isEdit ? 'create' : null);
  }, [isEdit]);

  return (
    <>
      {visibleForm === null && (
        <div className={`center-element-with-flex ${styles.questionMasterContainer}`}>
          <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('create')}>
            <div className={`${styles.radioBoxIcon}`}>
              <img src="/images/svg/add-line.svg" />
            </div>
            <div className={`${styles.radioBoxText}`}>Create Question</div>
          </div>
          <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('upload')}>
            <div className={`${styles.radioBoxIcon}`}>
              <img src="/images/svg/upload-cloud-line.svg" />
            </div>
            <div className={`${styles.radioBoxText}`}>Upload Questions</div>
          </div>
          {/* <LabeledRadioCheckbox
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
          /> */}
        </div>
      )}

      <div className={`${styles.formContainer}`}>
        {visibleForm === 'create' && <CreateQuestionForm isEdit={isEdit} data={data} />}

        {visibleForm === 'upload' && <UploadQuestions />}
      </div>
    </>
  );
}
