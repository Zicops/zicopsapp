const TopicPlayer =({player_img,v_d,duration}) =>{
    return(
        <>
            <div className="topic_player">
                <div className="progress_bar">
                    <img src={player_img} alt=""/>
                </div>
                <div className="details">
                    <div>
                        {/* Video + Quiz */}
                        {v_d}
                    </div>
                    <div>
                        Duration : <span>{duration}</span>
                    </div>
                </div>
            </div>
            <style>{`
            .topic_player{
                width: 40%;
                margin-right: 5%;
                font-size: 12px;
                color: #858f8f;
            }
            .topic_player .details{
                display: flex;
                justify-content: space-between;
                padding-top: 20px;
            }
            .progress_bar{
                width: 100%;
                height: 10px;
                margin: auto;
                background: #343535;
                border: 1px solid #ffffff;
                position: relative;
            }
            .progress_bar:after{
                content: '';
                width: 50%;
                height: 8px;
                background: #858f8f;
                position: absolute;
                top: 0;
                left: 0;
            }
            .progress_bar img{
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -33%);
                width: 30px;
                z-index: 2;
            }
            
            `}
            </style>
        </>
    )
}
export default TopicPlayer