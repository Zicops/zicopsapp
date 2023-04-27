import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { CommercialsAtom } from '@/state/atoms/courses.atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const RegisterTable = () => {
  const commercialsData = useRecoilValue(CommercialsAtom);
  console.info(commercialsData);
  const columns = [
    {
      field: 's_no',
      headerClassName: 'course-list-header',
      headerName: 'S.No',
      flex: 0.5,
    },
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Name',
      flex: 0.6,
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email Id',
      flex: 1,
    },
    {
      field: 'contact',
      headerClassName: 'course-list-header',
      headerName: 'Contact No',
      flex: 0.6,
    },
    {
      field: 'registration_date',
      headerClassName: 'course-list-header',
      headerName: 'Registration Date',
      flex: 0.8,
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.4,
    },
  ];
  const ChargesData = [
    {
      id: 1,
      method: 'UPI',
      fees: '0% i.e Rs 0',
      amounts: commercialsData?.price_per_seat,
    },
    {
      id: 2,
      method: 'Domestic Debit & Credit card',
      fees: '2% + 18% GST = Rs 2 + 0.36 = Rs 2.36',
      amounts: 'Rs 97.64',
    },
    {
      id: 3,
      method: 'International Credit card',
      fees: '3% + 18% GST = Rs 3 + 0.54 = Rs 3.54',
      amounts: 'Rs 100',
    },
    {
      id: 4,
      method: 'Net banking',
      fees: '2% + 18% GST = Rs 2 = 0.36 = Rs 2.36',
      amounts: 'Rs 100',
    },
  ];
  return (
    <div>
      <p style={{ paddingLeft: '40px', paddingTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Registration Details
      </p>
      <ZicopsTable
        columns={columns}
        tableHeight="60vh"
        // pageSize={getPageSizeBasedOnScreen()}
        data={ChargesData}
        // loading={!vendorOrderDetails?.length}
      />
    </div>
  );
};

export default RegisterTable;
