import React from 'react';
import styles from './paymentCourse.module.scss';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import PhoneInputBox from '@/components/common/FormComponents/PhoneInputBox';

const PayUserDetails = () => {
  return (
    <>
      <div className={`${styles.payUserContainer}`}>
        <div
          className={`${styles.payTopContainer}`}
          style={{ backgroundImage: `url('/images/courses/1.png')`, backgroundSize: 'cover' }}>
          <div className={`${styles.gradient}`}>
            <div className={`${styles.imgTextContainer}`}>
              <div className={`${styles.imgLogo}`}>
                <img src="/images/zicopsIcon.png" alt="" />
              </div>
              <div className={`${styles.imgLogoText}`}>
                <img src="/images/svg/logo-text.svg" alt="" />
              </div>
              <div className={`${styles.hr2}`}></div>
              <div className={`${styles.amount}`}>
                <p>Total Amount:</p>
                <p style={{ fontWeight: '600' }}>Rs 6000</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.payBottomContainer}`}>
          <div className={`${styles.payHeading}`}>Payee details</div>
          <div className={`${styles.flexContainer}`}>
            <div className={`${styles.subField}`}>
              <p className={`${styles.heading}`}>First name:</p>
              <div className={`${styles.inputBox}`}>
                <LabeledInput
                  inputOptions={{
                    inputName: 'firstName',
                    //   label: 'Name :',
                    placeholder: 'Enter your first name',
                    // value: classroomMaster?.pricePerSeat,
                  }}
                  styleClass={`${styles.labelMergin}`}
                  // changeHandler={(e) => changeHandler(e, classroomMaster, setClassroomMaster)}
                />
              </div>
            </div>
            <div className={`${styles.subField}`}>
              <p className={`${styles.heading}`}>Last name:</p>
              <LabeledInput
                inputOptions={{
                  inputName: 'lastName',
                  //   label: 'Name :',
                  placeholder: 'Enter your last name',
                  // value: classroomMaster?.pricePerSeat,
                }}
                styleClass={`${styles.labelMergin}`}
                // changeHandler={(e) => changeHandler(e, classroomMaster, setClassroomMaster)}
              />
            </div>
          </div>
          <div className={`${styles.flexContainer}`}>
            <div className={`${styles.subField}`}>
              <p className={`${styles.heading}`}>Email Id:</p>
              <div className={`${styles.inputBox}`}>
                <LabeledInput
                  inputOptions={{
                    inputName: 'emailId',
                    //   label: 'Name :',
                    placeholder: 'Enter your email id',
                    // value: classroomMaster?.pricePerSeat,
                  }}
                  styleClass={`${styles.labelMergin}`}
                  // changeHandler={(e) => changeHandler(e, classroomMaster, setClassroomMaster)}
                />
              </div>
            </div>
            <div className={`${styles.subField}`}>
              <p className={`${styles.heading}`} style={{ paddingBottom: '8px' }}>
                Phone no:
              </p>
              <PhoneInputBox
                // value={userData?.phone}
                // changeHandler={(phNo, data) => {
                //   setUserDataMain((prevValue) => ({ ...prevValue, phone: phNo }));
                //   setPhCountryCode(data.countryCode?.toUpperCase());
                // }}
                inputClass={`${styles.phoneClasses}`}
                isLabel={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayUserDetails;
