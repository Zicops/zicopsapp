const CardHeadingWithPills = ({props}) => {

    return ( 
        <>
        <div className="tab_heading">
            {props.heading}
        </div>
        <div className="tab_section_summary">
            
            {props.data.map( (li,index) => <div className="pills">{li}</div> )}

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
                display: flex;
             }
             .tab_section_summary .pills{
                border: 2px solid var(--primary);
                padding: 10px 20px;
                margin-right: 20px;
                margin-bottom: 20px;
                border-radius: 20px;
             }
            `}
        </style>
        </>
     );
}
 
export default CardHeadingWithPills;