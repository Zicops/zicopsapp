import Sidebar from "../components/large/Sidebar"
import AdminContent from "../components/large/AdminContent"

const Admin = ({categories, subCategories}) => {
      return (
        <div>
            <Sidebar />
            <AdminContent />
        </div>
    )
}

export default Admin