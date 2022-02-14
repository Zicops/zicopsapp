import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://demo.zicops.com/cq/api/v1/query",
    // uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
});

export default client;