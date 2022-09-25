import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../../../../state/atoms/module.atoms';
import styles from '../../../courseTabs.module.scss';
import Bar from '../../../../common/Bar';
import IconButton from '../../../../common/IconButton';
import useAddResources from '../../Logic/useAddResources';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import BrowseAndUpload from '../../../../common/FormComponents/BrowseAndUpload';
import Button from '../../../../common/Button';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import { truncateToN } from '../../../../../helper/common.helper';

export default function ResourcesForm({ courseId, topicId }) {
  const {
    newResource,
    handleResourceInput,
    addNewResource,
    isResourcesFormVisible,
    toggleResourceForm,
    isResourceReady
  } = useAddResources(courseId, topicId);

  const resources = useRecoilValue(ResourcesAtom);

  const fileTypes = ['PDF', 'EXCEL', 'DOC', 'LINK'];
  const resourceTypesOptions = [];
  fileTypes.map((t) => resourceTypesOptions.push({ value: t, label: t }));

  return (
    <>
      {resources &&
        resources.map((res, index) => (
          <Bar key={res.name + index} index={index + 1} text={res.name} type={res.type} />
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
