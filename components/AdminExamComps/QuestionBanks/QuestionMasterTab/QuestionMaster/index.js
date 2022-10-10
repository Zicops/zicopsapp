import CustomTooltip from '@/components/common/CustomTooltip';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { useEffect, useState } from 'react';
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
          <UploadForm leftGapClass={'w-12'} filePath={'/templates/question-bank-template.xlsx'} />
        )}
      </div>
    </>
  );
}
