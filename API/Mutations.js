import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set Mutation Client
export const mClient = new ApolloClient({
  uri: "https://demo.zicops.com/cc/api/v1/query",
  cache: new InMemoryCache()
})

export const ADD_COURSE = gql`
mutation 
  addCourse(
    $name: String, 
    $description: String, 
    $summary: String, 
    $category: String, 
    $subcategory: String, 
    $owner: String,
    $status: Status
  ){
    addCourse(
      course: { 
        name: $name, 
        description: $description, 
        summary: $summary, 
        category: $category, 
        sub_category: $subcategory, 
        owner: $owner
        status: $status 
      }
    ) {
        id
        name
        description
        summary
        category
        sub_category
        owner
        status
      }
  }
`;