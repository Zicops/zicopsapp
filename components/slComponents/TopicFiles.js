const TopicFiles = ({prop}) => {
    return(
        <>
        <div className="topic">
            <div className="topic_head">
                Topic {prop}
             </div>
            <div className="topic_body">
                <div className="topic_data">
                    <p>12 Files</p>
                </div>
                <div className="arrow_img">
                    <img src="/images/right-arrow-white.png" alt="" />
                </div>
            </div>
        </div>
        <style jsx>{`
        .topic{
            background-color:#323232;
            padding:10px 20px;
            border-radius: 5px;
            flex: 1;
            margin: 5px;
            border:1px solid transparent;
            cursor: pointer;
        }
        .topic:hover{
            border:1px solid rgb(81, 190, 188);
        }
        .topic_head{
            color: var(--primary);
            font-weight:700;
            font-size:1.25vw;
            padding: 10px;
            text-transform: capitalize;
            border-bottom:1px solid var(--dark_three);
        }
        .topic_body{
             font-size: 1.1vw;
             color: var(--dark_three);
             padding: 20px 10px;
             display:flex;
             justify-content:space-between;
             align-items:center;
        }
        .arrow_img img{
            width: 10px;
        }
        `}
        </style>
        </>
    )
}
export default TopicFiles