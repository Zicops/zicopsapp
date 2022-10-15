import { COURSE_TYPES } from '@/helper/constants.helper';
import { courseContext } from '@/state/contexts/CourseContext';
import { useContext, useEffect } from 'react';
import { changeHandler } from '../../../../../helper/common.helper';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledTextarea from '../../../../common/FormComponents/LabeledTextarea';
import styles from '../../../courseTabs.module.scss';

export default function AddTopicForm({ topicData, setTopicData, isEdit = false }) {
  const { fullCourse } = useContext(courseContext);

  const typeOptions = [
    { value: 'Content', label: 'Content' },
    { value: 'Lab', label: 'Lab' },
    { value: 'Assessment', label: 'Assessment' },
    { value: 'Classroom', label: 'Classroom' }
  ];

  useEffect(() => {
    if (fullCourse.type !== COURSE_TYPES[3]) return;

    setTopicData({ ...topicData, type: typeOptions[2].value });
  }, []);

  return (
    <div className={`${styles.popUpFormContainer}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Topic Name:',
          placeholder: 'Enter topic name ( in less than 60 characters )',
          maxLength: 60,
          value: topicData.name
        }}
        changeHandler={(e) => setTopicData({ ...topicData, name: e.target.value, isUpdated: true })}
      />

      <div className={`center-element-with-flex`}>
        <label className="w-25">Description:</label>
        <LabeledTextarea
          styleClass="w-75"
          inputOptions={{
            inputName: 'description',
            placeholder: 'Brief description in less than 160 characters',
            rows: 4,
            value: topicData?.description,
            maxLength: 160
          }}
          changeHandler={(e) =>
            setTopicData({ ...topicData, description: e.target.value, isUpdated: true })
          }
        />
      </div>

      {!isEdit && (
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'type',
            label: 'Topic Type:',
            placeholder: 'Select topic type',
            options: typeOptions,
            value: topicData.type ? { value: topicData.type, label: topicData.type } : null,
            isDisabled: fullCourse.type === COURSE_TYPES[3]
          }}
          changeHandler={(e) => setTopicData({ ...topicData, type: e.value, isUpdated: true })}
        />
      )}
    </div>
  );
}
