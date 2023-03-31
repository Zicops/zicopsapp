import useHandleCourseData from '@/components/AdminCourseComps/Logic/useHandleCourseData';
import useHandleTopicClassroom from '@/components/AdminCourseComps/Logic/useHandleTopicClassroom';
import InputTimePicker from '@/components/common/FormComponents/InputTimePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import InputDatePicker from '@/components/common/InputDatePicker';
import ZicopsButton from '@/components/common/ZicopsButton';
import {
  ClassroomMasterAtom,
  CourseMetaDataAtom,
  TopicClassroomAtom
} from '@/state/atoms/courses.atom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';

export default function ClassroomForm({ topData = {} }) {
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
  const [topicClassroom, setTopicClassroom] = useRecoilState(TopicClassroomAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const {
    getTrainersAndModerators,
    trainerCandidates,
    moderatorCandidates,
    handleClassroomMasterChange
  } = useHandleCourseData();

  const { handleTopicClassroomChange, addUpdateTopicClassroom } = useHandleTopicClassroom();

  useEffect(() => {
    if (trainers?.length || moderators?.length) return;
    getTrainersAndModerators().then((data) => {
      // console.log(data, 'sdasd');s
    });
  }, []);

  let trainers = trainerCandidates?.map((user) => ({
    name: user?.full_name,
    isSelected: false,
    email: user?.email,
    user_id: user?.id
  }));
  let moderators = moderatorCandidates?.map((user) => ({
    name: user?.full_name,
    isSelected: false,
    email: user?.email,
    user_id: user?.id
  }));
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
            options: trainers?.map((trainee, index) => ({
              label: trainee.name,
              value: trainee.name,
              ...trainee
            })),
            value: !!classroomMaster?.trainers?.length
              ? classroomMaster?.trainers?.map((trainee) => ({
                  label: trainee?.value,
                  value: trainee?.value,
                  ...trainee
                }))
              : null
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) =>
            handleClassroomMasterChange({
              trainers: e?.map((item, index) => ({
                value: item?.value,
                email: item?.email,
                user_id: item?.user_id
              }))
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
            options: moderators?.map((mod, index) => ({
              label: mod.name,
              value: mod.name,
              ...mod
            })),
            value: !!classroomMaster?.moderators?.length
              ? classroomMaster?.moderators?.map((mod) => ({
                  label: mod?.value,
                  value: mod?.value,
                  ...mod
                }))
              : null
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) =>
            handleClassroomMasterChange({
              moderators: e?.map((item, index) => ({
                value: item?.value,
                email: item?.email,
                user_id: item?.user_id
              }))
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
            minDate={new Date()}
            changeHandler={(date) => {
              handleTopicClassroomChange({ trainingStartTime: date });
            }}
            // styleClass={`${styles.datePicker}`}
            // isDisabled={isPreview}
          />
        </section>

        <section className={`w-100 ${styles.makeLabelInputColumnWise}`}>
          <label htmlFor="startTime">Training Start Time:</label>
          <InputTimePicker
            selected={topicClassroom?.trainingStartTime}
            changeHandler={(date) => {
              handleTopicClassroomChange({ trainingStartTime: date });
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
            label: 'Duration :',
            placeholder: '00',
            value: topicClassroom?.duration,
            // isDisabled: isDisabled,
            isNumericOnly: true
          }}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleTopicClassroomChange({ duration: e?.target?.value })}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'language',
            label: 'Language :',
            placeholder: 'Select language',
            isSearchEnable: true,
            menuPlacement: 'top',
            isMulti: true,
            options: !!courseMetaData?.language?.length
              ? courseMetaData?.language?.map((lang) => ({ label: lang, value: lang }))
              : null,
            value: !!topicClassroom?.language?.length
              ? topicClassroom?.language?.map((lang) => ({ label: lang, value: lang }))
              : null
            // isDisabled: isDisabled
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) =>
            handleTopicClassroomChange({ language: e?.map((item) => item?.value) })
          }
        />
      </div>

      <ZicopsButton
        display={'Add'}
        float="right"
        padding="0.5em 1em"
        handleClick={() => {
          console.log(topData);

          addUpdateTopicClassroom(topData?.id);
        }}
      />
    </>
  );
}
