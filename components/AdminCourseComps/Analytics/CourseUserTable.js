import ZicopsTable from '@/components/common/ZicopsTable';
import { CourseUsers } from './courseAnalyticsDashboard.helper';
import styles from '../adminCourse.module.scss';
import SectionTitle from '@/components/AdminAnalyticsDashboardComp/common/SectionTitle';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { useState } from 'react';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';

export default function CourseUserTable() {
  const [searchText, setSearchText] = useState('');
  const [statusOption, setStatusOption] = useState(null);

  const columns = [
    {
      field: 'index',
      headerClassName: 'course-list-header',
      headerName: 'Index',
      width: 80
    },
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Name',
      width: 150
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email Id',
      width: 250
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params?.row?.status === 'Completed' ? '#26BA4D' : '#F6AC3C' }}>
          {params?.row?.status}
        </span>
      )
    },
    {
      field: 'completion',
      headerClassName: 'course-list-header',
      headerName: 'Completion %',
      width: 150
    },
    {
      field: 'assignedBy',
      headerClassName: 'course-list-header',
      headerName: 'Assigned By',
      width: 150
    },
    {
      field: 'assignedOn',
      headerClassName: 'course-list-header',
      headerName: 'Assigned On',
      width: 150
    },
    {
      field: 'timeTaken',
      headerClassName: 'course-list-header',
      headerName: 'Time Taken',
      width: 150
    },
    {
      field: 'timelineCompliant',
      headerClassName: 'course-list-header',
      headerName: 'Timeline complaint',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params?.row?.timelineCompliant === 'Yes' ? '#26BA4D' : '#F6AC3C' }}>
          {params?.row?.timelineCompliant}
        </span>
      )
    }
  ];

  const options = [
    { label: 'All', value: 'All' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  return (
    <div className={`${styles.courseUsersContainer}`}>
      <div className={`${styles.courseUserSearchHeader}`}>
        <h3>Learners Details</h3>
        <div className={`${styles.courseUserSearchDownload}`}>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`${styles.userSearch}`}
          />
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'category',
              placeholder: 'All',
              options: options,
              value: statusOption
            }}
            hideSelectedOptions={false}
            isFullWidth={true}
            styleClass={`${styles.statusFilterDropdown}`}
            changeHandler={(e) => {
              setStatusOption(e);
            }}
          />
          <button>Download</button>
        </div>
      </div>

      <ZicopsTable
        columns={columns}
        data={CourseUsers}
        customId={'index'}
        pageSize={5}
        rowsPerPageOptions={[3]}
        tableHeight="55vh"
      />
    </div>
  );
}
