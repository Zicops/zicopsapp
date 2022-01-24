

const TopicLoopHead = ({children}) =>{
    return(
        <>
        <div className="preclass">
        {children}
        </div>
        <style jsx>{`
            .preclass{
                font-size: 12px;
                color: #858f8f;
                display: flex;
                justify-content: right;

            }
            .preclass div{
                margin: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;

            }
            .preclass div:hover{
                color: #ffffff;
            }
            .preclass img{
                width: 20px;
                margin-right: 10px;
            }
        `}

        </style>
        </>
    )
}
export default TopicLoopHead