import TopicLoop from "./TopicLoop"

const ChapterLoop = (props) => {
    return (
        <>
        <div className="chapter_header">
            <div className="heading">
                <h2>Chapter 1: <span>Introduction</span></h2>
            </div>
            <div className="description">
                <p>Introduction to design thinking. In this chapter, we will inroduce you to stepwise thought process to design thinking.</p>
            </div>
        </div>
        
        {
        props.topic.map( (index) => ( 
            <TopicLoop key={index} index={index} />
        ))
        }
        <style jsx>
            {`
            .chapter_header{
                color: #ffffff;
                margin: 30px 0;
            }
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
                width: 74%;
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
            `}
        </style>
        </>
    )
}

export default ChapterLoop