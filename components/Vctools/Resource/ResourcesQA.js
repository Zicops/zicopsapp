import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { vcResource } from '@/state/atoms/vctool.atoms';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../vctoolMain.module.scss';
const ResourcesQA = ({ backToResource }) => {
  const [resourceAtom, setResourceAtom] = useRecoilState(vcResource);
  const [type, setType] = useState('');
  const [resourceName, setResourceName] = useState('');
  const resourceType = [
    { label: 'pdf', value: 'pdf' },
    { label: 'Doc', value: 'Doc' }
  ];
  return (
    <div className={`${styles.resourcesQAContainer}`}>
      <p>Add new resources</p>
      <div className={`${styles.resourcesInputs}`}>
        <p>Type:</p>
        <LabeledDropdown
          styleClass={styles.resourceInputLable}
          // isError={!fullCourse?.language?.length && courseError?.master}
          dropdownOptions={{
            placeholder: 'Link',
            value: { value: type, label: type },
            options: resourceType
          }}
          changeHandler={(e) => setType(e?.value)}
        />
      </div>
      <div className={`${styles.resourcesInputs}`}>
        <p>Type:</p>
        <input
          placeholder="Enter resource name"
          value={resourceName}
          className={`${styles.resourceName}`}
          type="text"
          onChange={(e) => {
            setResourceName(e.target.value);
          }}
        />
      </div>

      <div className={`${styles.resourcedragAndDropContainer}`}>
        <p>Upload:</p>
        <div className={`${styles.resourceUploadFile}`}>
          <BrowseAndUpload
            styleClassBtn={`${styles.button}`}
            title={'Drag & Drop'}
            // handleFileUpload={handlePhotoInput}
            // handleRemove={() => setVendorData({ ...vendorData, vendorProfileImage: null })}
            // previewData={{
            //     fileName: getFileName(),
            //     filePath: vendorData?.vendorProfileImage || vendorData?.photoUrl
            // }}
            // filePreview={vendorData?.vendorProfileImage || vendorData?.photoUrl}
            // inputName="vendorProfileImage"
            // isActive={vendorData?.vendorProfileImage || vendorData?.photoUrl}
            // isDisabled={isViewPage}
          />
        </div>
        <div className={`${styles.resourcesBtns}`}>
          <button
            className={`${styles.resourceCanselBtn}`}
            onClick={() => {
              backToResource();
            }}>
            cancel
          </button>
          <button className={`${styles.resourceAddBtn}`}>Add</button>
        </div>
      </div>
    </div>
  );
};
export default ResourcesQA;
