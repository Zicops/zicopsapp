import InputTimePicker from '@/components/common/FormComponents/InputTimePicker';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import InputDatePicker from '@/components/common/InputDatePicker';
import ZicopsButton from '@/components/common/ZicopsButton';
import styles from '../../adminCourseComps.module.scss';

export default function ClassroomForm() {
  return (
    <>
      {/* instructor and moderator */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          // isError={!courseMetaData?.category?.length && error?.includes('category')}
          dropdownOptions={{
            inputName: 'instructor',
            label: 'Instructor :',
            placeholder: 'Select or add trainer',
            isSearchEnable: true,
            options: [],
            value: null
          }}
          //   isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => {
            // setActiveCatId(e);
            // handleChange({ category: e?.value, subCategory: '' });
          }}
        />

        <LabeledDropdown
          //   isError={!courseMetaData?.subCategory?.length && error?.includes('subCategory')}
          dropdownOptions={{
            inputName: 'moderator',
            label: 'Moderator :',
            placeholder: 'Select or add moderator',
            isSearchEnable: true,
            options: [],
            value: null
          }}
          //   isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          //   changeHandler={(e) => handleChange({ subCategory: e?.value })}
        />
      </div>

      {/* training data and time */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <section className={`w-100 ${styles.makeLabelInputColumnWise}`}>
          <label htmlFor="startDate">Training Start Date:</label>
          <InputDatePicker
            // selectedDate={examTabData?.exam_start}
            minDate={new Date()}
            // changeHandler={(date) => {
            //   const startDate = updateDate(date, examTabData?.exam_start);

            //   const isNewDateAfterEnd = startDate > examTabData?.exam_end;

            //   setExamTabData({
            //     ...examTabData,
            //     exam_start: startDate,
            //     exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
            //   });
            // }}
            // isDisabled={isPreview}
          />
        </section>

        <section className={`w-100 ${styles.makeLabelInputColumnWise}`}>
          <label htmlFor="startTime">Training Start Time:</label>
          <InputTimePicker
          // selected={examTabData?.exam_start}
          // changeHandler={(date) => {
          //   const endTime = updateTime(date, examTabData?.exam_start);

          //   setExamTabData({
          //     ...examTabData,
          //     exam_start: endTime,
          //     exam_end: getTimeWithDuration(endTime)
          //   });
          // }}
          // isDisabled={isPreview}
          />
        </section>
      </div>

      {/* duration and language */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledInput
          // inputClass={!courseMetaData?.name?.length && error?.includes('name') ? 'error' : ''}
          inputOptions={{
            inputName: 'duration',
            label: 'Duration :',
            placeholder: '00',
            value: '',
            // isDisabled: isDisabled,
            isNumeric: true
          }}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />

        <LabeledDropdown
          //   isError={!courseMetaData?.subCategory?.length && error?.includes('subCategory')}
          dropdownOptions={{
            inputName: 'language',
            label: 'Language :',
            placeholder: 'Select language',
            isSearchEnable: true,
            options: [],
            value: null
          }}
          //   isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          //   changeHandler={(e) => handleChange({ subCategory: e?.value })}
        />
      </div>

      <ZicopsButton display={'Add'} float="right" padding="0.5em 1em" />
    </>
  );
}
