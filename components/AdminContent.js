import Link from "next/link";
import CourseHead from "./CourseHead";
import Main_content_panel from "./Main_content_panel";
import Admin_content_foot from "./AdminContentFoot";

const AdminContent = () => {
    return (
        <>
        <div className="content">
            <CourseHead />
            <Main_content_panel>
  
            </Main_content_panel>
            <Admin_content_foot />
        </div>
        <style jsx>
            {`
            .content {
                background-color: #1a1a1a;
                float: right;
                width: calc(100% - 250px);
                z-index: 1;
                margin-top: 80px;
                height: calc(110vh - 80px);
                padding: 30px 70px;
            }
            `}
        </style>
        </>
    )
}

export default AdminContent