import Sidebar from "../components/large/Sidebar"
import AdminContent from "../components/large/AdminContent"
// import { Provider } from "react-redux"
// import store from '../state/store'
// import { gql } from "@apollo/client";
// import client from "../apollo-client";

// export async function getStaticProps() {
//     const { data } = await client.query({
//       query: gql`
//         query CatsQuery {
//             allCategories
//             allSubCategories
//         }
//       `,
//     });
//     return {
//       props: {
//         categories: data.allCategories,
//         subCategories: data.allSubCategories,
//       },
//    };
// }


const Admin = ({categories, subCategories}) => {
      return (
        <div>
            {/* <Provider store={store}> */}
                <Sidebar />
                <AdminContent />
            {/* </Provider> */}
        </div>
    )
}

export default Admin