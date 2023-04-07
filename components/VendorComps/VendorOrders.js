import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import useHandleVendor from './Logic/useHandleVendor';
import {
  getVendorOrderObject,
  OrderAtom,
  ServicesAtom,
  VendorServicesListAtom,
  getVendorServicesList,
  getVendorServicesObject
} from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { AllServicesAtom } from '@/state/atoms/vendor.atoms';

const VendorOrders = () => {
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const { getAllOrders, orderDetails } = useHandleMarketYard();
  const { getVendors, vendorInfo } = useHandleVendor();
  const [vendorOrderDetails, setVendorOrderDetails] = useState(null);

  const router = useRouter();

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
    setAllServicesData([]);
    setServicesData(getVendorServicesObject());
    setSelectedServicesForOrder(getVendorServicesList());
    setOrderData(getVendorOrderObject());
  }, []);
  useEffect(async () => {
    const vendorIds = orderDetails?.map((data) => data?.vendor_id);
    await getVendors(vendorIds);
  }, [orderDetails]);

  useEffect(() => {
    const vendorDatails = orderDetails?.map((item, index) =>
      Object.assign({}, item, vendorInfo[index])
    );
    setVendorOrderDetails(vendorDatails);
  }, [vendorInfo]);

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
      flex: 1.5,
      renderCell: (params) => {
        return params?.row?.services?.join(', ').toUpperCase();
      }
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
