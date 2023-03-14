import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { USER_LSP_ROLE, VENDOR_MASTER_STATUS } from '@/helper/constants.helper.js';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom.js';
import Router from 'next/router.js';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ConfirmPopUp from '../common/ConfirmPopUp/index.js';
import useHandleVendor from './Logic/useHandleVendor.js';
import useLoadVendorData from './Logic/useLoadVendorData.js';

const MyVendor = () => {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const [vendorList, setVendorList] = useState(null);

  const { vendorDetails, getAllVendors, loading, disableVendor } = useHandleVendor();
  const { getLspVendors, getUserVendors, getVendorsTable, getPaginatedVendors } =
    useLoadVendorData();

  const [vendorTableData, setVendorTableData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const pageSize = 100;

  useEffect(() => {
    if (vendorDetails?.length) return;

    // getAllVendors();
    if (userOrgData?.user_lsp_role === USER_LSP_ROLE?.vendor) return getUserVendors();

    getPaginatedVendors(pageSize).then((data) => setVendorTableData(data));
  }, []);

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
        return <span style={{ textTransform: 'capitalize' }}>{params?.row?.status}</span>;
      }
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
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
            text: params?.row?.status === VENDOR_MASTER_STATUS?.active ? 'Disable' : 'Enable',
            handleClick: () => setSelectedVendor(params.row)
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

      {!!selectedVendor?.vendorId && (
        <ConfirmPopUp
          title={`Do you want to ${
            selectedVendor?.status === VENDOR_MASTER_STATUS.active ? 'disable' : 'enable'
          } ${selectedVendor.name || ''} vendor?`}
          btnObj={{
            handleClickLeft: async (e) => {
              const isEnabled = selectedVendor?.status === VENDOR_MASTER_STATUS.active;

              e.currentTarget.disabled = true;
              disableVendor(selectedVendor, isEnabled, () => {
                setVendorTableData((prev) => {
                  const _data = structuredClone(prev);
                  const index = _data?.findIndex((v) => v?.vendorId === selectedVendor?.vendorId);
                  if (index >= 0) _data[index].status = !isEnabled ? 'active' : 'disable';

                  return _data;
                });
                setSelectedVendor(null);
              });
            },
            handleClickRight: () => setSelectedVendor(null)
          }}
        />
      )}
    </>
  );
};
export default MyVendor;
