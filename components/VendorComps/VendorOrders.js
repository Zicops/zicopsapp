import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import useHandleVendor from './Logic/useHandleVendor';

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
  const { getSingleVendorInfo } = useHandleVendor();
  const [vendorOrderDetails, setVendorOrderDetails] = useState(null);

  const router = useRouter();

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
  }, []);
  useEffect(async () => {
    const vendorIds = orderDetails?.map((data) => data?.vendor_id);
    let vendorDataArray = [];
    for (let i = 0; i < vendorIds?.length; i++) {
      const vendorDetails = await getSingleVendorInfo(vendorIds[i]);
      vendorDataArray.push(vendorDetails);
    }
    const vendorDatails = orderDetails?.map((item, index) =>
      Object.assign({}, item, vendorDataArray[index])
    );
    setVendorOrderDetails(vendorDatails);
    // setOrderTableData(orderData);
  }, [orderDetails]);
  const columns = [
    {
      field: 'id',
      headerClassName: 'course-list-header',
      headerName: 'Order ID',
      flex: 0.6
    },
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
        const buttonArr = [
          {
            text: 'Edit',
            handleClick: () => router.push(`/admin/vendor/orders/edit-order/${params.row.id}`)
          },
          {
            text: 'View',
            handleClick: () => router.push(`/admin/vendor/orders/view-order/${params.row.id}`)
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
  return (
    <>
      <ZicopsTable
        columns={columns}
        tableHeight="70vh"
        pageSize={getPageSizeBasedOnScreen()}
        data={vendorOrderDetails}
        loading={vendorOrderDetails == null}
      />
    </>
  );
};

export default VendorOrders;
