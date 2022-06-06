import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import { RefetchDataAtom } from '../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import { imageTypes } from './Logic/questionBank.helper';
import McqCard from './McqCard';

export default function QuestionsTable({ openEditQuestionMasterTab, isEdit }) {
  const [loadQBQuestions, { error: errorQBQuestionsData, refetch }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );

  const router = useRouter();
  const questionBankId = router?.query?.questionBankId;

  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('viewQuestions'));
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [refetchData, setRefetchData] = useRecoilState(RefetchDataAtom);

  const [qbQuestions, setQbQuestions] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(null);

  // load table data
  useEffect(() => {
    console.log('qb id', questionBankId);
    loadQBQuestions({ variables: { question_bank_id: questionBankId } }).then(({ data }) => {
      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions load error' });

      console.log('load qb questions');
      if (data?.getQuestionBankQuestions) setQbQuestions(data.getQuestionBankQuestions);
    });
  }, [questionBankId]);

  // set refetch query in recoil
  useEffect(() => {
    function refetchQbQuestions() {
      console.log('qb question reloaded');
      refetch().then(({ data: { getQuestionBankQuestions } }) => {
        setQbQuestions(getQuestionBankQuestions);
      });

      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions reload error' });
    }

    setRefetchData({
      ...refetchData,
      questionBankQuestions: refetchQbQuestions
    });
  }, []);

  useEffect(() => {
    console.log(qbQuestions);
  }, [qbQuestions]);

  const columns = [
    {
      field: 'Description',
      headerName: 'Questions',
      headerClassName: 'course-list-header',
      flex: 5,
      renderCell: (params) => {
        return (
          <div style={{ padding: '10px 0' }}>
            {params.row?.Description}
            {imageTypes.includes(params.row?.AttachmentType) && (
              <div style={{ paddingTop: '10px' }}>
                <img src={params.row?.Attachment} height={100} alt="" />
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
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Display',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {isEdit && (
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={() => openEditQuestionMasterTab(params.row)}>
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            )}

            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              onClick={() => {
                setViewQuestion({
                  id: params.row.id,
                  description: params.row.Description,
                  hint: params.row.Hint,
                  attachment: params.row.Attachment,
                  attachmentType: params.row.AttachmentType
                });
                udpatePopUpState(true);
              }}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
          </>
        );
      },
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
        tableHeight="70vh"
      />

      {/* view question pop up */}
      <PopUp
        isFooterVisible={false}
        title="View Question"
        isPopUpOpen={popUpState}
        closeBtn={{ handleClick: () => udpatePopUpState(false) }}>
        <McqCard
          questionData={viewQuestion}
          closePopUp={() => udpatePopUpState(false)}
          openEditQuestionMasterTab={
            isEdit
              ? () => {
                  udpatePopUpState(false);
                  openEditQuestionMasterTab();
                }
              : null
          }
        />
      </PopUp>
    </>
  );
}
