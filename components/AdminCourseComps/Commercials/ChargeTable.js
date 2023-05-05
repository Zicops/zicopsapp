import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { ClassroomMasterAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ChargeTable = () => {
  const classroomMaster = useRecoilValue(ClassroomMasterAtom);

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
    (classroomMaster?.pricePerSeat * 2) / 100 +
    (((classroomMaster?.pricePerSeat * 2) / 100) * 18) / 100;
  const InterantionalCreditTax =
    (classroomMaster?.pricePerSeat * 3) / 100 +
    (((classroomMaster?.pricePerSeat * 3) / 100) * 18) / 100;
  const ChargesData = [
    {
      id: 1,
      method: 'UPI',
      fees: '0% i.e Rs 0',
      amounts: `Rs ${classroomMaster?.pricePerSeat}`,
    },
    {
      id: 2,
      method: 'Domestic Debit & Credit card',
      fees: `2% + 18% GST = Rs ${(classroomMaster?.pricePerSeat * 2) / 100} + ${
        (((classroomMaster?.pricePerSeat * 2) / 100) * 18) / 100
      } = Rs ${DomCreditTax}`,
      amounts: `Rs ${classroomMaster?.pricePerSeat - DomCreditTax}`,
    },
    {
      id: 3,
      method: 'International Credit card',
      fees: `3% + 18% GST = Rs ${(classroomMaster?.pricePerSeat * 3) / 100} + ${
        (((classroomMaster?.pricePerSeat * 3) / 100) * 18) / 100
      } = Rs ${InterantionalCreditTax}`,
      amounts: `Rs ${classroomMaster?.pricePerSeat - InterantionalCreditTax}`,
    },
    {
      id: 4,
      method: 'Net banking',
      fees: `2% + 18% GST = Rs ${(classroomMaster?.pricePerSeat * 2) / 100} + ${
        (((classroomMaster?.pricePerSeat * 2) / 100) * 18) / 100
      } = Rs ${DomCreditTax}`,
      amounts: `Rs ${classroomMaster?.pricePerSeat - DomCreditTax}`,
    },
  ];
  return (
    <div>
      <ZicopsTable
        columns={columns}
        tableHeight="60vh"
        // pageSize={getPageSizeBasedOnScreen()}
        data={ChargesData}
        hideFooterPagination={true}
        // loading={!vendorOrderDetails?.length}
      />
    </div>
  );
};

export default ChargeTable;
