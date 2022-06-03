import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../../../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../../../../../helper/utils.helper';
import { QuestionPaperTabDataAtom } from '../../../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../../../state/atoms/toast.atom';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '../../../../../../common/ZicopsTable';
import { imageTypes } from '../../../../../QuestionBanks/Logic/questionBank.helper';

export default function QuestionTable({ questionBankId, handleSelectedQuestions }) {
  const [loadQBQuestions, { error: errorQBQuestionsData }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const { fixedQuestionData } = useRecoilValue(QuestionPaperTabDataAtom);

  const [qbQuestions, setQbQuestions] = useState([]);

  // load table data
  useEffect(() => {
    loadQBQuestions({ variables: { question_bank_id: questionBankId } }).then(({ data }) => {
      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions load error' });

      if (data?.getQuestionBankQuestions) setQbQuestions(data.getQuestionBankQuestions);
    });
  }, [questionBankId]);

  const columns = [
    {
      field: 'Description',
      headerName: 'Questions',
      headerClassName: 'course-list-header',
      flex: 5,
      renderCell: (params) => {
        return (
          <div>
            <LabeledRadioCheckbox
              type="checkbox"
              changeHandler={(e) => handleSelectedQuestions(params.row.id, e.target.checked)}
            />
            {params.row?.Description}

            {imageTypes.includes(params.row?.AttachmentType) && (
              <div>
                <img src={params.row?.Attachment} height={30} alt="" />
              </div>
            )}
          </div>
        );
      }
    },
    {
      field: 'Type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 0.5
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={qbQuestions}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="50vh"
      />
    </>
  );
}
