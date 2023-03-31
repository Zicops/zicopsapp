import { DELETE_TOPIC_RESOURCES } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import { useRecoilState } from 'recoil';
import { truncateToN } from '../../../../../helper/common.helper';
import { ResourcesAtom } from '../../../../../state/atoms/module.atoms';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import BrowseAndUpload from '../../../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import IconButton from '../../../../common/IconButton';
import styles from '../../../courseTabs.module.scss';
import useAddResources from '../../Logic/useAddResources';

export default function ResourcesForm({ courseId, topicId }) {
  const {
    newResource,
    handleResourceInput,
    addNewResource,
    isResourcesFormVisible,
    toggleResourceForm,
    isResourceReady
  } = useAddResources(courseId, topicId);

  const [resources, setResources] = useRecoilState(ResourcesAtom);

  const fileTypes = ['PDF', 'EXCEL', 'DOC', 'LINK'];
  const resourceTypesOptions = [];
  fileTypes.map((t) => resourceTypesOptions.push({ value: t, label: t }));

  return (
    <>
      {resources &&
        resources?.map((res, index) => (
          <Bar
            key={res.name + index}
            index={index + 1}
            text={res.name}
            type={
              <>
                {res.type}
                <DeleteBtn
                  id={res?.id}
                  resKey="deleteTopicResource"
                  mutation={DELETE_TOPIC_RESOURCES}
                  onDelete={() => {
                    const _resources = structuredClone(resources);
                    _resources.splice(index, 1);

                    setResources(_resources);
                  }}
                />
              </>
            }
          />
        ))}

      {isResourcesFormVisible && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            <div className={`center-element-with-flex ${styles.resourceType}`}>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'type',
                  placeholder: 'Select Resources Type',
                  options: resourceTypesOptions,
                  isSearchEnable: false,
                  value: newResource.type
                    ? { value: newResource.type, label: newResource.type }
                    : null
                }}
                changeHandler={handleResourceInput}
              />
            </div>

            <div className={`${styles.flexCenterWithGap}`}>
              {/* language */}
              <div className="w-35">
                <LabeledInput
                  inputOptions={{
                    inputName: 'name',
                    placeholder: 'Enter document name',
                    maxLength: 20,
                    value: newResource.name
                  }}
                  changeHandler={handleResourceInput}
                />
              </div>

              {/* subtitle file */}
              <div className="w-35">
                {newResource.type !== 'LINK' ? (
                  <BrowseAndUpload
                    handleFileUpload={handleResourceInput}
                    inputName="file"
                    isActive={newResource?.file?.name}
                    hidePreviewBtns={true}
                    acceptedTypes={`
                    ${newResource.type === 'EXCEL' ? '.csv, .xls, .xlsx' : ''}
                    ${newResource.type === 'DOC' ? '.doc, .docx' : ''} 
                    ${newResource.type === 'PDF' ? '.pdf' : ''}
                  `}
                  />
                ) : (
                  <LabeledInput
                    inputOptions={{
                      inputName: 'url',
                      placeholder: 'Enter document url',
                      value: newResource.url
                    }}
                    changeHandler={handleResourceInput}
                  />
                )}
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}>{truncateToN(newResource?.file?.name, 180)}</div>

            {/* footer btn */}
            <div className="center-element-with-flex">
              <Button
                text="Cancel"
                clickHandler={toggleResourceForm}
                styleClass={styles.topicContentSmallBtn}
              />
              <Button
                text="Add"
                clickHandler={addNewResource}
                styleClass={`${styles.topicContentSmallBtn} ${
                  isResourceReady ? styles.formFilled : ''
                }`}
                isDisabled={!isResourceReady}
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.centerAccordinBtn}`}>
        <IconButton styleClass="btnBlack" text="Add Resources" handleClick={toggleResourceForm} />
      </div>
    </>
  );
}
