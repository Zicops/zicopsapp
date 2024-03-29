import { DELETE_EXAM } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import PopUp from '@/components/common/PopUp';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_EXAM_SCHEDULE,
  GET_LATEST_EXAMS,
  GET_QUESTION_PAPER_META,
  queryClient
} from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import ZicopsTable from '../../common/ZicopsTable';
import PreviewPaper from '../common/PreviewPaper';

export default function ExamsTable({ isEdit = false }) {
  const [loadExams, { error: loadExamErr }] = useLazyQuery(GET_LATEST_EXAMS, {
    client: queryClient,
    context: !isEdit ? { headers: { tenant: COMMON_LSPS?.zicops } } : {}
  });
  const [loadSchedule, { error: loadScheduleErr }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient
  });
  const router = useRouter();
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [searchQuery, setSearchQuery] = useState('');
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamData, setSelectedExamData] = useState(null);

  // load table data
  useEffect(async () => {
    const queryVariables = {
      publish_time: Date.now(),
      pageSize: 9999999,
      pageCursor: '',
      searchText: searchQuery?.trim()
    };

    const res = await loadExams({ variables: queryVariables });
    if (loadExamErr) return setToastMsg({ type: 'danger', message: 'exams load error' });
    if (!res.data?.getLatestExams?.exams) return;

    const loadedExams = res.data.getLatestExams.exams || [];
    const exams = [];

    for (let i = 0; i < loadedExams.length; i++) {
      const exam = loadedExams[i];

      if (exam?.ScheduleType !== 'scheduled') {
        exams.push(exam);
        continue;
      }

      const schRes = await loadSchedule({
        variables: { exam_id: exam.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      const schData = schRes?.data?.getExamSchedule[0];

      const startDate = new Date(+schData?.Start * 1000);
      const schObj = {
        scheduleId: schData?.id || null,
        exam_start: new Date(startDate),
        exam_end: +schData?.End ? new Date(+schData?.End * 1000) : null,
        buffer_time: schData?.BufferTime || 0,
        is_stretch: !!+schData?.End,
        is_schedule_active: schData?.IsActive || true
      };

      if (!schObj.exam_end) {
        const qpMetaRes = await loadPaperMeta({
          variables: { question_paper_id: [exam.QpId] }
        }).catch((err) => {
          console.log(err);
          return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
        });

        const paperDuration = (+qpMetaRes?.data?.getQPMeta[0]?.SuggestedDuration || 0) / 60;
        schObj.exam_end = new Date(
          startDate.setMinutes(startDate.getMinutes() + +schObj.buffer_time + +paperDuration)
        );
      }

      const now = new Date();
      let status = exam.Status;

      if (schObj.exam_start <= now) status = 'STARTED';
      if (schObj.exam_end <= now) status = 'ENDED';

      exams.push({ ...exam, Status: status });
    }

    if (!exams?.length) setLoading(false);
    setExamData(sortArrByKeyInOrder([...exams], 'CreatedAt', false), setLoading(false));
  }, [searchQuery]);

  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'ScheduleType',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => {
        return <span style={{ textTransform: 'capitalize' }}>{params?.row?.ScheduleType}</span>;
      }
    },
    {
      field: 'Status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 1
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const addRoute = router.asPath + `/add/${params.row.id}`;

        return (
          <>
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              onClick={() => setSelectedExamData(params.row)}>
              <ToolTip title="View Exam" placement="bottom">
                <img src="/images/svg/eye-line.svg" width={20}></img>
              </ToolTip>
            </button>
            {isEdit && (
              <>
                <button
                  onClick={() => router.push(addRoute)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    outline: '0',
                    border: '0'
                  }}>
                  <ToolTip title={ADMIN_EXAMS.myExams.editBtn} placement="bottom">
                    <img src="/images/svg/edit-box-line.svg" width={20}></img>
                  </ToolTip>
                </button>
                <DeleteBtn
                  id={params?.id}
                  resKey="deleteExam"
                  mutation={DELETE_EXAM}
                  onDelete={() => setSearchQuery((prev) => `${prev} `)}
                />
              </>
            )}
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
        data={examData}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={loading}
        showCustomSearch={true}
        searchProps={{ handleSearch: (val) => setSearchQuery(val) }}
      />

      {/* preview popup */}
      {selectedExamData && (
        <PopUp
          title={selectedExamData?.Name}
          popUpState={[!!selectedExamData, setSelectedExamData]}
          isFooterVisible={false}>
          <PreviewPaper examId={selectedExamData?.id} />
        </PopUp>
      )}
    </>
  );
}
