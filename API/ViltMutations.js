import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.userClient
});

// Set query Client
export const viltMutationClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
