import { useHandleCatSubCat } from '@/helper/hooks.helper';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import styles from '../../../courseTabs.module.scss';

export default function AssessmentForm({ data }) {
  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  // loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, assessmentData?.category);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(assessmentData?.category);

  const { examOptions, assessmentData, setAssessmentData, saveAssessment } = data;

  return (
    <>
      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.cat],
            isSearchEnable: true,
            value: { value: assessmentData?.category, label: assessmentData?.category }
          }}
          changeHandler={(e) => {
            setActiveCatId(e);
            setAssessmentData({ ...assessmentData, category: e.value });
          }}
          isFiftyFifty={true}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Sub-Category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat],
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
            option?.data?.Category === assessmentData?.category ||
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
