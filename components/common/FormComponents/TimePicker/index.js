import DatePicker from 'react-datepicker';

export default function TimePicker({ selected = new Date(), timeIntervals = 15, changeHandler }) {
  return (
    <div className="w-100">
      <DatePicker
        selected={selected}
        onChange={changeHandler}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={timeIntervals}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
}
