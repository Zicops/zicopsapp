import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation, useQuery } from '@apollo/client';
import {GET_CATS_N_SUB_CATS} from '../API/Queries'
const qClient = new ApolloClient({
    uri: "https://demo.zicops.com/cq/api/v1/query",
    cache: new InMemoryCache()
})

// const mClient = new ApolloClient({
//     uri: "https://demo.zicops.com/cc/api/v1/query",
//     cache: new InMemoryCache()
// })

// const GET_CATS = gql`
//     {
//         allCategories
//         allSubCategories
//     }
// `;

// function Todos(){
//     const { loading, error, data } = useQuery(GET_CATS)

//     if(loading) return <p>Loading...</p>
//     if(error) return <p>Error Fetching Data</p>

//     console.log(data.allCategories)
    
//     return data.allCategories.map( (cats) => {
//         // let input;

//         return(
//             <div>
//                 <p>{cats}</p>
//                 {/* <form onSubmit={e => {
//                     e.preventDefault();
//                     if (!input.value.trim()){
//                         return
//                     }
//                     input.value = ""
//                 }}>
//                     <input ref={node => input = node} />
//                     <button type="submit">Update</button>
//                 </form> */}
//             </div>
//         )
//     })
// }

// const ADD_COURSE = gql`
//   mutation {
//     addCourse(
//       course: { 
//         name: $name, 
//         description: $description,
//         summary: $summary,
//         category: $category,
//         status: SAVED 
//       }
//     ) {
//       id
//       name
//       description
//       summary
//       category
//     }
//   }
// `;

// function AddCourse() {
//     let name, description, summary, category;

//     const [addTodo, { data, loading, error }] = useMutation(ADD_COURSE);

//     if (loading) return 'Submitting...';
//     if (error) return `Submission error! ${error.message}`;

//     return (
//         <div>
//             <form
//                 onSubmit={e => {
//                     e.preventDefault();
//                     addTodo({ variables: { 
//                         name: name.value,
//                         description: description.value,
//                         summary: summary.value,
//                         category: category.value
//                     } });
//                     name.value =
//                     description.value =
//                     summary.value =
//                     category.value = '';
//                 }}
//             >
//                 <input ref={a => name = a} placeholder="Course Name"/>
//                 <input ref={b => description = b} placeholder="Description"/>
//                 <input ref={c => summary = c} placeholder="Summary"/>
//                 <input ref={d => category = d} placeholder="category"/>
//                 <button type="submit">Add</button>
//             </form>
//         </div>
//     );
// }
  
function CategoryList(){
    const {data} = useQuery(GET_CATS_N_SUB_CATS);
    return (
        (data) ? data.allCategories.map( cats => <p>{cats}</p> ) : null
    )
}
export default function Test() {
    return (
        <ApolloProvider client={qClient}>
            <br /><br /><br /><br /><br /><br /><br />
            <CategoryList />
            {/* <Todos /> */}
            <br /><br /><br /><br /><br /><br /><br />
        </ApolloProvider>
    )
}