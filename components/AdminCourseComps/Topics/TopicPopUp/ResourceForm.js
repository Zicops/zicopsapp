import { DELETE_TOPIC_RESOURCES } from '@/api/Mutations';
import useHandleTopicResources from '@/components/AdminCourseComps/Logic/useHandleTopicResources';
import Button from '@/components/common/Button';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import IconButton from '@/components/common/IconButton';
import Spinner from '@/components/common/Spinner';
import { COURSE_MAX_LENGTH_VALUES, TOPIC_RESOURCE_TYPES } from '@/constants/course.constants';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import { TopicResourcesAtom } from '@/state/atoms/courses.atom';
import { useRecoilState } from 'recoil';
import styles from '../../adminCourseComps.module.scss';
import DataRowWithThreeSection from '../../common/DataRowWithThreeSection';

export default function ResourceForm({ topData = null }) {
  const [topicResources, setTopicResources] = useRecoilState(TopicResourcesAtom);

  const {
    resourceFormData,
    acceptedFilesTypes,
    resourceTypeOptions,
    isFormVisible,
    handleResourceInput,
    handleSubmit,
    toggleForm,
  } = useHandleTopicResources(topData?.id);

  const { type, file, name, url } = resourceFormData;

  const resourcesList = topicResources?.map((res, i) => ({ ...res, key: i }));

  return (
    <>
      {topicResources == null && <Spinner customStyles={{ margin: '2em auto' }} />}

      {resourcesList?.map((res, index) => (
        <DataRowWithThreeSection
          key={res?.key}
          type={index + 1}
          description={res?.file?.name || getEncodedFileNameFromUrl(res?.url)}
          details={res?.type}
          deleteProps={{
            id: res?.id,
            resKey: 'deleteTopicResource',
            mutation: DELETE_TOPIC_RESOURCES,
            onDelete: () => {
              const _resources = structuredClone(topicResources);
              _resources.splice(index, 1);

              setTopicResources(_resources);
            },
          }}
        />
      ))}

      {isFormVisible && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            {/* type */}
            <div className={`center-element-with-flex ${styles.resourceTypeContainer}`}>
              <LabeledDropdown
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

            <div className={`${styles.flexCenterWithGap}`}>
              {/* name */}
              <div className="w-35">
                <LabeledInput
                  inputOptions={{
                    inputName: 'name',
                    placeholder: 'Enter document name',
                    maxLength: COURSE_MAX_LENGTH_VALUES?.resourcesName,
                    value: name,
                  }}
                  changeHandler={handleResourceInput}
                />
              </div>

              {/* resource file */}
              <div className="w-35">
                {type !== TOPIC_RESOURCE_TYPES.link ? (
                  <BrowseAndUpload
                    handleFileUpload={handleResourceInput}
                    inputName="file"
                    isActive={file?.name}
                    hidePreviewBtns={true}
                    acceptedTypes={acceptedFilesTypes}
                  />
                ) : (
                  <LabeledInput
                    inputOptions={{
                      inputName: 'url',
                      placeholder: 'Enter document url',
                      value: url,
                    }}
                    changeHandler={handleResourceInput}
                  />
                )}
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}></div>

            {/* footer btn */}
            <div className="center-element-with-flex">
              <Button
                text="Cancel"
                styleClass={styles.topicContentSmallBtn}
                clickHandler={toggleForm}
              />
              <Button
                text="Add"
                styleClass={`${styles.topicContentSmallBtn} ${styles.addBtn}`}
                isDisabled={!type || !name || !(file || url)}
                clickHandler={handleSubmit}
              />
            </div>
          </div>
        </>
      )}

      <div className={`center-element-with-flex ${styles.marginBetweenInputs}`}>
        <IconButton styleClass="btnBlack" text="Add Resources" handleClick={toggleForm} />
      </div>
    </>
  );
}
