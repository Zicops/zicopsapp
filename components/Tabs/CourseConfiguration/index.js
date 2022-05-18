import React, { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../../state/contexts/CourseContext';
import InputDatePicker from '../../common/InputDatePicker';
import SlideButton from '../../small/SlideButton';
import useHandleConfig from './Logic/useHandleConfig';
import styles from '../courseTabs.module.scss';
import SwitchButton from '../../common/FormComponents/SwitchButton';

export default function CourseConfiguration() {
  const courseContextData = useContext(courseContext);
  const { publishDate, expireDate, setPublishDate, setExpireDate } =
    useHandleConfig(courseContextData);

  return (
    <>
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        {/* publis date */}
        <>
          <label htmlFor="publish_date" className={`w-25`}>
            Publish Date
          </label>
          <div className={`w-25`}>
            <InputDatePicker selectedDate={publishDate} changeHandler={(d) => setPublishDate(d)} />
          </div>
        </>

        {/* expiry date */}
        <>
          <label htmlFor="expire_date" className={`w-25`}>
            Expire Date
          </label>
          <div className={`w-25`}>
            <InputDatePicker selectedDate={expireDate} changeHandler={(d) => setExpireDate(d)} />
          </div>
        </>
      </div>

      {/* Quality Control Check */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="quality" className="w-25">
          Quality Control Check
        </label>

        <div className="w-75">
          <SwitchButton
            inputName="quality"
            // isChecked={false}
            // handleChange={handleChange}
          />
        </div>
      </div>

      {/* visiblity */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label htmlFor="visible" className="w-25">
          Visibility in the Learning space
        </label>

        <div className="w-75">
          <SwitchButton
            inputName="visible"
            // isChecked={false}
            // handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
