import ZicopsTable from '@/components/common/ZicopsTable';
import styles from '../../userComps.module.scss';

const data = [
  {
    id: 1,
    completion: '39%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Harshad Gholap'
  },
  {
    id: 2,
    completion: '22%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Wasim Khan'
  },
  {
    id: 3,
    completion: '30%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Ravant Kumar'
  },
  {
    id: 4,
    completion: '41',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Abhishek Ghosh'
  },
  {
    id: 5,
    completion: '51%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Ravant Kumar'
  },
  {
    id: 6,
    completion: '62%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Joy Boy'
  },
  {
    id: 7,
    completion: '37%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Skyline Mercomp'
  },
  {
    id: 8,
    completion: '18%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Vajresh Patkar'
  },
  {
    id: 9,
    completion: '9%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Puneet Saraswat'
  },
  {
    id: 10,
    completion: '64%',
    email: 'abc@zicops.com',
    assigned_date: '12-03-2022',
    start_date: '15-03-2022',
    name: 'Ron Doe'
  }
];
const LearnerStatistics = () => {
  const columns = [
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email ID',
      flex: 1
    },
    {
      field: 'assigned_date',
      headerName: 'Assigned On',
      headerClassName: 'course-list-header',
      flex: 0.6
    },

    {
      field: 'start_date',
      headerClassName: 'course-list-header',
      headerName: 'Started On',
      flex: 0.6
    },
    {
      field: 'completion',
      headerClassName: 'course-list-header',
      headerName: 'Completion',
      sortable: false,
      flex: 0.55
    }
  ];
  return (
    <>
      <div className={`${styles.leanerStatsContainer}`}>
        <div className={`${styles.titleContainer}`}>
          <span className={`${styles.cohortTitle}`}>Learner Statistics</span>
        </div>
        <ZicopsTable
          columns={columns}
          data={data}
          tableHeight="60vh"
          customStyles={{ padding: '10px 0' }}
          hcompletioneFooterPagination={true}
          hideFooterPagination={true}
        />
        <div className={`${styles.learnerBottomContainer}`}>
          <div>
            <button className={`${styles.cohortButton1}`}>
              <img src="/images/svg/download.svg" height={16} alt="" />
              Download
            </button>
            <button className={`${styles.cohortButton3}`}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnerStatistics;
