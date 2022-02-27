import { ApolloProvider } from '@apollo/client'
import { mClient } from '../../API/Mutations'
import CourseHead from "../medium/CourseHead";
import Main_content_panel from "../medium/Main_content_panel";
import Admin_content_foot from "../small/AdminContentFoot";
import CourseContextProvider from "../../state/contexts/CourseContext";

const AdminContent = () => {
    return (
        <>
        <div className="content">
            <CourseHead />
            <ApolloProvider client={mClient}>
            <CourseContextProvider>
                <Main_content_panel />
                <Admin_content_foot />
            </CourseContextProvider>
            </ApolloProvider>
        </div>
        <style jsx>
            {`
            .content {
                background-color: #1a1a1a;
                float: right;
                width: calc(100% - 250px);
                z-index: 1;
                margin-top: 70px;
                height: calc(110vh - 70px);
                padding: 30px 70px;
            }
            `}
        </style>
        </>
    )
}

export default AdminContent