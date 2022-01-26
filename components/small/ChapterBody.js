const ChapterBody = ({chapt_sr_no,chapt_heading,chapt_desc}) =>{
    return(
        <> 
            <div className="chapter_header">
                <div className="heading">
                    <h3>Chapter {chapt_sr_no} : <span>{chapt_heading}</span></h3>
                </div>
                <div className="description">
                    <p>{chapt_desc}</p>
                </div>
            </div>
            <style jsx>{`
             .chapter_header .heading{
                position: relative;
                padding: 0 5%;
    
            }
            .chapter_header .heading:before{
                content: "";
                display: block;
                width: 4%;
                height: 2px;
                background: #ffffff;
                left: 0px;
                top: 55%;
                position: absolute;
            }
            .chapter_header .heading:after{
                content: "";
                display: block;
                width: 72%;
                height: 2px;
                background: #ffffff;
                right: 0px;
                top: 55%;
                position: absolute;
                z-index: 0;
            }
            .chapter_header .description{
                font-size: 13px;
                padding: 0 5%;
            }
            `}</style>
        </>
    )
}
export default ChapterBody