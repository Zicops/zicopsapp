import ToolTip from '@/components/common/ToolTip';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_LATEST_QUESTION_PAPERS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
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
          suggested_duration: params.row.SuggestedDuration
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
              <ToolTip title="View Paper" placement="left">
                <span>
                  <img src="/images/svg/eye-line.svg" width={20} />
                </span>
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
                  <ToolTip title="Edit Paper" placement="bottom">
                    <img src="/images/svg/edit-box-line.svg" width={20}></img>
                  </ToolTip>
                </button>

                <ToolTip title="Create Exam" placement="bottom">
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

    loadQuestionPaper({ variables: queryVariables }).then(({ data }) => {
      if (errorQuestionPaperData)
        return setToastMsg({ type: 'danger', message: 'question paper load error' });

      if (data?.getLatestQuestionPapers?.questionPapers)
        setQuestionPaper(data.getLatestQuestionPapers.questionPapers);
    });
  }, []);

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={questionPaper}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={loading}
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
