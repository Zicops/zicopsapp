import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Placeholder from 'react-select/dist/declarations/src/components/Placeholder';
import styles from './ExamDatePicker.module.scss';
// import styles from '../../styles/CourseMaster.module.css';

const ExamDatePicker = ({ text, datePicker_label }) => {
  const years = [
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015'
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  }) => (
    <div
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'center'
      }}>
      <select value={'2022'} onChange={({ target: { value } }) => changeYear(value)}>
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <>
      <div className={'${styles.exam_datepicker}'}>
        <div className="row my_30">
          <label htmlFor="name">{text}</label>
          <div className="date_picker">
            <DatePicker
              label={datePicker_label}
              dateFormat="dd/MM/yyyy"
              renderCustomHeader={CustomHeader}
              // selected={publishDate}
              // onChange={(date) => setPublishDate(date)}
              calendarClassName="dark_calender"
              className="calender_body"
              dayClassName={() => 'calander_dates'}
            />
          </div>
        </div>
      </div>
      <style>
        {`
        .exam_datepicker{
          display: grid;
          justify-content: space-between;
          justify-items: start;
          grid-template-columns: auto auto;
          align-content: center;
          // border:1px solid white;
          min-height:200px;
          padding-left:50px;
        }
        .date_picker{
          background-img:url()
        }
       .calender_body{
            padding: 10px;
            margin: 10px;
            border: 2px solid #6bcfcf;
            background-color: #202222;
            color: #858f8f;
            font-size: 13px;
            font-family: Poppins;
        }`}
      </style>
    </>
  );
};

export default ExamDatePicker;
