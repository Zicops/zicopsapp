import { useEffect, useState } from 'react';
// import QuizOptionInput from '../../../common/QuizOptionInput';
// import UploadNewQuestionBank from '../../../common/UploadNewQuestionBank';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import UploadQuestions from '../../../../examComps/ExamsTabs/AddQuestionMetaData/uploadNew/UploadQuestions';
import styles from '../questionMasterTab.module.scss';
import CreateQuestionForm from './CreateQuestionForm';

export default function QuestionMaster({ inputHandler, handleChange }) {
  const [visibleForm, setVisibleForm] = useState(null);

  useEffect(() => {
    setVisibleForm(null);
  }, []);

  return (
    <>
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

      <div className={`${styles.formContainer}`}>
        {visibleForm === 'create' && <CreateQuestionForm />}
        {/* UPdate uploadQuestions comp */}
        {visibleForm === 'upload' && <UploadQuestions />}
      </div>
    </>
  );
}
