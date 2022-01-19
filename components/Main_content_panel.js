import Tabs from "./Tab";

const Main_content_panel = () => {
    
    return (
        <div className="content-panel">
            <Tabs />
            <style jsx>{`
            .content-panel {
                margin: 30px 10px 10px 10px;
                color: #ffffff;
                height: 500px;
                box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
                border-radius: 10px;
            }
            `}</style>
        </div>
    )
}

export default Main_content_panel