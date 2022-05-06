import ZicopsTable from '../../common/ZicopsTable';

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
        </>
      );
    },
    flex: 0.5
  }
];
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
const MyExamsTable = () => {
  // const { pageSize } = useHandlePagesize();
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
};

export default MyExamsTable;
