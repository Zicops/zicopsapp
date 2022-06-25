import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_LATEST_EXAMS, queryClient } from '../../../API/Queries';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import ZicopsTable from '../../common/ZicopsTable';

export default function ExamsTable({ isEdit = false }) {
  const [loadExams, { error }] = useLazyQuery(GET_LATEST_EXAMS, { client: queryClient });

  const router = useRouter();
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [exams, setExams] = useState([]);

  // load table data
  useEffect(() => {
    const queryVariables = { publish_time: Date.now(), pageSize: 50, pageCursor: '' };

    loadExams({ variables: queryVariables }).then(({ data }) => {
      if (error) return setToastMsg({ type: 'danger', message: 'exams load error' });

      if (data?.getLatestExams?.exams) setExams(data.getLatestExams.exams);
    });
  }, []);

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
      flex: 1
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
              onClick={() => router.push(`${addRoute}?isPreview=true`, addRoute)}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
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
                  <img src="/images/svg/edit-box-line.svg" width={20}></img>
                </button>
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
        data={exams}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
      />
    </>
  );
}
