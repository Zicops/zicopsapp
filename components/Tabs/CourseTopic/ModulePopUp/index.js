import { changeHandler } from '../../../../helper/common.helper';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../../common/FormComponents/LabeledTextarea';
import PopUp from '../../../common/PopUp';
import styles from '../../courseTabs.module.scss';

export default function ModulePopUp({
  closeModal,
  moduleData,
  setModuleData,
  isAddModuleReady,
  handleSubmit,
  isEdit = false
}) {
  const expertiseOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' }
  ];
  const submitBtnObj = {
    name: isEdit ? 'Update' : 'Save',
    handleClick: handleSubmit,
    disabled: !isAddModuleReady
  };
  console.log(moduleData);
  return (
    <PopUp
      closeBtn={{ handleClick: closeModal }}
      submitBtn={submitBtnObj}
      title={`Module ${moduleData.sequence}`}>
      <div className={`${styles.popUpFormContainer}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            label: 'Module Name:',
            placeholder: 'Enter name of the module (Upto 60 characters)',
            maxLength: 60,
            value: moduleData.name
          }}
          changeHandler={(e) => changeHandler(e, moduleData, setModuleData)}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'level',
            label: 'Expertise Level:',
            placeholder: 'Select the expertise level of the course',
            options: expertiseOptions,
            value: moduleData.level ? { value: moduleData.level, label: moduleData.level } : null
          }}
          changeHandler={(e) => changeHandler(e, moduleData, setModuleData, 'level')}
        />

        <div className={`center-element-with-flex`}>
          <label className="w-25">Description:</label>
          <LabeledTextarea
            styleClass="w-75"
            inputOptions={{
              inputName: 'description',
              placeholder: 'Brief description in less than 160 characters',
              rows: 4,
              value: moduleData?.description,
              maxLength: 160
            }}
            changeHandler={(e) => changeHandler(e, moduleData, setModuleData)}
          />
        </div>

        <div className={`center-element-with-flex ${styles.isChapterWiseLabelContainer}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label={
              <div className={`${styles.isChapterWiseLabel}`}>
                Chapterwise Structure
                <span>
                  Check this if you want the module of the course to be structured chapterwise or
                  else it will be default topicwise
                </span>
              </div>
            }
            name="isChapter"
            value="Beginner"
            isChecked={moduleData.isChapter}
            isDisabled={isEdit}
            changeHandler={(e) => changeHandler(e, moduleData, setModuleData)}
          />
        </div>
      </div>
    </PopUp>
  );
}
