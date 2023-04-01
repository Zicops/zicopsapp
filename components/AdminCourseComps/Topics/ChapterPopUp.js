import LabeledInput from '@/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/common/FormComponents/LabeledTextarea';
import PopUp from '@/common/PopUp';
import styles from '../adminCourseComps.module.scss';
import useHandleChapter from '../Logic/useHandleChapter';

export default function ChapterPopUp({
  popUpState = [],
  modData = null,
  chapData = null,
  closePopUp = () => {}
}) {
  const { chapterData, setChapterData, addUpdateChapter } = useHandleChapter(
    modData,
    chapData,
    closePopUp
  );

  const submitBtnObj = {
    name: chapterData?.id ? 'Update' : 'Save',
    handleClick: addUpdateChapter,
    disabled: !chapterData?.name || !chapterData?.description
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
