import Button from '@/components/common/Button';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { changeHandler } from '@/helper/common.helper';
import { getFileNameFromUrl } from '@/helper/utils.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { useRecoilValue } from 'recoil';
import styles from './addCatSubCat.module.scss';
import useHandleAddCatSubCat from './Logic/useHandleAddCatSubCat';

export default function AddCatSubCat({ isSubCat = false, closePopUp }) {
  const popUpState = useRecoilValue(PopUpStatesAtomFamily('addCatSubCat'));
  const {
    catSubCatData,
    catoptions,
    setCatSubCatData,
    isAddReady,
    handleFileInput,
    addCategory,
    addSubCategory
  } = useHandleAddCatSubCat(isSubCat);

  return (
    <div className={`${styles.questionBankContainer}`}>
      {/*  name */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'Name',
          label: 'Name:',
          placeholder: 'Enter the name in less than 60 characters',
          value: catSubCatData?.Name,
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, catSubCatData, setCatSubCatData)}
      />
      {/* cat data */}
      {isSubCat && (
        <LabeledDropdown
          styleClass={styles.marginBottom}
          // isError={!fullCourse?.sub_category?.length && courseError?.details}
          dropdownOptions={{
            inputName: 'CatId',
            label: 'Category:',
            placeholder: 'Select Category',
            options: catoptions,
            value: { value: catSubCatData?.CatId, label: catSubCatData?.CatName },
            isSearchEnable: true
          }}
          changeHandler={(e) =>
            setCatSubCatData({ ...catSubCatData, CatId: e.value, CatName: e.label })
          }
        />
      )}

      {/* description */}
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'Description',
          label: 'Description:',
          placeholder: 'Enter the description in less than 160 characters',
          value: catSubCatData?.Description,
          maxLength: 160
        }}
        changeHandler={(e) => changeHandler(e, catSubCatData, setCatSubCatData)}
      />

      {/* Upload Image */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className={`w-25`}> Image:</label>
        <div className={`w-75`}>
          <BrowseAndUpload
            handleFileUpload={handleFileInput}
            handleRemove={() => setCatSubCatData({ ...catSubCatData, File: null })}
            previewData={{
              fileName: catSubCatData?.File?.name || getFileNameFromUrl(catSubCatData?.ImageUrl),
              filePath: catSubCatData?.File || catSubCatData?.ImageUrl
            }}
            inputName="image"
            isActive={catSubCatData?.File || catSubCatData?.ImageUrl}
          />
        </div>
      </div>

      <div className={`${styles.btnContainer}`}>
        <div>
          <Button text={'Cancel'} clickHandler={closePopUp} />
        </div>
        <div>
          <Button
            text={popUpState?.id ? 'Update' : 'Add'}
            isDisabled={!isAddReady}
            styleClass={isAddReady ? 'bg-primary' : ''}
            clickHandler={() => {
              isSubCat ? addSubCategory() : addCategory();
            }}
          />
        </div>
      </div>
    </div>
  );
}
