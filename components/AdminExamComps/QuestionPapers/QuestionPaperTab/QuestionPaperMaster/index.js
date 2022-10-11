import CustomTooltip from '@/components/common/CustomTooltip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loadCatSubCat } from '../../../../../helper/data.helper';
import { QuestionPaperTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import NextButton from '../../../../common/NextButton';
import useHandlePaperTab from '../Logic/useHandlePaperTab';
import styles from '../questionPaperTab.module.scss';

export default function QuestionPaperMaster() {
  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Competent', label: 'Competent' },
    { value: 'Proficient', label: 'Proficient' }
  ];

  const router = useRouter();
  const questionPaperId = router.query?.questionPaperId;
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);

  const { handleInput, addNewQuestionPaper, updateQuestionPaper } = useHandlePaperTab();

  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // // update sub cat based on cat
  // loadCatSubCat(
  //   catAndSubCatOption,
  //   setCatAndSubCatOption,
  //   questionPaperTabData.paperMaster?.category
  // );
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(
    questionPaperTabData.paperMaster?.category
  );

  return (
    <div className={`${styles.qb_container}`}>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Question Paper Name:',
          placeholder: 'Enter name in less than 160 characters',
          value: questionPaperTabData.paperMaster?.name,
          maxLength: 160,
          isDisabled: questionPaperTabData.paperMaster?.id
        }}
        changeHandler={(e) => handleInput(e)}
        styleClass={`${styles.inputField}`}
      />
      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter description in less than 160 characters',
          value: questionPaperTabData.paperMaster?.description,
          maxLength: 160
        }}
        changeHandler={(e) => handleInput(e)}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'category',
          label: 'Category:',
          placeholder: 'Select Category',
          options: [{ value: 'General', label: 'General' }, ...catSubCat?.cat],
          isDisabled: !!questionPaperTabData?.sectionData?.length,
          value: {
            value: questionPaperTabData.paperMaster?.category,
            label: questionPaperTabData.paperMaster?.category
          },
          isSearchEnable: true
        }}
        changeHandler={(e) => {
          setActiveCatId(e);
          handleInput(e, 'category');
        }}
      />
      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'sub_category',
          label: 'Sub-Category:',
          placeholder: 'Select Sub-Category',
          options: [{ value: 'General', label: 'General' }, ...catSubCat?.subCat],
          isDisabled: !!questionPaperTabData?.sectionData?.length,
          value: {
            value: questionPaperTabData.paperMaster?.sub_category,
            label: questionPaperTabData.paperMaster?.sub_category
          },
          isSearchEnable: true,
          menuPlacement: 'top'
        }}
        changeHandler={(e) => handleInput(e, 'sub_category')}
      />

      <div className={`${styles.twoInputContainers}`}>
        <LabeledDropdown
          styleClass={styles.inputField}
          isFiftyFifty={true}
          dropdownOptions={{
            inputName: 'difficulty_level',
            label: 'Difficulty Level:',
            placeholder: 'Select the difficulty level',
            options: difficultyOptions,
            isDisabled: !!questionPaperTabData?.sectionData?.length,
            value: {
              value: questionPaperTabData.paperMaster?.difficulty_level,
              label: questionPaperTabData.paperMaster?.difficulty_level
            },
            menuPlacement: 'top'
          }}
          changeHandler={(e) => handleInput(e, 'difficulty_level')}
        />

        <LabeledInput
          isFiftyFifty={true}
          styleClass={styles.inputField}
          inputOptions={{
            inputName: 'suggested_duration',
            label: 'Suggested Duration:',
            placeholder: 'Enter duration in Minutes',
            value: questionPaperTabData.paperMaster?.suggested_duration,
            isNumericOnly: true
          }}
          changeHandler={(e) => handleInput(e)}
        />
      </div>

      <div className={`${styles.footer}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label={
            <span>
              Section Wise
              <CustomTooltip
                info={
                  ADMIN_EXAMS.myQuestionPapers.addQuestionPapers.questionPaperMasterTab.sectionWise
                }
              />
            </span>
          }
          name="section_wise"
          isDisabled={!!questionPaperTabData?.sectionData?.length}
          isChecked={questionPaperTabData.paperMaster?.section_wise}
          changeHandler={(e) => handleInput(e)}
        />

        <NextButton
          clickHandler={() => (questionPaperId ? updateQuestionPaper(1) : addNewQuestionPaper(1))}
          tooltipText={ADMIN_EXAMS.myQuestionPapers.addQuestionPapers.questionPaperMasterTab.nextBtn}
        />
      </div>
    </div>
  );
}
