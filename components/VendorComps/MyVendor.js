import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { USER_LSP_ROLE, VENDOR_MASTER_STATUS } from '@/helper/constants.helper.js';
import { getPageSizeBasedOnScreen, isWordIncluded } from '@/helper/utils.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom.js';
import Router from 'next/router.js';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ConfirmPopUp from '../common/ConfirmPopUp/index.js';
import useHandleVendor from './Logic/useHandleVendor.js';
import useLoadVendorData from './Logic/useLoadVendorData.js';

const MyVendor = () => {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const { disableVendor } = useHandleVendor();
  const { getUserVendors, getPaginatedVendors } = useLoadVendorData();

  const [vendorTableData, setVendorTableData] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [pageCursor, setPageCursor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCol, setFilterCol] = useState('name');

  useEffect(() => {
    if (vendorTableData?.length) return;

    if (userOrgData?.user_lsp_role === USER_LSP_ROLE?.vendor)
      return getUserVendors()?.then((data) => setVendorTableData(data || []));

    getPaginatedVendors()?.then((data) => {
      setPageCursor(data?.pageCursor || null);
      setVendorTableData(data?.vendors || []);
    });
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
  const pageSize = getPageSizeBasedOnScreen();

  const options = [{ label: 'Name', value: 'name' }];

  return (
    <>
      <ZicopsTable
        data={vendorTableData?.filter((user) => isWordIncluded(user?.[filterCol], searchQuery))}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[3]}
        loading={vendorTableData == null}
        tableHeight="70vh"
        customId="vendorId"
        onPageChange={(currentPage) => {
          if (vendorTableData?.length / pageSize - currentPage < 3 && pageCursor) {
            getPaginatedVendors(pageCursor).then((data) => {
              setPageCursor(data?.pageCursor || null);
              const _tableData = structuredClone(vendorTableData || []);

              data?.vendors?.forEach((v) => {
                const isSameVendorPresent = _tableData?.find(
                  (vendor) => vendor?.vendorId === v?.vendorId
                );

                if (isSameVendorPresent) return;

                _tableData?.push(v);
              });

              setVendorTableData(_tableData);
            });
          }
        }}
        showCustomSearch={true}
        searchProps={{
          handleOptionChange: (val) => setFilterCol(val),
          handleSearch: (val) => setSearchQuery(val),
          options,
          delayMS: 0
        }}
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
              const isVendorStatusUpdated = await disableVendor(selectedVendor, isEnabled, () => {
                setVendorTableData((prev) => {
                  const _data = structuredClone(prev);
                  const index = _data?.findIndex((v) => v?.vendorId === selectedVendor?.vendorId);
                  if (index >= 0) _data[index].status = !isEnabled ? 'active' : 'disable';

                  return _data;
                });
                setSelectedVendor(null);
              });

              if (!isVendorStatusUpdated) setSelectedVendor(null);
            },
            handleClickRight: () => setSelectedVendor(null)
          }}
        />
      )}
    </>
  );
};
export default MyVendor;
