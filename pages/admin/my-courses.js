import Sidebar from '../../components/Sidebar';
import MyCourseList from '../../components/adminComps/ZicopsCourses/MyCourseList';
import ZicopsCourseTable from '../../components/ZicopsCourseTable';
import CourseHead from '../../components/CourseHead';
import { ApolloProvider, useQuery } from '@apollo/client';
import { queryClient } from '../../API/Queries';

const MyCourses = () => {
  return (
    <div>
      <Sidebar />
      {/* <AdminContent /> */}

      {/* <div className={`adminContent`}>
        <CourseHead title="My Courses" /> */}

        {/* <MyCourseList /> */}
        {/* <ZicopsCourseTable /> */}
      {/* </div> */}
      <div className="content">
        <CourseHead title="My Courses" />

        <ApolloProvider client={queryClient}>
          <div className="content-panel">
            <MyCourseList />
          </div>
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
    </div>
  );
};

export default MyCourses;
