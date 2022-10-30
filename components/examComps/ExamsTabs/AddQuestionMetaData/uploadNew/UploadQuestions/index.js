// import UploadButton from './UploadButton';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import styles from '../../addQuestionMetaData.module.scss';
import UploadButton from '../UploadButton';

const UploadQuestions = () => {
  return (
    <>
      <div className={`${styles.uq_container}`}>
        <div className={`${styles.uq_second}`}>
          <label>Download sample template for downloading questions:</label>
          <ToolTip
            title={
              ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.questionMasterTab
                .uploadQuestionScreen.downloadBtn
            }
            placement="left">
            <button>Download template</button>
          </ToolTip>
        </div>
        <span className={`${styles.small}`}>
          Upload Excel filled with data as per the standard format
        </span>
        {/* <UploadButton /> */}
        <UploadButton />
      </div>
    </>
  );
};

export default UploadQuestions;
