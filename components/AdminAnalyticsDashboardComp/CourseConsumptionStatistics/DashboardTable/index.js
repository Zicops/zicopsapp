import ZicopsTable from '@/components/common/ZicopsTable';

const columns = [
  {
    field: 'courseName',
    headerName: 'Course name',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 300
  },
  {
    field: 'activeLearners',
    headerName: 'Active learners',
    type: 'number',
    headerClassName: 'course-list-header',
    headerAlign: 'center',
    align: 'center',
    // flex: 1
    width: 180
  },
  {
    field: 'completedBy',
    headerName: 'Completed by',
    type: 'number',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 180
  },
  {
    field: 'averageCompletionTime',
    headerName: 'Average completion time',
    type: 'number',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 250
  },
  {
    field: 'averageCompliance',
    headerName: 'Average compliance %',
    type: 'number',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 250
  },
  {
    field: 'publishedOn',
    headerName: 'Published on',
    type: 'number',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 180
  },
  {
    field: 'ownedBy',
    headerName: 'Owned by',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 130
  },
  {
    field: 'duration',
    headerName: 'Duration',
    type: 'number',
    headerClassName: 'course-list-header',
    // flex: 1
    width: 100
  }
];

const data = [
  {
    id: 1,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 2,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 3,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 4,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 5,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 6,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 7,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 8,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  },
  {
    id: 9,
    courseName: 'Design basics: UI Design 101',
    activeLearners: 162,
    completedBy: 20,
    averageCompletionTime: '20hr',
    averageCompliance: '20%',
    publishedOn: '2Feb 2023',
    ownedBy: 'Zicops',
    duration: '5hrs'
  }
];

export default function DashboardTable() {
  return (
    <div>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={5}
        rowsPerPageOptions={[3]}
        tableHeight="55vh"
      />
    </div>
  );
}
