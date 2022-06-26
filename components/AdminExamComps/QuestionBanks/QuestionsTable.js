import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import Button from '../../common/Button';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import McqCard from '../common/McqCard';
import { acceptedFileTypes } from './Logic/questionBank.helper';

export default function QuestionsTable({ openEditQuestionMasterTab, isEdit }) {
  const [loadQBQuestions, { error: errorQBQuestionsData, refetch }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );

  const router = useRouter();
  const questionBankId = router?.query?.questionBankId;

  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('viewQuestions'));
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [qbQuestions, setQbQuestions] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(null);

  // load table data
  useEffect(() => {
    loadQBQuestions({
      variables: { question_bank_id: questionBankId },
      fetchPolicy: 'no-cache'
    }).then(({ data }) => {
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
      flex: 4,
      renderCell: (params) => {
        const type = params.row?.AttachmentType;
        let fileSrc = null;
        if (params.row?.Attachment) fileSrc = params.row?.Attachment;

        return (
          <div style={{ padding: '10px 0' }}>
            {params.row?.Description}

            {acceptedFileTypes.includes(type) && (
              <div style={{ paddingTop: '10px' }}>
                {type?.includes('image') && <img src={fileSrc} height={100} alt="" />}
                {type?.includes('video') && <video controls src={fileSrc} height={100} />}
                {type?.includes('audio') && <audio controls src={fileSrc} />}
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
        const data = {
          id: params.row.id,
          description: params.row.Description,
          type: params.row.Type,
          difficulty: params.row.Difficulty,
          attachment: params.row.Attachment,
          attachmentType: params.row.AttachmentType,
          hint: params.row.Hint,
          qbmId: params.row.QbmId
        };
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
                onClick={() => openEditQuestionMasterTab(data)}>
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
                setViewQuestion(data);
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
        popUpState={[popUpState, udpatePopUpState]}>
        <>
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

          <div style={{ float: 'right', marginTop: '-30px' }}>
            <Button text={'Cancel'} clickHandler={() => udpatePopUpState(false)} />
            <Button
              text={'Edit'}
              isDisabled={!isEdit}
              clickHandler={() => {
                udpatePopUpState(false);
                openEditQuestionMasterTab(viewQuestion);
              }}
            />
          </div>
        </>
      </PopUp>
    </>
  );
}
