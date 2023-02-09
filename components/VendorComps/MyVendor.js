import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import Router from 'next/router.js';
import { useEffect, useState } from 'react';
import useHandleVendor from './Logic/useHandleVendor.js';

const MyVendor = () => {
  const { vendorDetails, getAllVendors, loading, setLoading } = useHandleVendor();
  useEffect(() => {
    setLoading(true);
    if (!vendorDetails?.length) {
      getAllVendors();
      setLoading(false);
    }
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
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
        const buttonArr = [
          { handleClick: () => {} },
          {
            text: 'Edit',
            handleClick: () => Router.push(`manage-vendor/add-vendor/${params.row.vendorId}`)
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
        data={vendorDetails}
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
