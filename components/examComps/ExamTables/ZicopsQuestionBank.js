import ZicopsTable from '../../common/ZicopsTable';

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
    field: 'subcategory',
    headerClassName: 'course-list-header',
    headerName: 'Sub-category',
    flex: 1
  },
  {
    field: 'noOfQuestions',
    headerClassName: 'course-list-header',
    headerName: 'No. of Questions',
    flex: 1
  },
  {
    field: 'action',
    headerClassName: 'course-list-header',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      return (
        <button
          style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}
          onClick={() => {}}>
          <img src="/images/edit-icon.png" width={20}></img>
        </button>
        // <button
        //   style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}>
        //   <Switch {...label} defaultChecked color="success" />
        // </button>
      );
    },
    flex: 0.5
  }
];
const data = [
  {
    id: 1,
    name: 'Design Basics',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  },
  {
    id: 2,
    name: 'Effective Communication',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 3,
    name: 'Core Java Fundamentals',
    category: 'IT Development',
    subcategory: 'Java',
    noOfQuestions: 200
  },
  {
    id: 4,
    name: 'Design Basics',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  },
  {
    id: 5,
    name: 'Effective Communication',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 6,
    name: 'Core Java Fundamentals',
    category: 'IT Development',
    subcategory: 'Java',
    noOfQuestions: 200
  },
  {
    id: 7,
    name: 'Effective Communication',
    category: 'Soft Skill',
    subcategory: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 8,
    name: 'Design Basics',
    category: 'Design',
    subcategory: 'UI Design',
    noOfQuestions: 200
  }
];
const ZicopsQuestionBank = () => {
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

export default ZicopsQuestionBank;
