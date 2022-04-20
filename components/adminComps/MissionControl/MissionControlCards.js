import Image from "next/image";
import Link from "next/link";

const Card = ( { image, text, width } ) => {

    return(
    <>
    <div className="card">
        <div className="card_icon">
            <Image src={image} alt='' width={width} height={'70px'}/>
        </div>
        <div className="card_text">
            {text}
        </div>
    </div>
    <style jsx>
        {`
        .card{
            width: 300px;
            height: 200px;
            background-color: var(--tile-bg);
            color: var(--primary);
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            box-shadow: 5px -5px 10px 0 #86868640, -5px 5px 10px 0 #00000080;
            margin: 20px;
            cursor: pointer;
        }
        .card::hover{
            background-color: var(--dark_two);
            box-shadow: -5px 5px 10px 0 #00000080, 5px -5px 10px 0 #86868640;
        }
        .card_icon{

        }
        .card_text{
            margin-top: 20px;
            color: white;
        }
        `}
    </style>
    </>
    )
}
const MissionControlCards = () => {
    return (
        <>
        <div className="mission_control_body">
            <div className="contain_icons">
                <div className="new_row">
                    <Card image="/images/Analytics.png" text="Analytics" width="70px"/>
                    <Card image="/images/UserManagement.png" text="User Management" width="70px"/>
                    <Link href="/admin/zicops-courses">
                        <a>
                        <Card image="/images/CourseManagement.png" text="Course Management" width="70px"/>
                        </a>
                    </Link>
                    <Card image="/images/TrainingManagement.png" text="Training Management "width="70px"/>
                </div>
                <div className="new_row">
                    <Card image="/images/Administration.png" text="Administration" width="60px"/>
                    <Card image="/images/ExamManagement.png" text="Exam Management" width="80px"/>
                    <Card image="/images/VendorManagement.png" text="Vendor Management" width="80px"/>
                    <Card image="/images/LabManagement.png" text="Lab Management" width="80px"/>
                </div>
            </div>
        </div>
        <style jsx>{`
            .mission_control_body{
                padding: 20px;
                width: 100%;
                height: 100%;
                position: relative;
            }
            .contain_icons{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%)
            }
            .new_row{
                display: flex;
            }
        `}
        </style>
        </>
     );
}
 
export default MissionControlCards;