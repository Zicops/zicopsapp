const CardHeadingWith2List = ({props}) => {

    return ( 
        <>
        <div className="tab_heading">
            {props.heading}
        </div>
        <div className="tab_section_summary">
            <div className="row mb_10">
                <div className="col_15">
                    Good For :
                </div>
                <div className="col_75">
                    <ul>
                        {props.goodfor.map( (li,index) => <li key={index}>{li}</li> )}
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col_15">
                    Must For :
                </div>
                <div className="col_75">
                    <ul>
                        {props.mustfor.map( (li,index) => <li key={index}>{li}</li> )}
                    </ul>
                </div>
            </div>
            
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
                list-style-type: none;
             }
             .tab_section_summary ul li{
                margin: 5px 0;
             }
            `}
        </style>
        </>
     );
}
 
export default CardHeadingWith2List;