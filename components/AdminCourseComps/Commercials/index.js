import RadioBox from '@/components/Tabs/common/RadioBox';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '@/components/common/InputDatePicker';
import styles from '../adminCourse.module.scss';
import {
  ClassroomMasterAtom,
  CommercialsAtom,
  CourseMetaDataAtom,
} from '@/state/atoms/courses.atom';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import NextBtn from '../NextBtn';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import ChargeTable from './ChargeTable';
import { COMMERCIAL_PRICEING_TYPE } from '@/constants/course.constants';
import { courseTabs } from '../Logic/adminCourseComps.helper';
import { makeStyles } from '@mui/styles';
import { changeHandler } from '@/helper/common.helper';

const Commercials = () => {
  const [commercialsData, setCommercialsData] = useRecoilState(CommercialsAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const classroomMaster = useRecoilValue(ClassroomMasterAtom);
  const [isOpenTable, setOpenTable] = useState(false);

  const useTooltipStyles = makeStyles((theme) => ({
    tooltip: {
      backgroundColor: '#040404',
      fontSize: '16px',
      padding: '12px',
    },
  }));
  const currency = ['INR', 'USD', 'Euros', 'Pound'].map((val) => ({
    label: val,
    value: val,
  }));

  const tooltipClass = useTooltipStyles();
  return (
    <>
      <div className={`${styles.commercialContainer}`}>
        <p className={`${styles.commercialTiltle}`}>Pricing</p>
        <p className={`${styles.checkboxLebel}`}>Configure the pricing parameter for this course</p>
        <div className={`${styles.checkbox}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label="To be Decided"
            name="isMandatory"
            isChecked={
              commercialsData?.is_decided ||
              commercialsData?.pricing_type === COMMERCIAL_PRICEING_TYPE?.tbd
            }
            changeHandler={(e) => {
              const isChecked = e.target.checked;
              const _commercialData = { ...commercialsData };
              _commercialData.is_decided = isChecked;
              _commercialData.pricing_type = isChecked;
              _commercialData.is_paid_traning = false;
              _commercialData.is_free_traning = false;
              setCommercialsData(_commercialData);
            }}
          />
        </div>
        <div className={`${styles.redioBoxContainer}`}>
          <RadioBox
            labeledInputProps={{
              label: 'Priced Training',
              name: 'display',
              isDisabled:
                commercialsData?.is_decided ||
                commercialsData?.pricing_type === COMMERCIAL_PRICEING_TYPE?.tbd,
              description: 'Learners to pay and book the seat to attend the training',
              isChecked:
                commercialsData?.is_paid_traning ||
                commercialsData?.pricing_type === COMMERCIAL_PRICEING_TYPE?.paid,
              changeHandler: (e) =>
                setCommercialsData({ ...commercialsData, is_paid_traning: true }),
            }}
          />
          <RadioBox
            labeledInputProps={{
              label: 'Free of Cost Training',
              name: 'display',
              isDisabled:
                commercialsData?.is_decided ||
                commercialsData?.pricing_type === COMMERCIAL_PRICEING_TYPE?.tbd,
              description: 'Training is Free of Cost for Learners',
              isChecked:
                commercialsData?.is_free_traning ||
                commercialsData?.pricing_type === COMMERCIAL_PRICEING_TYPE?.free,
              changeHandler: (e) =>
                setCommercialsData({ ...commercialsData, is_free_traning: true }),
            }}
          />
        </div>
        <div className={`${styles.hr}`}></div>
        <div className={`${styles.priceSetContainer}`}>
          <div className={`${styles.priceSeat}`}>
            <p className={`${styles.heading}`}>Price per seat:</p>
            <div className={`${styles.inputBox}`}>
              <LabeledInput
                inputOptions={{
                  inputName: 'price_per_seat',
                  //   label: 'Name :',
                  placeholder: 'Enter price per seat',
                  value: commercialsData?.price_per_seat,
                  isNumericOnly: true,
                }}
                styleClass={`${styles.labelMergin}`}
                changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
              />
              <p className={`${styles.gst}`}>Exclusive of GST</p>
            </div>
          </div>
          <div className={`${styles.priceSeat}`}>
            <p className={`${styles.heading}`}>Currency:</p>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'currency',
                placeholder: 'INR',
                value: {
                  label: commercialsData?.currency,
                  value: commercialsData?.currency,
                },
                options: currency,
              }}
              changeHandler={(e) =>
                changeHandler(e, commercialsData, setCommercialsData, 'currency')
              }
              styleClass={`${styles.labelMergin}`}
            />
          </div>
          <Tooltip
            title="Understand the transaction charges"
            placement="bottom-start"
            classes={tooltipClass}>
            <div
              className={`${styles.info}`}
              onClick={(e) => {
                setOpenTable(true);
              }}>
              <img src="/images/svg/info2.svg" alt="" />
            </div>
          </Tooltip>
        </div>
        <p className={`${styles.label}`}>
          *Will be visible to Learners only if the Training is marked as Priced
        </p>
        <div className={`${styles.hr}`}></div>
        {courseMetaData?.isDisplay && (
          <>
            <p className={`${styles.rtext}`}>Registration</p>
            <p className={`${styles.rlabel}`}>
              Course registration will start only once the course is published and open for
              registrations.
            </p>
            <div className={`${styles.registrationContainer}`}>
              <div className={`${styles.registrationMax}`}>
                <p className={`${styles.heading}`}>Maximum number of registrations:</p>
                <LabeledInput
                  inputOptions={{
                    inputName: 'max_registrations',
                    //   label: 'Name :',
                    placeholder: 'Enter max number of registrations',
                    value: commercialsData?.max_registrations,
                    isNumericOnly: true,
                  }}
                  styleClass={`${styles.labelMergin}`}
                  changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
                />
              </div>
              <div className={`${styles.registrationMax}`}>
                <p className={`${styles.heading}`}>Registrations end date:</p>
                <InputDatePicker
                  styleClass={`${styles.labelMergin}`}
                  selectedDate={commercialsData?.registration_end_date}
                  // minDate={examTabData?.exam_start}
                  changeHandler={(date) => {
                    setCommercialsData({
                      ...commercialsData,
                      registration_end_date: date,
                    });
                  }}
                  placeholderText="Select Date"
                  // isDisabled={isPreview}
                />
              </div>
            </div>
            <div className={`${styles.hr}`}></div>
            <p className={`${styles.rtext}`}>Booking</p>
            <p className={`${styles.rlabel}`}>
              Course Bookings will start only once the course is published and open for booking.
            </p>
            <div className={`${styles.bookingContainer}`}>
              <div className={`${styles.registrationMax}`}>
                <div className={`${styles.bookdate}`}>
                  <p className={`${styles.heading}`}>Booking start date:</p>
                  <InputDatePicker
                    styleClass={`${styles.labelMergin}`}
                    selectedDate={
                      commercialsData?.is_publish_date
                        ? courseMetaData?.publishDate
                        : commercialsData?.booking_start_date
                    }
                    // minDate={examTabData?.exam_start}
                    changeHandler={(date) => {
                      setCommercialsData({
                        ...commercialsData,
                        booking_start_date: date,
                      });
                    }}
                    placeholderText="Select Date"
                  />
                </div>
                <div className={`${styles.checkbox}`}>
                  <LabeledRadioCheckbox
                    type="checkbox"
                    label="Same as Course Publish Date"
                    name="isCoursePublishDate"
                    isChecked={commercialsData?.is_publish_date}
                    changeHandler={(e) => {
                      const isChecked = e.target.checked;
                      const _commercialData = { ...commercialsData };
                      _commercialData.is_publish_date = isChecked;
                      setCommercialsData(_commercialData);
                    }}
                  />
                </div>
              </div>
              <div className={`${styles.registrationMax}`}>
                <div className={`${styles.bookdate}`}>
                  <p className={`${styles.heading}`}>Booking end date:</p>
                  <InputDatePicker
                    styleClass={`${styles.labelMergin}`}
                    selectedDate={
                      commercialsData?.is_start_date
                        ? classroomMaster?.courseStartDate
                        : commercialsData?.booking_end_date
                    }
                    // minDate={examTabData?.exam_start}
                    changeHandler={(date) => {
                      setCommercialsData({
                        ...commercialsData,
                        booking_end_date: date,
                      });
                    }}
                    placeholderText="Select Date"
                  />
                </div>
                <div className={`${styles.checkbox}`}>
                  <LabeledRadioCheckbox
                    type="checkbox"
                    label="Same as Course Start Date"
                    name="isCourseStartDate"
                    isChecked={commercialsData?.is_start_date}
                    changeHandler={(e) => {
                      const isChecked = e.target.checked;
                      const _commercialData = { ...commercialsData };
                      _commercialData.is_start_date = isChecked;
                      setCommercialsData(_commercialData);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <p className={`${styles.maxBook}`}>Maximum number of Bookings:</p>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            //   label: 'Name :',
            placeholder: 'Auto-populated',
            value: classroomMaster?.noOfLearners,
          }}
          styleClass={`${styles.labelMergin2}`}
          // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
        <div className={`${styles.nextBtn}`}>
          <NextBtn switchTabName={courseTabs?.configuration?.name} />
        </div>
      </div>
      <VendorPopUp
        open={isOpenTable}
        popUpState={[isOpenTable, setOpenTable]}
        size="large"
        closeBtn={{ name: 'Close' }}
        isSubmitButton={false}
        isVilt={true}
        isFooterVisible={true}>
        <div>
          <p className={`${styles.transText}`}>Transaction Charges</p>
          <p className={`${styles.priceText}`}>Price Per Seat: {commercialsData?.price_per_seat}</p>
          <ChargeTable />
        </div>
      </VendorPopUp>
    </>
  );
};

export default Commercials;
