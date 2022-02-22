import MainPlayer from "../medium/MainPlayer"

const ContentPlayer = ({set}) => {
    
    return (
        <>
        <div className="content-player-main">
            <MainPlayer set={set}/>
        </div>
        <style jsx>{`
            .content-player-main{
                background-color: #868686;
                margin-top: 70px;
            }
        `}</style>
        </>
    )
}

export default ContentPlayer