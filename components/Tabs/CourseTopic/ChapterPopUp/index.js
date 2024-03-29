import LabeledInput from '../../../common/FormComponents/LabeledInput';
import { changeHandler } from '../../../../helper/common.helper';
import LabeledTextarea from '../../../common/FormComponents/LabeledTextarea';
import PopUp from '../../../common/PopUp';
import styles from '../../courseTabs.module.scss';

export default function ChapterPopUp({
  popUpState,
  chapterData,
  setChapterData,
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
        popUpState={popUpState}
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
            changeHandler={(e) =>
              setChapterData({ ...chapterData, name: e.target.value, isUpdated: true })
            }
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
              changeHandler={(e) =>
                setChapterData({ ...chapterData, description: e.target.value, isUpdated: true })
              }
            />
          </div>
        </div>
      </PopUp>
    </>
  );
}
