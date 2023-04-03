import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useHandleMarketYard from './Logic/useHandleMarketYard';

// const data = [
//   {
//     id: '1001',
//     order_id: 110,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Company',
//     services: 'SME, Content development',
//     status: 'Added'
//   },
//   {
//     id: '1001',
//     order_id: 111,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Freelancer',
//     services: 'SME, Content development',
//     status: 'Confirmed'
//   },
//   {
//     id: '1002',
//     order_id: 112,
//     vendor_name: 'Mnop learning',
//     vendor_type: 'Company',
//     services: 'SME, Content development',
//     status: 'Added'
//   },
//   {
//     id: '1003',
//     order_id: 113,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Freelancer',
//     services: 'Training',
//     status: 'Added'
//   },
//   {
//     id: '1004',
//     order_id: 114,
//     vendor_name: 'Mnop learning',
//     vendor_type: 'Company',
//     services: 'SME, Content development',
//     status: 'Confirmed'
//   },
//   {
//     id: '1005',
//     order_id: 115,
//     vendor_name: 'Mnop learning',
//     vendor_type: 'Company',
//     services: 'Training',
//     status: 'Added'
//   },
//   {
//     id: '1006',
//     order_id: 116,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Company',
//     services: 'SME, Content development',
//     status: 'Confirmed'
//   },
//   {
//     id: '1007',
//     order_id: 117,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Company',
//     services: 'Training',
//     status: 'Added'
//   },
//   {
//     id: '1008',
//     order_id: 118,
//     vendor_name: 'Abcd learning ',
//     vendor_type: 'Company',
//     services: 'SME, Content development',
//     status: 'Added'
//   }
// ];

const VendorOrders = () => {
  const { getAllOrders, orderDetails } = useHandleMarketYard();

  const router = useRouter();
  useEffect(() => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendor = getAllOrders(lspId);
    // setOrderTableData(orderData);
    console.info(vendor);
  }, []);
  const columns = [
    {
      field: 'id',
      headerClassName: 'course-list-header',
      headerName: 'Order ID',
      flex: 0.6
    },
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
      flex: 0.8
    },
    {
      field: 'services',
      headerClassName: 'course-list-header',
      headerName: 'Services',
      flex: 1.5
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 0.8
    },
    {
      headerClassName: 'course-list-header',
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
          // { handleClick: () => router.push(`/edit-order`) },
          {
            text: 'Edit',
            handleClick: () => router.push(`/admin/vendor/orders/edit-order`)
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
  return (
    <>
      <ZicopsTable
        columns={columns}
        tableHeight="70vh"
        pageSize={getPageSizeBasedOnScreen()}
        data={orderDetails}
      />
    </>
  );
};

export default VendorOrders;
