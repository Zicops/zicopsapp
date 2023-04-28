import InputTimePicker from '@/components/common/FormComponents/InputTimePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import InputDatePicker from '@/components/common/InputDatePicker';
import Spinner from '@/components/common/Spinner';
import ZicopsButton from '@/components/common/ZicopsButton';
import {
  ClassroomMasterAtom,
  CourseMetaDataAtom,
  TopicClassroomAtom,
} from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';

export default function ClassroomForm({ handleChange = () => {}, closeAccordion = () => {} }) {
  const classroomMaster = useRecoilValue(ClassroomMasterAtom);
  const topicClassroom = useRecoilValue(TopicClassroomAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  if (topicClassroom == null) return <Spinner customStyles={{ margin: '2em auto' }} />;

  return (
    <>
      {/* instructor and moderator */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          // isError={!courseMetaData?.category?.length && error?.includes('category')}
          dropdownOptions={{
            inputName: 'instructor',
            label: 'Instructor :',
            placeholder: 'Select or add trainer',
            isSearchEnable: true,
            isMulti: true,
            options: classroomMaster?.trainers?.map((trainee, index) => ({
              label: trainee.value,
              ...trainee,
            })),
            value: !!topicClassroom?.trainers?.length
              ? topicClassroom?.trainers?.map((trainee) => ({
                  label: trainee?.value,
                  value: trainee?.value,
                  ...trainee,
                }))
              : null,
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) =>
            handleChange({
              trainers: e?.map((item, index) => ({
                value: item?.value,
                email: item?.email,
                user_id: item?.user_id,
              })),
            })
          }
        />

        <LabeledDropdown
          // isError={!courseMetaData?.category?.length && error?.includes('category')}
          dropdownOptions={{
            inputName: 'moderator',
            label: 'Moderator :',
            placeholder: 'Select or add trainer',
            isSearchEnable: true,
            isMulti: true,
            options: classroomMaster?.moderators?.map((mod, index) => ({
              label: mod.value,
              ...mod,
            })),
            value: !!topicClassroom?.moderators?.length
              ? topicClassroom?.moderators?.map((mod) => ({
                  label: mod?.value,
                  value: mod?.value,
                  ...mod,
                }))
              : null,
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) =>
            handleChange({
              moderators: e?.map((item, index) => ({
                value: item?.value,
                email: item?.email,
                user_id: item?.user_id,
              })),
            })
          }
        />
      </div>

      {/* training data and time */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <section className={`w-100 ${styles.makeLabelInputColumnWise}`}>
          <label htmlFor="startDate">Training Start Date:</label>
          <InputDatePicker
            selectedDate={topicClassroom?.trainingStartTime}
            minDate={classroomMaster?.courseStartDate || new Date()}
            changeHandler={(date) => {
              handleChange({ trainingStartTime: date });
            }}
            maxDate={classroomMaster?.courseEndDate || null}
            // styleClass={`${styles.datePicker}`}
            // isDisabled={isPreview}
          />
        </section>

        <section className={`w-100 ${styles.makeLabelInputColumnWise}`}>
          <label htmlFor="startTime">Training Start Time:</label>
          <InputTimePicker
            selected={topicClassroom?.trainingStartTime}
            changeHandler={(date) => {
              handleChange({ trainingStartTime: date });
            }}
            // isDisabled={isPreview}
          />
        </section>
      </div>

      {/* duration and language */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledInput
          // inputClass={!courseMetaData?.name?.length && error?.includes('name') ? 'error' : ''}
          inputOptions={{
            inputName: 'duration',
            label: 'Duration : (Mins)',
            placeholder: '0',
            value: topicClassroom?.duration / 60,
            // isDisabled: isDisabled,
            isNumericOnly: true,
          }}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ duration: e?.target?.value * 60 })}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'language',
            label: 'Language :',
            placeholder: 'Select language',
            isSearchEnable: true,
            menuPlacement: 'top',
            options: !!courseMetaData?.language?.length
              ? courseMetaData?.language?.map((lang) => ({ label: lang, value: lang }))
              : null,
            value: { label: topicClassroom?.language, value: topicClassroom?.language },
            // isDisabled: topicClassroom?.language?.length === 1
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ language: e?.value })}
        />
      </div>

      <ZicopsButton
        display={'Add'}
        float="right"
        padding="0.5em 1em"
        handleClick={closeAccordion}
      />
    </>
  );
}
