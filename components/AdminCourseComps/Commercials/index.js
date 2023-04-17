import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from '../adminCourse.module.scss';
import InputDatePicker from '@/common/InputDatePicker';
import RadioBox from '@/components/Tabs/common/RadioBox';

const Commercials = () => {
  return (
    <div className={`${styles.commerciasContainer}`}>
      <p>Pricing</p>
      <p className={`${styles.checkboxLebel}`}>Configure the pricing parameter for this course</p>
      <div className={`${styles.checkbox}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="To be Decided"
          name="isMandatory"
          isChecked={''}
          changeHandler={''}
        />
      </div>

      <div className={`${styles.redioBoxContainer}`}>
        <RadioBox
          labeledInputProps={{
            label: 'Priced Training',
            name: 'display',
            //   isDisabled: isDisabled,
            description: 'Learners to pay and book the seat to attend the training'
            // isChecked: fullCourse?.is_display,
            // changeHandler: (e) => updateCourseMaster({ ...fullCourse, is_display: true })
          }}
        />
        <RadioBox
          labeledInputProps={{
            label: 'Free of Cost Training',
            name: 'display',
            //   isDisabled: isDisabled,
            description: 'Training is Free of Cost for Learners'
            // isChecked: !fullCourse?.is_display,
            // changeHandler: (e) => updateCourseMaster({ ...fullCourse, is_display: false })
          }}
        />
      </div>
      <div className={`${styles.hr}`}></div>
      <div className={`${styles.priceSetContainer}`}>
        <div>
          <p className={`${styles.heading}`}>Price per seat:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              //   label: 'Name :',
              placeholder: 'Enter price per seat',
              value: ''
            }}
            styleClass={`${styles.labelMergin}`}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Currency:</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'percentage',
              placeholder: 'INR'
            }}
            styleClass={`${styles.labelMergin}`}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Tax:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              //   label: 'Name :',
              placeholder: 'Tax',
              value: ''
            }}
            styleClass={`${styles.labelMergin}`}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Total:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              //   label: 'Name :',
              placeholder: 'Auto-populated',
              value: ''
            }}
            styleClass={`${styles.labelMergin}`}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
      </div>

      <p className={`${styles.label}`}>
        *Will be visible to Learners only if the Training is marked as Priced
      </p>
      <div className={`${styles.hr}`}></div>
      <p className={`${styles.rtext}`}>Registration</p>
      <p className={`${styles.rlabel}`}>
        Course registration will start only once the course is published and open for registrations.
      </p>

      <div className={`${styles.registrationContainer}`}>
        <div className={`${styles.registrationMax}`}>
          <p className={`${styles.heading}`}>Maximum number of registrations:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              //   label: 'Name :',
              placeholder: 'Enter max number of registrations',
              value: ''
            }}
            styleClass={`${styles.labelMergin}`}

            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.registrationMax}`}>
          <p className={`${styles.heading}`}>Registrations end date:</p>
          <InputDatePicker
            styleClass={`${styles.labelMergin}`}
            // selectedDate={examTabData?.exam_end}
            // minDate={examTabData?.exam_start}
            // changeHandler={(date) => {
            //   const endDate = updateDate(date, examTabData?.exam_end);

            //   const isBehind = isEndTimeBehind(endDate);

            //   setExamTabData({
            //     ...examTabData,
            //     exam_end: isBehind ? getTimeWithDuration() : endDate
            //   });
            // }}
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
            <InputDatePicker styleClass={`${styles.labelMergin}`} />
          </div>
          <div className={`${styles.checkbox}`}>
            <LabeledRadioCheckbox
              type="checkbox"
              label="Same as Course Publish Date"
              name="isMandatory"
              isChecked={''}
              changeHandler={''}
            />
          </div>
        </div>
        <div className={`${styles.registrationMax}`}>
          <div className={`${styles.bookdate}`}>
            <p className={`${styles.heading}`}>Booking end date:</p>
            <InputDatePicker styleClass={`${styles.labelMergin}`} />
          </div>
          <div className={`${styles.checkbox}`}>
            <LabeledRadioCheckbox
              type="checkbox"
              label="Same as Course Start Date"
              name="isMandatory"
              isChecked={''}
              changeHandler={''}
            />
          </div>
        </div>
      </div>
      <p className={`${styles.maxBook}`}>Maximum number of Bookings:</p>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          //   label: 'Name :',
          placeholder: 'Auto-populated',
          value: ''
        }}
        styleClass={`${styles.labelMergin2}`}
        // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
      />
    </div>
  );
};
export default Commercials;
