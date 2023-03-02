import CustomTooltip from '@/components/common/CustomTooltip';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { useEffect, useState } from 'react';
import styles from '../questionMasterTab.module.scss';
import CreateQuestionForm from './CreateQuestionForm';

export default function QuestionMaster({
  isEdit,
  data,
  uploadDataState = [],
  setIsBulkUpload = () => {}
}) {
  const [visibleForm, setVisibleForm] = useState(data?.questionData?.type ? 'create' : null);
  const [uploadQuestionType, setUploadQuestionType] = useState('MCQ');

  const [uploadData, setUploadData] = uploadDataState;

  useEffect(() => {
    if (visibleForm === 'create') return;
    setVisibleForm(isEdit ? 'create' : null);
  }, [isEdit]);

  useEffect(() => {
    setIsBulkUpload(visibleForm === 'upload');
    setUploadData(null);
  }, [visibleForm]);

  function handleBulkUpload(e) {
    setUploadData(e.target.files);
  }

  return (
    <>
      {visibleForm === null && (
        <div className={`center-element-with-flex ${styles.questionMasterContainer}`}>
          <ToolTip
            title={
              ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.questionMasterTab.createQuestion
            }
            placement="top">
            <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('create')}>
              <div className={`${styles.radioBoxIcon}`}>
                <img src="/images/svg/add-line.svg" />
              </div>
              <div className={`${styles.radioBoxText}`}>Create Question</div>
            </div>
          </ToolTip>
          <ToolTip
            title={
              ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.questionMasterTab.uploadQuestion
            }
            placement="top">
            <div className={`${styles.radioBox}`} onClick={() => setVisibleForm('upload')}>
              <div className={`${styles.radioBoxIcon}`}>
                <img src="/images/svg/upload-cloud-line.svg" />
              </div>
              <div className={`${styles.radioBoxText}`}>
                Upload Questions
                <CustomTooltip
                  info={
                    ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.questionMasterTab
                      .uploadQuestionInfo
                  }
                  customColor={true}
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

        {visibleForm === 'upload' && (
          <>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'type',
                label: 'Select Question Type: ',
                placeholder: 'Select question type',
                options: [
                  { label: 'MCQ', value: 'MCQ' },
                  { label: 'Descriptive', value: 'Descriptive', disabled: true }
                ],
                value: uploadQuestionType
                  ? { value: uploadQuestionType, label: uploadQuestionType }
                  : null
              }}
              changeHandler={(e) => setUploadQuestionType(e.value)}
            />

            <div className={styles.marginTop}>
              <UploadForm
                leftGapClass={'w-12'}
                acceptedTypes=".csv"
                handleFileUpload={handleBulkUpload}
                filePath={'/templates/question-bank-template.csv'}
                handleRemove={() => setUploadData(null)}
              />
            </div>
          </>
        )}
      </div>

      <div style={{ textAlign: 'right' }}>{uploadData?.[0]?.name}</div>
    </>
  );
}
