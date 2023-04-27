import ZicopsTable from '@/components/common/ZicopsTable';
import { CourseUsers } from './courseAnalyticsDashboard.helper';
import styles from '../adminCourse.module.scss';
import SectionTitle from '@/components/AdminAnalyticsDashboardComp/common/SectionTitle';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { useState, useEffect } from 'react';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import useHandleIndividualCourseAnalytics from '../Logic/useHandleIndividualCourseAnalytics';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import moment from 'moment';

export default function CourseUserTable() {
  const [searchText, setSearchText] = useState('');
  const [statusOption, setStatusOption] = useState(null);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const [learnerTableData, setLearnerTableData] = useState([]);

  const { getPaginatedLearner } = useHandleIndividualCourseAnalytics();

  useEffect(() => {
    getPaginatedLearner(courseMetaData?.id).then((resp) => {
      const newArr = resp?.getLearnerDetails?.data.map((obj, index) => ({
        index: index + 1,
        ...obj,
      }));

      setLearnerTableData(newArr);
    });
  }, []);

  const columns = [
    {
      field: 'index',
      headerClassName: 'course-list-header',
      headerName: 'Index',
      width: 80,
    },
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email Id',
      width: 250,
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params?.row?.status === 'completed' ? '#26BA4D' : '#F6AC3C' }}>
          {params?.row?.status === 'open' || params?.row?.status === 'started'
            ? 'In progress'
            : 'Completed'}
        </span>
      ),
    },
    {
      field: 'completion',
      headerClassName: 'course-list-header',
      headerName: 'Completion %',
      width: 150,
    },
    {
      field: 'assigned_by',
      headerClassName: 'course-list-header',
      headerName: 'Assigned By',
      width: 150,
    },
    {
      field: 'assigned_on',
      headerClassName: 'course-list-header',
      headerName: 'Assigned On',
      width: 150,
      renderCell: (params) => (
        <span>{moment.unix(params?.row?.assigned_on).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      field: 'time_taken',
      headerClassName: 'course-list-header',
      headerName: 'Time Taken',
      width: 150,
      renderCell: (params) => <span>{moment.unix(params?.row?.time_taken).format('D')}</span>,
    },
    {
      field: 'timeline_complaint',
      headerClassName: 'course-list-header',
      headerName: 'Timeline Compliant',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: params?.row?.timeline_complaint === 'Yes' ? '#26BA4D' : '#F6AC3C' }}>
          {params?.row?.timeline_complaint}
        </span>
      ),
    },
  ];

  const options = [
    { label: 'All', value: 'All' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Completed', value: 'Completed' },
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
              value: statusOption,
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
        data={learnerTableData}
        customId={'index'}
        pageSize={5}
        rowsPerPageOptions={[3]}
        tableHeight="55vh"
      />
    </div>
  );
}
