import { DELETE_QUESTION_BANK_QUESTION } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import QuestionOptionView from '@/components/common/QuestionOptionView';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_QUESTION_BANK_QUESTIONS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen, isWordIncluded } from '../../../helper/utils.helper';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import Button from '../../common/Button';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import { acceptedFileTypes } from './Logic/questionBank.helper';

export default function QuestionsTable({ openEditQuestionMasterTab, isEdit }) {
  const [loadQBQuestions, { loading, error: errorQBQuestionsData, refetch }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );

  const router = useRouter();
  const questionBankId = router?.query?.questionBankId;

  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('viewQuestions'));
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const [searchQuery, setSearchQuery] = useState('');
  const [qbQuestions, setQbQuestions] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(null);

  // load table data
  useEffect(() => {
    if (!questionBankId) return;

    loadQBQuestions({
      variables: { question_bank_id: questionBankId },
      fetchPolicy: 'no-cache'
    }).then(({ data }) => {
      if (errorQBQuestionsData)
        return setToastMsg({ type: 'danger', message: 'QB Questions load error' });

      if (data?.getQuestionBankQuestions)
        setQbQuestions(
          data.getQuestionBankQuestions
            ?.filter((q) => q?.Status === 'Y')
            ?.sort((c1, c2) => c2?.CreatedAt - c1?.CreatedAt) || []
        );
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
      headerName: 'Action',
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
          qbmId: params.row.QbmId,
          status: params.row.Status
        };
        return (
          <>
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
              <ToolTip title="View Question Details" placement="bottom">
                <img src="/images/svg/eye-line.svg" width={20}></img>
              </ToolTip>
            </button>

            {isEdit && (
              <>
                <button
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    outline: '0',
                    border: '0'
                  }}
                  onClick={() => openEditQuestionMasterTab(data)}>
                  <ToolTip title="Edit Question" placement="bottom">
                    <img src="/images/svg/edit-box-line.svg" width={20}></img>
                  </ToolTip>
                </button>

                <DeleteBtn
                  id={params?.id}
                  resKey="deleteQuestionBankQuestion"
                  mutation={DELETE_QUESTION_BANK_QUESTION}
                  onDelete={() => {
                    const _questions = structuredClone(qbQuestions);
                    const index = _questions?.findIndex((q) => q?.id === params.row.id);
                    if (index >= 0) _questions?.splice(index, 1);

                    setQbQuestions(_questions);
                  }}
                />
              </>
            )}
          </>
        );
      },
      flex: isDev ? 0.7 : 0.6
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={qbQuestions?.filter((question) => isWordIncluded(question?.Description, searchQuery))}
        pageSize={isDev ? 5 : getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight={isDev ? '53vh' : '60vh'}
        loading={loading}
        showCustomSearch={true}
        searchProps={{ handleSearch: (val) => setSearchQuery(val), delayMS: 0 }}
      />

      {/* view question pop up */}
      <PopUp
        isFooterVisible={false}
        title="View Question"
        popUpState={[popUpState, udpatePopUpState]}>
        <>
          <QuestionOptionView showAnswer={true} questionData={viewQuestion} showType="difficulty" />

          <div style={{ float: 'right' }}>
            <ToolTip
              title={ADMIN_EXAMS.zicopsQuestionBanks.questionsScreen.viewQuestions.cancelBtn}
              placement="left">
              <span>
                <Button text={'Cancel'} clickHandler={() => udpatePopUpState(false)} />
              </span>
            </ToolTip>
            <ToolTip
              title={ADMIN_EXAMS.zicopsQuestionBanks.questionsScreen.viewQuestions.editBtn}
              placement="right">
              <span>
                <Button
                  text={'Edit'}
                  isDisabled={!isEdit}
                  clickHandler={() => {
                    udpatePopUpState(false);
                    openEditQuestionMasterTab(viewQuestion);
                  }}
                />
              </span>
            </ToolTip>
          </div>
        </>
      </PopUp>
    </>
  );
}
