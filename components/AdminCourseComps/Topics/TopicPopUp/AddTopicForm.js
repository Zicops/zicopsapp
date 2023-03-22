import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import ZicopsButton from '@/components/common/ZicopsButton';
import { COURSE_TYPES, TOPIC_TYPES } from '@/constants/course.constants';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../adminCourseComps.module.scss';

export default function AddTopicForm({
  topicData = {},
  setTopicData = {},
  handleSubmit = () => {},
  handleCancel = () => {}
}) {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const types = Object.values(TOPIC_TYPES).map((type) => ({ label: type, value: type }));
  // remove classroom type if self paced course
  if (courseMetaData?.type === COURSE_TYPES.selfPaced) {
    types.splice(
      types.findIndex((t) => t.value === TOPIC_TYPES.classroom),
      1
    );
  }

  return (
    <>
      <div className={`${styles.addTopicForm}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            label: 'Topic Name:',
            placeholder: 'Enter topic name ( in less than 60 characters )',
            maxLength: 60,
            value: topicData.name
          }}
          changeHandler={(e) => setTopicData({ ...topicData, name: e.target.value })}
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
            changeHandler={(e) => setTopicData({ ...topicData, description: e.target.value })}
          />
        </div>

        {!topicData?.id && (
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'type',
              label: 'Topic Type:',
              placeholder: 'Select topic type',
              options: types,
              value: topicData.type ? { value: topicData.type, label: topicData.type } : null,
              isDisabled: courseMetaData.type !== COURSE_TYPES.selfPaced
            }}
            changeHandler={(e) => setTopicData({ ...topicData, type: e.value })}
          />
        )}

        <div className="center-element-with-flex">
          <ZicopsButton
            customClass={styles.addTopicFormBtn}
            handleClick={handleCancel}
            display="Cancel"
          />
          <ZicopsButton
            handleClick={handleSubmit}
            customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
            isDisabled={!topicData?.name || !topicData?.description || !topicData?.type}
            display={topicData?.id ? 'Update' : 'Add'}
          />
        </div>
      </div>
    </>
  );
}
