import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../state/contexts/CourseContext';
import InputDatePicker from '../common/InputDatePicker';
import SlideButton from '../small/SlideButton';
import CustomHeader from './CustomHeader';
import useHandleConfig from './Logic/useHandleConfig';

export default function CourseConfiguration() {
  const courseContextData = useContext(courseContext);
  const { publishDate, expireDate, setPublishDate, setExpireDate } =
    useHandleConfig(courseContextData);

  return (
    <div className="course_master">
      <div className="row my_30">
        <label htmlFor="name" className="col_25">
          Publish Date
        </label>
        <div className="col_25">
          <InputDatePicker selectedDate={publishDate} changeHandler={(d) => setPublishDate(d)} />
        </div>

        <label htmlFor="name" className="col_25" style={{ textAlign: 'center' }}>
          <span>Expire Date</span>
        </label>
        <div className="col_25">
          <InputDatePicker selectedDate={expireDate} changeHandler={(d) => setExpireDate(d)} />
        </div>
      </div>

      <div className="row my_30">
        <label htmlFor="name" className="col_25">
          Quality Control Check
        </label>
        <div className="col_25">
          <SlideButton />
        </div>
        <div className="col_25"></div>
        <div className="col_25"></div>
      </div>

      <div className="row my_30">
        <label htmlFor="name" className="col_25">
          Visibility in the Learning space
        </label>
        <div className="col_25">
          <SlideButton />
        </div>
        <div className="col_25"></div>
        <div className="col_25"></div>
      </div>
    </div>
  );
}
