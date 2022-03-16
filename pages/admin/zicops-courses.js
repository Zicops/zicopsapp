import Sidebar from "../../components/large/Sidebar"
import AdminContent from "../../components/large/AdminContent"
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