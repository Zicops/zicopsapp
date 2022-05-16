import { changeHandler } from '../../../../../helper/common.helper';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledTextarea from '../../../../common/FormComponents/LabeledTextarea';
import styles from '../../../courseTabs.module.scss';

export default function AddTopicForm({ topicData, setTopicData, isEdit = false }) {
  const typeOptions = [
    { value: 'Content', label: 'Content' },
    { value: 'Lab', label: 'Lab' },
    { value: 'Assessment', label: 'Assessment' }
  ];
  return (
    <div className={`${styles.popUpFormContainer}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Topic Name:',
          placeholder: 'Enter topic name ( in less than 20 characters )',
          maxLength: 20,
          value: topicData.name
        }}
        changeHandler={(e) => changeHandler(e, topicData, setTopicData)}
      />

      <div className={`center-element-with-flex`}>
        <label className="w-25">Description:</label>
        <LabeledTextarea
          styleClass="w-75"
          inputOptions={{
            inputName: 'description',
            placeholder: 'Brief description in less than 60 characters',
            rows: 4,
            value: topicData?.description,
            maxLength: 60
          }}
          changeHandler={(e) => changeHandler(e, topicData, setTopicData)}
        />
      </div>

      {!isEdit && (
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'type',
            label: 'Topic Type:',
            placeholder: 'Select topic type',
            options: typeOptions,
            value: topicData.type ? { value: topicData.type, label: topicData.type } : null
          }}
          changeHandler={(e) => changeHandler(e, topicData, setTopicData, 'type')}
        />
      )}
    </div>
  );
}
