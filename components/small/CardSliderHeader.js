const CardSliderHeader = ({title}) => {
    return (
      <>
        <div className="slider_header">
          <span>{title}</span>
          {/* <span className="arrow">>></span> */}
        </div>
        <style jsx>{`
          .slider_header {
            margin-left: 10px;
            font-size: 20px;
            padding-bottom: 10px;
          }
          .slider_header span:after {
            content: '  View all';
            margin-left: -40px;
            transition: all 0.7s;
            opacity: 0;
            font-size: 12px;
            color: var(--primary);
          }
          .slider_header span:hover:after {
            margin-left: 10px;
            opacity: 1;
          }
          .slider_header:after {
            content: ' >>';
            transition: all 0.7s;
            opacity: 0;
            font-size: 12px;
            color: var(--primary);
          }
          .slider_header:hover:after {
            opacity: 1;
          }
          .slider_header span {
            color: var(--white);
            font-weight: 600;
            cursor: pointer;
            font-size: 22px;
          }
        `}</style>
      </>
    );
}
 
export default CardSliderHeader;