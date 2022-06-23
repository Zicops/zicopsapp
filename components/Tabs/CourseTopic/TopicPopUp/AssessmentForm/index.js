import { GET_CATS_N_SUB_CATS } from '../../../../../API/Queries';
import { loadQueryData } from '../../../../../helper/api.helper';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import styles from '../../../courseTabs.module.scss';

export default function AssessmentForm({ data }) {
  const categoryOption = [{ value: '', label: '-- Select --' }];
  const subCategoryOption = [{ value: '', label: '-- Select --' }];

  // load categories
  const { allCategories, allSubCategories } = loadQueryData(GET_CATS_N_SUB_CATS);
  allCategories?.map((val) => categoryOption.push({ value: val, label: val }));
  allSubCategories?.map((val) => subCategoryOption.push({ value: val, label: val }));

  const { examOptions, assessmentData, setAssessmentData, saveAssessment } = data;

  return (
    <>
      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: categoryOption,
            isSearchEnable: true,
            value: { value: assessmentData?.category, label: assessmentData?.category }
          }}
          changeHandler={(e) => setAssessmentData({ ...assessmentData, category: e.value })}
          isFiftyFifty={true}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Sub-Category',
            options: subCategoryOption,
            isSearchEnable: true,
            value: { value: assessmentData?.sub_category, label: assessmentData?.sub_category }
          }}
          changeHandler={(e) => setAssessmentData({ ...assessmentData, sub_category: e.value })}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        filterOption={(option, searchQuery) => {
          if (searchQuery) return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          if (!assessmentData?.category && !assessmentData?.sub_category) return true;

          return (
            option?.data?.SubCategory === assessmentData?.category ||
            option?.data?.SubCategory === assessmentData?.sub_category
          );
        }}
        dropdownOptions={{
          inputName: 'examId',
          label: 'Exam:',
          placeholder: 'Select the exam',
          options: examOptions,
          value: examOptions?.filter((option) => option?.value === assessmentData?.examId)[0],
          isSearchEnable: true
        }}
        changeHandler={(e) => setAssessmentData({ ...assessmentData, examId: e.value })}
      />
    </>
  );
}
