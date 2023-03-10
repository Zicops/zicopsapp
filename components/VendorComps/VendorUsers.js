import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import React from 'react';
import { useRouter } from 'next/router';
import useHandleVendor from './Logic/useHandleVendor';
import { useEffect } from 'react';
import LabeledRadioCheckbox from '../common/FormComponents/LabeledRadioCheckbox';

const VendorUsers = () => {
  const { getUserVendors, vendorDetails, loading } = useHandleVendor();
  console.log('vendorDetails', vendorDetails);
  const router = useRouter();
  useEffect(() => {
    const users = getUserVendors();
  }, []);
  const columns = [
    {
      field: 'email',
      headerClassName: 'course-list-header',
      flex: 2,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          <LabeledRadioCheckbox type="checkbox" changeHandler={() => {}} />
          Email Id
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
            <LabeledRadioCheckbox
              type="checkbox"
              isChecked={selectedUser?.find((u) => u?.id === params.id)}
              changeHandler={(e) => {
                const userList = [...selectedUser];

                if (e.target.checked) {
                  userList.push(params?.row);
                } else {
                  const index = userList.findIndex((u) => u?.id === params.id);
                  userList.splice(index, 1);
                }

                setSelectedUser(userList);
              }}
            />
            {params.row?.email}
          </div>
        );
      }
    },
    {
      field: 'first_name',
      headerClassName: 'course-list-header',
      headerName: 'First Name',
      flex: 0.8
    },
    {
      field: 'last_name',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 0.8
    },
    {
      field: 'role',
      headerClassName: 'course-list-header',
      headerName: 'Role',
      flex: 0.5,
      renderCell: (params) => {
        let isLearner = false;
        let isAdmin = false;
        isAdmin = params?.row?.role?.toLowerCase() !== 'learner';
        isLearner = !isAdmin;
        if (adminLearnerList?.admins?.includes(params?.row?.id)) {
          isLearner = false;
          isAdmin = true;
        }
        if (adminLearnerList?.learners?.includes(params?.row?.id)) {
          isLearner = true;
          isAdmin = false;
        }

        return (
          <span style={{ textTransform: 'capitalize' }}>{isLearner ? 'Learner' : 'Admin'}</span>
        );
      }
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        let status = '';
        // let lspStatus = '';
        if (disabledUserList?.includes(params?.row?.id)) status = USER_MAP_STATUS?.disable;
        if (invitedUsers?.includes(params?.row?.id)) status = 'invited';

        let lspStatus = !status?.length ? params?.row?.lsp_status : status;

        return (
          <span style={{ textTransform: 'capitalize' }}>
            {lspStatus?.trim()?.length ? lspStatus : 'Invited'}
          </span>
        );
      }
    }
  ];
  return (
    <>
      <ZicopsTable
        columns={columns}
        tableHeight="70vh"
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        loading={loading}
        data={vendorDetails}
      />
    </>
  );
};

export default VendorUsers;
