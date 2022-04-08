import Sidebar from '../../components/Sidebar';
import ZicopsCourseList from "../../components/adminComps/ZicopsCourses/ZicopsCourseList"

const ZicopsCourses = () => {
      return (
        <div>
            <Sidebar />
            {/* <AdminContent /> */}
            <ZicopsCourseList/>
        </div>
    )
}

export default ZicopsCourses