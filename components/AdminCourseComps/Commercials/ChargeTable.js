import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { CommercialsAtom } from '@/state/atoms/courses.atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ChargeTable = () => {
  const commercialsData = useRecoilValue(CommercialsAtom);
  console.info(commercialsData);
  const columns = [
    {
      field: 'method',
      headerClassName: 'course-list-header',
      headerName: 'Payment Method:',
      flex: 1,
    },
    {
      field: 'fees',
      headerClassName: 'course-list-header',
      headerName: 'Processing Fees:',
      flex: 1.5,
    },
    {
      field: 'amounts',
      headerClassName: 'course-list-header',
      headerName: 'Amount Received:',
      flex: 0.7,
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

export default ChargeTable;
