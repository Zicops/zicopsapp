const CardHeadingWithList = ({props}) => {

    return ( 
        <>
        <div className="tab_heading">
            {props.heading}
        </div>
        <div className="tab_section_summary">
            <ul>
                {props.data.map( (li,index) => <li>{li}</li> )}
            </ul>
        </div>
        <style jsx>
            {`
            .tab_heading{
                color: var(--primary);
                font-size:1.5vw;
                padding-bottom:15px;
                font-weight:700;
            }
            .tab_section_summary{
                color: var(--primary);
                font-size: 0.9em;
             }
             .tab_section_summary ul{
                padding: 0 15px;
             }
             .tab_section_summary ul li{
                margin: 10px 0;
             }
            `}
        </style>
        </>
     );
}
 
export default CardHeadingWithList;