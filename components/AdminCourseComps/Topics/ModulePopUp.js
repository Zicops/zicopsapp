import LabeledDropdown from '@/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/common/FormComponents/LabeledTextarea';
import PopUp from '@/common/PopUp';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import useHandleModule from '../Logic/useHandleModule';

export default function ModulePopUp({ popUpState, modData = null, closePopUp = () => {} }) {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const { moduleData, setModuleData, addUpdateModule } = useHandleModule(modData, closePopUp);

  const expertiseOptions =
    courseMetaData?.expertiseLevel?.split(',')?.map((level) => ({ value: level, label: level })) ||
    [];

  const submitBtnObj = {
    name: moduleData?.id ? 'Update' : 'Save',
    handleClick: addUpdateModule,
    disabled: !moduleData?.name || !moduleData?.description || !moduleData?.level
  };

  return (
    <PopUp
      popUpState={popUpState}
      submitBtn={submitBtnObj}
      title={`Module ${moduleData?.sequence}`}>
      <div className={`${styles.popUpFormContainer}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            label: 'Module Name:',
            placeholder: 'Enter name of the module (Upto 60 characters)',
            maxLength: 60,
            value: moduleData?.name
          }}
          changeHandler={(e) =>
            setModuleData({ ...moduleData, name: e.target.value, isUpdated: true })
          }
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'level',
            label: 'Expertise Level:',
            placeholder: 'Select the expertise level of the course',
            options: expertiseOptions,
            value: moduleData?.level ? { value: moduleData?.level, label: moduleData?.level } : null
          }}
          changeHandler={(e) => setModuleData({ ...moduleData, level: e.value, isUpdated: true })}
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
            changeHandler={(e) =>
              setModuleData({ ...moduleData, description: e.target.value, isUpdated: true })
            }
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
            isChecked={moduleData?.isChapter}
            isDisabled={moduleData?.id && (modData?.chapters?.length || modData?.topics?.length)}
            changeHandler={(e) =>
              setModuleData({ ...moduleData, isChapter: e.target.checked, isUpdated: true })
            }
          />
        </div>
      </div>
    </PopUp>
  );
}
