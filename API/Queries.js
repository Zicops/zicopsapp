import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set query Client
export const qClient = new ApolloClient({
    uri: "https://demo.zicops.com/cq/api/v1/query",
    cache: new InMemoryCache()
})

export const GET_CATS_N_SUB_CATS = gql`
    query CatsQuery {
        allCategories
        allSubCategories
    }
`;