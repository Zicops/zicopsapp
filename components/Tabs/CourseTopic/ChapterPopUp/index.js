import { changeHandler } from '../../../../helper/common.helper';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import LabeledTextarea from '../../../common/FormComponents/LabeledTextarea';
import PopUp from '../../../common/PopUp';
import styles from '../../courseTabs.module.scss';

export default function ChapterPopUp({
  chapterData,
  setChapterData,
  closeModal,
  isChapterAddReady,
  handleSubmit,
  isEdit = false
}) {
  const submitBtnObj = {
    name: isEdit ? 'Update' : 'Save',
    handleClick: handleSubmit,
    disabled: !isChapterAddReady
  };
  return (
    <>
      <PopUp
        closeBtn={{ handleClick: closeModal }}
        submitBtn={submitBtnObj}
        title={`Chapter ${chapterData.sequence}`}>
        <div className={`${styles.popUpFormContainer}`}>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              label: 'Chapter Name:',
              placeholder: 'Enter name of the chapter (Upto 60 characters)',
              maxLength: 60,
              value: chapterData.name
            }}
            changeHandler={(e) => changeHandler(e, chapterData, setChapterData)}
          />

          <div className={`center-element-with-flex`}>
            <label className="w-25">Chapter Description:</label>
            <LabeledTextarea
              styleClass="w-75"
              inputOptions={{
                inputName: 'description',
                placeholder: 'Brief description in less than 160 characters',
                rows: 4,
                value: chapterData?.description,
                maxLength: 160
              }}
              changeHandler={(e) => changeHandler(e, chapterData, setChapterData)}
            />
          </div>
        </div>
      </PopUp>
    </>
  );
}
