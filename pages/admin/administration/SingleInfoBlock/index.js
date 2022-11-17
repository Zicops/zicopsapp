import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../administration.module.scss';

export default function SingleInfoBlock({ userData, showImg = true, isEditable = false }) {
  return (
    <div className={`${styles.singleWraper}`}>
      {showImg && (
        <div className={`${styles.singleImage}`}>
          <img src={userData?.image} />
        </div>
      )}
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData?.label}:</div>
        {isEditable ? (
          userData?.label === 'Contact' ? (
            <div className={`${styles.contactInputContainer}`}>
              {/* <label>Contact Number:</label> */}
              <PhoneInputBox
                value={userData?.phone}
                changeHandler={(phNo, data) => {
                  setUserDataMain((prevValue) => ({ ...prevValue, phone: phNo }));
                  setPhCountryCode(data.countryCode?.toUpperCase());
                }}
                isLabel={false}
              />
            </div>
          ) : (
            <LabeledInput
              styleClass={`${styles.inputField}`}
              inputOptions={{
                inputName: `${userData?.inputName}`,
                placeholder: `Enter ${userData?.label}`,
                value: userData?.info,
                maxLength: 60,
                isDisabled: false
              }}
              changeHandler={() => {}}
            />
          )
        ) : (
          <div className={`${styles.largeText}`}>{userData?.info}</div>
        )}
      </div>
    </div>
  );
}
