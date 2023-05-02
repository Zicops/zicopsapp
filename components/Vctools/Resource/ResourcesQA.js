import useHandleTopicResources from '@/components/AdminCourseComps/Logic/useHandleTopicResources';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';

const ResourcesQA = ({ backToResource }) => {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });

  const {
    resourceFormData,
    acceptedFilesTypes,
    resourceTypeOptions,
    handleResourceInput,
    uploadTopicResources,
  } = useHandleTopicResources(activeClassroomTopicId);

  const { type, file, name, url } = resourceFormData;

  return (
    <div className={`${styles.resourcesQAContainer}`}>
      <p>Add New Resources</p>

      <div className={`${styles.resourcesInputs}`}>
        <p>Type :</p>
        <LabeledDropdown
          styleClass={styles.resourceInputLable}
          dropdownOptions={{
            inputName: 'type',
            placeholder: 'Select Resources Type',
            options: resourceTypeOptions,
            isSearchEnable: true,
            value: type ? { value: type, label: type } : null,
          }}
          changeHandler={handleResourceInput}
        />
      </div>

      <div className={`${styles.resourcesInputs}`}>
        <p>Name :</p>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            placeholder: 'Enter document name',
            maxLength: 20,
            value: name,
          }}
          inputClass={`${styles.resourceName}`}
          changeHandler={handleResourceInput}
        />
      </div>

      {type === TOPIC_RESOURCE_TYPES.link && (
        <div className={`${styles.resourcesInputs}`}>
          <p>Link :</p>
          <LabeledInput
            inputOptions={{
              inputName: 'url',
              placeholder: 'Enter document url',
              value: url,
            }}
            inputClass={`${styles.resourceName}`}
            changeHandler={handleResourceInput}
          />
        </div>
      )}

      <div className={`${styles.resourcedragAndDropContainer}`}>
        {type !== TOPIC_RESOURCE_TYPES.link && (
          <>
            <p>Upload :</p>
            <div className={`${styles.resourceUploadFile}`}>
              <BrowseAndUpload
                styleClassBtn={`${styles.button}`}
                title={file?.name || 'Drag & Drop'}
                handleFileUpload={handleResourceInput}
                inputName="file"
                isActive={file?.name}
                hidePreviewBtns={true}
                acceptedTypes={acceptedFilesTypes}
              />
            </div>
          </>
        )}

        <div className={`${styles.resourcesBtns}`}>
          <button className={`${styles.resourceCanselBtn}`} onClick={backToResource}>
            Cancel
          </button>

          <button
            className={`${styles.resourceAddBtn}`}
            disabled={!type || !name || !(file || url)}
            onClick={async (e) => {
              e.target.disabled = true;
              const isError = await uploadTopicResources();

              if (!isError) setToastMessage('Resource Uploaded Successfully', 'success');
              backToResource();
            }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResourcesQA;
