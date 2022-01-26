
const TopicText= ({heading,desc}) =>{
    return(
        <>
            <div className="topic_text">
            <div className="topic_heading">
                <h4><span>1. </span>{heading}</h4>
            </div>
            <div className="topic_description">
                <p>{desc}</p>
            </div>
            </div>
            <style jsx>{`
            .topic_text{
                width: 50%;
                margin-right: 5%;
            }
            .topic_text .topic_heading h4{
                font-size: 14px;
                color: #ffffff;
            }
            .topic_text .topic_description {
                font-size: 12px;
                color: #858f8f;
                padding: 5px 0 0 0;
            }`}

            </style>

        </>
    )
}
export default TopicText