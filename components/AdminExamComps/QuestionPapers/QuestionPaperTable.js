import { useRouter } from 'next/router';
import ZicopsTable from '../../common/ZicopsTable';

const data = [
  {
    id: 1,
    name: 'Design Basics',
    type: 'Take Anytime',
    status: 'Saved',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  },
  {
    id: 2,
    name: 'Effective Communication',
    type: 'Schedule',
    status: 'Started',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 3,
    name: 'Core Java Fundamentals',
    type: 'Take Anytime',
    status: 'Saved',
    category: 'IT Development',
    subcategory: 'Java',
    noOfQuestions: 200
  },
  {
    id: 4,
    name: 'Design Basics',
    type: 'Schedule',
    status: 'Saved',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  },
  {
    id: 5,
    name: 'Effective Communication',
    type: 'Take Anytime',
    status: 'Saved',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 6,
    name: 'Core Java Fundamentals',
    type: 'Schedule',
    status: 'Saved',
    category: 'IT Development',
    subcategory: 'Java',
    noOfQuestions: 200
  },
  {
    id: 7,
    name: 'Effective Communication',
    type: 'Take Anytime',
    status: 'Saved',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 8,
    name: 'Design Basics',
    type: 'Schedule',
    status: 'Saved',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  }
];
export default function QuestionPaperTable({ isEdit = false }) {
  // const { pageSize } = useHandlePagesize();
  const router = useRouter();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 1
    },
    {
      field: 'status',
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
        return (
          <>
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
            {isEdit && (
              <>
                <button
                  onClick={() => router.push(router.asPath + `/add/${params.row.id}`)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    outline: '0',
                    border: '0'
                  }}>
                  <img src="/images/svg/edit-box-line.svg" width={20}></img>
                </button>
                <button
                  onClick={() => router.push('/admin/exams/my-exams/add')}
                  style={{ background: 'var(--primary)', color: 'var(--black)' }}>
                  + Create Exams
                </button>
              </>
            )}
          </>
        );
      },
      flex: isEdit? 1: 0.5
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={7}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
      />
    </>
  );
}
