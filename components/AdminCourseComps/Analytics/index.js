import HeaderDataContainer from './HeaderDataContainer';
import WatchTimeDataAndGraph from './WatchTimeDataAndGraph';
import CourseUserTable from './CourseUserTable';

export default function Analytics() {
  
  return (
    <div>
      <HeaderDataContainer />
      <WatchTimeDataAndGraph />
      <CourseUserTable />
    </div>
  );
}
