import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { CommercialsAtom } from '@/state/atoms/courses.atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ChargeTable = () => {
  const commercialsData = useRecoilValue(CommercialsAtom);
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

  const DomCreditTax =
    (commercialsData?.price_per_seat * 18) / 100 + (commercialsData?.price_per_seat * 2) / 100;
  const InterantionalCreditTax =
    (commercialsData?.price_per_seat * 18) / 100 + (commercialsData?.price_per_seat * 3) / 100;
  const ChargesData = [
    {
      id: 1,
      method: 'UPI',
      fees: '0% i.e Rs 0',
      amounts: `Rs ${commercialsData?.price_per_seat}`,
    },
    {
      id: 2,
      method: 'Domestic Debit & Credit card',
      fees: `2% + 18% GST = Rs ${(commercialsData?.price_per_seat * 2) / 100} + ${
        (commercialsData?.price_per_seat * 18) / 100
      } = Rs ${DomCreditTax}`,
      amounts: `Rs ${commercialsData?.price_per_seat - DomCreditTax}`,
    },
    {
      id: 3,
      method: 'International Credit card',
      fees: `3% + 18% GST = Rs ${(commercialsData?.price_per_seat * 3) / 100} + ${
        (commercialsData?.price_per_seat * 18) / 100
      }  = Rs ${InterantionalCreditTax}`,
      amounts: `Rs ${commercialsData?.price_per_seat - InterantionalCreditTax}`,
    },
    {
      id: 4,
      method: 'Net banking',
      fees: `2% + 18% GST = Rs ${(commercialsData?.price_per_seat * 2) / 100} + ${
        (commercialsData?.price_per_seat * 18) / 100
      } = Rs ${DomCreditTax}`,
      amounts: `Rs ${commercialsData?.price_per_seat - DomCreditTax}`,
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
