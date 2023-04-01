import LabeledDropdown from '@/common/FormComponents/LabeledDropdown';
import ZicopsButton from '@/components/common/ZicopsButton';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import styles from '../../adminCourseComps.module.scss';
import useHandleAssessment from '../../Logic/useHandleAssessment';

export default function TopicAssessmentForm({ topData = null, closePopUp = () => {} }) {
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(topicAssessment?.category);

  const { examsList, topicAssessment, setTopicAssessment, addUpdateAssessment } =
    useHandleAssessment(topData, closePopUp);

  return (
    <>
      <div className={styles.twoColumnDisplay}>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.cat],
            isSearchEnable: true,
            value: { value: topicAssessment?.category, label: topicAssessment?.category }
          }}
          changeHandler={(e) => {
            setActiveCatId(e);
            setTopicAssessment({ ...topicAssessment, category: e.value, subCategory: '' });
          }}
          isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'subCategory',
            label: 'Sub-Category:',
            placeholder: 'Sub-Category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat],
            isSearchEnable: true,
            value: { value: topicAssessment?.subCategory, label: topicAssessment?.subCategory }
          }}
          changeHandler={(e) => setTopicAssessment({ ...topicAssessment, subCategory: e.value })}
          isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
        />
      </div>

      <LabeledDropdown
        filterOption={(option, searchQuery) => {
          if (searchQuery) return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          if (!topicAssessment?.category && !topicAssessment?.subCategory) return true;

          return (
            option?.data?.Category === topicAssessment?.category ||
            option?.data?.SubCategory === topicAssessment?.subCategory
          );
        }}
        dropdownOptions={{
          inputName: 'examId',
          label: 'Exam:',
          placeholder: 'Select the exam',
          options: examsList,
          value: examsList?.filter((option) => option?.value === topicAssessment?.examId)[0],
          isSearchEnable: true
        }}
        changeHandler={(e) => {
          setTopicAssessment({
            ...topicAssessment,
            examId: e.value,
            category: e?.Category || '',
            subCategory: e?.SubCategory || ''
          });
        }}
        isLoading={examsList == null}
        isFullWidth={true}
        styleClass={`${styles.makeLabelInputColumnWise}`}
      />

      <div className="center-element-with-flex">
        <ZicopsButton
          customClass={styles.addTopicFormBtn}
          handleClick={closePopUp}
          display="Cancel"
        />
        <ZicopsButton
          handleClick={addUpdateAssessment}
          customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
          isDisabled={!topicAssessment?.examId}
          display={topicAssessment?.id ? 'Update' : 'Add'}
        />
      </div>
    </>
  );
}
