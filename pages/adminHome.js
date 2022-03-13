import MissionControlHeader from "../components/adminComps/missionControl/MissionControlHeader"
import MissionControlCards from "../components/adminComps/missionControl/MissionControlCards"

const AdminHome = () => {
    return (
        <>
        <div className="content">
            <MissionControlHeader/>
            <MissionControlCards/>
        </div>
        <style jsx>
            {`
            .content {
                background-color: var(--tile-bg);
                margin-top: 70px;
                height: calc( 100vh - 70px );
            }
            `}
        </style>
        </>
    )
}

export default AdminHome