import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalenderLarge = () => {
    return ( 
        <>
        <DatePicker 
            dateFormat="dd/MM/yyyy"
            // renderCustomHeader={CustomHeader}
            // selected={expireDate} 
            // onChange={(date) => setExpireDate(date)} 
            calendarClassName="big_calender"
            className="big_calender_body"
            dayClassName={()=>'big_calander_dates'}
            inline
            />
        </>
     );
}
 
export default CalenderLarge;