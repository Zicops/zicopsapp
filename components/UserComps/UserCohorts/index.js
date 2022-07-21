import ZicopsTable from '@/components/common/ZicopsTable';
import CohortMasterTab from './ChortMasterTab';

const data = [
  {
    id: 'Desco-Id-1',
    size: '32',
    name: 'Bussiness Cohort'
  },
  {
    id: 'Desco-Id-81',
    size: '20',
    name: 'Design Cohort'
  },
  {
    id: 'Desco-Id-51',
    size: '23',
    name: 'Devlopement Cohort'
  },
  {
    id: 'Desco-Id-16',
    size: '17',
    name: 'Management Cohort'
  },
  {
    id: 'Desco-Id-15',
    size: '40',
    name: 'Communication Cohort'
  },
  {
    id: 'Desco-Id-41',
    size: '15',
    name: 'ABC'
  },
  {
    id: 'Desco-Id-31',
    size: '20',
    name: 'Finance Cohort'
  },
  {
    id: 'Desco-Id-21',
    size: '80',
    name: 'Finance Cohort'
  },
  {
    id: 'Desco-Id-19',
    size: '30',
    name: 'Finance Cohort'
  },
  {
    id: 'Desco-Id-10',
    size: '65',
    name: 'Management Cohort'
  },
  {
    id: 'Desco-Id-11',
    size: '12',
    name: 'Communication Cohort'
  },
  {
    id: 'Desco-Id-12',
    size: '23',
    name: 'Devlopement Cohort'
  }
];
const UserCohorts = () => {
  const columns = [
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Cohort Name',
      flex: 1
    },
    {
      field: 'id',
      headerClassName: 'course-list-header',
      headerName: 'Cohort ID',
      flex: 1
    },
    {
      field: 'size',
      headerName: 'Size',
      headerClassName: 'course-list-header',
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
              }}
              // onClick={() => {
              //   setSelectedQB(getQuestionBankObject(params.row));
              //   setEditPopUp(true);
              // }}
            >
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              // onClick={() => {
              //   setSelectedQB(getQuestionBankObject(params.row));
              //   setEditPopUp(true);
              // }}
            >
              <img src="/images/svg/edit-box-line.svg" width={20}></img>
            </button>
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              // onClick={() => {
              //   setSelectedQB(getQuestionBankObject(params.row));
              //   setEditPopUp(true);
              // }}
            >
              <img src="/images/svg/download-white.svg" width={20}></img>
            </button>
          </>
        );
      },
      flex: 0.5
    }
  ];
  return (
    <>
      {/* <CohortMasterTab /> */}
      <ZicopsTable
        columns={columns}
        data={data}
        tableHeight="70vh"
        customStyles={{ padding: '10px 20px' }}
        hideFooterPagination={true}
      />
    </>
  );
};

export default UserCohorts;
