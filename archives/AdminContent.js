import { ApolloProvider } from '@apollo/client'
import { mutationClient as mutationClient } from '../API/Mutations'
import { queryClient as queryClient } from '../API/Queries';
import CourseHead from "./CourseHead";
import Tabs from "./Tab";
import Admin_content_foot from "../components/small/AdminContentFoot";
import CourseContextProvider from "../state/contexts/CourseContext";

const AdminContent = ({title}) => {
    return (
        <>
        <div className="content">
            <CourseHead title={title}/>

            <ApolloProvider client={mutationClient}>
            <ApolloProvider client={queryClient}>
                <CourseContextProvider>

                    <div className="content-panel">
                        <Tabs />
                    </div>
                    <Admin_content_foot />
                    
                </CourseContextProvider>
            </ApolloProvider>
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
            .content-panel {
                margin: 30px 10px 10px 10px;
                color: var(--white);
                height: calc(60vh + 100px);
                box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
                border-radius: 10px;
            }
            `}
        </style>
        </>
    )
}

export default AdminContent