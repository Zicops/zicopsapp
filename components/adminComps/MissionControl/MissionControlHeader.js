import Image from "next/image";
const MissionControlHeader = () => {
    return (
        <>
            <div className="mission_control_header">
                <div className="icons">
                    <div className="rightside_icon">
                        <Image src="/images/cog.png" className="rightside_icon" alt="" height={'40px'} width={'40px'} />
                    </div>
                    <div className="rightside_icon">
                        <Image src="/images/hiararchy.png" className="rightside_icon" alt="" height={'40px'} width={'50px'} />
                    </div>
                    <div className="rightside_icon">
                        <Image src="/images/magnifier.png" className="rightside_icon" alt="" height={'40px'} width={'40px'} />
                    </div>
                </div>
            </div>
        <style jsx>
            {`
            .mission_control_header{
                padding: 20px 90px;
            }
            .icons{
                float: right;
            }
            .rightside_icon{
                margin: 20px;
                display: inline-block;
            }
            `}
        </style>
        </>
     );
}
 
export default MissionControlHeader;