import ZicopsTable from '@/components/common/ZicopsTable';
import React from 'react'
const columns = [
  {
    field: 'courseName',
    headerName: 'Course name',
    headerClassName: 'course-list-header',
    flex: 1.5
  },
  {
    field: 'numberOfLearners',
    headerName: 'Number of learners',
    type: 'number',
    headerClassName: 'course-list-header',
    headerAlign: 'center',
    align: 'center',
    flex: 1
  },
  {
    field: 'courseOwnedBy',
    headerName: 'Course owned by',
    headerClassName: 'course-list-header',
    flex: 1
  }
];
const data = [
  {
    id: 1,
    courseName: 'Design basics: UI Design 101',
    numberOfLearners: 162,
    courseOwnedBy: 'Zicops'
  },
  {
    id: 2,
    courseName: 'Human Interface Fundamentals',
    numberOfLearners: 162,
    courseOwnedBy: 'Zicops'
  },
  {
    id: 3,
    courseName: 'Cybersecurity Applications',
    numberOfLearners: 62,
    courseOwnedBy: 'Zicops'
  },
  {
    id: 4,
    courseName: 'Human Interface Fundamentals',
    numberOfLearners: 2,
    courseOwnedBy: 'Zicops'
  },
  {
    id: 5,
    courseName: 'Design basics: UI Design 101',
    numberOfLearners: 12,
    courseOwnedBy: 'Zicops'
  },
  {
    id: 6,
    courseName: 'Cybersecurity Applications',
    numberOfLearners: 220,
    courseOwnedBy: 'Zicops'
  }
];
export default function CourseTable() {
  return (
    <div>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={5}
        rowsPerPageOptions={[3]}
        tableHeight="53.1vh"
      />
    </div>
  );
}
