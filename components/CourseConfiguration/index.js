import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { courseContext } from '../../state/contexts/CourseContext';
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
          <DatePicker
            dateFormat="dd/MM/yyyy"
            renderCustomHeader={CustomHeader}
            selected={publishDate}
            onChange={(date) => setPublishDate(date)}
            calendarClassName="dark_calender"
            className="calender_body"
            dayClassName={() => 'calander_dates'}
          />
        </div>

        <label htmlFor="name" className="col_25" style={{ textAlign: 'center' }}>
          <span>Expire Date</span>
        </label>
        <div className="col_25">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            renderCustomHeader={CustomHeader}
            selected={expireDate}
            onChange={(date) => setExpireDate(date)}
            calendarClassName="dark_calender"
            className="calender_body"
            dayClassName={() => 'calander_dates'}
          />
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
