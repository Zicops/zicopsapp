import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { USER_LSP_ROLE, VENDOR_MASTER_STATUS } from '@/helper/constants.helper.js';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom.js';
import Router from 'next/router.js';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleVendor from './Logic/useHandleVendor.js';
import useLoadVendorData from './Logic/useLoadVendorData.js';

const MyVendor = () => {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const [vendorList, setVendorList] = useState(null);

  const { vendorDetails, getAllVendors, loading, disableVendor } = useHandleVendor();
  const {
    getLspVendors,
    getUserVendors,
    getVendorsTable,
    getPaginatedVendors
  } = useLoadVendorData();

  const [vendorTableData, setVendorTableData] = useState([]);

  const pageSize = 100;

  const [disabledVendors, setDisabledVendors] = useState([]);
  const [enabledVendors, setEnabledVendors] = useState([]);

  useEffect(() => {
    if (!vendorDetails?.length) {
      // getAllVendors();
      if (userOrgData?.user_lsp_role === USER_LSP_ROLE?.vendor) return getUserVendors();

      getPaginatedVendors(pageSize).then((data) => setVendorTableData(data));
    }
  }, []);

  // useEffect(() => {
  //   console.info(disabledVendors, enabledVendors);
  // }, [disabledVendors, enabledVendors]);

  const onSuccess = (params, isEnabled) => {
    let updatedList = structuredClone(disabledVendors);
    if (params.row.status.toLowerCase() === VENDOR_MASTER_STATUS.disable) {
      setDisabledVendors([...updatedList, params.row.vendorId]);
    } else {
      const notDisabledVendor = updatedList.filter((vendorId) => vendorId !== params.row.vendorId);
      setDisabledVendors(notDisabledVendor);
    }
  };

  const columns = [
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Vendor Name',
      flex: 1
    },
    {
      field: 'type',
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
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        let isEnabled = params?.row?.status?.toLowerCase() === VENDOR_MASTER_STATUS?.active;
        if (disabledVendors.includes(params?.row?.vendorId)) isEnabled = false;

        // if (enabledVendors.includes(params?.row?.vendorId)) isEnabled = true;

        const statusText = isEnabled ? 'Active' : 'Disable';

        return <>{statusText}</>;
      }
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
        let isEnabled = params?.row?.status?.toLowerCase() === VENDOR_MASTER_STATUS?.active;
        if (disabledVendors.includes(params?.row?.vendorId)) isEnabled = false;

        // if (enabledVendors.includes(params?.row?.vendorId)) isEnabled = true;

        const btnText = isEnabled ? 'Disable' : 'Enable';

        const buttonArr = [
          {
            text: 'View',
            handleClick: () => Router.push(`manage-vendor/view-vendor/${params.row.vendorId}`)
          },
          {
            text: 'Edit',
            handleClick: () => Router.push(`manage-vendor/update-vendor/${params.row.vendorId}`)
          },
          {
            text: btnText,
            handleClick: () => disableVendor(params.row, isEnabled, onSuccess(params, isEnabled))
          }
        ];
        return (
          <>
            <EllipsisMenu buttonArr={buttonArr} />
          </>
        );
      }
    }
  ];

  // const options = [
  //   { label: 'Email', value: 'email' },
  //   { label: 'First Name', value: 'first_name' },
  //   { label: 'Last Name', value: 'last_name' }
  // ];

  return (
    <>
      <ZicopsTable
        data={vendorTableData}
        columns={columns}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        loading={loading}
        tableHeight="70vh"
        customId="vendorId"
      />
    </>
  );
};
export default MyVendor;
