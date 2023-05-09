import RadioBox from '@/components/Tabs/common/RadioBox';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '@/components/common/InputDatePicker';
import { COMMERCIAL_PRICEING_TYPE } from '@/constants/course.constants';
import { changeHandler } from '@/helper/common.helper';
import {
  ClassroomMasterAtom,
  CommercialsAtom,
  CourseMetaDataAtom,
} from '@/state/atoms/courses.atom';
import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseTabs } from '../Logic/adminCourseComps.helper';
import NextBtn from '../NextBtn';
import styles from '../adminCourse.module.scss';
import ChargeTable from './ChargeTable';

const Commercials = () => {
  const [commercialsData, setCommercialsData] = useRecoilState(CommercialsAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [classroomMaster, setClassroomMaster] = useRecoilState(ClassroomMasterAtom);
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
            isDisabled={classroomMaster?.isBooking}
            isChecked={classroomMaster?.pricingType === COMMERCIAL_PRICEING_TYPE?.tbd}
            changeHandler={(e) =>
              setClassroomMaster((prev) => ({
                ...prev,
                pricingType: e.target.checked ? COMMERCIAL_PRICEING_TYPE?.tbd : '',
              }))
            }
          />
        </div>
        <div className={`${styles.redioBoxContainer}`}>
          <RadioBox
            labeledInputProps={{
              label: 'Priced Training',
              name: 'display',
              description: 'Learners to pay and book the seat to attend the training',
              isChecked: classroomMaster?.pricingType === COMMERCIAL_PRICEING_TYPE?.paid,
              changeHandler: (e) =>
                setClassroomMaster((prev) => ({
                  ...prev,
                  pricingType: COMMERCIAL_PRICEING_TYPE?.paid,
                })),
            }}
          />
          <RadioBox
            labeledInputProps={{
              label: 'Free of Cost Training',
              name: 'display',
              description: 'Training is Free of Cost for Learners',
              isChecked: classroomMaster?.pricingType === COMMERCIAL_PRICEING_TYPE?.free,
              changeHandler: (e) =>
                setClassroomMaster((prev) => ({
                  ...prev,
                  pricingType: COMMERCIAL_PRICEING_TYPE?.free,
                })),
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
                  inputName: 'pricePerSeat',
                  //   label: 'Name :',
                  placeholder: 'Enter price per seat',
                  value: classroomMaster?.pricePerSeat,
                  isNumericOnly: true,
                }}
                styleClass={`${styles.labelMergin}`}
                changeHandler={(e) => changeHandler(e, classroomMaster, setClassroomMaster)}
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
                  label: classroomMaster?.currency,
                  value: classroomMaster?.currency,
                },
                options: currency,
              }}
              changeHandler={(e) =>
                changeHandler(e, classroomMaster, setClassroomMaster, 'currency')
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
                    inputName: 'maxRegistrations',
                    //   label: 'Name :',
                    placeholder: 'Enter max number of registrations',
                    value: classroomMaster?.maxRegistrations,
                    isNumericOnly: true,
                  }}
                  styleClass={`${styles.labelMergin}`}
                  changeHandler={(e) => changeHandler(e, classroomMaster, setClassroomMaster)}
                />
              </div>
              <div className={`${styles.registrationMax}`}>
                <p className={`${styles.heading}`}>Registrations end date:</p>
                <InputDatePicker
                  styleClass={`${styles.labelMergin}`}
                  selectedDate={classroomMaster?.registrationEndDate}
                  // minDate={examTabData?.exam_start}
                  changeHandler={(date) =>
                    setClassroomMaster((prev) => ({ ...prev, registrationEndDate: date }))
                  }
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
                      +classroomMaster?.bookingStartDate === -1
                        ? null
                        : classroomMaster?.bookingStartDate
                    }
                    // minDate={examTabData?.exam_start}
                    changeHandler={(date) =>
                      setClassroomMaster((prev) => ({ ...prev, bookingStartDate: date }))
                    }
                    placeholderText="Select Date"
                  />
                </div>
                <div className={`${styles.checkbox}`}>
                  <LabeledRadioCheckbox
                    type="checkbox"
                    label="Same as Course Publish Date"
                    name="isCoursePublishDate"
                    isChecked={+classroomMaster?.bookingStartDate === -1}
                    changeHandler={(e) =>
                      setClassroomMaster((prev) => ({
                        ...prev,
                        bookingStartDate: e.target.checked ? -1 : 0,
                      }))
                    }
                  />
                </div>
              </div>
              <div className={`${styles.registrationMax}`}>
                <div className={`${styles.bookdate}`}>
                  <p className={`${styles.heading}`}>Booking end date:</p>
                  <InputDatePicker
                    styleClass={`${styles.labelMergin}`}
                    selectedDate={classroomMaster?.bookingEndDate}
                    // minDate={examTabData?.exam_start}
                    changeHandler={(date) =>
                      setClassroomMaster((prev) => ({ ...prev, bookingEndDate: date }))
                    }
                    placeholderText="Select Date"
                  />
                </div>
                <div className={`${styles.checkbox}`}>
                  <LabeledRadioCheckbox
                    type="checkbox"
                    label="Same as Course Start Date"
                    name="isCourseStartDate"
                    isChecked={classroomMaster?.bookingEndDate === classroomMaster?.courseStartDate}
                    changeHandler={(e) =>
                      setClassroomMaster((prev) => ({
                        ...prev,
                        bookingEndDate: e.target.checked ? classroomMaster?.courseStartDate : 0,
                      }))
                    }
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
          <p className={`${styles.priceText}`}>Price Per Seat: {classroomMaster?.pricePerSeat}</p>
          <ChargeTable />
        </div>
      </VendorPopUp>
    </>
  );
};

export default Commercials;
