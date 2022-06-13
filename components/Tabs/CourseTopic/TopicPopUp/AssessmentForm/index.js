import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_CATS_N_SUB_CATS, GET_LATEST_EXAMS, queryClient } from '../../../../../API/Queries';
import { loadQueryData } from '../../../../../helper/api.helper';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import styles from '../../../courseTabs.module.scss';

export default function AssessmentForm({ topicData }) {
  const [loadExams, { error: errorLoadExam }] = useLazyQuery(GET_LATEST_EXAMS, {
    client: queryClient
  });
  const categoryOption = [{ value: '', label: '-- Select --' }];
  const subCategoryOption = [{ value: '', label: '-- Select --' }];

  // load categories
  const { allCategories, allSubCategories } = loadQueryData(GET_CATS_N_SUB_CATS);
  allCategories?.map((val) => categoryOption.push({ value: val, label: val }));
  allSubCategories?.map((val) => subCategoryOption.push({ value: val, label: val }));

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [examOptions, setExamOptions] = useState([]);

  // load table data
  useEffect(() => {
    const LARGE_PAGE_SIZE = 999999999999;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    loadExams({ variables: queryVariables }).then(({ data }) => {
      if (errorLoadExam) return setToastMsg({ type: 'danger', message: 'exam load error' });

      const examData = data?.getLatestExams?.exams;

      const options = [];
      console.log(examData);
      if (examData) examData.forEach((exam) => options.push({ value: exam.id, label: exam.Name }));

      setExamOptions(options);
    });
  }, []);

  return (
    <>
      <div className={styles.twoInputContainer}>
        <LabeledDropdown
          //   styleClass={styles.halfInputField}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category:',
            placeholder: 'Select category',
            options: categoryOption
            // value: { value: metaData?.category, label: metaData?.category }
          }}
          //   changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'category')}
          isFiftyFifty={true}
        />

        <LabeledDropdown
          //   styleClass={`${styles.halfInputField} ${styles.paddingToLabel}`}
          dropdownOptions={{
            inputName: 'sub_category',
            label: 'Sub-Category:',
            placeholder: 'Select sub-category',
            options: subCategoryOption
            // value: { value: metaData?.sub_category, label: metaData?.sub_category }
          }}
          //   changeHandler={(e) => changeHandler(e, metaData, setMetaData, 'sub_category')}
          isFiftyFifty={true}
        />
      </div>

      <LabeledDropdown
        // styleClass={styles.inputField}
        // filterOption={(option, searchQuery) => {
        //   if (searchQuery) return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
        //   if (!metaData?.category && !metaData?.sub_category) return true;

        //   return (
        //     option?.data?.category === metaData?.category ||
        //     option?.data?.sub_category === metaData?.sub_category
        //   );
        // }}
        dropdownOptions={{
          inputName: 'examId',
          label: 'Exam:',
          placeholder: 'Select the exam',
          options: examOptions,
          //   value: questionBankOptions?.filter((option) => option?.value === metaData?.qbId)[0],
          isSearchEnable: true
        }}
        // changeHandler={(e) => setMetaData({ ...metaData, total_questions: 0, qbId: e.value })}
      />
    </>
  );
}
