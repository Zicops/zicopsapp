const QuizLoop = ({type, sr, text}) => {
    let sclass;
    if(type=='question'){
        sclass = 'question';
    } else {
        sclass = 'answer';
    }
    return (
        <>
        <div className={sclass}>
            <div className="number">
                <span>{sr}.</span>
            </div>
            <div className="box">
                <input type="text" className="" placeholder={text}/>
                
                <div className="attachment">
                    <span className="one">
                        <img src="/images/attachment.png" alt="" />
                    </span>
                    <span>
                        <img src="/images/img.png" alt="" />Image
                    </span>
                    <span>
                        <img src="/images/audio.png" alt="" />Audio
                    </span>
                    <span>
                        <img src="/images/vid.png" alt="" />Video
                    </span>
                    <input type="file" name="quiz_attachment" />
                </div>
                
            </div>
        </div>
        <style jsx>{`
        .question{
            display: flex;
            align-items:center;
            padding: 10px 0;
        }
        .answer{
            display: flex;
            align-items:center;

            margin-top: 10px;
            margin-bottom: 10px;
            margin-right: auto;
            margin-left: 5%;

            padding: 10px 0;
        }
        .number{
            font-size: 20px;
            color: #ffffff;

            width: 6%;
        }
        .box{
            width: 95%;
        }
        .box input{
            width: 95%;
            margin: 0;
        }
        .attachment{
            display: flex;
            width: 95%;
            justify-content: space-between;

            background-color: #646464;
            padding: 0 20px;

            cursor: pointer;
            position: relative;
        }
        .attachment .one{
            flex-grow: 4;
        }
        .attachment span{
            flex-grow: 1;
            padding: 5px;
            display: flex;
            align-items: center;
            color: #000000;
        }
        .attachment span img{
            width: 15px;
            margin: 0 5px;
        }
        .attachment input[type=file] {
            width: 100%;
            padding: 0;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            z-index: 3;
            cursor: pointer;
        }
        `}</style>
        </>
    )
}
export default QuizLoop