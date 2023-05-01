import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { CommercialsAtom } from '@/state/atoms/courses.atom';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

const BookingTable = () => {
  const commercialsData = useRecoilValue(CommercialsAtom);
  const [showPopup, setShowPopup] = useState(false);
  const [showRefundPopup, setShowRefundPopup] = useState(false);

  const columns = [
    {
      field: 's_no',
      headerClassName: 'course-list-header',
      headerName: 'S.No',
      flex: 0.3,
    },
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Name',
      flex: 0.5,
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
      field: 'booking_date',
      headerClassName: 'course-list-header',
      headerName: 'Booking Date',
      flex: 0.7,
    },
    {
      field: 'registration_date',
      headerClassName: 'course-list-header',
      headerName: 'Registration Date',
      flex: 0.9,
    },
    {
      field: 'transaction_id',
      headerClassName: 'course-list-header',
      headerName: 'Transaction ID',
      flex: 0.8,
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0',
              }}
              onClick={() => setShowPopup(true)}>
              <img src="/images/svg/do_not_disturb_on.svg" width={20}></img>
            </button>
          </>
        );
      },
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

  const onRemoveBooking = () => {
    setShowRefundPopup(true);
    setShowPopup(false);
  };
  return (
    <div>
      <p style={{ paddingLeft: '40px', paddingTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Booking Details
      </p>
      <ZicopsTable
        columns={columns}
        tableHeight="60vh"
        // pageSize={getPageSizeBasedOnScreen()}
        data={ChargesData}
        // loading={!vendorOrderDetails?.length}
      />
      <VendorPopUp
        open={showPopup}
        popUpState={[showPopup, setShowPopup]}
        // size="large"
        customStyles={{ width: '460px', height: '210px' }}
        closeBtn={{ name: 'No' }}
        submitBtn={{ name: 'Yes', handleClick: onRemoveBooking }}
        isVilt={true}
        isMarketYard={true}
        isCloseButton={false}
        isSubmitButton={false}
        // isFooterVisible={true}
      >
        <div>
          <p style={{ paddingTop: '20px', fontSize: '20px' }}>Cancel booking</p>
          <p style={{ paddingTop: '20px', color: '#ACACAC' }}>
            Are you sure you want to cancel the booking?
          </p>
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
            <Button
              text="NO"
              customStyles={{
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#26292C',
                color: '#FFFF',
              }}
              clickHandler={() => {
                setShowPopup(false);
              }}
            />
            <Button
              text="YES"
              customStyles={{
                borderRadius: '4px',
                backgroundColor: '#F53D41',
                color: '#FFFF',
                border: 'none',
              }}
              clickHandler={() => {
                setShowRefundPopup(true);
                setShowPopup(false);
              }}
            />
          </div>
        </div>
      </VendorPopUp>
      <VendorPopUp
        open={showRefundPopup}
        popUpState={[showRefundPopup, setShowRefundPopup]}
        // size="large"
        customStyles={{ width: '480px', height: '320px' }}
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Proceed', handleClick: onRemoveBooking }}
        isVilt={true}
        isMarketYard={true}
        isFooterVisible={true}>
        <div>
          <p style={{ paddingTop: '20px', fontSize: '20px' }}>Initiate refund of booking amount</p>
          <div style={{ paddingTop: '10px' }}>
            <LabeledRadioCheckbox
              type="radio"
              name="selection"
              label="Full amount"
              // isDisabled={!!editData?.id}
              // isChecked={!isUploadSelected}
              // changeHandler={() => setIsUploadSelected(false)}
            />
          </div>
          <div style={{ paddingTop: '10px' }}>
            <LabeledRadioCheckbox
              type="radio"
              name="selection"
              label="Partial amount"
              // isDisabled={!!editData?.id}
              // isChecked={!isUploadSelected}
              // changeHandler={() => setIsUploadSelected(false)}
            />
          </div>
          <div style={{ paddingTop: '20px' }}>
            <p style={{ paddingBottom: '10px' }}>Total amount to be refunded</p>
            <LabeledInput
              inputOptions={{
                inputName: 'price_per_seat',
                //   label: 'Name :',
                placeholder: 'Enter custom amount to be refunded',
                // value: commercialsData?.price_per_seat,
                // isNumericOnly: true,
              }}
              // styleClass={`${styles.labelMergin}`}
              // changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
            />
          </div>
        </div>
      </VendorPopUp>
    </div>
  );
};

export default BookingTable;
