import Bar from '@/components/common/Bar';
import Button from '@/components/common/Button';
import DeleteBtn from '@/components/common/DeleteBtn';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import IconButton from '@/components/common/IconButton';
// import Button from '@/components/CustomVideoPlayer/Button';
import { useState } from 'react';
import styles from '../../../../adminCourse.module.scss';
const Resource = () => {
  const [resource, setResource] = useState([]);
  const [isResourceVisibale, setIsresourceVisible] = useState(true);
  const [isResourceReady, setIsResourcesReady] = useState(false);
  const newResource = {
    courseId: null,
    topicId: null,
    name: '',
    type: '',
    url: null,
    file: null
  };
  const selectType = [
    { lable: 'PDF', value: 'PDF' },
    { lable: 'DOC', value: 'DOC' },
    { lable: 'EXCEL', value: 'EXCEL' },
    { lable: 'LINK', value: 'LINK' }
  ];
  const[type,setType]=useState('') 
  const [name,setName]=useState('')
  return (
    <>
      {resource &&
        resource.map((data, index) => {
          <Bar
            key={1}
            index={2}
            text={''}
            type={
              <>
                {res.type}
                <DeleteBtn
                  id={res?.id}
                  resKey="deleteTopicResource"
                  //   mutation={DELETE_TOPIC_RESOURCES}
                  onDelete={() => {
                    const _resources = structuredClone(resource);
                    const resIndex = _resources?.findIndex((r) => r?.id === res?.id);
                    if (resIndex >= 0) _resources.splice(resIndex, 1);

                    setResource(_resources);
                  }}
                />
              </>
            }
          />;
        })}

      {isResourceVisibale && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            <div className={`center-element-with-flex ${styles.resourceTypeContainer}`}>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'type',
                  placeholder: 'Select Resources Type',
                  options: selectType,
                  isSearchEnable: true,
                  value: type
                    ? { value: type, label: type }
                    : null
                }}
                changeHandler={(e)=>
                {
                  setType(e?.value)
                }}
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
                    value: name
                  }}
                  changeHandler={(e)=>
                  {
                    setName(e?.value)
                  }}
                />
              </div>

              {/* subtitle file */}
              <div className="w-35">
                {newResource.type !== 'LINK' ? (
                  <BrowseAndUpload
                    // handleFileUpload={handleResourceInput}
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
                      placeholder: 'Enter document url'
                      // value: newResource.url
                    }}
                    // changeHandler={handleResourceInput}
                  />
                )}
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}></div>

            {/* footer btn */}
            <div className={`${styles.resourceBtns}`}>
              <Button
                text="Cancel"
                // clickHandler={toggleResourceForm}
                styleClass={styles.topicContentSmallBtn}
              />
              <Button
                text="Add"
                // clickHandler={addNewResource}
                styleClass={`${styles.topicContentSmallBtn} ${
                  isResourceReady ? styles.formFilled : ''
                }`}
                isDisabled={!isResourceReady}
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.resourceAddBtn}`}>
        <IconButton
          styleClass="btnBlack"
          text="Add Resources"
          handleClick={() => {
            setIsresourceVisible(!isResourceVisibale);
          }}
        />
      </div>
    </>
  );
};
export default Resource;
