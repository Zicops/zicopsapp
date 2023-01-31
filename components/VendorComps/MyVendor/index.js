import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';

const data = [
  { id: '1001', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1002', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1003', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1004', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1005', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1006', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1007', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' },
  { id: '1008', vendor_name: 'TCS ', vendor_type: 'Company', services: 'SME, Content development' }
];

const MyVendor = () => {
  const columns = [
    {
      field: 'vendor_name',
      headerClassName: 'course-list-header',
      headerName: 'Vendor Name',
      flex: 1
    },
    {
      field: 'vendor_type',
      headerClassName: 'course-list-header',
      headerName: 'Vendor type',
      flex: 1
    },
    {
      field: 'services',
      headerClassName: 'course-list-header',
      headerName: 'Services',
      flex: 1
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
        // let status = '';
        // if (disabledUserList?.includes(params?.row?.id)) status = 'disable';
        // let _lspStatus = params?.row?.lsp_status;
        // if (status === 'disable') {
        //   _lspStatus = USER_MAP_STATUS.disable;
        // }

        // let isLearner = false;
        // let isAdmin = false;
        // isAdmin = params?.row?.role?.toLowerCase() !== 'learner';
        // isLearner = !isAdmin;

        // if (adminLearnerList?.admins?.includes(params?.row?.id)) {
        //   isLearner = false;
        //   isAdmin = true;
        // }
        // if (adminLearnerList?.learners?.includes(params?.row?.id)) {
        //   isLearner = true;
        //   isAdmin = false;
        // }

        const buttonArr = [
          { handleClick: () => {} },
          {
            text: 'Edit'
          },
          {
            text: 'Disable'
          }
        ];

        // if(params?.row?.role?.toLowerCase() === 'learner'){
        //   buttonArr.push({text:'Demote Admin', handleClick:()=>{setIsMakeAdminAlert(true),updateUserRole(params?.row)}})
        // }
        return (
          <>
            <EllipsisMenu buttonArr={buttonArr} />
          </>
        );
      }
    }
  ];

  const options = [
    { label: 'Email', value: 'email' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' }
  ];

  return (
    <>
      <ZicopsTable
        data={data}
        columns={columns}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
      />
    </>
  );
};
export default MyVendor;
