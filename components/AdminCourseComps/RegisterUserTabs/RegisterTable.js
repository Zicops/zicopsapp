import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import Button from '@/components/common/Button';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { CommercialsAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleRegisterData from './Logic/useHandleRegisterData';

const RegisterTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { registerTableData } = useHandleRegisterData();

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
              onClick={() => {
                setShowPopup(true);
              }}>
              <img src="/images/svg/do_not_disturb_on.svg" width={20}></img>
            </button>
          </>
        );
      },
      flex: 0.5,
    },
  ];
  const registerData = [
    {
      s_no: 1,
      name: 'Zicops',
      email: 'demo@gamil.com',
      contact: 7582508963,
      registration_date: '8/4/2023',
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
        pageSize={getPageSizeBasedOnScreen()}
        data={registerData}
        // loading={!vendorOrderDetails?.length}
      />
      <VendorPopUp
        open={showPopup}
        popUpState={[showPopup, setShowPopup]}
        // size="large"
        customStyles={{ width: '460px', height: '210px' }}
        closeBtn={{ name: 'No' }}
        submitBtn={{ name: 'Yes' }}
        isVilt={true}
        isMarketYard={true}
        isCloseButton={false}
        isSubmitButton={false}
        isFooterVisible={true}>
        <div>
          <p style={{ paddingTop: '20px', fontSize: '20px' }}>Remove registrant</p>
          <p style={{ paddingTop: '20px', color: '#ACACAC' }}>
            Are you sure you want to remove this registrant?
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
                setShowPopup(false);
              }}
            />
          </div>
        </div>
      </VendorPopUp>
    </div>
  );
};

export default RegisterTable;
