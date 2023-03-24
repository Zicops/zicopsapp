import { changeHandler, truncateToN } from '@/helper/common.helper';
import {
  SampleAtom,
  SmeServicesAtom,
  CtServicesAtom,
  CdServicesAtom,
  getSampleObject
} from '@/state/atoms/vendor.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import BrowseAndUpload from '../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../common/FormComponents/LabeledDropdown';
import LabeledInput from '../common/FormComponents/LabeledInput';
import LabeledTextarea from '../common/FormComponents/LabeledTextarea';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import { acceptedFiles, currency, fileFormatArray, unit } from './Logic/vendorComps.helper';
import styles from './vendorComps.module.scss';
import { LIMITS, FILE_TYPES } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect } from 'react';
const AddSample = ({ pType }) => {
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const smeServices = useRecoilValue(SmeServicesAtom);
  const crtServices = useRecoilValue(CtServicesAtom);
  const cdServices = useRecoilValue(CdServicesAtom);

  useEffect(() => {
    setSampleData(getSampleObject());
  }, []);

  function getFileName() {
    return truncateToN(
      sampleData?.sampleFile?.name || getEncodedFileNameFromUrl(sampleData?.photoUrl),
      45
    );
  }

  const fileType = [];

  if (pType === 'sme') fileType = smeServices.formats;
  if (pType === 'crt') fileType = crtServices.formats;
  if (pType === 'cd') fileType = cdServices.formats;

  const fileFormatArray = fileType.map((val) => ({
    label: val,
    value: val
  }));

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <div className={`${styles.sampleName}`}>
          <label>Sample name:</label>
          <LabeledInput
            inputOptions={{
              inputName: 'sampleName',
              placeholder: 'Enter Sample name',
              value: sampleData?.sampleName
            }}
            changeHandler={(e) => changeHandler(e, sampleData, setSampleData)}
          />
        </div>
        <div className={`${styles.descriptionSample}`}>
          <div className={`${styles.description}`}>
            <label>Description</label>
            <LabeledTextarea
              inputOptions={{
                inputName: 'description',
                value: sampleData?.description
              }}
              changeHandler={(e) => changeHandler(e, sampleData, setSampleData)}
            />
          </div>
          <div className={`${styles.sample}`}>
            <label>Add sample file: </label>
            <BrowseAndUpload
              styleClassBtn={`${styles.button}`}
              title={getFileName() || 'Drag and Drop'}
              handleFileUpload={(e) => {
                const file = e.target.files?.[0];
                if (file?.size > LIMITS.vendorSampleSize) {
                  fileErrMsg = `File Size limit is ${Math.ceil(
                    LIMITS.vendorSampleSize / ONE_MB_IN_BYTES
                  )} mb`;
                  isValid = false;
                  setToastMsg({ type: 'Danger', message: fileErrMsg });
                }
                setSampleData({ ...sampleData, sampleFile: file });
              }}
              handleRemove={() => setSampleData({ ...sampleData, sampleFile: null })}
              previewData={{
                fileName: getFileName(),
                filePath: sampleData?.sampleFile
              }}
              inputName="upload_content"
              isActive={sampleData?.sampleFile}
              acceptedTypes={FILE_TYPES.vendorSampleFiles}
            />
          </div>
        </div>
        <div className={`${styles.file}`}>
          <label>File type:</label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'fileType',
              placeholder: 'Select File Type',
              value: {
                label: sampleData?.fileType,
                value: sampleData?.fileType
              },
              options: fileFormatArray,
              menuPlacement: 'top'
            }}
            changeHandler={(e) => changeHandler(e, sampleData, setSampleData, 'fileType')}
            styleClass={`${styles.fileFormatDropDown}`}
          />
        </div>
        <div className={`${styles.rateCurrencyUnit}`}>
          <div className={`${styles.rate}`}>
            <label>Rate:</label>
            <LabeledInput
              inputOptions={{
                inputName: 'rate',
                placeholder: 'Enter Rate',
                value: sampleData?.rate,
                isNumericOnly: true
              }}
              changeHandler={(e) => changeHandler(e, sampleData, setSampleData)}
            />
          </div>
          <div className={`${styles.currency}`}>
            <label>Currency:</label>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'currency',
                placeholder: 'Select Currency',
                value: {
                  label: sampleData?.currency,
                  value: sampleData?.currency
                },
                options: currency,
                menuPlacement: 'top'
              }}
              changeHandler={(e) => changeHandler(e, sampleData, setSampleData, 'currency')}
              styleClass={`${styles.currencyDropDown}`}
            />
          </div>
          <div className={`${styles.unit}`}>
            <label>Unit:</label>
            <LabeledDropdown
              dropdownOptions={{
                isSearchEnable: true,
                inputName: 'unit',
                placeholder: 'Select Unit',
                value: {
                  label: sampleData?.unit,
                  value: sampleData?.unit
                },
                options: unit,
                menuPlacement: 'top'
              }}
              changeHandler={(e) => changeHandler(e, sampleData, setSampleData, 'unit')}
              styleClass={`${styles.unitDropDown}`}
              isCreateable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSample;
