import Tabs from "../small/Tab";

const Main_content_panel = ({props}) => {
    
    return (
        <>
        <div className="content-panel">

            <Tabs />

        </div>
        <style jsx>{`
        .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            height: calc(60vh + 100px);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
        }
        `}</style>
        </>
    )
}

export default Main_content_panel