import CustomTooltip from '@/components/common/CustomTooltip';
import ToolTip from '@/components/common/ToolTip';
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
          <ToolTip title="Create and Add Questions to Bank" placement="top">
            <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('create')}>
              <div className={`${styles.radioBoxIcon}`}>
                <img src="/images/svg/add-line.svg" />
              </div>
              <div className={`${styles.radioBoxText}`}>Create Question</div>
            </div>
          </ToolTip>
          <ToolTip title="Bulk Upload Questions" placement="top">
            <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('upload')}>
              <div className={`${styles.radioBoxIcon}`}>
                <img src="/images/svg/upload-cloud-line.svg" />
              </div>
              <div className={`${styles.radioBoxText}`}>
                Upload Questions
                <CustomTooltip
                  info={
                    <>
                      Use Upload feature to:
                      <ul>
                        <li>Upload MCQ questions with details in bulk in one go.</li>
                        <li> Upload questions and options in text format only.</li>
                      </ul>
                      <b>Note: </b>No media file upload allowed for questions or options in bulk
                      upload
                    </>
                  }
                />
              </div>
            </div>
          </ToolTip>

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
