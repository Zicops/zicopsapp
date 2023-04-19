import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from '../adminCourse.module.scss';
import InputDatePicker from '@/common/InputDatePicker';
import RadioBox from '@/components/Tabs/common/RadioBox';
import { useRecoilState } from 'recoil';
import { changeHandler } from '@/helper/common.helper';
import { currency } from '@/components/VendorComps/Logic/vendorComps.helper';
import { CommercialsAtom } from '@/state/atoms/courses.atom';

const Commercials = () => {
  const [commercialsData, setCommercialsData] = useRecoilState(CommercialsAtom);
  return (
    <div className={`${styles.commerciasContainer}`}>
      <p>Pricing</p>
      <p className={`${styles.checkboxLebel}`}>Configure the pricing parameter for this course</p>
      <div className={`${styles.checkbox}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="To be Decided"
          name="isMandatory"
          isChecked={commercialsData?.is_decided}
          changeHandler={(e) => {
            const isChecked = e.target.checked;
            const _commercialData = { ...commercialsData };
            _commercialData.is_decided = isChecked;
            setCommercialsData(_commercialData);
          }}
        />
      </div>

      <div className={`${styles.redioBoxContainer}`}>
        <RadioBox
          labeledInputProps={{
            label: 'Priced Training',
            name: 'display',
            isDisabled: commercialsData?.is_decided,
            description: 'Learners to pay and book the seat to attend the training',
            isChecked: commercialsData?.is_paid_traning,
            changeHandler: (e) => setCommercialsData({ ...commercialsData, is_paid_traning: true })
          }}
        />
        <RadioBox
          labeledInputProps={{
            label: 'Free of Cost Training',
            name: 'display',
            isDisabled: commercialsData?.is_decided,
            description: 'Training is Free of Cost for Learners',
            isChecked: commercialsData?.is_free_traning,
            changeHandler: (e) => setCommercialsData({ ...commercialsData, is_free_traning: true })
          }}
        />
      </div>
      <div className={`${styles.hr}`}></div>
      <div className={`${styles.priceSetContainer}`}>
        <div>
          <p className={`${styles.heading}`}>Price per seat:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'price_per_seat',
              //   label: 'Name :',
              placeholder: 'Enter price per seat',
              value: commercialsData?.price_per_seat,
              isNumericOnly: true
            }}
            styleClass={`${styles.labelMergin}`}
            changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Currency:</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'currency',
              placeholder: 'INR',
              value: {
                label: commercialsData?.currency,
                value: commercialsData?.currency
              },
              options: currency
            }}
            changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData, 'currency')}
            styleClass={`${styles.labelMergin}`}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Tax:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'tax_percentage',
              //   label: 'Name :',
              placeholder: 'Tax',
              value: commercialsData?.tax_percentage,
              isNumericOnly: true
            }}
            styleClass={`${styles.labelMergin}`}
            changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Total:</p>
          <LabeledInput
            inputOptions={{
              inputName: 'total',
              //   label: 'Name :',
              placeholder: 'Auto-populated',
              value: +commercialsData?.price_per_seat + +commercialsData?.tax_percentage,
              isNumericOnly: true
            }}
            styleClass={`${styles.labelMergin}`}
            // changeHandler={(e) => changeHandler(e, commercialsData, setCommercialsData)}
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
              inputName: 'max_registrations',
              //   label: 'Name :',
              placeholder: 'Enter max number of registrations',
              value: commercialsData?.max_registrations,
              isNumericOnly: true
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
                registration_end_date: date
              });
            }}
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
              selectedDate={commercialsData?.booking_start_date}
              // minDate={examTabData?.exam_start}
              changeHandler={(date) => {
                setCommercialsData({
                  ...commercialsData,
                  booking_start_date: date
                });
              }}
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
                const _commercialData = structuredClone(commercialsData);
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
              selectedDate={commercialsData?.booking_end_date}
              // minDate={examTabData?.exam_start}
              changeHandler={(date) => {
                setCommercialsData({
                  ...commercialsData,
                  booking_end_date: date
                });
              }}
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
                const _commercialData = structuredClone(commercialsData);
                _commercialData.is_start_date = isChecked;
                setCommercialsData(_commercialData);
              }}
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
