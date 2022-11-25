import { DELETE_QUESTION_BANK } from '@/api/Mutations';
import { CUSTOM_TOOLTIP_STYLE } from '@/components/common/CustomTooltip/customTooltip.helper';
import DeleteBtn from '@/components/common/DeleteBtn';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_LATEST_QUESTION_BANK, GET_QUESTIONS_NAMES, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import {
  getQuestionBankObject,
  RefetchDataAtom,
  SelectedQuestionBankAtom
} from '../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import AddQuestionBank from './AddQuestionBank';

export default function QuestionBankTable({ isEdit = false }) {
  const [loadQuestionBank, { loading: loadRefetch, error: errorQuestionBankData, refetch }] =
    useLazyQuery(GET_LATEST_QUESTION_BANK, { client: queryClient });

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [addPopUp, setAddPopUp] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));
  const [editPopUp, setEditPopUp] = useRecoilState(PopUpStatesAtomFamily('editQuestionBank'));
  const [selectedQB, setSelectedQB] = useRecoilState(SelectedQuestionBankAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [refetchData, setRefetchData] = useRecoilState(RefetchDataAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  // state for storing table data
  const [questionBank, setQuestionBank] = useState([]);

  // load table data
  const queryVariables = { publish_time: Date.now(), pageSize: 99999, pageCursor: '' };
  useEffect(async () => {
    if (searchQuery) queryVariables.searchText = searchQuery?.trim();

    const qbRes = await loadQueryDataAsync(GET_LATEST_QUESTION_BANK, queryVariables);
    if (qbRes?.error) return setToastMsg({ type: 'danger', message: 'question bank load error' });

    const questionBankData = structuredClone(qbRes?.getLatestQuestionBank?.questionBanks) || [];
    if (!questionBankData.length) return;

    for (let i = 0; i < questionBankData.length; i++) {
      const qb = questionBankData[i];
      const questionsRes = await loadQueryDataAsync(GET_QUESTIONS_NAMES, {
        question_bank_id: qb.id
      });
      const questionsArr =
        questionsRes?.getQuestionBankQuestions?.filter((q) => q?.Status === 'Y') || [];
      questionBankData[i].noOfQuestions = questionsArr.length;
    }

    if (!questionBankData?.length) return setLoading(false);
    setQuestionBank(
      sortArrByKeyInOrder([...questionBankData], 'created_at', false),
      setLoading(false)
    );
  }, [searchQuery]);

  // set refetch query in recoil
  useEffect(() => {
    function refetchBankData() {
      refetch(queryVariables).then(({ data: { getLatestQuestionBank } }) => {
        setQuestionBank(getLatestQuestionBank?.questionBanks);
      });

      if (errorQuestionBankData)
        return setToastMsg({ type: 'danger', message: 'Question Bank Refetch Error' });
    }

    setRefetchData({
      ...refetchData,
      questionBank: refetchBankData
    });
  }, []);

  // //useEffect to setLoading false if there is not any data
  // useEffect(() => {
  //   if (loadRefetch) return setLoading(true);
  //   if (!loadRefetch || !questionBank?.length) return setLoading(false);
  //   // if (!questionBank?.length) return setLoading(false);
  // }, [loadRefetch]);

  useEffect(() => {
    if (addPopUp && !isPopUpDataPresent) setSelectedQB(getQuestionBankObject());
  }, [addPopUp]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'category',
      headerClassName: 'course-list-header',
      headerName: 'Category',
      flex: 1
    },
    {
      field: 'sub_category',
      headerClassName: 'course-list-header',
      headerName: 'Sub-category',
      flex: 1
    },
    {
      field: 'noOfQuestions',
      headerClassName: 'course-list-header',
      headerName: 'No. of Questions',
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div style={{ textAlign: 'center', width: '100%' }}>{params?.row?.noOfQuestions}</div>
        );
      }
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
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
                setSelectedQB(getQuestionBankObject(params.row));
                router.push(router.asPath + `/${params.row.id}`);
              }}>
              <ToolTip title={ADMIN_EXAMS.myQuestionBanks.viewBtn} placement="bottom">
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
                  onClick={() => {
                    setSelectedQB(getQuestionBankObject(params.row));
                    setEditPopUp(true);
                  }}>
                  <ToolTip title={ADMIN_EXAMS.myQuestionBanks.editBtn} placement="bottom">
                    <img src="/images/edit-icon.png" width={20}></img>
                  </ToolTip>
                </button>

                <DeleteBtn
                  id={params?.id}
                  resKey="deleteQuestionBank"
                  mutation={DELETE_QUESTION_BANK}
                  onDelete={() => setSearchQuery(' ')}
                />
              </>
            )}
          </>
        );
      },
      flex: 0.6
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={questionBank}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={loading}
        showCustomSearch={true}
        searchProps={{ handleSearch: (val) => setSearchQuery(val) }}
      />

      {/* add question bank pop up */}
      <PopUp
        title="Add Question Bank"
        popUpState={[addPopUp, setAddPopUp]}
        isFooterVisible={false}
        tooltipCloseBtnTitle={ADMIN_EXAMS.myQuestionBanks.addQuestionBank.crossBtn}>
        <AddQuestionBank
          closePopUp={() => setAddPopUp(false)}
          customTooltipStyle={CUSTOM_TOOLTIP_STYLE}
        />
      </PopUp>

      {/* edit question bank pop up */}
      <PopUp
        title="Edit Question Bank"
        popUpState={[editPopUp, setEditPopUp]}
        isFooterVisible={false}>
        <AddQuestionBank
          isEdit={true}
          closePopUp={() => setEditPopUp(false)}
          customTooltipStyle={CUSTOM_TOOLTIP_STYLE}
        />
      </PopUp>
    </>
  );
}
