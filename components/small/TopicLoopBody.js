

const TopicLoopBody = ({children}) =>{
    return(
        <>
        <div className="topic_loop">
        {children}
        </div>
        <style>{`
        .topic_loop{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border: 1px solid #ffffff;
            transition: all 0.3s;
            cursor: pointer;
            // background-color:#000000;
            // color:#ffffff;

        }
        .topic_loop:hover{
            box-shadow: 0 0 10px 0 #6bcfcf;
            transform: scale(1.02);
            // background-color:#000000;
        }
        `}</style>
        </>
    )
}
export default TopicLoopBody