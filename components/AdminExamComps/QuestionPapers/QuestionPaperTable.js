import { DELETE_QUESTION_PAPER } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_LATEST_QUESTION_PAPERS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen, isWordIncluded } from '../../../helper/utils.helper';
import { QuestionPaperTabDataAtom } from '../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import Preview from './Preview';

export default function QuestionPaperTable({ isEdit = false }) {
  const [loadQuestionPaper, { loading, error: errorQuestionPaperData }] = useLazyQuery(
    GET_LATEST_QUESTION_PAPERS,
    { client: queryClient }
  );
  const router = useRouter();
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);

  const [searchQuery, setSearchQuery] = useState('');
  const [questionPaper, setQuestionPaper] = useState([]);
  const [masterData, setMasterData] = useState(null);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'Category',
      headerClassName: 'course-list-header',
      headerName: 'Category',
      flex: 1
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const paperMasterData = {
          id: params.row.id,
          name: params.row.name,
          description: params.row.Description,
          category: params.row.Category,
          sub_category: params.row.SubCategory,
          difficulty_level: params.row.DifficultyLevel,
          section_wise: params.row.SectionWise,
          suggested_duration: +params.row.SuggestedDuration / 60,
          status: params.row?.Status
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
              onClick={() => setMasterData(paperMasterData)}>
              <ToolTip title={ADMIN_EXAMS.myQuestionPapers.viewBtn} placement="left">
                <img src="/images/svg/eye-line.svg" width={20}></img>
              </ToolTip>
            </button>
            {isEdit && (
              <>
                <button
                  onClick={() => {
                    setQuestionPaperTabData({
                      ...questionPaperTabData,
                      paperMaster: paperMasterData
                    });
                    router.push(router.asPath + `/add/${params.row.id}`);
                  }}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    outline: '0',
                    border: '0'
                  }}>
                  <ToolTip title={ADMIN_EXAMS.myQuestionPapers.editBtn} placement="bottom">
                    <img src="/images/svg/edit-box-line.svg" width={20}></img>
                  </ToolTip>
                </button>

                <DeleteBtn
                  id={params?.id}
                  resKey="deleteQuestionPaper"
                  mutation={DELETE_QUESTION_PAPER}
                  onDelete={() => {
                    const _papers = structuredClone(questionPaper);
                    const index = _papers?.findIndex((qp) => qp?.id === params.row.id);
                    if (index >= 0) _papers?.splice(index, 1);

                    setQuestionPaper(_papers);
                  }}
                />

                <ToolTip title={ADMIN_EXAMS.myQuestionPapers.createExamBtn} placement="bottom">
                  <button
                    onClick={() => {
                      router.push(
                        `/admin/exams/my-exams/add?qpId=${params.row.id}`,
                        '/admin/exams/my-exams/add'
                      );
                    }}
                    style={{ background: 'var(--primary)', color: 'var(--black)' }}>
                    + Create Exams
                  </button>
                </ToolTip>
              </>
            )}
          </>
        );
      },
      flex: isEdit ? 1 : 0.5
    }
  ];

  if (isEdit) {
    columns.splice(2, 0, {
      field: 'Status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 1
    });
  }

  // load table data
  useEffect(() => {
    const queryVariables = { publish_time: Date.now(), pageSize: 99999, pageCursor: '' };
    // if (searchQuery) queryVariables.searchText = searchQuery;

    loadQuestionPaper({ variables: queryVariables }).then(({ data }) => {
      if (errorQuestionPaperData)
        return setToastMsg({ type: 'danger', message: 'question paper load error' });

      if (data?.getLatestQuestionPapers?.questionPapers)
        setQuestionPaper(
          sortArrByKeyInOrder(data.getLatestQuestionPapers.questionPapers, 'CreatedAt', false)
        );
    });
    // }, [searchQuery]);
  }, []);

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={questionPaper?.filter((paper) => isWordIncluded(paper?.name, searchQuery))}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={loading}
        showCustomSearch={true}
        searchProps={{
          handleSearch: (val) => setSearchQuery(val),
          delayMS: 0
        }}
      />

      {/* preview popup */}
      {masterData && (
        <PopUp
          title={masterData?.name}
          popUpState={[!!masterData, setMasterData]}
          isFooterVisible={false}>
          <Preview masterData={masterData || {}} />
        </PopUp>
      )}
    </>
  );
}
