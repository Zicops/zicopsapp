import { ApolloProvider, useQuery } from '@apollo/client';
import { qClient, GET_LATEST_COURSES } from '../API/Queries';

function LatestCourseList( {time} ) {
    const { loading, error, data } = useQuery(GET_LATEST_COURSES, {
        variables: {
            publish_time: time,
            pageSize: 50,
            pageCursor: ""
        }
    });
    
    return(
        <>
            This is function return!<br/>
            <ul>
            { ( (typeof data != 'undefined') && (data.latestCourses.courses.length > 0) ) &&
                data.latestCourses.courses.map((course) => <li>{course.id}</li>)
            }
            </ul>
        </>
    )
}
const TestQuery = () => {

    let t = Date.now();

    return ( 
        <>
        <ApolloProvider client={qClient}>
            <div style={{padding: '200px 0'}}>
                 <LatestCourseList time={t}/>
                This is a test page.
            </div>
        </ApolloProvider>
        </>
     );
}
 
export default TestQuery;